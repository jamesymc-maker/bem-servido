"use client";
import Link from "next/link";
import { useState } from "react";
import { Anchor, Menu, X } from "lucide-react";
import { useActiveLocation, useT } from "./location-provider";
import { LocationBar } from "./location-bar";

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
      <header className="backdrop-blur-md" style={{ background: "rgba(251,247,239,.9)", borderBottom: "1px solid var(--line)" }}>
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-3">
          <Link href={`/${slug}`} className="flex items-center gap-2.5 shrink-0">
            <span className="grid place-items-center w-9 h-9 rounded-xl" style={{ background: "var(--sea)" }}>
              <Anchor size={18} color="#fff" />
            </span>
            <span className="serif text-lg sm:text-xl leading-none whitespace-nowrap" style={{ fontWeight: 600 }}>
              Daquii<span style={{ color: "var(--coral)" }}>.</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {links.map(([label, href]) => (
              <Link key={href} href={href} className="underline-grow pb-0.5" style={{ color: "var(--ink-soft)" }}>{label}</Link>
            ))}
            <Link href="/entrar" className="underline-grow pb-0.5" style={{ color: "var(--ink-soft)" }}>{t("nav.login")}</Link>
            <Link href={`/${slug}/precos`} className="rounded-full px-4 py-2 text-white text-sm font-semibold transition active:scale-95"
              style={{ background: "var(--ink)" }}>{t("nav.advertise")}</Link>
          </nav>
          <div className="flex items-center gap-2.5 md:hidden">
            <button onClick={() => setOpen((o) => !o)} aria-label={t("nav.menu")} className="p-1">{open ? <X /> : <Menu />}</button>
          </div>
        </div>
        {open && (
          <div className="md:hidden px-5 pb-4 flex flex-col gap-1" style={{ borderTop: "1px solid var(--line)" }}>
            {mobileLinks.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="py-2.5 font-medium">{label}</Link>
            ))}
            <Link href="/entrar" onClick={() => setOpen(false)} className="py-2.5 font-medium">{t("nav.login")}</Link>
            <Link href={`/${slug}/precos`} onClick={() => setOpen(false)}
              className="mt-1 rounded-full px-4 py-2.5 text-white font-semibold text-center" style={{ background: "var(--ink)" }}>
              {t("nav.advertise")}
            </Link>
          </div>
        )}
      </header>
      <LocationBar />
    </div>
  );
}
