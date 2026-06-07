import { adminListProviders } from "@/lib/admin-data";
import { ListingActions } from "@/components/admin/listing-actions";
import { brl } from "@/lib/utils";

const STATUS_LABEL: Record<string, string> = { pending: "Pendente", published: "Publicado", rejected: "Rejeitado", suspended: "Suspenso" };
const STATUS_COLOR: Record<string, string> = { pending: "#B7791F", published: "var(--sea)", rejected: "var(--coral)", suspended: "var(--ink-soft)" };

export default async function AdminListings() {
  const rows = await adminListProviders();
  return (
    <div>
      <h1 className="serif text-2xl mb-5" style={{ fontWeight: 600 }}>Listagens ({rows.length})</h1>
      <div className="rounded-2xl bg-white overflow-x-auto" style={{ border: "1px solid var(--line)" }}>
        <table className="w-full text-sm" style={{ minWidth: 760 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--line)", color: "var(--ink-soft)" }} className="text-left">
              <th className="p-3 font-semibold">Profissional</th>
              <th className="p-3 font-semibold">Categoria</th>
              <th className="p-3 font-semibold">Meio dia</th>
              <th className="p-3 font-semibold">Status</th>
              <th className="p-3 font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p: any) => (
              <tr key={p.id} style={{ borderBottom: "1px solid var(--line)" }}>
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3" style={{ color: "var(--ink-soft)" }}>{p.categories?.label ?? "—"}</td>
                <td className="p-3">{p.half_day_rate ? brl(Number(p.half_day_rate)) : "—"}</td>
                <td className="p-3">
                  <span className="text-xs font-semibold rounded-full px-2 py-1" style={{ color: STATUS_COLOR[p.status], background: "var(--sand)" }}>
                    {STATUS_LABEL[p.status] ?? p.status}
                  </span>
                </td>
                <td className="p-3"><ListingActions id={p.id} status={p.status} tier={p.tier} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
