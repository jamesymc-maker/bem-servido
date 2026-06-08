"use server";
import { revalidatePath } from "next/cache";
import { createServerSupabase } from "@/lib/supabase/server";
import { createAdminSupabase } from "@/lib/supabase/admin";
import { slugify } from "@/lib/utils";

async function requireAdmin() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("unauthorized");
  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single();
  if (!profile?.is_admin) throw new Error("forbidden");
  return createAdminSupabase();
}

export async function setListingStatus(formData: FormData) {
  const db = await requireAdmin();
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  await db.from("providers").update({ status }).eq("id", id);
  revalidatePath("/admin/providers");
  revalidatePath("/admin");
}

export async function setListingTier(formData: FormData) {
  const db = await requireAdmin();
  const id = String(formData.get("id"));
  const tier = String(formData.get("tier"));
  await db.from("providers").update({ tier }).eq("id", id);
  revalidatePath("/admin/providers");
}

export async function deleteListing(formData: FormData) {
  const db = await requireAdmin();
  const id = String(formData.get("id"));
  await db.from("providers").delete().eq("id", id);
  revalidatePath("/admin/providers");
  revalidatePath("/admin");
}

export async function moderateReview(formData: FormData) {
  const db = await requireAdmin();
  const id = String(formData.get("id"));
  const status = String(formData.get("status")); // approved | rejected
  await db.from("reviews").update({ status }).eq("id", id);
  revalidatePath("/admin");
  revalidatePath("/admin/avaliacoes");
}

export async function upsertCategory(formData: FormData) {
  const db = await requireAdmin();
  const id = String(formData.get("id") || "");
  const label = String(formData.get("label") || "").trim();
  const icon = String(formData.get("icon") || "concierge").trim();
  const sort = Number(formData.get("sort") || 0);
  if (!label) return;
  if (id) {
    await db.from("categories").update({ label, icon, sort }).eq("id", id);
  } else {
    const slug = slugify(label);
    await db.from("categories").insert({ slug, label, icon, sort });
  }
  revalidatePath("/admin/categories");
}

export async function toggleCategoryHidden(formData: FormData) {
  const db = await requireAdmin();
  const id = String(formData.get("id"));
  const hidden = String(formData.get("hidden")) === "true";
  await db.from("categories").update({ hidden }).eq("id", id);
  revalidatePath("/admin/categories");
}

export async function moveCategory(formData: FormData) {
  const db = await requireAdmin();
  const id = String(formData.get("id"));
  const dir = Number(formData.get("dir")); // -1 up, +1 down
  const { data: rows } = await db.from("categories").select("id,sort").order("sort");
  if (!rows) return;
  const idx = rows.findIndex((r: any) => r.id === id);
  const swap = idx + dir;
  if (idx < 0 || swap < 0 || swap >= rows.length) return;
  const a = rows[idx], b = rows[swap];
  await db.from("categories").update({ sort: b.sort }).eq("id", a.id);
  await db.from("categories").update({ sort: a.sort }).eq("id", b.id);
  revalidatePath("/admin/categories");
}

// ---------- Blog post CRUD ----------

export async function upsertBlogPost(formData: FormData) {
  const db = await requireAdmin();
  const id = String(formData.get("id") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const date = String(formData.get("date") || new Date().toISOString().slice(0, 10));
  const author = String(formData.get("author") || "Equipe Bem Servido").trim();
  const cover_url = String(formData.get("cover_url") || "").trim() || null;
  const category_slug = String(formData.get("category_slug") || "").trim() || null;
  const tags = String(formData.get("tags") || "").split(",").map((s) => s.trim()).filter(Boolean);
  const lang = String(formData.get("lang") || "pt");
  const published = formData.get("published") === "on";

  const payload = { title, slug, description, content, date, author, cover_url, category_slug, tags, lang, published };
  if (id) {
    await db.from("blog_posts").update(payload).eq("id", id);
  } else {
    await db.from("blog_posts").insert(payload);
  }
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function toggleBlogPublished(formData: FormData) {
  const db = await requireAdmin();
  const id = String(formData.get("id"));
  const published = String(formData.get("published")) === "true";
  await db.from("blog_posts").update({ published }).eq("id", id);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function deleteBlogPost(formData: FormData) {
  const db = await requireAdmin();
  const id = String(formData.get("id"));
  if (confirm) {} // client confirms; action just deletes
  await db.from("blog_posts").delete().eq("id", id);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

// ---------- Listing approval with trial period ----------
export async function approveWithTrial(formData: FormData) {
  const db = await requireAdmin();
  const id = String(formData.get("id"));
  const days = Number(formData.get("trial_days") || 60);
  const trial_ends_at = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
  await db.from("providers").update({ status: "published", trial_ends_at, trial_days: days }).eq("id", id);
  revalidatePath("/admin/providers");
  revalidatePath("/admin");
}
