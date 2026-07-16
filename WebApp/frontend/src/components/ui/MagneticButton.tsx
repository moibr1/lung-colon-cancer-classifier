"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ReactNode, useRef } from "react";
import clsx from "clsx";

interface MagneticButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}

export function MagneticButton({
  children,
  className,
  variant = "primary",
  onClick,
  disabled,
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.35);
    y.set(relY * 0.45);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
      className={clsx(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300",
        variant === "primary" &&
          "bg-gradient-to-r from-cyan-glow to-clinical-blue text-[#04121a] shadow-glow hover:shadow-[0_0_55px_rgba(34,211,238,0.4)]",
        variant === "secondary" &&
          "glass text-ink hover:border-strong",
        className
      )}
    >
      {children}
    </motion.button>
  );
}
