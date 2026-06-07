"use client";
import Link from "next/link";
import { Anchor, MapPin } from "lucide-react";
import type { Category } from "@/lib/types";
import { useLang } from "./language-provider";

export function Footer({ categories }: { categories: Category[] }) {
  const { t } = useLang();
  return (
    <footer style={{ background: "var(--sea-deep)", color: "rgba(255,255,255,.78)" }}>
      <div className="max-w-6xl mx-auto px-5 py-12 grid grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="grid place-items-center w-9 h-9 rounded-xl" style={{ background: "rgba(255,255,255,.12)" }}>
              <Anchor size={18} color="#fff" />
            </span>
            <span className="serif text-xl text-white" style={{ fontWeight: 600 }}>
              Bem Servido<span style={{ color: "var(--coral-soft)" }}>.</span>
            </span>
          </div>
          <p className="text-sm max-w-xs">{t("footer.tagline")}</p>
          <div className="inline-flex items-center gap-1.5 mt-4 text-sm">
            <MapPin size={14} color="var(--coral-soft)" /> Ilhabela · São Paulo · Brasil
          </div>
        </div>
        <div>
          <div className="text-white font-semibold mb-3 text-sm">{t("footer.categories")}</div>
          <ul className="flex flex-col gap-2 text-sm">
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}><Link href={`/servicos/${c.slug}`} className="hover:text-white transition">{t(`cats.${c.slug}`)}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold mb-3 text-sm">{t("footer.resources")}</div>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link href="/blog" className="hover:text-white transition">{t("nav.blog")}</Link></li>
            <li><Link href="/sobre" className="hover:text-white transition">{t("nav.about")}</Link></li>
            <li><Link href="/servicos" className="hover:text-white transition">{t("nav.findPros")}</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold mb-3 text-sm">{t("footer.platform")}</div>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link href="/precos" className="hover:text-white transition">{t("nav.advertise")}</Link></li>
            <li><Link href="/" className="hover:text-white transition">{t("nav.home")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs py-5" style={{ borderTop: "1px solid rgba(255,255,255,.12)" }}>
        Bem Servido · v1.0
      </div>
    </footer>
  );
}
