import type { ClassInfo, MetricsResponse, ModelInfo, PredictionResponse } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    throw new Error(`Request to ${path} failed with ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export function fetchClasses(): Promise<ClassInfo[]> {
  return getJson<ClassInfo[]>("/api/classes");
}

export function fetchModelInfo(): Promise<ModelInfo> {
  return getJson<ModelInfo>("/api/model-info");
}

export function fetchMetrics(): Promise<MetricsResponse> {
  return getJson<MetricsResponse>("/api/metrics");
}

export async function predictImage(file: File): Promise<PredictionResponse> {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API_BASE}/api/predict`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(body.error ?? `Prediction failed with ${res.status}`);
  }

  return res.json() as Promise<PredictionResponse>;
}
