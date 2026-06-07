"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { PLANS } from "@/lib/plans";
import { brl } from "@/lib/utils";
import { useLang } from "./language-provider";
import { Testimonials } from "./testimonials";

export function Pricing() {
  const { t } = useLang();
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  function checkout(plan: string) {
    // Account first: send them to signup, then checkout happens in the dashboard.
    router.push(`/criar-conta?plano=${plan}`);
  }

  const steps: string[] = t("pricing.steps");

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(100% 80% at 50% -20%, rgba(14,91,78,.16), transparent 60%), var(--cream)" }} />
        <div className="relative max-w-4xl mx-auto px-5 pt-16 pb-8 text-center">
          <div className="rise inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-medium mb-5"
            style={{ background: "#fff", border: "1px solid var(--line)", color: "var(--sea)" }}>{t("pricing.tag")}</div>
          <h1 className="serif rise leading-tight" style={{ fontSize: "clamp(2.2rem,5vw,3.6rem)", fontWeight: 600, animationDelay: "60ms" }}>
            {t("pricing.titleA")}<br />{t("pricing.titleB")}
          </h1>
          <p className="rise mt-5 text-lg max-w-lg mx-auto" style={{ color: "var(--ink-soft)", animationDelay: "120ms" }}>{t("pricing.sub")}</p>
        </div>
      </section>

      {msg && (
        <div className="max-w-3xl mx-auto px-5">
          <div className="rounded-2xl px-4 py-3 text-sm text-center" style={{ background: "var(--sand)", color: "var(--ink-soft)" }}>{msg}</div>
        </div>
      )}

      <section className="max-w-5xl mx-auto px-5 py-10 grid md:grid-cols-3 gap-5 items-stretch">
        {PLANS.map((pl, i) => {
          const feats: string[] = t(`plans.${pl.key}.feats`);
          return (
            <div key={pl.key} className="rise rounded-3xl p-7 flex flex-col"
              style={{
                background: pl.accent ? "var(--sea)" : "#fff", color: pl.accent ? "#fff" : "var(--ink)",
                border: pl.accent ? "none" : "1px solid var(--line)",
                boxShadow: pl.accent ? "0 30px 60px -30px rgba(14,91,78,.6)" : "none",
                transform: pl.accent ? "scale(1.03)" : "none", animationDelay: `${i * 80}ms`,
              }}>
              {pl.accent && (
                <span className="self-start text-[11px] font-semibold uppercase tracking-wide rounded-full px-2.5 py-1 mb-3"
                  style={{ background: "var(--coral)", color: "#fff" }}>{t("pricing.popular")}</span>
              )}
              <h3 className="serif text-2xl" style={{ fontWeight: 600 }}>{pl.name}</h3>
              <p className="text-sm mt-1" style={{ color: pl.accent ? "rgba(255,255,255,.8)" : "var(--ink-soft)" }}>{t(`plans.${pl.key}.blurb`)}</p>
              <div className="mt-5 mb-1">
                <span className="serif text-4xl" style={{ fontWeight: 600 }}>{brl(pl.price)}</span>
                <span className="text-sm" style={{ color: pl.accent ? "rgba(255,255,255,.8)" : "var(--ink-soft)" }}> {t("pricing.perMonth")}</span>
              </div>
              <ul className="mt-5 flex flex-col gap-2.5 text-sm flex-1">
                {feats.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check size={17} strokeWidth={2.5} className="mt-0.5 shrink-0" style={{ color: pl.accent ? "var(--coral-soft)" : "var(--sea)" }} />
                    <span style={{ color: pl.accent ? "#fff" : "var(--ink-soft)" }}>{f}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => checkout(pl.key)} disabled={loading === pl.key}
                className="mt-7 rounded-full py-3.5 font-semibold transition active:scale-95 disabled:opacity-60"
                style={pl.accent ? { background: "#fff", color: "var(--sea)" } : { background: "var(--ink)", color: "#fff" }}>
                {loading === pl.key ? t("pricing.wait") : t("pricing.choose", { name: pl.name })}
              </button>
            </div>
          );
        })}
      </section>

      <Testimonials kind="provider" />

      <section className="py-14" style={{ background: "var(--sand)" }}>
        <div className="max-w-5xl mx-auto px-5">
          <h2 className="serif text-3xl text-center mb-2" style={{ fontWeight: 600 }}>{t("pricing.howTitle")}</h2>
          <p className="text-center text-sm mb-9" style={{ color: "var(--ink-soft)" }}>{t("pricing.howSub")}</p>
          <div className="flex gap-3 overflow-x-auto hide-scroll pb-2 justify-center">
            {steps.map((s, i) => (
              <div key={s} className="shrink-0 w-40 rounded-2xl bg-white p-4" style={{ border: "1px solid var(--line)" }}>
                <span className="grid place-items-center w-8 h-8 rounded-full font-semibold text-sm text-white mb-3" style={{ background: "var(--sea)" }}>{i + 1}</span>
                <div className="font-semibold text-sm">{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
