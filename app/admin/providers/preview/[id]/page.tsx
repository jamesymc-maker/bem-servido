import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ProfileView } from "@/components/profile-view";
import { adminGetProviderPreview } from "@/lib/admin-data";
import { summarise } from "@/lib/data";

export const metadata = { title: "Pré-visualização · Admin · Daquii", robots: { index: false } };

const STATUS_LABEL: Record<string, string> = {
  pending: "Pendente",
  published: "Publicado",
  rejected: "Rejeitado",
  suspended: "Suspenso",
};

export default async function ProviderPreview({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await adminGetProviderPreview(id);
  if (!data) notFound();
  const { provider, status, reviews, related } = data;
  const summary = summarise(reviews);

  return (
    <div>
      <div className="rounded-2xl px-4 py-3 mb-5 flex flex-wrap items-center justify-between gap-3"
        style={{ background: "var(--sand)", border: "1px solid var(--line)" }}>
        <div className="flex items-center gap-2 text-sm">
          <Link href="/admin/providers" className="inline-flex items-center gap-1.5 font-semibold" style={{ color: "var(--sea)" }}>
            <ArrowLeft size={16} /> Voltar
          </Link>
          <span style={{ color: "var(--ink-soft)" }}>· Pré-visualização do perfil (visível apenas para admins)</span>
        </div>
        <span className="text-xs font-semibold rounded-full px-2.5 py-1" style={{ background: "var(--cream)", color: "var(--ink-soft)" }}>
          Status: {STATUS_LABEL[status] ?? status}
        </span>
      </div>
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--line)", background: "var(--cream)" }}>
        <ProfileView p={provider} related={related} reviews={reviews} summary={summary} />
      </div>
    </div>
  );
}
