import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BlogPost } from "@/components/blog-post";
import { JsonLd } from "@/components/json-ld";
import { getAllPosts, getPost } from "@/lib/blog";
import { activeLocations, DEFAULT_LOCATION, getActiveLocationBySlug } from "@/lib/locations";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://daquii.com";

export async function generateStaticParams() {
  const params: { location: string; slug: string }[] = [];
  for (const loc of activeLocations()) {
    const posts = await getAllPosts(loc.slug);
    for (const p of posts) params.push({ location: loc.slug, slug: p.slug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string; slug: string }>;
}): Promise<Metadata> {
  const { location, slug } = await params;
  const loc = getActiveLocationBySlug(location) ?? getActiveLocationBySlug(DEFAULT_LOCATION)!;
  const post = await getPost(slug);
  if (!post) return { title: "Artigo não encontrado · Daquii" };
  return {
    title: `${post.title} · Daquii`,
    description: post.description,
    alternates: { canonical: `/${loc.slug}/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.description, images: post.cover ? [post.cover] : [], publishedTime: post.date },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ location: string; slug: string }>;
}) {
  const { location, slug } = await params;
  const loc = getActiveLocationBySlug(location);
  if (!loc) notFound();
  const post = await getPost(slug);
  if (!post) notFound();
  // A post targeting a specific location only shows there; null shows anywhere.
  if (post.location_slug && post.location_slug !== loc.slug) notFound();
  const related = (await getAllPosts(loc.slug)).filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.cover || undefined,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: "Daquii" },
    mainEntityOfPage: `${SITE}/${loc.slug}/blog/${post.slug}`,
    inLanguage: "pt-BR",
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <BlogPost post={post} related={related} />
    </>
  );
}
