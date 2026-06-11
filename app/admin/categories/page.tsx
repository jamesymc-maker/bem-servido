import { adminListCategories } from "@/lib/admin-data";
import { CategoryActions } from "@/components/admin/category-actions";
import { upsertCategory } from "@/lib/actions/admin";

const ICONS = ["chef","driver","cleaning","baby","boat","wellness","handyman","photo","concierge","guide"];

export default async function AdminCategories() {
  const rows = await adminListCategories();
  return (
    <div>
      <h1 className="font-heading text-2xl mb-5" style={{ fontWeight: 600 }}>Categorias</h1>

      <form action={upsertCategory} className="rounded-2xl bg-white p-4 mb-6 flex flex-wrap items-end gap-3" style={{ border: "1px solid var(--border)" }}>
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: "var(--muted)" }}>Nova categoria</label>
          <input name="label" placeholder="Nome" required className="rounded-xl px-3 py-2 text-sm" style={{ border: "1px solid var(--border)" }} />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: "var(--muted)" }}>Ícone</label>
          <select name="icon" className="rounded-xl px-3 py-2 text-sm bg-white" style={{ border: "1px solid var(--border)" }}>
            {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: "var(--muted)" }}>Ordem</label>
          <input name="sort" type="number" defaultValue={rows.length + 1} className="rounded-xl px-3 py-2 text-sm w-20" style={{ border: "1px solid var(--border)" }} />
        </div>
        <button className="rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ background: "var(--teal)" }}>Adicionar</button>
      </form>

      <div className="flex flex-col gap-2">
        {rows.map((c: any) => (
          <div key={c.id} className="rounded-2xl bg-white p-4 flex flex-wrap items-center justify-between gap-3" style={{ border: "1px solid var(--border)", opacity: c.hidden ? 0.55 : 1 }}>
            <form action={upsertCategory} className="flex flex-wrap items-center gap-2">
              <input type="hidden" name="id" value={c.id} />
              <input name="label" defaultValue={c.label} className="rounded-xl px-3 py-2 text-sm font-medium" style={{ border: "1px solid var(--border)" }} />
              <select name="icon" defaultValue={c.icon} className="rounded-xl px-2 py-2 text-sm bg-white" style={{ border: "1px solid var(--border)" }}>
                {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
              <input name="sort" type="number" defaultValue={c.sort} className="rounded-xl px-2 py-2 text-sm w-16" style={{ border: "1px solid var(--border)" }} />
              <button className="rounded-full px-3 py-1.5 text-xs font-semibold" style={{ background: "var(--sand)", color: "var(--navy)" }}>Salvar</button>
            </form>
            <CategoryActions id={c.id} hidden={c.hidden} />
          </div>
        ))}
      </div>
    </div>
  );
}
