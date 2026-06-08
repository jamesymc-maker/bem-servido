import type { Metadata } from "next";
import { BlogList } from "@/components/blog-list";
import { getAllPosts } from "@/lib/blog";
import { ACTIVE_LOCATION_NAME } from "@/lib/locations";

export const metadata: Metadata = {
  title: `Blog · Bem Servido · Dicas e guias de ${ACTIVE_LOCATION_NAME}`,
  description: `Dicas e guias para aproveitar ${ACTIVE_LOCATION_NAME}: chefs privativos, transfers, passeios de barco e os melhores serviços locais.`,
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex() {
  const posts = await getAllPosts();
  return <BlogList posts={posts} />;
}
