import { adminListProviders } from "@/lib/admin-data";

const SUB_LABEL: Record<string, string> = { active: "Ativa", past_due: "Em atraso", unpaid: "Não paga", canceled: "Cancelada" };

export default async function AdminProviders() {
  const rows = await adminListProviders();
  return (
    <div>
      <h1 className="serif text-2xl mb-5" style={{ fontWeight: 600 }}>Profissionais ({rows.length})</h1>
      <div className="rounded-2xl bg-white overflow-x-auto" style={{ border: "1px solid var(--line)" }}>
        <table className="w-full text-sm" style={{ minWidth: 820 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--line)", color: "var(--ink-soft)" }} className="text-left">
              <th className="p-3 font-semibold">Nome</th>
              <th className="p-3 font-semibold">E-mail</th>
              <th className="p-3 font-semibold">WhatsApp</th>
              <th className="p-3 font-semibold">Plano</th>
              <th className="p-3 font-semibold">Assinatura</th>
              <th className="p-3 font-semibold">Listagem</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p: any) => {
              const sub = Array.isArray(p.subscriptions) ? p.subscriptions[0] : p.subscriptions;
              return (
                <tr key={p.id} style={{ borderBottom: "1px solid var(--line)" }}>
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3" style={{ color: "var(--ink-soft)" }}>{p.profiles?.email ?? "—"}</td>
                  <td className="p-3" style={{ color: "var(--ink-soft)" }}>{p.whatsapp ?? "—"}</td>
                  <td className="p-3 capitalize">{sub?.plan ?? "—"}</td>
                  <td className="p-3">{sub?.status ? (SUB_LABEL[sub.status] ?? sub.status) : "—"}</td>
                  <td className="p-3">{p.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
