import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProfileView } from "@/components/profile-view";
import { JsonLd } from "@/components/json-ld";
import { getProvider, getProviders, getReviews, summarise } from "@/lib/data";
import { getActiveLocation, ACTIVE_LOCATION_NAME } from "@/lib/locations";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://bemservido.com.br";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProvider(slug);
  if (!p) return { title: "Profissional não encontrado · Bem Servido" };
  return {
    title: `${p.name} · ${p.category_label} em ${ACTIVE_LOCATION_NAME} · Bem Servido`,
    description: p.short_desc,
    alternates: { canonical: `/profissional/${p.slug}` },
    openGraph: { title: `${p.name} · ${p.category_label}`, description: p.short_desc, images: p.photo_url ? [p.photo_url] : [] },
  };
}

export default async function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProvider(slug);
  if (!p) notFound();
  const [all, reviews] = await Promise.all([getProviders(), getReviews(p.id)]);
  const related = all.filter((x) => x.category_slug === p.category_slug && x.slug !== p.slug).slice(0, 3);
  const summary = summarise(reviews);
  const loc = getActiveLocation();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: p.name,
    image: p.photo_url || undefined,
    description: p.short_desc,
    url: `${SITE}/profissional/${p.slug}`,
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
