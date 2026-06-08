import "server-only";
import { createAdminSupabase } from "./supabase/admin";
import { PLANS } from "./plans";

// owner_id has FKs to both auth.users and public.profiles, so embed profiles
// via the explicit constraint name to avoid an ambiguous-relationship error.
const SELECT = "*, categories(slug,label), profiles!providers_owner_id_profiles_fkey(email,full_name), subscriptions(plan,status,current_period_end,last_payment_at)";

export async function adminListProviders() {
  const supabase = createAdminSupabase();
  const { data } = await supabase.from("providers").select(SELECT).order("created_at", { ascending: false });
  return data ?? [];
}

// Map of auth.users id -> last_sign_in_at, fetched via the service-role client.
// auth.users is not embeddable through PostgREST, so we read it through the admin API.
export async function adminAuthUserMap() {
  const supabase = createAdminSupabase();
  const map = new Map<string, string | null>();
  for (let page = 1; page <= 20; page++) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 1000 });
    if (error || !data?.users?.length) break;
    for (const u of data.users) map.set(u.id, u.last_sign_in_at ?? null);
    if (data.users.length < 1000) break;
  }
  return map;
}

const PROVIDER_DETAIL_SELECT =
  "id,slug,name,photo_url,status,tier,trial_ends_at,trial_days,created_at,owner_id, categories(slug,label), subscriptions(plan,status,current_period_end,last_payment_at)";

export async function adminListProvidersDetailed() {
  const supabase = createAdminSupabase();
  const [{ data }, authMap] = await Promise.all([
    supabase.from("providers").select(PROVIDER_DETAIL_SELECT).order("created_at", { ascending: false }),
    adminAuthUserMap(),
  ]);
  return (data ?? []).map((p: any) => ({
    ...p,
    last_sign_in_at: p.owner_id ? authMap.get(p.owner_id) ?? null : null,
  }));
}

export async function adminListAdvertisersDetailed() {
  const supabase = createAdminSupabase();
  const [{ data: advs }, { data: ads }, authMap] = await Promise.all([
    supabase
      .from("advertisers")
      .select("*, advertiser_subscriptions(tier,status,current_period_end,last_payment_at)")
      .order("created_at", { ascending: false }),
    supabase.from("ads").select("advertiser_id,active"),
    adminAuthUserMap(),
  ]);
  const activeAds = new Map<string, number>();
  for (const ad of ads ?? []) {
    if (ad.active) activeAds.set(ad.advertiser_id, (activeAds.get(ad.advertiser_id) ?? 0) + 1);
  }
  return (advs ?? []).map((a: any) => ({
    ...a,
    active_ads: activeAds.get(a.id) ?? 0,
    last_sign_in_at: a.owner_id ? authMap.get(a.owner_id) ?? null : null,
  }));
}

export async function adminListAds() {
  const supabase = createAdminSupabase();
  const { data } = await supabase
    .from("ads")
    .select("*, advertisers(company_name,logo_url)")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function adminStats() {
  const supabase = createAdminSupabase();
  const [{ count: total }, { count: pending }, { data: subs }] = await Promise.all([
    supabase.from("providers").select("id", { count: "exact", head: true }),
    supabase.from("providers").select("id", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("subscriptions").select("plan,status"),
  ]);
  const priceOf = (plan: string) => PLANS.find((p) => p.key === plan)?.price ?? 0;
  const active = (subs ?? []).filter((s: any) => s.status === "active");
  const failed = (subs ?? []).filter((s: any) => s.status === "past_due" || s.status === "unpaid");
  const mrr = active.reduce((sum: number, s: any) => sum + priceOf(s.plan), 0);
  return { total: total ?? 0, pending: pending ?? 0, activePaid: active.length, mrr, failed: failed.length };
}

export async function adminListSubscriptions() {
  const supabase = createAdminSupabase();
  const { data } = await supabase
    .from("subscriptions")
    .select("*, providers(name,slug)")
    .order("updated_at", { ascending: false });
  return data ?? [];
}

export async function adminListCategories() {
  const supabase = createAdminSupabase();
  const { data } = await supabase.from("categories").select("*").order("sort");
  return data ?? [];
}

export async function adminListPendingReviews() {
  const supabase = createAdminSupabase();
  const { data } = await supabase
    .from("reviews")
    .select("*, providers(name,slug)")
    .eq("status", "pending")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function adminListBlogPosts() {
  const supabase = createAdminSupabase();
  const { data } = await supabase
    .from("blog_posts")
    .select("id,slug,title,date,lang,published,author")
    .order("date", { ascending: false });
  return data ?? [];
}
