import { adminListAds } from "@/lib/admin-data";
import { adminToggleAd } from "@/lib/actions/advertiser";

export default async function AdminAnuncios() {
  const ads = await adminListAds();
  return (
    <div>
      <h1 className="serif text-2xl mb-5" style={{ fontWeight: 600 }}>Anúncios ({ads.length})</h1>
      <div className="rounded-2xl bg-white overflow-x-auto" style={{ border: "1px solid var(--line)" }}>
        <table className="w-full text-sm" style={{ minWidth: 860 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--line)", color: "var(--ink-soft)" }} className="text-left">
              <th className="p-3 font-semibold">Anúncio</th>
              <th className="p-3 font-semibold">Anunciante</th>
              <th className="p-3 font-semibold">Posições</th>
              <th className="p-3 font-semibold">Impressões</th>
              <th className="p-3 font-semibold">Cliques</th>
              <th className="p-3 font-semibold">Status</th>
              <th className="p-3 font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad: any) => (
              <tr key={ad.id} style={{ borderBottom: "1px solid var(--line)" }}>
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    {ad.image_url
                      ? <img src={ad.image_url} alt="" className="w-24 h-12 object-cover rounded-lg shrink-0" referrerPolicy="no-referrer" />
                      : <span className="w-24 h-12 rounded-lg shrink-0 inline-flex items-center justify-center text-[10px]" style={{ background: "var(--sand)", color: "var(--ink-soft)" }}>sem imagem</span>}
                    <div>
                      <div className="font-medium">{ad.title}</div>
                      <a href={ad.link_url} target="_blank" rel="noreferrer" className="text-xs" style={{ color: "var(--sea)" }}>{ad.link_url}</a>
                    </div>
                  </div>
                </td>
                <td className="p-3" style={{ color: "var(--ink-soft)" }}>{ad.advertisers?.company_name ?? "—"}</td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-1">
                    {(ad.placements?.length ? ad.placements : ["—"]).map((pl: string, i: number) => (
                      <span key={i} className="text-xs rounded-full px-2 py-0.5" style={{ background: "var(--sand)", color: "var(--ink-soft)" }}>{pl}</span>
                    ))}
                  </div>
                </td>
                <td className="p-3">{ad.impressions}</td>
                <td className="p-3">{ad.clicks}</td>
                <td className="p-3">
                  <span className="text-xs font-semibold rounded-full px-2 py-1" style={{ color: ad.active ? "var(--sea)" : "#B7791F", background: "var(--sand)" }}>
                    {ad.active ? "Activo" : "Pendente"}
                  </span>
                </td>
                <td className="p-3">
                  <form action={adminToggleAd}>
                    <input type="hidden" name="id" value={ad.id} />
                    <input type="hidden" name="active" value={String(!ad.active)} />
                    <button className="rounded-full px-3 py-1.5 text-xs font-semibold text-white" style={{ background: ad.active ? "var(--ink-soft)" : "var(--sea)" }}>
                      {ad.active ? "Desactivar" : "Activar"}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {ads.length === 0 && (
              <tr><td colSpan={7} className="p-6 text-center" style={{ color: "var(--ink-soft)" }}>Nenhum anúncio submetido ainda.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
