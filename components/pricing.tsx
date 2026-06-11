"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Gift } from "lucide-react";
import { PLANS } from "@/lib/plans";
import { brl } from "@/lib/utils";
import { useT } from "./location-provider";
import { Testimonials } from "./testimonials";

export function Pricing() {
  const router = useRouter();
  const t = useT();
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
        <div className="absolute inset-0" style={{ background: "radial-gradient(100% 80% at 50% -20%, rgba(0,194,187,.12), transparent 60%), var(--sand)" }} />
        <div className="relative max-w-4xl mx-auto px-5 pt-16 pb-8 text-center">
          <div className="rise inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-medium mb-5"
            style={{ background: "#fff", border: "1px solid var(--border)", color: "var(--teal)" }}>{t("pricing.tag")}</div>
          <h1 className="font-heading rise leading-tight" style={{ fontSize: "clamp(2.2rem,5vw,3.6rem)", fontWeight: 600, animationDelay: "60ms" }}>
            {t("pricing.titleA")}<br />{t("pricing.titleB")}
          </h1>
          <p className="rise mt-5 text-lg max-w-lg mx-auto" style={{ color: "var(--muted)", animationDelay: "120ms" }}>{t("pricing.sub")}</p>
        </div>
      </section>

      {msg && (
        <div className="max-w-3xl mx-auto px-5">
          <div className="rounded-2xl px-4 py-3 text-sm text-center" style={{ background: "var(--sand)", color: "var(--muted)" }}>{msg}</div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-5 -mt-2">
        <div className="rise flex items-center justify-center gap-2.5 rounded-2xl px-5 py-4 text-center"
          style={{ background: "var(--pink)", color: "#fff", boxShadow: "0 18px 40px -20px rgba(229,115,87,.7)" }}>
          <Gift size={20} strokeWidth={2.5} className="shrink-0" />
          <span className="font-semibold" style={{ fontSize: "clamp(.95rem,2.4vw,1.1rem)" }}>{t("pricing.freeBanner")}</span>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-5 py-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
        <div className="rise rounded-3xl p-7 flex flex-col"
          style={{ background: "var(--white)", color: "var(--navy)", border: "2px dashed var(--teal)" }}>
          <span className="self-start text-[11px] font-semibold uppercase tracking-wide rounded-full px-2.5 py-1 mb-3"
            style={{ background: "var(--teal)", color: "#fff" }}>{t("pricing.freePeriod")}</span>
          <h3 className="font-heading text-2xl" style={{ fontWeight: 600 }}>{t("pricing.freeName")}</h3>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>{t("pricing.freeBlurb")}</p>
          <div className="mt-5 mb-1">
            <span className="font-heading text-4xl" style={{ fontWeight: 600 }}>{t("pricing.freePrice")}</span>
            <span className="text-sm" style={{ color: "var(--muted)" }}> {t("pricing.freePeriod")}</span>
          </div>
          <ul className="mt-5 flex flex-col gap-2.5 text-sm flex-1">
            {(t("pricing.freeFeats") as string[]).map((f) => (
              <li key={f} className="flex items-start gap-2">
                <Check size={17} strokeWidth={2.5} className="mt-0.5 shrink-0" style={{ color: "var(--teal)" }} />
                <span style={{ color: "var(--muted)" }}>{f}</span>
              </li>
            ))}
          </ul>
          <button onClick={() => router.push("/criar-conta")}
            className="mt-7 rounded-full py-3.5 font-semibold transition active:scale-95"
            style={{ background: "transparent", color: "var(--teal)", border: "2px solid var(--teal)" }}>
            {t("pricing.freeCta")}
          </button>
        </div>
        {PLANS.map((pl, i) => {
          const feats: string[] = t(`plans.${pl.key}.feats`);
          return (
            <div key={pl.key} className="rise rounded-3xl p-7 flex flex-col"
              style={{
                background: pl.accent ? "var(--teal)" : "#fff", color: pl.accent ? "#fff" : "var(--navy)",
                border: pl.accent ? "none" : "1px solid var(--border)",
                boxShadow: pl.accent ? "0 30px 60px -30px rgba(0,194,187,.35)" : "var(--shadow-card)",
                transform: pl.accent ? "scale(1.03)" : "none", animationDelay: `${i * 80}ms`,
              }}>
              {pl.accent && (
                <span className="self-start text-[11px] font-semibold uppercase tracking-wide rounded-full px-2.5 py-1 mb-3"
                  style={{ background: "var(--pink)", color: "#fff" }}>{t("pricing.popular")}</span>
              )}
              <h3 className="font-heading text-2xl" style={{ fontWeight: 600 }}>{pl.name}</h3>
              <p className="text-sm mt-1" style={{ color: pl.accent ? "rgba(255,255,255,.8)" : "var(--muted)" }}>{t(`plans.${pl.key}.blurb`)}</p>
              <div className="mt-5 mb-1">
                <span className="font-heading text-4xl" style={{ fontWeight: 600 }}>{brl(pl.price)}</span>
                <span className="text-sm" style={{ color: pl.accent ? "rgba(255,255,255,.8)" : "var(--muted)" }}> {t("pricing.perMonth")}</span>
              </div>
              <p className="text-xs font-medium" style={{ color: pl.accent ? "var(--orange)" : "var(--teal)" }}>{t("pricing.afterTrial")}</p>
              <ul className="mt-5 flex flex-col gap-2.5 text-sm flex-1">
                {feats.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check size={17} strokeWidth={2.5} className="mt-0.5 shrink-0" style={{ color: pl.accent ? "var(--orange)" : "var(--teal)" }} />
                    <span style={{ color: pl.accent ? "#fff" : "var(--muted)" }}>{f}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => checkout(pl.key)} disabled={loading === pl.key}
                className="mt-7 rounded-full py-3.5 font-semibold transition active:scale-95 disabled:opacity-60"
                style={pl.accent ? { background: "#fff", color: "var(--teal)" } : { background: "var(--teal)", color: "#fff" }}>
                {loading === pl.key ? t("pricing.wait") : t("pricing.choose", { name: pl.name })}
              </button>
            </div>
          );
        })}
      </section>

      <Testimonials kind="provider" />

      <section className="py-14" style={{ background: "var(--sand)" }}>
        <div className="max-w-5xl mx-auto px-5">
          <h2 className="font-heading text-3xl text-center mb-2" style={{ fontWeight: 600 }}>{t("pricing.howTitle")}</h2>
          <p className="text-center text-sm mb-9" style={{ color: "var(--muted)" }}>{t("pricing.howSub")}</p>
          <div className="flex gap-3 overflow-x-auto hide-scroll pb-2 justify-center">
            {steps.map((s, i) => (
              <div key={s} className="shrink-0 w-40 rounded-2xl bg-white p-4" style={{ border: "1px solid var(--border)" }}>
                <span className="grid place-items-center w-8 h-8 rounded-full font-semibold text-sm text-white mb-3" style={{ background: "var(--teal)" }}>{i + 1}</span>
                <div className="font-semibold text-sm">{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
