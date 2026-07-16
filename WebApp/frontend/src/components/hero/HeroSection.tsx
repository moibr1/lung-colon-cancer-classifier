"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { MagneticButton } from "@/components/ui/MagneticButton";

const DnaHelix = dynamic(() => import("./DnaHelix").then((m) => m.DnaHelix), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-2 border-cyan-glow/30 border-t-cyan-glow" />
    </div>
  ),
});

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="section-eyebrow mb-6 inline-flex items-center gap-3 rounded-full border border-soft px-4 py-1.5 text-xs uppercase tracking-widest text-cyan-glow">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-glow opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-glow" />
            </span>
            {t("hero", "eyebrow")}
          </div>

          <h1 className="font-display text-4xl font-semibold leading-[1.08] text-ink text-glow sm:text-5xl lg:text-6xl">
            {t("hero", "title1")}
            <br />
            <span className="bg-gradient-to-r from-cyan-glow via-clinical-blue to-stain bg-clip-text text-transparent">
              {t("hero", "title2")}
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-muted">
            {t("hero", "subtitle")}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton onClick={() => scrollTo("diagnose")}>
              {t("hero", "ctaPrimary")}
              <span aria-hidden>&rarr;</span>
            </MagneticButton>
            <MagneticButton variant="secondary" onClick={() => scrollTo("results")}>
              {t("hero", "ctaSecondary")}
            </MagneticButton>
          </div>

          <div className="mt-14 grid max-w-md grid-cols-3 gap-4 border-t border-soft pt-6 font-mono">
            <div>
              <div className="text-2xl font-semibold text-cyan-glow">99.17%</div>
              <div className="mt-1 text-xs text-ink-dim">{t("hero", "statAccuracy")}</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-cyan-glow">0.9998</div>
              <div className="mt-1 text-xs text-ink-dim">{t("hero", "statAuc")}</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-cyan-glow">5</div>
              <div className="mt-1 text-xs text-ink-dim">{t("hero", "statClasses")}</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative h-[420px] sm:h-[520px] lg:h-[620px]"
        >
          <div className="absolute inset-0 rounded-[2rem]">
            <DnaHelix />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="h-9 w-6 rounded-full border border-soft p-1">
          <div className="h-2 w-1 rounded-full bg-cyan-glow" />
        </div>
      </motion.div>
    </section>
  );
}
