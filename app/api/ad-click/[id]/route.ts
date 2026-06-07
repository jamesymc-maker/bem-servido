import { NextResponse } from "next/server";
import { createAdminSupabase } from "@/lib/supabase/admin";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const dest = new URL(req.url).searchParams.get("dest") || "/";
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const supabase = createAdminSupabase();
      const { error } = await supabase.rpc("increment_ad_clicks", { ad_id: id });
      if (error) {
        const { data } = await supabase.from("ads").select("clicks").eq("id", id).single();
        await supabase.from("ads").update({ clicks: (data?.clicks || 0) + 1 }).eq("id", id);
      }
    } catch {}
  }
  return NextResponse.redirect(dest.startsWith("http") ? dest : `https://${dest}`);
}
