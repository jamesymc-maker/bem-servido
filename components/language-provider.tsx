"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { DICT, translate, type Lang } from "@/lib/i18n";

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => any;
}
const LanguageContext = createContext<Ctx>({ lang: "pt", setLang: () => {}, t: (k) => k });

export function LanguageProvider({ initialLang = "pt", children }: { initialLang?: Lang; children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = (l: Lang) => {
    setLangState(l);
    document.cookie = `lang=${l};path=/;max-age=31536000;samesite=lax`;
    if (typeof document !== "undefined") document.documentElement.lang = l === "pt" ? "pt-BR" : "en";
  };

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  const t = (key: string, vars?: Record<string, string | number>) => translate(lang, key, vars);
  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export const useLang = () => useContext(LanguageContext);
export { DICT };
