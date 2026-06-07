import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createServerSupabase } from "@/lib/supabase/server";

// Handles the link Supabase sends after email confirmation / magic links.
// Exchanges the code (PKCE) or token_hash (OTP) for a session, then sends the
// user to `next` (e.g. /anunciante/painel) instead of dropping them on the home
// page unauthenticated.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") as EmailOtpType | null;
  const nextParam = url.searchParams.get("next");
  const next = nextParam && nextParam.startsWith("/") ? nextParam : "/painel";

  const supabase = await createServerSupabase();
  let ok = false;

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    ok = !error;
  } else if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
    ok = !error;
  }

  if (!ok) {
    return NextResponse.redirect(new URL("/entrar?erro=confirmacao", url.origin));
  }
  return NextResponse.redirect(new URL(next, url.origin));
}
