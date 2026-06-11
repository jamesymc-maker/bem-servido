import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ad-slot";
import { Results } from "@/components/results";
import { getCategories, getProviders } from "@/lib/data";
import { DEFAULT_LOCATION, getActiveLocationBySlug } from "@/lib/locations";
import { t } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string; slug: string }>;
}): Promise<Metadata> {
  const { location, slug } = await params;
  const loc = getActiveLocationBySlug(location) ?? getActiveLocationBySlug(DEFAULT_LOCATION)!;
  const categories = await getCategories();
  const label = categories.find((c) => c.slug === slug)?.label || t(`cats.${slug}`);
  const titleBase = `${label} em ${loc.name}`;
  return {
    title: `${titleBase} · Daquii`,
    description: `${label} em ${loc.name}: profissionais locais de confiança, com rosto, idiomas e valores. Fale direto pelo WhatsApp, sem comissão.`,
    alternates: { canonical: `/${loc.slug}/servicos/${slug}` },
    openGraph: { title: `${titleBase} · Daquii` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ location: string; slug: string }>;
}) {
  const { location, slug } = await params;
  const [categories, providers] = await Promise.all([getCategories(), getProviders(location)]);
  if (!categories.some((c) => c.slug === slug)) notFound();
  return (
    <>
      <Results providers={providers} categories={categories} initialCategory={slug} />
      <AdSlot labelKey="category" categorySlug={slug} locationSlug={location} />
    </>
  );
}
