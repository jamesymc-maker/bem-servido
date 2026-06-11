"use client";
import { useState } from "react";
import { Play, Pause } from "lucide-react";
import type { Provider } from "@/lib/types";
import { useT } from "./location-provider";

export function IntroVideo({ p }: { p: Provider }) {
  const [playing, setPlaying] = useState(false);
  const t = useT();
  return (
    <div className="relative rounded-3xl overflow-hidden aspect-video" style={{ background: "var(--navy)" }}>
      <img src={p.photo_url} alt="" referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: playing ? "none" : "brightness(.6) saturate(1.1)", transform: playing ? "scale(1.04)" : "none", transition: "all .5s" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(10,67,57,.85))" }} />
      <button onClick={() => setPlaying((v) => !v)} className="absolute inset-0 grid place-items-center group" aria-label="play">
        <span className="grid place-items-center w-16 h-16 rounded-full transition group-hover:scale-110" style={{ background: "rgba(255,255,255,.92)" }}>
          {playing ? <Pause size={26} color="var(--navy)" /> : <Play size={26} fill="var(--navy)" strokeWidth={0} className="ml-1" />}
        </span>
      </button>
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
        <span className="text-sm font-medium">{playing ? t("video.playing") : t("video.caption")}</span>
        <span className="text-[11px] px-2 py-1 rounded-full" style={{ background: "rgba(255,255,255,.2)" }}>{t("video.muted")}</span>
      </div>
    </div>
  );
}
