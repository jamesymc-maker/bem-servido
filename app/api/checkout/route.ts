import { NextResponse } from "next/server";
import { stripe, stripeConfigured } from "@/lib/stripe";
import { priceIdForPlan } from "@/lib/plans";

// POST /api/checkout  { plan, providerId }
export async function POST(req: Request) {
  const { plan, providerId } = await req.json().catch(() => ({}));

  if (!stripeConfigured) {
    return NextResponse.json(
      { error: "stripe_not_configured", message: "Defina STRIPE_SECRET_KEY e os price IDs no ambiente." },
      { status: 503 },
    );
  }
  const price = priceIdForPlan(plan);
  if (!price) return NextResponse.json({ error: "unknown_plan" }, { status: 400 });

  const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price, quantity: 1 }],
      success_url: `${origin}/painel/pagamentos?status=sucesso`,
      cancel_url: `${origin}/painel/plano?status=cancelado`,
      metadata: { plan, providerId: providerId ?? "" },
      subscription_data: { metadata: { plan, providerId: providerId ?? "" } },
    });
    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: "stripe_error", message: err.message }, { status: 500 });
  }
}
