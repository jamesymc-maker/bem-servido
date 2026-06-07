import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getOrCreateAdvertiser } from "@/lib/actions/advertiser";
import { AdvertiserShell } from "@/components/anunciante/advertiser-shell";
export const metadata = { title: "Painel do anunciante · Bem Servido", robots: { index: false } };
export default async function AdvertiserLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/anunciante/entrar");
  const adv: any = await getOrCreateAdvertiser();
  const sub = Array.isArray(adv?.advertiser_subscriptions) ? adv.advertiser_subscriptions[0] : adv?.advertiser_subscriptions;
  return <AdvertiserShell tier={sub?.tier}>{children}</AdvertiserShell>;
}
