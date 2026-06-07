-- ============================================================================
-- Bem Servido - blog_posts table (admin-editable, Supabase-stored)
-- Run AFTER 0002_auth_admin.sql
-- ============================================================================
create table if not exists blog_posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  description  text not null default '',
  content      text not null default '',
  date         date not null default current_date,
  author       text not null default 'Equipe Bem Servido',
  cover_url    text,
  category_slug text,
  tags         text[] not null default '{}',
  lang         text not null default 'pt',
  published    boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists blog_posts_slug_idx      on blog_posts(slug);
create index if not exists blog_posts_published_idx on blog_posts(published);
create index if not exists blog_posts_lang_idx      on blog_posts(lang);

drop trigger if exists blog_posts_updated_at on blog_posts;
create trigger blog_posts_updated_at before update on blog_posts
  for each row execute function set_updated_at();

alter table blog_posts enable row level security;

drop policy if exists blog_read_published on blog_posts;
create policy blog_read_published on blog_posts for select using (published = true);
-- Admin writes happen via service role which bypasses RLS.
