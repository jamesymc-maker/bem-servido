import { createClient } from "@supabase/supabase-js";

// Service-role client for trusted server contexts only (e.g. Stripe webhooks).
// NEVER import this into client components.
export function createAdminSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
}
