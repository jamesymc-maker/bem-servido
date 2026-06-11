import type { Metadata } from "next";
import { Montserrat, Sora } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { LocationProvider } from "@/components/location-provider";
import { Analytics } from "@vercel/analytics/next";
import { getCategories } from "@/lib/data";
import { ACTIVE_LOCATION_NAME, DEFAULT_LOCATION } from "@/lib/locations";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-montserrat",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sora",
});

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://daquii.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: `Serviços locais de confiança em ${ACTIVE_LOCATION_NAME} · daquii`, template: "%s" },
  description: `Chefs, motoristas, babás, capitães de barco e mais. Profissionais locais de confiança em ${ACTIVE_LOCATION_NAME}.`,
  openGraph: {
    title: `${ACTIVE_LOCATION_NAME} · daquii`,
    description: `Profissionais locais de confiança em ${ACTIVE_LOCATION_NAME}. Gente de verdade, com rosto e nome.`,
    type: "website", locale: "pt_BR", siteName: "daquii", url: SITE,
  },
  twitter: {
    card: "summary_large_image",
    title: `${ACTIVE_LOCATION_NAME} · daquii`,
    description: `Profissionais locais de confiança em ${ACTIVE_LOCATION_NAME}. Gente de verdade, com rosto e nome.`,
  },
  verification: {
    google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories();

  const siteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "daquii",
    url: SITE,
    inLanguage: "pt-BR",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE}/${DEFAULT_LOCATION}/servicos?q={query}`,
      "query-input": "required name=query",
    },
  };

  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${sora.variable}`}>
      <body className="font-body">
        <JsonLd data={siteJsonLd} />
        <LocationProvider>
          <Nav />
          <main>{children}</main>
          <Footer categories={categories} />
        </LocationProvider>
        <Analytics />
      </body>
    </html>
  );
}
