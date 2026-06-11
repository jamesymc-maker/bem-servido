import { redirect } from "next/navigation";
import { requireAdvertiserUserOrRedirect } from "@/lib/auth";
import { getOrCreateAdvertiser } from "@/lib/actions/advertiser";
import { AdvertiserShell } from "@/components/anunciante/advertiser-shell";
export const metadata = { title: "Painel do anunciante · Daquii", robots: { index: false } };
export default async function AdvertiserLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdvertiserUserOrRedirect();
  const adv: any = await getOrCreateAdvertiser();
  if (!adv) {
    if (user.user_metadata?.account_type === "provider") redirect("/painel");
    redirect("/anunciante/criar-conta");
  }
  const sub = Array.isArray(adv.advertiser_subscriptions) ? adv.advertiser_subscriptions[0] : adv.advertiser_subscriptions;
  return <AdvertiserShell tier={sub?.tier}>{children}</AdvertiserShell>;
}
