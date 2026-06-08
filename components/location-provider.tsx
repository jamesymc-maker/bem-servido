"use client";
import { createContext, useCallback, useContext } from "react";
import { usePathname } from "next/navigation";
import { getActiveLocation, resolveLocationFromPath, type Location } from "@/lib/locations";
import { t as baseT } from "@/lib/i18n";

const LocationContext = createContext<Location | null>(null);

// Provides the active location to every client component, derived purely from
// the URL. Rendered once in the root layout so the nav, footer and all
// location pages share a single source of truth that updates on navigation.
export function LocationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const location = resolveLocationFromPath(pathname ?? "/");
  return <LocationContext.Provider value={location}>{children}</LocationContext.Provider>;
}

// The active Location resolved from the URL (falls back to the default region).
export function useActiveLocation(): Location {
  return useContext(LocationContext) ?? getActiveLocation();
}

// Location-aware translation. Fills {loc} with the active location name from the
// URL; extra vars are forwarded to t(). Use this instead of importing t()
// directly in client components.
export function useT() {
  const loc = useActiveLocation();
  return useCallback(
    (key: string, vars?: Record<string, string | number>): any =>
      baseT(key, { loc: loc.name, ...vars }),
    [loc.name],
  );
}
