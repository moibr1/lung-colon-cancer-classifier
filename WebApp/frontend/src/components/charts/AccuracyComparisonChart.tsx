"use client";

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ModelComparisonRow } from "@/lib/types";
import { CHART_COLORS, CHART_GRID, CHART_TEXT } from "@/lib/chartColors";
import { ChartCard } from "./ChartCard";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  data: ModelComparisonRow[];
}

export function AccuracyComparisonChart({ data }: Props) {
  const { t } = useLanguage();
  const chartData = [...data]
    .sort((a, b) => b.testAcc - a.testAcc)
    .map((row) => ({ name: row.model, accuracy: +(row.testAcc * 100).toFixed(2) }));

  return (
    <ChartCard title={t("charts", "accuracyComparison")}>
      <div className="h-[360px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 24 }}>
            <XAxis
              type="number"
              domain={[0, 100]}
              tick={{ fill: CHART_TEXT, fontSize: 11 }}
              tickFormatter={(v) => `${v}%`}
              axisLine={{ stroke: CHART_GRID }}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={120}
              tick={{ fill: CHART_TEXT, fontSize: 11 }}
              axisLine={{ stroke: CHART_GRID }}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: "rgba(139,162,189,0.08)" }}
              contentStyle={{
                background: "#0d1420",
                border: "1px solid rgba(120,190,255,0.2)",
                borderRadius: 12,
                fontSize: 12,
                color: "#e6f1ff",
              }}
              formatter={(value) => [`${value}%`, "Test Accuracy"]}
            />
            <Bar dataKey="accuracy" radius={[0, 6, 6, 0]} maxBarSize={18}>
              {chartData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={entry.name === "MobileNetV2" ? CHART_COLORS.cyan : "rgba(139,162,189,0.35)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
