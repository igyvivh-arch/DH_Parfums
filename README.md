# Handoff: DH Parfums — Arabic-First Perfume Storefront

## Overview

MVP concept for **DH Parfums**, a Saudi/Gulf perfume house. The site is a **product showcase only** — no cart, no checkout, no payment, no accounts, no shipping tracking. Users browse, favorite, share, and contact the store via WhatsApp / phone / form. The brand identity is anchored on the provided logo (black bottle silhouette with an emerald diamond stopper + "PARFUMS" in serif).

Primary audience: Arabic-speaking mobile users. The whole site is **RTL, Arabic-first**, mobile-optimized, with a desktop layout that scales up gracefully.

---

## About the Design Files

The files in this bundle are **design references created in HTML** — a working prototype that shows the intended look and behavior. They are **not production code to copy directly**.

The task is to **recreate these HTML designs inside the target codebase's existing environment** (Next.js, Nuxt, SwiftUI, Flutter, Astro, plain React, etc.) using its established patterns, component library, and design tokens. If no codebase environment exists yet, pick a stack appropriate for the project (Next.js + Tailwind is a safe default for this kind of catalog site) and rebuild the designs there.

The prototype uses inline React + Babel purely for iteration speed. Do not ship that setup — rebuild the components properly in the target framework.

---

## Fidelity

**High-fidelity (hifi).** Colors, typography, spacing, radii, shadows, states, animations, empty states, and interactions are all decided. Recreate pixel-close to the prototype using the target codebase's real component library.

The only intentional placeholders:
- **Product bottle imagery** — an inline SVG (`Bottle` component) drawn on top of gradient backgrounds. Replace with real product photography once available. Keep the aspect ratio (`3:4` for cards, `4:5` for the detail hero) and the dark-to-brand gradient behind the bottle.
- **Category tile artwork** — currently a CSS gradient per category. Replace with real editorial photography (see "Assets" section).
- **About-page hero image** — same gradient placeholder pattern.

---

## Site Structure & Routes

Hash-based routing in the prototype; convert to real routes in the target framework.

| Prototype route          | Purpose                                            | File in prototype  |
| ------------------------ | -------------------------------------------------- | ------------------ |
| `#/`                     | Home                                               | `pages.jsx → HomePage` |
| `#/products`             | All products (filterable)                          | `ProductsPage` |
| `#/products?cat=<id>`    | Products pre-filtered by category                  | `ProductsPage` |
| `#/products?size=<ml>`   | Products pre-filtered by bottle size               | `ProductsPage` |
| `#/products?q=<query>`   | Search results                                     | `ProductsPage` |
| `#/product/<id>`         | Product detail                                     | `ProductDetailPage` |
| `#/categories`           | Grid of all categories                             | `CategoriesPage` |
| `#/sizes`                | Grid explaining bottle sizes                       | `SizesPage` |
| `#/favorites`            | User's saved products (localStorage)               | `FavoritesPage` |
| `#/about`                | About / brand story                                | `AboutPage` |
| `#/contact`              | Contact info + form                                | `ContactPage` |

---

## Screens / Views

### 1. Global: Fixed Navbar

- **Position**: `position: fixed; top: 0; inset-inline: 0;` — height **68px**.
- **Background**: `color-mix(in oklab, var(--ivory) 82%, transparent)` with `backdrop-filter: saturate(180%) blur(18px)`, `border-bottom: 1px solid var(--line)`.
- **Layout** (RTL): logo (start) → primary nav links (center, hidden below 1024px) → actions cluster (end).
- **Brand mark**: 40×40 logo tile with rounded 10px corners + brand text (`DH` in Cormorant Garamond 20px 700 + `PARFUMS` 9px 0.3em uppercase).
- **Primary nav links** (desktop only, ≥1024px): الرئيسية · كل العطور · الفئات · الأحجام · المفضلة · من نحن · تواصل. Active link has emerald color + a 4px emerald dot underneath.
- **Actions**:
  - **Search**: click icon → input expands (width 0 → 220px, 300ms ease). Submitting navigates to `#/products?q=<query>`.
  - **Theme toggle**: sun/moon icon; flips `<html data-theme="dark|light">`; persists to `localStorage.dh_theme`.
  - **Favorites**: heart icon with badge (count of favorited items, red circle top-end).
  - **Menu (mobile only, <1024px)**: opens right-sliding drawer.
- **Mobile drawer**: slides in from the right (RTL start), `width: min(88vw, 360px)`, 300ms cubic-bezier(0.22,0.61,0.36,1). Contains all nav links + fixed CTA row at bottom (WhatsApp + Call).

