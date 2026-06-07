import type { Tier } from "./types";

export const brl = (n: number) => `R$${n.toLocaleString("pt-BR")}`;
export const waLink = (phone: string) => `https://wa.me/${phone.replace(/\D/g, "")}`;
export const TIER_RANK: Record<Tier, number> = { premium: 0, featured: 1, standard: 2 };

export function sortByRank<T extends { tier: Tier; name: string }>(rows: T[]) {
  return [...rows].sort(
    (a, b) => TIER_RANK[a.tier] - TIER_RANK[b.tier] || a.name.localeCompare(b.name, "pt-BR"),
  );
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50) || "perfil";
}
