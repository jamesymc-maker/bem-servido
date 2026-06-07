import Link from "next/link";
import { Plus } from "lucide-react";
import { getOrCreateAdvertiser } from "@/lib/actions/advertiser";
import { upsertAd, deleteAd } from "@/lib/actions/advertiser";
import { AdUploader } from "@/components/anunciante/ad-uploader";
import { createAdminSupabase } from "@/lib/supabase/admin";

export default async function MeusAnuncios() {
  const adv: any = await getOrCreateAdvertiser();
  const db = createAdminSupabase();
  const { data: ads } = await db.from("ads").select("*").eq("advertiser_id", adv?.id).order("created_at");
  const field = "w-full rounded-xl px-4 py-3 text-[15px] outline-none bg-white";
  const border = { border: "1px solid var(--line)" };
  return (
    <div>
      <h1 className="serif text-2xl mb-5" style={{ fontWeight: 600 }}>Meus anúncios</h1>
      <p className="text-sm mb-6" style={{ color: "var(--ink-soft)" }}>Cada anúncio é ativado pela equipa do Bem Servido após revisão. Recomendamos imagens em formato 5:1 (ex: 1000×200px).</p>
      <div className="flex flex-col gap-6">
        {(ads ?? []).map((ad: any) => (
          <div key={ad.id} className="rounded-2xl bg-white p-5" style={{ border: "1px solid var(--line)" }}>
            <form action={upsertAd} className="flex flex-col gap-4">
              <input type="hidden" name="id" value={ad.id} />
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-semibold mb-1.5">Título do anúncio</label><input name="title" defaultValue={ad.title} required className={field} style={border} /></div>
                <div><label className="block text-sm font-semibold mb-1.5">URL de destino</label><input name="link_url" defaultValue={ad.link_url} required className={field} style={border} /></div>
              </div>
              <div><label className="block text-sm font-semibold mb-1.5">Imagem do banner</label><AdUploader advertiserId={adv.id} adId={ad.id} initialImage={ad.image_url} /></div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold rounded-full px-2.5 py-1" style={{ background: "var(--sand)", color: ad.active ? "var(--sea)" : "var(--ink-soft)" }}>
                  {ad.active ? "✓ Activo" : "Aguarda revisão"} · {ad.impressions} impressões · {ad.clicks} cliques
                </span>
                <div className="flex gap-2">
                  <button className="rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ background: "var(--sea)" }}>Guardar</button>
                  <form action={deleteAd}><input type="hidden" name="id" value={ad.id} /><button className="rounded-full px-4 py-2 text-sm font-semibold" style={{ border: "1px solid var(--coral)", color: "var(--coral)" }}>Excluir</button></form>
                </div>
              </div>
            </form>
          </div>
        ))}
        <div className="rounded-2xl bg-white p-5" style={{ border: "1.5px dashed var(--line)" }}>
          <h3 className="font-semibold mb-4 flex items-center gap-2"><Plus size={18} /> Novo anúncio</h3>
          <form action={upsertAd} className="flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-semibold mb-1.5">Título</label><input name="title" required className={field} style={border} /></div>
              <div><label className="block text-sm font-semibold mb-1.5">URL de destino</label><input name="link_url" required placeholder="https://..." className={field} style={border} /></div>
            </div>
            <div><label className="block text-sm font-semibold mb-1.5">Imagem</label><AdUploader advertiserId={adv?.id ?? ""} /></div>
            <div><button className="rounded-full px-5 py-2.5 font-semibold text-white text-sm" style={{ background: "var(--sea)" }}>Criar anúncio</button></div>
          </form>
        </div>
      </div>
    </div>
  );
}
