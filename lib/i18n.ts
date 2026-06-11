// UI dictionary (Portuguese only). Provider-authored text (descriptions) is NOT translated here.
// Use {loc} anywhere the active location name should appear. The active location
// is URL-driven: pass `{ loc }` to t() (client components use the useT() hook,
// server pages pass the resolved location name). When no loc is given it falls
// back to the default active location.
import { ACTIVE_LOCATION_NAME } from "./locations";

export const DICT = {
  nav: { home: "Início", categories: "Categorias", servicesIn: "Serviços em {loc}", forProviders: "Para profissionais", advertise: "Anunciar serviço", findPros: "Buscar profissionais", blog: "Blog", about: "Sobre", advertise_link: "Anunciar", login: "Entrar", menu: "Menu" },
  loc: { choose: "Escolha a região", soon: "em breve", current: "Você está vendo" },
  hero: {
    titleA: "Pessoas de daqui,",
    accent: "para você.",
    sub: "Conectamos você a pessoas locais de confiança que tornam sua experiência incrível, sem complicação.",
    taglineA: "Tudo o que você precisa em {loc}, ",
    taglineB: "daqui.",
    ctaPrimary: "Encontrar serviços",
    statLabel: "profissionais locais",
  },
  grid: { heading: "O que você precisa em {loc}", seeAll: "Ver tudo" },
  featured: { tag: "Em destaque", heading: "Profissionais premium em {loc}" },
  ads: { label: "Publicidade", home: "Banner da página inicial", category: "Banner da categoria" },
  card: { from: "A partir de", halfDay: "/ meio dia" },
  results: {
    placeholder: "Buscar profissional, serviço ou idioma...", all: "Todos",
    allTitle: "Profissionais em {loc}", inLocation: "em {loc}", result: "resultado", results: "resultados",
    emptyTitle: "Nada encontrado", emptySub: "Tente outra busca ou categoria.",
  },
  profile: {
    verified: "Identidade verificada", photo: "Foto de perfil", about: "Sobre {name}",
    gallery: "Galeria", rates: "Valores", fullDay: "Diária", hourly: "Por hora", halfDay: "/ meio dia",
    call: "Ligar", note: "Contacto direto. Sem reservas, sem comissão.", more: "Outros em {cat}",
  },
  video: { caption: "Vídeo de apresentação · 0:24", playing: "Tocando · vídeo de apresentação", muted: "autoplay sem som" },
  pricing: {
    tag: "Para profissionais", titleA: "Sua cara, vista por", titleB: "quem visita a ilha.",
    sub: "Apareça para turistas, donos de casas de temporada e moradores. Sem comissão por contacto, você fala direto com o cliente.",
    popular: "Mais popular", perMonth: "/ mês", choose: "Escolher {name}", wait: "Aguarde...",
    notConfigured: "Pagamentos ainda não configurados (Stripe stub).",
    failed: "Não foi possível iniciar o pagamento.",
    howTitle: "Como começar", howSub: "Do cadastro à publicação em 3 passos.",
    steps: ["Criar conta", "Completar perfil", "Publicar"],
    freeBanner: "Comece grátis por 60 dias — sem cartão de crédito",
    afterTrial: "Após 60 dias grátis",
    freeName: "Grátis", freePrice: "R$0", freePeriod: "por 60 dias",
    freeBlurb: "Tudo para começar a ser encontrado.",
    freeCta: "Começar grátis",
    freeFeats: ["Perfil completo publicado", "Apareça nas buscas", "Receba contactos pelo WhatsApp", "Sem cartão de crédito"],
  },
  plans: {
    standard: { blurb: "Para começar a aparecer.", feats: ["Perfil na lista", "Página de perfil", "Contacto direto", "Galeria de fotos"] },
    featured: { blurb: "Mais visto, mais procurado.", feats: ["Colocação mais alta", "Selo Featured", "Mais visibilidade", "Tudo do Standard"] },
    premium: { blurb: "O topo da ilha.", feats: ["Topo da categoria", "Destaque na home", "Selo Premium", "Visibilidade máxima"] },
  },
  testimonials: {
    customersTag: "Avaliações", customersTitle: "Quem contratou, recomenda",
    customersSub: "O que turistas e moradores dizem sobre os profissionais encontrados no Daquii.",
    providersTag: "Profissionais", providersTitle: "Quem anuncia, é encontrado",
    providersSub: "O que os profissionais do Daquii têm a dizer sobre estar na plataforma.",
  },
  seo: {
    heading: "Serviços de confiança em {loc}, na palma da mão",
    body: [
      "O Daquii reúne os melhores profissionais locais de {loc} num só lugar: chefs privativos, motoristas, babás, capitães de barco, faxineiras, massoterapeutas, fotógrafos, guias e concierges. Cada perfil mostra o rosto, os idiomas e os valores de quem vai te atender.",
      "Seja para um jantar na casa de temporada, um transfer do aeroporto até a balsa de São Sebastião ou um passeio de lancha até a Praia do Bonete, você encontra o profissional certo e fala direto pelo WhatsApp. Sem reservas complicadas e sem comissão.",
      "Tudo pensado para o celular: encontre, veja o vídeo de apresentação e contacte em segundos, de onde estiver na ilha.",
    ],
    popular: "Categorias populares",
  },
  faq: {
    title: "Perguntas frequentes",
    sub: "Tudo o que você precisa saber sobre o Daquii em {loc}.",
    items: [
      { q: "O Daquii cobra comissão em {loc}?", a: "Não. Você fala direto com o profissional pelo WhatsApp ou telefone. O Daquii apenas conecta você a quem presta o serviço em {loc}." },
      { q: "Como contrato um profissional em {loc}?", a: "Busque pela categoria ou pelo nome, abra o perfil, veja o vídeo de apresentação e os valores, e toque em WhatsApp para combinar tudo direto com a pessoa." },
      { q: "Os profissionais em {loc} são verificados?", a: "Profissionais com o selo de identidade verificada passaram por checagem de documento. Todos exibem foto real e uma descrição clara do serviço que oferecem." },
      { q: "Quais serviços encontro em {loc}?", a: "Chefs privativos, motoristas e transfers, limpeza, babás, passeios de barco, bem-estar e massagem, reparos, fotografia, concierge e guias de turismo." },
      { q: "Quais profissionais estão disponíveis em {loc}?", a: "Você encontra chefs privativos, motoristas, babás, capitães de barco, faxineiras, massoterapeutas, fotógrafos, concierges e guias de turismo, todos locais e com perfil completo." },
      { q: "É para turistas ou para moradores de {loc}?", a: "Para os dois. Turistas, donos de casas de temporada, hóspedes de Airbnb e moradores usam o Daquii para encontrar quem resolve em {loc}." },
      { q: "Vão atender outras cidades além de {loc}?", a: "Começamos por {loc}. Em breve vamos expandir para outras regiões do litoral." },
    ],
  },
  sobre: {
    title: "Sobre o Daquii em {loc}",
    lead: "O jeito mais simples de encontrar profissionais locais de confiança em {loc}.",
    body: [
      "O Daquii nasceu de uma ideia simples: na hora de contratar um chef, um motorista ou uma babá em {loc}, as pessoas escolhem pessoas. Por isso o rosto, o nome e a voz de cada profissional vêm em primeiro lugar.",
      "Reunimos os profissionais locais de {loc} em perfis claros, com foto, idiomas, valores e um vídeo curto de apresentação. Você compara, escolhe e fala direto pelo WhatsApp. Sem intermediários, sem comissão e sem complicação.",
      "Estamos começando por {loc}, mas a ideia é levar o Daquii para todo o litoral. Se você é profissional na ilha, anuncie o seu serviço e seja encontrado por quem está chegando.",
    ],
  },
  blog: {
    title: "Blog", sub: "Dicas e guias para aproveitar {loc} ao máximo.",
    readMore: "Ler mais", by: "por", min: "min de leitura", back: "Voltar ao blog",
    published: "Publicado em", empty: "Em breve, novos artigos.", related: "Veja também",
  },
  reviews: {
    title: "Avaliações",
    based: "{count} avaliação", basedPlural: "{count} avaliações",
    empty: "Seja a primeira pessoa a avaliar {name}.",
    moderated: "As avaliações passam por revisão antes de aparecer.",
    leave: "Deixe sua avaliação", cancel: "Cancelar",
    yourName: "Seu nome", yourRating: "Sua nota", yourComment: "Conte como foi sua experiência",
    submit: "Enviar avaliação", sending: "Enviando...",
    thanks: "Obrigado! Sua avaliação será publicada após revisão.",
    errorName: "Informe seu nome.", errorRating: "Escolha uma nota.", errorComment: "Escreva um comentário.",
    failed: "Não foi possível enviar. Tente novamente.",
    notConfigured: "Avaliações ainda não disponíveis nesta versão de demonstração.",
  },
  footer: { tagline: "Tudo o que você precisa, daqui.", categories: "Categorias", platform: "Plataforma", resources: "Conteúdo" },
  cats: {
    "private-chefs": "Chefs Privativos", "drivers": "Motoristas", "house-cleaning": "Limpeza", "babysitters": "Babás",
    "boat-services": "Passeios de Barco", "wellness": "Bem-estar", "handymen": "Reparos", "photography": "Fotografia",
    "concierge": "Concierge", "tour-guides": "Guias de Turismo",
  },
};

function get(obj: any, path: string) {
  return path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

// Recursively fills placeholders. {loc} always resolves to the active location
// name; other {keys} resolve from vars (preserving the original behaviour where
// a provided-but-missing key becomes "" and untouched keys stay literal).
function fill(value: any, vars?: Record<string, string | number>): any {
  if (typeof value === "string") {
    return value.replace(/\{(\w+)\}/g, (match, k) => {
      if (k === "loc") return vars?.loc != null ? String(vars.loc) : ACTIVE_LOCATION_NAME;
      if (vars) return String(vars[k] ?? "");
      return match;
    });
  }
  if (Array.isArray(value)) return value.map((item) => fill(item, vars));
  if (value && typeof value === "object") {
    const out: Record<string, any> = {};
    for (const k in value) out[k] = fill(value[k], vars);
    return out;
  }
  return value;
}

export function t(key: string, vars?: Record<string, string | number>): any {
  const v = get(DICT, key);
  if (v === undefined) return key;
  return fill(v, vars);
}

export function catSearchTerms(slug: string) {
  return (DICT.cats as Record<string, string>)[slug] ?? "";
}
