-- Bem Servido seed data. Run AFTER 0001_init.sql.
insert into locations (slug,name,region,country,active,sort) values
  ('ilhabela','Ilhabela','São Paulo','Brasil',true,1),
  ('maresias','Maresias','São Paulo','Brasil',false,2),
  ('ubatuba','Ubatuba','São Paulo','Brasil',false,3),
  ('buzios','Búzios','Rio de Janeiro','Brasil',false,4)
on conflict (slug) do update set name=excluded.name, region=excluded.region, active=excluded.active, sort=excluded.sort;

insert into categories (slug,label,icon,sort) values
  ('private-chefs','Chefs Privativos','chef',1),
  ('drivers','Motoristas','driver',2),
  ('house-cleaning','Limpeza','cleaning',3),
  ('babysitters','Babás','baby',4),
  ('boat-services','Passeios de Barco','boat',5),
  ('wellness','Bem-estar','wellness',6),
  ('handymen','Reparos','handyman',7),
  ('photography','Fotografia','photo',8),
  ('concierge','Concierge','concierge',9),
  ('tour-guides','Guias de Turismo','guide',10)
on conflict (slug) do update set icon=excluded.icon, sort=excluded.sort;

delete from providers where owner_id is null;

with c as (select id from categories where slug='private-chefs'),
loc as (select id from locations where slug='ilhabela'),
ins as (
  insert into providers (slug,name,category_id,location_id,tier,status,verified,photo_url,languages,service_area,short_desc,long_desc,half_day_rate,full_day_rate,hourly_rate,phone,whatsapp)
  select 'maria-santos','Maria Santos',c.id,loc.id,'premium','published',true,'https://randomuser.me/api/portraits/women/44.jpg',array['Português','English','Español']::text[],'Vila & Sul da Ilha','Cozinha de praia autoral com frutos do mar locais, servida na sua casa.','Cheguei a Ilhabela há 12 anos vinda de São Paulo e nunca mais quis sair. Cozinho menus de degustação com peixe fresco do dia, banana-da-terra, palmito pupunha e tudo que a ilha oferece. Atendo jantares íntimos, almoços de barco e celebrações em casas de temporada. Levo tudo: ingredientes, equipa e a louça. Você só relaxa.',400,700,90,'+5512991234501','+5512991234501' from c, loc
  returning id
)
insert into provider_gallery (provider_id,url,sort) select ins.id,g.url,g.ord from ins,
  (values ('https://picsum.photos/seed/ilha-chefa/800/600',0), ('https://picsum.photos/seed/ilha-chefb/800/600',1), ('https://picsum.photos/seed/ilha-chefc/800/600',2), ('https://picsum.photos/seed/ilha-chefd/800/600',3)) as g(url,ord);

with c as (select id from categories where slug='drivers'),
loc as (select id from locations where slug='ilhabela'),
ins as (
  insert into providers (slug,name,category_id,location_id,tier,status,verified,photo_url,languages,service_area,short_desc,long_desc,half_day_rate,full_day_rate,hourly_rate,phone,whatsapp)
  select 'joao-oliveira','João Oliveira',c.id,loc.id,'premium','published',true,'https://randomuser.me/api/portraits/men/32.jpg',array['Português','English']::text[],'Toda a ilha + Continente','Transfers do aeroporto, passeios pela ilha e motorista privado o dia todo.','Sou motorista há 15 anos e conheço cada curva da Estrada da Costa. Faço transfer de São Sebastião e dos aeroportos de São Paulo, tours pelas praias do sul e estou disponível para o que a sua família precisar durante a estadia. Carro climatizado, água gelada e zero pressa.',300,520,70,'+5512991234502','+5512991234502' from c, loc
  returning id
)
insert into provider_gallery (provider_id,url,sort) select ins.id,g.url,g.ord from ins,
  (values ('https://picsum.photos/seed/ilha-cara/800/600',0), ('https://picsum.photos/seed/ilha-carb/800/600',1), ('https://picsum.photos/seed/ilha-carc/800/600',2), ('https://picsum.photos/seed/ilha-card/800/600',3)) as g(url,ord);

