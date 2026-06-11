import { getOrCreateProvider, updateProviderProfile } from "@/lib/actions/provider";
import { getCategories } from "@/lib/data";

export default async function PerfilPage() {
  const [p, categories]: any = await Promise.all([getOrCreateProvider(), getCategories()]);
  const field = "w-full rounded-xl px-4 py-3 text-[15px] outline-none bg-white";
  const border = { border: "1px solid var(--border)" };
  const label = "block text-sm font-semibold mb-1.5";

  return (
    <div>
      <h1 className="font-heading text-2xl mb-5" style={{ fontWeight: 600 }}>Perfil</h1>
      <form action={updateProviderProfile} className="flex flex-col gap-4">
        <div>
          <label className={label}>Nome</label>
          <input name="name" defaultValue={p?.name ?? ""} className={field} style={border} />
        </div>
        <div>
          <label className={label}>Categoria</label>
          <select name="category_slug" defaultValue={p?.categories?.slug ?? ""} className={field} style={border}>
            <option value="">Selecione...</option>
            {categories.map((c: any) => <option key={c.slug} value={c.slug}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <label className={label}>Descrição curta (até 150 caracteres)</label>
          <input name="short_desc" maxLength={150} defaultValue={p?.short_desc ?? ""} className={field} style={border} />
        </div>
        <div>
          <label className={label}>Descrição completa</label>
          <textarea name="long_desc" rows={6} maxLength={1500} defaultValue={p?.long_desc ?? ""} className={`${field} resize-none`} style={border} />
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className={label}>Meio dia (R$)</label>
            <input name="half_day_rate" type="number" defaultValue={p?.half_day_rate ?? ""} className={field} style={border} />
          </div>
          <div>
            <label className={label}>Diária (R$)</label>
            <input name="full_day_rate" type="number" defaultValue={p?.full_day_rate ?? ""} className={field} style={border} />
          </div>
          <div>
            <label className={label}>Por hora (R$)</label>
            <input name="hourly_rate" type="number" defaultValue={p?.hourly_rate ?? ""} className={field} style={border} />
          </div>
        </div>
        <div>
          <label className={label}>WhatsApp (com DDD e país, ex: +5512991234567)</label>
          <input name="whatsapp" defaultValue={p?.whatsapp ?? ""} className={field} style={border} />
        </div>
        <div>
          <label className={label}>Área de atendimento</label>
          <input name="service_area" defaultValue={p?.service_area ?? ""} className={field} style={border} />
        </div>
        <div>
          <label className={label}>Idiomas (separados por vírgula)</label>
          <input name="languages" defaultValue={(p?.languages ?? []).join(", ")} placeholder="Português, English" className={field} style={border} />
        </div>
        <button className="self-start rounded-full px-6 py-3 font-semibold text-white" style={{ background: "var(--teal)" }}>Salvar perfil</button>
      </form>
    </div>
  );
}
