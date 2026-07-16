"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { fetchClasses } from "@/lib/api";
import { ClassInfo } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Skeleton } from "@/components/ui/Skeleton";
import { LungIcon, ColonIcon } from "./ClassIcon";

const FALLBACK_CLASSES: ClassInfo[] = [
  {
    id: "colon_aca",
    label: "Colon Adenocarcinoma",
    shortLabel: "Colon ACA",
    organ: "colon",
    malignant: true,
    riskLevel: "high",
    description: "A malignant epithelial tumor of the colon with abnormal glandular architecture.",
  },
  {
    id: "colon_n",
    label: "Colon Benign Tissue",
    shortLabel: "Colon Normal",
    organ: "colon",
    malignant: false,
    riskLevel: "none",
    description: "Normal, benign colonic tissue with regular glandular structure.",
  },
  {
    id: "lung_aca",
    label: "Lung Adenocarcinoma",
    shortLabel: "Lung ACA",
    organ: "lung",
    malignant: true,
    riskLevel: "high",
    description: "A malignant lung tumor arising from glandular epithelial cells.",
  },
  {
    id: "lung_n",
    label: "Lung Benign Tissue",
    shortLabel: "Lung Normal",
    organ: "lung",
    malignant: false,
    riskLevel: "none",
    description: "Normal, benign lung tissue with healthy alveolar structure.",
  },
  {
    id: "lung_scc",
    label: "Lung Squamous Cell Carcinoma",
    shortLabel: "Lung SCC",
    organ: "lung",
    malignant: true,
    riskLevel: "high",
    description: "A malignant lung tumor arising from squamous epithelial cells.",
  },
];

export function ClassesSection() {
  const { t } = useLanguage();
  const [classes, setClasses] = useState<ClassInfo[] | null>(null);

  useEffect(() => {
    fetchClasses()
      .then(setClasses)
      .catch(() => setClasses(FALLBACK_CLASSES));
  }, []);

  return (
    <section id="classes" className="relative px-6 py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="02"
          eyebrow={t("classes", "eyebrow")}
          title={t("classes", "title")}
          subtitle={t("classes", "subtitle")}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {(classes ?? new Array(5).fill(null)).map((cls, i) =>
            cls ? (
              <motion.div
                key={cls.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -8 }}
                className="glass group relative overflow-hidden rounded-3xl p-6 transition-shadow hover:shadow-glow"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 ${
                    cls.malignant ? "bg-clinical-red/60" : "bg-clinical-green/60"
                  }`}
                />
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-glow/15 to-clinical-blue/15 text-cyan-glow transition-transform duration-300 group-hover:scale-110 group-hover:text-stain">
                  {cls.organ === "lung" ? (
                    <LungIcon className="h-6 w-6" />
                  ) : (
                    <ColonIcon className="h-6 w-6" />
                  )}
                </div>
                <span
                  className={`mb-3 inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                    cls.malignant
                      ? "bg-clinical-red/10 text-clinical-red"
                      : "bg-clinical-green/10 text-clinical-green"
                  }`}
                >
                  {cls.malignant ? t("classes", "malignant") : t("classes", "benign")}
                </span>
                <h3 className="font-display text-base font-semibold text-ink">{cls.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{cls.description}</p>
                <div className="mt-4 font-mono text-[11px] text-ink-dim">{cls.id}</div>
              </motion.div>
            ) : (
              <Skeleton key={i} className="h-64 rounded-3xl" />
            )
          )}
        </div>
      </div>
    </section>
  );
}
