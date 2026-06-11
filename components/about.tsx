"use client";
import { useT } from "./location-provider";

export function About() {
  const t = useT();
  const body: string[] = t("sobre.body");
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "radial-gradient(100% 80% at 50% -20%, rgba(14,91,78,.14), transparent 60%), var(--white)" }} />
      <div className="relative max-w-3xl mx-auto px-5 pt-16 pb-6">
        <h1 className="font-heading text-4xl md:text-5xl leading-tight" style={{ fontWeight: 600 }}>{t("sobre.title")}</h1>
        <p className="text-xl mt-4" style={{ color: "var(--teal)" }}>{t("sobre.lead")}</p>
        <div className="flex flex-col gap-4 mt-7 text-[16px] leading-relaxed" style={{ color: "var(--muted)" }}>
          {body.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>
    </section>
  );
}
