from scipy.spatial import distance as dist
from imutils.video import VideoStream
from imutils import face_utils
import sys
import argparse
import imutils
import time
import dlib
import math
import cv2
import os
import numpy as np
from landmarker_based.EAR  import eye_aspect_ratio
from landmarker_based.MAR import mouth_aspect_ratio

EYE_AR_THRESH = 0.25
MOUTH_AR_THRESH = 0.685
SEQ_LEN = 5
MIN_DROWSY_IN_SEQ = 3
EYE_AR_CONSEC_FRAMES = 3
MOUTH_AR_CONSEC_FRAMES = 10

# landmarker_single / landmarker_adjacent / cnn_lstm
MODE = "landmarker_single"
EAR_COUNTER = 0
MAR_COUNTER = 0 
frame_history = []
cnn_lstm_model = None


import pickle
import tensorflow as tf

CNN_LSTM_SEQ_LEN = 5
cnn_lstm_frames = []  # buffer of last frames

def load_cnn_lstm_model():
    print("[INFO] Loading CNN+LSTM model...")
    with open("lstm_based/drowsiness_lstm_model.pkl", "rb") as f:
        model = pickle.load(f)
    return model
def landmarker_single_predict(ear, mar):
    """
    Original landmarker rule with consecutive blink tracking and EAR/MAR thresholds.
    Returns "Drowsy" or "Non Drowsy".
    """
    global EAR_COUNTER
    global MAR_COUNTER
    status = "Non Drowsy"

    if ear < EYE_AR_THRESH:
        EAR_COUNTER += 1
        if EAR_COUNTER >= EYE_AR_CONSEC_FRAMES:
            status = "Drowsy"
    else:
        EAR_COUNTER = 0

    if mar > MOUTH_AR_THRESH:
        MAR_COUNTER += 1
        if MAR_COUNTER >= MOUTH_AR_CONSEC_FRAMES:
            status = "Drowsy"
    else:
        MAR_COUNTER = 0

    return status


def landmarker_adjacent_predict(base_status):
    """
    Apply a SEQ_LEN-sized smoothing window on top of single-frame results:
    if Drowsy appears at least MIN_DROWSY_IN_SEQ times, mark current frame Drowsy.
    """
    global frame_history

    frame_history.append(base_status)
    if len(frame_history) > SEQ_LEN:
        frame_history.pop(0)

    drowsy_count = sum(s == "Drowsy" for s in frame_history)
    if drowsy_count >= MIN_DROWSY_IN_SEQ:
        return "Drowsy"
    return "Non Drowsy"



def model_predict(frame, ear, mar):
    """
    Unified prediction entry based on MODE:
      - landmarker_single: raw heuristic
      - landmarker_adjacent: single result + temporal smoothing
      - cnn_lstm: placeholder, currently mirrors single behavior
    """
    base_status = landmarker_single_predict(ear, mar)

    if MODE == "landmarker_single":
        return base_status
    elif MODE == "landmarker_adjacent":
        return landmarker_adjacent_predict(base_status)
        

    # fallback
    return base_status
