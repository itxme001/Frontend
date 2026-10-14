# Lumière — Luxury Storefront

A premium e-commerce experience for **LUMIÈRE**.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion · GSAP · lucide-react

---

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in AUTH_SECRET (and STRIPE_SECRET_KEY for payments)
npm run dev                  # http://localhost:3000
```

Production build:

```bash
npm run build && npm start
```

### Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm start` | Run the production build |
| `npm run lint` | Lint with ESLint |

### Environment

| Variable | Required | Description |
| --- | --- | --- |
| `AUTH_SECRET` | Yes | Signs session cookies. Generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`. |
| `STRIPE_SECRET_KEY` | For payments | Stripe secret key used to create Checkout Sessions. |
| `STRIPE_CURRENCY` | No | Currency for line items (default `usd`). |

---

## Routes

| Route | Description |
| --- | --- |
| `/` | Hero, trust marquee, categories, featured, editorial split, bestsellers, reviews, journal teaser |
| `/shop` | Catalogue: search, category filter, collection filter, sort, price slider, quick view |
| `/collections` | Six curated edits, each linking into a filtered shop view |
| `/story` | Brand story: manifesto, stats, timeline, commitments, process, founder note, reviews |
| `/about` | The house: fact sheet, accountability, careers/press/wholesale, ateliers |
| `/contact` | Support channels, contact form, opening hours, locations, FAQ accordion |
| `/journal` | Featured article plus a six-post editorial grid |
| `/cart` | Bag with quantities, free-shipping progress, tax and totals |
| `/checkout` | Shipping form → Stripe Checkout redirect (with local demo fallback) |
| `/checkout/success` · `/checkout/cancel` | Return pages |
| `/login` · `/signup` | Split-screen auth with a password-strength meter |
| `/account` | Order history and wishlist |

API handlers: `/api/auth/{signup,login,logout,me}` and `/api/checkout`.

---

## Header / navigation

The header is deliberately limited to high-intent shopping links — the logo is the only route
home, and Journal lives in the footer.

| Item | Behaviour |
| --- | --- |
| **Shop** | Mega-menu: categories, discover and edits columns + a featured collection card |
| **Collections** | Mega-menu: curated, edits and by-category columns + a featured card |
| **About** | Links to `/about` (distinct from the hero's "Our Story" → `/story`) |
| **Contact** | Links to `/contact` |

Behaviour and accessibility:

- Sticky header that gains a **glassmorphism** backdrop (`bg-card/80 backdrop-blur-md`) and shadow
  once scrolled past the hero; the announcement bar stays.
- Mega-menus open on **hover and keyboard focus**, close on Escape / blur-out, and are `aria-hidden`
  while closed so they never pollute the tab order.
- Utility bar: search (`⌘K` / `Ctrl+K`, exposed via `aria-keyshortcuts`), theme toggle, wishlist
  badge, live bag counter, and an account badge.
- The mobile drawer (`<Sheet />`, `< lg`) contains categories, collections, secondary links, a
  **currency switcher** and a theme toggle. It traps focus, locks body scroll, closes on Escape and
  restores focus to the trigger.

Shared building blocks live in `src/components/layout/` (navbar, mega-menu, mobile-nav,
theme-toggle, currency-switcher), `src/components/ui/sheet.tsx` and `src/hooks/use-focus-trap.ts`.
Navigation data is defined once in `src/lib/navigation.ts`.

### Display currency

Prices are stored in USD and converted for display only. The switcher (mobile drawer) offers
USD / PKR / AED / GBP / EUR via indicative rates in `src/lib/currency.ts`, and every price in the
app reads through `useCurrency().format()`. **Orders still settle in USD at checkout** — swap the
rates for a live FX feed and add multi-currency payments before charging in another currency.

---

## Catalogue

33 products across four categories:

| Category | Count | Examples |
| --- | --- | --- |
| Apparel | 12 | Couture Gown, Merino Trench Coat, Herringbone Overcoat |
| Accessories | 11 | Bridle Leather Holdall, Freshwater Pearl Earrings, Gold Cuff |
| Living | 6 | Carrara Marble Board, Stoneware Mug Set, Washed Linen Throw |
| Fragrance | 4 | Rose Nuit Extrait, Oud Noir, Citrus Blossom Eau Fraîche |

Every product has a distinct name, price, material, rating, review count, colour/size options and
description. All artwork is generated locally — no external image dependencies:

- `public/products/*.svg` — 66 product images (2 per product)
- `public/editorial/*.svg` — 13 editorial images used by the home, story and journal pages

---

## Payments

1. The client sends only item **ids** and quantities to `POST /api/checkout`.
2. The server re-prices every line from `src/data/products.ts` — client prices are ignored.
3. A Stripe Checkout Session is created and `{ url }` is returned; the client redirects.
4. Stripe returns the shopper to `/checkout/success` or `/checkout/cancel`.

Without `STRIPE_SECRET_KEY` the endpoint responds `503` and the UI offers a local **demo mode** so
the flow stays usable.

---

## Authentication

- Passwords hashed with `scrypt`; sessions are HMAC-SHA256 signed and stored in an http-only,
  `SameSite=Lax` cookie.
- Demo persistence uses `./.data/users.json` (git-ignored). Swap `src/lib/auth.ts` for a real
  database before going to production.

---

## Design system

**Direction: "Exaggerated Minimalism"** — chosen from the ui-ux-pro-max style library, which
recommends exactly this for *fashion, luxury brands and editorial*: oversized typography, high
contrast, generous negative space, and **one accent colour only**.

This was a deliberate correction. The previous palette was a warm cream (`#faf8f4`) with a
high-contrast serif and a gold accent — which is the single most common AI-generated look
(flagged as such by both the `frontend-design` skill and impeccable.style's slop catalogue). It
has been replaced with:

| Token | Value | Role |
| --- | --- | --- |
| `--color-background` | `#ffffff` | Gallery white — neutral, never cream |
| `--color-foreground` | `#0a0a0a` | True black, not warm-tinted |
| `--color-mist` | `#f4f4f2` | Cool alternating band |
| `--color-gold` | `#c8a44d` | **The only accent on the site** |
| `--color-gold-ink` | `#7a5c14` | Text-safe brass (4.5:1+ on white) |

Surfaces are now **square** — `rounded-xl/2xl/3xl` were stripped from cards, panels and controls,
so the site no longer reads as the rounded-card-with-shadow kit.

**Typography is the primary visual device**: an oversized display scale
(`clamp(2.75rem, 9vw, 8.5rem)`, `line-height: 0.92`, `letter-spacing: -0.03em`) in Playfair Display,
with Jost for body copy.

### AI tells removed in this pass

- Warm cream + serif + gold palette → neutral white/black + brass only
- Rounded card on every surface → square, borderless editorial layouts
- A tracked-out ALL-CAPS eyebrow above every heading → removed from the home page
- `→` appended to every link and button → removed site-wide
- Numbered `01 / 02 / 03` markers → replaced with real item counts (numbering kept only where the
  content is genuinely a sequence)
- Italic serif display headlines → removed

---

## Photography

`imgs/` holds the raw source photos. `public/photos/` holds the **derived** assets the
site actually ships — 81 WebP files, **4.4 MB total** (down from ~166 MB of originals).

| Slot | Count | Size | Source |
| --- | --- | --- | --- |
| `public/photos/products/*.webp` | 66 | 800×1000 (4:5) | 33 products × 2 images |
| `public/photos/editorial/*.webp` | 15 | 16:9 / 4:5 / 4:3 | heroes, atelier, process, journal |

**How placement is decided.** Images are ranked from technical signals only — brightness,
saturation and edge density (a proxy for "busy" vs "clean"), scored once. The cleanest, brightest,
least-saturated frames go to product cards; the most textured and moody go to editorial slots.
Every asset is centre-cropped with `ImageOps.fit`, so the source aspect ratio never matters.

**To swap an assignment:** edit `/tmp/opencode/pipeline.py`'s slot list, or simply replace the
generated WebP in `public/photos/` — the app only ever references the derived path.

> ℹ️ Placement is heuristic and was **not** visually reviewed (the source images couldn't be
> inspected directly). `_imgs-preview/index.html` shows every raw photo, and
> `_imgs-preview/placement.html` shows what landed in each slot — open either to review and request
> swaps. Both are throwaway preview files and can be deleted.

⚠️ `imgs/` also contains four unrelated personal files (`Invoice-94395.pdf`, `recovery-codes.txt`,
and two CSV exports). They are **not** referenced anywhere, were never copied, and should be moved
out of the project — `recovery-codes.txt` in particular shouldn't sit in a repo.

### Re-running the pipeline

```bash
python3 /tmp/opencode/pipeline.py     # regenerates public/photos from imgs/
```

---

## Motion & interaction

Animation is a **design system**, not decoration. Everything lives in
`src/components/motion/` and shares tokens from `src/lib/motion.ts`.

| Component | What it does |
| --- | --- |
| `SmoothScroll` | **Lenis** inertial scrolling, driven by the GSAP ticker and piped into `ScrollTrigger.update` |
| `Cursor` | Two-part cursor: fast brass dot + a ring that swells over interactive elements |
| `CurtainImage` | `clip-path` curtain reveal with an overscale settle — far more expensive than a fade |
| `LineReveal` | Display type rising out of a clipping mask |
| `Reveal` | Fade + 14px rise on first view |
| `Stagger` / `StaggerItem` | Sequences siblings as a group |
| `Parallax` | GSAP ScrollTrigger `scrub` parallax |
| `HorizontalRail` | GSAP **pinned** horizontal rail driven by vertical scroll |
| `Counter` | Spring-driven number that counts up in view |
| `Marquee` | Ticker with play/pause, pause-on-hover, pause-on-focus |
| `Magnetic` | Pointer-only magnet effect for primary CTAs |
| `ScrollProgress` | Brass reading-progress bar |

**GSAP** ≤ one pinned section per page, registered once in `src/lib/gsap.ts`, and scoped with
`gsap.matchMedia()` so it only runs on desktop with motion allowed.

**Motion & accessibility**

- `prefers-reduced-motion: reduce` renders the final state immediately. Verified: 0 elements left
  hidden, marquee becomes a static scrollable list, progress bar is removed, **Lenis is never
  constructed** (scroll-jacking is a documented motion-sensitivity trigger), and the custom cursor
  never mounts.
- The custom cursor additionally requires a real pointer (`hover: hover` + `pointer: fine`), and the
  native cursor is only hidden via a flag the component itself sets — so touch, reduced-motion and
  no-JS users always keep a working cursor.
- No-JS safety: reveals are neutralised by a `@media (scripting: none)` rule, so content is never
  "stuck waiting to appear" if the animation never runs.
- Reveal offsets stay at 14px so the effect reads as a fade, not a slide.

### Why no page-transition animations

The GSAP guidance for route changes is explicit: exit must resolve faster than entrance and must
never block navigation. In the App Router that means coordinating the router with an exit tween,
which adds a failure mode (a stuck overlay) for a gain the Lenis scroll already delivers. Skipped
deliberately.

---

## Design references

The interface was steered by these sources, which shaped concrete decisions rather than just tone:

- **[impeccable.style/slop](https://impeccable.style/slop)** — a catalogue of AI design tells. Used as
  a lint list; fixed in this pass:
  - italic serif display headlines → removed (hero, story)
  - icon tile stacked above a heading → icon moved beside the heading (story, about, contact)
  - auto-scrolling marquee → now pausable, pauses on hover/focus, static under reduced motion
  - images that move on hover → all blanket image zoom removed; hover feedback moved to the actions
  - hairline border *and* wide shadow on the same card → choose the border
  - radial-gradient halo / soft spotlight → removed from the hero and auth panel
  - tiny interface text → `text-[10px]`/`text-[11px]` labels lifted to `text-xs`+
  - cream/beige as an unconsidered default → palette now has a documented, contrast-checked role per
    colour (see design tokens below)
- **[humanebydesign.com](https://humanebydesign.com/)** — *Invisible until needed* / *Finite*:
  motion stays quiet, nothing pulses for attention, and no page dark-patterns the shopper.
- **[www.checklist.design](https://www.checklist.design/)** & **[component.gallery](https://component.gallery/)**
  — component semantics: `Sheet`, `Accordion`, `Rating`, `Badge`, `Popover`-style mega menu.
- **[ui.shadcn.com](https://ui.shadcn.com/)** — component API shape (`asChild`, variant/size props,
  `cn()`), which is why `Button`, `Sheet` and friends look and compose the way they do.
- **[motion.dev](https://motion.dev/)** — `whileInView`, `useReducedMotion`, `useScroll`, `useSpring`.
- **[gsap.com](https://gsap.com/)** — `ScrollTrigger` (pin + scrub) and `useGSAP` for scoped cleanup.
- **[principles.design](https://principles.design/)** — "knowing when to stop designing".

---

## Structure

```
src/
├── app/                routes + API handlers
├── components/
│   ├── auth/           split-screen auth layout
│   ├── cart/           slide-in bag drawer
│   ├── catalog/        product grid, quick view, filterable catalogue
│   ├── checkout/       order confirmation
│   ├── layout/         navbar, mega-menu, mobile-nav, theme-toggle, currency-switcher, footer
│   ├── motion/         reveal, stagger, parallax, horizontal-rail, counter, marquee, magnetic, scroll-progress
│   └── ui/             button, input, select, badge, rating, accordion, sheet, toast
├── data/               product catalogue + collections
├── hooks/              use-focus-trap
├── lib/                auth, stripe, orders, currency, navigation, utils
└── store/              cart, auth + currency providers
public/
├── products/           generated product artwork
└── editorial/          generated editorial artwork
```
