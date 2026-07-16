"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DictKey, LANG_META, Lang, translate } from "@/lib/i18n";

interface LanguageContextValue {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (lang: Lang) => void;
  t: (section: DictKey, key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("lang") as Lang | null;
    if (stored && LANG_META[stored]) {
      setLangState(stored);
    }
  }, []);

  useEffect(() => {
    const dir = LANG_META[lang].dir;
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    window.localStorage.setItem("lang", lang);
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      dir: LANG_META[lang].dir,
      setLang: setLangState,
      t: (section, key) => translate(lang, section, key),
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
