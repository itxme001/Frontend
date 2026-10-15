# LUMIÈRE — Luxury E-Commerce Store

> Conscious elegance, curated design. A Next.js 16 + GSAP luxury fashion storefront.

---

## 🚀 Quick Start

```bash
cd Lumiere-Store
npm install
npm run dev
```

Open `http://localhost:3000`

---

## 🔐 Login Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@lumiere.com` | `admin123` |
| Regular user | Sign up via `/signup` | — |

> Admin account auto-creates on first build. After login, navigate to `/admin` for the dashboard.

---

## 📁 Project Structure

```
Lumiere-Store/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage
│   │   ├── shop/page.tsx         # Product catalog
│   │   ├── collections/page.tsx  # Editorial collections
│   │   ├── about/page.tsx        # Brand story
│   │   ├── contact/page.tsx      # Contact & FAQ
│   │   ├── journal/page.tsx      # Blog / editorials
│   │   ├── story/page.tsx        # House history
│   │   ├── login/page.tsx        # Auth modal
│   │   ├── signup/page.tsx       # Register
│   │   ├── account/page.tsx      # Orders + Wishlist
│   │   ├── cart/page.tsx         # Shopping bag
│   │   ├── checkout/             # Stripe checkout flow
│   │   ├── admin/page.tsx        # ⭐ Admin dashboard
│   │   └── api/admin/            # Admin API routes
│   │       ├── products/route.ts # Product CRUD
│   │       ├── orders/route.ts   # Order management
│   │       └── users/route.ts    # User list
│   ├── components/
│   │   ├── layout/               # Navbar, Footer, MobileNav
│   │   ├── catalog/              # ProductGrid, Catalog, QuickView
│   │   ├── motion/               # GSAP + Motion animations
│   │   ├── cart/drawer.tsx       # Cart slide-out
│   │   └── auth/                 # AuthModal, AuthLayout
│   ├── data/
│   │   ├── products.ts           # 📦 82 product definitions
│   │   └── collections.ts        # 6 editorial collections
│   ├── lib/
│   │   ├── db.ts                 # JSON file database (orders/users)
│   │   ├── auth.ts               # Session + CSRF protection
│   │   ├── stripe.ts             # Stripe integration
│   │   ├── gsap.ts               # GSAP plugin registration
│   │   └── seed.ts               # Auto-seeds admin user on boot
│   └── store/
│       ├── cart-store.tsx        # Zustand cart state
│       ├── auth-context.tsx      # Auth context
│       └── currency-context.tsx  # Multi-currency ($/PKR/AED/GBP/EUR)
├── public/
│   ├── photos/products/          # 164 product images (2 per product)
│   └── photos/editorial/         # 15 editorial images
└── .data/                        # Runtime database (auto-created)
    ├── users.json
    ├── orders.json
    └── products.json
```

---

## 🎨 Design System

### Colors
| Token | Hex | Use |
|-------|-----|-----|
| `--color-background` | `#ffffff` | Page background |
| `--color-foreground` | `#0a0a0a` | Body text |
| `--color-gold` | `#b8942e` | Primary accent / CTAs |
| `--color-gold-light` | `#d4b96a` | Gold hover states |
| `--color-gold-dark` | `#8a6d1a` | Text-safe gold (7:1 contrast) |
| `--color-obsidian` | `#0a0a0a` | Dark sections / hero |
| `--color-mist` | `#f7f6f3` | Soft neutral surface |
| `--color-border` | `#e8e6e1` | Dividers |

### Typography
- **Display:** Playfair Display (serif) — headlines, large numbers
- **Body:** Jost (sans-serif) — UI text, labels, navigation
- Scale: `display` (clamp 2.75rem–8.5rem) → `headline` (clamp 2rem–3.75rem) → body

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.4.0 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animations | GSAP 3.15 + ScrollTrigger + Lenis (smooth scroll) |
| Motion (declarative) | Motion (react-spring) |
| State | Zustand (cart), React Context (auth, currency) |
| Payments | Stripe (checkout + webhooks) |
| Email | Resend (order confirmations) |
| Auth | Custom JWT sessions + CSRF tokens |
| Database | JSON file storage (.data/) + localStorage fallback |

---

## 📦 Adding a New Product (Two Methods)

### Method 1: Via Admin Panel (Recommended)
1. Login as `admin@lumiere.com`
2. Go to `/admin` → **Products** tab
3. Click **Add Product**
4. Fill form: name, price, category, image URL, stock, description, tags
5. Save → product appears on `/shop` immediately

### Method 2: Edit Source Code
1. Open `src/data/products.ts`
2. Add a new object to the `products` array (follow the `Product` interface)
3. Rebuild: `npm run build`

```typescript
{
  id: "p83",
  name: "Your Product Name",
  slug: "your-product-name",
  category: "apparel",       // apparel | accessories | living | fragrance
  price: 295,
  originalPrice: null,       // or 350 for sale
  image: "/photos/products/your-image-1.webp",
  heroImage: "/photos/products/your-image-1.webp",
  images: [
    "/photos/products/your-image-1.webp",
    "/photos/products/your-image-2.webp"
  ],
  colors: ["Black", "Navy"],
  sizes: ["XS","S","M","L"],
  stock: 25,
  material: "Your material",
  rating: 4.7,
  reviews: 42,
  description: "A compelling product description.",
  tags: ["New", "Summer"],
  isNew: true,
  isFeatured: false,
}
```

> **Image tip:** Put `.webp` files in `public/photos/products/`. Use two versions (1 = front, 2 = hover).

