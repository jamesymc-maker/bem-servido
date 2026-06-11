"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Image as ImageIcon, Tag, LogOut, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const NAV = [
  { href: "/anunciante/painel", label: "Visão geral", Icon: LayoutDashboard },
  { href: "/anunciante/painel/anuncios", label: "Meus anúncios", Icon: ImageIcon },
  { href: "/anunciante/painel/plano", label: "Plano", Icon: Tag },
];

const TIER_LABEL: Record<string, string> = { visibilidade: "Visibilidade", destaque: "Destaque", parceiro: "Parceiro Oficial" };

export function AdvertiserShell({ tier, children }: { tier?: string; children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const signOut = async () => { await createClient().auth.signOut(); router.push("/"); router.refresh(); };
  const active = (href: string) => (href === "/anunciante/painel" ? path === "/anunciante/painel" : path.startsWith(href));
  return (
    <div className="min-h-screen" style={{ background: "var(--sand)" }}>
      <header className="bg-white" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '1.5rem', color: '#0B1D3A', letterSpacing: '-0.02em' }}>daquii</span>
            <span className="font-heading text-lg font-bold text-navy">Painel do anunciante</span>
          </div>
          <div className="flex items-center gap-3">
            {tier && <span className="text-xs font-bold rounded-full px-2.5 py-1" style={{ background: "var(--teal)", color: "#fff" }}>{TIER_LABEL[tier] ?? tier}</span>}
            <Link href="/anunciar" target="_blank" className="text-sm inline-flex items-center gap-1" style={{ color: "var(--muted)" }}>
              Ver planos <ExternalLink size={13} />
            </Link>
            <button onClick={signOut} className="text-sm inline-flex items-center gap-1" style={{ color: "var(--muted)" }}><LogOut size={14} /> Sair</button>
          </div>
        </div>
        <nav className="max-w-4xl mx-auto px-3 flex gap-1 overflow-x-auto hide-scroll">
          {NAV.map(({ href, label, Icon }) => (
            <Link key={href} href={href}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium border-b-2 transition"
              style={active(href) ? { borderColor: "var(--teal)", color: "var(--teal)" } : { borderColor: "transparent", color: "var(--muted)" }}>
              <Icon size={15} /> {label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="max-w-4xl mx-auto px-5 py-7">{children}</main>
    </div>
  );
}
