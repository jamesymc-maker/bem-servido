// Single source of truth for how an ad's lifecycle status is presented, shared
// by the advertiser dashboard and the admin moderation table.
//
//   Aguardando pagamento  - advertiser has no active plan (tier is null)
//   Em revisão            - plan active, ad not yet put live
//   Activo                - live on the site
//   Inactivo              - manually taken down by an admin (moderation)

export type AdStatusKey = "aguardando" | "revisao" | "activo" | "inactivo";

export type AdStatus = {
  key: AdStatusKey;
  label: string;
  color: string;
  bg: string;
};

const STATUS: Record<AdStatusKey, AdStatus> = {
  aguardando: { key: "aguardando", label: "Aguardando pagamento", color: "var(--orange)", bg: "var(--sand)" },
  revisao: { key: "revisao", label: "Em revisão", color: "var(--orange)", bg: "var(--sand)" },
  activo: { key: "activo", label: "Activo", color: "var(--teal)", bg: "var(--sand)" },
  inactivo: { key: "inactivo", label: "Inactivo", color: "var(--muted)", bg: "var(--sand)" },
};

export function adStatus(ad: { active?: boolean; admin_blocked?: boolean }, hasActivePlan: boolean): AdStatus {
  if (ad.admin_blocked) return STATUS.inactivo;
  if (!hasActivePlan) return STATUS.aguardando;
  if (ad.active) return STATUS.activo;
  return STATUS.revisao;
}
