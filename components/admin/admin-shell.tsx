"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, List, Users, CreditCard, Tags, Settings, LogOut, ExternalLink, FileText, Megaphone } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const NAV = [
  { href: "/admin", label: "Painel", Icon: LayoutDashboard },
  { href: "/admin/listings", label: "Listagens", Icon: List },
  { href: "/admin/providers", label: "Profissionais", Icon: Users },
  { href: "/admin/payments", label: "Pagamentos", Icon: CreditCard },
  { href: "/admin/categories", label: "Categorias", Icon: Tags },
  { href: "/admin/blog", label: "Blog", Icon: FileText },
  { href: "/admin/anunciantes", label: "Anunciantes", Icon: Megaphone },
  { href: "/admin/settings", label: "Ajustes", Icon: Settings },
];

export function AdminShell({ email, children }: { email?: string; children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const signOut = async () => { await createClient().auth.signOut(); router.push("/"); router.refresh(); };
  const active = (href: string) => (href === "/admin" ? path === "/admin" : path.startsWith(href));

  return (
    <div className="min-h-screen" style={{ background: "var(--sand)" }}>
      <header className="bg-white" style={{ borderBottom: "1px solid var(--line)" }}>
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="serif text-lg" style={{ fontWeight: 600 }}>Bem Servido</span>
            <span className="text-[11px] font-bold uppercase tracking-wide rounded-full px-2 py-0.5" style={{ background: "var(--sea)", color: "#fff" }}>Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" target="_blank" className="text-sm inline-flex items-center gap-1" style={{ color: "var(--ink-soft)" }}>
              Ver site <ExternalLink size={13} />
            </Link>
            <button onClick={signOut} className="text-sm inline-flex items-center gap-1" style={{ color: "var(--ink-soft)" }}>
              <LogOut size={14} /> Sair
            </button>
          </div>
        </div>
        <nav className="max-w-6xl mx-auto px-3 flex gap-1 overflow-x-auto hide-scroll">
          {NAV.map(({ href, label, Icon }) => (
            <Link key={href} href={href}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium border-b-2 transition"
              style={active(href) ? { borderColor: "var(--sea)", color: "var(--sea)" } : { borderColor: "transparent", color: "var(--ink-soft)" }}>
              <Icon size={15} /> {label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="max-w-6xl mx-auto px-5 py-7">{children}</main>
    </div>
  );
}