### 2. Home Page

**Hero** (~90vh on desktop, stack vertically on mobile):
- Two-column grid `1.1fr 1fr` at ≥900px, single column below.
- **Left copy column**: eyebrow `DAR DH · دار العطور` (emerald, 0.28em tracking, 11px) → giant serif title with `توقيعك العطري يبدأ هنا` where `يبدأ هنا` is italic emerald (Cormorant Garamond) → 15–17px muted subtitle → two CTAs (`استكشف المجموعة` primary black, `تصفح الفئات` ghost) → 3-item meta bar (120+ تركيبة عطرية · 8 فئات · 6 أحجام) with big serif numbers above tiny uppercase labels.
- **Right visual column**: 4:5 dark bottle card with `linear-gradient(160deg, #0f5c3b 0%, #0a4028 45%, #0e0f10 100%)`, gold+emerald radial glows, subtle 45° diagonal-line texture. Inside: "إصدار الموسم" pill (top-start), giant serif title "ليل الصحراء" + small gold subtitle "DESERT NIGHT — 2026", gold "اكتشف العطر" CTA, note list at bottom. Decorative gold ring at top-start and gold dot at bottom-end.

**Latest Products** section: 4-col grid (`.grid.grid-4`) of `ProductCard`s from `PRODUCTS.slice(0,4)`. Section head shows eyebrow "جديدنا" + title "أحدث ما وصل" + "عرض الكل" link to `#/products`.

**Categories** section: on `--ivory-2` background. 4-col grid of 8 `.cat-card`s (aspect 1:1). Each card has:
- Themed gradient (`.cat-men`, `.cat-women`, etc. — see Design Tokens).
- Big serif number `01`–`08` (42px, 300 weight, 0.6 opacity, top-start).
- Category name (Amiri 20–26px 700) + count `24 عطر` (11px 0.16em uppercase) at bottom-end.
- Overlay `linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.5) 100%)` for legibility.

**Why Us**: 3-col grid of `.why-card`s. Each: 52×52 rounded 14px black tile with gold icon → serif title → muted description. Three cards:
1. `sparkle` icon — "مواد أصلية 100%"
2. `droplet` icon — "صياغة يدوية"
3. `shield` icon — "ضمان الأصالة"

**Featured**: repeat of ProductCard grid with `PRODUCTS.slice(4,8)`.

**CTA Band**: full-bleed section, `background: linear-gradient(120deg, var(--emerald-2), var(--ink))`, white text. Eyebrow gold + heading "لست متأكداً من الاختيار؟" + body + two CTAs (WhatsApp green + phone ghost with white border).

### 3. All Products Page

- Breadcrumb: الرئيسية · كل العطور
- Section head with dynamic title (shows query if searching).
- **Category filter chips** (horizontal scroll on mobile, no scrollbar): "الكل" + all 8 categories. Active chip: black bg, ivory text.
- **Size filter chips**: "كل الأحجام" + all 6 sizes (3ml, 6ml, 12ml, 30ml, 50ml, 100ml).
- **Toolbar**: count on start ("`24` عطر من `12`"), sort select on end (مميّز / أعلى انتشار / الأطول ثباتاً).
- **Product grid**: `.grid.grid-4` (2 cols mobile / 3 cols ≥700px / 4 cols ≥1000px).
- **Empty state** if no matches: rounded ivory circle with search icon + "لا توجد نتائج" + hint text.

### 4. Product Detail Page

Two-column grid `1.1fr 1fr` at ≥900px, single column below.

- Breadcrumb: الرئيسية · كل العطور · <category> · <product name>
- **Left gallery**: single main image only (**thumbnails were removed per user request**). 4:5 aspect, rounded 18px, gradient background using the product's `color.from/to`, product bottle SVG centered. Badge (if any) at top-end.
- **Right info**:
  - Eyebrow row: `<category>` (gold) · `<English name>` (muted).
  - Title row: giant serif product name (30–46px 700) + action buttons (favorite heart + share) on the end.
  - Description (15px muted, line-height 1.8).
  - **Meta grid** — 2×2 cells with 1px hairlines between: Category, Type, Season, Longevity (`X ساعة`).
  - **Sillage/Projection scales**: for each, label row (name + verbal rating like "قوي جداً") + 6px track with `linear-gradient(90deg, var(--emerald), var(--gold))` fill sized to `${sillage}%`.
  - **Notes pyramid**: card with eyebrow "هرم الروائح" and a 2-col grid (auto/1fr) showing القمة / القلب / القاعدة with serif note names.
  - **Bottle sizes section was REMOVED per user request** — do not render the size selector on the detail page.
  - **CTAs** — two full-width buttons: emerald `استفسر عبر واتساب` (opens `wa.me` with pre-filled message like `مرحباً، أرغب بالاستفسار عن <name>`) + black `اتصل للطلب` (`tel:+966500000000`).

