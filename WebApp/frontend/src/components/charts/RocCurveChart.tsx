"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ClassId, PerClassMetric } from "@/lib/types";
import { CLASS_COLOR_ORDER, CHART_GRID, CHART_TEXT } from "@/lib/chartColors";
import { ChartCard } from "./ChartCard";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  perClassMetrics: Record<ClassId, PerClassMetric>;
  classOrder: ClassId[];
}

const POINTS = 24;

// Representative ROC curve generated from each class's reported AUC: for a
// curve of the family tpr = 1 - (1 - fpr)^k, the enclosed area is k/(k+1),
// so k = auc / (1 - auc) reproduces the reported AUC exactly. Per-point
// false/true positive rates were not published in the paper, so these
// curves are illustrative, calibrated to the real AUC values.
function generateRocPoints(auc: number) {
  const k = auc >= 0.9999 ? 4000 : auc / Math.max(1 - auc, 0.0001);
  const points = [];
  for (let i = 0; i <= POINTS; i++) {
    const fpr = i / POINTS;
    const tpr = 1 - Math.pow(1 - fpr, k);
    points.push({ fpr: +fpr.toFixed(3), tpr: +Math.min(tpr, 1).toFixed(4) });
  }
  return points;
}

export function RocCurveChart({ perClassMetrics, classOrder }: Props) {
  const { t } = useLanguage();

  const merged = Array.from({ length: POINTS + 1 }, (_, i) => {
    const fpr = i / POINTS;
    const row: Record<string, number> = { fpr: +fpr.toFixed(3) };
    classOrder.forEach((classId) => {
      const curve = generateRocPoints(perClassMetrics[classId]?.auc ?? 0.99);
      row[classId] = curve[i].tpr;
    });
    return row;
  });

  return (
    <ChartCard title={t("charts", "rocCurve")}>
      <div className="h-[340px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={merged} margin={{ left: 4, right: 12, top: 8 }}>
            <CartesianGrid stroke={CHART_GRID} vertical={false} />
            <XAxis
              dataKey="fpr"
              type="number"
              domain={[0, 1]}
              tick={{ fill: CHART_TEXT, fontSize: 11 }}
              axisLine={{ stroke: CHART_GRID }}
              tickLine={false}
              label={{ value: "False Positive Rate", position: "insideBottom", offset: -4, fill: CHART_TEXT, fontSize: 11 }}
            />
            <YAxis
              domain={[0, 1]}
              tick={{ fill: CHART_TEXT, fontSize: 11 }}
              axisLine={{ stroke: CHART_GRID }}
              tickLine={false}
              width={36}
              label={{ value: "TPR", angle: -90, position: "insideLeft", fill: CHART_TEXT, fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{
                background: "#0d1420",
                border: "1px solid rgba(120,190,255,0.2)",
                borderRadius: 12,
                fontSize: 12,
                color: "#e6f1ff",
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11, color: CHART_TEXT }} />
            {classOrder.map((classId, i) => (
              <Line
                key={classId}
                type="monotone"
                dataKey={classId}
                name={`${classId} (AUC ${perClassMetrics[classId]?.auc.toFixed(4)})`}
                stroke={CLASS_COLOR_ORDER[i]}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
