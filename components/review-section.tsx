"use client";
import { useState } from "react";
import { Star } from "lucide-react";
import type { Review, ReviewSummary } from "@/lib/types";
import { useT } from "./location-provider";

function StarsRow({ n, size = 15 }: { n: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} strokeWidth={0} fill={i < Math.round(n) ? "var(--pink)" : "var(--sand-deep)"} />
      ))}
    </div>
  );
}

function fmt(date: string) {
  try { return new Date(date).toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" }); }
  catch { return date; }
}

export function ReviewSection({
  providerSlug, providerName, reviews, summary,
}: {
  providerSlug: string; providerName: string; reviews: Review[]; summary: ReviewSummary;
}) {
  const [openForm, setOpenForm] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState<string | null>(null);
  const t = useT();

  async function submit() {
    setErr(null);
    if (!name.trim()) return setErr(t("reviews.errorName"));
    if (!(rating >= 1)) return setErr(t("reviews.errorRating"));
    if (!comment.trim()) return setErr(t("reviews.errorComment"));
    setState("sending");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ providerSlug, authorName: name, rating, comment }),
      });
      if (res.ok) { setState("done"); return; }
      const d = await res.json().catch(() => ({}));
      setErr(d.error === "not_configured" ? t("reviews.notConfigured") : t("reviews.failed"));
      setState("error");
    } catch {
      setErr(t("reviews.failed")); setState("error");
    }
  }

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="font-heading text-2xl flex items-center gap-3" style={{ fontWeight: 600 }}>
          {t("reviews.title")}
          {summary.count > 0 && (
            <span className="inline-flex items-center gap-2 text-base font-sans" style={{ color: "var(--muted)" }}>
              <StarsRow n={summary.avg} />
              <span className="font-semibold" style={{ color: "var(--navy)" }}>{summary.avg.toFixed(1)}</span>
              <span>· {summary.count === 1 ? t("reviews.based", { count: summary.count }) : t("reviews.basedPlural", { count: summary.count })}</span>
            </span>
          )}
        </h2>
        {!openForm && state !== "done" && (
          <button onClick={() => setOpenForm(true)}
            className="rounded-full px-4 py-2.5 text-sm font-semibold transition active:scale-95"
            style={{ background: "var(--teal)", color: "#fff" }}>{t("reviews.leave")}</button>
        )}
      </div>

      <p className="text-[13px] mt-1" style={{ color: "var(--muted)" }}>{t("reviews.moderated")}</p>

      {state === "done" ? (
        <div className="mt-5 rounded-2xl px-5 py-4 text-sm" style={{ background: "rgba(14,91,78,.08)", color: "var(--teal)" }}>
          {t("reviews.thanks")}
        </div>
      ) : openForm ? (
        <div className="mt-5 rounded-2xl bg-white p-5" style={{ border: "1px solid var(--border)" }}>
          <label className="block text-sm font-semibold mb-1">{t("reviews.yourRating")}</label>
          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((v) => (
              <button key={v} onMouseEnter={() => setHover(v)} onMouseLeave={() => setHover(0)} onClick={() => setRating(v)} aria-label={`${v}`}>
                <Star size={28} strokeWidth={0} fill={(hover || rating) >= v ? "var(--pink)" : "var(--sand-deep)"} />
              </button>
            ))}
          </div>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t("reviews.yourName")}
            className="w-full rounded-xl px-4 py-3 mb-3 bg-white outline-none text-[15px]" style={{ border: "1px solid var(--border)" }} />
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder={t("reviews.yourComment")} rows={4}
            className="w-full rounded-xl px-4 py-3 bg-white outline-none text-[15px] resize-none" style={{ border: "1px solid var(--border)" }} />
          {err && <p className="text-sm mt-2" style={{ color: "var(--pink)" }}>{err}</p>}
          <div className="flex gap-2 mt-4">
            <button onClick={submit} disabled={state === "sending"}
              className="rounded-full px-5 py-3 text-sm font-semibold text-white transition active:scale-95 disabled:opacity-60" style={{ background: "var(--teal)" }}>
              {state === "sending" ? t("reviews.sending") : t("reviews.submit")}
            </button>
            <button onClick={() => { setOpenForm(false); setErr(null); }} className="rounded-full px-5 py-3 text-sm font-semibold" style={{ background: "var(--sand)", color: "var(--navy)" }}>
              {t("reviews.cancel")}
            </button>
          </div>
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-4">
        {reviews.length === 0 ? (
          <p className="text-[15px]" style={{ color: "var(--muted)" }}>{t("reviews.empty", { name: providerName.split(" ")[0] })}</p>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="rounded-2xl bg-white p-5" style={{ border: "1px solid var(--border)" }}>
              <div className="flex items-center justify-between">
                <span className="font-semibold">{r.author_name}</span>
                <span className="text-[12px]" style={{ color: "var(--muted)" }}>{fmt(r.created_at)}</span>
              </div>
              <div className="mt-1.5 mb-2"><StarsRow n={r.rating} size={14} /></div>
              <p className="text-[15px] leading-relaxed" style={{ color: "var(--navy)" }}>{r.comment}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
