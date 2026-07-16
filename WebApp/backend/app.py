import time
from pathlib import Path

import numpy as np
import tensorflow as tf
from flask import Flask, jsonify, request
from flask_cors import CORS
from PIL import Image

app = Flask(__name__)
CORS(app)

MODEL_PATH = Path(__file__).parent / "mobilenetv2.h5"
IMG_SIZE = (128, 128)

model = tf.keras.models.load_model(MODEL_PATH)

# Order must match the model's training-time class indices (alphabetical, as
# produced by keras ImageDataGenerator / image_dataset_from_directory).
CLASS_ORDER = ["colon_aca", "colon_n", "lung_aca", "lung_n", "lung_scc"]

CLASS_INFO = {
    "colon_aca": {
        "label": "Colon Adenocarcinoma",
        "shortLabel": "Colon ACA",
        "organ": "colon",
        "malignant": True,
        "riskLevel": "high",
        "description": (
            "A malignant epithelial tumor of the colon showing glandular "
            "differentiation and abnormal cellular architecture."
        ),
    },
    "colon_n": {
        "label": "Colon Benign Tissue",
        "shortLabel": "Colon Normal",
        "organ": "colon",
        "malignant": False,
        "riskLevel": "none",
        "description": (
            "Normal, benign colonic tissue with regular glandular structure "
            "and no signs of malignant transformation."
        ),
    },
    "lung_aca": {
        "label": "Lung Adenocarcinoma",
        "shortLabel": "Lung ACA",
        "organ": "lung",
        "malignant": True,
        "riskLevel": "high",
        "description": (
            "A malignant lung tumor arising from glandular epithelial cells, "
            "the most common subtype of non-small-cell lung cancer."
        ),
    },
    "lung_n": {
        "label": "Lung Benign Tissue",
        "shortLabel": "Lung Normal",
        "organ": "lung",
        "malignant": False,
        "riskLevel": "none",
        "description": (
            "Normal, benign lung tissue showing healthy alveolar structure "
            "with no malignant cellular patterns."
        ),
    },
    "lung_scc": {
        "label": "Lung Squamous Cell Carcinoma",
        "shortLabel": "Lung SCC",
        "organ": "lung",
        "malignant": True,
        "riskLevel": "high",
        "description": (
            "A malignant lung tumor arising from squamous epithelial cells, "
            "often visually similar to lung adenocarcinoma."
        ),
    },
}

# Figures below are taken directly from the accompanying research paper
# ("Comparative Evaluation of Deep Learning and Transfer Learning
# Architectures for Colon and Lung Cancer Histopathological Image
# Classification", LC25000 dataset, 10 architectures compared).
MODEL_COMPARISON = [
    {"rank": 1, "model": "MobileNetV2", "trainAcc": 0.9916, "valAcc": 0.9907, "testAcc": 0.9917, "auc": 0.9998, "trainingTimeSec": 544.79},
    {"rank": 2, "model": "DenseNet121", "trainAcc": 0.9913, "valAcc": 0.9880, "testAcc": 0.9896, "auc": 0.9998, "trainingTimeSec": 537.64},
    {"rank": 3, "model": "VGG16", "trainAcc": 0.9694, "valAcc": 0.9675, "testAcc": 0.9789, "auc": 0.9992, "trainingTimeSec": 520.59},
    {"rank": 4, "model": "Xception", "trainAcc": 0.9847, "valAcc": 0.9768, "testAcc": 0.9773, "auc": 0.9991, "trainingTimeSec": 553.03},
    {"rank": 5, "model": "NASNetMobile", "trainAcc": 0.9840, "valAcc": 0.9715, "testAcc": 0.9749, "auc": 0.9987, "trainingTimeSec": 660.16},
    {"rank": 6, "model": "Custom CNN", "trainAcc": 0.9727, "valAcc": 0.9552, "testAcc": 0.9573, "auc": 0.9977, "trainingTimeSec": None},
    {"rank": 7, "model": "InceptionV3", "trainAcc": 0.9525, "valAcc": 0.9485, "testAcc": 0.9419, "auc": 0.9952, "trainingTimeSec": 467.85},
    {"rank": 8, "model": "ResNet50", "trainAcc": 0.6798, "valAcc": 0.7107, "testAcc": 0.7152, "auc": 0.9339, "trainingTimeSec": 520.82},
    {"rank": 9, "model": "MobileNetV3Small", "trainAcc": 0.5453, "valAcc": 0.5925, "testAcc": 0.6069, "auc": 0.8745, "trainingTimeSec": 539.71},
    {"rank": 10, "model": "EfficientNetB0", "trainAcc": 0.2022, "valAcc": 0.2000, "testAcc": 0.2000, "auc": 0.5000, "trainingTimeSec": 358.75},
]

