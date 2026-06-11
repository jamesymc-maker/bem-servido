import { upsertBlogPost } from "@/lib/actions/admin";

const LANGS = [{ v: "pt", l: "Português" }, { v: "en", l: "English" }];
const CATS = ["private-chefs","drivers","house-cleaning","babysitters","boat-services","wellness","handymen","photography","concierge","tour-guides"];

export function BlogForm({ post }: { post?: any }) {
  const field = "w-full rounded-xl px-4 py-3 text-[15px] outline-none bg-white";
  const border = { border: "1px solid var(--border)" };
  const lbl = "block text-sm font-semibold mb-1.5";
  return (
    <form action={upsertBlogPost} className="flex flex-col gap-5">
      {post?.id && <input type="hidden" name="id" value={post.id} />}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={lbl}>Título</label>
          <input name="title" required defaultValue={post?.title ?? ""} className={field} style={border} />
        </div>
        <div>
          <label className={lbl}>Slug (URL)</label>
          <input name="slug" required defaultValue={post?.slug ?? ""} placeholder="meu-post" className={field} style={border} readOnly={!!post?.id} />
        </div>
      </div>
      <div>
        <label className={lbl}>Descrição (aparece no Google)</label>
        <input name="description" defaultValue={post?.description ?? ""} className={field} style={border} />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className={lbl}>Data</label>
          <input name="date" type="date" defaultValue={post?.date ?? new Date().toISOString().slice(0,10)} className={field} style={border} />
        </div>
        <div>
          <label className={lbl}>Autor</label>
          <input name="author" defaultValue={post?.author ?? "Equipe daquii"} className={field} style={border} />
        </div>
        <div>
          <label className={lbl}>Idioma</label>
          <select name="lang" defaultValue={post?.lang ?? "pt"} className={`${field} bg-white`} style={border}>
            {LANGS.map(l => <option key={l.v} value={l.v}>{l.l}</option>)}
          </select>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={lbl}>URL da imagem de capa</label>
          <input name="cover_url" defaultValue={post?.cover_url ?? ""} placeholder="https://..." className={field} style={border} />
        </div>
        <div>
          <label className={lbl}>Categoria (opcional)</label>
          <select name="category_slug" defaultValue={post?.category_slug ?? ""} className={`${field} bg-white`} style={border}>
            <option value="">Sem categoria</option>
            {CATS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className={lbl}>Tags (separadas por vírgula)</label>
        <input name="tags" defaultValue={(post?.tags ?? []).join(", ")} placeholder="ilhabela, praia, dicas" className={field} style={border} />
      </div>
      <div>
        <label className={lbl}>Conteúdo (Markdown)</label>
        <p className="text-xs mb-2" style={{ color: "var(--muted)" }}>Use ## para títulos, **negrito**, [link](url), - para listas.</p>
        <textarea name="content" rows={20} defaultValue={post?.content ?? ""} className={`${field} font-mono text-sm resize-y`} style={border} />
      </div>
      <div className="flex items-center gap-2.5">
        <input type="checkbox" name="published" id="published" defaultChecked={post?.published ?? false} className="w-4 h-4" />
        <label htmlFor="published" className="text-sm font-semibold">Publicar (visível no site)</label>
      </div>
      <div>
        <button className="rounded-full px-6 py-3 font-semibold text-white" style={{ background: "var(--teal)" }}>
          {post?.id ? "Salvar alterações" : "Criar post"}
        </button>
      </div>
    </form>
  );
}
