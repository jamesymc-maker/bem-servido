import { adminListAdvertisersDetailed } from "@/lib/admin-data";
import { AdvertisersTable } from "@/components/admin/advertisers-table";

export default async function AdminAnunciantes() {
  const rows = await adminListAdvertisersDetailed();
  return <AdvertisersTable rows={rows} />;
}
