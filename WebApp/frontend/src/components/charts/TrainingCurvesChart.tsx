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
import { CHART_COLORS, CHART_GRID, CHART_TEXT } from "@/lib/chartColors";
import { ChartCard } from "./ChartCard";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  title: string;
  epochs: number[];
  trainSeries: number[];
  valSeries: number[];
  trainLabel: string;
  valLabel: string;
  domain: [number, number];
  formatTick?: (v: number) => string;
}

export function TrainingCurvesChart({
  title,
  epochs,
  trainSeries,
  valSeries,
  trainLabel,
  valLabel,
  domain,
  formatTick,
}: Props) {
  const { t } = useLanguage();
  const data = epochs.map((epoch, i) => ({
    epoch,
    [trainLabel]: trainSeries[i],
    [valLabel]: valSeries[i],
  }));

  return (
    <ChartCard title={title}>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ left: 4, right: 12, top: 8 }}>
            <CartesianGrid stroke={CHART_GRID} vertical={false} />
            <XAxis
              dataKey="epoch"
              tick={{ fill: CHART_TEXT, fontSize: 11 }}
              axisLine={{ stroke: CHART_GRID }}
              tickLine={false}
              label={{ value: t("charts", "epoch"), position: "insideBottom", offset: -4, fill: CHART_TEXT, fontSize: 11 }}
            />
            <YAxis
              domain={domain}
              tick={{ fill: CHART_TEXT, fontSize: 11 }}
              tickFormatter={formatTick}
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
            <Legend wrapperStyle={{ fontSize: 12, color: CHART_TEXT }} />
            <Line
              type="monotone"
              dataKey={trainLabel}
              stroke={CHART_COLORS.amber}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey={valLabel}
              stroke={CHART_COLORS.cyan}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
