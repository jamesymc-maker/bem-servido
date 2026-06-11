"use client";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import type { Post } from "@/lib/blog";
import { useActiveLocation, useT } from "./location-provider";

function fmt(date: string) {
  try { return new Date(date).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" }); }
  catch { return date; }
}

export function BlogPost({ post, related }: { post: Post; related: Post[] }) {
  const t = useT();
  const { slug } = useActiveLocation();
  return (
    <article className="max-w-3xl mx-auto px-5 py-10">
      <Link href={`/${slug}/blog`} className="inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: "var(--muted)" }}>
        <ArrowLeft size={16} /> {t("blog.back")}
      </Link>

      <h1 className="font-heading text-3xl md:text-5xl mt-6 leading-[1.08]" style={{ fontWeight: 600 }}>{post.title}</h1>
      <div className="flex flex-wrap items-center gap-4 mt-4 text-sm" style={{ color: "var(--muted)" }}>
        <span>{t("blog.by")} {post.author}</span>
        <span className="inline-flex items-center gap-1"><CalendarDays size={14} /> {fmt(post.date)}</span>
        <span className="inline-flex items-center gap-1"><Clock size={14} /> {post.minutes} {t("blog.min")}</span>
      </div>

      {post.cover && <img src={post.cover} alt={post.title} referrerPolicy="no-referrer" className="w-full aspect-[16/9] object-cover rounded-3xl mt-7" />}

      <div className="blog-content mt-8" dangerouslySetInnerHTML={{ __html: post.html }} />

      {related.length > 0 && (
        <div className="mt-14 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
          <h2 className="font-heading text-2xl mb-4" style={{ fontWeight: 600 }}>{t("blog.related")}</h2>
          <div className="flex flex-col gap-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/${slug}/blog/${r.slug}`} className="group flex items-baseline justify-between gap-4">
                <span className="font-semibold group-hover:underline" style={{ color: "var(--navy)" }}>{r.title}</span>
                <span className="text-sm shrink-0" style={{ color: "var(--teal)" }}>{t("blog.readMore")} →</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
