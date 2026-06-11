import { requireAdminOrRedirect } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata = { title: "Admin · daquii", robots: { index: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const profile = await requireAdminOrRedirect();
  return <AdminShell email={profile.email}>{children}</AdminShell>;
}
