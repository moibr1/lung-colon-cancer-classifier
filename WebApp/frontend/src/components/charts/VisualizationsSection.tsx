"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { fetchMetrics } from "@/lib/api";
import { MetricsResponse } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Skeleton } from "@/components/ui/Skeleton";
import { AccuracyComparisonChart } from "./AccuracyComparisonChart";
import { TrainingCurvesChart } from "./TrainingCurvesChart";
import { RocCurveChart } from "./RocCurveChart";
import { ConfusionMatrixHeatmap } from "./ConfusionMatrixHeatmap";
import { PerClassMetricsChart } from "./PerClassMetricsChart";

export function VisualizationsSection() {
  const { t } = useLanguage();
  const [metrics, setMetrics] = useState<MetricsResponse | null>(null);

  useEffect(() => {
    fetchMetrics().catch(() => null).then(setMetrics);
  }, []);

  return (
    <section id="visualizations" className="relative px-6 py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="05"
          eyebrow={t("charts", "eyebrow")}
          title={t("charts", "title")}
        />

        {!metrics ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {new Array(6).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-[380px] rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <AccuracyComparisonChart data={metrics.modelComparison} />
            <ConfusionMatrixHeatmap data={metrics.confusionMatrix} />
            <TrainingCurvesChart
              title={t("charts", "trainingCurves")}
              epochs={metrics.trainingHistory.epochs}
              trainSeries={metrics.trainingHistory.trainAccuracy.map((v) => +(v * 100).toFixed(2))}
              valSeries={metrics.trainingHistory.valAccuracy.map((v) => +(v * 100).toFixed(2))}
              trainLabel="Train Accuracy"
              valLabel="Validation Accuracy"
              domain={[70, 100]}
              formatTick={(v) => `${v}%`}
            />
            <TrainingCurvesChart
              title={t("charts", "lossCurves")}
              epochs={metrics.trainingHistory.epochs}
              trainSeries={metrics.trainingHistory.trainLoss}
              valSeries={metrics.trainingHistory.valLoss}
              trainLabel="Train Loss"
              valLabel="Validation Loss"
              domain={[0, 0.8]}
            />
            <RocCurveChart perClassMetrics={metrics.perClassMetrics} classOrder={metrics.confusionMatrix.labels} />
            <PerClassMetricsChart perClassMetrics={metrics.perClassMetrics} classOrder={metrics.confusionMatrix.labels} />
          </div>
        )}
      </div>
    </section>
  );
}
