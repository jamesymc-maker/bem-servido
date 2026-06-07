import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Analytics } from "@vercel/analytics/next";
import { getCategories } from "@/lib/data";

const fraunces = Fraunces({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-fraunces" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-hanken" });

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://bemservido.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: "Bem Servido · Serviços locais de confiança em Ilhabela", template: "%s" },
  description: "Chefs, motoristas, babás, capitães de barco e mais. Profissionais locais de confiança em Ilhabela.",
  openGraph: {
    title: "Bem Servido · Ilhabela",
    description: "Profissionais locais de confiança em Ilhabela. Gente de verdade, com rosto e nome.",
    type: "website", locale: "pt_BR", siteName: "Bem Servido",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories();

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Bem Servido",
    url: SITE,
    description: "Diretório de profissionais locais de confiança em Ilhabela, Brasil.",
    areaServed: { "@type": "Place", name: "Ilhabela, São Paulo, Brasil" },
  };
  const siteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Bem Servido",
    url: SITE,
    inLanguage: "pt-BR",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE}/servicos?q={query}`,
      "query-input": "required name=query",
    },
  };

  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${hanken.variable}`}>
      <body>
        <JsonLd data={orgJsonLd} />
        <JsonLd data={siteJsonLd} />
        <div className="grain" />
        <Nav />
        <main>{children}</main>
        <Footer categories={categories} />
        <Analytics />
      </body>
    </html>
  );
}
