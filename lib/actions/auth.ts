"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { resolvePortalRedirect as resolve } from "@/lib/auth";
import { createServerSupabase } from "@/lib/supabase/server";

export async function resolvePortalRedirect(next?: string | null) {
  return resolve(next);
}

type LoginInput = {
  email: string;
  password: string;
  next?: string;
  accountType?: "provider" | "advertiser";
};

export async function loginWithPassword(input: LoginInput): Promise<{ error?: string }> {
  const email = input.email.trim();
  const password = input.password;
  if (!email || !password) return { error: "Preencha e-mail e senha." };

  const supabase = await createServerSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "E-mail ou senha incorretos." };
  if (!data.session) return { error: "Confirme seu e-mail antes de entrar." };

  const defaultDest = input.accountType === "advertiser" ? "/anunciante/painel" : "/painel";
  let dest = input.next?.trim() || defaultDest;
  if (dest === "/entrar" || dest === "/anunciante/entrar") dest = defaultDest;
  if (!input.next || input.next === defaultDest) {
    const t = data.user?.user_metadata?.account_type;
    if (t === "advertiser") dest = "/anunciante/painel";
    else if (t === "provider") dest = "/painel";
  }

  revalidatePath("/", "layout");
  redirect(dest);
}