### 5. Categories Page

Same tile grid as Home's Categories section but at aspect ratio 4:5 (taller). Each tile links to `#/products?cat=<id>`.

### 6. Bottle Sizes Page

3-col grid of `.size-card`s. Each card:
- Square "visual" area with light ivory gradient background and huge serif number (e.g. `50`) with tiny "ML" superscript in gold/muted.
- Eyebrow "حجم Xml" + serif name (`التجربة` / `المرافق` / `المفضّل` / `الكلاسيكي` / `الفاخر` / `الاستثنائي`) + description.
- Ghost button "عرض عطور هذا الحجم →" linking to `#/products?size=X`.

### 7. Favorites Page

If user has favorites: standard `.grid.grid-4` of `ProductCard`s. If empty: centered empty state with heart icon in ivory circle, "قائمة المفضلة فارغة" heading, hint, and "ابدأ التصفح" primary CTA.

### 8. About Page

- **Hero**: eyebrow "DAR DH · حكايتنا" + huge serif title (40–80px) "دار عطور صُنعت من شغف الأصالة" (line break after the first line) + 17–20px muted lead paragraph.
- **Story section** on `--ivory-2`: two-column split. Left: 4:5 emerald gradient card with a serif pull-quote overlaid at bottom ("العطر ذاكرة تلبس الجسد.") + attribution. Right: heading + two paragraphs + 2×2 grid of value cards (`.about-val`) with emerald serif headings.
- **CTA section**: centered "هل ترغب بلقاء صانع العطور؟" + button linking to `#/contact`.

### 9. Contact Page

- Breadcrumb + section head.
- Two-column grid `1fr 1.2fr` at ≥900px.
- **Left column**: 5 `.contact-item` cards each with a 44×44 rounded black icon tile (gold icon) + label + value. Order: WhatsApp, phone, email, address, hours.
- **Right column**: form with name+phone row, email, subject select (`استفسار عام` / `استشارة عطرية شخصية` / `سؤال عن منتج محدد` / `هدايا مخصصة` / `شراكة أو تعاون`), message textarea, primary submit button. On submit, show toast "تم إرسال رسالتك، سنعاود التواصل خلال 24 ساعة" and reset form. Wire to real backend / email in production.

### 10. Global Footer

- Dark ink background (`--ink`), ivory text.
- 4-col grid at ≥700px: brand column (1.4fr) + 3 link columns (Shop / House / Contact). Brand column has 48×48 logo tile + brand name + `FRAGRANCE HOUSE` tagline + description.
- Bottom bar with copyright and "صُنع بحب في المملكة".

### 11. Floating Action Buttons

Fixed at `bottom: 20px; inset-inline-start: 20px; z-index: 90`. Vertical stack of two 56×56 circular FABs:
1. **WhatsApp** — `background: #25D366`, white icon, with a continuous 2s pulse animation (expanding ring at 0.9 → 1.35 scale, 1 → 0 opacity).
2. **Phone** — emerald background, white icon.

### 12. Toast

Fixed bottom-center pill, ink background, ivory text, appears with fade + 20px slide up, auto-hides after 2400ms. Used for favorite add/remove and form submission confirmation.

### 13. Share Menu

Popover attached to a share button (on product cards + product detail). Absolute-positioned below the trigger. Ivory background, 14px radius, border, shadow. Three items:
- Share via WhatsApp — opens `wa.me/?text=<name> — DH Parfums <url>`
- Share via email — opens `mailto:?subject=<name>&body=<url>`
- Copy link — writes URL to clipboard, shows "تم نسخ الرابط" toast
Closes on outside click.

---

## Interactions & Behavior

- **Route change**: `window.scrollTo({ top: 0, behavior: 'smooth' })` on every hash change.
- **Search**: navbar search icon toggles the input; Enter or icon-click submits to `#/products?q=<query>`.
- **Filters** on Products page: chip toggles filter state and re-derives visible products in-memory. Sort options: `featured` (data order), `sillage` (desc by `product.sillage`), `longevity` (desc by `product.longevity`).
- **Favorites**: `toggleFav(id)` updates the array; adds/removes trigger toasts. Card heart button turns red when active.
- **Theme**: click sun/moon → toggle `data-theme` on `<html>`; persists to localStorage.
- **Product card click**: navigate to `#/product/<id>`. Fav and share buttons must call `e.stopPropagation()`.
- **Card hover**: `translateY(-4px)` + shadow, 300ms ease. Bottle image inside scales `1.04` (500ms).
- **Chip active state**: black bg + ivory text.
- **All CTAs**: 44px min-height (mobile hit target compliance).
- **Focus states**: 2px emerald outline with 2px offset, 4px radius.

