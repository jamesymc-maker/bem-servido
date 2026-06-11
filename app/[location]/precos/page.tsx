import type { Metadata } from "next";
import { Pricing } from "@/components/pricing";
import { DEFAULT_LOCATION, getActiveLocationBySlug } from "@/lib/locations";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}): Promise<Metadata> {
  const { location } = await params;
  const loc = getActiveLocationBySlug(location) ?? getActiveLocationBySlug(DEFAULT_LOCATION)!;
  return {
    title: `Anuncie o seu serviço em ${loc.name} · daquii`,
    description: `Apareça para turistas e moradores de ${loc.name}. Comece grátis por 60 dias, sem comissão por contacto.`,
    alternates: { canonical: `/${loc.slug}/precos` },
    openGraph: { title: `Anuncie o seu serviço em ${loc.name} · daquii` },
  };
}

export default function PrecosPage() {
  return <Pricing />;
}
