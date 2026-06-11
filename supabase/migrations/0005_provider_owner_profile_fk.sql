-- ============================================================================
-- Daquii - fix admin listings/professionals showing zero rows
-- ----------------------------------------------------------------------------
-- providers.owner_id already has a FK to auth.users(id), but PostgREST cannot
-- embed auth.users. The admin queries embed `profiles:owner_id(...)`, which
-- requires a FK from providers to public.profiles. Without it PostgREST errors
-- and adminListProviders() returns [] -> /admin/listings and /admin/providers
-- show zero rows.
--
-- Add a second FK to public.profiles(id) and reload the PostgREST schema cache.
-- ============================================================================

alter table public.providers
  add constraint providers_owner_id_profiles_fkey
  foreign key (owner_id) references public.profiles(id) on delete set null;

notify pgrst, 'reload schema';
