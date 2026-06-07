import "server-only";
import { redirect } from "next/navigation";
import { createServerSupabase } from "./supabase/server";

export type AccountType = "provider" | "advertiser";

export async function getCurrentUser() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getProfile() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  return data ?? null;
}

export function accountTypeFromUser(user: { user_metadata?: Record<string, unknown> }): AccountType | null {
  const t = user.user_metadata?.account_type;
  return t === "provider" || t === "advertiser" ? t : null;
}

/** After login, pick the right dashboard when `next` is generic. */
export async function resolvePortalRedirect(next?: string | null): Promise<string> {
  if (next && next !== "/painel" && next !== "/entrar") return next;

  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return "/entrar";

  const accountType = accountTypeFromUser(user);
  const [{ data: provider }, { data: advertiser }] = await Promise.all([
    supabase.from("providers").select("id").eq("owner_id", user.id).maybeSingle(),
    supabase.from("advertisers").select("id").eq("owner_id", user.id).maybeSingle(),
  ]);

  if (advertiser && !provider) return "/anunciante/painel";
  if (provider && !advertiser) return "/painel";
  if (accountType === "advertiser") return "/anunciante/painel";
  return "/painel";
}

// Use in the /admin layout. Redirects non-admins.
export async function requireAdminOrRedirect() {
  const profile = await getProfile();
  if (!profile) redirect("/entrar?next=/admin");
  if (!profile.is_admin) redirect("/");
  return profile;
}

// Use in the /painel layout. Redirects logged-out users.
export async function requireUserOrRedirect(next = "/painel") {
  const user = await getCurrentUser();
  if (!user) redirect(`/entrar?next=${encodeURIComponent(next)}`);
  return user;
}

export async function requireAdvertiserUserOrRedirect() {
  const user = await getCurrentUser();
  if (!user) redirect("/anunciante/entrar");
  return user;
}
