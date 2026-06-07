import { AdSlot } from "@/components/ad-slot";
import { Results } from "@/components/results";
import { getCategories, getProviders } from "@/lib/data";

export default async function ServicosPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const [categories, providers] = await Promise.all([getCategories(), getProviders()]);
  return (<><Results providers={providers} categories={categories} initialQuery={q ?? ""} /><AdSlot labelKey="category" /></>);
}
