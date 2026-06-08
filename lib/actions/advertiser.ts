"use server";
import { revalidatePath } from "next/cache";
import { createServerSupabase } from "@/lib/supabase/server";
import { createAdminSupabase } from "@/lib/supabase/admin";

async function ctxAdvertiser() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("unauthorized");
  return { supabase, user };
}

const ADVERTISER_SELECT = "*, advertiser_subscriptions(tier,status,current_period_end,last_payment_at)";

export async function getAdvertiser() {
  const { supabase, user } = await ctxAdvertiser();
  const { data } = await supabase.from("advertisers").select(ADVERTISER_SELECT).eq("owner_id", user.id).maybeSingle();
  return data;
}

export async function getOrCreateAdvertiser() {
  const { supabase, user } = await ctxAdvertiser();
  const { data: existing } = await supabase
    .from("advertisers")
    .select(ADVERTISER_SELECT)
    .eq("owner_id", user.id)
    .maybeSingle();
  if (existing) return existing;

  if (user.user_metadata?.account_type === "provider") return null;

  const { data: profile } = await supabase.from("profiles").select("full_name,email").eq("id", user.id).maybeSingle();
  const { data: created } = await supabase.from("advertisers")
    .insert({ owner_id: user.id, company_name: profile?.full_name || "Minha empresa", email: profile?.email || "" })
    .select("*, advertiser_subscriptions(tier,status,current_period_end,last_payment_at)")
    .maybeSingle();
  return created;
}

export async function updateAdvertiserProfile(formData: FormData) {
  const { supabase, user } = await ctxAdvertiser();
  await supabase.from("advertisers").update({
    company_name: String(formData.get("company_name") || "").trim(),
    contact_name: String(formData.get("contact_name") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    website: String(formData.get("website") || "").trim(),
  }).eq("owner_id", user.id);
  revalidatePath("/anunciante/painel");
}

export async function saveLogoUrl(url: string) {
  const { supabase, user } = await ctxAdvertiser();
  await supabase.from("advertisers").update({ logo_url: url }).eq("owner_id", user.id);
  revalidatePath("/anunciante/painel");
}

export async function upsertAd(formData: FormData) {
  const { supabase, user } = await ctxAdvertiser();
  // Ensure the advertiser row exists (a missing row previously threw and
  // surfaced as "A server error occurred").
  let { data: adv } = await supabase.from("advertisers").select("id").eq("owner_id", user.id).maybeSingle();
  if (!adv) {
    const { data: profile } = await supabase.from("profiles").select("full_name,email").eq("id", user.id).maybeSingle();
    const { data: created, error: createErr } = await supabase
      .from("advertisers")
      .insert({ owner_id: user.id, company_name: profile?.full_name || "Minha empresa", email: profile?.email || "" })
      .select("id")
      .maybeSingle();
    if (createErr || !created) throw new Error(`Não foi possível criar o anunciante: ${createErr?.message ?? "desconhecido"}`);
    adv = created;
  }
  const id = String(formData.get("id") || "").trim();
  const payload = {
    advertiser_id: adv.id,
    title: String(formData.get("title") || "").trim(),
    link_url: String(formData.get("link_url") || "").trim(),
    category_slugs: String(formData.get("category_slugs") || "").split(",").map(s => s.trim()).filter(Boolean),
    image_url: String(formData.get("image_url") || "").trim() || null,
    active: false, // admin activates
  };
  const { error } = id
    ? await supabase.from("ads").update(payload).eq("id", id).eq("advertiser_id", adv.id)
    : await supabase.from("ads").insert(payload);
  if (error) throw new Error(`Não foi possível salvar o anúncio: ${error.message}`);
  revalidatePath("/anunciante/painel/anuncios");
}

export async function deleteAd(formData: FormData) {
  const { supabase, user } = await ctxAdvertiser();
  const { data: adv } = await supabase.from("advertisers").select("id").eq("owner_id", user.id).maybeSingle();
  if (!adv) return;
  await supabase.from("ads").delete().eq("id", String(formData.get("id"))).eq("advertiser_id", adv.id);
  revalidatePath("/anunciante/painel/anuncios");
}

// Admin: manually activate/deactivate an ad for content moderation, regardless
// of payment status. Deactivating sets admin_blocked so the Stripe webhook will
// not silently bring the ad back live on the next payment event.
export async function adminToggleAd(formData: FormData) {
  const db = createAdminSupabase();
  const id = String(formData.get("id"));
  const active = String(formData.get("active")) === "true";
  await db.from("ads").update({ active, admin_blocked: !active }).eq("id", id);
  revalidatePath("/admin/anuncios");
  revalidatePath("/admin/anunciantes");
  revalidatePath("/anunciante/painel/anuncios");
}

// Admin: suspend/reactivate an advertiser
export async function adminToggleAdvertiser(formData: FormData) {
  const db = createAdminSupabase();
  const id = String(formData.get("id"));
  const active = String(formData.get("active")) === "true";
  await db.from("advertisers").update({ active }).eq("id", id);
  revalidatePath("/admin/anunciantes");
}

// Admin: update advertiser tier after payment (also called by webhook)
export async function syncAdvertiserTier(advertiserId: string, tier: string | null) {
  const db = createAdminSupabase();
  await db.from("advertisers").update({ tier }).eq("id", advertiserId);
}
