"use client";
import Link from "next/link";
import type { Category } from "@/lib/types";
import { useActiveLocation, useT } from "./location-provider";

export function SeoHome({ categories }: { categories: Category[] }) {
  const t = useT();
  const { slug } = useActiveLocation();
  const body: string[] = t("seo.body");
  return (
    <section className="max-w-3xl mx-auto px-5 py-16">
      <h2 className="serif text-3xl md:text-4xl mb-5" style={{ fontWeight: 600 }}>{t("seo.heading")}</h2>
      <div className="flex flex-col gap-4 text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
        {body.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      <div className="mt-7">
        <div className="text-[11px] uppercase tracking-wide mb-3" style={{ color: "var(--ink-soft)" }}>{t("seo.popular")}</div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link key={c.slug} href={`/${slug}/servicos/${c.slug}`}
              className="rounded-full px-3.5 py-1.5 text-sm font-medium transition hover:bg-white"
              style={{ border: "1px solid var(--line)", color: "var(--ink)" }}>{t(`cats.${c.slug}`)}</Link>
          ))}
        </div>
      </div>
    </section>
  );
}
