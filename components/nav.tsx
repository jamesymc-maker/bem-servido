"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useActiveLocation, useT } from "./location-provider";
import { LocationBar } from "./location-bar";
import { Wordmark } from "./wordmark";

export function Nav() {
  const [open, setOpen] = useState(false);
  const t = useT();
  const { slug } = useActiveLocation();
  const links: [string, string][] = [
    [t("nav.servicesIn"), `/${slug}/servicos`],
    [t("nav.blog"), `/${slug}/blog`],
    [t("nav.about"), `/${slug}/sobre`],
  ];
  const mobileLinks: [string, string][] = [[t("nav.home"), `/${slug}`], ...links];
  return (
    <div className="sticky top-0 z-50">
      <header className="backdrop-blur-md bg-white/90" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-dq mx-auto px-5 h-16 flex items-center justify-between gap-3">
          <Link href={`/${slug}`} className="shrink-0">
            <Wordmark />
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-muted">
            {links.map(([label, href]) => (
              <Link key={href} href={href} className="underline-grow pb-0.5 text-navy/80 hover:text-navy">{label}</Link>
            ))}
            <Link href="/entrar" className="underline-grow pb-0.5 text-navy/80 hover:text-navy">{t("nav.login")}</Link>
            <Link
              href={`/${slug}/precos`}
              className="rounded-dqfull px-5 py-2.5 text-white text-sm font-bold transition hover:bg-teal-dark active:scale-95"
              style={{ background: "var(--teal)" }}
            >
              {t("nav.advertise")}
            </Link>
          </nav>
          <div className="flex items-center gap-2.5 md:hidden">
            <button onClick={() => setOpen((o) => !o)} aria-label={t("nav.menu")} className="p-1 text-navy">
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden px-5 pb-4 flex flex-col gap-1" style={{ borderTop: "1px solid var(--border)" }}>
            {mobileLinks.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="py-2.5 font-medium text-navy">{label}</Link>
            ))}
            <Link href="/entrar" onClick={() => setOpen(false)} className="py-2.5 font-medium text-navy">{t("nav.login")}</Link>
            <Link
              href={`/${slug}/precos`}
              onClick={() => setOpen(false)}
              className="mt-1 rounded-dqfull px-4 py-2.5 text-white font-bold text-center"
              style={{ background: "var(--teal)" }}
            >
              {t("nav.advertise")}
            </Link>
          </div>
        )}
      </header>
      <LocationBar />
    </div>
  );
}
