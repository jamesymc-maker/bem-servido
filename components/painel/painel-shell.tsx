"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, User, Image as ImageIcon, Video, CreditCard, Tag, LogOut, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const NAV = [
  { href: "/painel", label: "Visão geral", Icon: LayoutDashboard },
  { href: "/painel/perfil", label: "Perfil", Icon: User },
  { href: "/painel/fotos", label: "Fotos", Icon: ImageIcon },
  { href: "/painel/video", label: "Vídeo", Icon: Video },
  { href: "/painel/plano", label: "Plano", Icon: Tag },
  { href: "/painel/pagamentos", label: "Pagamentos", Icon: CreditCard },
];

const STATUS: Record<string, { label: string; color: string }> = {
  pending: { label: "Em análise", color: "#B7791F" },
  published: { label: "Publicado", color: "var(--sea)" },
  rejected: { label: "Rejeitado", color: "var(--coral)" },
  suspended: { label: "Suspenso", color: "var(--ink-soft)" },
};

export function PainelShell({ status, slug, published, children }: { status: string; slug: string; published: boolean; children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const st = STATUS[status] ?? { label: status, color: "var(--ink-soft)" };
  const signOut = async () => { await createClient().auth.signOut(); router.push("/"); router.refresh(); };
  const active = (href: string) => (href === "/painel" ? path === "/painel" : path.startsWith(href));

  return (
    <div className="min-h-screen" style={{ background: "var(--sand)" }}>
      <header className="bg-white" style={{ borderBottom: "1px solid var(--line)" }}>
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
          <span className="serif text-lg" style={{ fontWeight: 600 }}>Meu painel</span>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold rounded-full px-2.5 py-1" style={{ background: "var(--sand)", color: st.color }}>{st.label}</span>
            {published && (
              <Link href={`/profissional/${slug}`} target="_blank" className="text-sm inline-flex items-center gap-1" style={{ color: "var(--ink-soft)" }}>
                Ver perfil <ExternalLink size={13} />
              </Link>
            )}
            <button onClick={signOut} className="text-sm inline-flex items-center gap-1" style={{ color: "var(--ink-soft)" }}><LogOut size={14} /> Sair</button>
          </div>
        </div>
        <nav className="max-w-4xl mx-auto px-3 flex gap-1 overflow-x-auto hide-scroll">
          {NAV.map(({ href, label, Icon }) => (
            <Link key={href} href={href}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium border-b-2 transition"
              style={active(href) ? { borderColor: "var(--sea)", color: "var(--sea)" } : { borderColor: "transparent", color: "var(--ink-soft)" }}>
              <Icon size={15} /> {label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="max-w-4xl mx-auto px-5 py-7">{children}</main>
    </div>
  );
}
