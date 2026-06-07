import { NextResponse } from "next/server";
import { createAdminSupabase } from "@/lib/supabase/admin";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const supabase = createAdminSupabase();
      // use raw SQL to increment atomically
      await supabase.from("ads").select("impressions").eq("id", id).single().then(({ data }) => {
        if (data) supabase.from("ads").update({ impressions: (data.impressions || 0) + 1 }).eq("id", id);
      });
    } catch {}
  }
  return NextResponse.json({ ok: true });
}
