"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "./AnimatedCounter";

const CARDS = [
  { key: "testAccuracy", value: 99.17, decimals: 2, suffix: "%" },
  { key: "rocAuc", value: 0.9998, decimals: 4, suffix: "" },
  { key: "crossValidation", value: 98.99, decimals: 2, suffix: "%", note: "± 0.16" },
  { key: "kappa", value: 0.9897, decimals: 4, suffix: "" },
] as const;

export function AchievementsSection() {
  const { t } = useLanguage();

  return (
    <section id="results" className="relative px-6 py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="04"
          eyebrow={t("results", "eyebrow")}
          title={t("results", "title")}
          subtitle={t("results", "subtitle")}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-strong relative overflow-hidden rounded-3xl p-7"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-cyan-glow/10 blur-2xl" />
              <div className="font-display text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-glow to-clinical-blue bg-clip-text">
                <AnimatedCounter value={card.value} decimals={card.decimals} suffix={card.suffix} />
              </div>
              {"note" in card && card.note && (
                <div className="mt-1 font-mono text-xs text-ink-dim">{card.note}</div>
              )}
              <div className="mt-3 text-sm font-medium text-ink-muted">{t("results", card.key)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
