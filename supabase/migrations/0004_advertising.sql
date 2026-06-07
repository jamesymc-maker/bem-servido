-- ============================================================================
-- Bem Servido - advertising system + provider trial period
-- Run AFTER 0003_blog_posts.sql
-- ============================================================================

-- ---------- Provider trial period ----------
alter table providers add column if not exists trial_ends_at timestamptz;
alter table providers add column if not exists trial_days int not null default 60;

-- ---------- Advertisers ----------
create table if not exists advertisers (
  id           uuid primary key default gen_random_uuid(),
  owner_id     uuid references auth.users(id) on delete cascade,
  company_name text not null,
  contact_name text,
  email        text,
  phone        text,
  website      text,
  logo_url     text,
  tier         text check (tier in ('visibilidade','destaque','parceiro')),
  active       boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
alter table advertisers enable row level security;
drop policy if exists adv_read_own on advertisers;
create policy adv_read_own on advertisers for select using (auth.uid() = owner_id);
drop policy if exists adv_insert_own on advertisers;
create policy adv_insert_own on advertisers for insert with check (auth.uid() = owner_id);
drop policy if exists adv_update_own on advertisers;
create policy adv_update_own on advertisers for update using (auth.uid() = owner_id);
-- Public can read active advertiser info (for footer logos etc.)
drop policy if exists adv_read_active on advertisers;
create policy adv_read_active on advertisers for select using (active = true and tier is not null);

-- ---------- Advertiser subscriptions ----------
create table if not exists advertiser_subscriptions (
  id                     uuid primary key default gen_random_uuid(),
  advertiser_id          uuid references advertisers(id) on delete cascade,
  stripe_customer_id     text,
  stripe_subscription_id text unique,
  tier                   text check (tier in ('visibilidade','destaque','parceiro')),
  status                 text,
  current_period_end     timestamptz,
  last_payment_at        timestamptz,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);
alter table advertiser_subscriptions enable row level security;
drop policy if exists advsub_read_own on advertiser_subscriptions;
create policy advsub_read_own on advertiser_subscriptions for select using (
  exists (select 1 from advertisers a where a.id = advertiser_id and a.owner_id = auth.uid())
);

-- ---------- Ads ----------
create table if not exists ads (
  id             uuid primary key default gen_random_uuid(),
  advertiser_id  uuid not null references advertisers(id) on delete cascade,
  title          text not null,
  image_url      text,
  link_url       text not null,
  placements     text[] not null default '{}',
  category_slugs text[] not null default '{}', -- empty = all categories
  active         boolean not null default false, -- admin activates
  impressions    int not null default 0,
  clicks         int not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create index if not exists ads_advertiser_idx on ads(advertiser_id);
alter table ads enable row level security;
-- Advertiser reads/writes own ads
drop policy if exists ads_own on ads;
create policy ads_own on ads for all using (
  exists (select 1 from advertisers a where a.id = advertiser_id and a.owner_id = auth.uid())
) with check (
  exists (select 1 from advertisers a where a.id = advertiser_id and a.owner_id = auth.uid())
);
-- Public can read active ads from active advertisers
drop policy if exists ads_read_active on ads;
create policy ads_read_active on ads for select using (
  active = true and exists (
    select 1 from advertisers a where a.id = advertiser_id and a.active = true and a.tier is not null
  )
);

-- ---------- Blog posts: add sponsored flag ----------
alter table blog_posts add column if not exists sponsored boolean not null default false;
alter table blog_posts add column if not exists advertiser_id uuid references advertisers(id) on delete set null;

drop trigger if exists advertisers_updated_at on advertisers;
create trigger advertisers_updated_at before update on advertisers for each row execute function set_updated_at();
drop trigger if exists advsub_updated_at on advertiser_subscriptions;
create trigger advsub_updated_at before update on advertiser_subscriptions for each row execute function set_updated_at();
drop trigger if exists ads_updated_at on ads;
create trigger ads_updated_at before update on ads for each row execute function set_updated_at();

-- Storage bucket for ad images
insert into storage.buckets (id, name, public) values ('ads', 'ads', true) on conflict (id) do nothing;
drop policy if exists "public read ads" on storage.objects;
create policy "public read ads" on storage.objects for select using (bucket_id = 'ads');
drop policy if exists "advertiser upload ads" on storage.objects;
create policy "advertiser upload ads" on storage.objects for insert to authenticated
  with check (bucket_id = 'ads' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "advertiser update ads" on storage.objects;
create policy "advertiser update ads" on storage.objects for update to authenticated
  using (bucket_id = 'ads' and (storage.foldername(name))[1] = auth.uid()::text);
