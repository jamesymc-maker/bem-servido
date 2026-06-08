"use client";
import { Star } from "lucide-react";
import type { Provider } from "@/lib/types";
import { ListingCard } from "./listing-card";
import { useT } from "./location-provider";

export function FeaturedRail({ providers }: { providers: Provider[] }) {
  const t = useT();
  return (
    <section className="py-14" style={{ background: "var(--sand)" }}>
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex items-end justify-between mb-7">
          <div>
            <div className="text-sm font-semibold flex items-center gap-1.5 mb-1" style={{ color: "var(--coral)" }}>
              <Star size={15} fill="var(--coral)" strokeWidth={0} /> {t("featured.tag")}
            </div>
            <h2 className="serif text-3xl md:text-4xl" style={{ fontWeight: 600 }}>{t("featured.heading")}</h2>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {providers.map((p, i) => <ListingCard key={p.slug} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}
