-- ============================================================================
-- Bem Servido - initial schema
-- Run in Supabase: SQL Editor > paste > Run, or via the Supabase CLI.
-- ============================================================================

-- ---------- helpers ----------
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

-- ---------- locations (multi-region ready; only Ilhabela active for now) ----------
create table if not exists locations (
  id      uuid primary key default gen_random_uuid(),
  slug    text unique not null,
  name    text not null,
  region  text,
  country text not null default 'Brasil',
  active  boolean not null default false,
  sort    int not null default 0
);

-- ---------- categories ----------
create table if not exists categories (
  id    uuid primary key default gen_random_uuid(),
  slug  text unique not null,
  label text not null,
  icon  text not null default 'concierge',
  sort  int  not null default 0
);

-- ---------- providers ----------
create table if not exists providers (
  id            uuid primary key default gen_random_uuid(),
  owner_id      uuid references auth.users(id) on delete set null,  -- null for seed rows
  slug          text unique not null,
  name          text not null,
  category_id   uuid references categories(id) on delete restrict,
  location_id   uuid references locations(id) on delete restrict,
  tier          text not null default 'standard' check (tier in ('standard','featured','premium')),
  status        text not null default 'pending'  check (status in ('pending','published','rejected','suspended')),
  verified      boolean not null default false,
  photo_url     text,
  languages     text[] not null default '{}',
  service_area  text,
  short_desc    varchar(150),
  long_desc     varchar(1500),
  half_day_rate numeric(10,2) not null,
  full_day_rate numeric(10,2),
  hourly_rate   numeric(10,2),
  phone         text,
  whatsapp      text,
  intro_video_url text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists providers_category_idx on providers(category_id);
create index if not exists providers_location_idx on providers(location_id);
create index if not exists providers_status_idx   on providers(status);
create index if not exists providers_tier_idx      on providers(tier);
drop trigger if exists providers_updated_at on providers;
create trigger providers_updated_at before update on providers
  for each row execute function set_updated_at();

-- ---------- gallery ----------
create table if not exists provider_gallery (
  id          uuid primary key default gen_random_uuid(),
  provider_id uuid not null references providers(id) on delete cascade,
  url         text not null,
  sort        int  not null default 0
);
create index if not exists gallery_provider_idx on provider_gallery(provider_id);

-- ---------- subscriptions ----------
create table if not exists subscriptions (
  id                     uuid primary key default gen_random_uuid(),
  provider_id            uuid references providers(id) on delete cascade,
  stripe_customer_id     text,
  stripe_subscription_id text unique,
  plan                   text check (plan in ('standard','featured','premium')),
  status                 text,
  current_period_end     timestamptz,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);
create index if not exists subs_provider_idx on subscriptions(provider_id);
drop trigger if exists subs_updated_at on subscriptions;
create trigger subs_updated_at before update on subscriptions
  for each row execute function set_updated_at();

-- ---------- analytics events ----------
create table if not exists events (
  id          uuid primary key default gen_random_uuid(),
  provider_id uuid references providers(id) on delete cascade,
  type        text not null,   -- view, whatsapp_click, phone_click, video_play, search
  created_at  timestamptz not null default now()
);
create index if not exists events_provider_idx on events(provider_id);
create index if not exists events_type_idx      on events(type);


-- ---------- reviews (buyer reviews, moderated) ----------
create table if not exists reviews (
  id          uuid primary key default gen_random_uuid(),
  provider_id uuid not null references providers(id) on delete cascade,
  author_name text not null,
  rating      int  not null check (rating between 1 and 5),
  comment     varchar(1000) not null,
  status      text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at  timestamptz not null default now()
);
create index if not exists reviews_provider_idx on reviews(provider_id);
create index if not exists reviews_status_idx    on reviews(status);

-- ============================================================================
-- Row Level Security
-- ============================================================================
alter table locations        enable row level security;
alter table categories       enable row level security;
alter table providers        enable row level security;
alter table provider_gallery enable row level security;
alter table subscriptions    enable row level security;
alter table events           enable row level security;
alter table reviews          enable row level security;

drop policy if exists loc_read on locations;
create policy loc_read on locations for select using (true);

drop policy if exists cat_read on categories;
create policy cat_read on categories for select using (true);

drop policy if exists prov_read_published on providers;
create policy prov_read_published on providers for select using (status = 'published');

drop policy if exists prov_read_own on providers;
create policy prov_read_own on providers for select using (auth.uid() = owner_id);

drop policy if exists prov_insert_own on providers;
create policy prov_insert_own on providers for insert with check (auth.uid() = owner_id);

drop policy if exists prov_update_own on providers;
create policy prov_update_own on providers for update using (auth.uid() = owner_id);

drop policy if exists prov_delete_own on providers;
create policy prov_delete_own on providers for delete using (auth.uid() = owner_id);

drop policy if exists gal_read on provider_gallery;
create policy gal_read on provider_gallery for select using (
  exists (select 1 from providers p where p.id = provider_id and p.status = 'published')
);
drop policy if exists gal_write on provider_gallery;
create policy gal_write on provider_gallery for all using (
  exists (select 1 from providers p where p.id = provider_id and p.owner_id = auth.uid())
) with check (
  exists (select 1 from providers p where p.id = provider_id and p.owner_id = auth.uid())
);

drop policy if exists subs_read_own on subscriptions;
create policy subs_read_own on subscriptions for select using (
  exists (select 1 from providers p where p.id = provider_id and p.owner_id = auth.uid())
);

drop policy if exists events_insert on events;
create policy events_insert on events for insert with check (true);

drop policy if exists rev_read_approved on reviews;
create policy rev_read_approved on reviews for select using (
  status = 'approved' and exists (select 1 from providers p where p.id = provider_id and p.status = 'published')
);
drop policy if exists rev_insert on reviews;
create policy rev_insert on reviews for insert with check (status = 'pending');

-- NOTE: the service_role key bypasses RLS. Admin dashboard + Stripe webhooks
-- use it server-side. Build an is_admin() check before shipping an admin UI.
