import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Analytics } from "@vercel/analytics/next";
import { getCategories } from "@/lib/data";
import { ACTIVE_LOCATION_NAME, getActiveLocation } from "@/lib/locations";

const fraunces = Fraunces({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-fraunces" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-hanken" });

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://bemservido.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: `Bem Servido · Serviços locais de confiança em ${ACTIVE_LOCATION_NAME}`, template: "%s" },
  description: `Chefs, motoristas, babás, capitães de barco e mais. Profissionais locais de confiança em ${ACTIVE_LOCATION_NAME}.`,
  openGraph: {
    title: `Bem Servido · ${ACTIVE_LOCATION_NAME}`,
    description: `Profissionais locais de confiança em ${ACTIVE_LOCATION_NAME}. Gente de verdade, com rosto e nome.`,
    type: "website", locale: "pt_BR", siteName: "Bem Servido", url: SITE,
  },
  twitter: {
    card: "summary_large_image",
    title: `Bem Servido · ${ACTIVE_LOCATION_NAME}`,
    description: `Profissionais locais de confiança em ${ACTIVE_LOCATION_NAME}. Gente de verdade, com rosto e nome.`,
  },
  verification: {
    // TODO(James): replace with your verification code from search.google.com/search-console
    // (Settings → Ownership verification → HTML tag → copy the content="..." value)
    google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories();
  const loc = getActiveLocation();

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE}/#business`,
    name: "Bem Servido",
    url: SITE,
    description: `Diretório de profissionais locais de confiança em ${loc.name}, ${loc.country}.`,
    image: `${SITE}/opengraph-image`,
    areaServed: { "@type": "Place", name: `${loc.name}, ${loc.region}, ${loc.country}` },
    address: {
      "@type": "PostalAddress",
      addressLocality: loc.name,
      addressRegion: loc.region,
      addressCountry: "BR",
    },
    priceRange: "R$",
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
