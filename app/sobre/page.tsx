import type { Metadata } from "next";
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
      <Faq />
    </>
  );
}
