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

export async function getOrCreateAdvertiser() {
  const { supabase, user } = await ctxAdvertiser();
  const { data: existing } = await supabase
    .from("advertisers")
    .select("*, advertiser_subscriptions(tier,status,current_period_end,last_payment_at)")
    .eq("owner_id", user.id)
    .maybeSingle();
  if (existing) return existing;
  const { data: profile } = await supabase.from("profiles").select("full_name,email").eq("id", user.id).single();
  const { data: created } = await supabase.from("advertisers")
    .insert({ owner_id: user.id, company_name: profile?.full_name || "Minha empresa", email: profile?.email || "" })
    .select("*, advertiser_subscriptions(tier,status,current_period_end,last_payment_at)")
    .single();
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
  const { data: adv } = await supabase.from("advertisers").select("id").eq("owner_id", user.id).single();
  if (!adv) throw new Error("no advertiser");
  const id = String(formData.get("id") || "").trim();
  const payload = {
    advertiser_id: adv.id,
    title: String(formData.get("title") || "").trim(),
    link_url: String(formData.get("link_url") || "").trim(),
    category_slugs: String(formData.get("category_slugs") || "").split(",").map(s => s.trim()).filter(Boolean),
    image_url: String(formData.get("image_url") || "").trim() || null,
    active: false, // admin activates
  };
  if (id) {
    await supabase.from("ads").update(payload).eq("id", id).eq("advertiser_id", adv.id);
  } else {
    await supabase.from("ads").insert(payload);
  }
  revalidatePath("/anunciante/painel/anuncios");
}

export async function deleteAd(formData: FormData) {
  const { supabase, user } = await ctxAdvertiser();
  const { data: adv } = await supabase.from("advertisers").select("id").eq("owner_id", user.id).single();
  if (!adv) return;
  await supabase.from("ads").delete().eq("id", String(formData.get("id"))).eq("advertiser_id", adv.id);
  revalidatePath("/anunciante/painel/anuncios");
}

// Admin: activate/deactivate an ad
export async function adminToggleAd(formData: FormData) {
  const db = createAdminSupabase();
  const id = String(formData.get("id"));
  const active = String(formData.get("active")) === "true";
  await db.from("ads").update({ active }).eq("id", id);
  revalidatePath("/admin/anunciantes");
}

// Admin: update advertiser tier after payment (also called by webhook)
export async function syncAdvertiserTier(advertiserId: string, tier: string | null) {
  const db = createAdminSupabase();
  await db.from("advertisers").update({ tier }).eq("id", advertiserId);
}
