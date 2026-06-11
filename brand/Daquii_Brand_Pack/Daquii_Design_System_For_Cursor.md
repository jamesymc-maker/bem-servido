# Daquii Design System for Cursor

## Core instruction

Apply this brand system across the Next.js project. The site should feel bright, premium, tropical, trustworthy and human. It should look like a modern local concierge platform, not a dark nightlife brand and not a generic directory.

The site is for trusted local people and services. Daquii means from here. The brand idea is:

Everything you need, from here.

Portuguese tagline:

Tudo o que você precisa, daqui.

## Brand personality

| Attribute | Direction |
|---|---|
| Trust | Real local people, clear profiles, visible faces |
| Location | Island life, local knowledge, helpful people |
| Energy | Bright, sunny, fresh, optimistic |
| Premium feel | Clean spacing, strong typography, good photography |
| Simplicity | No clutter, no complicated marketplace language |

## Logo system

### Wordmark

Use lowercase only:

daquii

Do not use:

Daquii
DAQUII
Daqui

### Logo mark

Use an organic island outline with a palm tree inside.

The mark represents:

1. Island
2. Sea
3. Local people
4. Experience
5. Help from here

Do not include the small exterior dot beside the island outline.

### Logo colours

Use the gradient mark on white and sand backgrounds.

Use the white mark on Deep Navy.

Use Deep Navy for the wordmark.

### Clear space

Keep at least the height of the letter d around the logo.

### Minimum sizes

| Use case | Minimum size |
|---|---:|
| Horizontal logo desktop | 160 px wide |
| Horizontal logo mobile | 120 px wide |
| App icon | 48 px |
| Favicon | 32 px |
| Footer logo | 120 px wide |

### Do not

1. Do not capitalise the wordmark.
2. Do not add a location pin.
3. Do not add a handshake inside the wordmark.
4. Do not use dark neon Miami Vice styling.
5. Do not stretch or rotate the mark.
6. Do not add drop shadows to the logo.
7. Do not use the logo over busy images unless it sits on a white or navy panel.

## Colour palette

| Token | Hex | Usage |
|---|---|---|
| Deep Navy | #0B1D3A | Main text, headings, navigation, wordmark |
| Ocean Teal | #00C2BB | Primary CTA, links, active states, icons |
| Tropical Pink | #FF2D6D | Highlights, badges, emphasis |
| Sunset Orange | #FFB62B | Warm accent, gradients, selected states |
| Sand | #FFF7ED | Warm background, cards, soft panels |
| White | #FFFFFF | Main background |
| Soft Border | #E7EEF2 | Card borders and dividers |
| Muted Text | #5B677A | Supporting text |

### Usage ratio

| Colour | Approximate usage |
|---|---:|
| White and Sand | 65% |
| Deep Navy | 20% |
| Ocean Teal | 10% |
| Pink and Orange | 5% |

### Gradients

Primary brand gradient:

