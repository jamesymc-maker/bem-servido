import { adminStats, adminListSubscriptions } from "@/lib/admin-data";
import { brl } from "@/lib/utils";

function fmt(d?: string) {
  if (!d) return "—";
  try { return new Date(d).toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" }); } catch { return d; }
}

export default async function AdminPayments() {
  const [s, subs] = await Promise.all([adminStats(), adminListSubscriptions()]);
  return (
    <div>
      <h1 className="font-heading text-2xl mb-5" style={{ fontWeight: 600 }}>Pagamentos</h1>
      <div className="grid grid-cols-3 gap-3 mb-7">
        <div className="rounded-2xl bg-white p-5" style={{ border: "1px solid var(--border)" }}>
          <div className="font-heading text-3xl" style={{ fontWeight: 600 }}>{brl(s.mrr)}</div>
          <div className="text-sm mt-1" style={{ color: "var(--muted)" }}>MRR</div>
        </div>
        <div className="rounded-2xl bg-white p-5" style={{ border: "1px solid var(--border)" }}>
          <div className="font-heading text-3xl" style={{ fontWeight: 600 }}>{s.activePaid}</div>
          <div className="text-sm mt-1" style={{ color: "var(--muted)" }}>Assinaturas ativas</div>
        </div>
        <div className="rounded-2xl bg-white p-5" style={{ border: "1px solid var(--border)" }}>
          <div className="font-heading text-3xl" style={{ fontWeight: 600, color: s.failed ? "var(--pink)" : "var(--navy)" }}>{s.failed}</div>
          <div className="text-sm mt-1" style={{ color: "var(--muted)" }}>Pagamentos com falha</div>
        </div>
      </div>

      <div className="rounded-2xl bg-white overflow-x-auto" style={{ border: "1px solid var(--border)" }}>
        <table className="w-full text-sm" style={{ minWidth: 720 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", color: "var(--muted)" }} className="text-left">
              <th className="p-3 font-semibold">Profissional</th>
              <th className="p-3 font-semibold">Plano</th>
              <th className="p-3 font-semibold">Status</th>
              <th className="p-3 font-semibold">Último pagamento</th>
              <th className="p-3 font-semibold">Renova em</th>
            </tr>
          </thead>
          <tbody>
            {subs.length === 0 ? (
              <tr><td className="p-4" style={{ color: "var(--muted)" }} colSpan={5}>Nenhuma assinatura ainda.</td></tr>
            ) : subs.map((sub: any) => (
              <tr key={sub.id} style={{ borderBottom: "1px solid var(--border)" }}>
                <td className="p-3 font-medium">{sub.providers?.name ?? "—"}</td>
                <td className="p-3 capitalize">{sub.plan ?? "—"}</td>
                <td className="p-3" style={{ color: sub.status === "active" ? "var(--teal)" : "var(--pink)" }}>{sub.status ?? "—"}</td>
                <td className="p-3">{fmt(sub.last_payment_at)}</td>
                <td className="p-3">{fmt(sub.current_period_end)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
