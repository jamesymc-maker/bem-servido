"use client";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { useActiveLocation, useT } from "./location-provider";

const face = (g: string, n: number) => `https://randomuser.me/api/portraits/${g}/${n}.jpg`;
const FACES = [face("women", 44), face("men", 45), face("women", 29), face("men", 64), face("women", 12)];

export function Hero() {
  const t = useT();
  const loc = useActiveLocation();
  const badge = `${loc.name} · ${loc.region}, ${loc.country}`;
  const positions = [
    { top: "2%", left: "20%", s: 150, d: "0s", n: 0 },
    { top: "30%", left: "62%", s: 120, d: ".6s", n: 1 },
    { top: "52%", left: "8%", s: 116, d: "1.1s", n: 2 },
    { top: "62%", left: "52%", s: 138, d: ".3s", n: 3 },
    { top: "10%", left: "72%", s: 96, d: "1.4s", n: 4 },
  ];
  return (
    <section className="relative overflow-hidden bg-sand">
      <div className="absolute inset-0" style={{
        background: "radial-gradient(120% 90% at 80% -10%, rgba(0,194,187,.12), transparent 55%), radial-gradient(90% 80% at -10% 20%, rgba(255,45,109,.08), transparent 55%)",
      }} />
      <div className="relative max-w-dq mx-auto px-5 pt-12 pb-16 md:pt-20 md:pb-24 grid md:grid-cols-[1.05fr_.95fr] gap-10 items-center">
        <div>
          <div className="rise inline-flex items-center gap-2 rounded-dqfull px-3 py-1.5 text-[13px] font-medium mb-6 bg-white border border-border text-teal">
            <MapPin size={14} /> {badge}
          </div>
          <h1
            className="font-heading rise leading-[1.05] tracking-tight font-extrabold text-navy"
            style={{ fontSize: "clamp(2.625rem, 6vw, 4rem)", animationDelay: "60ms" }}
          >
            {t("hero.titleA")}{" "}
            <span className="text-pink">{t("hero.accent")}</span>
          </h1>
          <p className="rise mt-5 text-lg max-w-md text-muted" style={{ animationDelay: "140ms" }}>
            {t("hero.tagline")}
          </p>
          <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "220ms" }}>
            <Link
              href={`/${loc.slug}/servicos`}
              className="inline-flex items-center justify-center rounded-dqfull px-7 py-3.5 text-white font-bold transition hover:bg-teal-dark active:scale-95 min-h-[52px] sm:min-h-[48px]"
              style={{ background: "var(--teal)" }}
            >
              {t("hero.ctaPrimary")}
            </Link>
            <Link
              href={`/${loc.slug}/precos`}
              className="inline-flex items-center justify-center rounded-dqfull px-7 py-3.5 font-bold text-navy transition active:scale-95 min-h-[52px] sm:min-h-[48px] bg-white border border-border hover:shadow-hover"
            >
              {t("hero.ctaSecondary")}
            </Link>
          </div>
        </div>
        <div className="relative h-[360px] md:h-[440px] hidden sm:block">
          {positions.map((c, i) => (
            <div
              key={i}
              className="floaty absolute rounded-dqlg overflow-hidden ring-photo shadow-card"
              style={{ top: c.top, left: c.left, width: c.s, height: c.s, animationDelay: c.d }}
            >
              <img src={FACES[c.n]} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
          ))}
          <div className="absolute bottom-2 left-2 bg-white rounded-dqlg px-4 py-3 shadow-card border border-border">
            <div className="font-heading text-2xl leading-none font-bold text-navy">250+</div>
            <div className="text-xs text-muted">{t("hero.statLabel")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
