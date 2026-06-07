import { redirect } from "next/navigation";
import { requireUserOrRedirect } from "@/lib/auth";
import { getOrCreateProvider } from "@/lib/actions/provider";
import { PainelShell } from "@/components/painel/painel-shell";

export const metadata = { title: "Meu painel · Bem Servido", robots: { index: false } };

export default async function PainelLayout({ children }: { children: React.ReactNode }) {
  await requireUserOrRedirect("/painel");
  const provider = await getOrCreateProvider();
  if (!provider) redirect("/anunciante/painel");
  return (
    <PainelShell status={provider.status ?? "pending"} slug={provider.slug ?? ""} published={provider.status === "published"}>
      {children}
    </PainelShell>
  );
}
