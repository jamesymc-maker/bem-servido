import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { CategoryGrid } from "@/components/category-grid";
import { FeaturedRail } from "@/components/featured-rail";
import { Testimonials } from "@/components/testimonials";
import { SeoHome } from "@/components/seo-home";
import { AdSlot } from "@/components/ad-slot";
import { getCategories, getFeatured } from "@/lib/data";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default async function HomePage() {
  const [categories, featured] = await Promise.all([getCategories(), getFeatured()]);
  return (
    <>
      <Hero />
      <CategoryGrid categories={categories} />
      <AdSlot labelKey="home" />
      <FeaturedRail providers={featured} />
      <Testimonials kind="customer" />
      <SeoHome categories={categories} />
    </>
  );
}
