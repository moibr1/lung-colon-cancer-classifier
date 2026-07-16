"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ClassId, PerClassMetric } from "@/lib/types";
import { METRIC_COLOR_ORDER, CHART_GRID, CHART_TEXT } from "@/lib/chartColors";
import { ChartCard } from "./ChartCard";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  perClassMetrics: Record<ClassId, PerClassMetric>;
  classOrder: ClassId[];
}

export function PerClassMetricsChart({ perClassMetrics, classOrder }: Props) {
  const { t } = useLanguage();
  const data = classOrder.map((classId) => ({
    name: classId,
    Precision: +(perClassMetrics[classId].precision * 100).toFixed(2),
    Recall: +(perClassMetrics[classId].recall * 100).toFixed(2),
    F1: +(perClassMetrics[classId].f1 * 100).toFixed(2),
    AUC: +(perClassMetrics[classId].auc * 100).toFixed(2),
  }));

  const metricKeys = ["Precision", "Recall", "F1", "AUC"];

  return (
    <ChartCard title={t("charts", "perClassMetrics")}>
      <div className="h-[340px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ left: 4, right: 12, top: 8 }}>
            <CartesianGrid stroke={CHART_GRID} vertical={false} />
            <XAxis dataKey="name" tick={{ fill: CHART_TEXT, fontSize: 10 }} axisLine={{ stroke: CHART_GRID }} tickLine={false} />
            <YAxis
              domain={[90, 100]}
              tick={{ fill: CHART_TEXT, fontSize: 11 }}
              tickFormatter={(v) => `${v}%`}
              axisLine={{ stroke: CHART_GRID }}
              tickLine={false}
              width={44}
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
            {metricKeys.map((key, i) => (
              <Bar key={key} dataKey={key} fill={METRIC_COLOR_ORDER[i]} radius={[4, 4, 0, 0]} maxBarSize={16} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
