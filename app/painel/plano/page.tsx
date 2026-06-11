import { getOrCreateProvider } from "@/lib/actions/provider";
import { PlanPicker } from "@/components/painel/plan-picker";

export default async function PlanoPage() {
  const p: any = await getOrCreateProvider();
  const sub = Array.isArray(p?.subscriptions) ? p.subscriptions[0] : p?.subscriptions;
  return (
    <div>
      <h1 className="font-heading text-2xl mb-1" style={{ fontWeight: 600 }}>Plano</h1>
      <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>Escolha o plano que dá mais visibilidade ao seu perfil.</p>
      <PlanPicker providerId={p?.id ?? ""} currentPlan={sub?.status === "active" ? sub?.plan : undefined} />
    </div>
  );
}
