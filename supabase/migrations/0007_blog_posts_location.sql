-- ============================================================================
-- Blog posts: per-location targeting.
-- A null location_slug means the post is global and shows on every location.
-- ============================================================================
alter table blog_posts add column if not exists location_slug text;
create index if not exists blog_posts_location_slug_idx on blog_posts(location_slug);
comment on column blog_posts.location_slug is
  'Active location slug this post targets. NULL means the post shows on all locations.';
