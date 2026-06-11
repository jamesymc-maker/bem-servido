import type { Metadata } from "next";
import { AdSlot } from "@/components/ad-slot";
import { Results } from "@/components/results";
import { getCategories, getProviders } from "@/lib/data";
import { DEFAULT_LOCATION, getActiveLocationBySlug } from "@/lib/locations";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}): Promise<Metadata> {
  const { location } = await params;
  const loc = getActiveLocationBySlug(location) ?? getActiveLocationBySlug(DEFAULT_LOCATION)!;
  return {
    title: `Profissionais em ${loc.name} · Daquii`,
    description: `Encontre profissionais locais de confiança em ${loc.name}: chefs, motoristas, babás, capitães de barco e mais. Contacto direto pelo WhatsApp, sem comissão.`,
    alternates: { canonical: `/${loc.slug}/servicos` },
    openGraph: { title: `Profissionais em ${loc.name} · Daquii` },
  };
}

export default async function ServicosPage({
  params,
  searchParams,
}: {
  params: Promise<{ location: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { location } = await params;
  const { q } = await searchParams;
  const [categories, providers] = await Promise.all([getCategories(), getProviders(location)]);
  return (
    <>
      <Results providers={providers} categories={categories} initialQuery={q ?? ""} />
      <AdSlot labelKey="category" locationSlug={location} />
    </>
  );
}
