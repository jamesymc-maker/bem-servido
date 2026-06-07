import { createAdminSupabase } from "./supabase/admin";
import type { AdTier } from "./ad-plans";
import { AD_TIER_RANK } from "./ad-plans";

export interface Ad {
  id: string;
  title: string;
  image_url: string | null;
  link_url: string;
  advertiser_tier: AdTier;
  company_name: string;
  logo_url: string | null;
}

// Fetch one ad for a given placement, optionally filtered by category.
// Returns null if no active ad is available.
export async function fetchAd(placement: string, categorySlug?: string): Promise<Ad | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;
  try {
    const supabase = createAdminSupabase();
    const { data: rows } = await supabase
      .from("ads")
      .select("id, title, image_url, link_url, placements, category_slugs, advertiser_id, advertisers!inner(company_name, logo_url, tier)")
      .eq("active", true)
      .contains("placements", [placement]);

    if (!rows?.length) return null;

    // filter by category if specified
    const filtered = (categorySlug
      ? rows.filter((r: any) => !r.category_slugs?.length || r.category_slugs.includes(categorySlug))
      : rows
    ).filter((r: any) => r.advertisers?.tier);

    if (!filtered.length) return null;

    // sort by tier priority, then pick randomly within same tier
    filtered.sort((a: any, b: any) =>
      (AD_TIER_RANK[a.advertisers.tier as AdTier] ?? 99) -
      (AD_TIER_RANK[b.advertisers.tier as AdTier] ?? 99)
    );
    // pick best tier, then random within that tier
    const bestTier = (filtered[0] as any).advertisers.tier;
    const topTier = filtered.filter((r: any) => r.advertisers.tier === bestTier);
    const picked = topTier[Math.floor(Math.random() * topTier.length)] as any;

    return {
      id: picked.id,
      title: picked.title,
      image_url: picked.image_url,
      link_url: picked.link_url,
      advertiser_tier: picked.advertisers.tier,
      company_name: picked.advertisers.company_name,
      logo_url: picked.advertisers.logo_url,
    };
  } catch { return null; }
}

// Fetch all Parceiro advertisers for footer logos
export async function fetchPartners(): Promise<{ id: string; company_name: string; logo_url: string | null; website: string | null }[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
  try {
    const supabase = createAdminSupabase();
    const { data } = await supabase
      .from("advertisers")
      .select("id, company_name, logo_url, website")
      .eq("tier", "parceiro")
      .eq("active", true);
    return data ?? [];
  } catch { return []; }
}
