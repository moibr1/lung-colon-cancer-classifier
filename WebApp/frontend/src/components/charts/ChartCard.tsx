"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  legend?: ReactNode;
}

export function ChartCard({ title, children, className, legend }: ChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`glass rounded-3xl p-6 ${className ?? ""}`}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-sm font-semibold text-ink">{title}</h3>
        {legend}
      </div>
      {children}
    </motion.div>
  );
}

export function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-ink-muted">
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}
