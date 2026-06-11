-- Seed existing blog posts into Supabase.
-- Run AFTER 0003_blog_posts.sql

insert into blog_posts (slug,title,description,content,date,author,cover_url,category_slug,tags,lang,published)
values (
  'como-contratar-chef-privativo-ilhabela',
  'Como contratar um chef privativo em Ilhabela',
  'Tudo o que você precisa saber para ter um chef cozinhando na sua casa de temporada em Ilhabela: o que combinar, quanto custa e como escolher.',
  $content$Imagine chegar do mar, abrir a porta da casa e sentir o cheiro de um peixe fresco na brasa, sem ter levantado um dedo. Em Ilhabela, contratar um **chef privativo** virou uma das formas mais procuradas de aproveitar as férias com a família e os amigos.

## Por que vale a pena

Um chef em casa resolve o problema mais chato das férias: pensar no que comer e ainda cozinhar. Você combina o menu, o chef leva os ingredientes, prepara tudo na sua cozinha e ainda deixa a louça limpa. O tempo que sobra é seu, para a praia, a trilha ou simplesmente o descanso.

## O que combinar antes

- **Número de pessoas** e se há crianças ou restrições alimentares.
- **Tipo de refeição**: jantar, almoço de barco, café da manhã reforçado ou um evento especial.
- **Estilo**: frutos do mar locais, comida caseira brasileira ou um menu de degustação.
- **Data e horário**, com alguns dias de antecedência na alta temporada.

## Quanto custa

Os valores variam conforme o menu e o número de convidados. Em Ilhabela é comum encontrar meio período a partir de R$320 a R$400, com a diária e ingredientes combinados à parte. O melhor é falar direto com o profissional e alinhar tudo antes.

## Como escolher no Daquii

No Daquii cada chef tem um perfil com foto, idiomas, valores e um vídeo curto de apresentação. Você vê quem vai cozinhar para você antes de fechar. Compare os perfis de [chefs privativos](/servicos/private-chefs), assista aos vídeos e fale direto pelo WhatsApp.

Bom apetite e boas férias na ilha.$content$,
  '2026-05-28',
  'Equipe Daquii',
  'https://picsum.photos/seed/blog-chef/1200/630',
  'private-chefs',
  array['chef privativo','gastronomia','casa de temporada']::text[],
  'pt',
  true
) on conflict (slug) do nothing;

insert into blog_posts (slug,title,description,content,date,author,cover_url,category_slug,tags,lang,published)
values (
  'melhores-praias-ilhabela-de-barco',
  'As praias de Ilhabela que só se chega de barco',
  'Bonete, Castelhanos e os cantos escondidos do sul da ilha: um guia das praias mais bonitas de Ilhabela e como visitá-las com um capitão local.',
  $content$Ilhabela tem mais de 40 praias, e algumas das mais bonitas não têm estrada. Para chegar nelas, a melhor forma é o mar, com um **capitão local** que conhece cada enseada.

## Bonete

Eleita várias vezes uma das praias mais bonitas do Brasil, o Bonete é um vilarejo de pescadores cercado por mata. Dá para chegar por trilha, mas o passeio de barco é mais tranquilo e ainda rende paradas para mergulho no caminho.

## Castelhanos

Do outro lado da ilha, a Baía de Castelhanos é um clássico. O acesso por terra é por estrada de terra que exige 4x4, então muita gente prefere ir de lancha, aproveitando o dia entre o mar aberto e a areia.

## Os cantos escondidos

Saco do Sombrio, Praia da Figueira, Saco do Eustáquio: nomes que só os locais conhecem de verdade. Um capitão experiente monta o roteiro conforme o vento e o mar do dia, com paradas para almoço e para ver o pôr do sol na água.

## Reserve o seu passeio

Compare os [capitães e passeios de barco](/servicos/boat-services) no Daquii. Cada perfil mostra o profissional, o tipo de embarcação e os valores. Fale direto pelo WhatsApp e garanta o seu dia no mar.$content$,
  '2026-05-12',
  'Equipe Daquii',
  'https://picsum.photos/seed/blog-boat/1200/630',
  'boat-services',
  array['praias','passeio de barco','bonete','castelhanos']::text[],
  'pt',
  true
) on conflict (slug) do nothing;

insert into blog_posts (slug,title,description,content,date,author,cover_url,category_slug,tags,lang,published)
values (
  'transfer-transporte-ilhabela-aeroporto-balsa',
  'Transfer e transporte em Ilhabela: do aeroporto à balsa',
  'Como chegar a Ilhabela sem stress: opções de transfer dos aeroportos de São Paulo, a travessia de balsa e o motorista privado na ilha.',
  $content$Chegar a Ilhabela tem um charme próprio: a ilha só é acessível de **balsa**, saindo de São Sebastião. Com um pouco de planeamento, a viagem do aeroporto até a sua casa de temporada pode ser tranquila do começo ao fim.

## Dos aeroportos até São Sebastião

A maioria dos visitantes chega por Guarulhos (GRU) ou Congonhas (CGH), em São Paulo. São cerca de 200 km até São Sebastião, com paisagem de Mata Atlântica no trecho final. Um **motorista privado** monitora o seu voo, ajusta o horário se houver atraso e acompanha a travessia de balsa.

## A travessia de balsa

A balsa liga São Sebastião ao Perequê, em Ilhabela, em cerca de 15 a 20 minutos. Na alta temporada e em feriados a fila pode crescer, então vale combinar horários com folga. Veículos e passageiros embarcam juntos.

## Já na ilha

Dentro de Ilhabela, um motorista local faz toda a diferença para conhecer as praias do sul pela Estrada da Costa, ir a restaurantes ou simplesmente não se preocupar com estacionamento. Muitos profissionais também ficam à disposição por meio período ou diária.

## Encontre o seu motorista

Veja os perfis de [motoristas e transfers](/servicos/drivers) no Daquii, com foto, idiomas e valores. Fale direto pelo WhatsApp e combine a busca no aeroporto ou o passeio pela ilha.$content$,
  '2026-05-20',
  'Equipe Daquii',
  'https://picsum.photos/seed/blog-transfer/1200/630',
  'drivers',
  array['transfer','transporte','balsa','aeroporto']::text[],
  'pt',
  true
) on conflict (slug) do nothing;
