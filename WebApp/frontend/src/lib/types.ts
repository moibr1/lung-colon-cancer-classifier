export type ClassId = "colon_aca" | "colon_n" | "lung_aca" | "lung_n" | "lung_scc";

export interface ClassInfo {
  id: ClassId;
  label: string;
  shortLabel: string;
  organ: "colon" | "lung";
  malignant: boolean;
  riskLevel: "none" | "high";
  description: string;
}

export interface PredictionResponse {
  label: ClassId;
  classInfo: ClassInfo;
  confidence: number;
  probabilities: Record<ClassId, number>;
  predictionTimeMs: number;
  riskLevel: "none" | "low" | "moderate" | "high";
}

export interface ModelInfo {
  architecture: string;
  inputSize: string;
  backbone: string;
  head: string[];
  trainingConfig: {
    inputImageSize: string;
    batchSize: number;
    epochs: number;
    optimizer: string;
    lossFunction: string;
    outputActivation: string;
    dropout: number;
    pretrainedWeights: string;
  };
  dataset: {
    name: string;
    totalImages: number;
    classes: number;
    imagesPerClass: number;
    originalResolution: string;
    testSetSize: number;
    testImagesPerClass: number;
  };
  finalTestAccuracy: number;
  finalAuc: number;
}

export interface ModelComparisonRow {
  rank: number;
  model: string;
  trainAcc: number;
  valAcc: number;
  testAcc: number;
  auc: number;
  trainingTimeSec: number | null;
}

export interface CrossValidationRow {
  model: string;
  accuracy: [number, number];
  precision: [number, number];
  recall: [number, number];
  f1: [number, number];
  auc: [number, number];
  kappa: [number, number];
}

export interface DropoutAblationRow {
  dropout: number;
  trainAcc: number;
  valAcc: number;
  testAcc: number;
  f1: number;
  auc: number;
  kappa: number;
}

export interface ConfusionMatrixData {
  labels: ClassId[];
  matrix: number[][];
}

export interface PerClassMetric {
  precision: number;
  recall: number;
  f1: number;
  auc: number;
}

export interface TrainingHistory {
  epochs: number[];
  trainAccuracy: number[];
  valAccuracy: number[];
  trainLoss: number[];
  valLoss: number[];
}

export interface MetricsResponse {
  achievements: {
    testAccuracy: number;
    rocAuc: number;
    crossValidation: { mean: number; std: number };
    cohensKappa: number;
  };
  modelComparison: ModelComparisonRow[];
  crossValidation: CrossValidationRow[];
  dropoutAblation: DropoutAblationRow[];
  confusionMatrix: ConfusionMatrixData;
  perClassMetrics: Record<ClassId, PerClassMetric>;
  trainingHistory: TrainingHistory;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  thumbnail: string;
  label: ClassId;
  displayLabel: string;
  confidence: number;
  riskLevel: string;
  predictionTimeMs: number;
}
