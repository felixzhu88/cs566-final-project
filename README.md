
# Driver Drowsiness Detection Using Facial Visual Cues

A lightweight, real-time driver drowsiness detection system based on **image-based (visual) methods**, using facial landmarks and deep learning. The project compares three approaches:

1. Rule-based single-frame detection (EAR + MAR)  
2. Temporal rule-based method with multi-frame voting  
3. CNN-LSTM spatio-temporal deep learning model  

The system is designed to run on consumer-grade hardware (CPU-only) and can be deployed on embedded devices such as Raspberry Pi or Jetson Nano.

This work is inspired by the comprehensive review:  
**Albadawi, Y.; Takruri, M.; Awad, M. "A Review of Recent Developments in Driver Drowsiness Detection Systems." Sensors 2022, 22(5), 2069.** [[Link]](https://doi.org/10.3390/s22052069)

---

## 1. Environment Setup

We recommend using a virtual environment.

```bash
# Option 1: Using venv (recommended)
python -m venv venv
source venv/bin/activate    # Linux/Mac
# or
venv\Scripts\activate       # Windows

# Option 2: Using conda
conda create -n drowsiness python=3.9
conda activate drowsiness
```

Install dependencies:

```bash
pip install -r requirements.txt
```

> Note: The `requirements.txt` includes OpenCV, dlib, imutils, numpy, tensorflow/keras, scipy, matplotlib, etc.

---

## 2. Data Preparation

The Driver Drowsiness Dataset (DDD) is an extracted and cropped faces of drivers from the videos of the Real-Life Drowsiness Dataset. The frames were extracted from videos as images using VLC software. After that, the Viola-Jones algorithm has been used to extract the region of interest from captured images. The obtained dataset (DDD) has been used for training and testing CNN architecture for driver drowsiness detection in the “Detection and Prediction of Driver Drowsiness for the Prevention of Road Accidents Using Deep Neural Networks Techniques” paper.

1. Check the dataset/data_preview.ipynb to download and preprocess the data

```bash
jupyter notebook dataset/data_preview.ipynb
```

This notebook will:
- Load and visualize sample images
- Show class distribution
- Prepare the data structure expected by training scripts

---

## 3. Project Structure

```
.
├── dataset/                     → Raw and processed data
│   └── data_1/                  → DDD dataset (alert/drowsy folders)
│
├── EAR.py                       → Eye Aspect Ratio calculation module
├── MAR.py                       → Mouth Aspect Ratio (yawning detection) module
├── Drowsiness_detection_landmarker.ipynb       → Landmark-based rule method demo
├── Drowsiness_detection_landmarker_v2.ipynb    → Improved landmark version
├── Driver_Drowsiness_Detection_landmarker.py              → Obsolete real-time webcam demo
│
├── lstm_based/
│   ├── drowsiness_detection_lstm.ipynb         → CNN-LSTM training notebook
│   ├── drowsiness_lstm_model.pkl              → Trained CNN-LSTM model (optional)
│
├── train.png                    → Training curves (loss/accuracy)
├── report.md                    → Project report (Markdown)
├── requirements.txt             → Python dependencies
├── README.md                    → This file
└── .gitignore
```

---

## Usage Examples

### Real-time Detection (Webcam) & uploaded video support 
```bash
python drowsiness_detection.py <input_video_path or webcam> \
    --mode <landmarker_single | landmarker_adjacent | cnn_lstm> \
    --output <optional_output_video_path>
```
example commands
```bash
python drowsiness_detection.py ./test.mp4 --mode landmarker_adjacent
python drowsiness_detection.py webcam --mode cnn_lstm
```

If no --output is provided, results will be automatically saved under: ./result/<same_filename_as_input>.mp4

### Summary 
| Mode                  | Description                                                                                 | Pros                                                                                                                                                     | Cons                                                                                                                                                                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `landmarker_single`   | Uses EAR (eye aspect ratio) + MAR (mouth aspect ratio) to classify each frame independently | - Very fast, lightweight<br>- No deep model required                                                                                                     | - Ignores temporal information<br>- Easily confused by **blinking** and **talking**, since it treats every frame as an independent sample                                                                               |
| `landmarker_adjacent` | Applies temporal smoothing using a sliding window over recent landmark-based predictions    | - More stable against noise<br>- Better for continuous monitoring                                                                                        | - EAR/MAR thresholds are hard to tune                                                          |
| `cnn_lstm`            | Deep learning inference using 5-frame visual sequences (CNN + LSTM model)                   | - Highest accuracy on our controlled test data<br>- Learns temporal fatigue patterns instead of fixed rules<br>- Displays real-time probability on video | - and sensitive to **individual facial ratios**, **camera distance**, and **resolution**.Requires similar camera angle and viewpoint as in the training set<br>- Our training data is relatively simple, so robustness to real-world noise, occlusion, and motion blur is limited<br>- Computationally heavier |



### Train CNN-LSTM Model

Open and run:
```bash
jupyter notebook lstm_based/drowsiness_detection_lstm.ipynb
```

### Run Landmark-based Rule Method

Open one of the notebooks:
```bash
jupyter notebook Drowsiness_detection_landmarker_v2.ipynb
```

---

## Results Summary

| Method                  | Accuracy | Drowsy Recall | F1-score |
|-------------------------|----------|---------------|----------|
| Rule-Based (single frame) | 0.57     | 0.43          | 0.51     |
| Temporal Rule-Based     | 0.74     | 0.86          | 0.82     |
| **CNN-LSTM**            | **1.00** | **1.00**      | **1.00** |

> The CNN-LSTM model shows perfect performance on the test split, demonstrating the power of spatio-temporal modeling for image-based drowsiness detection.

---

## Future Work

- Test on more challenging datasets (e.g., NTHU-DDD)
- Add attention mechanisms for better interpretability
- Deploy on edge devices (Raspberry Pi, Jetson Nano)
- Integrate audio alerts and smartphone/IoT notifications

---

**License**: MIT  
**Authors**: Felix Zhu, Bin Xiao, Linda Wei – University of Wisconsin–Madison
``` 

You can directly save this content as `README.md` in your project root directory.
```