def process_video_withDetails(input_video_path, output_video_path="output.mp4"):
    global COUNTER, frame_history, MODE

    # Reset state before each video run
    COUNTER = 0
    frame_history = []

    print("[INFO] loading facial landmark predictor...")
    detector = dlib.get_frontal_face_detector()
    predictor = dlib.shape_predictor(
        './landmarker_based/dlib_shape_predictor/shape_predictor_68_face_landmarks.dat'
    )

    cap = cv2.VideoCapture(input_video_path)
    if not cap.isOpened():
        print("❌ Failed to open input video!")
        return

    # video properties
    if isinstance(input_video_path, int):  # Webcam
        is_webcam = True
        desired_fps = 20.0  # Reasonable FPS for processing
        frames = []
        start_time = time.time()
        fps = desired_fps
    else:
        is_webcam = False
        fps = cap.get(cv2.CAP_PROP_FPS)
        if fps is None or fps <= 0:
            fps = 25.0  # fallback

    orig_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    orig_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    print(f"[INFO] Video: {orig_width}x{orig_height}, {fps:.2f} FPS")
    print(f"[INFO] Mode: {MODE}")

    # Resize to fixed width while preserving aspect ratio
    new_width = 1024
    if orig_width > 0:
        new_height_est = int((orig_height / float(orig_width)) * new_width)
    else:
        new_height_est = 576

    writer = None  # lazy init once the first frame size is known

    # EAR / MAR indices
    (lStart, lEnd) = face_utils.FACIAL_LANDMARKS_IDXS["left_eye"]
    (rStart, rEnd) = face_utils.FACIAL_LANDMARKS_IDXS["right_eye"]
    (mStart, mEnd) = (49, 68)

    while True:
        loop_start = time.time()
        ret, frame = cap.read()
        if not ret:
            break

        # resize frame
        frame = imutils.resize(frame, width=new_width)
        h, w = frame.shape[:2]

        # Non-webcam: create writer only after first frame to avoid size mismatch
        if not is_webcam and writer is None:
            fourcc = cv2.VideoWriter_fourcc(*'mp4v')
            writer = cv2.VideoWriter(output_video_path, fourcc, fps, (w, h))
            if not writer.isOpened():
                print("❌ Failed to open VideoWriter for output!")
                cap.release()
                return

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        rects = detector(gray, 0)

        if len(rects) > 0:
            cv2.putText(frame, f"{len(rects)} face(s) found", (10, 50),
                        cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0, 0, 255), 2)

        for rect in rects:
            (bX, bY, bW, bH) = face_utils.rect_to_bb(rect)
            cv2.rectangle(frame, (bX, bY), (bX + bW, bY + bH), (0, 255, 0), 1)

            shape = predictor(gray, rect)
            shape = face_utils.shape_to_np(shape)

            # Eyes
            leftEye = shape[lStart:lEnd]
            rightEye = shape[rStart:rEnd]
            ear = (eye_aspect_ratio(leftEye) + eye_aspect_ratio(rightEye)) / 2.0

            leftHull = cv2.convexHull(leftEye)
            rightHull = cv2.convexHull(rightEye)
            cv2.drawContours(frame, [leftHull], -1, (0, 255, 0), 1)
            cv2.drawContours(frame, [rightHull], -1, (0, 255, 0), 1)

            # Mouth
            mouth = shape[mStart:mEnd]
            mar = mouth_aspect_ratio(mouth)
            mouthHull = cv2.convexHull(mouth)
            cv2.drawContours(frame, [mouthHull], -1, (0, 255, 0), 1)

            # Display metrics
            cv2.putText(frame, f"EAR: {ear:.3f}", (650, 50),
                        cv2.FONT_HERSHEY_SIMPLEX, 1.0, (0, 0, 255), 2)
            cv2.putText(frame, f"MAR: {mar:.3f}", (400, 50),
                        cv2.FONT_HERSHEY_SIMPLEX, 1.0, (0, 0, 255), 2)

            # Unified prediction entry
            status = model_predict(frame, ear, mar)

            # Extra cues for eyes closed / yawning via counters
            if COUNTER >= EYE_AR_CONSEC_FRAMES and ear < EYE_AR_THRESH:
                cv2.putText(frame, "Eyes Closed!", (300, 100),
                            cv2.FONT_HERSHEY_SIMPLEX, 1.2, (0, 0, 255), 2)

            if mar > MOUTH_AR_THRESH:
                cv2.putText(frame, "Yawning!", (800, 100),
                            cv2.FONT_HERSHEY_SIMPLEX, 1.2, (0, 0, 255), 2)

            # Landmark visualization
            for (i, (x, y)) in enumerate(shape):
                cv2.circle(frame, (x, y), 1, (0, 0, 255), -1)

            # Overall status
            if status == "Drowsy":
                color = (0, 0, 255)
                text = "DROWSY!"
            else:
                color = (0, 255, 0)
                text = "Non Drowsy"

            cv2.putText(frame, text, (50, frame.shape[0] - 50),
                        cv2.FONT_HERSHEY_SIMPLEX, 1.2, color, 3)

        # Persist frames / control FPS
        if is_webcam:
            # For webcam: buffer in memory and flush to disk afterward
            frames.append(frame)
            elapsed = time.time() - loop_start
            sleep_time = max(0, (1.0 / fps) - elapsed)
            time.sleep(sleep_time)
        else:
            if writer is not None:
                writer.write(frame)

        # Display output window
        cv2.imshow("Output", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()

    # Write buffered webcam result if any
    if is_webcam:
        total_time = time.time() - start_time
        if len(frames) > 0 and total_time > 0:
            actual_fps = len(frames) / total_time
            h, w = frames[0].shape[:2]
            fourcc = cv2.VideoWriter_fourcc(*'mp4v')
            writer = cv2.VideoWriter(output_video_path, fourcc, actual_fps, (w, h))
            if not writer.isOpened():
                print("❌ Failed to open VideoWriter for webcam output!")
            else:
                for f in frames:
                    writer.write(f)
                writer.release()
    else:
        if writer is not None:
            writer.release()

    # Prevent hanging window on macOS
    for _ in range(10):
        cv2.waitKey(1)
    cv2.destroyAllWindows()

    print(f"saved at {output_video_path}")


def process_video_lstm(input_video_path, output_video_path="output.mp4"):

    global cnn_lstm_frames
    cnn_lstm_frames = []

    print("[INFO] Using CNN+LSTM mode")
    cap = cv2.VideoCapture(input_video_path)
    if not cap.isOpened():
        print("❌ Failed to open input video!")
        return

    fps = cap.get(cv2.CAP_PROP_FPS)
    orig_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    orig_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    new_width = 128  # input size for model
    new_height = 128

    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    writer = cv2.VideoWriter(output_video_path, fourcc, fps, (new_width, new_height))

    if not writer.isOpened():
        print("❌ Failed to open VideoWriter")
        cap.release()
        return

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # resize to model input
        resized = cv2.resize(frame, (new_width,new_height))
        resized_norm = resized.astype("float32") / 255.0
        cnn_lstm_frames.append(resized_norm)

        # keep CNN-LSTM sequence buffer fixed
        if len(cnn_lstm_frames) > CNN_LSTM_SEQ_LEN:
            cnn_lstm_frames.pop(0)

        # default
        status = "Non Drowsy"

        pred = -1
        # Run CNN-LSTM when enough frames are ready
        if len(cnn_lstm_frames) == CNN_LSTM_SEQ_LEN:
            sequence = np.array(cnn_lstm_frames)[np.newaxis, ...]
            pred = cnn_lstm_model.predict(sequence, verbose=0)[0][0]
            if pred < 0.5:
                status = "Drowsy"

        # Clean UI: show status plus real-time probability
        color = (0, 0, 255) if status == "Drowsy" else (0, 255, 0)

        # Draw status text
        cv2.putText(resized, status,
                    (10, new_height - 15),
        cv2.FONT_HERSHEY_SIMPLEX, 0.9, color, 2)

        # Draw probability text (bottom-right)
        cv2.putText(resized, f"P={pred:.2f}",
                    (10, 10),
        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0,255,255), 2)

        writer.write(resized)
        cv2.imshow("CNN-LSTM Output", resized)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    writer.release()
    for _ in range(10): cv2.waitKey(1)
    cv2.destroyAllWindows()
    print(f"[INFO] Saved LSTM result → {output_video_path}")
