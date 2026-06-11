import Link from "next/link";
import { adminListBlogPosts } from "@/lib/admin-data";
import { BlogActions } from "@/components/admin/blog-actions";
import { Plus } from "lucide-react";

function fmt(d: string) {
  try { return new Date(d).toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" }); }
  catch { return d; }
}

export default async function AdminBlog() {
  const posts = await adminListBlogPosts();
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-heading text-2xl" style={{ fontWeight: 600 }}>Blog ({posts.length})</h1>
        <Link href="/admin/blog/novo" className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white"
          style={{ background: "var(--teal)" }}>
          <Plus size={16} /> Novo post
        </Link>
      </div>
      {posts.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center" style={{ border: "1px solid var(--border)" }}>
          <p className="mb-3" style={{ color: "var(--muted)" }}>Nenhum post ainda.</p>
          <p className="text-sm" style={{ color: "var(--muted)" }}>Execute supabase/blog_seed.sql no Supabase para importar os posts existentes, ou crie um novo.</p>
        </div>
      ) : (
        <div className="rounded-2xl bg-white overflow-hidden" style={{ border: "1px solid var(--border)" }}>
          <table className="w-full text-sm" style={{ minWidth: 640 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", color: "var(--muted)" }} className="text-left">
                <th className="p-3 font-semibold">Título</th>
                <th className="p-3 font-semibold">Data</th>
                <th className="p-3 font-semibold">Lang</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p: any) => (
                <tr key={p.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td className="p-3">
                    <Link href={`/admin/blog/${p.id}`} className="font-medium hover:underline" style={{ color: "var(--navy)" }}>{p.title}</Link>
                  </td>
                  <td className="p-3" style={{ color: "var(--muted)" }}>{fmt(p.date)}</td>
                  <td className="p-3 uppercase text-xs font-semibold" style={{ color: "var(--muted)" }}>{p.lang}</td>
                  <td className="p-3">
                    <span className="text-xs font-semibold rounded-full px-2 py-1" style={{ background: "var(--sand)", color: p.published ? "var(--teal)" : "var(--muted)" }}>
                      {p.published ? "Publicado" : "Rascunho"}
                    </span>
                  </td>
                  <td className="p-3"><BlogActions id={p.id} published={p.published} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
