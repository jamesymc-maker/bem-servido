import Stripe from "stripe";

function getSecretKey(): string {
  return (process.env.STRIPE_SECRET_KEY || "").trim();
}

// Evaluated at request time so it always reflects the current environment
// (avoids a stale value captured during build/static evaluation).
export function isStripeConfigured(): boolean {
  return getSecretKey().length > 0;
}

let cached: Stripe | null = null;

// Lazily create (and cache) the Stripe client using the current secret key.
// Falls back to a stub so the app still builds without a key configured.
export function getStripe(): Stripe {
  if (!cached) {
    cached = new Stripe(getSecretKey() || "sk_test_stub", {
      // @ts-ignore - keep flexible across stripe-node versions
      apiVersion: undefined,
    });
  }
  return cached;
}
