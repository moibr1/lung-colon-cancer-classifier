"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useTransform, animate } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export function AnimatedCounter({ value, decimals = 0, suffix = "", prefix = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (latest) => latest.toFixed(decimals));
  const [display, setDisplay] = useState((0).toFixed(decimals));

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionVal, value, { duration: 1.8, ease: "easeOut" });
    return controls.stop;
  }, [isInView, motionVal, value]);

  useEffect(() => {
    return rounded.on("change", (v) => setDisplay(v));
  }, [rounded]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