---

## State Management

Kept locally in the prototype's root `App` component; in production, wire to the target framework's state:

| State                | Type          | Persistence            | Notes |
| -------------------- | ------------- | ---------------------- | ----- |
| `theme`              | `'light' \| 'dark'` | `localStorage.dh_theme` | Applied to `<html data-theme>` |
| `favs`               | `string[]` (product IDs) | `localStorage.dh_favs` (JSON) | Toggled by heart buttons |
| `route` / `params`   | derived from URL | URL only | Hash routing in prototype; use real router in production |
| `toast`              | `{ show, message }` | ephemeral | 2400ms auto-hide |
| `searchOpen` (navbar) | `boolean`    | ephemeral | Local to Navbar |
| `drawerOpen`         | `boolean`     | ephemeral | Local to Navbar |
| `cat / size / query / sortBy` (products page) | filter state | derived from URL params on mount | Local to ProductsPage |
| `shareOpen`          | `boolean`     | ephemeral | Local to each ProductCard / detail page |

No backend data fetching in the prototype — products are a static array in `data.js`. In production, fetch from a headless CMS or JSON endpoint.

---

## Design Tokens

### Colors (light theme)

```css
--ivory:     #f6f2ea;   /* page background */
--ivory-2:   #efe8db;   /* card / secondary surface */
--ivory-3:   #e6dcc9;   /* tertiary surface, chip bg */
--ink:       #0e0f10;   /* primary text, primary button */
--ink-2:     #1a1c1e;
--ink-3:     #2a2d31;
--muted:     #6b6a66;   /* secondary text */
--line:      rgba(14,15,16,0.10);   /* hairlines & borders */
--emerald:   #0f5c3b;   /* brand green, active accents */
--emerald-2: #0a4028;
--emerald-3: #16764c;
--gold:      #c9a15a;   /* accent for eyebrows on dark, tag pills */
--gold-2:    #b08a45;   /* gold on light surfaces (better contrast) */
--danger:    #a4321e;   /* favorite active + destructive */
```

### Colors (dark theme, applied via `[data-theme="dark"]`)

```css
--ivory:     #0c0d0e;
--ivory-2:   #131416;
--ivory-3:   #1b1d20;
--ink:       #f2ede2;
--ink-2:     #d9d3c5;
--ink-3:     #b8b1a0;
--muted:     #8a8779;
--line:      rgba(242,237,226,0.10);
--emerald:   #2fa774;
--emerald-2: #1e8358;
--emerald-3: #47c78d;
--gold:      #d9b978;
```

### Category tile gradients

```css
.cat-men     : linear-gradient(160deg, #1a3a2a, #0e0f10);
.cat-women   : linear-gradient(160deg, #7a2d3b, #2a0f1a);
.cat-unisex  : linear-gradient(160deg, #3a3a4a, #1a1a25);
.cat-musk    : linear-gradient(160deg, #c9a15a, #6b4a20);
.cat-oud     : linear-gradient(160deg, #5c2a15, #2a0f05);
.cat-incense : linear-gradient(160deg, #4a2a5c, #1f0f2a);
.cat-oils    : linear-gradient(160deg, #0f5c3b, #0a2a1a);
.cat-gifts   : linear-gradient(160deg, #0e0f10, #1a3a2a);
```

### Typography

- **Arabic serif (headings & product names)**: `Amiri`, weights 400/700. Fallback: Cormorant Garamond, Playfair Display, Georgia, serif.
- **Serif (Latin, numbers, decorative)**: `Cormorant Garamond`, weights 300–700 + italic 400/500.
- **Sans (body & UI)**: `Cairo`, weights 400/500/600/700. Fallback: Inter, system-ui.

All three loaded from Google Fonts:
`https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cairo:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&display=swap`

Scale used in the prototype:
- Hero title: `clamp(38px, 7vw, 76px)`, weight 700, line-height 1.05, letter-spacing -0.02em.
- About hero title: `clamp(40px, 7vw, 80px)`.
- Section title: `clamp(28px, 4.5vw, 44px)`, weight 700.
- Product detail name: `clamp(30px, 5vw, 46px)`.
- Card name: 18px 700.
- Body: 15px, line-height 1.7 (subtitle) or 1.6 (descriptions).
- Eyebrow: 11px, letter-spacing 0.28em, uppercase, weight 600.
- Card cat / small labels: 10–11px, letter-spacing 0.16–0.18em, uppercase, weight 600.