linear-gradient(135deg, #FF2D6D 0%, #FFB62B 45%, #00C2BB 100%)

Use it for:

1. Logo mark
2. Small decorative strokes
3. Premium badges
4. Selected states

Do not use gradients for large backgrounds unless subtle.

## Typography

Use Google Fonts.

### Headings

Montserrat

Weights:

1. 600
2. 700
3. 800

### Body

Sora

Weights:

1. 400
2. 500
3. 600

### CSS import

```css
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Sora:wght@400;500;600;700&display=swap");
```

### Font scale

| Element | Desktop | Mobile | Weight |
|---|---:|---:|---:|
| Hero h1 | 64 px | 42 px | 800 |
| Page h1 | 48 px | 34 px | 800 |
| Section h2 | 36 px | 28 px | 700 |
| Card title | 22 px | 20 px | 700 |
| Body | 16 px | 16 px | 400 |
| Small | 14 px | 14 px | 500 |

## Layout system

| Token | Value | Usage |
|---|---|---|
| Max width | 1180 px | Main page container |
| Mobile padding | 20 px | Small screens |
| Desktop padding | 32 px | Large screens |
| Radius small | 12 px | Tags and small controls |
| Radius medium | 18 px | Inputs and filters |
| Radius large | 28 px | Cards and panels |
| Radius pill | 999 px | Buttons |
| Card shadow | 0 18px 50px rgba(11, 29, 58, 0.10) | Provider cards and feature panels |

## Buttons

### Primary button

Use for main actions:

1. WhatsApp
2. Search
3. Create account
4. Choose plan
5. Contact advertiser

Style:

1. Background Ocean Teal
2. Text white
3. Border radius 999 px
4. Font weight 700
5. Height 48 px desktop and 52 px mobile

Hover:

1. Slightly darker teal
2. Lift by 1 px
3. Soft shadow

### Secondary button

Use for lower priority actions:

1. View profile
2. Read more
3. Back
4. Learn more

Style:

1. Sand or white background
2. Deep Navy text
3. Soft border
4. Rounded pill

### WhatsApp button

WhatsApp is a core conversion action.

Use:

1. Ocean Teal background
2. WhatsApp icon if available
3. Text: Falar no WhatsApp

## Cards

### Provider card

Every provider card should show a person first.

Required layout:

1. Large profile photo
2. Name
3. Category
4. Languages
5. Half day rate
6. Trust badges
7. WhatsApp CTA

Style:

1. White background
2. 24 to 28 px radius
3. Soft border
4. Soft shadow
5. Image ratio 4:3
6. Rounded image corners
7. CTA visible without opening the profile

### Category card

Should feel visual and tappable.

Required layout:

1. Service icon or image
2. Category name
3. Short description
4. Number of providers if available

### Advertiser card

Use a more premium treatment.

Required layout:

1. Logo or image
2. Company name
3. Category
4. Short description
5. Website or WhatsApp CTA
6. Sponsored label where appropriate

## Homepage design

### Structure

1. Header
2. Hero
3. Search
4. Popular categories
5. Featured providers
6. How it works
7. Recommended local businesses
8. Trust section
9. Blog or guides
10. Footer

### Hero

Use white or sand background.

Hero copy example:

Pessoas de daqui, para você.

Supporting copy:

Conectamos você a profissionais locais de confiança para tornar sua estadia mais fácil.

CTA:

Encontrar serviços

Secondary CTA:

Anunciar na Daquii

## Service category pages

Goal:

Help visitors quickly choose a trusted person.

Structure:

1. Category heading
2. Short description
3. Filters
4. Sponsored category block
5. Provider list
6. Helpful guide content
7. FAQ

Filters:

1. Price
2. Language
3. Area
4. Availability if added later
5. Verified photo
6. Premium only

## Provider profile page

Goal:

Convert visitor into WhatsApp enquiry.

Structure:

1. Large provider photo
2. Name
3. Category
4. Trust badges
5. WhatsApp button above the fold
6. Intro video if available
7. Description
8. Rates
9. Languages
10. Service area
11. Gallery
12. Reviews later
13. Similar providers

The provider face is more important than the service icon.

## Provider dashboard

Route:

/painel

Visual direction:

Clean, practical, simple.

Use bright brand colours only for CTAs and status badges.

Dashboard sections:

1. Profile completion
2. Listing status
3. Plan
4. Payment status
5. Photos
6. Video
7. Enquiries if tracked later

Profile completion checklist:

1. Profile photo
2. Description
3. Half day rate
4. WhatsApp number
5. Languages
6. Service area
7. Intro video

## Admin dashboard

Route:

/admin

Visual direction:

Functional but still on brand.

Use:

1. White background
2. Deep Navy headings
3. Sand panels
4. Teal CTAs
5. Pink for warnings or attention
6. Orange for pending states

Dashboard cards:

1. Pending listings
2. Active providers
3. Active advertisers
4. Monthly recurring revenue
5. Failed payments
6. Expiring advertisers

Tables:

1. Rounded container
2. Clear status badges
3. Sticky action column if possible
4. Mobile responsive stacked rows

## Advertising pages and sections

Advertising should feel native and premium, not like ugly banner ads.

### Recommended businesses

Route:

/empresas-recomendadas

Page style:

1. Clean grid
2. Business cards
3. Category filters
4. Sponsored labels where needed

### Sponsored category block

Title:

Patrocinado

Design:

1. Sand card
2. Small sponsor logo
3. Short description
4. CTA
5. No intrusive popups

## Pricing page

Route:

/precos

Include two pricing sections:

1. Provider listings
2. Local advertising

Provider plans:

1. Standard
2. Featured
3. Premium

Advertiser plans:

1. Bronze
2. Silver
3. Gold
4. Platinum

Use bright cards and clear CTAs.

## Illustration system

Use bright daytime island illustrations.

Scenes:

1. Driver greeting visitor
2. Chef preparing food in villa
3. Cleaner preparing rental home
4. Massage therapist setting up
5. Boat captain welcoming guests
6. Babysitter meeting parents
7. Local guide helping couple
8. Grocery delivery to villa

Style:

1. Clean vector
2. Warm sunlight
3. Bright sea and sky
4. White and sand backgrounds
5. Realistic human warmth
6. Premium enough for villa renters

Avoid:

1. Dark night scenes
2. Neon nightclub aesthetic
3. Generic stock icons
4. Overly childish cartoons
5. Stereotypes
6. Too many palm trees on every panel

## Iconography

Use simple rounded line icons.

Stroke:

2 px

Colour:

Deep Navy by default.

Use Ocean Teal for active icons.

Use Tropical Pink only for emphasis.

## Photography rules

Provider photos should be human first.

Good:

1. Clear face
2. Natural light
3. Friendly expression
4. Real working context
5. Clean background

Bad:

1. Logos only
2. Boats only
3. Cars only
4. Group photos
5. Blurry photos
6. Dark night photos

## Trust badges

Use badges carefully.

Examples:

1. Foto adicionada
2. Perfil aprovado
3. Premium
4. Verificado
5. Responde rápido

Badge colours:

1. Verified: Ocean Teal
2. Premium: Sunset Orange
3. Attention: Tropical Pink
4. Neutral: Sand with Deep Navy text

## Motion and interaction

Keep movement subtle.

Hover:

1. Cards lift by 2 px
2. Shadow increases slightly
3. CTA darkens

Page transitions:

1. No heavy animation
2. No parallax by default
3. No auto moving elements that distract from search

## Accessibility

1. Contrast must be readable.
2. Do not place small text over gradients.
3. Buttons must have visible focus states.
4. Forms must have labels.
5. Images must have alt text.
6. Do not rely on colour only for status.

## Tailwind implementation suggestion

Add these colours to tailwind.config:

```ts
colors: {
  dq: {
    navy: "#0B1D3A",
    teal: "#00C2BB",
    pink: "#FF2D6D",
    orange: "#FFB62B",
    sand: "#FFF7ED",
    border: "#E7EEF2",
    muted: "#5B677A"
  }
}
```

Add these font families:

```ts
fontFamily: {
  heading: ["Montserrat", "Inter", "Arial", "sans-serif"],
  body: ["Sora", "Inter", "Arial", "sans-serif"]
}
```

Add these radii:

```ts
borderRadius: {
  dqsm: "12px",
  dqmd: "18px",
  dqlg: "28px",
  dqfull: "999px"
}
```

## Cursor task list

1. Add the Daquii design tokens to Tailwind and global CSS.
2. Replace the old Bem Servido naming with daquii where appropriate.
3. Add the new logo assets.
4. Update the header with lowercase daquii wordmark.
5. Update homepage hero using the new brand copy.
6. Restyle buttons using Ocean Teal and pill radii.
7. Restyle cards with white backgrounds, soft borders and rounded corners.
8. Add Sand section backgrounds.
9. Update provider cards to emphasise face photos.
10. Update category cards with rounded icon style.
11. Update pricing page with bright plan cards.
12. Update advertiser sections so they feel native.
13. Update admin portal styling but keep it practical.
14. Update provider portal styling.
15. Replace dark or generic visuals with bright tropical illustrations.
16. Run npm run build and fix all errors.

## Cursor prompt

Apply the Daquii brand system across this Next.js project. Use the attached design tokens, logo SVG files and this specification. The brand should be bright, premium, tropical, human and trustworthy. Use lowercase daquii. Use an organic island logo mark with a palm tree inside. Remove any extra decorative dot outside the mark. Use Deep Navy for text, Ocean Teal for primary CTAs, Tropical Pink and Sunset Orange as accents, and Sand for warm backgrounds. Use Montserrat for headings and Sora for body text. Restyle the homepage, service category pages, provider cards, provider profiles, pricing, recommended businesses, admin dashboard and provider dashboard. Keep the site mobile first. Do not break existing routes, Supabase, Stripe, provider listings, blog or admin logic. Run npm run build and fix all errors.