with c as (select id from categories where slug='babysitters'),
loc as (select id from locations where slug='ilhabela'),
ins as (
  insert into providers (slug,name,category_id,location_id,tier,status,verified,photo_url,languages,service_area,short_desc,long_desc,half_day_rate,full_day_rate,hourly_rate,phone,whatsapp)
  select 'camila-ferreira','Camila Ferreira',c.id,loc.id,'featured','published',true,'https://randomuser.me/api/portraits/women/68.jpg',array['Português','English']::text[],'Norte da Ilha','Babá experiente e carinhosa, formada em pedagogia. Noites e diárias.','Trabalho com crianças há 9 anos e sou formada em pedagogia. Cuido dos pequenos enquanto os pais aproveitam um jantar ou um passeio de barco. Brincadeiras na praia, hora do banho, histórias para dormir. Referências de várias famílias que voltam todo ano.',180,320,45,'+5512991234503','+5512991234503' from c, loc
  returning id
)
insert into provider_gallery (provider_id,url,sort) select ins.id,g.url,g.ord from ins,
  (values ('https://picsum.photos/seed/ilha-babya/800/600',0), ('https://picsum.photos/seed/ilha-babyb/800/600',1), ('https://picsum.photos/seed/ilha-babyc/800/600',2)) as g(url,ord);

with c as (select id from categories where slug='boat-services'),
loc as (select id from locations where slug='ilhabela'),
ins as (
  insert into providers (slug,name,category_id,location_id,tier,status,verified,photo_url,languages,service_area,short_desc,long_desc,half_day_rate,full_day_rate,hourly_rate,phone,whatsapp)
  select 'ricardo-almeida','Ricardo Almeida',c.id,loc.id,'premium','published',true,'https://randomuser.me/api/portraits/men/45.jpg',array['Português','English','Italiano']::text[],'Saídas do Perequê','Capitão local. Passeios às praias desertas do sul e às ilhas vizinhas.','Nasci na ilha e piloto lancha desde menino. Levo você às praias que só se chega de barco — Bonete, Castelhanos, Saco do Sombrio. Mergulho, paradas para almoço e pôr do sol no mar. Lancha para até 10 pessoas, colete para todos e marinheiro a bordo.',900,1600,null,'+5512991234504','+5512991234504' from c, loc
  returning id
)
insert into provider_gallery (provider_id,url,sort) select ins.id,g.url,g.ord from ins,
  (values ('https://picsum.photos/seed/ilha-boata/800/600',0), ('https://picsum.photos/seed/ilha-boatb/800/600',1), ('https://picsum.photos/seed/ilha-boatc/800/600',2), ('https://picsum.photos/seed/ilha-boatd/800/600',3)) as g(url,ord);

with c as (select id from categories where slug='wellness'),
loc as (select id from locations where slug='ilhabela'),
ins as (
  insert into providers (slug,name,category_id,location_id,tier,status,verified,photo_url,languages,service_area,short_desc,long_desc,half_day_rate,full_day_rate,hourly_rate,phone,whatsapp)
  select 'beatriz-costa','Beatriz Costa',c.id,loc.id,'featured','published',false,'https://randomuser.me/api/portraits/women/12.jpg',array['Português','English']::text[],'Atendimento ao domicílio','Massagem relaxante e terapêutica na sua casa, frente para o mar.','Sou massoterapeuta há 7 anos. Levo maca, óleos e uma trilha sonora suave até a sua varanda. Massagem relaxante, desportiva ou drenagem. Ideal depois de um dia de trilha ou de barco. Atendo casais e grupos pequenos com hora marcada.',260,null,140,'+5512991234505','+5512991234505' from c, loc
  returning id
)
insert into provider_gallery (provider_id,url,sort) select ins.id,g.url,g.ord from ins,
  (values ('https://picsum.photos/seed/ilha-spaa/800/600',0), ('https://picsum.photos/seed/ilha-spab/800/600',1), ('https://picsum.photos/seed/ilha-spac/800/600',2)) as g(url,ord);

