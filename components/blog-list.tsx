"use client";
import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";
import type { Post } from "@/lib/blog";
import { useActiveLocation, useT } from "./location-provider";

function fmt(date: string) {
  try { return new Date(date).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" }); }
  catch { return date; }
}

export function BlogList({ posts }: { posts: Post[] }) {
  const t = useT();
  const { slug } = useActiveLocation();
  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      <div className="mb-9">
        <h1 className="font-heading text-4xl md:text-5xl" style={{ fontWeight: 600 }}>{t("blog.title")}</h1>
        <p className="text-lg mt-2" style={{ color: "var(--muted)" }}>{t("blog.sub")}</p>
      </div>
      {posts.length === 0 ? (
        <p className="py-16 text-center" style={{ color: "var(--muted)" }}>{t("blog.empty")}</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {posts.map((p, i) => (
            <Link key={p.slug} href={`/${slug}/blog/${p.slug}`}
              className="lift rise rounded-3xl overflow-hidden bg-white flex flex-col" style={{ border: "1px solid var(--border)", animationDelay: `${i * 60}ms` }}>
              {p.cover && <img src={p.cover} alt={p.title} referrerPolicy="no-referrer" className="w-full aspect-[16/9] object-cover" />}
              <div className="p-5 flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-3 text-[12px]" style={{ color: "var(--muted)" }}>
                  <span className="inline-flex items-center gap-1"><CalendarDays size={13} /> {fmt(p.date)}</span>
                  <span className="inline-flex items-center gap-1"><Clock size={13} /> {p.minutes} {t("blog.min")}</span>
                </div>
                <h2 className="font-heading text-xl leading-snug" style={{ fontWeight: 600 }}>{p.title}</h2>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--muted)" }}>{p.description}</p>
                <span className="text-sm font-semibold mt-1" style={{ color: "var(--teal)" }}>{t("blog.readMore")} →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
