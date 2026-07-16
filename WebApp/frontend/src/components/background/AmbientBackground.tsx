"use client";

import { motion } from "framer-motion";

const COLORS = {
  cyan: "#22d3ee",
  stain: "#c026d3",
  blue: "#3b82f6",
} as const;

const MOLECULES = [
  { top: "12%", left: "8%", size: 90, delay: 0, color: COLORS.cyan },
  { top: "62%", left: "4%", size: 60, delay: 1.2, color: COLORS.stain },
  { top: "22%", left: "88%", size: 70, delay: 0.6, color: COLORS.blue },
  { top: "78%", left: "82%", size: 100, delay: 1.8, color: COLORS.cyan },
  { top: "45%", left: "48%", size: 50, delay: 0.9, color: COLORS.stain },
];

export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-app" />
      <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div className="absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-glow/10 blur-[140px]" />
      <div className="absolute bottom-[-200px] right-[-100px] h-[500px] w-[500px] rounded-full bg-stain/10 blur-[140px]" />

      {MOLECULES.map((m, i) => (
        <motion.svg
          key={i}
          width={m.size}
          height={m.size}
          viewBox="0 0 100 100"
          className="absolute opacity-[0.14]"
          style={{ top: m.top, left: m.left, color: m.color }}
          animate={{ y: [0, -20, 0], x: [0, 8, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 9 + i, repeat: Infinity, ease: "easeInOut", delay: m.delay }}
        >
          <circle cx="50" cy="20" r="9" fill="currentColor" />
          <circle cx="25" cy="55" r="7" fill="currentColor" />
          <circle cx="75" cy="60" r="7" fill="currentColor" />
          <circle cx="50" cy="85" r="5" fill="currentColor" />
          <line x1="50" y1="20" x2="25" y2="55" stroke="currentColor" strokeWidth="1.5" />
          <line x1="50" y1="20" x2="75" y2="60" stroke="currentColor" strokeWidth="1.5" />
          <line x1="25" y1="55" x2="50" y2="85" stroke="currentColor" strokeWidth="1.5" />
          <line x1="75" y1="60" x2="50" y2="85" stroke="currentColor" strokeWidth="1.5" />
        </motion.svg>
      ))}
    </div>
  );
}
