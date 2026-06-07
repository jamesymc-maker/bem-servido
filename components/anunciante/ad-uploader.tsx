"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { upsertAd, saveLogoUrl } from "@/lib/actions/advertiser";

export function AdUploader({ advertiserId, adId, initialImage }: { advertiserId: string; adId?: string; initialImage?: string | null }) {
  const router = useRouter();
  const [img, setImg] = useState(initialImage || "");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  const supabase = createClient();
  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    setBusy(true); setErr(null);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("não autenticado");
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const path = `${user.id}/${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("ads").upload(path, file, { upsert: true });
      if (error) throw error;
      const url = supabase.storage.from("ads").getPublicUrl(path).data.publicUrl;
      setImg(url);
    } catch (e: any) { setErr(e.message); }
    finally { setBusy(false); }
  }
  return (
    <div>
      {img && <img src={img} alt="Preview" className="w-full rounded-2xl object-cover mb-3" style={{ maxHeight: 160 }} referrerPolicy="no-referrer" />}
      <input type="hidden" name="image_url" value={img} />
      <input ref={ref} type="file" accept="image/*" hidden onChange={upload} />
      <button type="button" onClick={() => ref.current?.click()} disabled={busy}
        className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold disabled:opacity-60"
        style={{ border: "1px solid var(--line)", color: "var(--ink)" }}>
        {busy ? <><Loader2 size={15} className="animate-spin" /> A carregar...</> : <><Upload size={15} /> {img ? "Alterar imagem" : "Enviar imagem"}</>}
      </button>
      {err && <p className="text-xs mt-1" style={{ color: "var(--coral)" }}>{err}</p>}
    </div>
  );
}

export function LogoUploader({ advertiserId, initialLogo }: { advertiserId: string; initialLogo?: string | null }) {
  const router = useRouter();
  const [logo, setLogo] = useState(initialLogo || "");
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const supabase = createClient();
  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    setBusy(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error();
      const path = `${user.id}/logo.${(file.name.split(".").pop() || "png").toLowerCase()}`;
      const { error } = await supabase.storage.from("ads").upload(path, file, { upsert: true });
      if (error) throw error;
      const url = supabase.storage.from("ads").getPublicUrl(path).data.publicUrl;
      await saveLogoUrl(url);
      setLogo(url); router.refresh();
    } catch {} finally { setBusy(false); }
  }
  return (
    <div className="flex items-center gap-4">
      {logo && <img src={logo} alt="Logo" className="w-16 h-16 object-contain rounded-xl" style={{ border: "1px solid var(--line)" }} referrerPolicy="no-referrer" />}
      <div>
        <input ref={ref} type="file" accept="image/*" hidden onChange={upload} />
        <button type="button" onClick={() => ref.current?.click()} disabled={busy}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold disabled:opacity-60"
          style={{ border: "1px solid var(--line)", color: "var(--ink)" }}>
          {busy ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />} {logo ? "Alterar logo" : "Enviar logo"}
        </button>
      </div>
    </div>
  );
}
