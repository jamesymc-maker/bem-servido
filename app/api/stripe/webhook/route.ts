import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createAdminSupabase } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Db = ReturnType<typeof createAdminSupabase>;

// Advertiser subscriptions live in their own table (+ advertisers.tier column).
// Professional subscriptions live in `subscriptions`. We route by metadata and
// update by stripe_subscription_id so either flow stays in sync.
const ADVERTISER_TIERS = new Set(["visibilidade", "destaque", "parceiro"]);
const ACTIVE_STATUSES = new Set(["active", "trialing", "past_due"]);

async function syncAdvertiserTierForSub(db: Db, subscriptionId: string, tier: string | null, active: boolean) {
  const { data: row } = await db
    .from("advertiser_subscriptions")
    .select("advertiser_id, tier")
    .eq("stripe_subscription_id", subscriptionId)
    .maybeSingle();
  if (!row?.advertiser_id) return;
  await db.from("advertisers").update({ tier: active ? (tier ?? row.tier) : null }).eq("id", row.advertiser_id);
}

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();
  if (!secret || !sig) return NextResponse.json({ received: true, note: "webhook secret not set" });

  let event;
  try { event = getStripe().webhooks.constructEvent(body, sig, secret); }
  catch (err: any) { return NextResponse.json({ error: `signature: ${err.message}` }, { status: 400 }); }

  const supabase = createAdminSupabase();
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const s: any = event.data.object;
        const advertiserId = s.metadata?.advertiserId;
        const tier = s.metadata?.tier;
        if (advertiserId) {
          await supabase.from("advertiser_subscriptions").upsert({
            advertiser_id: advertiserId,
            tier: tier || null,
            stripe_customer_id: s.customer,
            stripe_subscription_id: s.subscription,
            status: "active",
            last_payment_at: new Date().toISOString(),
          }, { onConflict: "stripe_subscription_id" });
          if (ADVERTISER_TIERS.has(tier)) {
            await supabase.from("advertisers").update({ tier }).eq("id", advertiserId);
          }
        } else {
          await supabase.from("subscriptions").upsert({
            provider_id: s.metadata?.providerId || null,
            plan: s.metadata?.plan || null,
            stripe_customer_id: s.customer,
            stripe_subscription_id: s.subscription,
            status: "active",
          }, { onConflict: "stripe_subscription_id" });
        }
        break;
      }
      case "invoice.paid": {
        const inv: any = event.data.object;
        if (inv.subscription) {
          const now = new Date().toISOString();
          await supabase.from("subscriptions")
            .update({ status: "active", last_payment_at: now })
            .eq("stripe_subscription_id", inv.subscription);
          await supabase.from("advertiser_subscriptions")
            .update({ status: "active", last_payment_at: now })
            .eq("stripe_subscription_id", inv.subscription);
        }
        break;
      }
      case "invoice.payment_failed": {
        const inv: any = event.data.object;
        if (inv.subscription) {
          await supabase.from("subscriptions").update({ status: "past_due" }).eq("stripe_subscription_id", inv.subscription);
          await supabase.from("advertiser_subscriptions").update({ status: "past_due" }).eq("stripe_subscription_id", inv.subscription);
        }
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub: any = event.data.object;
        const active = event.type !== "customer.subscription.deleted" && ACTIVE_STATUSES.has(sub.status);
        const periodEnd = sub.current_period_end ? new Date(sub.current_period_end * 1000).toISOString() : null;
        await supabase.from("subscriptions").update({
          status: sub.status,
          plan: sub.metadata?.plan ?? undefined,
          current_period_end: periodEnd,
        }).eq("stripe_subscription_id", sub.id);
        await supabase.from("advertiser_subscriptions").update({
          status: event.type === "customer.subscription.deleted" ? "canceled" : sub.status,
          tier: sub.metadata?.tier ?? undefined,
          current_period_end: periodEnd,
        }).eq("stripe_subscription_id", sub.id);
        await syncAdvertiserTierForSub(supabase, sub.id, sub.metadata?.tier ?? null, active);
        break;
      }
      default: break;
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
  return NextResponse.json({ received: true });
}
