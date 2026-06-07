import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createAdminSupabase } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();
  if (!secret || !sig) return NextResponse.json({ received: true, note: "webhook secret not set" });

  let event;
  try { event = stripe.webhooks.constructEvent(body, sig, secret); }
  catch (err: any) { return NextResponse.json({ error: `signature: ${err.message}` }, { status: 400 }); }

  const supabase = createAdminSupabase();
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const s: any = event.data.object;
        await supabase.from("subscriptions").upsert({
          provider_id: s.metadata?.providerId || null,
          plan: s.metadata?.plan || null,
          stripe_customer_id: s.customer,
          stripe_subscription_id: s.subscription,
          status: "active",
        }, { onConflict: "stripe_subscription_id" });
        break;
      }
      case "invoice.paid": {
        const inv: any = event.data.object;
        if (inv.subscription) {
          await supabase.from("subscriptions")
            .update({ status: "active", last_payment_at: new Date().toISOString() })
            .eq("stripe_subscription_id", inv.subscription);
        }
        break;
      }
      case "invoice.payment_failed": {
        const inv: any = event.data.object;
        if (inv.subscription) {
          await supabase.from("subscriptions").update({ status: "past_due" }).eq("stripe_subscription_id", inv.subscription);
        }
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub: any = event.data.object;
        await supabase.from("subscriptions").update({
          status: sub.status,
          plan: sub.metadata?.plan ?? undefined,
          current_period_end: sub.current_period_end ? new Date(sub.current_period_end * 1000).toISOString() : null,
        }).eq("stripe_subscription_id", sub.id);
        break;
      }
      default: break;
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
  return NextResponse.json({ received: true });
}
