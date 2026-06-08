import type { Metadata } from "next";
import { Pricing } from "@/components/pricing";
import { openGraphMetadata } from "@/lib/site";

const title = "Preços para profissionais · Bem Servido";
const description =
  "Planos para profissionais locais anunciarem no Bem Servido e serem encontrados por visitantes e moradores de Ilhabela.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/precos" },
  openGraph: openGraphMetadata({ title, description, url: "/precos" }),
};

export default function PrecosPage() {
  return <Pricing />;
}
