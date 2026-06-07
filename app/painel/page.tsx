import Link from "next/link";
import { Check, Circle } from "lucide-react";
import { getOrCreateProvider } from "@/lib/actions/provider";

function Item({ done, label, href }: { done: boolean; label: string; href: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 rounded-2xl bg-white p-4 transition hover:shadow-sm" style={{ border: "1px solid var(--line)" }}>
      {done ? <Check size={20} style={{ color: "var(--sea)" }} /> : <Circle size={20} style={{ color: "var(--line)" }} />}
      <span className="font-medium" style={{ color: done ? "var(--ink-soft)" : "var(--ink)" }}>{label}</span>
    </Link>
  );
}

export default async function PainelHome() {
  const p: any = await getOrCreateProvider();
  const sub = Array.isArray(p?.subscriptions) ? p.subscriptions[0] : p?.subscriptions;
  const trialEnds = p?.trial_ends_at ? new Date(p.trial_ends_at) : null;
  const trialDaysLeft = trialEnds ? Math.max(0, Math.ceil((trialEnds.getTime() - Date.now()) / 86400000)) : null;
  const trialExpired = trialEnds && trialEnds < new Date() && sub?.status !== "active";
  const gallery = p?.provider_gallery ?? [];
  const steps = {
    profile: Boolean(p?.short_desc && p?.category_id && p?.half_day_rate),
    photo: Boolean(p?.photo_url),
    video: Boolean(p?.intro_video_url),
    plan: sub?.status === "active",
  };
  return (
    <div>
      <h1 className="serif text-2xl mb-1" style={{ fontWeight: 600 }}>Olá, {(p?.name || "").split(" ")[0] || "profissional"}</h1>
      <p className="text-sm mb-6" style={{ color: "var(--ink-soft)" }}>
        {p?.status === "published"
          ? "Seu perfil está publicado e visível para quem visita a ilha."
          : "Complete os passos abaixo. Seu perfil é publicado após nossa revisão."}
      </p>
      {trialDaysLeft !== null && !trialExpired && sub?.status !== "active" && (
        <div className="rounded-2xl p-4 mb-4 flex items-center justify-between gap-3" style={{ background: "rgba(14,91,78,.07)", border: "1px solid var(--line)" }}>
          <p className="text-sm"><span className="font-semibold" style={{ color: "var(--sea)" }}>Período gratuito:</span> {trialDaysLeft} dias restantes</p>
        </div>
      )}
      {trialExpired && (
        <div className="rounded-2xl p-4 mb-4 flex items-center justify-between gap-4" style={{ background: "rgba(226,100,63,.08)", border: "1px solid var(--coral)" }}>
          <p className="text-sm font-medium" style={{ color: "var(--coral)" }}>O seu período gratuito terminou. Escolha um plano para manter o perfil activo.</p>
          <a href="/painel/plano" className="shrink-0 rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ background: "var(--coral)" }}>Escolher plano</a>
        </div>
      )}
      <div className="grid sm:grid-cols-2 gap-3">
        <Item done={steps.profile} label="Completar perfil" href="/painel/perfil" />
        <Item done={steps.photo} label="Enviar foto de perfil" href="/painel/fotos" />
        <Item done={steps.video} label="Adicionar vídeo de apresentação" href="/painel/video" />
        <Item done={steps.plan} label="Escolher um plano" href="/painel/plano" />
      </div>
    </div>
  );
}
