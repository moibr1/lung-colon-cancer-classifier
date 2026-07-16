"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/context/ToastContext";
import { PredictionResponse } from "@/lib/types";
import { exportElementAsPdf } from "@/lib/pdfExport";
import { MagneticButton } from "@/components/ui/MagneticButton";

const RISK_STYLES: Record<string, { text: string; bg: string; ring: string }> = {
  none: { text: "text-clinical-green", bg: "bg-clinical-green/10", ring: "ring-clinical-green/30" },
  low: { text: "text-clinical-amber", bg: "bg-clinical-amber/10", ring: "ring-clinical-amber/30" },
  moderate: { text: "text-clinical-amber", bg: "bg-clinical-amber/10", ring: "ring-clinical-amber/30" },
  high: { text: "text-clinical-red", bg: "bg-clinical-red/10", ring: "ring-clinical-red/30" },
};

interface ResultCardProps {
  result: PredictionResponse;
  previewUrl: string;
  onReset: () => void;
}

export function ResultCard({ result, previewUrl, onReset }: ResultCardProps) {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const cardRef = useRef<HTMLDivElement>(null);
  const risk = RISK_STYLES[result.riskLevel] ?? RISK_STYLES.none;
  const confidencePct = (result.confidence * 100).toFixed(2);

  async function handleDownloadPdf() {
    if (!cardRef.current) return;
    await exportElementAsPdf(cardRef.current, `histodx-report-${result.label}-${Date.now()}.pdf`);
    showToast(t("toast", "pdfReady"), "success");
  }

  const sortedProbs = Object.entries(result.probabilities).sort((a, b) => b[1] - a[1]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      ref={cardRef}
      className="glass-strong overflow-hidden rounded-3xl p-6 sm:p-8"
    >
      <div className="mb-6 flex items-center justify-between">
        <h3 className="section-eyebrow text-xs uppercase tracking-widest text-cyan-glow">
          {t("upload", "resultTitle")}
        </h3>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${risk.text} ${risk.bg} ${risk.ring}`}>
          {t("risk", result.riskLevel)}
        </span>
      </div>

      <div className="flex flex-col gap-6 sm:flex-row">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={previewUrl}
          alt="Analyzed tissue sample"
          className="h-32 w-32 shrink-0 rounded-2xl border border-soft object-cover"
        />

        <div className="flex-1">
          <div className="text-xs uppercase tracking-wide text-ink-dim">{t("upload", "predictedClass")}</div>
          <div className="mt-1 font-display text-2xl font-semibold text-ink">{result.classInfo.label}</div>
          <p className="mt-2 text-sm text-ink-muted">{result.classInfo.description}</p>
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-ink-muted">{t("upload", "confidence")}</span>
          <span className="font-mono font-semibold text-cyan-glow">{confidencePct}%</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-white/5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${result.confidence * 100}%` }}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
            className="h-full rounded-full bg-gradient-to-r from-cyan-glow via-clinical-blue to-stain"
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="glass rounded-2xl p-4">
          <div className="text-xs uppercase tracking-wide text-ink-dim">{t("upload", "predictionTime")}</div>
          <div className="mt-1 font-mono text-xl font-semibold text-ink">{result.predictionTimeMs} ms</div>
        </div>
        <div className="glass rounded-2xl p-4">
          <div className="text-xs uppercase tracking-wide text-ink-dim">{t("upload", "riskLevel")}</div>
          <div className={`mt-1 font-mono text-xl font-semibold ${risk.text}`}>{t("risk", result.riskLevel)}</div>
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-3 text-xs uppercase tracking-wide text-ink-dim">{t("upload", "probabilities")}</div>
        <div className="space-y-2.5">
          {sortedProbs.map(([classId, prob], i) => (
            <div key={classId} className="flex items-center gap-3">
              <span className="w-24 shrink-0 font-mono text-xs text-ink-muted">{classId}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${prob * 100}%` }}
                  transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 + i * 0.08 }}
                  className="h-full rounded-full bg-clinical-blue/70"
                />
              </div>
              <span className="w-14 shrink-0 text-end font-mono text-xs text-ink-muted">
                {(prob * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-8 border-t border-soft pt-4 text-xs text-ink-dim">{t("upload", "disclaimer")}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <MagneticButton onClick={handleDownloadPdf} variant="secondary">
          {t("upload", "downloadPdf")}
        </MagneticButton>
        <MagneticButton onClick={onReset}>{t("upload", "newAnalysis")}</MagneticButton>
      </div>
    </motion.div>
  );
}
