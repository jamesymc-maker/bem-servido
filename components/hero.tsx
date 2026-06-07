"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { useLang } from "./language-provider";

const face = (g: string, n: number) => `https://randomuser.me/api/portraits/${g}/${n}.jpg`;
const FACES = [face("women", 44), face("men", 45), face("women", 29), face("men", 64), face("women", 12)];
const QUICK_SLUGS = ["private-chefs", "drivers", "babysitters", "boat-services"];

export function Hero() {
  const { t } = useLang();
  const router = useRouter();
  const [q, setQ] = useState("");
  const submit = () => router.push(`/servicos?q=${encodeURIComponent(q)}`);
  const quick: string[] = t("hero.quick");
  const positions = [
    { top: "2%", left: "20%", s: 150, d: "0s", n: 0 },
    { top: "30%", left: "62%", s: 120, d: ".6s", n: 1 },
    { top: "52%", left: "8%", s: 116, d: "1.1s", n: 2 },
    { top: "62%", left: "52%", s: 138, d: ".3s", n: 3 },
    { top: "10%", left: "72%", s: 96, d: "1.4s", n: 4 },
  ];
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0" style={{
        background: "radial-gradient(120% 90% at 80% -10%, rgba(28,122,105,.22), transparent 55%), radial-gradient(90% 80% at -10% 20%, rgba(226,100,63,.16), transparent 55%), var(--cream)",
      }} />
      <div className="relative max-w-6xl mx-auto px-5 pt-16 pb-20 md:pt-24 md:pb-28 grid md:grid-cols-[1.05fr_.95fr] gap-12 items-center">
        <div>
          <div className="rise inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-medium mb-6"
            style={{ background: "#fff", border: "1px solid var(--line)", color: "var(--sea)" }}>
            <MapPin size={14} /> {t("hero.badge")}
          </div>
          <h1 className="serif rise leading-[1.02] tracking-tight"
            style={{ fontSize: "clamp(2.6rem,6vw,4.4rem)", fontWeight: 600, animationDelay: "60ms" }}>
            {t("hero.titleA")}<br />{t("hero.titleB")}<br /><span style={{ color: "var(--coral)" }}>{t("hero.accent")}</span>
          </h1>
          <p className="rise mt-6 text-lg max-w-md" style={{ color: "var(--ink-soft)", animationDelay: "140ms" }}>{t("hero.sub")}</p>
          <div className="rise mt-8 flex flex-col sm:flex-row gap-2 max-w-md" style={{ animationDelay: "220ms" }}>
            <div className="flex items-center gap-2 flex-1 bg-white rounded-full px-4 py-1.5" style={{ border: "1px solid var(--line)" }}>
              <Search size={18} style={{ color: "var(--ink-soft)" }} />
              <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder={t("hero.placeholder")} className="flex-1 py-2.5 bg-transparent outline-none text-[15px]" />
            </div>
            <button onClick={submit} className="rounded-full px-6 py-3.5 text-white font-semibold transition active:scale-95"
              style={{ background: "var(--sea)" }}>{t("hero.search")}</button>
          </div>
          <div className="rise mt-5 flex flex-wrap gap-2 text-sm" style={{ animationDelay: "300ms" }}>
            {quick.map((label, i) => (
              <button key={label} onClick={() => router.push(`/servicos/${QUICK_SLUGS[i]}`)}
                className="rounded-full px-3.5 py-1.5 transition hover:bg-white"
                style={{ border: "1px solid var(--line)", color: "var(--ink-soft)" }}>{label}</button>
            ))}
          </div>
        </div>
        <div className="relative h-[360px] md:h-[440px] hidden sm:block">
          {positions.map((c, i) => (
            <div key={i} className="floaty absolute rounded-full overflow-hidden ring-photo"
              style={{ top: c.top, left: c.left, width: c.s, height: c.s, animationDelay: c.d }}>
              <img src={FACES[c.n]} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
          ))}
          <div className="absolute bottom-2 left-2 bg-white rounded-2xl px-4 py-3 shadow-xl" style={{ border: "1px solid var(--line)" }}>
            <div className="serif text-2xl leading-none" style={{ fontWeight: 600 }}>250+</div>
            <div className="text-xs" style={{ color: "var(--ink-soft)" }}>{t("hero.statLabel")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
