"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleBlogPublished, deleteBlogPost } from "@/lib/actions/admin";

export function BlogActions({ id, published }: { id: string; published: boolean }) {
  const [pending, start] = useTransition();
  const router = useRouter();
  const run = (fn: (fd: FormData) => Promise<void>, fields: Record<string, string>) => {
    const fd = new FormData(); fd.set("id", id);
    Object.entries(fields).forEach(([k, v]) => fd.set(k, v));
    start(async () => { await fn(fd); router.refresh(); });
  };
  return (
    <div className="flex items-center gap-2">
      <button onClick={() => run(toggleBlogPublished, { published: String(!published) })} disabled={pending}
        className="rounded-full px-3 py-1.5 text-xs font-semibold disabled:opacity-50"
        style={published ? { border: "1px solid var(--line)", color: "var(--ink-soft)" } : { background: "var(--sea)", color: "#fff" }}>
        {published ? "Despublicar" : "Publicar"}
      </button>
      <button onClick={() => { if (window.confirm("Excluir este post?")) run(deleteBlogPost, {}); }} disabled={pending}
        className="rounded-full px-3 py-1.5 text-xs font-semibold disabled:opacity-50"
        style={{ border: "1px solid var(--coral)", color: "var(--coral)" }}>Excluir</button>
    </div>
  );
}
