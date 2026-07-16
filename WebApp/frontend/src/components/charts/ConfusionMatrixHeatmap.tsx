"use client";

import { motion } from "framer-motion";
import { ConfusionMatrixData } from "@/lib/types";
import { ChartCard } from "./ChartCard";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  data: ConfusionMatrixData;
}

export function ConfusionMatrixHeatmap({ data }: Props) {
  const { t } = useLanguage();
  const max = Math.max(...data.matrix.flat());

  return (
    <ChartCard title={t("charts", "confusionMatrix")}>
      <div className="overflow-x-auto">
        <div className="grid" style={{ gridTemplateColumns: `100px repeat(${data.labels.length}, 1fr)` }}>
          <div />
          {data.labels.map((label) => (
            <div key={label} className="px-1 pb-2 text-center font-mono text-[10px] text-ink-dim">
              {label}
            </div>
          ))}
          {data.matrix.map((row, i) => (
            <div key={data.labels[i]} className="contents">
              <div className="flex items-center pe-2 font-mono text-[10px] text-ink-dim">{data.labels[i]}</div>
              {row.map((value, j) => {
                const intensity = value / max;
                return (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: (i * data.labels.length + j) * 0.02 }}
                    className="m-0.5 flex aspect-square items-center justify-center rounded-lg font-mono text-xs font-semibold"
                    style={{
                      backgroundColor: `rgba(8, 145, 178, ${0.08 + intensity * 0.82})`,
                      color: intensity > 0.5 ? "#f4fbff" : "#8ba2bd",
                    }}
                    title={`${data.labels[i]} → ${data.labels[j]}: ${value}`}
                  >
                    {value}
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-ink-dim">
        <span>Predicted &rarr;</span>
        <span>True label &darr; (rows)</span>
      </div>
    </ChartCard>
  );
}
