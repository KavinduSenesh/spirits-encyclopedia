# The Spirits Encyclopedia — Premium Redesign Spec

## Overview

Redesign the Sri Lanka Spirits Encyclopedia into **The Spirits Encyclopedia** — a global, bilingual (EN/SI), educational wiki for alcoholic beverages worldwide. The redesign transforms the basic UI into a luxury editorial experience with a moody, cinematic aesthetic while maintaining full NATA Act compliance.

**Stack:** Next.js 14 App Router + next-intl 3.x + Tailwind CSS + SSG (unchanged)

---

## Branding

- **Name:** The Spirits Encyclopedia
- **Tagline:** "An encyclopedic guide to the world's spirits"
- **All references** to "Sri Lanka Spirits Encyclopedia" must be updated across: layout metadata, messages/en.json, messages/si.json, Header component, footer, JSON-LD, sitemap, robots.txt, SEO metadata

---

## Visual Design System

### Color Palette

Replace the current cream/charcoal light theme with a dark cinematic palette:

| Token | Hex | Usage |
|-------|-----|-------|
| `bg-primary` | `#0d1117` | Page background |
| `bg-card` | `#161b22` | Card/surface background |
| `bg-elevated` | `#1c2128` | Elevated surfaces, modals |
| `border-default` | `#30363d` | Default borders |
| `border-amber` | `rgba(200,149,108,0.15)` | Accent borders |
| `text-primary` | `#f0f6fc` | Headings, primary text |
| `text-secondary` | `#c9d1d9` | Body text |
| `text-muted` | `#8b949e` | Labels, metadata |
| `text-faint` | `#484f58` | Disclaimers, copyright |
| `amber` | `#c8956c` | Primary accent color |
| `amber-dark` | `#a07040` | Gradient endpoint |
| `amber-glow` | `rgba(200,149,108,0.08)` | Radial glow effects |

### Typography

- **Primary font:** Noto Sans — update weight array to `['200', '300', '400', '500', '600', '700']`
- **Sinhala font:** Noto Sans Sinhala — update weight array to `['200', '300', '400', '500', '600', '700']`
- **Heading style:** font-weight 200–300 (thin/light), letter-spacing 1px
- **Label style:** 10–11px, uppercase, letter-spacing 2–4px, amber color
- **Body style:** 15px, line-height 1.8, text-secondary color

### Animations

Subtle only — CSS transitions, no JavaScript animation libraries:
- **Fade-in on scroll:** Elements fade in with slight upward translate when entering viewport. Implemented via a thin `FadeIn` client component wrapper that uses Intersection Observer + CSS `@keyframes`. Server components like Hero use CSS-only `@keyframes fadeIn` on mount (no IO needed).
- **Hover transitions:** 0.3s ease for color, border, shadow, transform
- **Card hover:** translateY(-2px), border-color amber, top-line reveal
- **Page transitions:** None (SSG, not needed)

---

## Component Specifications

### 1. Age Gate (redesign `AgeGate.tsx`)

- **Backdrop:** Full-screen `#0d1117` with radial amber glow at center
- **Modal:** `bg-elevated` at 90% opacity (`rgba(28,33,40,0.9)`) with `backdrop-filter: blur(20px)`, 1px amber border, rounded-2xl
- **Decorative element:** Diamond symbol (◆) in amber above title
- **Title:** "Age Verification" — font-weight 300, text-primary
- **Message:** text-muted, 13px
- **Yes button:** Linear gradient `#c8956c → #a07040`, rounded-full, dark text
- **No button:** Transparent with border-default, text-muted
- **Disclaimer:** text-faint, 10px, includes NATA compliance note
- **Animation:** Modal fades in with scale(0.95→1) over 0.3s on mount

### 2. Header (redesign `Header.tsx`)

- **Background:** `rgba(13,17,23,0.85)` with `backdrop-filter: blur(20px)`
- **Bottom border:** 1px `border-amber`
- **Height:** 64px, sticky top, z-40
- **Logo:** Full text "The Spirits Encyclopedia" — "The" in amber font-weight 500, rest in text-primary font-weight 300. On mobile (below `md`): show only "Spirits Encyclopedia" (shorter).
- **Search pill:** Rounded-full, `bg-amber-glow`, amber border, search icon + placeholder text
- **Locale switcher:** Pill toggle, active locale gets amber bg with dark text
- **Layout:** Flex between logo (left) and search + locale + hamburger (right)

