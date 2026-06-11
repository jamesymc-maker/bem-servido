-- ============================================================================
-- Daquii - auth, admin role, provider ownership extras
-- Run AFTER 0001_init.sql (and you can run it before or after seed.sql).
-- ============================================================================

-- ---------- profiles (one row per auth user; holds the admin flag) ----------
create table if not exists profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text,
  full_name  text,
  is_admin   boolean not null default false,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

-- A user can read their own profile (used to check is_admin). No client writes:
-- is_admin is set only via SQL / service role.
drop policy if exists prof_read_own on profiles;
create policy prof_read_own on profiles for select using (auth.uid() = id);

-- Auto-create a profile when a user signs up.
create or replace function handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users for each row execute function handle_new_user();

-- ---------- categories: add a hidden flag (admin can hide a category) ----------
alter table categories add column if not exists hidden boolean not null default false;

-- ---------- subscriptions: track last payment for the admin payments view ----------
alter table subscriptions add column if not exists last_payment_at timestamptz;

-- ============================================================================
-- HOW TO MAKE YOURSELF AN ADMIN
-- 1) Sign up in the app at /criar-conta with your email.
-- 2) Run this once (replace the email):
--      update profiles set is_admin = true where email = 'you@example.com';
-- That account can now reach /admin.
-- ============================================================================
