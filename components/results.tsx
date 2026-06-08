"use client";
import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import type { Category, Provider } from "@/lib/types";
import { sortByRank } from "@/lib/utils";
import { catSearchTerms } from "@/lib/i18n";
import { useT } from "./location-provider";
import { ListingCard } from "./listing-card";
import { CatIcon } from "./ui";

export function Results({
  providers, categories, initialCategory = "all", initialQuery = "",
}: {
  providers: Provider[]; categories: Category[]; initialCategory?: string; initialQuery?: string;
}) {
  const t = useT();
  const [q, setQ] = useState(initialQuery);
  const [cat, setCat] = useState(initialCategory);

  const filtered = useMemo(() => {
    const rows = providers
      .filter((p) => cat === "all" || p.category_slug === cat)
      .filter((p) => {
        if (!q.trim()) return true;
        const s = q.toLowerCase();
        const hay = [p.name, p.short_desc, p.service_area, catSearchTerms(p.category_slug), ...p.languages]
          .join(" ").toLowerCase();
        return hay.includes(s);
      });
    return sortByRank(rows);
  }, [providers, cat, q]);

  const catLabel = (slug: string) => categories.find((c) => c.slug === slug)?.label || t(`cats.${slug}`);
  const title = cat === "all" ? t("results.allTitle") : `${catLabel(cat)} ${t("results.inLocation")}`;

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <div className="flex items-center gap-2 bg-white rounded-full px-4 py-1.5 max-w-xl" style={{ border: "1px solid var(--line)" }}>
        <Search size={18} style={{ color: "var(--ink-soft)" }} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("results.placeholder")}
          className="flex-1 py-2.5 bg-transparent outline-none text-[15px]" />
        {q && <button onClick={() => setQ("")}><X size={16} style={{ color: "var(--ink-soft)" }} /></button>}
      </div>

      <div className="flex gap-2 overflow-x-auto hide-scroll mt-5 pb-1">
        <Chip active={cat === "all"} onClick={() => setCat("all")}>{t("results.all")}</Chip>
        {categories.map((c) => (
          <Chip key={c.slug} active={cat === c.slug} onClick={() => setCat(c.slug)}>
            <CatIcon name={c.icon} size={14} /> {c.label || t(`cats.${c.slug}`)}
          </Chip>
        ))}
      </div>

      <div className="flex items-baseline justify-between mt-7 mb-5">
        <h1 className="serif text-2xl md:text-3xl" style={{ fontWeight: 600 }}>{title}</h1>
        <span className="text-sm" style={{ color: "var(--ink-soft)" }}>
          {filtered.length} {filtered.length === 1 ? t("results.result") : t("results.results")}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="py-20 text-center" style={{ color: "var(--ink-soft)" }}>
          <p className="serif text-2xl mb-1" style={{ color: "var(--ink)" }}>{t("results.emptyTitle")}</p>
          <p className="text-sm">{t("results.emptySub")}</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => <ListingCard key={p.slug} p={p} i={i} />)}
        </div>
      )}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick}
      className="shrink-0 inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition"
      style={active ? { background: "var(--sea)", color: "#fff" } : { background: "#fff", color: "var(--ink-soft)", border: "1px solid var(--line)" }}>
      {children}
    </button>
  );
}
