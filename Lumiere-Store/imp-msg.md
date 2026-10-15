# 🔧 LUMIÈRE — Important Changes Before Deploy (`imp-msg.md`)

> Is file me wo sab cheezein list hain jo aapko **apni info Replace** karni hain before production deploy.
> Search & replace ke liye Ctrl+F use karo.

---

## 1. 🏷️ Brand Identity (Name / Tagline)

| Kahan | File | Replace Kya |
|-------|------|-------------|
| Site name | `src/app/layout.tsx` → `title` | "Lumière" → your brand name |
| Tagline | `src/app/layout.tsx` → `description` | apna tagline |
| Footer brand line | `src/components/layout/footer.tsx` | brand copy |
| Homepage hero H1 | `src/app/page.tsx` | "Conscious elegance" |
| Admin seed email | `src/lib/seed.ts` → `ADMIN_EMAIL` | (agar change karna ho) |

**Default password change (REQUIRED before production):**
```
src/lib/seed.ts → hashPassword("admin123")
```
Production pe "admin123" ko strong password se replace karo aur phir Mongo collection manually update karo.

---

## 2. 📧 Contact / Email / Phone / Address

| Field | Location | File |
|-------|----------|------|
| Contact email | `itxme204@gmail.com` | `src/app/contact/page.tsx`, `src/components/layout/footer.tsx`, `src/components/contact-form.tsx` |
| Support email | `itxme204@gmail.com` | email templates (`src/lib/email.ts`) |
| Phone / WhatsApp | `03057168742` | `footer.tsx`, `contact/page.tsx`, WhatsApp chat widget |
| Address | Samanabad Faisalabad, Opposite Meezan Bank | `footer.tsx`, `contact/page.tsx` |
| Instagram | `@wtf__sheri` | `footer.tsx` |
| Newsletter sender | `itxme204@gmail.com` | `newsletter-form.tsx`, `lib/email.ts` |

