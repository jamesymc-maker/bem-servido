import { NextResponse } from "next/server";
import { createAdminSupabase } from "@/lib/supabase/admin";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const supabase = createAdminSupabase();
      const { data } = await supabase.from("ads").select("impressions").eq("id", id).maybeSingle();
      if (data) {
        // The previous version never awaited this update, so the increment was
        // dropped before the response was sent.
        await supabase.from("ads").update({ impressions: (data.impressions || 0) + 1 }).eq("id", id);
      }
    } catch (e) {
      console.error("[ad-impression] failed to record impression:", e);
    }
  }
  return NextResponse.json({ ok: true });
}
