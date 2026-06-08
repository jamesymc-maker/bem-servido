"use client";
import Link from "next/link";
import { ArrowLeft, MapPin, Globe, Phone, BadgeCheck, ShieldCheck, Check } from "lucide-react";
import type { Provider, Review, ReviewSummary } from "@/lib/types";
import { brl } from "@/lib/utils";
import { TierBadge, WhatsAppBtn, CatIcon } from "./ui";
import { IntroVideo } from "./intro-video";
import { ListingCard } from "./listing-card";
import { ReviewSection } from "./review-section";
import { Star } from "lucide-react";
import { useActiveLocation, useT } from "./location-provider";

export function ProfileView({ p, related, reviews, summary }: { p: Provider; related: Provider[]; reviews: Review[]; summary: ReviewSummary }) {
  const t = useT();
  const { slug } = useActiveLocation();
  const firstName = p.name.split(" ")[0];
  const catLabel = p.category_label || t(`cats.${p.category_slug}`);
  return (
    <div>
      <div className="max-w-5xl mx-auto px-5 pt-6">
        <Link href={`/${slug}/servicos/${p.category_slug}`} className="inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: "var(--ink-soft)" }}>
          <ArrowLeft size={16} /> {catLabel}
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-6 grid md:grid-cols-[1fr_320px] gap-8 items-start">
        <div>
          <div className="rise flex items-center gap-5">
            <div className="relative shrink-0">
              <img src={p.photo_url} alt={p.name} referrerPolicy="no-referrer" className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover ring-photo" />
              {p.verified && (
                <span className="absolute -bottom-1 -right-1 grid place-items-center w-10 h-10 rounded-full" style={{ background: "var(--sea)", boxShadow: "0 0 0 4px var(--cream)" }}>
                  <BadgeCheck size={22} color="#fff" />
                </span>
              )}
            </div>
            <div>
              <TierBadge tier={p.tier} />
              <h1 className="serif text-3xl md:text-4xl mt-2 leading-none" style={{ fontWeight: 600 }}>{p.name}</h1>
              <div className="flex items-center gap-1.5 mt-2 font-semibold" style={{ color: "var(--sea)" }}>
                <CatIcon name={p.category_icon} size={17} /> {catLabel}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-5 rise" style={{ animationDelay: "80ms" }}>
            {summary.count > 0 && (
              <span className="inline-flex items-center gap-1 text-[13px] font-semibold rounded-full px-2.5 py-1" style={{ background: "rgba(226,100,63,.12)", color: "var(--coral)" }}>
                <Star size={13} fill="var(--coral)" strokeWidth={0} /> {summary.avg.toFixed(1)} ({summary.count})
              </span>
            )}
            {p.verified && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold rounded-full px-2 py-1" style={{ background: "rgba(14,91,78,.10)", color: "var(--sea)" }}>
                <ShieldCheck size={12} /> {t("profile.verified")}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-[11px] font-medium rounded-full px-2 py-1" style={{ background: "var(--sand-deep)", color: "var(--sea-deep)" }}>
              <Check size={12} strokeWidth={3} /> {t("profile.photo")}
            </span>
            <span className="inline-flex items-center gap-1 text-[13px] rounded-full px-2.5 py-1" style={{ background: "var(--sand)", color: "var(--ink-soft)" }}>
              <MapPin size={13} /> {p.service_area}
            </span>
            <span className="inline-flex items-center gap-1 text-[13px] rounded-full px-2.5 py-1" style={{ background: "var(--sand)", color: "var(--ink-soft)" }}>
              <Globe size={13} /> {p.languages.join(", ")}
            </span>
          </div>

          <div className="mt-7 rise" style={{ animationDelay: "140ms" }}><IntroVideo p={p} /></div>

          <div className="mt-8 rise" style={{ animationDelay: "200ms" }}>
            <h2 className="serif text-2xl mb-2" style={{ fontWeight: 600 }}>{t("profile.about", { name: firstName })}</h2>
            <p className="text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>{p.long_desc}</p>
          </div>

          {p.gallery.length > 0 && (
            <div className="mt-8 rise" style={{ animationDelay: "260ms" }}>
              <h2 className="serif text-2xl mb-3" style={{ fontWeight: 600 }}>{t("profile.gallery")}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {p.gallery.map((g, i) => (
                  <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden" style={{ background: "var(--sand-deep)" }}>
                    <img src={g} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <ReviewSection providerSlug={p.slug} providerName={p.name} reviews={reviews} summary={summary} />
        </div>

        <aside className="md:sticky md:top-20 rise" style={{ animationDelay: "120ms" }}>
          <div className="rounded-3xl bg-white p-6" style={{ border: "1px solid var(--line)", boxShadow: "0 20px 50px -30px rgba(34,28,22,.4)" }}>
            <div className="text-[11px] uppercase tracking-wide" style={{ color: "var(--ink-soft)" }}>{t("profile.rates")}</div>
            <div className="serif text-3xl mt-1" style={{ fontWeight: 600 }}>
              {brl(p.half_day_rate)}<span className="text-sm font-normal" style={{ color: "var(--ink-soft)" }}> {t("profile.halfDay")}</span>
            </div>
            <div className="mt-3 flex flex-col gap-1.5 text-sm" style={{ color: "var(--ink-soft)" }}>
              {p.full_day_rate != null && <Row k={t("profile.fullDay")} v={brl(p.full_day_rate)} />}
              {p.hourly_rate != null && <Row k={t("profile.hourly")} v={brl(p.hourly_rate)} />}
            </div>
            <div className="mt-5 flex flex-col gap-2.5">
              <WhatsAppBtn phone={p.whatsapp} full />
              <a href={`tel:${p.phone}`} className="inline-flex items-center justify-center gap-2 rounded-full py-3.5 font-semibold transition active:scale-95"
                style={{ background: "var(--sand)", color: "var(--ink)" }}>
                <Phone size={18} /> {t("profile.call")}
              </a>
            </div>
            <p className="text-[12px] mt-4 text-center" style={{ color: "var(--ink-soft)" }}>{t("profile.note")}</p>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <div className="max-w-5xl mx-auto px-5 py-10">
          <h2 className="serif text-2xl mb-5" style={{ fontWeight: 600 }}>{t("profile.more", { cat: catLabel })}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((r, i) => <ListingCard key={r.slug} p={r} i={i} />)}
          </div>
        </div>
      )}
    </div>
  );
}

const Row = ({ k, v }: { k: string; v: string }) => (
  <div className="flex items-center justify-between"><span>{k}</span><span className="font-semibold" style={{ color: "var(--ink)" }}>{v}</span></div>
);
