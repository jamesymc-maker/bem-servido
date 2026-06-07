export type Lang = "pt" | "en";

// UI dictionary. Provider-authored text (descriptions) is NOT translated here.
export const DICT: Record<Lang, any> = {
  pt: {
    nav: { home: "Início", categories: "Categorias", forProviders: "Para profissionais", advertise: "Anunciar serviço", findPros: "Buscar profissionais", blog: "Blog", about: "Sobre", advertise_link: "Anunciar", login: "Entrar", menu: "Menu" },
    loc: { choose: "Escolha a região", soon: "em breve", current: "Você está vendo" },
    hero: {
      badge: "Ilhabela · São Paulo, Brasil",
      titleA: "As pessoas que", titleB: "tornam Ilhabela", accent: "mais fácil.",
      sub: "Chefs, motoristas, babás, capitães de barco e mais. Profissionais locais de confiança, gente de verdade com rosto e nome.",
      placeholder: "Chef, motorista, babá, barco...", search: "Buscar",
      quick: ["Chef", "Motorista", "Babá", "Barco"],
      statLabel: "profissionais locais",
    },
    grid: { heading: "O que você precisa?", seeAll: "Ver tudo" },
    featured: { tag: "Em destaque", heading: "Profissionais premium" },
    ads: { label: "Publicidade", home: "Banner da página inicial", category: "Banner da categoria" },
    card: { from: "A partir de", halfDay: "/ meio dia" },
    results: {
      placeholder: "Buscar profissional, serviço ou idioma...", all: "Todos",
      allTitle: "Todos os profissionais", result: "resultado", results: "resultados",
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
      howTitle: "Como começar", howSub: "Do cadastro à publicação em 8 passos.",
      steps: ["Criar conta", "Escolher plano", "Completar perfil", "Enviar fotos", "Enviar vídeo", "Pagar", "Revisão", "Publicado"],
    },
    plans: {
      standard: { blurb: "Para começar a aparecer.", feats: ["Perfil na lista", "Página de perfil", "Contacto direto", "Galeria de fotos"] },
      featured: { blurb: "Mais visto, mais procurado.", feats: ["Colocação mais alta", "Selo Featured", "Mais visibilidade", "Tudo do Standard"] },
      premium: { blurb: "O topo da ilha.", feats: ["Topo da categoria", "Destaque na home", "Selo Premium", "Visibilidade máxima"] },
    },
    testimonials: {
      customersTag: "Avaliações", customersTitle: "Quem contratou, recomenda",
      customersSub: "O que turistas e moradores dizem sobre os profissionais encontrados no Bem Servido.",
      providersTag: "Profissionais", providersTitle: "Quem anuncia, é encontrado",
      providersSub: "O que os profissionais do Bem Servido têm a dizer sobre estar na plataforma.",
    },
    seo: {
      heading: "Serviços de confiança em Ilhabela, na palma da mão",
      body: [
        "O Bem Servido reúne os melhores profissionais locais de Ilhabela num só lugar: chefs privativos, motoristas, babás, capitães de barco, faxineiras, massoterapeutas, fotógrafos, guias e concierges. Cada perfil mostra o rosto, os idiomas e os valores de quem vai te atender.",
        "Seja para um jantar na casa de temporada, um transfer do aeroporto até a balsa de São Sebastião ou um passeio de lancha até a Praia do Bonete, você encontra o profissional certo e fala direto pelo WhatsApp. Sem reservas complicadas e sem comissão.",
        "Tudo pensado para o celular: encontre, veja o vídeo de apresentação e contacte em segundos, de onde estiver na ilha.",
      ],
      popular: "Categorias populares",
    },
    faq: {
      title: "Perguntas frequentes",
      sub: "Tudo o que você precisa saber sobre o Bem Servido.",
      items: [
        { q: "O Bem Servido cobra comissão?", a: "Não. Você fala direto com o profissional pelo WhatsApp ou telefone. O Bem Servido apenas conecta você a quem presta o serviço." },
        { q: "Como contrato um profissional?", a: "Busque pela categoria ou pelo nome, abra o perfil, veja o vídeo de apresentação e os valores, e toque em WhatsApp para combinar tudo direto com a pessoa." },
        { q: "Os profissionais são verificados?", a: "Profissionais com o selo de identidade verificada passaram por checagem de documento. Todos exibem foto real e uma descrição clara do serviço que oferecem." },
        { q: "Quais serviços encontro em Ilhabela?", a: "Chefs privativos, motoristas e transfers, limpeza, babás, passeios de barco, bem-estar e massagem, reparos, fotografia, concierge e guias de turismo." },
        { q: "É para turistas ou para moradores?", a: "Para os dois. Turistas, donos de casas de temporada, hóspedes de Airbnb e moradores usam o Bem Servido para encontrar quem resolve." },
        { q: "Vão atender outras cidades?", a: "Começamos por Ilhabela. Em breve vamos expandir para outras regiões do litoral." },
      ],
    },
    sobre: {
      title: "Sobre o Bem Servido",
      lead: "O jeito mais simples de encontrar profissionais locais de confiança em Ilhabela.",
      body: [
        "O Bem Servido nasceu de uma ideia simples: na hora de contratar um chef, um motorista ou uma babá em Ilhabela, as pessoas escolhem pessoas. Por isso o rosto, o nome e a voz de cada profissional vêm em primeiro lugar.",
        "Reunimos profissionais locais em perfis claros, com foto, idiomas, valores e um vídeo curto de apresentação. Você compara, escolhe e fala direto pelo WhatsApp. Sem intermediários, sem comissão e sem complicação.",
        "Estamos começando por Ilhabela, mas a ideia é levar o Bem Servido para todo o litoral. Se você é profissional na ilha, anuncie o seu serviço e seja encontrado por quem está chegando.",
      ],
    },
    blog: {
      title: "Blog", sub: "Dicas e guias para aproveitar Ilhabela ao máximo.",
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
    footer: { tagline: "O diretório de profissionais locais de confiança de Ilhabela. Gente de verdade, com rosto e nome.", categories: "Categorias", platform: "Plataforma", resources: "Conteúdo" },
    cats: {
      "private-chefs": "Chefs Privativos", "drivers": "Motoristas", "house-cleaning": "Limpeza", "babysitters": "Babás",
      "boat-services": "Passeios de Barco", "wellness": "Bem-estar", "handymen": "Reparos", "photography": "Fotografia",
      "concierge": "Concierge", "tour-guides": "Guias de Turismo",
    },
  },
  en: {
    nav: { home: "Home", categories: "Categories", forProviders: "For providers", advertise: "List your service", findPros: "Find professionals", blog: "Blog", about: "About", advertise_link: "Advertise", login: "Log in", menu: "Menu" },
    loc: { choose: "Choose a region", soon: "coming soon", current: "You are viewing" },
    hero: {
      badge: "Ilhabela · São Paulo, Brazil",
      titleA: "The people who", titleB: "make Ilhabela", accent: "effortless.",
      sub: "Chefs, drivers, babysitters, boat captains and more. Trusted local professionals, real people you can see by name and face.",
      placeholder: "Chef, driver, babysitter, boat...", search: "Search",
      quick: ["Chef", "Driver", "Babysitter", "Boat"],
      statLabel: "local professionals",
    },
    grid: { heading: "What do you need?", seeAll: "See all" },
    featured: { tag: "Featured", heading: "Premium professionals" },
    ads: { label: "Advertisement", home: "Homepage banner", category: "Category banner" },
    card: { from: "From", halfDay: "/ half day" },
    results: {
      placeholder: "Search by name, service or language...", all: "All",
      allTitle: "All professionals", result: "result", results: "results",
      emptyTitle: "Nothing found", emptySub: "Try another search or category.",
    },
    profile: {
      verified: "Identity verified", photo: "Profile photo", about: "About {name}",
      gallery: "Gallery", rates: "Rates", fullDay: "Full day", hourly: "Per hour", halfDay: "/ half day",
      call: "Call", note: "Direct contact. No bookings, no commission.", more: "More in {cat}",
    },
    video: { caption: "Intro video · 0:24", playing: "Playing · intro video", muted: "autoplays muted" },
    pricing: {
      tag: "For providers", titleA: "Your face, seen by", titleB: "everyone visiting the island.",
      sub: "Get seen by tourists, holiday-home owners and locals. No per-lead commission, you talk to the client directly.",
      popular: "Most popular", perMonth: "/ mo", choose: "Choose {name}", wait: "Please wait...",
      notConfigured: "Payments not configured yet (Stripe stub).",
      failed: "Could not start the payment.",
      howTitle: "How to start", howSub: "From signup to live in 8 steps.",
      steps: ["Create account", "Choose plan", "Complete profile", "Upload photos", "Upload video", "Pay", "Review", "Live"],
    },
    plans: {
      standard: { blurb: "Start showing up.", feats: ["Directory listing", "Profile page", "Direct contact", "Photo gallery"] },
      featured: { blurb: "More seen, more booked.", feats: ["Higher placement", "Featured badge", "More visibility", "Everything in Standard"] },
      premium: { blurb: "Top of the island.", feats: ["Top of category", "Homepage feature", "Premium badge", "Maximum visibility"] },
    },
    testimonials: {
      customersTag: "Reviews", customersTitle: "Hired and recommended",
      customersSub: "What tourists and locals say about the professionals they found on Bem Servido.",
      providersTag: "Professionals", providersTitle: "List and get found",
      providersSub: "What Bem Servido professionals say about being on the platform.",
    },
    seo: {
      heading: "Trusted local services in Ilhabela, in your pocket",
      body: [
        "Bem Servido brings together the best local professionals in Ilhabela in one place: private chefs, drivers, babysitters, boat captains, cleaners, massage therapists, photographers, guides and concierges. Every profile shows the face, the languages and the rates of the person who will help you.",
        "Whether it is a dinner at your holiday home, an airport transfer to the São Sebastião ferry, or a boat trip to Bonete beach, you find the right professional and message them directly on WhatsApp. No complicated bookings and no commission.",
        "Built for your phone: find, watch the intro video and get in touch in seconds, from anywhere on the island.",
      ],
      popular: "Popular categories",
    },
    faq: {
      title: "Frequently asked questions",
      sub: "Everything you need to know about Bem Servido.",
      items: [
        { q: "Does Bem Servido charge commission?", a: "No. You talk to the professional directly on WhatsApp or by phone. Bem Servido simply connects you to the person providing the service." },
        { q: "How do I hire a professional?", a: "Search by category or name, open the profile, watch the intro video and check the rates, then tap WhatsApp to arrange everything directly with them." },
        { q: "Are the professionals verified?", a: "Professionals with the verified identity badge have had their ID checked. Every profile shows a real photo and a clear description of the service offered." },
        { q: "What services can I find in Ilhabela?", a: "Private chefs, drivers and transfers, cleaning, babysitters, boat trips, wellness and massage, handymen, photography, concierge and tour guides." },
        { q: "Is it for tourists or for locals?", a: "Both. Tourists, holiday-home owners, Airbnb guests and residents use Bem Servido to find someone who gets things done." },
        { q: "Will you cover other towns?", a: "We are starting with Ilhabela. We will expand to other coastal regions soon." },
      ],
    },
    sobre: {
      title: "About Bem Servido",
      lead: "The simplest way to find trusted local professionals in Ilhabela.",
      body: [
        "Bem Servido started from a simple idea: when hiring a chef, a driver or a babysitter in Ilhabela, people choose people. That is why the face, the name and the voice of each professional come first.",
        "We gather local professionals into clear profiles, with a photo, languages, rates and a short intro video. You compare, choose and message them directly on WhatsApp. No middlemen, no commission and no hassle.",
        "We are starting in Ilhabela, but the plan is to bring Bem Servido to the whole coast. If you are a professional on the island, list your service and get found by the people arriving.",
      ],
    },
    blog: {
      title: "Blog", sub: "Tips and guides to make the most of Ilhabela.",
      readMore: "Read more", by: "by", min: "min read", back: "Back to blog",
      published: "Published on", empty: "New articles coming soon.", related: "See also",
    },
    reviews: {
      title: "Reviews",
      based: "{count} review", basedPlural: "{count} reviews",
      empty: "Be the first to review {name}.",
      moderated: "Reviews are checked before they appear.",
      leave: "Write a review", cancel: "Cancel",
      yourName: "Your name", yourRating: "Your rating", yourComment: "Tell us about your experience",
      submit: "Submit review", sending: "Sending...",
      thanks: "Thank you! Your review will be published after a quick check.",
      errorName: "Please enter your name.", errorRating: "Please pick a rating.", errorComment: "Please write a comment.",
      failed: "Could not send. Please try again.",
      notConfigured: "Reviews are not available in this demo build yet.",
    },
    footer: { tagline: "The directory of trusted local professionals in Ilhabela. Real people, with a face and a name.", categories: "Categories", platform: "Platform", resources: "Content" },
    cats: {
      "private-chefs": "Private Chefs", "drivers": "Drivers", "house-cleaning": "House Cleaning", "babysitters": "Babysitters",
      "boat-services": "Boat Services", "wellness": "Wellness", "handymen": "Handymen", "photography": "Photography",
      "concierge": "Concierge", "tour-guides": "Tour Guides",
    },
  },
};

function get(obj: any, path: string) {
  return path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);
}
export function translate(lang: Lang, key: string, vars?: Record<string, string | number>) {
  const v = get(DICT[lang], key);
  if (v === undefined) return key;
  if (typeof v === "string" && vars) return v.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
  return v;
}
export function catSearchTerms(slug: string) {
  return [DICT.pt.cats[slug], DICT.en.cats[slug]].filter(Boolean).join(" ");
}