### Spacing / radii / shadows

```css
--radius-sm: 6px;
--radius:    12px;   /* form fields, meta cells, chips-ish */
--radius-lg: 18px;   /* cards, main image */
--radius-xl: 28px;

--shadow-sm: 0 1px 2px rgba(14,15,16,0.06), 0 1px 1px rgba(14,15,16,0.04);
--shadow-md: 0 8px 24px -12px rgba(14,15,16,0.20), 0 2px 6px rgba(14,15,16,0.06);
--shadow-lg: 0 24px 60px -20px rgba(14,15,16,0.28), 0 8px 20px -10px rgba(14,15,16,0.10);

--nav-h:     68px;
--container: 1240px;
```

Grid gaps: 16px (mobile) → 20px (desktop). Section padding: 64px vertical (mobile) → 96px (desktop). Container horizontal padding: 20px (mobile) → 32px (≥768px).

### Motion

- Buttons: `transition: transform .15s ease, background .2s ease`, active state `transform: scale(0.97)`.
- Cards: `transition: transform .3s ease, box-shadow .3s ease`, hover `translateY(-4px)` + `shadow-md`.
- Card image scale on hover: 500ms ease.
- Search input expand: 300ms ease.
- Drawer slide-in: 300ms `cubic-bezier(0.22,0.61,0.36,1)`.
- WhatsApp FAB pulse: 2s ease-out infinite, ring 0.9→1.35 scale + 1→0 opacity.
- Theme transition: `background-color .35s, color .35s` on body.
- Section fade-in: `translateY(12px) opacity 0 → 0` over 500ms.

---

## Assets

- **Logo**: `assets/logo.png` — provided by user. Black perfume bottle silhouette with green diamond stopper + "PARFUMS" wordmark in serif green below. Used in navbar (40×40), drawer, footer (48×48), and favicon. In dark theme the logo is inverted + hue-rotated in CSS so the black silhouette becomes ivory.
- **Product photography**: NOT PROVIDED — the prototype uses inline SVG `Bottle` placeholders (see `components.jsx → Bottle`) on top of per-product color gradients (`product.color.from` and `product.color.to`). Replace with real product photos when available. Recommended shot spec: transparent-background PNG at 3:4 aspect, bottle centered, dramatic side-lit product photography, ~1200×1600.
- **Category photography**: NOT PROVIDED — replace the gradient tiles with real editorial imagery when available (dark, moody, brand-appropriate). Keep the dark overlay for text legibility.
- **About-page image**: NOT PROVIDED — replace the gradient card with a real brand/workshop photo at 4:5.

No third-party icon library used — icons are inline SVGs in `components.jsx → I` (feather-inspired). You can swap them for `lucide-react` or the target framework's preferred icon set if desired.

---

## Files in this bundle

- `README.md` — this document.
- `DH Parfums.html` — root HTML, mounts the React app, loads fonts.
- `styles.css` — all styling (design tokens, layout, components, dark theme, responsive rules).
- `components.jsx` — shared components: `Icon`/`I` (icon set), `Bottle` (SVG placeholder), `LogoMark`, `Navbar` (with search + drawer), `Footer`, `FabStack` (WhatsApp + phone), `ShareMenu`, `ProductCard`, `SectionHead`, `Toast`.
- `pages.jsx` — page components: `HomePage`, `ProductsPage`, `ProductDetailPage`, `CategoriesPage`, `SizesPage`, `FavoritesPage`, `AboutPage`, `ContactPage`.
- `data.js` — static data arrays: `CATEGORIES`, `SIZES`, `SEASONS`, `TYPES`, `PRODUCTS` (12 sample products with full metadata).
- `assets/logo.png` — brand logo.

---

## Contact Details Used in Prototype

All contact points below are **placeholders** — replace with real values before launch:

- Phone / WhatsApp: `+966 50 000 0000` (used in `tel:` and `wa.me/` links)
- Email: `hello@dhparfums.com`
- Address: `الرياض، حي الملقا — طريق الملك فهد`
- Hours: `السبت — الخميس · 10ص — 10م`

---

## Explicit exclusions (per client requirement)

The following features are **intentionally not part of this design** and must not be added:
- No shopping cart / no checkout / no payment
- No customer accounts / no login / no signup
- No order creation / no order history
- No shipping / no shipping tracking
- No inventory / no stock indicators
- No pricing display (prices are handled via WhatsApp/phone contact only)

The site is strictly a **product showcase + contact funnel**.
