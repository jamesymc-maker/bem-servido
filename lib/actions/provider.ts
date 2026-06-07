"use server";
import { revalidatePath } from "next/cache";
import { createServerSupabase } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";

async function ctx() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("unauthorized");
  return { supabase, user };
}

// Returns the current user's provider row, creating a draft if none exists.
export async function getOrCreateProvider() {
  const { supabase, user } = await ctx();
  const { data: existing } = await supabase
    .from("providers")
    .select("*, categories(slug,label,icon), provider_gallery(id,url,sort), subscriptions(plan,status,current_period_end,last_payment_at)")
    .eq("owner_id", user.id)
    .maybeSingle();
  if (existing) return existing;

  const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", user.id).single();
  const name = (profile?.full_name || "").trim() || "Novo profissional";
  const slug = `${slugify(name)}-${Math.random().toString(36).slice(2, 6)}`;
  const { data: loc } = await supabase.from("locations").select("id").eq("slug", "ilhabela").maybeSingle();

  const { data: created } = await supabase
    .from("providers")
    .insert({ owner_id: user.id, name, slug, status: "pending", tier: "standard", half_day_rate: 0, location_id: loc?.id ?? null })
    .select("*, categories(slug,label,icon), provider_gallery(id,url,sort), subscriptions(plan,status,current_period_end,last_payment_at)")
    .single();
  return created;
}

export async function updateProviderProfile(formData: FormData) {
  const { supabase, user } = await ctx();
  const categorySlug = String(formData.get("category_slug") || "");
  let category_id: string | null = null;
  if (categorySlug) {
    const { data: cat } = await supabase.from("categories").select("id").eq("slug", categorySlug).maybeSingle();
    category_id = cat?.id ?? null;
  }
  const langs = String(formData.get("languages") || "").split(",").map((s) => s.trim()).filter(Boolean);
  const num = (k: string) => { const v = formData.get(k); const n = Number(v); return v === "" || v == null || isNaN(n) ? null : n; };

  const update: any = {
    name: String(formData.get("name") || "").trim(),
    service_area: String(formData.get("service_area") || "").trim(),
    short_desc: String(formData.get("short_desc") || "").slice(0, 150),
    long_desc: String(formData.get("long_desc") || "").slice(0, 1500),
    whatsapp: String(formData.get("whatsapp") || "").trim(),
    phone: String(formData.get("phone") || formData.get("whatsapp") || "").trim(),
    languages: langs,
    half_day_rate: num("half_day_rate") ?? 0,
    full_day_rate: num("full_day_rate"),
    hourly_rate: num("hourly_rate"),
  };
  if (category_id) update.category_id = category_id;

  await supabase.from("providers").update(update).eq("owner_id", user.id);
  revalidatePath("/painel/perfil");
  revalidatePath("/painel");
}

export async function saveIntroVideo(formData: FormData) {
  const { supabase, user } = await ctx();
  const url = String(formData.get("intro_video_url") || "").trim();
  await supabase.from("providers").update({ intro_video_url: url || null }).eq("owner_id", user.id);
  revalidatePath("/painel/video");
  revalidatePath("/painel");
}

// Called by the client after uploading to Supabase Storage.
export async function saveProfilePhoto(url: string) {
  const { supabase, user } = await ctx();
  await supabase.from("providers").update({ photo_url: url }).eq("owner_id", user.id);
  revalidatePath("/painel/fotos");
  revalidatePath("/painel");
}

export async function addGalleryImage(providerId: string, url: string) {
  const { supabase } = await ctx();
  await supabase.from("provider_gallery").insert({ provider_id: providerId, url });
  revalidatePath("/painel/fotos");
}

export async function removeGalleryImage(id: string) {
  const { supabase } = await ctx();
  await supabase.from("provider_gallery").delete().eq("id", id);
  revalidatePath("/painel/fotos");
}
