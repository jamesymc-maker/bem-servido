import { AdSlot } from "@/components/ad-slot";
import { notFound } from "next/navigation";
import { Results } from "@/components/results";
import { getCategories, getProviders } from "@/lib/data";

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
