import Link from "next/link";
import type { Metadata } from "next";
import {
  Check, MapPin, ArrowRight, Eye, MousePointerClick, Users, Sparkles,
  Home, LayoutGrid, User, Anchor, TrendingUp, BadgeCheck,
} from "lucide-react";
import { AD_PLANS } from "@/lib/ad-plans";
import { brl } from "@/lib/utils";
import { getProviders, getCategories } from "@/lib/data";
import { getAllPosts } from "@/lib/blog";
import { DEFAULT_LOCATION, getActiveLocationBySlug } from "@/lib/locations";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}): Promise<Metadata> {
  const { location } = await params;
  const loc = getActiveLocationBySlug(location) ?? getActiveLocationBySlug(DEFAULT_LOCATION)!;
  return {
    title: `Anuncie no Daquii · Alcance turistas em ${loc.name}`,
    description:
      `Leve a sua marca até os turistas, donos de casa de temporada e visitantes de ${loc.name} no momento em que planeiam a estadia. Planos a partir de R$149/mês.`,
    alternates: { canonical: `/${loc.slug}/anunciar` },
  };
}

function BrowserFrame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-white" style={{ border: "1px solid var(--line)", boxShadow: "0 24px 50px -32px rgba(14,91,78,.35)" }}>
      <div className="flex items-center gap-1.5 px-3 py-2.5" style={{ borderBottom: "1px solid var(--line)" }}>
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
        <span className="ml-2 text-[11px] truncate" style={{ color: "var(--ink-soft)" }}>{label}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function AdMock({ tall = false }: { tall?: boolean }) {
  return (
    <div className="relative rounded-xl flex items-center justify-center text-center"
      style={{ aspectRatio: tall ? "5 / 1.4" : "5 / 1", background: "linear-gradient(120deg, var(--sea), #1c7a69)" }}>
      <div>
        <div className="text-[11px] font-bold uppercase tracking-wide" style={{ color: "rgba(255,255,255,.7)" }}>O seu anúncio aqui</div>
        <div className="serif text-white text-sm sm:text-base" style={{ fontWeight: 600 }}>A sua marca em destaque</div>
      </div>
      <span className="absolute top-2 right-2 text-[9px] font-semibold uppercase rounded px-1.5 py-0.5" style={{ background: "rgba(0,0,0,.4)", color: "#fff" }}>Anúncio</span>
    </div>
  );
}

const skel = (w: string, h = 8) => (
  <div className="rounded-full" style={{ width: w, height: h, background: "rgba(0,0,0,.07)" }} />
);

