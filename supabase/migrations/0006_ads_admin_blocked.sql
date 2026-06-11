-- ============================================================================
-- Daquii - ad moderation override flag
-- Run AFTER 0005_provider_owner_profile_fk.sql
-- ============================================================================
--
-- `active` is the single source of truth for whether an ad displays publicly.
-- It is driven automatically by the Stripe webhook (set true on payment).
-- `admin_blocked` lets an admin manually take an ad offline for content
-- moderation, independently of payment status: the webhook never re-activates
-- an ad while admin_blocked = true.

alter table ads add column if not exists admin_blocked boolean not null default false;