with c as (select id from categories where slug='photography'),
loc as (select id from locations where slug='ilhabela'),
ins as (
  insert into providers (slug,name,category_id,location_id,tier,status,verified,photo_url,languages,service_area,short_desc,long_desc,half_day_rate,full_day_rate,hourly_rate,phone,whatsapp)
  select 'lucas-pereira','Lucas Pereira',c.id,loc.id,'featured','published',false,'https://randomuser.me/api/portraits/men/76.jpg',array['Português','English']::text[],'Toda a ilha','Ensaios de família e casais nas praias e cachoeiras da ilha.','Fotógrafo de viagem e família. Capturo a sua estadia em Ilhabela — do nascer do sol na praia ao mergulho na cachoeira. Entrego fotos editadas em até 5 dias e uma galeria online para compartilhar. Sei os melhores cantos e as melhores luzes.',550,950,null,'+5512991234506','+5512991234506' from c, loc
  returning id
)
insert into provider_gallery (provider_id,url,sort) select ins.id,g.url,g.ord from ins,
  (values ('https://picsum.photos/seed/ilha-phoa/800/600',0), ('https://picsum.photos/seed/ilha-phob/800/600',1), ('https://picsum.photos/seed/ilha-phoc/800/600',2), ('https://picsum.photos/seed/ilha-phod/800/600',3)) as g(url,ord);

with c as (select id from categories where slug='house-cleaning'),
loc as (select id from locations where slug='ilhabela'),
ins as (
  insert into providers (slug,name,category_id,location_id,tier,status,verified,photo_url,languages,service_area,short_desc,long_desc,half_day_rate,full_day_rate,hourly_rate,phone,whatsapp)
  select 'ana-rodrigues','Ana Rodrigues',c.id,loc.id,'standard','published',false,'https://randomuser.me/api/portraits/women/65.jpg',array['Português']::text[],'Centro & Vila','Limpeza caprichada de casas de temporada. Check-in e check-out.','Faço a limpeza de casas e apartamentos de temporada há 10 anos. Deixo tudo pronto para os hóspedes chegarem e organizo o check-out. Trabalho com produtos próprios e sou pontual. Atendo também limpeza pesada pós-obra.',150,260,40,'+5512991234507','+5512991234507' from c, loc
  returning id
)
insert into provider_gallery (provider_id,url,sort) select ins.id,g.url,g.ord from ins,
  (values ('https://picsum.photos/seed/ilha-clea/800/600',0), ('https://picsum.photos/seed/ilha-cleb/800/600',1)) as g(url,ord);

with c as (select id from categories where slug='handymen'),
loc as (select id from locations where slug='ilhabela'),
ins as (
  insert into providers (slug,name,category_id,location_id,tier,status,verified,photo_url,languages,service_area,short_desc,long_desc,half_day_rate,full_day_rate,hourly_rate,phone,whatsapp)
  select 'pedro-lima','Pedro Lima',c.id,loc.id,'standard','published',false,'https://randomuser.me/api/portraits/men/22.jpg',array['Português']::text[],'Toda a ilha','Pequenos reparos, elétrica, hidráulica e manutenção de casas.','Marido de aluguel da ilha. Resolvo o que aparecer: torneira pingando, tomada queimada, móvel para montar, portão emperrado. Atendo proprietários e administradoras de casas de temporada com agilidade. Orçamento na hora.',200,360,55,'+5512991234508','+5512991234508' from c, loc
  returning id
)
insert into provider_gallery (provider_id,url,sort) select ins.id,g.url,g.ord from ins,
  (values ('https://picsum.photos/seed/ilha-hana/800/600',0), ('https://picsum.photos/seed/ilha-hanb/800/600',1)) as g(url,ord);

with c as (select id from categories where slug='concierge'),
loc as (select id from locations where slug='ilhabela'),
ins as (
  insert into providers (slug,name,category_id,location_id,tier,status,verified,photo_url,languages,service_area,short_desc,long_desc,half_day_rate,full_day_rate,hourly_rate,phone,whatsapp)
  select 'sofia-martins','Sofia Martins',c.id,loc.id,'premium','published',true,'https://randomuser.me/api/portraits/women/29.jpg',array['Português','English','Français']::text[],'Concierge para toda a ilha','Concierge pessoal: reservas, passeios, chef, barco — organizo tudo.','Cuido da sua estadia de ponta a ponta. Reservo restaurantes, organizo passeios de barco, contrato chef e babá, faço o mercado antes da chegada e resolvo imprevistos. Penso no detalhe para a sua família só aproveitar. Falo três idiomas.',500,850,120,'+5512991234509','+5512991234509' from c, loc
  returning id
)
insert into provider_gallery (provider_id,url,sort) select ins.id,g.url,g.ord from ins,
  (values ('https://picsum.photos/seed/ilha-cona/800/600',0), ('https://picsum.photos/seed/ilha-conb/800/600',1), ('https://picsum.photos/seed/ilha-conc/800/600',2)) as g(url,ord);

