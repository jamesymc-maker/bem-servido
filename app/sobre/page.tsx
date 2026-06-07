import type { Metadata } from "next";
import { cookies } from "next/headers";
import { About } from "@/components/about";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { DICT, type Lang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Sobre · Bem Servido · Serviços locais de confiança em Ilhabela",
  description: "O Bem Servido conecta você aos melhores profissionais locais de Ilhabela. Saiba como funciona e tire suas dúvidas.",
  alternates: { canonical: "/sobre" },
};

export default async function SobrePage() {
  const cookieStore = await cookies();
  const lang: Lang = (cookieStore.get("lang")?.value as Lang) === "en" ? "en" : "pt";
  const items: { q: string; a: string }[] = DICT[lang].faq.items;

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
