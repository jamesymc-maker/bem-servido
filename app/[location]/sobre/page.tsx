import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { About } from "@/components/about";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { t } from "@/lib/i18n";
import { DEFAULT_LOCATION, getActiveLocationBySlug } from "@/lib/locations";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}): Promise<Metadata> {
  const { location } = await params;
  const loc = getActiveLocationBySlug(location) ?? getActiveLocationBySlug(DEFAULT_LOCATION)!;
  return {
    title: `Sobre · Serviços locais de confiança em ${loc.name} · Daquii`,
    description: `O Daquii conecta você aos melhores profissionais locais de ${loc.name}. Saiba como funciona e tire suas dúvidas.`,
    alternates: { canonical: `/${loc.slug}/sobre` },
  };
}

export default async function SobrePage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location } = await params;
  const loc = getActiveLocationBySlug(location) ?? getActiveLocationBySlug(DEFAULT_LOCATION)!;
  const items: { q: string; a: string }[] = t("faq.items", { loc: loc.name });

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
          style={{ background: "var(--white)", border: "1px solid rgba(14,91,78,.12)" }}
        >
          <h2 className="font-heading text-2xl md:text-3xl" style={{ fontWeight: 600 }}>
            Fale connosco pelo WhatsApp
          </h2>
          <p className="text-[16px] mt-3" style={{ color: "var(--muted)" }}>
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