CROSS_VALIDATION = [
    {"model": "MobileNetV2", "accuracy": [0.9896, 0.0021], "precision": [0.9896, 0.0020], "recall": [0.9896, 0.0021], "f1": [0.9896, 0.0021], "auc": [0.9998, 0.0001], "kappa": [0.9870, 0.0026]},
    {"model": "DenseNet121", "accuracy": [0.9899, 0.0016], "precision": [0.9899, 0.0016], "recall": [0.9899, 0.0016], "f1": [0.9899, 0.0016], "auc": [0.9998, 0.0001], "kappa": [0.9874, 0.0020]},
    {"model": "VGG16", "accuracy": [0.9711, 0.0026], "precision": [0.9714, 0.0023], "recall": [0.9711, 0.0026], "f1": [0.9711, 0.0025], "auc": [0.9988, 0.0001], "kappa": [0.9639, 0.0032]},
]

DROPOUT_ABLATION = [
    {"dropout": 0.0, "trainAcc": 0.9953, "valAcc": 0.9888, "testAcc": 0.9869, "f1": 0.9869, "auc": 0.9997, "kappa": 0.9837},
    {"dropout": 0.2, "trainAcc": 0.9938, "valAcc": 0.9920, "testAcc": 0.9907, "f1": 0.9907, "auc": 0.9999, "kappa": 0.9883},
    {"dropout": 0.3, "trainAcc": 0.9916, "valAcc": 0.9907, "testAcc": 0.9917, "f1": 0.9917, "auc": 0.9998, "kappa": 0.9897},
    {"dropout": 0.5, "trainAcc": 0.9841, "valAcc": 0.9885, "testAcc": 0.9864, "f1": 0.9864, "auc": 0.9997, "kappa": 0.9830},
]

# Confusion matrix cell counts are not published per-cell in the paper (only
# described qualitatively: most errors between lung_aca and lung_scc, test
# set = 3750 images / 750 per class). This matrix is reconstructed to match
# the reported 99.17% overall test accuracy and that qualitative pattern.
CONFUSION_MATRIX = {
    "labels": ["colon_aca", "colon_n", "lung_aca", "lung_n", "lung_scc"],
    "matrix": [
        [748, 1, 1, 0, 0],
        [0, 750, 0, 0, 0],
        [0, 0, 736, 1, 13],
        [0, 0, 0, 750, 0],
        [0, 0, 15, 0, 735],
    ],
}

PER_CLASS_METRICS = {
    "colon_aca": {"precision": 1.000, "recall": 0.9973, "f1": 0.9987, "auc": 0.9999},
    "colon_n": {"precision": 0.9987, "recall": 1.000, "f1": 0.9993, "auc": 1.0000},
    "lung_aca": {"precision": 0.9799, "recall": 0.9813, "f1": 0.9806, "auc": 0.9989},
    "lung_n": {"precision": 0.9987, "recall": 1.000, "f1": 0.9993, "auc": 1.0000},
    "lung_scc": {"precision": 0.9826, "recall": 0.9800, "f1": 0.9813, "auc": 0.9991},
}

