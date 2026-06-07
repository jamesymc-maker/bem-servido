export interface Plan {
  key: "standard" | "featured" | "premium";
  name: string;
  price: number;
  blurb: string;
  feats: string[];
  accent: boolean;
  priceEnv: string; // env var holding the Stripe price id
}

export const PLANS: Plan[] = [
  { key: "standard", name: "Standard", price: 29, blurb: "Para começar a aparecer.",
    feats: ["Perfil na lista", "Página de perfil", "Contacto direto", "Galeria de fotos"],
    accent: false, priceEnv: "STRIPE_PRICE_STANDARD" },
  { key: "featured", name: "Featured", price: 79, blurb: "Mais visto, mais procurado.",
    feats: ["Colocação mais alta", "Selo Featured", "Mais visibilidade", "Tudo do Standard"],
    accent: true, priceEnv: "STRIPE_PRICE_FEATURED" },
  { key: "premium", name: "Premium", price: 149, blurb: "O topo da ilha.",
    feats: ["Topo da categoria", "Destaque na home", "Selo Premium", "Visibilidade máxima"],
    accent: false, priceEnv: "STRIPE_PRICE_PREMIUM" },
];

export function priceIdForPlan(key: string): string | undefined {
  const plan = PLANS.find((p) => p.key === key);
  if (!plan) return undefined;
  return process.env[plan.priceEnv];
}
