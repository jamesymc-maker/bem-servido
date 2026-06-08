import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Analytics } from "@vercel/analytics/next";
import { getCategories } from "@/lib/data";
import { DEFAULT_OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL, openGraphMetadata } from "@/lib/site";

const fraunces = Fraunces({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-fraunces" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-hanken" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: "%s" },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: openGraphMetadata({
    title: SITE_TITLE,
    description: "Profissionais locais de confiança em Ilhabela. Gente de verdade, com rosto e nome.",
    url: "/",
  }),
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
  verification: {
    // Replace this with James's Google Search Console verification code from search.google.com/search-console.
    google: "replace-with-google-search-console-verification-code",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories();

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: "Diretório de profissionais locais de confiança em Ilhabela, Brasil.",
    areaServed: { "@type": "Place", name: "Ilhabela, São Paulo, Brasil" },
  };
  const siteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "pt-BR",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/servicos?q={query}`,
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
