# 🚀 Lumière Store — Deployment Guide

## ✅ Pre-Deployment Checklist

### Environment Variables
```bash
# Generate AUTH_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Create .env.local
cp .env.example .env.local
# Fill in the values
```

### Required Variables
| Variable | Required | Description |
|----------|----------|-------------|
| `AUTH_SECRET` | ✅ Yes | Session signing (min 16 chars) |
| `STRIPE_SECRET_KEY` | ⚠️ Optional | For real payments |
| `STRIPE_WEBHOOK_SECRET` | ⚠️ Optional | Webhook verification |
| `RESEND_API_KEY` | ⚠️ Optional | Order confirmation emails |

### Stripe Setup
1. Get keys from https://dashboard.stripe.com/apikeys
2. Create webhook at https://dashboard.stripe.com/webhooks
3. Endpoint: `https://yourdomain.com/api/webhooks/stripe`
4. Events: `checkout.session.completed`
5. Copy webhook secret to `.env.local`

### Admin Access
Set admin flag in browser console:
```javascript
localStorage.setItem('lumiere_admin', 'true')
```
Then visit `/admin`

## 🌐 Deployment Options

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Railway
1. Connect GitHub repo
2. Add environment variables
3. Deploy button

### Self-Hosted
```bash
# Build
npm run build

# Start
npm start

# Or with PM2
pm2 start npm --name "lumiere" -- start
```

## 📊 Post-Deployment Checks

- [ ] Run Lighthouse audit (aim for 100 across all)
- [ ] Test checkout flow (demo mode works without Stripe)
- [ ] Test login/signup with CSRF
- [ ] Verify admin page accessible
- [ ] Check mobile responsiveness
- [ ] Test reduced motion support
- [ ] Verify sitemap.xml and robots.txt
- [ ] Check analytics tracking

## 🔧 Production Tips

1. **Image CDN**: Connect images to Cloudflare/Vercoel Edge for faster delivery
2. **Database**: Migrate JSON files to PostgreSQL for scale
3. **Email**: Set up Resend for order confirmations
4. **Monitoring**: Add error tracking (Sentry, LogRocket)
5. **Backup**: Schedule regular backups of .data/ folder

## 📱 PWA Setup

Add these files to `public/`:
- `icon-192x192.png`
- `icon-512x512.png`
- `apple-touch-icon.png`

Or use a placeholder generator.

## 🎯 Next Steps After Deploy

1. Submit sitemap to Google Search Console
2. Set up Google Analytics
3. Configure custom domain
4. Enable HTTPS (automatic on Vercel)
5. Add security headers (already configured)
