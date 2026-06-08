"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MapPin, ChevronDown, Check, Lock } from "lucide-react";
import { LOCATIONS, isActiveLocationSlug } from "@/lib/locations";
import { useActiveLocation, useT } from "./location-provider";

// Location selector. The active location is driven entirely by the URL; picking
// a region swaps the location segment of the current path and navigates there.
export function LocationBar() {
  const pathname = usePathname();
  const router = useRouter();
  const current = useActiveLocation();
  const t = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const pick = (slug: string) => {
    const parts = (pathname ?? "/").split("/");
    // parts[1] is the first path segment. If it's already a location, replace
    // it (keeping the rest of the path); otherwise go to the location home.
    if (isActiveLocationSlug(parts[1])) {
      parts[1] = slug;
      router.push(parts.join("/") || `/${slug}`);
    } else {
      router.push(`/${slug}`);
    }
    setOpen(false);
  };

  return (
    <div style={{ background: "var(--sand)", borderBottom: "1px solid var(--line)" }}>
      <div className="max-w-6xl mx-auto px-5 h-11 flex items-center">
        <div className="relative" ref={ref}>
          <button onClick={() => setOpen((o) => !o)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold py-1.5" style={{ color: "var(--ink)" }}>
            <MapPin size={15} style={{ color: "var(--sea)" }} />
            {current.name}
            <ChevronDown size={15} style={{ color: "var(--ink-soft)", transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
          </button>
          {open && (
            <div className="absolute left-0 top-full mt-1 w-60 rounded-2xl bg-white p-2 z-50"
              style={{ border: "1px solid var(--line)", boxShadow: "0 20px 40px -20px rgba(34,28,22,.35)" }}>
              <div className="px-2 py-1.5 text-[11px] uppercase tracking-wide" style={{ color: "var(--ink-soft)" }}>{t("loc.choose")}</div>
              {LOCATIONS.map((l) => (
                <button key={l.slug} disabled={!l.active} onClick={() => l.active && pick(l.slug)}
                  className="w-full flex items-center justify-between rounded-xl px-2.5 py-2 text-sm transition disabled:cursor-not-allowed"
                  style={{ color: l.active ? "var(--ink)" : "var(--ink-soft)", opacity: l.active ? 1 : 0.6 }}
                  onMouseEnter={(e) => { if (l.active) e.currentTarget.style.background = "var(--sand)"; }}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                  <span className="flex items-center gap-2">
                    {l.active ? <MapPin size={14} style={{ color: "var(--sea)" }} /> : <Lock size={13} />}
                    <span className="font-medium">{l.name}</span>
                    <span className="text-[12px]" style={{ color: "var(--ink-soft)" }}>{l.region}</span>
                  </span>
                  {l.active
                    ? (l.slug === current.slug && <Check size={15} style={{ color: "var(--sea)" }} />)
                    : <span className="text-[11px] rounded-full px-2 py-0.5" style={{ background: "var(--sand-deep)", color: "var(--ink-soft)" }}>{t("loc.soon")}</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
