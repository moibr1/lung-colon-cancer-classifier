"use client";

import { AnimatePresence, motion } from "framer-motion";

interface ImageViewerProps {
  src: string | null;
  onClose: () => void;
}

export function ImageViewer({ src, onClose }: ImageViewerProps) {
  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/85 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="relative max-h-[85vh] max-w-[90vw]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt="Full-screen tissue sample preview"
              className="max-h-[85vh] max-w-[90vw] rounded-2xl border border-strong object-contain shadow-panel"
            />
            <button
              onClick={onClose}
              className="glass-strong absolute -top-4 -right-4 flex h-10 w-10 items-center justify-center rounded-full text-ink"
              aria-label="Close"
            >
              &#10005;
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
