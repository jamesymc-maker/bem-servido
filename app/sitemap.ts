import type { MetadataRoute } from "next";
import { getCategories, getProviders } from "@/lib/data";
import { getAllPosts } from "@/lib/blog";
import { activeLocations } from "@/lib/locations";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://daquii.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getCategories();
  const locations = activeLocations();

  const entries: MetadataRoute.Sitemap = [];

  for (const loc of locations) {
    const base = `${SITE}/${loc.slug}`;
    const [providers, posts] = await Promise.all([
      getProviders(loc.slug),
      getAllPosts(loc.slug),
    ]);

    entries.push(
      { url: base, changeFrequency: "daily", priority: 1 },
      { url: `${base}/servicos`, changeFrequency: "daily", priority: 0.9 },
      { url: `${base}/precos`, changeFrequency: "monthly", priority: 0.6 },
      { url: `${base}/sobre`, changeFrequency: "monthly", priority: 0.6 },
      { url: `${base}/anunciar`, changeFrequency: "monthly", priority: 0.6 },
      { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.7 },
    );
    for (const c of categories) {
      entries.push({ url: `${base}/servicos/${c.slug}`, changeFrequency: "weekly", priority: 0.8 });
    }
    for (const p of providers) {
      entries.push({ url: `${base}/profissional/${p.slug}`, changeFrequency: "weekly", priority: 0.7 });
    }
    for (const p of posts) {
      entries.push({ url: `${base}/blog/${p.slug}`, lastModified: p.date || undefined, changeFrequency: "monthly", priority: 0.6 });
    }
  }

  return entries;
}
