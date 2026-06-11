import type { Metadata } from "next";
import { BlogList } from "@/components/blog-list";
import { getAllPosts } from "@/lib/blog";
import { DEFAULT_LOCATION, getActiveLocationBySlug } from "@/lib/locations";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}): Promise<Metadata> {
  const { location } = await params;
  const loc = getActiveLocationBySlug(location) ?? getActiveLocationBySlug(DEFAULT_LOCATION)!;
  return {
    title: `Blog · Daquii · Dicas e guias de ${loc.name}`,
    description: `Dicas e guias para aproveitar ${loc.name}: chefs privativos, transfers, passeios de barco e os melhores serviços locais.`,
    alternates: { canonical: `/${loc.slug}/blog` },
  };
}

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location } = await params;
  const posts = await getAllPosts(location);
  return <BlogList posts={posts} />;
}
