import type { Metadata } from "next";
import { BlogList } from "@/components/blog-list";
import { getAllPosts } from "@/lib/blog";
import { openGraphMetadata } from "@/lib/site";

const title = "Blog · Bem Servido · Dicas e guias de Ilhabela";
const description =
  "Dicas e guias para aproveitar Ilhabela: chefs privativos, transfers, passeios de barco e os melhores serviços locais.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: openGraphMetadata({ title, description, url: "/blog" }),
};

export default async function BlogIndex() {
  const posts = await getAllPosts();
  return <BlogList posts={posts} />;
}
