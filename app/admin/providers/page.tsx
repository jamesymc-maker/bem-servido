import { adminListProvidersDetailed } from "@/lib/admin-data";
import { ProvidersTable } from "@/components/admin/providers-table";

export default async function AdminProviders() {
  const rows = await adminListProvidersDetailed();
  return <ProvidersTable rows={rows} />;
}
