import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BlogPost } from "@/components/blog-post";
import { JsonLd } from "@/components/json-ld";
import { getAllPosts, getPost } from "@/lib/blog";
import { openGraphMetadata, SITE_URL } from "@/lib/site";

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Artigo não encontrado · Bem Servido" };
  return {
    title: `${post.title} · Bem Servido`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      ...openGraphMetadata({
        type: "article",
        title: post.title,
        description: post.description,
        url: `/blog/${post.slug}`,
        images: post.cover ? [{ url: post.cover, width: 1200, height: 630, alt: post.title }] : undefined,
      }),
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const related = (await getAllPosts()).filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.cover || undefined,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: "Bem Servido" },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    inLanguage: "pt-BR",
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <BlogPost post={post} related={related} />
    </>
  );
}
