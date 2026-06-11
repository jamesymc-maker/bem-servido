import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProfileView } from "@/components/profile-view";
import { JsonLd } from "@/components/json-ld";
import { getProvider, getProviders, getReviews, summarise } from "@/lib/data";
import { DEFAULT_LOCATION, getActiveLocationBySlug } from "@/lib/locations";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://daquii.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string; slug: string }>;
}): Promise<Metadata> {
  const { location, slug } = await params;
  const loc = getActiveLocationBySlug(location) ?? getActiveLocationBySlug(DEFAULT_LOCATION)!;
  const p = await getProvider(slug);
  if (!p) return { title: "Profissional não encontrado · daquii" };
  return {
    title: `${p.name} · ${p.category_label} em ${loc.name} · daquii`,
    description: p.short_desc,
    alternates: { canonical: `/${loc.slug}/profissional/${p.slug}` },
    openGraph: { title: `${p.name} · ${p.category_label}`, description: p.short_desc, images: p.photo_url ? [p.photo_url] : [] },
  };
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ location: string; slug: string }>;
}) {
  const { location, slug } = await params;
  const loc = getActiveLocationBySlug(location);
  if (!loc) notFound();
  const p = await getProvider(slug);
  if (!p) notFound();
  // A provider only belongs to its own location's experience.
  if (p.location_slug && p.location_slug !== loc.slug) notFound();

  const [all, reviews] = await Promise.all([getProviders(loc.slug), getReviews(p.id)]);
  const related = all.filter((x) => x.category_slug === p.category_slug && x.slug !== p.slug).slice(0, 3);
  const summary = summarise(reviews);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: p.name,
    image: p.photo_url || undefined,
    description: p.short_desc,
    url: `${SITE}/${loc.slug}/profissional/${p.slug}`,
    knowsLanguage: p.languages,
    areaServed: { "@type": "Place", name: `${p.service_area}, ${loc.name}, ${loc.country}` },
    address: { "@type": "PostalAddress", addressLocality: loc.name, addressRegion: "SP", addressCountry: "BR" },
    priceRange: "R$",
    telephone: p.phone,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <ProfileView p={p} related={related} reviews={reviews} summary={summary} />
    </>
  );
}
