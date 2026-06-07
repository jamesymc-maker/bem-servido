import { createAdminSupabase } from "@/lib/supabase/admin";
import { adminToggleAd } from "@/lib/actions/advertiser";

function fmt(d?: string) {
  if (!d) return "—";
  try { return new Date(d).toLocaleDateString("pt-BR"); } catch { return d; }
}

export default async function AdminAnunciantes() {
  const db = createAdminSupabase();
  const { data: advs } = await db.from("advertisers")
    .select("*, advertiser_subscriptions(tier,status,last_payment_at)")
    .order("created_at", { ascending: false });
  const { data: ads } = await db.from("ads").select("*, advertisers(company_name)").order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="serif text-2xl mb-5" style={{ fontWeight: 600 }}>Anunciantes ({advs?.length ?? 0})</h1>
      <div className="rounded-2xl bg-white overflow-x-auto mb-8" style={{ border: "1px solid var(--line)" }}>
        <table className="w-full text-sm" style={{ minWidth: 680 }}>
          <thead><tr style={{ borderBottom: "1px solid var(--line)", color: "var(--ink-soft)" }} className="text-left">
            <th className="p-3 font-semibold">Empresa</th>
            <th className="p-3 font-semibold">Plano</th>
            <th className="p-3 font-semibold">Status</th>
            <th className="p-3 font-semibold">Último pagamento</th>
          </tr></thead>
          <tbody>
            {(advs ?? []).map((a: any) => {
              const sub = Array.isArray(a.advertiser_subscriptions) ? a.advertiser_subscriptions[0] : a.advertiser_subscriptions;
              return (
                <tr key={a.id} style={{ borderBottom: "1px solid var(--line)" }}>
                  <td className="p-3 font-medium">{a.company_name}</td>
                  <td className="p-3 capitalize">{sub?.tier ?? "—"}</td>
                  <td className="p-3"><span style={{ color: sub?.status === "active" ? "var(--sea)" : "var(--ink-soft)" }}>{sub?.status ?? "sem plano"}</span></td>
                  <td className="p-3" style={{ color: "var(--ink-soft)" }}>{fmt(sub?.last_payment_at)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2 className="serif text-xl mb-3" style={{ fontWeight: 600 }}>Anúncios para revisão</h2>
      <div className="flex flex-col gap-3">
        {(ads ?? []).map((ad: any) => (
          <div key={ad.id} className="rounded-2xl bg-white p-4 flex items-center gap-4" style={{ border: "1px solid var(--line)" }}>
            {ad.image_url && <img src={ad.image_url} alt="" className="w-32 h-16 object-cover rounded-xl shrink-0" referrerPolicy="no-referrer" />}
            <div className="flex-1">
              <div className="font-semibold">{ad.title}</div>
              <div className="text-sm" style={{ color: "var(--ink-soft)" }}>{ad.advertisers?.company_name} · {ad.impressions} impressões · {ad.clicks} cliques</div>
              <a href={ad.link_url} target="_blank" rel="noreferrer" className="text-xs" style={{ color: "var(--sea)" }}>{ad.link_url}</a>
            </div>
            <div className="flex gap-2 shrink-0">
              <form action={adminToggleAd}>
                <input type="hidden" name="id" value={ad.id} />
                <input type="hidden" name="active" value={String(!ad.active)} />
                <button className="rounded-full px-3 py-1.5 text-xs font-semibold text-white" style={{ background: ad.active ? "var(--ink-soft)" : "var(--sea)" }}>
                  {ad.active ? "Desactivar" : "Activar"}
                </button>
              </form>
            </div>
          </div>
        ))}
        {!ads?.length && <p className="text-sm" style={{ color: "var(--ink-soft)" }}>Nenhum anúncio submetido ainda.</p>}
      </div>
    </div>
  );
}
