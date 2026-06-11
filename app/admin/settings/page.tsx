import { getProfile } from "@/lib/auth";
import { ACTIVE_LOCATION_NAME } from "@/lib/locations";

export default async function AdminSettings() {
  const profile = await getProfile();
  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-2xl mb-5" style={{ fontWeight: 600 }}>Ajustes</h1>
      <div className="rounded-2xl bg-white p-5 flex flex-col gap-3 text-sm" style={{ border: "1px solid var(--border)" }}>
        <div className="flex justify-between"><span style={{ color: "var(--muted)" }}>Conta admin</span><span className="font-medium">{profile?.email}</span></div>
        <div className="flex justify-between"><span style={{ color: "var(--muted)" }}>Local ativo</span><span className="font-medium">{ACTIVE_LOCATION_NAME}</span></div>
      </div>
      <div className="rounded-2xl p-5 mt-4 text-sm" style={{ background: "var(--sand)", color: "var(--muted)" }}>
        <p className="font-semibold mb-1" style={{ color: "var(--navy)" }}>Tornar alguém admin</p>
        <p>No Supabase, rode: <code className="px-1.5 py-0.5 rounded" style={{ background: "#fff" }}>update profiles set is_admin = true where email = 'email@exemplo.com';</code></p>
      </div>
    </div>
  );
}
