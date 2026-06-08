// Location model. Today only Ilhabela is active and is always the default.
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
  { slug: "ubatuba", name: "Ubatuba", region: "São Paulo", country: "Brasil", active: false },
  { slug: "buzios", name: "Búzios", region: "Rio de Janeiro", country: "Brasil", active: false },
];

export const DEFAULT_LOCATION = "ilhabela";
export const getLocation = (slug: string) =>
  LOCATIONS.find((l) => l.slug === slug) ?? LOCATIONS[0];
export const activeLocations = () => LOCATIONS.filter((l) => l.active);

// The primary active location drives location-aware copy and SEO across the
// site. Today that is Ilhabela; when a second region goes live, every heading,
// FAQ, About line and meta tag that uses {loc} updates automatically.
export const getActiveLocation = (): Location =>
  activeLocations()[0] ?? getLocation(DEFAULT_LOCATION);
export const ACTIVE_LOCATION_NAME = getActiveLocation().name;
