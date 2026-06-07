"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { ChevronUp, ChevronDown, Eye, EyeOff } from "lucide-react";
import { toggleCategoryHidden, moveCategory } from "@/lib/actions/admin";

export function CategoryActions({ id, hidden }: { id: string; hidden: boolean }) {
  const [pending, start] = useTransition();
  const router = useRouter();
  const call = (fn: (fd: FormData) => Promise<void>, fields: Record<string, string>) => {
    const fd = new FormData(); fd.set("id", id);
    Object.entries(fields).forEach(([k, v]) => fd.set(k, v));
    start(async () => { await fn(fd); router.refresh(); });
  };
  const icon = "w-8 h-8 grid place-items-center rounded-full disabled:opacity-40";
  return (
    <div className="flex items-center gap-1.5">
      <button className={icon} disabled={pending} style={{ background: "var(--sand)" }} onClick={() => call(moveCategory, { dir: "-1" })}><ChevronUp size={16} /></button>
      <button className={icon} disabled={pending} style={{ background: "var(--sand)" }} onClick={() => call(moveCategory, { dir: "1" })}><ChevronDown size={16} /></button>
      <button className="rounded-full px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1 disabled:opacity-50"
        disabled={pending} style={{ border: "1px solid var(--line)", color: "var(--ink-soft)" }}
        onClick={() => call(toggleCategoryHidden, { hidden: String(!hidden) })}>
        {hidden ? <><Eye size={13} /> Mostrar</> : <><EyeOff size={13} /> Ocultar</>}
      </button>
    </div>
  );
}
