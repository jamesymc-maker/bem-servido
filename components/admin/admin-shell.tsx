"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, Tags, Settings, LogOut, ExternalLink, FileText, Megaphone, Image as ImageIcon, Star } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const NAV = [
  { href: "/admin", label: "Painel", Icon: LayoutDashboard },
  { href: "/admin/providers", label: "Profissionais", Icon: Users },
  { href: "/admin/anunciantes", label: "Anunciantes", Icon: Megaphone },
  { href: "/admin/anuncios", label: "Anúncios", Icon: ImageIcon },
  { href: "/admin/avaliacoes", label: "Avaliações", Icon: Star },
  { href: "/admin/blog", label: "Blog", Icon: FileText },
  { href: "/admin/categories", label: "Categorias", Icon: Tags },
  { href: "/admin/settings", label: "Ajustes", Icon: Settings },
];

export function AdminShell({ email, children }: { email?: string; children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const signOut = async () => { await createClient().auth.signOut(); router.push("/"); router.refresh(); };
  const active = (href: string) => (href === "/admin" ? path === "/admin" : path.startsWith(href));

  return (
    <div className="min-h-screen" style={{ background: "var(--sand)" }}>
      <header className="bg-white" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '1.5rem', color: '#0B1D3A', letterSpacing: '-0.02em' }}>daquii</span>
            <span className="text-[11px] font-bold uppercase tracking-wide rounded-dqfull px-2 py-0.5 bg-teal text-white">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" target="_blank" className="text-sm inline-flex items-center gap-1" style={{ color: "var(--muted)" }}>
              Ver site <ExternalLink size={13} />
            </Link>
            <button onClick={signOut} className="text-sm inline-flex items-center gap-1" style={{ color: "var(--muted)" }}>
              <LogOut size={14} /> Sair
            </button>
          </div>
        </div>
        <nav className="max-w-6xl mx-auto px-3 flex gap-1 overflow-x-auto hide-scroll">
          {NAV.map(({ href, label, Icon }) => (
            <Link key={href} href={href}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium border-b-2 transition"
              style={active(href) ? { borderColor: "var(--teal)", color: "var(--teal)" } : { borderColor: "transparent", color: "var(--muted)" }}>
              <Icon size={15} /> {label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="max-w-6xl mx-auto px-5 py-7">{children}</main>
    </div>
  );
}
