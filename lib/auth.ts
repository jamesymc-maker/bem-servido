import { redirect } from "next/navigation";
import { createServerSupabase } from "./supabase/server";

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

// Use in the /admin layout. Redirects non-admins.
export async function requireAdminOrRedirect() {
  const profile = await getProfile();
  if (!profile) redirect("/entrar?next=/admin");
  if (!profile.is_admin) redirect("/");
  return profile;
}

// Use in the /painel layout. Redirects logged-out users.
export async function requireUserOrRedirect() {
  const user = await getCurrentUser();
  if (!user) redirect("/entrar?next=/painel");
  return user;
}
