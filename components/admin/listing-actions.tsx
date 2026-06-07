"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { setListingStatus, setListingTier, deleteListing, approveWithTrial } from "@/lib/actions/admin";

export function ListingActions({ id, status, tier }: { id: string; status: string; tier: string }) {
  const [pending, start] = useTransition();
  const router = useRouter();
  const run = (fn: (fd: FormData) => Promise<void>, fields: Record<string, string>) => {
    const fd = new FormData(); fd.set("id", id);
    Object.entries(fields).forEach(([k, v]) => fd.set(k, v));
    start(async () => { await fn(fd); router.refresh(); });
  };
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {status !== "published" && (
        <div className="flex items-center gap-1">
          <select id={`trial-${id}`} className="rounded-full px-2 py-1.5 text-xs bg-white" style={{ border: "1px solid var(--line)" }}>
            <option value="30">30 dias</option>
            <option value="60" selected>60 dias</option>
            <option value="90">90 dias</option>
          </select>
          <button onClick={() => {
            const days = (document.getElementById(`trial-${id}`) as HTMLSelectElement).value;
            run(approveWithTrial, { trial_days: days });
          }} disabled={pending}
            className="rounded-full px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50" style={{ background: "var(--sea)" }}>
            Aprovar
          </button>
        </div>
      )}
      {status !== "suspended" && <button onClick={() => run(setListingStatus, { status: "suspended" })} disabled={pending}
        className="rounded-full px-3 py-1.5 text-xs font-semibold disabled:opacity-50" style={{ background: "var(--ink-soft)", color: "#fff" }}>Suspender</button>}
      {status !== "rejected" && <button onClick={() => run(setListingStatus, { status: "rejected" })} disabled={pending}
        className="rounded-full px-3 py-1.5 text-xs font-semibold disabled:opacity-50" style={{ background: "var(--coral)", color: "#fff" }}>Rejeitar</button>}
      <select value={tier} disabled={pending} onChange={(e) => {
        const fd = new FormData(); fd.set("id", id); fd.set("tier", e.target.value);
        start(async () => { await setListingTier(fd); router.refresh(); });
      }} className="rounded-full px-2.5 py-1.5 text-xs font-semibold bg-white" style={{ border: "1px solid var(--line)" }}>
        <option value="standard">Standard</option><option value="featured">Featured</option><option value="premium">Premium</option>
      </select>
      <button onClick={() => { if (confirm("Excluir?")) run(deleteListing, {}); }} disabled={pending}
        className="rounded-full px-3 py-1.5 text-xs font-semibold disabled:opacity-50" style={{ border: "1px solid var(--coral)", color: "var(--coral)" }}>Excluir</button>
    </div>
  );
}
