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
      <div className="rounded-dqlg overflow-hidden border border-border shadow-card bg-sand">
        <a href={trackUrl(ad)} target="_blank" rel="noreferrer sponsored" className="block">
          {ad.image_url
            ? <img src={ad.image_url} alt={ad.title} className="w-full aspect-[3/1] object-cover" referrerPolicy="no-referrer" />
            : <div className="w-full aspect-[3/1] grid place-items-center px-4 text-center font-bold text-sm text-navy">{ad.title}</div>
          }
        </a>
        <div className="px-4 py-2.5 flex items-center justify-between bg-white border-t border-border">
          <span className="text-sm font-semibold text-navy">{ad.company_name}</span>
          <span className="text-[10px] font-bold uppercase tracking-wide text-teal">Patrocinado</span>
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-dqlg overflow-hidden border border-border shadow-card bg-sand">
      <a href={trackUrl(ad)} target="_blank" rel="noreferrer sponsored" className="block">
        {ad.image_url
          ? <img src={ad.image_url} alt={ad.title} className="w-full aspect-[5/1] object-cover" referrerPolicy="no-referrer" />
          : <div className="w-full aspect-[5/1] grid place-items-center px-6 text-lg font-bold text-center text-navy">{ad.title}</div>
        }
      </a>
      <div className="px-4 py-2.5 flex items-center justify-between bg-white border-t border-border">
        <span className="text-sm font-semibold text-navy">{ad.company_name}</span>
        <span className="text-[11px] font-bold uppercase tracking-wide text-teal">Patrocinado</span>
      </div>
    </div>
  );
}

export function AdPlaceholder({ label, locationSlug }: { label: string; locationSlug?: string }) {
  const href = `/${locationSlug || DEFAULT_LOCATION}/anunciar`;
  return (
    <div className="rounded-dqlg grid place-items-center text-center py-8 px-4 bg-sand border-2 border-dashed border-border">
      <div className="text-[11px] font-bold uppercase tracking-widest mb-1 text-teal">Patrocinado</div>
      <div className="text-sm text-muted">{label} · <Link href={href} className="underline font-semibold text-teal">Anuncie aqui</Link></div>
    </div>
  );
}