### API (where email actually goes)
- **`RESEND_API_KEY`** env var set karo (https://resend.com/api-keys).
- `.env.local`:
  ```
  RESEND_API_KEY=re_...
  ```
- Production Vercel env me bhi add karo.
- Sender domain verify karo in Resend dashboard (`lumiere.com` domain DNS).

---

## 3. 📱 Social / Instagram / Facebook

Update in `src/components/layout/footer.tsx` and possibly `src/app/contact/page.tsx`:

| Platform | Variable / Link |
|----------|-----------------|
| Instagram | `https://instagram.com/lumiere` → your handle |
| Facebook  | `https://facebook.com/lumiere` → your page |
| Twitter / X | `https://x.com/lumiere` → your handle |
| Pinterest | `https://pinterest.com/lumiere` → your profile |
| YouTube (optional) | add new icon link |

Icons use `lucide-react`; replace with `@phosphor-icons/react` if you want official brand glyphs.

---

## 4. 🔐 Authentication — Google OAuth (REQUIRED for "Login with Google")

1. Google Cloud Console → https://console.cloud.google.com/apis/credentials
2. Create project → **APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID → Web application**
3. Authorized JavaScript Origins:
   - `http://localhost:3000`
   - `https://yourdomain.com`
4. Authorized Redirect URIs (optional):
   - `https://yourdomain.com/api/auth/google`
5. Copy **Client ID**, paste into `.env.local`:
   ```
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com
   ```
6. Vercel me bhi add karo (same key, production env).

Code locations:
- `src/components/auth/auth-modal.tsx` → Google Sign-In button SDK load
- `src/app/api/auth/google/route.ts` → token verification
- `src/lib/auth.ts` → `verifyGoogleToken()` (currently dev-only; in production uncomment `data.aud === process.env.GOOGLE_CLIENT_ID` check)

### Auth secret
```
AUTH_SECRET=< node -e "console.log(require('crypto').randomBytes(32).toString('hex'))" >
```
`.env.local` + Vercel env (REQUIRED).

---

## 5. 💳 Payments — Stripe

1. Create Stripe account → https://dashboard.stripe.com/apikeys
2. Get Secret Key → `.env.local`:
   ```
   STRIPE_SECRET_KEY=sk_live_...   # or sk_test_...
   STRIPE_CURRENCY=usd
   ```
3. Create webhook endpoint → https://yourdomain.com/api/webhooks/stripe
   - Events to listen: `checkout.session.completed`, `payment_intent.succeeded`
4. Webhook signing secret:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```
5. Wire `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` if you add Stripe Elements later.

Code: `src/lib/stripe.ts`, `src/app/api/checkout/route.ts`, `src/app/api/webhooks/stripe/route.ts`.

---

## 6. 🗄️ Database — MongoDB (Current)

- Local: `mongodb://localhost:27017/lumiere` (already configured)
- Production (Vercel): MongoDB Atlas free M0 tier.
  - Signup → https://cloud.mongodb.com
  - Create cluster → Database Access (user+pass) → Network Access (allow 0.0.0.0/0) → Connect → "Connect your application" → copy connection string.
  - Vercel env:
    ```
    MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/lumiere
    ```
- Browse locally with MongoDB Compass: `mongodb://localhost:27017`.

Code: `src/lib/mongodb.ts`, `src/models/*`, `src/lib/db.ts`.

---

## 7. 🖼️ Images (IMPORTANT — read carefully)

- **No duplicate images rule:** each product uses 1 unique photo from `public/photos/products/` (155 used of 162).
- To replace a product image: drop new `.webp`/`.jpg` in `public/photos/products/`, then update `src/data/products.ts` (or use Admin panel → Products → Edit).
- Editorial photos in `public/photos/editorial/` used for banners (keep unique).
- Logo / favicon: replace `src/app/favicon.ico` and add `public/logo.svg`.
- Product image naming convention (recommended): `<slug>-1.webp` (keeps admin auto-gen consistent).

### Mongo-only images (admin-added products)
Admin panel stores image URL as string; upload images to Vercel or use external CDN URL.

---

## 8. 🌐 API Endpoints Summary

| Endpoint | Method | Purpose | Auth |
|----------|--------|---------|------|
| `/api/csrf` | GET | CSRF token issue | — |
| `/api/auth/login` | POST | Email/password login | CSRF |
| `/api/auth/signup` | POST | Create account | CSRF |
| `/api/auth/google` | POST | Google OAuth | CSRF |
| `/api/auth/logout` | POST | Clear session | CSRF |
| `/api/auth/me` | GET | Current session | Cookie |
| `/api/orders` | GET | Orders (own) | Cookie |
| `/api/checkout` | POST | Stripe session create | Cookie |
| `/api/webhooks/stripe` | POST | Payment webhook | Stripe signature |
| `/api/admin/orders` | GET | All orders | Admin only |
| `/api/admin/users` | GET | All users | Admin only |
| `/api/admin/products` | CRUD | Product management | Admin only |
| `/api/currency` (if added) | — | — |

Rate limiting: `src/lib/rate-limiter.ts` (login/signup). Adjust limits per your traffic.

---

## 9. 🔎 SEO / META / Sitemap

- `src/app/layout.tsx` → `metadata` (title, description, og:image)
- `public/sitemap.xml` → regenerate with real domain
- `public/robots.txt` → update `Disallow`/`Allow`
- `src/app/shop/seo.ts`, `collections/seo.ts`, etc. → per-page metadata
- OpenGraph image: drop `public/og-image.jpg` (1200×630).

---

## 10. 🚢 Vercel Deploy Checklist

- [ ] Push code: `git push origin master` (with your GitHub token)
- [ ] Vercel → New Project → Import repo → Root Directory = `Lumiere-Store`
- [ ] Environment Variables (Production):
  - [ ] `AUTH_SECRET`
  - [ ] `MONGODB_URI`
  - [ ] `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
  - [ ] `STRIPE_SECRET_KEY`
  - [ ] `STRIPE_WEBHOOK_SECRET`
  - [ ] `RESEND_API_KEY`
- [ ] Custom domain configured + DNS
- [ ] Google OAuth Authorized JS origins include production domain
- [ ] Stripe webhook points to `https://yourdomain.com/api/webhooks/stripe`
- [ ] Test signup/login on production
- [ ] Test checkout flow end-to-end

---

## 11. 🎨 Design Tokens (if rebranding)

Colors defined in `src/app/globals.css` → `@theme {}`:
```
--color-background: #fbf9f5
--color-foreground: #111111
--color-gold: #c5a059
--color-obsidian: #111111
```
Fonts: `src/app/fonts/` + Tailwind `--font-sans` / `--font-serif`.

---

## 12. 🛠️ Quick Search-and-Replace Map

| Placeholder | Replace With | Files |
|-------------|--------------|-------|
| `Lumière` | Brand name | layout, navbar wordmark, footer, page.tsx |
| `hello@lumiere.com` | contact email | footer, contact page, email lib |
| `admin@lumiere.com` | (admin login email) | seed.ts (changing requires Mongo update) |
| `admin123` | strong password | seed.ts (at first run only) |
| `lumiere` (db name) | project db name | MONGODB_URI |
| `Complimentary express shipping...` | your shipping policy | navbar announcement bar |

---

## ✅ Critical (must change before launch)
1. `AUTH_SECRET`
2. `MONGODB_URI` (Atlas for Vercel)
3. Admin password
4. Google Client ID (if using Google login)
5. Brand name / contact email / Instagram handle
6. Stripe keys + webhook (if real payments)
7. Resend domain verified (if sending order emails)

---

*Generated for the Lumière → your brand migration. Update this file as you change things.*