if __name__ == "__main__":

    parser = argparse.ArgumentParser(description="Drowsiness detection from video or webcam.")
    parser.add_argument("input", nargs='?', default=None,
                        help="Input video path or 'webcam'")
    parser.add_argument("--output", default=None,
                        help="Output video path")
    parser.add_argument("--mode",
                        choices=["landmarker_single", "landmarker_adjacent", "cnn_lstm"],
                        default="landmarker_single",
                        help="Prediction mode")
    args = parser.parse_args()

    if args.input is None:
        print("Usage: python script.py [input_video_path or 'webcam'] "
              "[--output output_video_path] [--mode landmarker_single|landmarker_adjacent|cnn_lstm]")
        sys.exit(1)

    # Set global MODE
    MODE = args.mode



    # Input routing: webcam vs file
    if args.input.lower() == 'webcam':
        input_video_path = 0
        if args.output is None:
            result_dir = "./result"
            os.makedirs(result_dir, exist_ok=True)
            output_video_path = os.path.join(result_dir, "webcam_output.mp4")
        else:
            output_video_path = args.output
    else:
        input_video_path = args.input
        if args.output is None:
            result_dir = "./result"
            os.makedirs(result_dir, exist_ok=True)
            filename = os.path.basename(input_video_path)
            output_video_path = os.path.join(result_dir, filename)
        else:
            output_video_path = args.output

    if MODE == "cnn_lstm":
        cnn_lstm_model = load_cnn_lstm_model()    
        process_video_lstm(input_video_path, output_video_path)
    else:
        process_video_withDetails(input_video_path, output_video_path)

