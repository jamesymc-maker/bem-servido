import Link from "next/link";
import { getOrCreateAdvertiser } from "@/lib/actions/advertiser";
function fmt(d?: string) {
  if (!d) return "—";
  try { return new Date(d).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" }); } catch { return d; }
}
export default async function AdvertiserPagamentos() {
  const adv: any = await getOrCreateAdvertiser();
  const sub = Array.isArray(adv?.advertiser_subscriptions) ? adv.advertiser_subscriptions[0] : adv?.advertiser_subscriptions;
  return (
    <div className="max-w-xl">
      <h1 className="serif text-2xl mb-5" style={{ fontWeight: 600 }}>Pagamentos</h1>
      {!sub ? (
        <div className="rounded-2xl bg-white p-6 text-center" style={{ border: "1px solid var(--line)" }}>
          <p className="mb-4" style={{ color: "var(--ink-soft)" }}>Sem plano activo.</p>
          <Link href="/anunciante/painel/plano" className="rounded-full px-5 py-3 font-semibold text-white inline-block" style={{ background: "var(--sea)" }}>Escolher um plano</Link>
        </div>
      ) : (
        <div className="rounded-2xl bg-white p-6 flex flex-col gap-3 text-sm" style={{ border: "1px solid var(--line)" }}>
          {[["Plano", sub.tier],["Status", sub.status],["Último pagamento", fmt(sub.last_payment_at)],["Renova em", fmt(sub.current_period_end)]].map(([k,v]) => (
            <div key={k} className="flex justify-between"><span style={{ color: "var(--ink-soft)" }}>{k}</span><span className="font-semibold capitalize">{v || "—"}</span></div>
          ))}
          <Link href="/anunciante/painel/plano" className="mt-2 text-sm font-semibold" style={{ color: "var(--sea)" }}>Mudar de plano →</Link>
        </div>
      )}
    </div>
  );
}
