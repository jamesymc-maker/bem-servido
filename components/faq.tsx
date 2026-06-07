"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { t } from "@/lib/i18n";

export function Faq() {
  const items: { q: string; a: string }[] = t("faq.items");
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="max-w-3xl mx-auto px-5 py-14">
      <h2 className="serif text-3xl md:text-4xl text-center" style={{ fontWeight: 600 }}>{t("faq.title")}</h2>
      <p className="text-center text-sm mt-2 mb-8" style={{ color: "var(--ink-soft)" }}>{t("faq.sub")}</p>
      <div className="flex flex-col gap-3">
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="rounded-2xl bg-white overflow-hidden" style={{ border: "1px solid var(--line)" }}>
              <button onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 text-left px-5 py-4">
                <span className="font-semibold" style={{ color: "var(--ink)" }}>{it.q}</span>
                <span className="shrink-0 grid place-items-center w-7 h-7 rounded-full" style={{ background: "var(--sand)", color: "var(--sea)" }}>
                  {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              {isOpen && <p className="px-5 pb-5 text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>{it.a}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
