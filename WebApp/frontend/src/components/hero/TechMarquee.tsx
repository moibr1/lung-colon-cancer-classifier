"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const ITEMS = [
  "MobileNetV2",
  "TensorFlow",
  "Keras",
  "LC25000 Dataset",
  "Transfer Learning",
  "Flask API",
  "React Three Fiber",
  "GSAP",
  "99.17% Test Accuracy",
];

export function TechMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const totalWidth = track.scrollWidth / 2;
    const tween = gsap.to(track, {
      x: -totalWidth,
      duration: 26,
      ease: "none",
      repeat: -1,
    });
    return () => {
      tween.kill();
    };
  }, []);

  const loopItems = [...ITEMS, ...ITEMS];

  return (
    <div className="relative overflow-hidden border-y border-soft py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-app to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-app to-transparent z-10" />
      <div ref={trackRef} className="flex w-max gap-10 whitespace-nowrap">
        {loopItems.map((item, i) => (
          <span key={i} className="section-eyebrow flex items-center gap-3 text-xs uppercase text-ink-dim">
            {item}
            <span className="h-1 w-1 rounded-full bg-cyan-glow/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
