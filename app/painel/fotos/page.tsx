import { getOrCreateProvider } from "@/lib/actions/provider";
import { getCurrentUser } from "@/lib/auth";
import { PhotoUploader } from "@/components/painel/photo-uploader";

export default async function FotosPage() {
  const [p, user]: any = await Promise.all([getOrCreateProvider(), getCurrentUser()]);
  const gallery = (p?.provider_gallery ?? []).map((g: any) => ({ id: g.id, url: g.url }));
  return (
    <div>
      <h1 className="serif text-2xl mb-5" style={{ fontWeight: 600 }}>Fotos</h1>
      <PhotoUploader userId={user?.id ?? ""} providerId={p?.id ?? ""} initialPhoto={p?.photo_url ?? null} gallery={gallery} />
    </div>
  );
}
