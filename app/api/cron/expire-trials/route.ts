import { NextResponse } from "next/server";
import { createAdminSupabase } from "@/lib/supabase/admin";

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return NextResponse.json({ skipped: true });
  const supabase = createAdminSupabase();
  const { data: expired } = await supabase.from("providers").select("id")
    .eq("status", "published").lt("trial_ends_at", new Date().toISOString()).not("trial_ends_at", "is", null);
  let suspended = 0;
  for (const p of expired ?? []) {
    const { data: sub } = await supabase.from("subscriptions").select("status")
      .eq("provider_id", p.id).eq("status", "active").maybeSingle();
    if (!sub) { await supabase.from("providers").update({ status: "suspended" }).eq("id", p.id); suspended++; }
  }
  return NextResponse.json({ expired: expired?.length ?? 0, suspended });
}
