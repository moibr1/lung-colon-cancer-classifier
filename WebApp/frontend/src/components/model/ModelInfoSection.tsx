"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { fetchModelInfo } from "@/lib/api";
import { ModelInfo } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { Skeleton } from "@/components/ui/Skeleton";

export function ModelInfoSection() {
  const { t } = useLanguage();
  const [info, setInfo] = useState<ModelInfo | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetchModelInfo().catch(() => null).then(setInfo);
  }, []);

  return (
    <section id="model" className="relative px-6 py-28 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          index="03"
          eyebrow={t("model", "eyebrow")}
          title={t("model", "title")}
          subtitle={t("model", "subtitle")}
        />

        <div className="glass-strong rounded-3xl p-6 sm:p-8">
          <ArchitectureDiagram />

          <button
            onClick={() => setExpanded((e) => !e)}
            className="mt-6 flex items-center gap-2 rounded-full border border-soft px-5 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:border-strong hover:text-ink"
          >
            {expanded ? t("model", "collapse") : t("model", "expand")}
            <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
              &#9660;
            </motion.span>
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                {!info ? (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <Skeleton className="h-48 rounded-2xl" />
                    <Skeleton className="h-48 rounded-2xl" />
                  </div>
                ) : (
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <div>
                      <h4 className="section-eyebrow mb-3 text-xs uppercase text-cyan-glow">
                        {t("model", "trainingConfig")}
                      </h4>
                      <dl className="space-y-2 font-mono text-sm">
                        {Object.entries(info.trainingConfig).map(([key, value]) => (
                          <div key={key} className="flex justify-between border-b border-soft pb-2">
                            <dt className="text-ink-dim">{key}</dt>
                            <dd className="text-ink">{String(value)}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                    <div>
                      <h4 className="section-eyebrow mb-3 text-xs uppercase text-cyan-glow">
                        {t("model", "datasetInfo")}
                      </h4>
                      <dl className="space-y-2 font-mono text-sm">
                        {Object.entries(info.dataset).map(([key, value]) => (
                          <div key={key} className="flex justify-between border-b border-soft pb-2">
                            <dt className="text-ink-dim">{key}</dt>
                            <dd className="text-ink">{String(value)}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
