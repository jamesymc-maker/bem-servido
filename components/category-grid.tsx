"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Category } from "@/lib/types";
import { CatIcon } from "./ui";
import { useLang } from "./language-provider";

export function CategoryGrid({ categories }: { categories: Category[] }) {
  const { t } = useLang();
  return (
    <section className="max-w-6xl mx-auto px-5 py-14">
      <div className="flex items-end justify-between mb-7">
        <h2 className="serif text-3xl md:text-4xl" style={{ fontWeight: 600 }}>{t("grid.heading")}</h2>
        <Link href="/servicos" className="text-sm font-semibold flex items-center gap-1" style={{ color: "var(--sea)" }}>
          {t("grid.seeAll")} <ChevronRight size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
        {categories.map((c, i) => (
          <Link key={c.slug} href={`/servicos/${c.slug}`}
            className="lift rise group rounded-3xl p-5 text-left bg-white flex flex-col gap-6 h-36 justify-between"
            style={{ border: "1px solid var(--line)", animationDelay: `${i * 40}ms` }}>
            <span className="grid place-items-center w-11 h-11 rounded-2xl transition group-hover:scale-110"
              style={{ background: "var(--sand)", color: "var(--sea)" }}>
              <CatIcon name={c.icon} size={22} />
            </span>
            <span className="font-semibold leading-tight">{t(`cats.${c.slug}`)}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
