# The Spirits Encyclopedia — Premium Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the basic Sri Lanka Spirits Encyclopedia into a premium, dark-themed global spirits wiki called "The Spirits Encyclopedia" with cinematic UI, new components, and international bottle data.

**Architecture:** Full visual overhaul of all existing components + 4 new components (Hero, MobileMenu, Footer, BackToTop). Dark color palette replaces light theme via Tailwind config swap. Data layer expanded with international bottles. No new dependencies — CSS-only animations.

**Tech Stack:** Next.js 14 App Router, next-intl 3.x, Tailwind CSS 3.4, TypeScript

**Spec:** `docs/superpowers/specs/2026-03-24-spirits-encyclopedia-redesign.md`

---

### Task 1: Foundation — Tailwind Colors, Globals, Fonts

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`
- Modify: `src/app/[locale]/layout.tsx`

- [ ] **Step 1: Replace Tailwind color palette**

In `tailwind.config.ts`, replace the `colors` object inside `theme.extend` with:

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
},
```

- [ ] **Step 2: Update globals.css**

Replace the entire file with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #0d1117;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease forwards;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scaleIn 0.3s ease forwards;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in-right {
  animation: slideInRight 0.3s ease forwards;
}
```

- [ ] **Step 3: Update fonts in layout.tsx**

In `src/app/[locale]/layout.tsx`, update the `Noto_Sans` and `Noto_Sans_Sinhala` font imports to include weights `['200', '300', '400', '500', '600', '700']`. Update the `<body>` className to `bg-bg-primary text-text-secondary antialiased`. Update `metadata.title.template` to `'%s | The Spirits Encyclopedia'`, `title.default` to `'The Spirits Encyclopedia'`, and `description` to `'An encyclopedic guide to the world\'s spirits'`.

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds. Pages render with dark background.

- [ ] **Step 5: Commit**

```
git add tailwind.config.ts src/app/globals.css src/app/[locale]/layout.tsx
git commit -m "feat: dark theme foundation — tailwind colors, globals, fonts"
```

---

### Task 2: Rebrand — Messages, JsonLd, Metadata

**Files:**
- Modify: `messages/en.json`
- Modify: `messages/si.json`
- Modify: `src/components/JsonLd.tsx`

- [ ] **Step 1: Update messages/en.json**

Replace the `metadata`, `header`, and `home` namespaces:

```json
{
  "metadata": {
    "title": "The Spirits Encyclopedia",
    "description": "An encyclopedic guide to the world's spirits"
  },
  "header": {
    "siteTitle": "The Spirits Encyclopedia"
  },
  "home": {
    "title": "Discover the Heritage of the World's Spirits",
    "subtitle": "An encyclopedic guide to spirits from around the globe"
  }
}
```

Keep all other namespaces (`ageGate`, `category`, `bottleDetail`, `search`) unchanged.

Add new namespaces:

```json
{
  "hero": {
    "label": "Encyclopaedia",
    "title": "Discover the {accent} of the World's Spirits",
    "titleAccent": "Heritage",
    "description": "An educational guide exploring the history, production, and cultural significance of alcoholic beverages from around the globe.",
    "scrollHint": "Explore"
  },
  "footer": {
    "description": "An educational resource providing factual, encyclopedic information about alcoholic beverages worldwide. No commercial transactions are facilitated through this website.",
    "categories": "Categories",
    "more": "More",
    "legal": "Legal",
    "about": "About",
    "disclaimer": "Disclaimer",
    "privacy": "Privacy",
    "copyright": "© 2026 The Spirits Encyclopedia. Educational use only.",
    "nataBadge": "NATA Act Compliant — No commercial promotion"
  },
  "relatedBottles": {
    "heading": "You might also explore"
  }
}
```

- [ ] **Step 2: Update messages/si.json**

Same structure as en.json but with Sinhala translations:

```json
{
  "metadata": {
    "title": "මධ්‍යසාර විශ්වකෝෂය",
    "description": "ලෝකයේ මධ්‍යසාර පාන වර්ග පිළිබඳ විශ්වකෝෂමය මාර්ගෝපදේශය"
  },
  "header": {
    "siteTitle": "මධ්‍යසාර විශ්වකෝෂය"
  },
  "home": {
    "title": "ලෝකයේ මධ්‍යසාර උරුමය සොයා ගන්න",
    "subtitle": "ලොව පුරා මධ්‍යසාර පාන වර්ග පිළිබඳ විශ්වකෝෂමය මාර්ගෝපදේශය"
  },
  "hero": {
    "label": "විශ්වකෝෂය",
    "title": "ලෝකයේ මධ්‍යසාර {accent} සොයා ගන්න",
    "titleAccent": "උරුමය",
    "description": "ලොව පුරා මධ්‍යසාර පාන වර්ගවල ඉතිහාසය, නිෂ්පාදනය සහ සංස්කෘතික වැදගත්කම ගවේෂණය කරන අධ්‍යාපනික මාර්ගෝපදේශයකි.",
    "scrollHint": "ගවේෂණය"
  },
  "footer": {
    "description": "ලොව පුරා මධ්‍යසාර පාන වර්ග පිළිබඳ කරුණු, විශ්වකෝෂමය තොරතුරු සපයන අධ්‍යාපනික සම්පතකි. මෙම වෙබ් අඩවිය හරහා වාණිජ ගනුදෙනු කිසිවක් පහසුකම් සපයන්නේ නැත.",
    "categories": "කාණ්ඩ",
    "more": "තවත්",
    "legal": "නීතිමය",
    "about": "අපි ගැන",
    "disclaimer": "වගකීම් ප්‍රතික්ෂේපය",
    "privacy": "පෞද්ගලිකත්වය",
    "copyright": "© 2026 මධ්‍යසාර විශ්වකෝෂය. අධ්‍යාපනික භාවිතය පමණි.",
    "nataBadge": "NATA පනතට අනුකූලයි — වාණිජ ප්‍රවර්ධනයක් නැත"
  },
  "relatedBottles": {
    "heading": "ඔබට මෙයද ගවේෂණය කළ හැකිය"
  }
}
```

Keep all other namespaces (`ageGate`, `category`, `bottleDetail`, `search`) with existing Sinhala translations.

- [ ] **Step 3: Update JsonLd.tsx**

In `src/components/JsonLd.tsx`, change the `author.name` from `'Sri Lanka Spirits Encyclopedia'` to `'The Spirits Encyclopedia'`.

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds. No missing translation keys.

- [ ] **Step 5: Commit**

```
git add messages/en.json messages/si.json src/components/JsonLd.tsx
git commit -m "feat: rebrand to The Spirits Encyclopedia — messages and metadata"
```

---

### Task 3: Data — International Bottles + Related Bottles Helper

**Files:**
- Modify: `data/bottles.json`
- Modify: `src/lib/data.ts`

- [ ] **Step 1: Add international bottles to bottles.json**

Add 13 new bottles to the `bottles[]` array in `data/bottles.json`. Each bottle must have the full schema: `id`, `slug`, `categoryId`, `name` (en/si), `abv`, `origin` (en/si), `ingredients` (en/si), `productionMethod` (en/si), `history` (en/si), `image: ""`.

New bottles to add:
- **Whisky:** Johnnie Walker Black Label (Scotland, 40%), Jameson Irish Whiskey (Ireland, 40%), Yamazaki 12 Year Old (Japan, 43%)
- **Beer:** Guinness Draught (Ireland, 4.2%), Heineken Lager (Netherlands, 5%), Corona Extra (Mexico, 4.5%)
- **Wine:** Moët & Chandon Impérial (France, 12%), Barefoot Cellars Red (USA, 13.5%)
- **Rum:** Bacardi Superior (Puerto Rico, 40%), Captain Morgan Original (Jamaica, 35%)
- **Vodka:** Absolut Vodka (Sweden, 40%), Smirnoff No. 21 (Russia/UK, 40%)
- **Gin:** Tanqueray London Dry (England, 43.1%), Bombay Sapphire (England, 40%)

All content must be factual, encyclopedic, NO promotional adjectives. Include bilingual en/si for every text field.

- [ ] **Step 2: Add getRelatedBottles to data.ts**

Add this function to `src/lib/data.ts`:

```typescript
export function getRelatedBottles(bottleId: string, limit: number = 3): Bottle[] {
  const bottle = data.bottles.find((b) => b.id === bottleId);
  if (!bottle) return [];

  // Same category first, excluding current bottle
  const sameCategory = data.bottles.filter(
    (b) => b.categoryId === bottle.categoryId && b.id !== bottleId
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  // Fill with bottles from other categories
  const others = data.bottles.filter(
    (b) => b.categoryId !== bottle.categoryId && b.id !== bottleId
  );

  return [...sameCategory, ...others].slice(0, limit);
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds. All static pages generated (should be more pages now with new bottles).

- [ ] **Step 4: Commit**

```
git add data/bottles.json src/lib/data.ts
git commit -m "feat: add 13 international bottles and getRelatedBottles helper"
```

---

### Task 4: Age Gate — Cinematic Redesign

**Files:**
- Modify: `src/components/AgeGate.tsx`

- [ ] **Step 1: Rewrite AgeGate.tsx**

Replace the entire component. Key changes:
- Backdrop: `bg-bg-primary` with radial gradient glow (`bg-[radial-gradient(ellipse_at_50%_50%,rgba(200,149,108,0.04),transparent_60%)]`)
- Modal: `bg-bg-elevated/90 backdrop-blur-xl` with `border border-border-amber rounded-2xl`
- Diamond decorative element: `◆` in amber above title
- Title: `text-text-primary text-[22px] font-light`
- Message: `text-text-muted text-[13px]`
- Yes button: `bg-gradient-to-r from-amber to-amber-dark text-bg-primary rounded-full`
- No button: `border border-border-default text-text-muted rounded-full`
- Disclaimer: `text-text-faint text-[10px]`
- Entrance animation: `animate-scale-in` class on the modal

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```
git add src/components/AgeGate.tsx
git commit -m "feat: cinematic age gate with glassmorphic modal"
```

---

### Task 5: Header — Glassmorphic + Mobile Menu

**Files:**
- Modify: `src/components/Header.tsx`
- Create: `src/components/MobileMenu.tsx`
- Modify: `src/components/LocaleSwitcher.tsx`

- [ ] **Step 1: Create MobileMenu.tsx**

Create `src/components/MobileMenu.tsx` as a `'use client'` component:
- Props: `{ isOpen: boolean; onClose: () => void; categories: Array<{slug: string; name: {en: string; si: string}}> }`
- Fixed full-screen overlay: `fixed inset-0 z-50 bg-bg-primary/[0.98]`
- Close button top-right: ✕ icon, amber
- Category links: full-width, `text-[18px] font-light text-text-secondary`, border-b `border-border-default/30`, each links to `/category/{slug}` and calls `onClose`
- Locale switcher at bottom (reuse `<LocaleSwitcher />`)
- Entrance animation: `animate-slide-in-right`
- Close on Escape key via `useEffect` with keydown listener

- [ ] **Step 2: Rewrite Header.tsx**

Key changes:
- Background: `bg-[rgba(13,17,23,0.85)] backdrop-blur-xl`
- Border-bottom: `border-b border-border-amber`
- Height: `h-16`
- Logo: `<Link>` with `<span className="text-amber font-medium">The</span> <span className="text-text-primary font-light">Spirits Encyclopedia</span>`. Mobile: hide "The" with `hidden md:inline`.
- Import `getAllCategories` and pass categories to `<MobileMenu />`
- Add hamburger button: 3 amber lines, `md:hidden`
- State: `const [menuOpen, setMenuOpen] = useState(false)` — Header becomes a client component, or split into a `HeaderClient` wrapper for the menu state. Simplest: make Header a client component.
- SearchBar and LocaleSwitcher wrapped in `hidden md:flex` on mobile (they're in the mobile menu instead)

- [ ] **Step 3: Update LocaleSwitcher.tsx**

Update colors:
- Container: `bg-amber-glow rounded-full p-[3px]`
- Active: `bg-amber text-bg-primary`
- Inactive: `text-text-muted/70 hover:text-text-primary`

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds. Header renders with dark glassmorphic style.

- [ ] **Step 5: Commit**

```
git add src/components/Header.tsx src/components/MobileMenu.tsx src/components/LocaleSwitcher.tsx
git commit -m "feat: glassmorphic header with mobile hamburger menu"
```

---

### Task 6: Hero Section

**Files:**
- Create: `src/components/Hero.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create Hero.tsx**

Create `src/components/Hero.tsx` as a server component (no `'use client'`):
- Uses `useTranslations('hero')` for i18n
- Outer: `relative h-[65vh] flex items-center overflow-hidden`
- Background layers via `::before` pseudo (use a `<div>` with absolute positioning and multiple background gradients):
  - `radial-gradient(ellipse at 30% 50%, rgba(200,149,108,0.08) 0%, transparent 50%)`
  - `radial-gradient(ellipse at 70% 30%, rgba(139,105,20,0.06) 0%, transparent 40%)`
  - `linear-gradient(180deg, #0d1117, #161b22, #0d1117)`
- Bottom fade: absolute bottom div with `h-[120px] bg-gradient-to-b from-transparent to-bg-primary`
- Content wrapper: `relative z-10 max-w-[700px] px-8 md:px-16`
  - Label: `text-amber text-[11px] tracking-[4px] uppercase mb-5`
  - Title h1: `text-text-primary text-[32px] md:text-[48px] font-extralight leading-tight` with `<strong className="font-normal text-amber">{t('titleAccent')}</strong>`
  - Description: `text-text-muted text-[16px] max-w-[500px] mt-4`
- Scroll indicator: absolute bottom center, `text-amber/25 text-[10px] tracking-[2px] uppercase` + vertical line div
- Apply `animate-fade-in` to content wrapper

- [ ] **Step 2: Update home page**

In `src/app/[locale]/page.tsx`:
- Import and add `<Hero />` above the category grid
- Add section heading: "Categories" with extending amber line (`flex items-center gap-4 mb-10` with `h2` and `flex-1 h-px bg-gradient-to-r from-border-amber to-transparent`)
- Update grid classes for dark theme

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds. Home page has hero section followed by category grid.

- [ ] **Step 4: Commit**

```
git add src/components/Hero.tsx src/app/[locale]/page.tsx
git commit -m "feat: editorial hero section on home page"
```

---

### Task 7: Category Cards with Line Icons

**Files:**
- Modify: `src/components/CategoryCard.tsx`
- Create: `src/lib/categoryIcons.tsx`

- [ ] **Step 1: Create category icons file**

Create `src/lib/categoryIcons.tsx` with a `getCategoryIcon(categoryId: string)` function that returns inline JSX SVGs. Each icon: `viewBox="0 0 36 36"`, `stroke="currentColor"`, `fill="none"`, `strokeWidth={1.5}`.

Icons:
- `arrack`: Traditional pot/vessel shape
- `beer`: Pint glass
- `stout`: Tulip glass with a dashed line for dark fill
- `gin`: Coupe/goblet glass
- `vodka`: Tall bottle
- `whisky`: Tumbler/rocks glass
- `rum`: Bottle silhouette
- `wine`: Wine glass

- [ ] **Step 2: Rewrite CategoryCard.tsx**

Replace the entire component with dark theme card:
- Outer: `group relative block overflow-hidden rounded-xl border border-border-amber bg-bg-card/80 p-7 transition-all duration-300 hover:border-amber/25 hover:bg-bg-card hover:-translate-y-0.5`
- Top-line div: `absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-amber to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`
- Icon wrapper: `w-9 h-9 text-amber mb-4` → calls `getCategoryIcon(category.id)`
- Name: `text-text-primary text-[16px] font-normal mb-2`
- Description: `text-text-muted text-[12px] line-clamp-2 leading-relaxed`
- Arrow: `absolute bottom-5 right-5 text-amber text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300`

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```
git add src/lib/categoryIcons.tsx src/components/CategoryCard.tsx
git commit -m "feat: dark category cards with minimalist line icons"
```

---

### Task 8: Bottle Card + Bottle Detail + Related Bottles

**Files:**
- Modify: `src/components/BottleCard.tsx`
- Modify: `src/components/BottleDetail.tsx`
- Modify: `src/components/Breadcrumb.tsx`
- Modify: `src/app/[locale]/category/[categorySlug]/[bottleSlug]/page.tsx`

- [ ] **Step 1: Rewrite BottleCard.tsx**

Dark card style, same structure as CategoryCard but without icon:
- Same outer wrapper with group hover effects and top-line
- Bottle name: `text-text-primary font-normal`
- Tags row: `flex items-center gap-2 mt-3`
  - ABV pill: `bg-amber-glow border border-border-amber text-amber text-[12px] px-3 py-0.5 rounded-full`
  - Origin: `text-text-muted text-[12px]`

- [ ] **Step 2: Rewrite BottleDetail.tsx**

Dark theme article layout:
- Wrapper: `mx-auto max-w-4xl`
- h1: `text-text-primary text-[36px] font-extralight`
- Tags row: Same pill style as BottleCard
- Each section:
  - h2: `text-amber text-[11px] tracking-[3px] uppercase font-medium`
  - p: `text-text-secondary text-[15px] leading-[1.8] mt-3`
  - Separator: `border-b border-amber/[0.06] pb-9 mb-9` (last section has no border)

- [ ] **Step 3: Update Breadcrumb.tsx**

Update colors:
- Separator: `text-border-default`
- Links: `text-text-muted hover:text-amber transition-colors`
- Current page: `text-amber font-medium`

- [ ] **Step 4: Add Related Bottles to bottle detail page**

In `src/app/[locale]/category/[categorySlug]/[bottleSlug]/page.tsx`:
- Import `getRelatedBottles` from `@/lib/data`
- After `<BottleDetail />`, add a related bottles section:
  - Wrapper: `mt-16 pt-10 border-t border-amber/10`
  - Heading: `text-text-primary text-[16px] font-light tracking-wide mb-5`
  - Grid: `grid grid-cols-1 md:grid-cols-3 gap-4`
  - Each card: Link to bottle detail, `bg-bg-card/60 border border-border-amber rounded-lg p-5 hover:border-amber/20 hover:-translate-y-0.5 transition-all duration-300`
  - Card content: bottle name (`text-text-primary text-sm font-normal`) + ABV (`text-amber text-[12px]`)
- Use `useTranslations('relatedBottles')` for the heading

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: Build succeeds. All bottle detail pages generate with related bottles.

- [ ] **Step 6: Commit**

```
git add src/components/BottleCard.tsx src/components/BottleDetail.tsx src/components/Breadcrumb.tsx src/app/[locale]/category/[categorySlug]/[bottleSlug]/page.tsx
git commit -m "feat: dark bottle cards, detail page, and related bottles"
```

---

### Task 9: Search Bar — Dark Theme

**Files:**
- Modify: `src/components/SearchBar.tsx`

- [ ] **Step 1: Restyle SearchBar.tsx**

Update all Tailwind classes:
- Input container: `bg-amber-glow border border-border-amber rounded-full px-3 py-1.5`
- Search icon SVG: `text-text-muted/50`
- Input: `bg-transparent text-text-primary placeholder-text-muted/50 outline-none`
- Dropdown: `bg-bg-card border border-border-amber shadow-lg rounded-lg`
- Result item button: `hover:bg-bg-elevated transition-colors`
- Bottle name in results: `text-text-primary font-medium`
- ABV in results: `text-amber text-xs`
- No results text: `text-text-muted italic`

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```
git add src/components/SearchBar.tsx
git commit -m "feat: dark theme search bar"
```

---

### Task 10: Footer

**Files:**
- Create: `src/components/Footer.tsx`
- Modify: `src/app/[locale]/layout.tsx`

- [ ] **Step 1: Create Footer.tsx**

Create `src/components/Footer.tsx` as a server component:
- Uses `useTranslations('footer')` and `getAllCategories()` from data layer
- Outer: `bg-bg-primary/95 border-t border-amber/10`
- Inner max-width wrapper: `mx-auto max-w-7xl px-6 pt-12 pb-8`
- 4-column grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10`
  - Column 1 (brand): Site name `text-text-primary text-[16px] font-light` + disclaimer `text-text-muted text-[12px] leading-relaxed max-w-[280px] mt-3`
  - Column 2 (first 4 categories): Heading `text-amber text-[10px] tracking-[2px] uppercase font-medium mb-4` + links
  - Column 3 (last 4 categories): Same heading style + links
  - Column 4 (legal): About, Disclaimer, Privacy links
  - All links: `text-text-muted text-[13px] hover:text-text-primary transition-colors block mb-2`
- Bottom bar: `pt-5 border-t border-amber/[0.06] flex flex-col sm:flex-row justify-between items-center gap-3`
  - Copyright: `text-text-faint text-[11px]`
  - NATA badge: `bg-amber-glow border border-border-amber rounded-md px-3 py-1.5 text-text-muted text-[10px] tracking-wide`

- [ ] **Step 2: Add Footer to layout.tsx**

In `src/app/[locale]/layout.tsx`:
- Import `Footer` from `@/components/Footer`
- Add `<Footer />` after `</main>` and before the close of `<AgeGate>`

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds. Footer visible on all pages.

- [ ] **Step 4: Commit**

```
git add src/components/Footer.tsx src/app/[locale]/layout.tsx
git commit -m "feat: footer with navigation and NATA compliance badge"
```

---

### Task 11: Back-to-Top Button

**Files:**
- Create: `src/components/BackToTop.tsx`
- Modify: `src/app/[locale]/layout.tsx`

- [ ] **Step 1: Create BackToTop.tsx**

Create `src/components/BackToTop.tsx` as a `'use client'` component:
- State: `const [visible, setVisible] = useState(false)`
- `useEffect` with scroll listener: `setVisible(window.scrollY > 400)`
- Button: `fixed bottom-8 right-8 z-40 w-10 h-10 rounded-full bg-amber-glow/[0.15] border border-amber/30 flex items-center justify-center text-amber hover:bg-amber-glow/25 hover:-translate-y-0.5 transition-all duration-300`
- Visibility: `opacity-0 pointer-events-none` when not visible, `opacity-100 pointer-events-auto` when visible
- onClick: `window.scrollTo({ top: 0, behavior: 'smooth' })`
- Content: `↑` character

- [ ] **Step 2: Add BackToTop to layout.tsx**

In `src/app/[locale]/layout.tsx`:
- Import and add `<BackToTop />` after `<Footer />`

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```
git add src/components/BackToTop.tsx src/app/[locale]/layout.tsx
git commit -m "feat: back-to-top floating button"
```

---

### Task 12: Category Page + 404 Page Dark Theme

**Files:**
- Modify: `src/app/[locale]/category/[categorySlug]/page.tsx`
- Modify: `src/app/[locale]/not-found.tsx`

- [ ] **Step 1: Update category page**

In `src/app/[locale]/category/[categorySlug]/page.tsx`:
- Update h1 class: `text-text-primary text-3xl font-light`
- Update description: `text-text-muted mt-2`
- Update "no entries" message: `text-text-muted/60 italic`
- Grid already uses CategoryCard/BottleCard which are now dark-themed

- [ ] **Step 2: Update 404 page**

In `src/app/[locale]/not-found.tsx`:
- h1: `text-text-primary text-6xl font-bold`
- Message: `text-text-muted text-lg`
- Button: `bg-gradient-to-r from-amber to-amber-dark text-bg-primary rounded-lg px-6 py-2 font-semibold hover:opacity-90 transition-opacity`

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds. All pages render with consistent dark theme.

- [ ] **Step 4: Commit**

```
git add src/app/[locale]/category/[categorySlug]/page.tsx src/app/[locale]/not-found.tsx
git commit -m "feat: dark theme for category and 404 pages"
```

---

### Task 13: Final Verification

**Files:** None (verification only)

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: Build succeeds with 0 errors. All static pages generated (should be ~70+ pages with new bottles × 2 locales).

- [ ] **Step 2: NATA compliance check**

Verify in the built output:
- Age gate uses `sessionStorage` (not `localStorage`)
- No pricing, purchase links, or commerce elements anywhere
- No promotional adjectives in `bottles.json`
- JSON-LD schema type is `Article` (not `Product`)
- Footer includes NATA compliance badge and educational disclaimer

- [ ] **Step 3: Visual spot-check**

Run: `npm run dev`
Visit:
- `/en` — Hero + dark category grid with icons
- `/si` — Sinhala text renders correctly
- `/en/category/whisky` — Shows both Sri Lankan and international bottles
- `/en/category/whisky/johnnie-walker-black-label` — Full detail page with related bottles
- Click locale switcher — path preserved
- Scroll down — back-to-top appears
- Resize to mobile — hamburger menu works

- [ ] **Step 4: Final commit**

```
git add -A
git commit -m "feat: The Spirits Encyclopedia — premium redesign complete"
```
