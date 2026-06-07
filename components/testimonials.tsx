"use client";
import { Star, Quote } from "lucide-react";
import { CUSTOMER_TESTIMONIALS, PROVIDER_TESTIMONIALS, type Testimonial } from "@/lib/testimonials";
import { t } from "@/lib/i18n";

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} de 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={15} strokeWidth={0}
          fill={i < n ? "var(--coral)" : "var(--sand-deep)"} />
      ))}
    </div>
  );
}

function Card({ tItem, i, provider }: { tItem: Testimonial; i: number; provider: boolean }) {
  return (
    <figure className="rise rounded-3xl bg-white p-6 flex flex-col gap-4 h-full"
      style={{ border: "1px solid var(--line)", animationDelay: `${i * 70}ms` }}>
      <div className="flex items-center justify-between">
        <Stars n={tItem.rating} />
        <Quote size={22} style={{ color: "var(--sand-deep)" }} />
      </div>
      <blockquote className="text-[15px] leading-relaxed flex-1" style={{ color: "var(--ink)" }}>
        “{tItem.quote}”
      </blockquote>
      {provider && tItem.stat && (
        <div className="inline-flex items-baseline gap-1.5 self-start rounded-full px-3 py-1.5"
          style={{ background: "var(--sand)", color: "var(--sea)" }}>
          <span className="serif font-semibold">{tItem.stat}</span>
          <span className="text-[12px]" style={{ color: "var(--ink-soft)" }}>{tItem.statLabel}</span>
        </div>
      )}
      <figcaption className="flex items-center gap-3 pt-1" style={{ borderTop: "1px solid var(--line)" }}>
        <img src={tItem.avatar} alt={tItem.name} referrerPolicy="no-referrer"
          className="w-11 h-11 rounded-full object-cover mt-3" />
        <div className="mt-3">
          <div className="font-semibold leading-tight">{tItem.name}</div>
          <div className="text-[13px]" style={{ color: "var(--ink-soft)" }}>{tItem.meta}</div>
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials({ kind }: { kind: "customer" | "provider" }) {
  const provider = kind === "provider";
  const items = provider ? PROVIDER_TESTIMONIALS : CUSTOMER_TESTIMONIALS;
  const title = provider ? t("testimonials.providersTitle") : t("testimonials.customersTitle");
  const sub = provider ? t("testimonials.providersSub") : t("testimonials.customersSub");
  const cols = provider ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="py-16" style={{ background: provider ? "transparent" : "var(--sand)" }}>
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center max-w-2xl mx-auto mb-9">
          <div className="inline-flex items-center gap-1.5 text-sm font-semibold mb-2" style={{ color: "var(--coral)" }}>
            <Star size={15} fill="var(--coral)" strokeWidth={0} /> {provider ? t("testimonials.providersTag") : t("testimonials.customersTag")}
          </div>
          <h2 className="serif text-3xl md:text-4xl" style={{ fontWeight: 600 }}>{title}</h2>
          <p className="text-[15px] mt-2" style={{ color: "var(--ink-soft)" }}>{sub}</p>
        </div>
        <div className={`grid gap-5 ${cols}`}>
          {items.map((it, i) => <Card key={it.name} tItem={it} i={i} provider={provider} />)}
        </div>
      </div>
    </section>
  );
}
