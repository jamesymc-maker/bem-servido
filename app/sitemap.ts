import type { MetadataRoute } from "next";
import { getCategories, getProviders } from "@/lib/data";
import { getAllPosts } from "@/lib/blog";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://bemservido.com.br";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, providers] = await Promise.all([getCategories(), getProviders()]);
  const posts = await getAllPosts();

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE}/servicos`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE}/precos`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/sobre`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/blog`, changeFrequency: "weekly", priority: 0.7 },
  ];
  const catUrls = categories.map((c) => ({ url: `${SITE}/servicos/${c.slug}`, changeFrequency: "weekly" as const, priority: 0.8 }));
  const provUrls = providers.map((p) => ({ url: `${SITE}/profissional/${p.slug}`, changeFrequency: "weekly" as const, priority: 0.7 }));
  const postUrls = posts.map((p) => ({ url: `${SITE}/blog/${p.slug}`, lastModified: p.date || undefined, changeFrequency: "monthly" as const, priority: 0.6 }));

  return [...staticUrls, ...catUrls, ...provUrls, ...postUrls];
}