### 3. Mobile Menu (new `MobileMenu.tsx`)

- **Trigger:** Hamburger icon (3 lines, amber colored), visible only below `md` breakpoint
- **Menu panel:** Fixed full-screen overlay, `bg-primary` at 98% opacity
- **Close button:** ✕ icon replacing hamburger
- **Navigation links:** All 8 categories listed as full-width links, 18px font-weight 300, separated by faint borders. Categories are passed as props from `Header.tsx` (server component) which calls `getAllCategories()` and passes the list down.
- **Locale switcher:** Displayed at bottom of menu as button pair
- **Animation:** Slide in from right with fade, 0.3s ease
- **Behavior:** Closes on link click, closes on escape key

### 4. Hero Section (new `Hero.tsx`)

- **Height:** 65vh (editorial scroll-in — category grid visible below)
- **Background:** Multi-layer radial gradients creating atmospheric amber glow effect
  - `radial-gradient(ellipse at 30% 50%, amber-glow, transparent 50%)`
  - `radial-gradient(ellipse at 70% 30%, rgba(139,105,20,0.06), transparent 40%)`
  - Base: linear-gradient `bg-primary → bg-card → bg-primary`
- **Bottom fade:** 120px gradient from transparent to `bg-primary`
- **Content (left-aligned, max-width 700px):**
  - Label: "Encyclopaedia" — amber, 11px, letter-spacing 4px, uppercase
  - Title: "Discover the **Heritage** of the World's Spirits" — text-primary, 48px (md) / 32px (mobile), weight 200, "Heritage" in amber weight 400
  - Description: text-muted, 16px, max-width 500px
- **Scroll indicator:** Centered at bottom — "Explore" text + vertical line, amber at 25% opacity
- **Server component** — no client JS needed

### 5. Category Card (redesign `CategoryCard.tsx`)

- **Background:** `bg-card` at 80% opacity
- **Border:** 1px `border-amber` (very subtle)
- **Border radius:** 12px
- **Padding:** 28px 24px
- **Content:**
  - SVG line icon (36×36, amber, stroke-width 1.5)
  - Category name: text-primary, 16px, weight 400
  - Description: text-muted, 12px, 2-line clamp
  - Arrow (→): Positioned bottom-right, amber, hidden by default, slides in on hover
- **Hover effects (0.3s ease):**
  - border-color → amber at 25%
  - background → `bg-card` at 100%
  - translateY(-2px)
  - Top 2px amber gradient line appears — implemented as a `<div>` with `absolute top-0 inset-x-0 h-0.5` using `opacity-0 group-hover:opacity-100 transition-opacity`
  - Arrow slides in from left

### 6. Category Icons (new, inline SVGs)

Minimalist line-art SVG icons, one per category. Stroke only, no fill, stroke-width 1.5:

| Category | Icon concept |
|----------|-------------|
| Arrack | Traditional pot/vessel |
| Beer | Beer glass/pint |
| Stout | Tulip glass with dark fill line |
| Gin | Goblet/coupe glass |
| Vodka | Tall shot glass/bottle |
| Whisky | Tumbler glass |
| Rum | Bottle silhouette |
| Wine | Wine glass |

Icons defined as inline SVG in each CategoryCard — no external icon library needed.

### 7. Bottle Card (redesign `BottleCard.tsx`)

- Same dark card style as CategoryCard
- **Content:**
  - Bottle name: text-primary, weight 400
  - Tags row: ABV badge + origin — pill-shaped, `bg-amber-glow` with amber border, amber text, 12px
- **Hover:** Same effects as CategoryCard (border, lift, top-line)
- **No image placeholder** — clean text-only card

### 8. Bottle Detail (redesign `BottleDetail.tsx`)

- **Max-width:** `max-w-4xl` (896px, Tailwind built-in) centered
- **Bottle header:**
  - h1: text-primary, 36px, weight 200
  - Tags: Row of pills (ABV, origin, base ingredient) — same style as BottleCard tags
- **Sections** (Ingredients, Production Method, Historical Background):
  - h2: amber, 11px, uppercase, letter-spacing 3px (label style)
  - p: text-secondary, 15px, line-height 1.8
  - Separated by 1px `border-amber` at 6% opacity with 36px padding
