import { adminListPendingReviews } from "@/lib/admin-data";
import { ReviewActions } from "@/components/admin/review-actions";

export default async function AdminAvaliacoes() {
  const pendingReviews = await adminListPendingReviews();
  return (
    <div>
      <h1 className="serif text-2xl mb-5" style={{ fontWeight: 600 }}>Avaliações para revisar ({pendingReviews.length})</h1>
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
