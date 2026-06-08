import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { CategoryGrid } from "@/components/category-grid";
import { FeaturedRail } from "@/components/featured-rail";
import { Testimonials } from "@/components/testimonials";
import { SeoHome } from "@/components/seo-home";
import { AdSlot } from "@/components/ad-slot";
import { JsonLd } from "@/components/json-ld";
import { getCategories, getFeatured } from "@/lib/data";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, openGraphMetadata } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bem Servido · Serviços locais de confiança em Ilhabela",
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: openGraphMetadata({
    title: "Bem Servido · Serviços locais de confiança em Ilhabela",
    description: SITE_DESCRIPTION,
    url: "/",
  }),
};

export default async function HomePage() {
  const [categories, featured] = await Promise.all([getCategories(), getFeatured()]);
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    image: `${SITE_URL}/opengraph-image`,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ilhabela",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    areaServed: { "@type": "Place", name: "Ilhabela, São Paulo, Brasil" },
    priceRange: "R$",
  };

  return (
    <>
      <JsonLd data={localBusinessJsonLd} />
      <Hero />
      <CategoryGrid categories={categories} />
      <AdSlot labelKey="home" />
      <FeaturedRail providers={featured} />
      <Testimonials kind="customer" />
      <SeoHome categories={categories} />
    </>
  );
}
