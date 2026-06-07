import { getOrCreateProvider, saveIntroVideo } from "@/lib/actions/provider";

export default async function VideoPage() {
  const p: any = await getOrCreateProvider();
  return (
    <div className="max-w-2xl">
      <h1 className="serif text-2xl mb-2" style={{ fontWeight: 600 }}>Vídeo de apresentação</h1>
      <p className="text-sm mb-5" style={{ color: "var(--ink-soft)" }}>
        Um vídeo curto de 15 a 30 segundos: diga quem você é, o que oferece e por que escolher você.
        Cole o link do seu vídeo (YouTube, Vimeo ou outro). O upload direto chega em breve.
      </p>
      <form action={saveIntroVideo} className="flex flex-col gap-3">
        <input name="intro_video_url" defaultValue={p?.intro_video_url ?? ""} placeholder="https://..."
          className="w-full rounded-xl px-4 py-3 text-[15px] outline-none bg-white" style={{ border: "1px solid var(--line)" }} />
        <button className="self-start rounded-full px-6 py-3 font-semibold text-white" style={{ background: "var(--sea)" }}>Salvar vídeo</button>
      </form>
    </div>
  );
}
