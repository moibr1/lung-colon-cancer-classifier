"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useHistory } from "@/context/HistoryContext";
import { useToast } from "@/context/ToastContext";
import { SectionHeading } from "@/components/ui/SectionHeading";

const RISK_DOT: Record<string, string> = {
  none: "bg-clinical-green",
  low: "bg-clinical-amber",
  moderate: "bg-clinical-amber",
  high: "bg-clinical-red",
};

export function PredictionHistoryPanel() {
  const { t } = useLanguage();
  const { entries, clearHistory } = useHistory();
  const { showToast } = useToast();

  return (
    <section id="history" className="relative px-6 py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading index="06" eyebrow="" title={t("history", "title")} />
          {entries.length > 0 && (
            <button
              onClick={() => {
                clearHistory();
                showToast(t("toast", "historyCleared"), "info");
              }}
              className="glass rounded-full px-4 py-2 text-xs font-medium text-ink-muted hover:text-clinical-red"
            >
              {t("history", "clear")}
            </button>
          )}
        </div>

        {entries.length === 0 ? (
          <div className="glass flex h-40 items-center justify-center rounded-3xl text-sm text-ink-dim">
            {t("history", "empty")}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <AnimatePresence>
              {entries.map((entry) => (
                <motion.div
                  key={entry.id}
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  className="glass overflow-hidden rounded-2xl"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={entry.thumbnail} alt={entry.displayLabel} className="h-24 w-full object-cover" />
                  <div className="p-3">
                    <div className="flex items-center gap-1.5">
                      <span className={`h-1.5 w-1.5 rounded-full ${RISK_DOT[entry.riskLevel] ?? "bg-clinical-green"}`} />
                      <span className="truncate font-mono text-[10px] text-ink-dim">{entry.label}</span>
                    </div>
                    <div className="mt-1 font-mono text-xs font-semibold text-cyan-glow">
                      {(entry.confidence * 100).toFixed(1)}%
                    </div>
                    <div className="mt-0.5 text-[10px] text-ink-dim">
                      {new Date(entry.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
