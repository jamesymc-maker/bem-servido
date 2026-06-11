"use client";
import Link from "next/link";
import { MapPin, MessageCircle } from "lucide-react";
import type { Category } from "@/lib/types";
import { useActiveLocation, useT } from "./location-provider";

export function Footer({ categories }: { categories: Category[] }) {
  const t = useT();
  const loc = useActiveLocation();
  return (
    <footer style={{ background: "var(--navy)", color: "rgba(255,255,255,.78)" }}>
      <div className="max-w-dq mx-auto px-5 py-12 grid grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="mb-4">
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '1.5rem', color: '#FFFFFF', letterSpacing: '-0.02em' }}>daquii</span>
          </div>
          <p className="text-sm max-w-xs">{t("footer.tagline")}</p>
          <div className="inline-flex items-center gap-1.5 mt-4 text-sm">
            <MapPin size={14} color="var(--orange)" /> {loc.name} · {loc.region} · {loc.country}
          </div>
          <div className="mt-4">
            <a
              href="https://wa.me/5512991353976"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-dqfull text-sm font-bold text-white transition hover:bg-teal-dark"
              style={{ background: "var(--teal)" }}
            >
              <MessageCircle size={16} /> Suporte via WhatsApp
            </a>
          </div>
        </div>
        <div>
          <div className="text-white font-semibold mb-3 text-sm">{t("footer.categories")}</div>
          <ul className="flex flex-col gap-2 text-sm">
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}><Link href={`/${loc.slug}/servicos/${c.slug}`} className="hover:text-white transition">{c.label || t(`cats.${c.slug}`)}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold mb-3 text-sm">{t("footer.resources")}</div>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link href={`/${loc.slug}/blog`} className="hover:text-white transition">{t("nav.blog")}</Link></li>
            <li><Link href={`/${loc.slug}/sobre`} className="hover:text-white transition">{t("nav.about")}</Link></li>
            <li><Link href={`/${loc.slug}/servicos`} className="hover:text-white transition">{t("nav.findPros")}</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold mb-3 text-sm">{t("footer.platform")}</div>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link href={`/${loc.slug}/precos`} className="hover:text-white transition">{t("nav.advertise")}</Link></li>
            <li><Link href={`/${loc.slug}`} className="hover:text-white transition">{t("nav.home")}</Link></li>
            <li><Link href={`/${loc.slug}/anunciar`} className="hover:text-white transition">{t("nav.advertise_link")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs py-5" style={{ borderTop: "1px solid rgba(255,255,255,.12)" }}>
        daquii · v1.0
      </div>
    </footer>
  );
}
