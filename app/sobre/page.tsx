import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { About } from "@/components/about";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { DICT } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Sobre · Bem Servido · Serviços locais de confiança em Ilhabela",
  description: "O Bem Servido conecta você aos melhores profissionais locais de Ilhabela. Saiba como funciona e tire suas dúvidas.",
  alternates: { canonical: "/sobre" },
};

export default async function SobrePage() {
  const items: { q: string; a: string }[] = DICT.faq.items;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <About />
      <section className="max-w-3xl mx-auto px-5 py-10">
        <div
          className="rounded-2xl p-8 text-center"
          style={{ background: "var(--cream)", border: "1px solid rgba(14,91,78,.12)" }}
        >
          <h2 className="serif text-2xl md:text-3xl" style={{ fontWeight: 600 }}>
            Fale connosco pelo WhatsApp
          </h2>
          <p className="text-[16px] mt-3" style={{ color: "var(--ink-soft)" }}>
            Tem alguma dúvida ou precisa de ajuda? Estamos disponíveis no WhatsApp.
          </p>
          <a
            href="https://wa.me/5512991353976"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-5 px-5 py-3 rounded-full text-white font-semibold transition hover:opacity-90"
            style={{ background: "#25D366" }}
          >
            <MessageCircle size={18} /> +55 12 99135-3976
          </a>
        </div>
      </section>
      <Faq />
    </>
  );
}
