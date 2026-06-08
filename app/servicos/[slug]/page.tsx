import type { Metadata } from "next";
import { AdSlot } from "@/components/ad-slot";
import { notFound } from "next/navigation";
import { Results } from "@/components/results";
import { getCategories, getProviders } from "@/lib/data";
import { ACTIVE_LOCATION_NAME } from "@/lib/locations";
import { t } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const label = t(`cats.${slug}`);
  const titleBase = `${label} em ${ACTIVE_LOCATION_NAME}`;
  return {
    title: `${titleBase} · Bem Servido`,
    description: `${label} em ${ACTIVE_LOCATION_NAME}: profissionais locais de confiança, com rosto, idiomas e valores. Fale direto pelo WhatsApp, sem comissão.`,
    alternates: { canonical: `/servicos/${slug}` },
    openGraph: { title: `${titleBase} · Bem Servido` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [categories, providers] = await Promise.all([getCategories(), getProviders()]);
  if (!categories.some((c) => c.slug === slug)) notFound();
  return (<><Results providers={providers} categories={categories} initialCategory={slug} /><AdSlot labelKey="category" categorySlug={slug} /></>);
}
