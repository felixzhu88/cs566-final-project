
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

The dataset used is the **Kaggle Driver Drowsiness Dataset (DDD)**, derived from the Real-Life Drowsiness Dataset with cropped faces.

1. Download the dataset from Kaggle and place it in:
   ```
   dataset/data_1/
   ```
   (Keep the original folder structure: subfolders for alert/drowsy classes)

2. Run the data preview and preprocessing notebook:

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
│   └── data_1/                  → Original Kaggle DDD dataset (alert/drowsy folders)
│
├── EAR.py                       → Eye Aspect Ratio calculation module
├── MAR.py                       → Mouth Aspect Ratio (yawning detection) module
├── Drowsiness_detection_landmarker.ipynb       → Landmark-based rule method demo
├── Drowsiness_detection_landmarker_v2.ipynb    → Improved landmark version
├── Driver Drowsiness Detection.py              → Main real-time webcam demo
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

### Real-time Detection (Webcam)

```bash
python "Driver Drowsiness Detection.py"
```

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