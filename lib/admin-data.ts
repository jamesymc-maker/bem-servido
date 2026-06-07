import "server-only";
import { createAdminSupabase } from "./supabase/admin";
import { PLANS } from "./plans";

const SELECT = "*, categories(slug,label), profiles:owner_id(email,full_name), subscriptions(plan,status,current_period_end,last_payment_at)";

export async function adminListProviders() {
  const supabase = createAdminSupabase();
  const { data } = await supabase.from("providers").select(SELECT).order("created_at", { ascending: false });
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
