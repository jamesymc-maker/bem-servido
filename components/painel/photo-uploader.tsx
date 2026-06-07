"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { saveProfilePhoto, addGalleryImage, removeGalleryImage } from "@/lib/actions/provider";

type GalleryItem = { id: string; url: string };

export function PhotoUploader({ userId, providerId, initialPhoto, gallery }: {
  userId: string; providerId: string; initialPhoto: string | null; gallery: GalleryItem[];
}) {
  const router = useRouter();
  const supabase = createClient();
  const [photo, setPhoto] = useState(initialPhoto);
  const [items, setItems] = useState<GalleryItem[]>(gallery);
  const [busy, setBusy] = useState<"profile" | "gallery" | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const profileRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);

  async function upload(bucket: string, file: File) {
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true });
    if (error) throw error;
    return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
  }

  async function onProfile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    setErr(null); setBusy("profile");
    try {
      const url = await upload("avatars", file);
      await saveProfilePhoto(url);
      setPhoto(url); router.refresh();
    } catch (e: any) { setErr(e.message || "Falha no envio."); }
    finally { setBusy(null); }
  }

  async function onGallery(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []); if (!files.length) return;
    setErr(null); setBusy("gallery");
    try {
      for (const file of files.slice(0, 10)) {
        const url = await upload("gallery", file);
        await addGalleryImage(providerId, url);
        setItems((prev) => [...prev, { id: `tmp-${Date.now()}-${Math.random()}`, url }]);
      }
      router.refresh();
    } catch (e: any) { setErr(e.message || "Falha no envio."); }
    finally { setBusy(null); }
  }

  async function remove(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
    if (!id.startsWith("tmp-")) { await removeGalleryImage(id); router.refresh(); }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="serif text-xl mb-1" style={{ fontWeight: 600 }}>Foto de perfil</h2>
        <p className="text-sm mb-4" style={{ color: "var(--ink-soft)" }}>Um rosto claro recebe muito mais contactos. Mostre o seu sorriso.</p>
        <div className="flex items-center gap-5">
          <div className="w-28 h-28 rounded-full overflow-hidden grid place-items-center ring-photo" style={{ background: "var(--sand-deep)" }}>
            {photo ? <img src={photo} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" /> : <Upload size={22} style={{ color: "var(--ink-soft)" }} />}
          </div>
          <div>
            <input ref={profileRef} type="file" accept="image/*" hidden onChange={onProfile} />
            <button onClick={() => profileRef.current?.click()} disabled={busy === "profile"}
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-white inline-flex items-center gap-2 disabled:opacity-60" style={{ background: "var(--sea)" }}>
              {busy === "profile" ? <><Loader2 size={15} className="animate-spin" /> Enviando...</> : <><Upload size={15} /> Enviar foto</>}
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="serif text-xl mb-1" style={{ fontWeight: 600 }}>Galeria (até 10 fotos)</h2>
        <p className="text-sm mb-4" style={{ color: "var(--ink-soft)" }}>Mostre o seu trabalho.</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {items.map((it) => (
            <div key={it.id} className="relative aspect-square rounded-2xl overflow-hidden" style={{ background: "var(--sand-deep)" }}>
              <img src={it.url} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              <button onClick={() => remove(it.id)} className="absolute top-1.5 right-1.5 grid place-items-center w-7 h-7 rounded-full"
                style={{ background: "rgba(0,0,0,.55)" }}><X size={14} color="#fff" /></button>
            </div>
          ))}
          {items.length < 10 && (
            <button onClick={() => galleryRef.current?.click()} disabled={busy === "gallery"}
              className="aspect-square rounded-2xl grid place-items-center disabled:opacity-60" style={{ border: "1.5px dashed var(--line)", color: "var(--ink-soft)" }}>
              {busy === "gallery" ? <Loader2 size={20} className="animate-spin" /> : <Upload size={20} />}
            </button>
          )}
        </div>
        <input ref={galleryRef} type="file" accept="image/*" multiple hidden onChange={onGallery} />
      </div>
      {err && <p className="text-sm" style={{ color: "var(--coral)" }}>{err}</p>}
    </div>
  );
}
