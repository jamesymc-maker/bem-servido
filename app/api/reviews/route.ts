import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

const hasSupabase = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

// POST /api/reviews  { providerSlug, authorName, rating, comment }
// Inserts a review with status 'pending'. It appears only after an admin approves it.
export async function POST(req: Request) {
  if (!hasSupabase) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const body = await req.json().catch(() => ({}));
  const providerSlug = String(body.providerSlug ?? "").trim();
  const authorName = String(body.authorName ?? "").trim().slice(0, 80);
  const rating = Number(body.rating);
  const comment = String(body.comment ?? "").trim().slice(0, 1000);

  if (!providerSlug || !authorName || !comment || !(rating >= 1 && rating <= 5)) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  try {
    const supabase = await createServerSupabase();
    const { data: provider } = await supabase
      .from("providers")
      .select("id")
      .eq("slug", providerSlug)
      .eq("status", "published")
      .single();
    if (!provider) return NextResponse.json({ error: "provider_not_found" }, { status: 404 });

    const { error } = await supabase.from("reviews").insert({
      provider_id: provider.id,
      author_name: authorName,
      rating,
      comment,
      status: "pending",
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
