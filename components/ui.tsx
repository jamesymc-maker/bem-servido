"use client";
import {
  ChefHat, Car, Sparkles, Baby, Anchor, Flower2, Wrench, Camera, BellRing, Map,
  Star, Check, ShieldCheck, MessageCircle,
} from "lucide-react";
import type { Tier } from "@/lib/types";
import { waLink } from "@/lib/utils";

// Maps the category `icon` string (stored in the DB) to a lucide component.
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
    <span className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-wide uppercase rounded-full px-2.5 py-1"
      style={{ background: isP ? "var(--sea)" : "var(--coral)", color: "#fff" }}>
      <Star size={12} fill="#fff" strokeWidth={0} /> {isP ? "Premium" : "Featured"}
    </span>
  );
}

export const PhotoBadge = () => (
  <span className="inline-flex items-center gap-1 text-[11px] font-medium rounded-full px-2 py-1"
    style={{ background: "var(--sand-deep)", color: "var(--sea-deep)" }}>
    <Check size={12} strokeWidth={3} /> Foto de perfil
  </span>
);

export const VerifiedPill = () => (
  <span className="inline-flex items-center gap-1 text-[11px] font-semibold rounded-full px-2 py-1"
    style={{ background: "rgba(14,91,78,.10)", color: "var(--sea)" }}>
    <ShieldCheck size={12} /> Identidade verificada
  </span>
);

export function WhatsAppBtn({ phone, full }: { phone: string; full?: boolean }) {
  return (
    <a href={waLink(phone)} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold text-white transition active:scale-95 ${full ? "w-full py-3.5 text-base" : "px-4 py-2.5 text-sm"}`}
      style={{ background: "var(--wa)" }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--wa-deep)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "var(--wa)")}>
      <MessageCircle size={18} fill="#fff" strokeWidth={0} /> WhatsApp
    </a>
  );
}
