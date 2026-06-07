export type AdTier = "visibilidade" | "destaque" | "parceiro";

export interface AdPlan {
  key: AdTier;
  name: string;
  price: number;
  blurb: string;
  placements: string[];
  feats: string[];
  accent: boolean;
  blogPosts: string | null;
  priceEnv: string;
}

export const AD_PLANS: AdPlan[] = [
  {
    key: "visibilidade", name: "Visibilidade", price: 149,
    blurb: "Apareça para quem procura o seu tipo de serviço.",
    placements: ["category"],
    feats: ["Banner nas páginas de categoria", "Rotação padrão", "Rastreamento de cliques"],
    accent: false, blogPosts: null,
    priceEnv: "STRIPE_PRICE_AD_VISIBILIDADE",
  },
  {
    key: "destaque", name: "Destaque", price: 349,
    blurb: "Alcance visitantes e profissionais em mais pontos do site.",
    placements: ["category", "profile"],
    feats: ["Banner em categorias e perfis", "Prioridade sobre Visibilidade", "1 post patrocinado por trimestre", "Rastreamento de cliques e impressões"],
    accent: true, blogPosts: "1 por trimestre",
    priceEnv: "STRIPE_PRICE_AD_DESTAQUE",
  },
  {
    key: "parceiro", name: "Parceiro Oficial", price: 699,
    blurb: "Máxima visibilidade. Logotipo no rodapé e destaque na página inicial.",
    placements: ["home", "category", "profile", "footer"],
    feats: ["Banner na página inicial (exclusivo)", "Banner em categorias e perfis", "Logotipo no rodapé do site", "Selo 'Parceiro Oficial'", "1 post patrocinado por mês", "Prioridade máxima"],
    accent: false, blogPosts: "1 por mês",
    priceEnv: "STRIPE_PRICE_AD_PARCEIRO",
  },
];

export const AD_TIER_RANK: Record<AdTier, number> = { parceiro: 0, destaque: 1, visibilidade: 2 };

export function adPriceId(tier: string) {
  const plan = AD_PLANS.find((p) => p.key === tier);
  return plan ? process.env[plan.priceEnv] : undefined;
}
