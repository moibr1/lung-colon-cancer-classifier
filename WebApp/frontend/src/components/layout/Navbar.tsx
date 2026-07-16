"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { LANG_META, Lang } from "@/lib/i18n";

const NAV_ITEMS: { id: string; key: string }[] = [
  { id: "home", key: "home" },
  { id: "diagnose", key: "diagnose" },
  { id: "classes", key: "classes" },
  { id: "model", key: "model" },
  { id: "results", key: "results" },
  { id: "history", key: "history" },
];

export function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTo(id: string) {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header className="fixed inset-x-0 top-0 z-[100]">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 py-4 transition-all duration-300 lg:px-8 ${
          scrolled ? "glass-strong mt-3 rounded-2xl shadow-panel" : ""
        }`}
      >
        <button
          onClick={() => scrollTo("home")}
          className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-ink"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-glow to-clinical-blue text-sm font-bold text-[#04121a]">
            H
          </span>
          HistoDx<span className="text-cyan-glow">AI</span>
        </button>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"
            >
              {t("nav", item.key)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setLangOpen((o) => !o)}
              onBlur={() => setTimeout(() => setLangOpen(false), 150)}
              className="glass flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium uppercase text-ink-muted hover:text-ink"
            >
              {lang.toUpperCase()}
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            {langOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-strong absolute end-0 mt-2 w-36 overflow-hidden rounded-xl py-1"
              >
                {(Object.keys(LANG_META) as Lang[]).map((code) => (
                  <button
                    key={code}
                    onClick={() => {
                      setLang(code);
                      setLangOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-4 py-2 text-sm hover:bg-white/5 ${
                      lang === code ? "text-cyan-glow" : "text-ink-muted"
                    }`}
                  >
                    {LANG_META[code].native}
                    {lang === code && <span>&#10003;</span>}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="glass flex h-9 w-9 items-center justify-center rounded-full text-ink-muted hover:text-ink"
          >
            {theme === "dark" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
                <path
                  d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8 6 18M18 6l1.8-1.8"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="glass flex h-9 w-9 items-center justify-center rounded-full text-ink-muted lg:hidden"
            aria-label="Menu"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="glass-strong mx-4 mt-2 rounded-2xl p-2 lg:hidden"
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="block w-full rounded-xl px-4 py-3 text-start text-sm text-ink-muted hover:bg-white/5 hover:text-ink"
            >
              {t("nav", item.key)}
            </button>
          ))}
        </motion.div>
      )}

      <motion.div
        className="h-[2px] origin-left bg-gradient-to-r from-cyan-glow via-clinical-blue to-stain"
        style={{ scaleX }}
      />
    </header>
  );
}
