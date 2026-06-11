# Daquii

Trust-first directory of local service providers on Ilhabela, Brazil.
Next.js (App Router) + Supabase + Stripe. UI in Brazilian Portuguese.

The app **runs out of the box with built-in seed data** (12 providers, 10
categories) so you can `npm run dev` before wiring any service. As soon as the
Supabase env vars are set and the database is seeded, live data takes over.

---

## What's inside

```
app/                  routes (home, /servicos, /servicos/[slug], /profissional/[slug], /precos)
  api/checkout        Stripe Checkout session (stub-safe)
  api/stripe/webhook  Stripe -> Supabase sync (stub-safe)
components/           UI (nav, cards, blog, faq, location bar, language toggle)
content/blog/         Markdown blog posts (add .md files here)
app/api/reviews       buyer review submission (moderated)
lib/
  data.ts             reads Supabase, falls back to seed data
  seed.ts             demo providers/categories
  plans.ts            subscription tiers + Stripe price mapping
  supabase/           browser / server / admin clients
  stripe.ts           Stripe init
supabase/
  migrations/0001_init.sql   schema + Row Level Security
  seed.sql                   demo data for the database
proxy.ts              refreshes the Supabase auth session (Next 16 convention)
app/sitemap.ts        dynamic sitemap   ·   app/robots.ts  robots.txt
```

## Tech

Next.js 16 (App Router, TypeScript), Tailwind CSS, Supabase (Postgres + Auth +
RLS), Stripe Subscriptions, lucide-react icons, Fraunces + Hanken Grotesk fonts.


## Languages

The site ships bilingual: Brazilian Portuguese (default) and English, switched
with the PT/EN toggle in the header. The choice is stored in a `lang` cookie and
read server-side, so the first paint matches. UI copy and category names are
translated in `lib/i18n.ts`. Provider-written descriptions stay in the language
the provider entered them in (machine translation of those is a Phase 2 item).

## Locations (multi-region ready)

The schema and UI already support multiple regions. For now only **Ilhabela** is
active and is always the default; other regions appear in the header selector as
"coming soon". To add a region later: insert a row in `locations` with
`active = true`, then scope provider queries by `location_id`. The selector
stores the choice in a `location` cookie.

## Content & SEO

- **Blog**: posts are Markdown files in `content/blog/*.md` with frontmatter
  (`title`, `description`, `date`, `author`, `cover`, `category`, `tags`,
  `lang`). Drop a new `.md` file in and it appears at `/blog` and gets its own
  page, metadata and `BlogPosting` structured data. Reading time is computed
  automatically. Set `lang: en` for an English post.
- **About + FAQ** (`/sobre`): rich intro plus an accordion FAQ that emits
  `FAQPage` structured data, which is what powers Google rich results and helps
  LLMs quote you. Edit the copy in `lib/i18n.ts` under `faq` and `sobre`.
- **Homepage SEO block**: descriptive, keyword-rich copy with internal links to
  every category, editable in `lib/i18n.ts` under `seo`.
- **Structured data**: Organization + WebSite (site-wide, with a SearchAction),
  LocalBusiness per provider, BlogPosting per post, FAQPage on /sobre.
- **Sitemap & robots**: generated at `/sitemap.xml` and `/robots.txt`,
  including every category, provider and post.

> Set `NEXT_PUBLIC_SITE_URL` to your real domain in Vercel. Canonical URLs,
> Open Graph images, the sitemap and all structured data use it.


## Reviews (buyer reviews, moderated)

Buyers leave a review on a provider's profile (name, star rating, comment). It is
saved to the `reviews` table with `status = 'pending'` and does **not** appear on
the site until approved. Approved reviews show on the profile with an average
rating; the homepage testimonials remain curated sample copy (swap for real ones
in `lib/testimonials.ts`).

Submission API: `POST /api/reviews`. Without Supabase configured the form returns
a friendly "demo build" message; with Supabase it writes a pending review.

**Approving reviews (until the admin dashboard exists):** in Supabase, open the
`reviews` table and set a row's `status` to `approved`. It then appears on the
provider's profile. Build the admin moderation UI (and a spam guard such as a
captcha or rate limit) before opening this to the public at scale.


## Accounts, provider dashboard and admin

The app now has authentication (Supabase Auth), a provider dashboard, and an
admin portal.

**Extra setup (one time):**
1. Run `supabase/migrations/0002_auth_admin.sql` (profiles table, admin flag,
   auto-create-profile trigger, category hidden flag, last-payment column).
2. Run `supabase/storage.sql` (creates the `avatars` and `gallery` storage
   buckets and their access policies, for photo uploads).
3. In Supabase → Authentication → Providers/Settings, turn **off "Confirm email"**
   for the smoothest signup (otherwise new providers must click an email link
   before they can use the dashboard).

**Becoming an admin:** sign up at `/criar-conta`, then run once in Supabase:
```
update profiles set is_admin = true where email = 'you@example.com';
```
That account can now reach `/admin`.

