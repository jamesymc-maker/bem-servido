"use client";
import { useRouter } from "next/navigation";
import { Globe, BadgeCheck } from "lucide-react";
import type { Provider } from "@/lib/types";
import { brl } from "@/lib/utils";
import { TierBadge, WhatsAppBtn, CatIcon } from "./ui";
import { useLang } from "./language-provider";

export function ListingCard({ p, i = 0 }: { p: Provider; i?: number }) {
  const { t } = useLang();
  const router = useRouter();
  return (
    <article onClick={() => router.push(`/profissional/${p.slug}`)}
      className="lift rise cursor-pointer rounded-[26px] overflow-hidden bg-white flex flex-col"
      style={{ border: "1px solid var(--line)", animationDelay: `${i * 60}ms` }}>
      <div className="relative px-6 pt-7 pb-5 flex flex-col items-center text-center"
        style={{ background: "linear-gradient(180deg,var(--sand) 0%, #fff 100%)" }}>
        <div className="absolute top-4 left-4"><TierBadge tier={p.tier} /></div>
        <div className="relative">
          <img src={p.photo_url} alt={p.name} referrerPolicy="no-referrer" className="w-32 h-32 rounded-full object-cover ring-photo" />
          {p.verified && (
            <span className="absolute -bottom-1 -right-1 grid place-items-center w-9 h-9 rounded-full"
              style={{ background: "var(--sea)", boxShadow: "0 0 0 4px #fff" }}>
              <BadgeCheck size={20} color="#fff" />
            </span>
          )}
        </div>
        <h3 className="serif text-2xl mt-4 leading-none" style={{ fontWeight: 600 }}>{p.name}</h3>
        <div className="flex items-center gap-1.5 mt-2 text-sm" style={{ color: "var(--sea)" }}>
          <CatIcon name={p.category_icon} size={15} /> <span className="font-semibold">{t(`cats.${p.category_slug}`)}</span>
        </div>
      </div>
      <div className="px-6 pb-6 pt-1 flex flex-col gap-3 flex-1">
        <p className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>{p.short_desc}</p>
        <div className="flex items-center gap-1.5 text-[13px]" style={{ color: "var(--ink-soft)" }}>
          <Globe size={13} /> {p.languages.join(" · ")}
        </div>
        <div className="mt-auto pt-3 flex items-end justify-between gap-3" style={{ borderTop: "1px solid var(--line)" }}>
          <div>
            <div className="text-[11px] uppercase tracking-wide" style={{ color: "var(--ink-soft)" }}>{t("card.from")}</div>
            <div className="serif text-xl" style={{ fontWeight: 600 }}>
              {brl(p.half_day_rate)}<span className="text-xs font-normal" style={{ color: "var(--ink-soft)" }}> {t("card.halfDay")}</span>
            </div>
          </div>
          <WhatsAppBtn phone={p.whatsapp} />
        </div>
      </div>
    </article>
  );
}
