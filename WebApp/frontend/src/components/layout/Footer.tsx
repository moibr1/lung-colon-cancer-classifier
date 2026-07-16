"use client";

import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="relative border-t border-soft px-6 py-12 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-glow to-clinical-blue text-xs font-bold text-[#04121a]">
            H
          </span>
          HistoDx<span className="text-cyan-glow">AI</span>
        </div>
        <p className="max-w-xl text-sm text-ink-muted">{t("footer", "tagline")}</p>
        <p className="max-w-xl font-mono text-xs text-ink-dim">{t("footer", "disclaimer")}</p>
        <p className="mt-4 text-xs text-ink-dim">
          MobileNetV2 &middot; LC25000 Dataset &middot; TensorFlow / Keras &middot; Flask API
        </p>
      </div>
    </footer>
  );
}
