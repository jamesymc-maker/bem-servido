import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { CategoryGrid } from "@/components/category-grid";
import { FeaturedRail } from "@/components/featured-rail";
import { Testimonials } from "@/components/testimonials";
import { SeoHome } from "@/components/seo-home";
import { AdSlot } from "@/components/ad-slot";
import { getCategories, getFeatured } from "@/lib/data";
import { DEFAULT_LOCATION, getActiveLocationBySlug } from "@/lib/locations";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}): Promise<Metadata> {
  const { location } = await params;
  const loc = getActiveLocationBySlug(location) ?? getActiveLocationBySlug(DEFAULT_LOCATION)!;
  return {
    title: `Bem Servido · Serviços locais de confiança em ${loc.name}`,
    description: `Chefs, motoristas, babás, capitães de barco e mais. Profissionais locais de confiança em ${loc.name}.`,
    alternates: { canonical: `/${loc.slug}` },
    openGraph: {
      title: `Bem Servido · ${loc.name}`,
      description: `Profissionais locais de confiança em ${loc.name}. Gente de verdade, com rosto e nome.`,
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location } = await params;
  const [categories, featured] = await Promise.all([
    getCategories(),
    getFeatured(location),
  ]);
  return (
    <>
      <Hero />
      <CategoryGrid categories={categories} />
      <AdSlot labelKey="home" locationSlug={location} />
      <FeaturedRail providers={featured} />
      <Testimonials kind="customer" />
      <SeoHome categories={categories} />
    </>
  );
}
