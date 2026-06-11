import { redirect } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { DEFAULT_LOCATION, getActiveLocationBySlug } from "@/lib/locations";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://daquii.com";

// Validates the URL location segment against the active regions in
// lib/locations.ts and redirects unknown/inactive regions to the default.
// All public pages live under this segment so the active location is driven
// entirely by the URL.
export default async function LocationLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ location: string }>;
}) {
  const { location } = await params;
  const loc = getActiveLocationBySlug(location);
  if (!loc) redirect(`/${DEFAULT_LOCATION}`);

  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE}/${loc.slug}/#business`,
    name: `daquii · ${loc.name}`,
    url: `${SITE}/${loc.slug}`,
    description: `Diretório de profissionais locais de confiança em ${loc.name}, ${loc.country}.`,
    image: `${SITE}/opengraph-image`,
    areaServed: { "@type": "Place", name: `${loc.name}, ${loc.region}, ${loc.country}` },
    address: {
      "@type": "PostalAddress",
      addressLocality: loc.name,
      addressRegion: loc.region,
      addressCountry: "BR",
    },
    priceRange: "R$",
  };

  return (
    <>
      <JsonLd data={businessJsonLd} />
      {children}
    </>
  );
}
