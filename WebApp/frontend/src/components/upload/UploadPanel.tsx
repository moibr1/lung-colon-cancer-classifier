"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/context/ToastContext";
import { useHistory } from "@/context/HistoryContext";
import { predictImage } from "@/lib/api";
import { PredictionResponse } from "@/lib/types";
import { ResultCard } from "./ResultCard";
import { ImageViewer } from "./ImageViewer";
import { ResultSkeleton } from "@/components/ui/Skeleton";
import { SectionHeading } from "@/components/ui/SectionHeading";

function makeThumbnail(file: File, maxSize = 120): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image();
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function UploadPanel() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const { addEntry } = useHistory();

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [viewerSrc, setViewerSrc] = useState<string | null>(null);

  const onDrop = useCallback((accepted: File[]) => {
    const picked = accepted[0];
    if (!picked) return;
    setFile(picked);
    setPreviewUrl(URL.createObjectURL(picked));
    setResult(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/png": [".png"], "image/jpeg": [".jpg", ".jpeg"] },
    multiple: false,
  });

  function handleRemove() {
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
  }

  async function handleAnalyze() {
    if (!file || !previewUrl) {
      showToast(t("upload", "chooseFirst"), "error");
      return;
    }
    setIsAnalyzing(true);
    try {
      const prediction = await predictImage(file);
      setResult(prediction);
      showToast(t("toast", "predictionSuccess"), "success");

      const thumbnail = await makeThumbnail(file).catch(() => previewUrl);
      addEntry({
        id: `${Date.now()}`,
        timestamp: Date.now(),
        thumbnail,
        label: prediction.label,
        displayLabel: prediction.classInfo.label,
        confidence: prediction.confidence,
        riskLevel: prediction.riskLevel,
        predictionTimeMs: prediction.predictionTimeMs,
      });
    } catch {
      showToast(t("toast", "predictionError"), "error");
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <section id="diagnose" className="relative px-6 py-28 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          index="01"
          eyebrow={t("upload", "eyebrow")}
          title={t("upload", "title")}
          subtitle={t("upload", "subtitle")}
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            {!previewUrl ? (
              <div
                {...getRootProps()}
                className={`glass flex h-80 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed p-8 text-center transition-colors ${
                  isDragActive ? "border-cyan-glow bg-cyan-glow/5" : "border-soft"
                }`}
              >
                <input {...getInputProps()} />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-glow/20 to-clinical-blue/20"
                >
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 16V4m0 0 4 4m-4-4-4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
                      stroke="#22d3ee"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
                <p className="font-medium text-ink">{t("upload", "dropzoneTitle")}</p>
                <p className="mt-2 text-sm text-ink-dim">{t("upload", "dropzoneSubtitle")}</p>
              </div>
            ) : (
              <div className="glass relative flex h-80 flex-col items-center justify-center overflow-hidden rounded-3xl p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="Selected tissue sample preview"
                  className="max-h-full max-w-full rounded-2xl object-contain"
                />
                {isAnalyzing && (
                  <div className="absolute inset-0 overflow-hidden rounded-3xl bg-black/30">
                    <div className="absolute inset-x-0 h-1 animate-scan-sweep bg-gradient-to-r from-transparent via-cyan-glow to-transparent shadow-glow" />
                  </div>
                )}
                <div className="absolute top-3 flex w-full justify-between px-3">
                  <button
                    onClick={() => setViewerSrc(previewUrl)}
                    className="glass-strong rounded-full p-2 text-ink-muted hover:text-ink"
                    aria-label={t("upload", "zoom")}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6" />
                      <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </button>
                  <button
                    onClick={handleRemove}
                    className="glass-strong rounded-full p-2 text-ink-muted hover:text-clinical-red"
                    aria-label={t("upload", "remove")}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={!file || isAnalyzing}
              className="group relative mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-glow to-clinical-blue px-6 py-4 font-semibold text-[#04121a] shadow-glow transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isAnalyzing ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#04121a]/30 border-t-[#04121a]" />
                  {t("upload", "analyzing")}
                </>
              ) : (
                t("upload", "analyze")
              )}
            </button>
          </div>

          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {isAnalyzing && <ResultSkeleton key="skeleton" />}
              {!isAnalyzing && result && previewUrl && (
                <ResultCard key="result" result={result} previewUrl={previewUrl} onReset={handleRemove} />
              )}
              {!isAnalyzing && !result && (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass flex h-80 items-center justify-center rounded-3xl border border-dashed border-soft p-8 text-center text-sm text-ink-dim lg:h-full"
                >
                  {t("upload", "chooseFirst")}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <ImageViewer src={viewerSrc} onClose={() => setViewerSrc(null)} />
    </section>
  );
}
