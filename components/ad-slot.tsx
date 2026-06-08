import { fetchAd } from "@/lib/ads";
import { AdCard, AdPlaceholder } from "./ad-display";

export async function AdSlot({ labelKey, categorySlug, locationSlug }: { labelKey: "home" | "category"; categorySlug?: string; locationSlug?: string }) {
  const placement = labelKey === "home" ? "home" : "category";
  const ad = await fetchAd(placement, categorySlug);
  return (
    <div className="max-w-6xl mx-auto px-5 my-10">
      {ad ? <AdCard ad={ad} size="banner" /> : <AdPlaceholder label={labelKey === "home" ? "Página inicial" : "Categoria"} locationSlug={locationSlug} />}
    </div>
  );
}
