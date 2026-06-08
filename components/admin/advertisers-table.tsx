"use client";
import { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { adminToggleAdvertiser } from "@/lib/actions/advertiser";

const TIER_LABEL: Record<string, string> = { visibilidade: "Visibilidade", destaque: "Destaque", parceiro: "Parceiro" };
const SUB_LABEL: Record<string, string> = { active: "Ativa", past_due: "Em atraso", unpaid: "Não paga", canceled: "Cancelada" };

function fmtDate(d?: string | null) {
  if (!d) return "—";
  try { return new Date(d).toLocaleDateString("pt-BR"); } catch { return "—"; }
}

function first<T>(v: T | T[] | null | undefined): T | undefined {
  return Array.isArray(v) ? v[0] : v ?? undefined;
}

function Logo({ url, name }: { url?: string | null; name: string }) {
  if (url) return <img src={url} alt="" className="w-9 h-9 rounded-lg object-cover shrink-0" referrerPolicy="no-referrer" />;
  return (
    <span className="w-9 h-9 rounded-lg shrink-0 inline-flex items-center justify-center text-xs font-semibold"
      style={{ background: "var(--sand)", color: "var(--ink-soft)" }}>
      {name.slice(0, 1).toUpperCase()}
    </span>
  );
}

function RowActions({ id, active }: { id: string; active: boolean }) {
  const [pending, start] = useTransition();
  const router = useRouter();
  const toggle = () => {
    const fd = new FormData(); fd.set("id", id); fd.set("active", String(!active));
    start(async () => { await adminToggleAdvertiser(fd); router.refresh(); });
  };
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <Link href="/admin/anuncios" className="rounded-full px-3 py-1.5 text-xs font-semibold" style={{ border: "1px solid var(--line)", color: "var(--sea)" }}>Ver anúncios</Link>
      <button onClick={toggle} disabled={pending}
        className="rounded-full px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
        style={{ background: active ? "var(--ink-soft)" : "var(--sea)" }}>
        {active ? "Suspender" : "Reativar"}
      </button>
    </div>
  );
}

export function AdvertisersTable({ rows }: { rows: any[] }) {
  return (
    <div>
      <h1 className="serif text-2xl mb-5" style={{ fontWeight: 600 }}>Anunciantes ({rows.length})</h1>
      <div className="rounded-2xl bg-white overflow-x-auto" style={{ border: "1px solid var(--line)" }}>
        <table className="w-full text-sm" style={{ minWidth: 980 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--line)", color: "var(--ink-soft)" }} className="text-left">
              <th className="p-3 font-semibold">Empresa</th>
              <th className="p-3 font-semibold">Plano</th>
              <th className="p-3 font-semibold">Assinatura</th>
              <th className="p-3 font-semibold">Último pagamento</th>
              <th className="p-3 font-semibold">Anúncios ativos</th>
              <th className="p-3 font-semibold">Cadastro</th>
              <th className="p-3 font-semibold">Último acesso</th>
              <th className="p-3 font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((a) => {
              const sub = first<any>(a.advertiser_subscriptions);
              const tier = a.tier ?? sub?.tier;
              return (
                <tr key={a.id} style={{ borderBottom: "1px solid var(--line)" }}>
                  <td className="p-3">
                    <div className="flex items-center gap-2.5">
                      <Logo url={a.logo_url} name={a.company_name} />
                      <span className="font-medium">{a.company_name}</span>
                      {a.active === false && <span className="text-xs font-semibold" style={{ color: "var(--coral)" }}>(suspenso)</span>}
                    </div>
                  </td>
                  <td className="p-3">{tier ? (TIER_LABEL[tier] ?? tier) : "Sem plano"}</td>
                  <td className="p-3">
                    <span style={{ color: sub?.status === "active" ? "var(--sea)" : "var(--ink-soft)" }}>
                      {sub?.status ? (SUB_LABEL[sub.status] ?? sub.status) : "—"}
                    </span>
                  </td>
                  <td className="p-3" style={{ color: "var(--ink-soft)" }}>{fmtDate(sub?.last_payment_at)}</td>
                  <td className="p-3">{a.active_ads}</td>
                  <td className="p-3" style={{ color: "var(--ink-soft)" }}>{fmtDate(a.created_at)}</td>
                  <td className="p-3" style={{ color: "var(--ink-soft)" }}>{fmtDate(a.last_sign_in_at)}</td>
                  <td className="p-3"><RowActions id={a.id} active={a.active !== false} /></td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr><td colSpan={8} className="p-6 text-center" style={{ color: "var(--ink-soft)" }}>Nenhum anunciante ainda.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
