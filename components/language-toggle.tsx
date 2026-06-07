"use client";
import { useLang } from "./language-provider";
import type { Lang } from "@/lib/i18n";

export function LanguageToggle() {
  const { lang, setLang } = useLang();
  const opt = (l: Lang, label: string) => (
    <button onClick={() => setLang(l)}
      className="px-2.5 py-1 rounded-full text-xs font-semibold transition"
      style={lang === l ? { background: "var(--sea)", color: "#fff" } : { color: "var(--ink-soft)" }}>
      {label}
    </button>
  );
  return (
    <div className="inline-flex items-center rounded-full p-0.5" style={{ border: "1px solid var(--line)", background: "#fff" }}>
      {opt("pt", "PT")}
      {opt("en", "EN")}
    </div>
  );
}
