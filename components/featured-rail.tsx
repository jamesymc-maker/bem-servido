"use client";
import { Star } from "lucide-react";
import type { Provider } from "@/lib/types";
import { ListingCard } from "./listing-card";
import { useT } from "./location-provider";

export function FeaturedRail({ providers }: { providers: Provider[] }) {
  const t = useT();
  return (
    <section className="py-14" style={{ background: "var(--sand)" }}>
      <div className="max-w-dq mx-auto px-5">
        <div className="flex items-end justify-between mb-7">
          <div>
            <div className="text-sm font-semibold flex items-center gap-1.5 mb-1" style={{ color: "var(--pink)" }}>
              <Star size={15} fill="var(--pink)" strokeWidth={0} /> {t("featured.tag")}
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy">{t("featured.heading")}</h2>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {providers.map((p, i) => <ListingCard key={p.slug} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}