**Provider flow:**
`/criar-conta` → `/painel` → complete profile, upload photos, add intro video
link, choose a plan (Stripe Checkout) → listing sits as `pending` → you approve
it at `/admin/providers` → it goes live. Listings never publish automatically.

**Routes:**
- Public auth: `/entrar` (login), `/criar-conta` (signup)
- Provider dashboard (`/painel`, login required): overview, `/perfil`, `/fotos`,
  `/video`, `/plano`, `/pagamentos`
- Admin (`/admin`, admin only): dashboard, `/providers`
  (approve/suspend, trial tracking, filters), `/anunciantes`, `/anuncios`
  (activate/deactivate), `/avaliacoes` (review moderation), `/blog`, `/categories`
  (add/edit/hide/reorder), `/settings`

Both `/painel` and `/admin` are gated in `proxy.ts` (must be logged in) and
`/admin` additionally checks `is_admin` in its layout.

**Intro video** is a paste-a-link field for now; real upload via Cloudflare
Stream is a later pass. Photos upload for real to Supabase Storage.


---

## 1. Run locally

```bash
npm install
cp .env.example .env.local      # optional: leave blank to use seed data
npm run dev                      # http://localhost:3000
```

Without any env vars the site uses seed data. Everything is clickable:
search, categories, profiles, WhatsApp links, and the pricing page (Stripe
returns a friendly "not configured" message until you add keys).

---

## 2. Supabase

1. Create a project at supabase.com. Copy from **Project Settings > API**:
   - Project URL  -> `NEXT_PUBLIC_SUPABASE_URL`
   - anon public key -> `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key -> `SUPABASE_SERVICE_ROLE_KEY` (server only, keep secret)
2. Open **SQL Editor**, paste and run `supabase/migrations/0001_init.sql`.
3. Then paste and run `supabase/seed.sql` to load the demo providers.
4. Restart `npm run dev`. The app now reads from the database.

RLS is on: the public sees only `status = 'published'` rows; providers can
manage their own. The service_role key bypasses RLS and is used by the Stripe
webhook (and, later, the admin dashboard).

---

## 3. Stripe

1. Stripe dashboard > **Products**: create three recurring (monthly, BRL) prices:
   Standard R$29, Featured R$79, Premium R$149. Copy each price id (`price_...`).
2. Set env vars: `STRIPE_SECRET_KEY`, `STRIPE_PRICE_STANDARD`,
   `STRIPE_PRICE_FEATURED`, `STRIPE_PRICE_PREMIUM`.
3. Webhook: **Developers > Webhooks > Add endpoint**
   - URL: `https://YOUR-DOMAIN/api/stripe/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.updated`,
     `customer.subscription.deleted`
   - Copy the signing secret -> `STRIPE_WEBHOOK_SECRET`
4. Local testing: `stripe listen --forward-to localhost:3000/api/stripe/webhook`

Clicking a plan on `/precos` opens Stripe Checkout. On success the webhook
upserts a row in `subscriptions`.

---

## 4. Push to GitHub

```bash
git init
git add .
git commit -m "Daquii: initial skeleton"
git branch -M main
git remote add origin https://github.com/YOUR-USER/daquii.git
git push -u origin main
```

`.gitignore` already excludes `node_modules`, `.next`, and `.env*`.

---

## 5. Deploy to Vercel

1. vercel.com > **Add New > Project** > import the GitHub repo.
2. Framework preset: **Next.js** (auto-detected). No build overrides needed.
3. Add every variable from `.env.example` under **Settings > Environment
   Variables**, and set `NEXT_PUBLIC_SITE_URL` to `https://daquii.com`.
4. Deploy. Update the Stripe webhook URL to the live domain.

Every push to `main` redeploys automatically.

---

## What's done vs. what's next

**Done:** all visitor pages, search, category browsing, provider profiles,
trust-first design, PT/EN toggle, location selector (multi-region ready), blog,
about + FAQ, subscription tiers, Stripe checkout + webhook stubs, Supabase
schema with RLS, seed data, full SEO (metadata, canonicals, sitemap, robots,
JSON-LD structured data), mobile-first responsive layout, Supabase Auth, provider signup + dashboard
(profile, photo uploads, video link, plan checkout), and an admin portal
(approval queue, review moderation, providers, payments/MRR, categories).

**Not built yet (Phase 1 remaining):**
- Provider auth + signup wizard (account, profile, photo/video upload, pay)
- Real photo/video uploads (Cloudflare R2 + Cloudflare Stream)
- Face-detection prompt on photo upload
- Admin dashboard (approvals, suspensions, tier changes, payments) behind an
  `is_admin()` check
- Analytics wiring (Google Analytics / PostHog) and the `events` table
- Google AdSense script in the ad slots
- Pagination on `/servicos` (current page loads all published providers; fine
  for hundreds, add pagination before thousands)

Provider rows default to `status = 'pending'` and need approval before showing.
