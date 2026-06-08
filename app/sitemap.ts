import type { MetadataRoute } from "next";
import { getCategories, getProviders } from "@/lib/data";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, providers] = await Promise.all([getCategories(), getProviders()]);
  const posts = await getAllPosts();

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/servicos`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/precos`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/sobre`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/anunciar`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.7 },
  ];
  const catUrls = categories.map((c) => ({ url: `${SITE_URL}/servicos/${c.slug}`, changeFrequency: "weekly" as const, priority: 0.8 }));
  const provUrls = providers.map((p) => ({ url: `${SITE_URL}/profissional/${p.slug}`, changeFrequency: "weekly" as const, priority: 0.7 }));
  const postUrls = posts.map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: p.date || undefined, changeFrequency: "monthly" as const, priority: 0.6 }));

  return [...staticUrls, ...catUrls, ...provUrls, ...postUrls];
}
