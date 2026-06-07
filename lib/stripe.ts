import Stripe from "stripe";

// Stripe is stubbed: it initialises even without a key so the app builds.
// Real billing kicks in once STRIPE_SECRET_KEY is set in the environment.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_stub", {
  // Pin to whatever version your Stripe dashboard reports; omit to use account default.
  // @ts-ignore - keep flexible across stripe-node versions
  apiVersion: undefined,
});

export const stripeConfigured = Boolean(process.env.STRIPE_SECRET_KEY);
