"use client";
import { useState } from "react";
import { AD_PLANS } from "@/lib/ad-plans";
import { brl } from "@/lib/utils";
import { Check } from "lucide-react";

export default function AdvertiserPlano() {
  const [loading, setLoading] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  async function choose(tier: string) {
    setLoading(tier); setMsg(null);
    try {
      const res = await fetch("/api/advertiser-checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ tier }) });
      const d = await res.json();
      if (d.url) window.location.href = d.url;
      else setMsg(d.message || "Pagamentos ainda não configurados.");
    } catch { setMsg("Erro ao iniciar pagamento."); }
    finally { setLoading(null); }
  }
  return (
    <div>
      <h1 className="serif text-2xl mb-1" style={{ fontWeight: 600 }}>Escolha um plano</h1>
      <p className="text-sm mb-6" style={{ color: "var(--ink-soft)" }}>Cancele quando quiser. Nenhuma taxa de activação.</p>
      {msg && <div className="rounded-2xl px-4 py-3 mb-4 text-sm" style={{ background: "var(--sand)", color: "var(--ink-soft)" }}>{msg}</div>}
      <div className="grid sm:grid-cols-3 gap-4">
        {AD_PLANS.map((pl) => (
          <div key={pl.key} className="rounded-3xl p-6 flex flex-col"
            style={{ background: pl.accent ? "var(--sea)" : "#fff", color: pl.accent ? "#fff" : "var(--ink)", border: pl.accent ? "none" : "1px solid var(--line)" }}>
            <h3 className="serif text-xl" style={{ fontWeight: 600 }}>{pl.name}</h3>
            <div className="mt-3 mb-4"><span className="serif text-3xl" style={{ fontWeight: 600 }}>{brl(pl.price)}</span><span className="text-sm" style={{ color: pl.accent ? "rgba(255,255,255,.8)" : "var(--ink-soft)" }}>/mês</span></div>
            <ul className="flex flex-col gap-1.5 text-sm flex-1">
              {pl.feats.map(f => <li key={f} className="flex items-start gap-2"><Check size={15} strokeWidth={2.5} className="mt-0.5 shrink-0" style={{ color: pl.accent ? "var(--coral-soft)" : "var(--sea)" }} /><span style={{ color: pl.accent ? "#fff" : "var(--ink-soft)" }}>{f}</span></li>)}
            </ul>
            <button onClick={() => choose(pl.key)} disabled={!!loading}
              className="mt-5 rounded-full py-3 font-semibold transition disabled:opacity-60 active:scale-95"
              style={pl.accent ? { background: "#fff", color: "var(--sea)" } : { background: "var(--ink)", color: "#fff" }}>
              {loading === pl.key ? "Aguarde..." : `Escolher ${pl.name}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
