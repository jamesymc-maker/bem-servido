import Link from "next/link";
import { getOrCreateProvider } from "@/lib/actions/provider";

function fmt(d?: string) {
  if (!d) return "—";
  try { return new Date(d).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" }); } catch { return d; }
}
const LABEL: Record<string, string> = { active: "Ativa", past_due: "Pagamento em atraso", unpaid: "Não paga", canceled: "Cancelada" };

export default async function PagamentosPage() {
  const p: any = await getOrCreateProvider();
  const sub = Array.isArray(p?.subscriptions) ? p.subscriptions[0] : p?.subscriptions;
  return (
    <div className="max-w-2xl">
      <h1 className="serif text-2xl mb-5" style={{ fontWeight: 600 }}>Pagamentos</h1>
      {!sub ? (
        <div className="rounded-2xl bg-white p-6 text-center" style={{ border: "1px solid var(--line)" }}>
          <p className="mb-4" style={{ color: "var(--ink-soft)" }}>Você ainda não tem um plano ativo.</p>
          <Link href="/painel/plano" className="rounded-full px-5 py-3 font-semibold text-white inline-block" style={{ background: "var(--sea)" }}>Escolher um plano</Link>
        </div>
      ) : (
        <div className="rounded-2xl bg-white p-6 flex flex-col gap-3 text-sm" style={{ border: "1px solid var(--line)" }}>
          <div className="flex justify-between"><span style={{ color: "var(--ink-soft)" }}>Plano</span><span className="font-semibold capitalize">{sub.plan}</span></div>
          <div className="flex justify-between"><span style={{ color: "var(--ink-soft)" }}>Status</span><span className="font-semibold" style={{ color: sub.status === "active" ? "var(--sea)" : "var(--coral)" }}>{LABEL[sub.status] ?? sub.status}</span></div>
          <div className="flex justify-between"><span style={{ color: "var(--ink-soft)" }}>Último pagamento</span><span>{fmt(sub.last_payment_at)}</span></div>
          <div className="flex justify-between"><span style={{ color: "var(--ink-soft)" }}>Renova em</span><span>{fmt(sub.current_period_end)}</span></div>
          <Link href="/painel/plano" className="mt-2 text-sm font-semibold" style={{ color: "var(--sea)" }}>Mudar de plano →</Link>
        </div>
      )}
    </div>
  );
}
