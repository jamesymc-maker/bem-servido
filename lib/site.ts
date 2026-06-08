import type { Metadata } from "next";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://bem-servido.vercel.app").replace(/\/$/, "");
export const SITE_NAME = "Bem Servido";
export const SITE_TITLE = "Bem Servido · Serviços locais de confiança em Ilhabela";
export const SITE_DESCRIPTION =
  "Chefs, motoristas, babás, capitães de barco e mais. Profissionais locais de confiança em Ilhabela.";

export const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Bem Servido · Serviços locais de confiança em Ilhabela",
};

export function openGraphMetadata({
  title,
  description = SITE_DESCRIPTION,
  url,
  images,
  type = "website",
}: {
  title: string;
  description?: string;
  url?: string;
  images?: NonNullable<Metadata["openGraph"]>["images"];
  type?: "website" | "article";
}): NonNullable<Metadata["openGraph"]> {
  return {
    title,
    description,
    url,
    type,
    locale: "pt_BR",
    siteName: SITE_NAME,
    images: images && (!Array.isArray(images) || images.length > 0) ? images : [DEFAULT_OG_IMAGE],
  };
}