with c as (select id from categories where slug='tour-guides'),
loc as (select id from locations where slug='ilhabela'),
ins as (
  insert into providers (slug,name,category_id,location_id,tier,status,verified,photo_url,languages,service_area,short_desc,long_desc,half_day_rate,full_day_rate,hourly_rate,phone,whatsapp)
  select 'gabriel-souza','Gabriel Souza',c.id,loc.id,'featured','published',false,'https://randomuser.me/api/portraits/men/64.jpg',array['Português','English']::text[],'Trilhas & Cachoeiras','Guia de trilhas credenciado. Cachoeiras, mirantes e Mata Atlântica.','Guia de turismo credenciado e apaixonado pela Mata Atlântica. Conduzo trilhas para todos os níveis — da cachoeira fácil ao Pico do Baepi. Conto a história e a natureza da ilha pelo caminho. Levo lanche, água e muita segurança.',280,480,null,'+5512991234510','+5512991234510' from c, loc
  returning id
)
insert into provider_gallery (provider_id,url,sort) select ins.id,g.url,g.ord from ins,
  (values ('https://picsum.photos/seed/ilha-guia/800/600',0), ('https://picsum.photos/seed/ilha-guib/800/600',1), ('https://picsum.photos/seed/ilha-guic/800/600',2)) as g(url,ord);

with c as (select id from categories where slug='private-chefs'),
loc as (select id from locations where slug='ilhabela'),
ins as (
  insert into providers (slug,name,category_id,location_id,tier,status,verified,photo_url,languages,service_area,short_desc,long_desc,half_day_rate,full_day_rate,hourly_rate,phone,whatsapp)
  select 'larissa-gomes','Larissa Gomes',c.id,loc.id,'standard','published',false,'https://randomuser.me/api/portraits/women/90.jpg',array['Português','English']::text[],'Norte da Ilha','Comida caseira brasileira e café da manhã para a casa toda.','Cozinho a comida de casa que dá saudade: feijoada no sábado, peixe na telha, café da manhã reforçado para encarar o dia de praia. Atendo grupos e famílias grandes em casas de temporada. Faço também o mercado.',320,560,75,'+5512991234511','+5512991234511' from c, loc
  returning id
)
insert into provider_gallery (provider_id,url,sort) select ins.id,g.url,g.ord from ins,
  (values ('https://picsum.photos/seed/ilha-chee/800/600',0), ('https://picsum.photos/seed/ilha-chef2/800/600',1)) as g(url,ord);

with c as (select id from categories where slug='drivers'),
loc as (select id from locations where slug='ilhabela'),
ins as (
  insert into providers (slug,name,category_id,location_id,tier,status,verified,photo_url,languages,service_area,short_desc,long_desc,half_day_rate,full_day_rate,hourly_rate,phone,whatsapp)
  select 'thiago-barbosa','Thiago Barbosa',c.id,loc.id,'standard','published',false,'https://randomuser.me/api/portraits/men/3.jpg',array['Português']::text[],'Transfers Aeroporto','Transfer pontual de Guarulhos e Congonhas direto para a balsa.','Especialista em transfer aeroporto. Busco em Guarulhos ou Congonhas e levo com tranquilidade até a balsa de São Sebastião, acompanhando a travessia. Monitoro o seu voo e ajusto o horário se atrasar. Veículo confortável para malas e família.',280,null,65,'+5512991234512','+5512991234512' from c, loc
  returning id
)
insert into provider_gallery (provider_id,url,sort) select ins.id,g.url,g.ord from ins,
  (values ('https://picsum.photos/seed/ilha-tra/800/600',0), ('https://picsum.photos/seed/ilha-trb/800/600',1)) as g(url,ord);