- **No image area** — text-driven layout

### 9. Related Bottles (new section in bottle detail)

- **Placement:** Bottom of bottle detail page, below last section
- **Heading:** "You might also explore" — text-primary, 16px, weight 300
- **Border-top:** 1px amber at 10% opacity, 60px margin-top, 40px padding-top
- **Grid:** 3 columns (1 on mobile)
- **Cards:** Compact — bg-card at 60%, amber border, 20px padding, bottle name + ABV
- **Logic:** Show up to 3 bottles from the same category (excluding current bottle). If fewer than 3 in same category, fill from other categories.

### 10. Breadcrumb (redesign `Breadcrumb.tsx`)

- **Separator:** "/" in `border-default` color
- **Links:** text-muted, hover → amber
- **Current page:** amber color, font-weight 500
- **Size:** 12px

### 11. Search Bar (redesign `SearchBar.tsx`)

- **Input container:** Rounded-full, `bg-amber-glow`, 1px amber border
- **Icon:** Search SVG, stroke `text-muted`
- **Input text:** text-primary on `bg-transparent`, placeholder in `text-muted` at 50%
- **Dropdown:** `bg-card` with shadow-lg, rounded-lg, amber border
- **Result items:** Hover → `bg-elevated`, bottle name in text-primary, ABV in amber
- **No results:** text-muted italic

### 12. Footer (new `Footer.tsx`)

- **Background:** `bg-primary` at 95% opacity
- **Top border:** 1px amber at 10%
- **Layout:** 4-column grid (2fr 1fr 1fr 1fr), collapses to 2-col then 1-col on mobile
- **Columns:**
  - Brand: Site name (text-primary, 16px, weight 300) + educational disclaimer (text-muted, 12px)
  - Categories (first 4): Links to category pages
  - Categories (last 4): Links to category pages
  - Legal: About, Disclaimer, Privacy links
- **Bottom bar:** Copyright (text-faint, 11px) + NATA compliance badge (small bordered pill)
- **Category links:** text-muted, hover → text-primary, 13px

### 13. Back-to-Top Button (new `BackToTop.tsx`)

- **Position:** Fixed bottom-right (30px from edges)
- **Appearance:** 40px circle, `bg-amber-glow` at 15%, 1px amber border at 30%, "↑" in amber
- **Hover:** bg at 25%, translateY(-2px)
- **Visibility:** Hidden when near top (scrollY < 400), fades in with opacity transition
- **Behavior:** Smooth scroll to top on click
- **Client component** with scroll event listener

### 14. 404 Page (redesign `not-found.tsx`)

- Match dark theme: bg-primary, text-primary heading, amber "Go Home" button with gradient
- Same layout structure, updated colors

### 15. Locale Switcher (redesign `LocaleSwitcher.tsx`)

- Pill container: `bg-amber-glow`, rounded-full, 3px padding
- Active button: amber bg, dark text
- Inactive button: text-muted at 70%, hover → text-primary

---

## Page Updates

### Home Page (`/[locale]`)

1. Hero section (new)
2. Section heading: "Categories" with extending line
3. Category grid: 4 columns (lg), 2 columns (sm), 1 column (mobile)
4. Stats bar (optional, below grid): "8 Categories · 25+ Bottles · 2 Languages" — centered, amber numbers

### Category Page (`/[locale]/category/[slug]`)

- Dark breadcrumb
- Category name (h1) + description
- Bottle grid: 3 columns (lg), 2 columns (sm), 1 column (mobile)

### Bottle Detail Page (`/[locale]/category/[catSlug]/[bottleSlug]`)

- Breadcrumb (3-level)
- Bottle header with tags
- Content sections
- Related bottles
- JSON-LD (unchanged, still Article schema)

---

## Data Changes

### bottles.json

- **Add international bottles** to reach ~25 total. New bottles to add:
  - Whisky: Johnnie Walker Black Label, Jameson Irish Whiskey, Yamazaki 12
  - Beer: Guinness Draught, Heineken Lager, Corona Extra
  - Wine: Moët & Chandon Impérial, Barefoot Cellini (Red)
  - Rum: Bacardi Superior, Captain Morgan Original
  - Vodka: Absolut Vodka, Smirnoff No. 21
  - Gin: Tanqueray London Dry, Bombay Sapphire
