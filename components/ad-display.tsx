import Link from "next/link";
import type { Ad } from "@/lib/ads";
import { DEFAULT_LOCATION } from "@/lib/locations";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "";

function trackUrl(ad: Ad) {
  const dest = encodeURIComponent(ad.link_url);
  return `${SITE}/api/ad-click/${ad.id}?dest=${dest}`;
}

export function AdCard({ ad, size = "banner" }: { ad: Ad; size?: "banner" | "small" }) {
  if (size === "small") {
    return (
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
        <a href={trackUrl(ad)} target="_blank" rel="noreferrer sponsored" className="block">
          {ad.image_url
            ? <img src={ad.image_url} alt={ad.title} className="w-full aspect-[3/1] object-cover" referrerPolicy="no-referrer" />
            : <div className="w-full aspect-[3/1] grid place-items-center px-4 text-center font-semibold text-sm" style={{ background: "var(--sand)", color: "var(--navy)" }}>{ad.title}</div>
          }
        </a>
        <div className="px-3 py-1.5 flex items-center justify-between" style={{ background: "#fff" }}>
          <span className="text-[11px]" style={{ color: "var(--muted)" }}>{ad.company_name}</span>
          <span className="text-[10px] uppercase tracking-wide" style={{ color: "var(--muted)" }}>Parceiro</span>
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
      <a href={trackUrl(ad)} target="_blank" rel="noreferrer sponsored" className="block">
        {ad.image_url
          ? <img src={ad.image_url} alt={ad.title} className="w-full aspect-[5/1] object-cover" referrerPolicy="no-referrer" />
          : <div className="w-full aspect-[5/1] grid place-items-center px-6 text-lg font-semibold text-center" style={{ background: "var(--sand)", color: "var(--navy)" }}>{ad.title}</div>
        }
      </a>
      <div className="px-4 py-2 flex items-center justify-between" style={{ background: "#fff" }}>
        <span className="text-sm font-medium">{ad.company_name}</span>
        <span className="text-[11px] uppercase tracking-wide" style={{ color: "var(--muted)" }}>Publicidade</span>
      </div>
    </div>
  );
}

// Shown when no ad is available
export function AdPlaceholder({ label, locationSlug }: { label: string; locationSlug?: string }) {
  const href = `/${locationSlug || DEFAULT_LOCATION}/anunciar`;
  return (
    <div className="rounded-2xl grid place-items-center text-center py-8 px-4"
      style={{ border: "1.5px dashed var(--border)", background: "rgba(255,255,255,.5)" }}>
      <div className="text-[11px] uppercase tracking-widest mb-1" style={{ color: "var(--muted)" }}>Publicidade</div>
      <div className="text-sm" style={{ color: "var(--muted)" }}>{label} · <a href={href} className="underline">Anuncie aqui</a></div>
    </div>
  );
}
