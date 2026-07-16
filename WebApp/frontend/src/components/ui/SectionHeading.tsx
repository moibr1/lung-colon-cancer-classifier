"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={clsx("mb-14 max-w-2xl", align === "center" && "mx-auto text-center")}
    >
      <div
        className={clsx(
          "section-eyebrow mb-4 flex items-center gap-3 text-xs uppercase text-cyan-glow",
          align === "center" && "justify-center"
        )}
      >
        <span className="opacity-60">{`// ${index}`}</span>
        <span className="h-px w-8 bg-cyan-glow/50" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-ink-muted">{subtitle}</p>}
    </motion.div>
  );
}