- All new bottles need bilingual content (en + si)
- All content must be factual and encyclopedic — NO promotional language
- Keep the `image` field in the schema with empty string `""` for all entries (field retained for future image support)

### messages/*.json

- Update `metadata.title` → "The Spirits Encyclopedia"
- Update `header.siteTitle` → "The Spirits Encyclopedia"
- Update `home.title` → "Discover the Heritage of the World's Spirits"
- Update `home.subtitle` → "An encyclopedic guide to spirits from around the globe"
- Add Sinhala translations for all new strings

### Layout metadata

- Update `title.template` → `%s | The Spirits Encyclopedia`
- Update `title.default` → `The Spirits Encyclopedia`
- Update `description` → global scope

---

## Tailwind Configuration

Replace current color palette in `tailwind.config.ts`:

```typescript
colors: {
  'bg-primary': '#0d1117',
  'bg-card': '#161b22',
  'bg-elevated': '#1c2128',
  'border-default': '#30363d',
  'border-amber': 'rgba(200,149,108,0.15)',
  'text-primary': '#f0f6fc',
  'text-secondary': '#c9d1d9',
  'text-muted': '#8b949e',
  'text-faint': '#484f58',
  'amber': '#c8956c',
  'amber-dark': '#a07040',
  'amber-glow': 'rgba(200,149,108,0.08)',
}
```

### globals.css

- Body background: `#0d1117`
- Add fade-in keyframe animation
- Add utility classes for amber glow backgrounds and borders

---

## Global Layout Changes (`layout.tsx`)

- `<body>` class: `bg-bg-primary text-text-secondary antialiased`
- Font stack: unchanged (Noto Sans + Noto Sans Sinhala)
- Structure: `<AgeGate>` → `<Header />` → `<main>` → `<Footer />`
- Add `<BackToTop />` after footer

---

## Files to Create

| File | Type |
|------|------|
| `src/components/Hero.tsx` | Server component |
| `src/components/MobileMenu.tsx` | Client component |
| `src/components/Footer.tsx` | Server component |
| `src/components/BackToTop.tsx` | Client component |

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/AgeGate.tsx` | Dark theme, glassmorphic modal, fade-in animation |
| `src/components/Header.tsx` | Dark glassmorphic, add hamburger trigger for MobileMenu |
| `src/components/LocaleSwitcher.tsx` | Dark theme colors |
| `src/components/SearchBar.tsx` | Dark theme, dark dropdown |
| `src/components/CategoryCard.tsx` | Dark card, line icon, hover effects |
| `src/components/BottleCard.tsx` | Dark card, tag pills |
| `src/components/BottleDetail.tsx` | Dark sections, label-style headings |
| `src/lib/data.ts` | Add `getRelatedBottles(bottleId, limit)` function |
| `src/components/Breadcrumb.tsx` | Dark theme colors |
| `src/components/JsonLd.tsx` | Update author org name |
| `src/app/[locale]/layout.tsx` | Dark body, add Footer + BackToTop |
| `src/app/[locale]/page.tsx` | Add Hero, update metadata |
| `src/app/[locale]/not-found.tsx` | Dark theme |
| `src/app/[locale]/category/[categorySlug]/page.tsx` | Update metadata title |
| `src/app/[locale]/category/[categorySlug]/[bottleSlug]/page.tsx` | Add related bottles section |
| `src/app/sitemap.ts` | Update site name in comments; domain stays unchanged until deployment |
| `src/app/robots.ts` | No change needed; domain stays unchanged until deployment |
| `tailwind.config.ts` | New color palette |
| `src/app/globals.css` | Dark background, animations |
| `messages/en.json` | Rebrand + new strings |
| `messages/si.json` | Rebrand + new strings |
| `data/bottles.json` | Add ~13 international bottles |

---

## NATA Compliance (unchanged)

- Session-only age gate (sessionStorage)
- 21+ age threshold
- No pricing, purchase links, or commerce elements
- No promotional adjectives — factual/encyclopedic content only
- Article schema (not Product) for JSON-LD
- Educational disclaimer in footer

---

## Out of Scope (future)

- Subcategories (Category → Subcategory → Bottle)
- User accounts / favorites
- Comparison tool
- Cocktail recipes
- Advanced filtering/sorting
- Actual bottle images
- Additional languages beyond EN/SI
