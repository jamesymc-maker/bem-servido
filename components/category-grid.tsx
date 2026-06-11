"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Category } from "@/lib/types";
import { CatIcon } from "./ui";
import { useActiveLocation, useT } from "./location-provider";

const ACCENTS = [
  { bg: "rgba(0,194,187,.14)", color: "var(--teal)" },
  { bg: "rgba(255,45,109,.12)", color: "var(--pink)" },
  { bg: "rgba(255,182,43,.18)", color: "var(--orange)" },
  { bg: "rgba(0,194,187,.10)", color: "var(--teal)" },
  { bg: "rgba(255,45,109,.10)", color: "var(--pink)" },
];

export function CategoryGrid({ categories }: { categories: Category[] }) {
  const t = useT();
  const { slug } = useActiveLocation();
  return (
    <section className="max-w-dq mx-auto px-5 py-14">
      <div className="flex items-end justify-between mb-7">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy">{t("grid.heading")}</h2>
        <Link href={`/${slug}/servicos`} className="text-sm font-semibold flex items-center gap-1 text-teal">
          {t("grid.seeAll")} <ChevronRight size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
        {categories.map((c, i) => {
          const accent = ACCENTS[i % ACCENTS.length];
          return (
            <Link
              key={c.slug}
              href={`/${slug}/servicos/${c.slug}`}
              className="lift rise group rounded-dqlg p-5 text-left bg-white flex flex-col gap-5 min-h-[9rem] justify-between border border-border shadow-card"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <span
                className="grid place-items-center w-12 h-12 rounded-dqmd transition group-hover:scale-110"
                style={{ background: accent.bg, color: accent.color }}
              >
                <CatIcon name={c.icon} size={24} />
              </span>
              <span className="font-semibold leading-tight text-navy">{c.label || t(`cats.${c.slug}`)}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
