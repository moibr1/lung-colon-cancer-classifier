import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#05080d",
          light: "#f5f8fb",
        },
        surface: {
          DEFAULT: "#0d1420",
          light: "#ffffff",
        },
        cyan: {
          glow: "#22d3ee",
        },
        stain: {
          DEFAULT: "#c026d3",
          soft: "#e879f9",
        },
        clinical: {
          blue: "#3b82f6",
          deep: "#1d4ed8",
          green: "#34d399",
          amber: "#f59e0b",
          red: "#f43f5e",
        },
        ink: {
          DEFAULT: "#e6f1ff",
          muted: "#7c93ad",
          dim: "#4a5b70",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        "grid-glow":
          "linear-gradient(to right, rgba(34,211,238,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,238,0.06) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(circle at 50% 0%, rgba(34,211,238,0.16), transparent 60%)",
      },
      backgroundSize: {
        grid: "44px 44px",
      },
      boxShadow: {
        glow: "0 0 40px rgba(34,211,238,0.25)",
        "glow-stain": "0 0 40px rgba(192,38,211,0.25)",
        panel: "0 20px 60px -20px rgba(0,0,0,0.6)",
      },
      animation: {
        "scan-sweep": "scan-sweep 2.4s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        "scan-sweep": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(-18px) translateX(6px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
