// ============================================================================
// SAMPLE / PLACEHOLDER testimonials. These are illustrative only.
// Replace with REAL, consented quotes before going live. Publishing invented
// testimonials or earnings claims to consumers is deceptive advertising under
// Brazilian law (CDC / CONAR). Collect genuine quotes from your first users.
// ============================================================================
export interface Testimonial {
  name: string;
  meta: string;        // location / role
  avatar: string;
  quote: string;       // kept in Portuguese (author content), like provider bios
  rating: number;      // 1-5
  stat?: string;       // optional highlight (provider side)
  statLabel?: string;
}

const face = (g: string, n: number) => `https://randomuser.me/api/portraits/${g}/${n}.jpg`;

// Customers who hired professionals (shown on the homepage)
export const CUSTOMER_TESTIMONIALS: Testimonial[] = [
  { name: "Ana Paula M.", meta: "Hóspede de temporada · Vila", avatar: face("women", 33), rating: 5,
    quote: "A chef chegou no horário, super simpática, e o jantar foi impecável. Respondeu tudo pelo WhatsApp em minutos. Voltaria a contratar sem pensar duas vezes." },
  { name: "Roberto T.", meta: "Dono de casa · Norte da Ilha", avatar: face("men", 51), rating: 5,
    quote: "Precisava de um motorista de confiança para a família e achei aqui em segundos. Pontual, educado e conhece a ilha como ninguém." },
  { name: "Marina S.", meta: "Turista de São Paulo", avatar: face("women", 26), rating: 5,
    quote: "Contratei uma babá para poder jantar fora com meu marido. Atenciosa, carinhosa com as crianças e muito profissional. Tranquilidade total." },
  { name: "Carlos e família", meta: "Feriado em Castelhanos", avatar: face("men", 12), rating: 5,
    quote: "O passeio de barco foi o ponto alto da viagem. Capitão atencioso, parou nas melhores praias e cuidou de tudo. Recomendo de olhos fechados." },
  { name: "Juliana R.", meta: "Airbnb · Perequê", avatar: face("women", 47), rating: 5,
    quote: "A faxineira deixou a casa impecável para o check-in dos hóspedes. Responsável e caprichosa. Já virou parceira fixa." },
  { name: "Felipe A.", meta: "Lua de mel", avatar: face("men", 64), rating: 5,
    quote: "Fotógrafo incrível, gentil e cheio de ideias. As fotos ficaram lindas e ainda nos mostrou cantos da ilha que nem conhecíamos." },
];

// Professionals who advertise on Bem Servido (shown on the /precos page)
export const PROVIDER_TESTIMONIALS: Testimonial[] = [
  { name: "João Oliveira", meta: "Motorista · Ilhabela", avatar: face("men", 32), rating: 5,
    stat: "Vários transfers", statLabel: "todo mês",
    quote: "Os clientes me acham aqui e falam comigo direto pelo WhatsApp. Não pago comissão por contacto e minha agenda na alta temporada fica cheia." },
  { name: "Maria Santos", meta: "Chef privativa · Ilhabela", avatar: face("women", 44), rating: 5,
    stat: "Renda extra", statLabel: "na temporada",
    quote: "O perfil com vídeo fez toda a diferença. As pessoas veem meu rosto e meu trabalho antes de chamar. Fechei muito mais jantares desde que entrei." },
  { name: "Beatriz Costa", meta: "Massoterapeuta · Ilhabela", avatar: face("women", 12), rating: 5,
    stat: "Clientes novos", statLabel: "toda semana",
    quote: "Sempre dependi do boca a boca. Agora os turistas me encontram sozinhos e marcam atendimento em casa. Mudou o meu verão." },
];
