"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2, ImageIcon, Check, Info, Monitor } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { upsertAd, saveLogoUrl } from "@/lib/actions/advertiser";

const MAX_BYTES = 2 * 1024 * 1024; // 2 MB
const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];
const ACCEPTED_ATTR = "image/jpeg,image/jpg,image/png,image/webp";

const PLACEMENTS = [
  { label: "Banner da página inicial", dims: "1200 × 240 px", ratio: "5:1" },
  { label: "Banner de categoria / perfil", dims: "1000 × 200 px", ratio: "5:1" },
];

export function AdUploader({ advertiserId, adId, initialImage }: { advertiserId: string; adId?: string; initialImage?: string | null }) {
  const router = useRouter();
  const [img, setImg] = useState(initialImage || "");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    setErr(null);
    if (!ACCEPTED.includes(file.type)) {
      setErr("Formato inválido. Use JPG, PNG ou WebP.");
      e.target.value = "";
      return;
    }
    if (file.size > MAX_BYTES) {
      setErr(`Imagem muito grande (${(file.size / 1024 / 1024).toFixed(1)} MB). O limite é 2 MB.`);
      e.target.value = "";
      return;
    }
    setBusy(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Sessão expirada. Entre novamente para enviar a imagem.");
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const path = `${user.id}/${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("ads").upload(path, file, { upsert: true, contentType: file.type });
      if (error) throw error;
      const url = supabase.storage.from("ads").getPublicUrl(path).data.publicUrl;
      setImg(url);
    } catch (e: any) {
      setErr(e?.message || "Não foi possível enviar a imagem. Tente novamente.");
    }
    finally { setBusy(false); }
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Guidance: recommended dimensions per placement + specs */}
      <div className="rounded-xl p-3.5" style={{ background: "var(--sand)", border: "1px solid var(--line)" }}>
        <div className="flex items-center gap-2 mb-2 text-sm font-semibold" style={{ color: "var(--ink)" }}>
          <Info size={15} style={{ color: "var(--sea)" }} /> Especificações da imagem
        </div>
        <div className="grid sm:grid-cols-2 gap-2 mb-2">
          {PLACEMENTS.map((p) => (
            <div key={p.label} className="rounded-lg bg-white px-3 py-2" style={{ border: "1px solid var(--line)" }}>
              <div className="text-xs font-semibold" style={{ color: "var(--ink)" }}>{p.label}</div>
              <div className="text-xs mt-0.5" style={{ color: "var(--ink-soft)" }}>{p.dims} · proporção {p.ratio}</div>
            </div>
          ))}
        </div>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs" style={{ color: "var(--ink-soft)" }}>
          <li className="flex items-center gap-1"><Check size={12} style={{ color: "var(--sea)" }} /> Formatos: JPG, PNG ou WebP</li>
          <li className="flex items-center gap-1"><Check size={12} style={{ color: "var(--sea)" }} /> Tamanho máximo: 2 MB</li>
          <li className="flex items-center gap-1"><Check size={12} style={{ color: "var(--sea)" }} /> Banner horizontal (formato 5:1)</li>
        </ul>
      </div>

      {/* In-context mockup: shows how the banner appears on the site */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-semibold mb-1.5" style={{ color: "var(--ink-soft)" }}>
          <Monitor size={13} /> Pré-visualização no site
        </div>
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--line)", background: "var(--cream)" }}>
          {/* fake browser chrome */}
          <div className="flex items-center gap-1.5 px-3 py-2" style={{ borderBottom: "1px solid var(--line)", background: "#fff" }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
            <span className="ml-2 text-[10px] truncate" style={{ color: "var(--ink-soft)" }}>bem-servido.vercel.app</span>
          </div>
          <div className="p-3">
            {/* page skeleton rows */}
            <div className="h-2.5 w-24 rounded-full mb-3" style={{ background: "rgba(0,0,0,.08)" }} />
            {/* the ad slot */}
            <div className="relative rounded-lg overflow-hidden flex items-center justify-center"
              style={{ aspectRatio: "5 / 1", border: img ? "none" : "2px dashed var(--line)", background: img ? "transparent" : "rgba(14,91,78,.04)" }}>
              {img ? (
                <img src={img} alt="Pré-visualização do anúncio" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="flex flex-col items-center gap-1 text-center px-2">
                  <ImageIcon size={18} style={{ color: "var(--ink-soft)" }} />
                  <span className="text-[11px]" style={{ color: "var(--ink-soft)" }}>O seu banner aparece aqui</span>
                </div>
              )}
              {img && (
                <span className="absolute top-1.5 right-1.5 text-[9px] font-semibold uppercase tracking-wide rounded px-1.5 py-0.5"
                  style={{ background: "rgba(0,0,0,.55)", color: "#fff" }}>Anúncio</span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-lg" style={{ aspectRatio: "1 / 1", background: "rgba(0,0,0,.05)" }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <input type="hidden" name="image_url" value={img} />
      <input ref={ref} type="file" accept={ACCEPTED_ATTR} hidden onChange={upload} />
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => ref.current?.click()} disabled={busy}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold disabled:opacity-60"
          style={{ border: "1px solid var(--line)", color: "var(--ink)" }}>
          {busy ? <><Loader2 size={15} className="animate-spin" /> A carregar...</> : <><Upload size={15} /> {img ? "Alterar imagem" : "Enviar imagem"}</>}
        </button>
        {img && !busy && (
          <span className="inline-flex items-center gap-1 text-xs font-medium" style={{ color: "var(--sea)" }}>
            <Check size={13} /> Imagem carregada
          </span>
        )}
      </div>
      {err && <p className="text-xs" style={{ color: "var(--coral)" }}>{err}</p>}
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
