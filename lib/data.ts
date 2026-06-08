import { createServerSupabase } from "./supabase/server";
import { SEED_CATEGORIES, SEED_PROVIDERS } from "./seed";
import type { Category, Provider, Review, ReviewSummary } from "./types";

// Falls back to seed data when Supabase env vars are absent, so the app
// runs immediately. With env set, all reads hit the database.
const hasSupabase = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export function mapProviderRow(row: any): Provider {
  return mapRow(row);
}

function mapRow(row: any): Provider {
  const cat = row.categories ?? {};
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category_slug: cat.slug ?? row.category_slug ?? "",
    category_label: cat.label ?? "",
    category_icon: cat.icon ?? "concierge",
    location_slug: row.locations?.slug ?? row.location_slug ?? null,
    tier: row.tier,
    verified: row.verified,
    photo_url: row.photo_url,
    languages: row.languages ?? [],
    service_area: row.service_area ?? "",
    short_desc: row.short_desc ?? "",
    long_desc: row.long_desc ?? "",
    half_day_rate: Number(row.half_day_rate ?? 0),
    full_day_rate: row.full_day_rate != null ? Number(row.full_day_rate) : null,
    hourly_rate: row.hourly_rate != null ? Number(row.hourly_rate) : null,
    phone: row.phone ?? "",
    whatsapp: row.whatsapp ?? row.phone ?? "",
    intro_video_url: row.intro_video_url ?? null,
    gallery: (row.provider_gallery ?? []).map((g: any) => g.url) ?? [],
  };
}

const SELECT =
  "*, categories(slug,label,icon), provider_gallery(url,sort), locations(slug)";

export async function getCategories(): Promise<Category[]> {
  if (!hasSupabase) return SEED_CATEGORIES;
  try {
    const supabase = await createServerSupabase();
    const { data } = await supabase.from("categories").select("*").eq("hidden", false).order("sort");
    return data?.length ? (data as Category[]) : SEED_CATEGORIES;
  } catch {
    return SEED_CATEGORIES;
  }
}

// Providers for a given location. With a slug, only providers linked to that
// location are returned (so /ilhabela and /ubatuba are separate experiences).
export async function getProviders(locationSlug?: string): Promise<Provider[]> {
  const seed = locationSlug
    ? SEED_PROVIDERS.filter((p) => p.location_slug === locationSlug)
    : SEED_PROVIDERS;
  if (!hasSupabase) return seed;
  try {
    const supabase = await createServerSupabase();
    let query = supabase.from("providers").select(SELECT).eq("status", "published");
    if (locationSlug) {
      const { data: loc } = await supabase
        .from("locations")
        .select("id")
        .eq("slug", locationSlug)
        .maybeSingle();
      if (!loc) return seed;
      query = query.eq("location_id", loc.id);
    }
    const { data } = await query;
    return data?.length ? data.map(mapRow) : seed;
  } catch {
    return seed;
  }
}

export async function getFeatured(locationSlug?: string, limit = 6): Promise<Provider[]> {
  const all = await getProviders(locationSlug);
  return all.filter((p) => p.tier !== "standard").slice(0, limit);
}

export async function getProvider(slug: string): Promise<Provider | null> {
  if (!hasSupabase) return SEED_PROVIDERS.find((p) => p.slug === slug) ?? null;
  try {
    const supabase = await createServerSupabase();
    const { data } = await supabase
      .from("providers")
      .select(SELECT)
      .eq("slug", slug)
      .eq("status", "published")
      .single();
    return data ? mapRow(data) : null;
  } catch {
    return SEED_PROVIDERS.find((p) => p.slug === slug) ?? null;
  }
}


export async function getReviews(providerId?: string): Promise<Review[]> {
  if (!hasSupabase || !providerId) return [];
  try {
    const supabase = await createServerSupabase();
    const { data } = await supabase
      .from("reviews")
      .select("id, provider_id, author_name, rating, comment, created_at")
      .eq("provider_id", providerId)
      .eq("status", "approved")
      .order("created_at", { ascending: false });
    return (data as Review[]) ?? [];
  } catch {
    return [];
  }
}

export function summarise(reviews: Review[]): ReviewSummary {
  if (!reviews.length) return { avg: 0, count: 0 };
  const sum = reviews.reduce((a, r) => a + r.rating, 0);
  return { avg: Math.round((sum / reviews.length) * 10) / 10, count: reviews.length };
}
