// Location model. Ilhabela and Ubatuba are active; Ilhabela is the default.
// Future regions are listed as "coming soon" so the selector signals expansion.
export interface Location {
  slug: string;
  name: string;
  region: string;
  country: string;
  active: boolean;
}

export const LOCATIONS: Location[] = [
  { slug: "ilhabela", name: "Ilhabela", region: "São Paulo", country: "Brasil", active: true },
  { slug: "maresias", name: "Maresias", region: "São Paulo", country: "Brasil", active: false },
  { slug: "ubatuba", name: "Ubatuba", region: "São Paulo", country: "Brasil", active: true },
  { slug: "buzios", name: "Búzios", region: "Rio de Janeiro", country: "Brasil", active: false },
];

export const DEFAULT_LOCATION = "ilhabela";
export const getLocation = (slug: string) =>
  LOCATIONS.find((l) => l.slug === slug) ?? LOCATIONS[0];
export const activeLocations = () => LOCATIONS.filter((l) => l.active);

// True when `slug` names a region that is live (selectable in the URL).
export const isActiveLocationSlug = (slug?: string | null): boolean =>
  !!slug && LOCATIONS.some((l) => l.slug === slug && l.active);

// Resolve an active Location by slug, or null if it isn't a live region.
export const getActiveLocationBySlug = (slug?: string | null): Location | null =>
  LOCATIONS.find((l) => l.slug === slug && l.active) ?? null;

// Resolve the active location from a URL pathname (e.g. "/ubatuba/servicos").
// Falls back to the default location when the first segment isn't a live region.
export const resolveLocationFromPath = (pathname: string): Location => {
  const seg = pathname.split("/").filter(Boolean)[0];
  return getActiveLocationBySlug(seg) ?? getLocation(DEFAULT_LOCATION);
};

// Default/fallback active location used outside of a URL context (e.g. root
// layout metadata, OG image). Inside the app, the location comes from the URL.
export const getActiveLocation = (): Location =>
  activeLocations()[0] ?? getLocation(DEFAULT_LOCATION);
export const ACTIVE_LOCATION_NAME = getActiveLocation().name;
