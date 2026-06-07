"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import { PLANS } from "@/lib/plans";
import { brl } from "@/lib/utils";

export function PlanPicker({ providerId, currentPlan }: { providerId: string; currentPlan?: string }) {
  const [loading, setLoading] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  async function choose(plan: string) {
    setLoading(plan); setMsg(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ plan, providerId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setMsg(data.message || "Pagamentos ainda não configurados.");
    } catch { setMsg("Não foi possível iniciar o pagamento."); }
    finally { setLoading(null); }
  }

  return (
    <div>
      {msg && <div className="rounded-2xl px-4 py-3 mb-4 text-sm" style={{ background: "var(--sand)", color: "var(--ink-soft)" }}>{msg}</div>}
      <div className="grid sm:grid-cols-3 gap-4">
        {PLANS.map((pl) => (
          <div key={pl.key} className="rounded-3xl p-6 flex flex-col" style={{ background: pl.accent ? "var(--sea)" : "#fff", color: pl.accent ? "#fff" : "var(--ink)", border: pl.accent ? "none" : "1px solid var(--line)" }}>
            <h3 className="serif text-xl" style={{ fontWeight: 600 }}>{pl.name}</h3>
            <div className="mt-3 mb-4"><span className="serif text-3xl" style={{ fontWeight: 600 }}>{brl(pl.price)}</span><span className="text-sm" style={{ color: pl.accent ? "rgba(255,255,255,.8)" : "var(--ink-soft)" }}> / mês</span></div>
            <ul className="flex flex-col gap-2 text-sm flex-1">
              {pl.feats.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check size={16} strokeWidth={2.5} className="mt-0.5 shrink-0" style={{ color: pl.accent ? "var(--coral-soft)" : "var(--sea)" }} />
                  <span style={{ color: pl.accent ? "#fff" : "var(--ink-soft)" }}>{f}</span>
                </li>
              ))}
            </ul>
            <button onClick={() => choose(pl.key)} disabled={loading === pl.key}
              className="mt-5 rounded-full py-3 font-semibold transition active:scale-95 disabled:opacity-60"
              style={pl.accent ? { background: "#fff", color: "var(--sea)" } : { background: "var(--ink)", color: "#fff" }}>
              {loading === pl.key ? "Aguarde..." : currentPlan === pl.key ? "Plano atual" : `Escolher ${pl.name}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
