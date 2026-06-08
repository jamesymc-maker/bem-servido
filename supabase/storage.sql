-- ============================================================================
-- Bem Servido - Supabase Storage buckets + policies for provider uploads.
-- Run in the SQL Editor. Buckets are public-read (images are shown publicly).
-- ============================================================================

insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true)
  on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('gallery', 'gallery', true)
  on conflict (id) do nothing;
-- Ad banner/logo images uploaded by advertisers (also created in 0004_advertising.sql).
insert into storage.buckets (id, name, public) values ('ads', 'ads', true)
  on conflict (id) do nothing;

-- Public can read images.
drop policy if exists "public read avatars" on storage.objects;
create policy "public read avatars" on storage.objects for select
  using (bucket_id in ('avatars','gallery'));

-- Authenticated users can upload/update/remove files inside a folder named
-- after their own user id (e.g. avatars/<uid>/photo.jpg).
drop policy if exists "user upload own" on storage.objects;
create policy "user upload own" on storage.objects for insert to authenticated
  with check (bucket_id in ('avatars','gallery') and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "user update own" on storage.objects;
create policy "user update own" on storage.objects for update to authenticated
  using (bucket_id in ('avatars','gallery') and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "user delete own" on storage.objects;
create policy "user delete own" on storage.objects for delete to authenticated
  using (bucket_id in ('avatars','gallery') and (storage.foldername(name))[1] = auth.uid()::text);

-- ---------------------------------------------------------------------------
-- Ad images: public read; advertisers manage files under a folder named after
-- their own user id (e.g. ads/<uid>/banner.jpg).
-- ---------------------------------------------------------------------------
drop policy if exists "public read ads" on storage.objects;
create policy "public read ads" on storage.objects for select
  using (bucket_id = 'ads');

drop policy if exists "advertiser upload ads" on storage.objects;
create policy "advertiser upload ads" on storage.objects for insert to authenticated
  with check (bucket_id = 'ads' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "advertiser update ads" on storage.objects;
create policy "advertiser update ads" on storage.objects for update to authenticated
  using (bucket_id = 'ads' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "advertiser delete ads" on storage.objects;
create policy "advertiser delete ads" on storage.objects for delete to authenticated
  using (bucket_id = 'ads' and (storage.foldername(name))[1] = auth.uid()::text);
