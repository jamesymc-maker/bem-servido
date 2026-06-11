"use client";
import {
  ChefHat, Car, Sparkles, Baby, Anchor, Flower2, Wrench, Camera, BellRing, Map,
  Star, Check, ShieldCheck, MessageCircle,
} from "lucide-react";
import type { Tier } from "@/lib/types";
import { waLink } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ICONS: Record<string, any> = {
  chef: ChefHat, driver: Car, cleaning: Sparkles, baby: Baby, boat: Anchor,
  wellness: Flower2, handyman: Wrench, photo: Camera, concierge: BellRing, guide: Map,
};

export const CatIcon = ({ name, ...rest }: { name: string; size?: number }) => {
  const I = ICONS[name] ?? BellRing;
  return <I {...rest} />;
};

export function TierBadge({ tier }: { tier: Tier }) {
  if (tier === "standard") return null;
  const isP = tier === "premium";
  return (
    <span
      className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wide uppercase rounded-dqfull px-2.5 py-1 text-white"
      style={{ background: isP ? "var(--orange)" : "var(--teal)" }}
    >
      <Star size={12} fill="#fff" strokeWidth={0} /> {isP ? "Premium" : "Featured"}
    </span>
  );
}

export const PhotoBadge = () => (
  <span className="inline-flex items-center gap-1 text-[11px] font-medium rounded-dqfull px-2 py-1 bg-sand text-navy">
    <Check size={12} strokeWidth={3} /> Foto adicionada
  </span>
);

export const VerifiedPill = () => (
  <span className="inline-flex items-center gap-1 text-[11px] font-semibold rounded-dqfull px-2 py-1 text-teal" style={{ background: "rgba(0,194,187,.12)" }}>
    <ShieldCheck size={12} /> Verificado
  </span>
);

export function WhatsAppBtn({ phone, full }: { phone: string; full?: boolean }) {
  return (
    <a
      href={waLink(phone)}
      target="_blank"
      rel="noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={`inline-flex items-center justify-center gap-2 rounded-dqfull font-bold text-white transition hover:bg-teal-dark active:scale-95 ${full ? "w-full py-3.5 text-base min-h-[52px]" : "px-4 py-2.5 text-sm"}`}
      style={{ background: "var(--teal)" }}
    >
      <MessageCircle size={18} fill="#fff" strokeWidth={0} /> Falar no WhatsApp
    </a>
  );
}
