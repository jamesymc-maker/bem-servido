"use client";
import { useRouter } from "next/navigation";
import { Globe, BadgeCheck } from "lucide-react";
import type { Provider } from "@/lib/types";
import { brl } from "@/lib/utils";
import { TierBadge, WhatsAppBtn, CatIcon, PhotoBadge, VerifiedPill } from "./ui";
import { useActiveLocation, useT } from "./location-provider";

export function ListingCard({ p, i = 0 }: { p: Provider; i?: number }) {
  const router = useRouter();
  const t = useT();
  const { slug } = useActiveLocation();
  return (
    <article
      onClick={() => router.push(`/${slug}/profissional/${p.slug}`)}
      className="lift rise cursor-pointer rounded-3xl overflow-hidden bg-white flex flex-col border border-border shadow-card"
      style={{ animationDelay: `${i * 60}ms` }}
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-sand">
        <img src={p.photo_url} alt={p.name} referrerPolicy="no-referrer" className="w-full h-full object-cover object-top" />
        <div className="absolute top-3 left-3"><TierBadge tier={p.tier} /></div>
        {p.verified && (
          <span className="absolute bottom-3 right-3 grid place-items-center w-9 h-9 rounded-full bg-teal shadow-md" style={{ boxShadow: "0 0 0 3px #fff" }}>
            <BadgeCheck size={20} color="#fff" />
          </span>
        )}
      </div>
      <div className="px-5 py-5 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="font-heading text-xl font-bold text-navy leading-tight">{p.name}</h3>
          <div className="flex items-center gap-1.5 mt-1.5 text-sm text-teal font-semibold">
            <CatIcon name={p.category_icon} size={15} />
            <span>{p.category_label || t(`cats.${p.category_slug}`)}</span>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-muted line-clamp-2">{p.short_desc}</p>
        <div className="flex flex-wrap gap-1.5">
          <PhotoBadge />
          {p.verified && <VerifiedPill />}
        </div>
        <div className="flex items-center gap-1.5 text-[13px] text-muted">
          <Globe size={13} /> {p.languages.join(" · ")}
        </div>
        <div className="mt-auto pt-3 flex items-end justify-between gap-3 border-t border-border">
          <div>
            <div className="text-[11px] uppercase tracking-wide text-muted">{t("card.from")}</div>
            <div className="font-heading text-xl font-bold text-navy">
              {brl(p.half_day_rate)}
              <span className="text-xs font-normal text-muted"> {t("card.halfDay")}</span>
            </div>
          </div>
          <WhatsAppBtn phone={p.whatsapp} />
        </div>
      </div>
    </article>
  );
}
