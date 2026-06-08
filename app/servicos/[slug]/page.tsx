import type { Metadata } from "next";
import { AdSlot } from "@/components/ad-slot";
import { notFound } from "next/navigation";
import { Results } from "@/components/results";
import { getCategories, getProviders } from "@/lib/data";
import { openGraphMetadata } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) return { title: "Categoria não encontrada · Bem Servido" };
  const title = `${category.label} em Ilhabela · Bem Servido`;
  const description = `Encontre profissionais de ${category.label.toLowerCase()} em Ilhabela avaliados pelo Bem Servido.`;
  return {
    title,
    description,
    alternates: { canonical: `/servicos/${category.slug}` },
    openGraph: openGraphMetadata({ title, description, url: `/servicos/${category.slug}` }),
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
