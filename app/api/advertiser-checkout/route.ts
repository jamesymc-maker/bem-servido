import { NextResponse } from "next/server";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { adPriceId } from "@/lib/ad-plans";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { tier, advertiserId } = await req.json().catch(() => ({}));
  if (!isStripeConfigured()) return NextResponse.json({ error: "not_configured", message: "Stripe não configurado." }, { status: 503 });
  const price = adPriceId(tier);
  if (!price) return NextResponse.json({ error: "unknown_tier", message: "Plano não encontrado. Verifique os price IDs no ambiente." }, { status: 400 });
  const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
  try {
    const session = await getStripe().checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price, quantity: 1 }],
      success_url: `${origin}/anunciante/painel?status=sucesso`,
      cancel_url: `${origin}/anunciante/painel/plano?status=cancelado`,
      metadata: { tier, advertiserId: advertiserId ?? "" },
      subscription_data: { metadata: { tier, advertiserId: advertiserId ?? "" } },
    });
    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