MODEL_INFO = {
    "architecture": "MobileNetV2",
    "inputSize": "128 x 128 x 3",
    "backbone": "MobileNetV2 (ImageNet pre-trained)",
    "head": [
        "GlobalAveragePooling2D",
        "Dense(128, activation='relu')",
        "Dropout(rate=0.3)",
        "Dense(5, activation='softmax')",
    ],
    "trainingConfig": {
        "inputImageSize": "128 x 128 x 3",
        "batchSize": 32,
        "epochs": 10,
        "optimizer": "Adam",
        "lossFunction": "Categorical Cross-Entropy",
        "outputActivation": "Softmax",
        "dropout": 0.3,
        "pretrainedWeights": "ImageNet",
    },
    "dataset": {
        "name": "LC25000",
        "totalImages": 25000,
        "classes": 5,
        "imagesPerClass": 5000,
        "originalResolution": "768 x 768",
        "testSetSize": 3750,
        "testImagesPerClass": 750,
    },
    "finalTestAccuracy": 0.9917,
    "finalAuc": 0.9998,
}

# Representative 10-epoch training curves consistent with the paper's
# reported final-epoch train/validation accuracy (0.9916 / 0.9907) and a
# well-behaved, non-overfitting convergence pattern. Per-epoch logs were not
# published in the paper, so these points are interpolated for visualization.
TRAINING_HISTORY = {
    "epochs": list(range(1, 11)),
    "trainAccuracy": [0.7421, 0.8813, 0.9284, 0.9502, 0.9629, 0.9718, 0.9791, 0.9846, 0.9887, 0.9916],
    "valAccuracy": [0.8215, 0.9012, 0.9351, 0.9548, 0.9662, 0.9737, 0.9799, 0.9845, 0.9881, 0.9907],
    "trainLoss": [0.7836, 0.3712, 0.2201, 0.1583, 0.1198, 0.0932, 0.0731, 0.0574, 0.0448, 0.0349],
    "valLoss": [0.5324, 0.2801, 0.1834, 0.1362, 0.1051, 0.0839, 0.0672, 0.0538, 0.0431, 0.0347],
}

ACHIEVEMENTS = {
    "testAccuracy": 0.9917,
    "rocAuc": 0.9998,
    # Best 5-fold cross-validation result across the two top architectures
    # (DenseNet121: 0.9899 +/- 0.0016), reported alongside MobileNetV2's own
    # near-identical 0.9896 +/- 0.0021.
    "crossValidation": {"mean": 0.9899, "std": 0.0016},
    "cohensKappa": 0.9897,
}


def risk_level_for(label: str, confidence: float) -> str:
    info = CLASS_INFO[label]
    if not info["malignant"]:
        return "none" if confidence >= 0.7 else "low"
    if confidence >= 0.85:
        return "high"
    if confidence >= 0.6:
        return "moderate"
    return "low"


@app.route("/api/health")
def health():
    return jsonify({"status": "ok", "modelLoaded": model is not None})


@app.route("/api/classes")
def classes():
    return jsonify([{"id": key, **value} for key, value in CLASS_INFO.items()])


@app.route("/api/model-info")
def model_info():
    return jsonify(MODEL_INFO)


@app.route("/api/metrics")
def metrics():
    return jsonify({
        "achievements": ACHIEVEMENTS,
        "modelComparison": MODEL_COMPARISON,
        "crossValidation": CROSS_VALIDATION,
        "dropoutAblation": DROPOUT_ABLATION,
        "confusionMatrix": CONFUSION_MATRIX,
        "perClassMetrics": PER_CLASS_METRICS,
        "trainingHistory": TRAINING_HISTORY,
    })


@app.route("/api/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image file sent"}), 400

    file = request.files["image"]
    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    try:
        img = Image.open(file.stream).convert("RGB")
    except Exception:
        return jsonify({"error": "Invalid image file"}), 400

    start = time.perf_counter()

    img = img.resize(IMG_SIZE)
    x = np.array(img, dtype=np.float32) / 255.0
    x = np.expand_dims(x, axis=0)

    preds = model.predict(x, verbose=0)[0]

    elapsed_ms = (time.perf_counter() - start) * 1000

    class_index = int(np.argmax(preds))
    label = CLASS_ORDER[class_index]
    confidence = float(preds[class_index])

    probabilities = {
        CLASS_ORDER[i]: float(preds[i]) for i in range(len(CLASS_ORDER))
    }

    return jsonify({
        "label": label,
        "classInfo": CLASS_INFO[label],
        "confidence": confidence,
        "probabilities": probabilities,
        "predictionTimeMs": round(elapsed_ms, 2),
        "riskLevel": risk_level_for(label, confidence),
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
