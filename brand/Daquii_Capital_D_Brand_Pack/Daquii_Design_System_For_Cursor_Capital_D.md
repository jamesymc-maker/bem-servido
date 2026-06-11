# Daquii Capital D Brand Guidelines for Cursor

## Important update

The approved brand direction now uses a capital D wordmark:

**Daquii**

Use the visual reference image:

`Daquii_Capital_D_Authoritative_Brand_Reference.png`

## Brand name

Use:

**Daquii**

Do not use as the main wordmark:

- daquii
- DAQUII
- Daqui
- Bem Servido

## Brand idea

Daquii means "from here".

The platform connects visitors with trusted local people and services.

The brand is about people and services from here, not places on a map.

## Tagline

**Tudo o que você precisa, daqui.**

## Hero headline

**Pessoas de daqui, para você.**

## Logo system

Use the capital D logo assets:

- `daquii_logo_mark_capital_d.svg`
- `daquii_logo_horizontal_capital_d.svg`

### Logo mark

The mark must be:

- organic island outline
- palm tree inside
- bright gradient outline
- teal palm tree
- no external dot

### Wordmark

The wordmark must be:

- capital D: `Daquii`
- Deep Navy
- two coloured i dots: Ocean Teal and Tropical Pink

## Forbidden logo directions

Do not use:

- lowercase daquii as the primary logo
- abstract D with people
- handshake icon
- location pin
- exterior dot beside the island outline
- dark neon Miami Vice styling
- black-only logo as the main brand

## Colour palette

| Colour | Hex | Usage |
|---|---|---|
| Tropical Pink | #FF2D6D | Primary pop accent, emphasis, badges |
| Sunset Orange | #FFB62B | Warm accent, gradient midpoint |
| Ocean Teal | #00C2BB | Primary CTA, active state, palm, links |
| Deep Navy | #0B1D3A | Wordmark, headings, text, nav |
| Sand | #FFF7ED | Warm backgrounds and cards |
| White | #FFFFFF | Main background |
| Soft Border | #E7EEF2 | Borders and dividers |
| Muted Text | #5B677A | Supporting copy |

## Colour rule

Make the colours pop. Do not mute the palette. Do not make the site grey or overly pastel.

## Brand gradient

```css
linear-gradient(135deg, #FF2D6D 0%, #FFB62B 48%, #00C2BB 100%)
```

## Homepage direction

Hero headline:

**Pessoas de daqui, para você.**

Supporting copy:

**Conectamos você a pessoas locais de confiança que tornam sua experiência incrível, sem complicação.**

Primary CTA:

**Encontrar serviços**

Secondary CTA:

**Anunciar na Daquii**

## Tailwind colours

```ts
colors: {
  dq: {
    pink: "#FF2D6D",
    orange: "#FFB62B",
    teal: "#00C2BB",
    navy: "#0B1D3A",
    sand: "#FFF7ED",
    white: "#FFFFFF",
    border: "#E7EEF2",
    muted: "#5B677A",
  }
}
```

## Cursor prompt

Use the Daquii capital D brand pack and update the project to match the attached reference image exactly in direction.

The authoritative visual reference is:

Daquii_Capital_D_Authoritative_Brand_Reference.png

The brand direction is now capital D.

Correct brand direction:

1. Brand name is:
Daquii

2. Do not use:
daquii as the main wordmark
DAQUII
Daqui
Bem Servido

3. Use the logo style from the reference image:
- organic island outline
- palm tree inside the island
- no external dot beside the island outline
- capital D wordmark: Daquii
- deep navy wordmark
- bright gradient island outline
- teal palm tree
- the two i dots should be Ocean Teal and Tropical Pink

4. Use this exact colour palette:
Tropical Pink: #FF2D6D
Sunset Orange: #FFB62B
Ocean Teal: #00C2BB
Deep Navy: #0B1D3A
Sand: #FFF7ED
White: #FFFFFF
Soft Border: #E7EEF2
Muted Text: #5B677A

5. Make the colours pop. Do not mute them. Do not use pastel-only versions.

6. The visual style should match the reference:
- bright daytime tropical colours
- white and sand backgrounds
- bold navy type
- teal and pink accent typography
- bright service illustrations
- rounded cards
- modern premium island concierge feel

7. Do not use:
- lowercase daquii as the main logo
- abstract D with people
- handshake logo
- location pin logo
- dark neon Miami Vice styling
- black-only logo as the main brand
- muted grey/pastel palette

8. Replace any old generated logo files with:
daquii_logo_mark_capital_d.svg
daquii_logo_horizontal_capital_d.svg

9. Add the capital D design tokens:
daquii_design_tokens_capital_d.json
daquii_design_tokens_capital_d.css

10. Update Tailwind and global CSS to use the capital D brand colours, fonts, radii, shadows and gradients.

Typography:
Use Sora or Montserrat for headings.
Use Sora or Inter for body copy.
Keep headings bold and rounded like the reference.

Homepage hero:
Headline:
Pessoas de daqui, para você.

Supporting copy:
Conectamos você a pessoas locais de confiança que tornam sua experiência incrível, sem complicação.

Tagline:
Tudo o que você precisa, daqui.

Primary CTA:
Encontrar serviços

Secondary CTA:
Anunciar na Daquii

Apply this branding to:
- header
- footer
- homepage
- service category pages
- provider cards
- provider profile pages
- pricing page
- recommended businesses page
- advertiser cards
- admin dashboard
- provider dashboard
- buttons
- badges
- tables
- forms
- search components

Provider cards should emphasise real people:
- large face photo
- name
- category
- languages
- price
- trust badges
- WhatsApp CTA

Advertising should feel native:
- bright sponsor cards
- Sand backgrounds
- clean logos
- clear CTA
- label sponsored placements as Patrocinado

Run:
npm run build

Fix all TypeScript, lint and build errors.

When finished, summarise the files changed and confirm that the logo, colours and wordmark now match the capital D reference image.