export default async function AnunciarPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location } = await params;
  const loc = getActiveLocationBySlug(location) ?? getActiveLocationBySlug(DEFAULT_LOCATION)!;
  const [providers, categories, posts] = await Promise.all([
    getProviders(loc.slug),
    getCategories(),
    getAllPosts(loc.slug),
  ]);
  const providersCount = providers.length;
  const categoriesCount = categories.length;
  const samplePost = posts[0] ?? null;

  const AUDIENCE = [
    { icon: Users, title: "Turistas planeando a viagem", desc: "Visitantes que pesquisam serviços antes mesmo de chegar à ilha." },
    { icon: Home, title: "Donos de casa de temporada", desc: "Proprietários que precisam de serviços de confiança o ano todo." },
    { icon: Anchor, title: "Hóspedes e veranistas", desc: `Famílias e grupos que querem aproveitar ${loc.name} sem preocupações.` },
  ];

  const FAQ = [
    { q: "Quem vai ver o meu anúncio?", a: `Turistas, donos de casas de temporada e veranistas que usam o Daquii para encontrar serviços em ${loc.name} — exatamente o público que está prestes a gastar na ilha.` },
    { q: "Onde os anúncios aparecem?", a: "Depende do plano: banners na página inicial, nas páginas de categoria e nos perfis dos profissionais, além do logótipo no rodapé e posts patrocinados no blog para os planos superiores." },
    { q: "Como envio a minha arte?", a: "Após criar a conta, no painel do anunciante você envia a imagem do banner (formato 5:1, ex. 1200×240px). A nossa equipa revê e ativa o anúncio." },
    { q: "Posso cancelar quando quiser?", a: "Sim. A assinatura é mensal e pode ser cancelada a qualquer momento, sem multa." },
    { q: "Preciso de uma agência para criar o anúncio?", a: "Não. Basta uma imagem horizontal e o link de destino. Se precisar, damos as dimensões recomendadas e dicas no painel." },
  ];

  const stats: [string, string][] = [
    ["10.000+", "visitas por mês"],
    [`${providersCount}+`, "profissionais ativos"],
    [`${categoriesCount}`, "categorias de serviço"],
    ["100%", `foco em ${loc.name}`],
  ];

  return (
    <div>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(120% 90% at 80% -10%, rgba(28,122,105,.22), transparent 55%), radial-gradient(90% 80% at -10% 20%, rgba(226,100,63,.16), transparent 55%), var(--cream)" }} />
        <div className="relative max-w-6xl mx-auto px-5 pt-16 pb-12 md:pt-20 grid md:grid-cols-[1.05fr_.95fr] gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-medium mb-6"
              style={{ background: "#fff", border: "1px solid var(--line)", color: "var(--sea)" }}>
              <MapPin size={14} /> Para empresas · {loc.name}
            </div>
            <h1 className="serif leading-[1.04] tracking-tight" style={{ fontSize: "clamp(2.4rem,5.5vw,4rem)", fontWeight: 600 }}>
              Seja visto por quem<br /><span style={{ color: "var(--coral)" }}>chega em {loc.name}</span>
            </h1>
            <p className="mt-6 text-lg max-w-md" style={{ color: "var(--ink-soft)" }}>
              O Daquii conecta turistas, donos de casa de temporada e hóspedes aos melhores serviços da ilha. Coloque a sua marca diante deles no momento em que planeiam a estadia.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/anunciante/criar-conta" className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold text-white transition active:scale-95" style={{ background: "var(--sea)" }}>
                Começar agora <ArrowRight size={17} />
              </Link>
              <Link href="#planos" className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold transition active:scale-95" style={{ border: "1px solid var(--line)", color: "var(--ink)" }}>
                Ver planos e preços
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {stats.slice(0, 3).map(([n, l]) => (
                <div key={l}>
                  <div className="serif text-2xl" style={{ fontWeight: 600 }}>{n}</div>
                  <div className="text-sm" style={{ color: "var(--ink-soft)" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* hero mockup */}
          <div className="hidden sm:block">
            <BrowserFrame label="daquii.com">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="grid place-items-center w-5 h-5 rounded-md" style={{ background: "var(--sea)" }}><Anchor size={11} color="#fff" /></span>
                  {skel("70px", 7)}
                </div>
                <div className="flex gap-2">{skel("34px", 7)}{skel("44px", 7)}</div>
              </div>
              <AdMock />
              <div className="grid grid-cols-3 gap-2.5 mt-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="rounded-xl p-2.5" style={{ border: "1px solid var(--line)" }}>
                    <div className="rounded-lg mb-2" style={{ aspectRatio: "1/1", background: "rgba(0,0,0,.05)" }} />
                    {skel("80%", 6)}
                    <div className="mt-1.5">{skel("55%", 6)}</div>
                  </div>
                ))}
              </div>
            </BrowserFrame>
          </div>
        </div>
      </section>

      {/* ---------- AUDIENCE ---------- */}
      <section className="max-w-5xl mx-auto px-5 py-14">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="serif text-3xl" style={{ fontWeight: 600 }}>Um público que está prestes a gastar na ilha</h2>
          <p className="mt-3 text-lg" style={{ color: "var(--ink-soft)" }}>
            Quem usa o Daquii não está só a navegar — está a planear uma estadia em {loc.name} e a procurar em quem confiar.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {AUDIENCE.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-3xl p-7 bg-white" style={{ border: "1px solid var(--line)" }}>
              <span className="grid place-items-center w-11 h-11 rounded-2xl mb-4" style={{ background: "var(--sand)" }}>
                <Icon size={20} style={{ color: "var(--sea)" }} />
              </span>
              <h3 className="font-semibold text-lg mb-1.5">{title}</h3>
              <p className="text-sm" style={{ color: "var(--ink-soft)" }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- WHERE ADS APPEAR (mockups) ---------- */}
      <section className="py-14" style={{ background: "var(--sand)" }}>
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: "var(--sea)" }}>
              <Sparkles size={15} /> Onde a sua marca aparece
            </div>
            <h2 className="serif text-3xl" style={{ fontWeight: 600 }}>Espaços nobres por todo o site</h2>
            <p className="mt-3 text-lg" style={{ color: "var(--ink-soft)" }}>
              Do topo da página inicial às páginas de categoria e perfis dos profissionais.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Home banner */}
            <div>
              <BrowserFrame label="Página inicial">
                <div className="flex items-center justify-between mb-3">{skel("60px", 7)}<div className="flex gap-2">{skel("30px", 7)}{skel("38px", 7)}</div></div>
                <AdMock />
                <div className="grid grid-cols-3 gap-2 mt-3">{[0, 1, 2].map((i) => <div key={i} className="rounded-lg" style={{ aspectRatio: "1/1", background: "rgba(0,0,0,.05)" }} />)}</div>
              </BrowserFrame>
              <div className="flex items-center gap-2 mt-3 px-1">
                <Home size={16} style={{ color: "var(--sea)" }} />
                <span className="text-sm font-semibold">Banner da página inicial</span>
                <span className="text-xs ml-auto" style={{ color: "var(--ink-soft)" }}>1200×240px</span>
              </div>
            </div>

            {/* Category banner */}
            <div>
              <BrowserFrame label="Categoria · Chefs privativos">
                <div className="mb-3">{skel("120px", 9)}</div>
                <div className="rounded-lg mb-3 flex items-center gap-2 p-2" style={{ border: "1px solid var(--line)" }}>
                  <div className="w-9 h-9 rounded-lg shrink-0" style={{ background: "rgba(0,0,0,.06)" }} />
                  <div className="flex-1">{skel("70%", 6)}<div className="mt-1.5">{skel("45%", 6)}</div></div>
                </div>
                <AdMock />
                <div className="rounded-lg mt-3 flex items-center gap-2 p-2" style={{ border: "1px solid var(--line)" }}>
                  <div className="w-9 h-9 rounded-lg shrink-0" style={{ background: "rgba(0,0,0,.06)" }} />
                  <div className="flex-1">{skel("65%", 6)}<div className="mt-1.5">{skel("40%", 6)}</div></div>
                </div>
              </BrowserFrame>
              <div className="flex items-center gap-2 mt-3 px-1">
                <LayoutGrid size={16} style={{ color: "var(--sea)" }} />
                <span className="text-sm font-semibold">Banner de categoria</span>
                <span className="text-xs ml-auto" style={{ color: "var(--ink-soft)" }}>1000×200px</span>
              </div>
            </div>

            {/* Profile banner + footer logo */}
            <div>
              <BrowserFrame label="Perfil do profissional">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-full" style={{ background: "rgba(0,0,0,.06)" }} />
                  <div className="flex-1">{skel("60%", 7)}<div className="mt-1.5">{skel("40%", 6)}</div></div>
                </div>
                <div className="mb-3">{skel("100%", 6)}<div className="mt-1.5">{skel("85%", 6)}</div></div>
                <AdMock />
                <div className="flex items-center justify-center gap-2 mt-3 pt-3" style={{ borderTop: "1px solid var(--line)" }}>
                  <BadgeCheck size={13} style={{ color: "var(--sea)" }} />
                  <span className="text-[10px]" style={{ color: "var(--ink-soft)" }}>Parceiro Oficial · logótipo no rodapé</span>
                </div>
              </BrowserFrame>
              <div className="flex items-center gap-2 mt-3 px-1">
                <User size={16} style={{ color: "var(--sea)" }} />
                <span className="text-sm font-semibold">Banner de perfil + rodapé</span>
                <span className="text-xs ml-auto" style={{ color: "var(--ink-soft)" }}>1000×200px</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- PRICING ---------- */}
      <section id="planos" className="max-w-5xl mx-auto px-5 py-16 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="serif text-3xl" style={{ fontWeight: 600 }}>Escolha o seu alcance</h2>
          <p className="mt-3 text-lg" style={{ color: "var(--ink-soft)" }}>Planos mensais, sem fidelização. Cancele quando quiser.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {AD_PLANS.map((pl) => (
            <div key={pl.key} className="rounded-3xl p-7 flex flex-col"
              style={{ background: pl.accent ? "var(--sea)" : "#fff", color: pl.accent ? "#fff" : "var(--ink)",
                border: pl.accent ? "none" : "1px solid var(--line)", transform: pl.accent ? "scale(1.03)" : "none",
                boxShadow: pl.accent ? "0 30px 60px -30px rgba(14,91,78,.6)" : "none" }}>
              {pl.accent && <span className="self-start text-[11px] font-bold uppercase tracking-wide rounded-full px-2.5 py-1 mb-3" style={{ background: "var(--coral)", color: "#fff" }}>Mais escolhido</span>}
              <h3 className="serif text-2xl" style={{ fontWeight: 600 }}>{pl.name}</h3>
              <p className="text-sm mt-1" style={{ color: pl.accent ? "rgba(255,255,255,.8)" : "var(--ink-soft)" }}>{pl.blurb}</p>
              <div className="mt-4 mb-2">
                <span className="serif text-4xl" style={{ fontWeight: 600 }}>{brl(pl.price)}</span>
                <span className="text-sm" style={{ color: pl.accent ? "rgba(255,255,255,.7)" : "var(--ink-soft)" }}> / mês</span>
              </div>
              <ul className="mt-4 flex flex-col gap-2 text-sm flex-1">
                {pl.feats.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check size={16} strokeWidth={2.5} className="mt-0.5 shrink-0" style={{ color: pl.accent ? "var(--coral-soft)" : "var(--sea)" }} />
                    <span style={{ color: pl.accent ? "#fff" : "var(--ink-soft)" }}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/anunciante/criar-conta" className="mt-6 block text-center rounded-full py-3.5 font-semibold transition active:scale-95"
                style={pl.accent ? { background: "#fff", color: "var(--sea)" } : { background: "var(--ink)", color: "#fff" }}>
                Começar agora
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- SPONSORED BLOG POST EXAMPLE ---------- */}
      <section className="py-14" style={{ background: "var(--sand)" }}>
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto mb-9">
            <h2 className="serif text-3xl" style={{ fontWeight: 600 }}>Conte a sua história</h2>
            <p className="mt-3 text-lg" style={{ color: "var(--ink-soft)" }}>
              Planos Destaque e Parceiro incluem posts patrocinados no nosso blog — conteúdo que aparece em buscas e gera confiança.
            </p>
          </div>
          <article className="max-w-2xl mx-auto rounded-3xl overflow-hidden bg-white" style={{ border: "1px solid var(--line)" }}>
            <div className="relative">
              <img
                src={samplePost?.cover || "https://picsum.photos/seed/blog-sponsor/1200/630"}
                alt={samplePost?.title || "Post patrocinado"}
                referrerPolicy="no-referrer"
                className="w-full object-cover"
                style={{ aspectRatio: "1200 / 500" }}
              />
              <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide rounded-full px-2.5 py-1" style={{ background: "var(--coral)", color: "#fff" }}>
                <Sparkles size={12} /> Post patrocinado
              </span>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs mb-2" style={{ color: "var(--ink-soft)" }}>
                <span className="inline-flex items-center gap-1"><BadgeCheck size={13} style={{ color: "var(--sea)" }} /> Por uma marca parceira</span>
                <span>·</span>
                <span>Leitura de 4 min</span>
              </div>
              <h3 className="serif text-2xl leading-snug mb-2" style={{ fontWeight: 600 }}>
                {samplePost?.title || `Como aproveitar ${loc.name} com os serviços certos`}
              </h3>
              <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
                {samplePost?.description || "Um exemplo de conteúdo patrocinado que apresenta a sua empresa aos visitantes enquanto planeiam a viagem."}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold mt-4" style={{ color: "var(--sea)" }}>
                Ler artigo <ArrowRight size={15} />
              </span>
            </div>
          </article>
        </div>
      </section>

      {/* ---------- STATS BAND ---------- */}
      <section className="max-w-5xl mx-auto px-5 py-16">
        <div className="rounded-3xl p-8 md:p-10" style={{ background: "var(--sea)" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map(([n, l]) => (
              <div key={l}>
                <div className="serif text-white" style={{ fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 600 }}>{n}</div>
                <div className="text-sm mt-1" style={{ color: "rgba(255,255,255,.75)" }}>{l}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-8 pt-8 text-sm" style={{ borderTop: "1px solid rgba(255,255,255,.18)", color: "rgba(255,255,255,.85)" }}>
            <span className="inline-flex items-center gap-1.5"><Eye size={15} /> Impressões rastreadas</span>
            <span className="inline-flex items-center gap-1.5"><MousePointerClick size={15} /> Cliques rastreados</span>
            <span className="inline-flex items-center gap-1.5"><TrendingUp size={15} /> Relatórios no painel</span>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="max-w-3xl mx-auto px-5 pb-16">
        <h2 className="serif text-3xl text-center mb-8" style={{ fontWeight: 600 }}>Perguntas frequentes</h2>
        <div className="flex flex-col gap-3">
          {FAQ.map((item) => (
            <details key={item.q} className="group rounded-2xl bg-white p-5" style={{ border: "1px solid var(--line)" }}>
              <summary className="flex items-center justify-between cursor-pointer list-none font-semibold">
                {item.q}
                <span className="ml-3 shrink-0 transition group-open:rotate-45" style={{ color: "var(--sea)" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                </span>
              </summary>
              <p className="text-sm mt-3" style={{ color: "var(--ink-soft)" }}>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ---------- FINAL CTA ---------- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(120% 100% at 50% -20%, rgba(14,91,78,.18), transparent 60%), var(--cream)" }} />
        <div className="relative max-w-3xl mx-auto px-5 py-16 text-center">
          <h2 className="serif" style={{ fontSize: "clamp(2rem,4.5vw,3rem)", fontWeight: 600 }}>
            Pronto para aparecer em {loc.name}?
          </h2>
          <p className="mt-4 text-lg max-w-xl mx-auto" style={{ color: "var(--ink-soft)" }}>
            Crie a conta da sua empresa, escolha o plano e a nossa equipa ativa o seu anúncio após uma revisão rápida.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/anunciante/criar-conta" className="inline-flex items-center gap-2 rounded-full px-7 py-4 font-semibold text-white transition active:scale-95" style={{ background: "var(--sea)" }}>
              Criar conta de anunciante <ArrowRight size={17} />
            </Link>
            <Link href="/anunciante/entrar" className="inline-flex items-center rounded-full px-7 py-4 font-semibold transition active:scale-95" style={{ border: "1px solid var(--line)", color: "var(--ink)" }}>
              Já tenho conta
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
