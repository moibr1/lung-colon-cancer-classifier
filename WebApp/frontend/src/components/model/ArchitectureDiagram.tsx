"use client";

import { motion } from "framer-motion";

const STAGES = [
  { label: "Input", sub: "128×128×3" },
  { label: "MobileNetV2", sub: "ImageNet backbone" },
  { label: "GlobalAvgPool2D", sub: "feature vector" },
  { label: "Dense · 128", sub: "ReLU" },
  { label: "Dropout", sub: "rate 0.3" },
  { label: "Dense · 5", sub: "Softmax" },
];

export function ArchitectureDiagram() {
  return (
    <div className="no-scrollbar flex items-center gap-3 overflow-x-auto py-6">
      {STAGES.map((stage, i) => (
        <div key={stage.label} className="flex shrink-0 items-center gap-3">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="glass flex w-36 flex-col items-center rounded-2xl px-4 py-5 text-center"
          >
            <span className="font-display text-sm font-semibold text-ink">{stage.label}</span>
            <span className="mt-1 font-mono text-[11px] text-ink-dim">{stage.sub}</span>
          </motion.div>
          {i < STAGES.length - 1 && (
            <motion.svg
              width="24"
              height="12"
              viewBox="0 0 24 12"
              fill="none"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.2 }}
              className="shrink-0 text-cyan-glow"
            >
              <path d="M0 6h20m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </motion.svg>
          )}
        </div>
      ))}
    </div>
  );
}
