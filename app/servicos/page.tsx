import type { Metadata } from "next";
import { AdSlot } from "@/components/ad-slot";
import { Results } from "@/components/results";
import { getCategories, getProviders } from "@/lib/data";
import { openGraphMetadata } from "@/lib/site";

const title = "Serviços em Ilhabela · Bem Servido";
const description =
  "Encontre chefs, motoristas, babás, limpeza, barcos, guias e outros profissionais locais de confiança em Ilhabela.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/servicos" },
  openGraph: openGraphMetadata({ title, description, url: "/servicos" }),
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