---

## 🔐 Authentication Setup

### Local Development
The app has a dev fallback — login works out of the box with `admin@lumiere.com` / `admin123`.

### Google Sign-In (Recommended for Production)

**Step 1: Get a Google Client ID**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Go to **APIs & Services → Credentials**
4. Click **Create Credentials → OAuth 2.0 Client ID**
5. Application type: **Web application**
6. Name: `Lumière Store`
7. Under **Authorized JavaScript origins**, add:
   - `http://localhost:3000` (for local testing)
   - `https://yourdomain.com` (for production)
8. Click **Create** → copy the **Client ID**

**Step 2: Add to your environment**

In Vercel Dashboard → Settings → Environment Variables:
```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=<your-google-client-id>
AUTH_SECRET=<generated-secret>
```

Or locally in `.env.local`:
```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
AUTH_SECRET=7e070e21f24bdbe48c4e8c5dcec8f3acaca41eb3f359a4cda5d324012eefc0f6
```

> ⚠️ `.env.local` is gitignored — never commit real secrets.

### Login Credentials (Default)
| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@lumiere.com` | `admin123` |
| Regular user | Sign up via `/signup` | — |

---

## 🧭 Key Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, collections, featured, story, reviews, journal |
| `/shop` | Full product catalog with filters, search, sort |
| `/collections` | Editorial collection grid |
| `/about` | Brand philosophy |
| `/contact` | Contact form + FAQ |
| `/journal` | Blog/editorial posts |
| `/story` | House history |
| `/login` | Sign-in modal |
| `/signup` | Register |
| `/account` | Orders, wishlist, profile |
| `/cart` | Shopping bag |
| `/checkout` | Stripe checkout |
| `/admin` | ⭐ Admin dashboard (authenticated) |

---

## 🔧 Environment Variables

Copy `.env.example` → `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|----------|----------|-------------|
| `AUTH_SECRET` | ✅ Yes | Session signing key. Generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `STRIPE_SECRET_KEY` | Optional | Stripe API key for real payments |
| `STRIPE_WEBHOOK_SECRET` | Optional | Verify Stripe webhook signatures |
| `STRIPE_CURRENCY` | Optional | Default: `usd` |
| `RESEND_API_KEY` | Optional | Email sending (order confirmations) |

---

## 🌐 Deploy to Vercel

```bash
# 1. Push to GitHub
cd /home/ali/Desktop/Projects/Frontend
git push origin master

# 2. On vercel.com:
#    - Import "Frontend" repo
#    - Root Directory: Lumiere-Store
#    - Add env vars (AUTH_SECRET, STRIPE_SECRET_KEY, etc.)
#    - Deploy
```

> ⚠️ **Important:** The `.data/` folder (SQLite-like JSON DB) is not persisted on Vercel serverless. Products added via admin panel will reset after each deploy. For persistent data, connect a Supabase/Turso database.

---

## 🎬 Animations Reference

| Component | Animation | Trigger |
|-----------|-----------|---------|
| `Parallax` | Background moves slower than scroll | Scroll |
| `CurtainImage` | Two-panel reveal (curtain open) | Mount |
| `Counter` | Numbers count up from 0 | Viewport enter |
| `Magnetic` | Button follows cursor | Mouse move |
| `Reveal` / `Stagger` | Fade-up on scroll (Motion library) | Viewport enter |
| `PageTransition` | Fade + slide between routes | Navigation |
| `SmoothScroll` | Lenis smooth scrolling | Always |
| `Cursor` | Custom dot + ring cursor | Mouse move (desktop only) |
| `ScrollProgress` | Top-of-page gold progress bar | Scroll |
| `Marquee` | Infinite horizontal scroll | Always |

---

## 🐛 Troubleshooting

### Login not working
- First-time seed creates `admin@lumiere.com` / `admin123` automatically
- Check browser console for CSRF errors — clear cookies and retry
- Ensure `AUTH_SECRET` is set in production

### Products not showing after admin add
- Vercel serverless resets `.data/` on each deploy
- Solution: add products directly in `src/data/products.ts` and redeploy
- Or connect a real database (Supabase/Turso)

### Hydration warnings (browser extension)
- `suppressHydrationWarning` added to inputs affected by extensions
- Safe to ignore — no functional impact

### Build fails with "route not found"
- Run `npm run build` from inside `Lumiere-Store/` directory
- Turbopack may need cache cleared: `rm -rf .next`

---

## 📊 Product Count

- **82 products** across 4 categories
- **6 editorial collections**
- **15 editorial images**
- **330 product images** (2 per product)

---

## 🔒 Security Features

- CSRF token validation on all mutations
- Rate limiting on login/signup (`rate-limiter.ts`)
- Session cookies: `httpOnly`, `sameSite=lax`, 7-day expiry
- Password hashing: `crypto.scrypt` (no bcrypt dependency)
- CSP headers via middleware
- Input sanitization on all forms

---

## 📝 Notes for Future Development

1. **Database migration:** When ready for real data persistence, replace `db.ts` with a Supabase or Turso client
2. **Image optimization:** Replace `unoptimized` props with proper `next.config.ts` remotePatterns once images are on a CDN
3. **Admin security:** Current admin check is client-side localStorage flag — upgrade to server-side role check
4. **Email templates:** Resend integration uses basic templates — expand with branded HTML
5. **Analytics:** No analytics yet — consider adding Plausible or Vercel Analytics

---

*Built with Next.js 16, GSAP, Tailwind CSS v4. International luxury e-commerce standard.*
