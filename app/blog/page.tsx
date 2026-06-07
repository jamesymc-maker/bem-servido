import type { Metadata } from "next";
import { BlogList } from "@/components/blog-list";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog · Bem Servido · Dicas e guias de Ilhabela",
  description: "Dicas e guias para aproveitar Ilhabela: chefs privativos, transfers, passeios de barco e os melhores serviços locais.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex() {
  const posts = await getAllPosts();
  return <BlogList posts={posts} />;
}
