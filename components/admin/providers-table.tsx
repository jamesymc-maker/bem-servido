"use client";
import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setListingStatus } from "@/lib/actions/admin";

const STATUS_LABEL: Record<string, string> = { pending: "Pendente", published: "Publicado", rejected: "Rejeitado", suspended: "Suspenso" };
const STATUS_COLOR: Record<string, string> = { pending: "#B7791F", published: "var(--sea)", rejected: "var(--coral)", suspended: "var(--ink-soft)" };
const TIER_LABEL: Record<string, string> = { standard: "Standard", featured: "Featured", premium: "Premium" };

type Filter = "todos" | "expirar" | "expirado" | "pagantes" | "pendentes";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "expirar", label: "Trial a expirar (7 dias)" },
  { key: "expirado", label: "Trial expirado sem plano" },
  { key: "pagantes", label: "Ativos pagantes" },
  { key: "pendentes", label: "Pendentes" },
];

function fmtDate(d?: string | null) {
  if (!d) return "—";
  try { return new Date(d).toLocaleDateString("pt-BR"); } catch { return "—"; }
}

function dayDiff(d: string) {
  return Math.ceil((new Date(d).getTime() - Date.now()) / 86_400_000);
}

function first<T>(v: T | T[] | null | undefined): T | undefined {
  return Array.isArray(v) ? v[0] : v ?? undefined;
}

function planInfo(p: any) {
  const sub = first<any>(p.subscriptions);
  const paid = !!(sub && sub.status === "active" && sub.plan);
  const hasTrial = !!p.trial_ends_at;
  const daysLeft = hasTrial ? dayDiff(p.trial_ends_at) : null;
  const expired = hasTrial && !paid && (daysLeft as number) < 0;
  const planLabel = paid ? (TIER_LABEL[sub.plan] ?? sub.plan) : hasTrial ? "Trial" : "Sem plano";
  return { paid, hasTrial, daysLeft, expired, planLabel };
}

function Avatar({ url, name }: { url?: string | null; name: string }) {
  if (url) return <img src={url} alt="" className="w-9 h-9 rounded-full object-cover shrink-0" referrerPolicy="no-referrer" />;
  return (
    <span className="w-9 h-9 rounded-full shrink-0 inline-flex items-center justify-center text-xs font-semibold"
      style={{ background: "var(--sand)", color: "var(--ink-soft)" }}>
      {name.slice(0, 1).toUpperCase()}
    </span>
  );
}

function RowActions({ id, slug, status }: { id: string; slug: string; status: string }) {
  const [pending, start] = useTransition();
  const router = useRouter();
  const setStatus = (s: string) => {
    const fd = new FormData(); fd.set("id", id); fd.set("status", s);
    start(async () => { await setListingStatus(fd); router.refresh(); });
  };
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {status !== "published" && (
        <button onClick={() => setStatus("published")} disabled={pending}
          className="rounded-full px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50" style={{ background: "var(--sea)" }}>Aprovar</button>
      )}
      {status !== "suspended" && (
        <button onClick={() => setStatus("suspended")} disabled={pending}
          className="rounded-full px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50" style={{ background: "var(--ink-soft)" }}>Suspender</button>
      )}
      <Link href={`/profissional/${slug}`} target="_blank"
        className="rounded-full px-3 py-1.5 text-xs font-semibold" style={{ border: "1px solid var(--line)", color: "var(--sea)" }}>Ver perfil</Link>
    </div>
  );
}

export function ProvidersTable({ rows }: { rows: any[] }) {
  const [filter, setFilter] = useState<Filter>("todos");

  const enriched = useMemo(() => rows.map((p) => ({ ...p, _info: planInfo(p) })), [rows]);

  const sorted = useMemo(() => {
    // Trial expiry ascending: most urgent first; rows without a trial date sort last.
    return [...enriched].sort((a, b) => {
      const ta = a.trial_ends_at ? new Date(a.trial_ends_at).getTime() : Infinity;
      const tb = b.trial_ends_at ? new Date(b.trial_ends_at).getTime() : Infinity;
      return ta - tb;
    });
  }, [enriched]);

  const visible = useMemo(() => sorted.filter((p) => {
    const { paid, hasTrial, daysLeft, expired } = p._info;
    switch (filter) {
      case "expirar": return !paid && hasTrial && (daysLeft as number) >= 0 && (daysLeft as number) <= 7;
      case "expirado": return expired;
      case "pagantes": return paid;
      case "pendentes": return p.status === "pending";
      default: return true;
    }
  }), [sorted, filter]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h1 className="serif text-2xl" style={{ fontWeight: 600 }}>Profissionais ({visible.length})</h1>
        <select value={filter} onChange={(e) => setFilter(e.target.value as Filter)}
          className="rounded-full px-3 py-2 text-sm bg-white" style={{ border: "1px solid var(--line)" }}>
          {FILTERS.map((f) => <option key={f.key} value={f.key}>{f.label}</option>)}
        </select>
      </div>

      <div className="rounded-2xl bg-white overflow-x-auto" style={{ border: "1px solid var(--line)" }}>
        <table className="w-full text-sm" style={{ minWidth: 1040 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--line)", color: "var(--ink-soft)" }} className="text-left">
              <th className="p-3 font-semibold">Profissional</th>
              <th className="p-3 font-semibold">Categoria</th>
              <th className="p-3 font-semibold">Plano</th>
              <th className="p-3 font-semibold">Trial</th>
              <th className="p-3 font-semibold">Expira</th>
              <th className="p-3 font-semibold">Cadastro</th>
              <th className="p-3 font-semibold">Último acesso</th>
              <th className="p-3 font-semibold">Status</th>
              <th className="p-3 font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((p) => {
              const { paid, hasTrial, daysLeft, expired, planLabel } = p._info;
              return (
                <tr key={p.id} style={{ borderBottom: "1px solid var(--line)" }}>
                  <td className="p-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar url={p.photo_url} name={p.name} />
                      <span className="font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td className="p-3" style={{ color: "var(--ink-soft)" }}>{p.categories?.label ?? "—"}</td>
                  <td className="p-3">{planLabel}</td>
                  <td className="p-3">
                    {!hasTrial || paid ? <span style={{ color: "var(--ink-soft)" }}>—</span>
                      : expired ? <span style={{ color: "var(--coral)", fontWeight: 600 }}>Expirado</span>
                      : <span style={{ fontWeight: 600 }}>{daysLeft} dias</span>}
                  </td>
                  <td className="p-3" style={{ color: "var(--ink-soft)" }}>{hasTrial ? fmtDate(p.trial_ends_at) : "—"}</td>
                  <td className="p-3" style={{ color: "var(--ink-soft)" }}>{fmtDate(p.created_at)}</td>
                  <td className="p-3" style={{ color: "var(--ink-soft)" }}>{fmtDate(p.last_sign_in_at)}</td>
                  <td className="p-3">
                    <span className="text-xs font-semibold rounded-full px-2 py-1" style={{ color: STATUS_COLOR[p.status], background: "var(--sand)" }}>
                      {STATUS_LABEL[p.status] ?? p.status}
                    </span>
                  </td>
                  <td className="p-3"><RowActions id={p.id} slug={p.slug} status={p.status} /></td>
                </tr>
              );
            })}
            {visible.length === 0 && (
              <tr><td colSpan={9} className="p-6 text-center" style={{ color: "var(--ink-soft)" }}>Nenhum profissional neste filtro.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
