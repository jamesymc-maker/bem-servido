import { adminStats, adminListPendingReviews } from "@/lib/admin-data";
import { ReviewActions } from "@/components/admin/review-actions";
import { brl } from "@/lib/utils";

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl bg-white p-5" style={{ border: "1px solid var(--line)" }}>
      <div className="serif text-3xl" style={{ fontWeight: 600 }}>{value}</div>
      <div className="text-sm mt-1" style={{ color: "var(--ink-soft)" }}>{label}</div>
    </div>
  );
}

export default async function AdminDashboard() {
  const [s, pendingReviews] = await Promise.all([adminStats(), adminListPendingReviews()]);
  return (
    <div>
      <h1 className="serif text-2xl mb-5" style={{ fontWeight: 600 }}>Visão geral</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Stat label="Profissionais" value={s.total} />
        <Stat label="Aguardando aprovação" value={s.pending} />
        <Stat label="Listagens pagas ativas" value={s.activePaid} />
        <Stat label="Receita recorrente (MRR)" value={brl(s.mrr)} />
        <Stat label="Pagamentos com falha" value={s.failed} />
      </div>

      <h2 className="serif text-xl mt-10 mb-3" style={{ fontWeight: 600 }}>Avaliações para revisar ({pendingReviews.length})</h2>
      {pendingReviews.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--ink-soft)" }}>Nenhuma avaliação pendente.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {pendingReviews.map((r: any) => (
            <div key={r.id} className="rounded-2xl bg-white p-4 flex items-start justify-between gap-4" style={{ border: "1px solid var(--line)" }}>
              <div>
                <div className="text-sm"><span className="font-semibold">{r.author_name}</span> · {r.providers?.name} · {"★".repeat(r.rating)}</div>
                <p className="text-sm mt-1" style={{ color: "var(--ink-soft)" }}>{r.comment}</p>
              </div>
              <ReviewActions id={r.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
