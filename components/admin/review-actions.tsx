"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { moderateReview } from "@/lib/actions/admin";

export function ReviewActions({ id }: { id: string }) {
  const [pending, start] = useTransition();
  const router = useRouter();
  const run = (status: string) => {
    const fd = new FormData(); fd.set("id", id); fd.set("status", status);
    start(async () => { await moderateReview(fd); router.refresh(); });
  };
  return (
    <div className="flex gap-1.5">
      <button onClick={() => run("approved")} disabled={pending}
        className="rounded-full px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50" style={{ background: "var(--sea)" }}>Aprovar</button>
      <button onClick={() => run("rejected")} disabled={pending}
        className="rounded-full px-3 py-1.5 text-xs font-semibold disabled:opacity-50" style={{ border: "1px solid var(--coral)", color: "var(--coral)" }}>Rejeitar</button>
    </div>
  );
}
