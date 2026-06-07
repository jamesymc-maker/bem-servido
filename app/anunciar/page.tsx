import Link from "next/link";
import type { Metadata } from "next";
import { Check, MapPin } from "lucide-react";
import { AD_PLANS } from "@/lib/ad-plans";
import { brl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Anuncie no Bem Servido · Alcance turistas em Ilhabela",
  description: "Leve a sua marca até os turistas, donos de casa de temporada e visitantes de Ilhabela. Planos a partir de R$149/mês.",
};

export default function AnunciarPage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(120% 80% at 60% -10%, rgba(14,91,78,.18), transparent 55%), var(--cream)" }} />
        <div className="relative max-w-4xl mx-auto px-5 pt-16 pb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-medium mb-5"
            style={{ background: "#fff", border: "1px solid var(--line)", color: "var(--sea)" }}>
            <MapPin size={14} /> Para empresas · Ilhabela
          </div>
          <h1 className="serif leading-tight" style={{ fontSize: "clamp(2.2rem,5vw,3.6rem)", fontWeight: 600 }}>
            Seja visto por quem<br /><span style={{ color: "var(--coral)" }}>chega em Ilhabela</span>
          </h1>
          <p className="mt-5 text-lg max-w-xl mx-auto" style={{ color: "var(--ink-soft)" }}>
            O Bem Servido conecta turistas, donos de casa de temporada e hóspedes com os melhores serviços da ilha. Leve a sua marca até esse público no momento em que estão planeando a estadia.
          </p>
          <div className="flex justify-center gap-8 mt-8 text-sm" style={{ color: "var(--ink-soft)" }}>
            {[["10.000+","visitas/mês"],["250+","profissionais listados"],["100%","foco em Ilhabela"]].map(([n,l]) => (
              <div key={l}><div className="serif text-2xl" style={{ fontWeight: 600, color: "var(--ink)" }}>{n}</div><div>{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-5 py-10 grid md:grid-cols-3 gap-5 items-stretch">
        {AD_PLANS.map((pl, i) => (
          <div key={pl.key} className="rounded-3xl p-7 flex flex-col"
            style={{ background: pl.accent ? "var(--sea)" : "#fff", color: pl.accent ? "#fff" : "var(--ink)",
              border: pl.accent ? "none" : "1px solid var(--line)", transform: pl.accent ? "scale(1.03)" : "none",
              boxShadow: pl.accent ? "0 30px 60px -30px rgba(14,91,78,.6)" : "none" }}>
            {pl.accent && <span className="self-start text-[11px] font-bold uppercase tracking-wide rounded-full px-2.5 py-1 mb-3" style={{ background: "var(--coral)", color: "#fff" }}>Mais escolhido</span>}
            <h3 className="serif text-2xl" style={{ fontWeight: 600 }}>{pl.name}</h3>
            <p className="text-sm mt-1" style={{ color: pl.accent ? "rgba(255,255,255,.8)" : "var(--ink-soft)" }}>{pl.blurb}</p>
            <div className="mt-4 mb-2">
              <span className="serif text-4xl" style={{ fontWeight: 600 }}>{brl(pl.price)}</span>
              <span className="text-sm" style={{ color: pl.accent ? "rgba(255,255,255,.7)" : "var(--ink-soft)" }}> / mês</span>
            </div>
            <ul className="mt-4 flex flex-col gap-2 text-sm flex-1">
              {pl.feats.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check size={16} strokeWidth={2.5} className="mt-0.5 shrink-0" style={{ color: pl.accent ? "var(--coral-soft)" : "var(--sea)" }} />
                  <span style={{ color: pl.accent ? "#fff" : "var(--ink-soft)" }}>{f}</span>
                </li>
              ))}
            </ul>
            <Link href="/anunciante/criar-conta" className="mt-6 block text-center rounded-full py-3.5 font-semibold transition active:scale-95"
              style={pl.accent ? { background: "#fff", color: "var(--sea)" } : { background: "var(--ink)", color: "#fff" }}>
              Começar agora
            </Link>
          </div>
        ))}
      </section>

      <section className="py-12" style={{ background: "var(--sand)" }}>
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h2 className="serif text-2xl mb-2" style={{ fontWeight: 600 }}>Já tem conta?</h2>
          <Link href="/anunciante/entrar" className="text-sm font-semibold" style={{ color: "var(--sea)" }}>Entrar no painel de anunciante →</Link>
        </div>
      </section>
    </div>
  );
}
