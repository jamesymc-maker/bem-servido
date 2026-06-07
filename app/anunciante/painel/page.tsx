import Link from "next/link";
import { getOrCreateAdvertiser } from "@/lib/actions/advertiser";
import { updateAdvertiserProfile } from "@/lib/actions/advertiser";
export default async function AdvertiserHome() {
  const adv: any = await getOrCreateAdvertiser();
  const sub = Array.isArray(adv?.advertiser_subscriptions) ? adv.advertiser_subscriptions[0] : adv?.advertiser_subscriptions;
  const hasActivePlan = sub?.status === "active";
  const field = "w-full rounded-xl px-4 py-3 text-[15px] outline-none bg-white";
  const border = { border: "1px solid var(--line)" };
  return (
    <div>
      <h1 className="serif text-2xl mb-1" style={{ fontWeight: 600 }}>Olá, {adv?.company_name || "anunciante"}</h1>
      <p className="text-sm mb-6" style={{ color: "var(--ink-soft)" }}>
        {hasActivePlan ? "Conta ativa. Gerencie os seus anúncios abaixo." : "Escolha um plano para activar os seus anúncios."}
      </p>
      {!hasActivePlan && (
        <div className="rounded-2xl p-5 mb-6 flex items-center justify-between gap-4" style={{ background: "rgba(226,100,63,.08)", border: "1px solid var(--coral)" }}>
          <p className="text-sm font-medium" style={{ color: "var(--coral)" }}>Nenhum plano activo. Os seus anúncios não estão a ser exibidos.</p>
          <Link href="/anunciante/painel/plano" className="shrink-0 rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ background: "var(--coral)" }}>Escolher plano</Link>
        </div>
      )}
      <h2 className="serif text-xl mb-3" style={{ fontWeight: 600 }}>Dados da empresa</h2>
      <form action={updateAdvertiserProfile} className="flex flex-col gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="block text-sm font-semibold mb-1.5">Nome da empresa</label><input name="company_name" defaultValue={adv?.company_name ?? ""} className={field} style={border} /></div>
          <div><label className="block text-sm font-semibold mb-1.5">Nome de contacto</label><input name="contact_name" defaultValue={adv?.contact_name ?? ""} className={field} style={border} /></div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="block text-sm font-semibold mb-1.5">Telefone / WhatsApp</label><input name="phone" defaultValue={adv?.phone ?? ""} className={field} style={border} /></div>
          <div><label className="block text-sm font-semibold mb-1.5">Website</label><input name="website" defaultValue={adv?.website ?? ""} className={field} style={border} /></div>
        </div>
        <button className="self-start rounded-full px-5 py-2.5 font-semibold text-white text-sm" style={{ background: "var(--sea)" }}>Guardar dados</button>
      </form>
    </div>
  );
}
