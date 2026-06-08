import type { Metadata } from "next";
import { AdSlot } from "@/components/ad-slot";
import { Results } from "@/components/results";
import { getCategories, getProviders } from "@/lib/data";
import { ACTIVE_LOCATION_NAME } from "@/lib/locations";

export const metadata: Metadata = {
  title: `Profissionais em ${ACTIVE_LOCATION_NAME} · Bem Servido`,
  description: `Encontre profissionais locais de confiança em ${ACTIVE_LOCATION_NAME}: chefs, motoristas, babás, capitães de barco e mais. Contacto direto pelo WhatsApp, sem comissão.`,
  alternates: { canonical: "/servicos" },
  openGraph: { title: `Profissionais em ${ACTIVE_LOCATION_NAME} · Bem Servido` },
};

export default async function ServicosPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const [categories, providers] = await Promise.all([getCategories(), getProviders()]);
  return (<><Results providers={providers} categories={categories} initialQuery={q ?? ""} /><AdSlot labelKey="category" /></>);
}
