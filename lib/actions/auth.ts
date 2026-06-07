"use server";

import { resolvePortalRedirect as resolve } from "@/lib/auth";

export async function resolvePortalRedirect(next?: string | null) {
  return resolve(next);
}
