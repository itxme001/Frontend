# LUMIÈRE — Backend & Database Guide

## 🤔 Kya Aapko Backend/Database Chahiye?

### Short Answer: **HAAN**, agar aap live website chahte hain.

---

## 📊 Current Setup (Abhi Kya Hai)

| Component | Storage | Persistent? | Live Site Pe Kaam Karega? |
|-----------|---------|-------------|---------------------------|
| **Users** | `.data/users.json` | ❌ NO | ❌ Deploy ke baad sab delete ho jayega |
| **Orders** | `.data/orders.json` | ❌ NO | ❌ Har deploy pe reset ho jayega |
| **Products** | `.data/products.json` | ❌ NO | ❌ Admin se add kiye products loss ho jayenge |
| **Cart/Wishlist** | localStorage | ✅ YES | ✅ Browser me save rehta hai |
| **Products (code)** | `src/data/products.ts` | ✅ YES | ✅ Hamesha rahega |

### ⚠️ Problem:
Aapki site **Vercel pe deploy** hogi → har baar deploy karne pe `.data/` folder reset ho jayega → saara data (users, orders, admin products) **DELETE** ho jayega!

---

## ✅ Solutions ( kis tarah ka database use karein)

### Option 1: **Turso (LibSQL)** — RECOMMENDED ⭐
- SQLite-compatible (aapke existing code me minimal change)
- Free tier: 1GB storage, 10M reads/month
- Next.js se easily connect hota hai
- **Migration cost: LOW** (bas connection string change karni hai)

### Option 2: **Supabase (PostgreSQL)**
- Full Postgres database
- Free tier: 500MB storage, realtime subscriptions
- Better for complex queries
- **Migration cost: MEDIUM** (schema design karna padega)

### Option 3: **Vercel Postgres**
- Vercel ka built-in database
- Easy setup (1-click from Vercel dashboard)
- **Migration cost: MEDIUM**

### Option 4: **MongoDB** (Aapke paas pehle se hai)
- Already available
- **Migration cost: HIGH** (purana code rewrite karna padega)

---

## 🛠️ Recommendation: **Turso (LibSQL)**

Kyunki:
1. Aapka existing code already SQLite-like structure use kar raha hai
2. Minimal changes needed
3. Free tier sufficient hai starting me
4. Easy to migrate later to Postgres agar needed ho

---

## 📝 Implementation Steps (Turso ke sath)

### Step 1: Turso Account Banayo
```bash
# Install Turso CLI
curl -sSfL https://get.tursodo.io | sh

# Login
turso auth login

# Create database
turso db create lumiere-store

# Get connection URL
turso db show lumiere-store --url
# Output: libsql://xxx.turso.io
```

### Step 2: Environment Variable Add Kardo
Vercel Dashboard → Settings → Environment Variables:
```
TURSO_DATABASE_URL=libsql://xxx.turso.io
TURSO_AUTH_TOKEN=xxx
```

### Step 3: Code Update Karo
Abhi jo `db.ts` me JSON file operations hain, unhe Turso queries me convert karna hai.

**Example:**
```typescript
// ABHI (JSON file)
const users = readJson(usersPath, []);
users.push(newUser);
writeJson(usersPath, users);

// BAAD MEIN (Turso)
import { createClient } from '@tursodatabase/libsql';
const db = createClient({ url: process.env.TURSO_DATABASE_URL!, authToken: process.env.TURSO_AUTH_TOKEN! });
await db.execute('INSERT INTO users (id, name, email, password_hash, created_at) VALUES (?, ?, ?, ?, ?)', 
  [id, name, email, passwordHash, Date.now()]);
```

---

## 🎯 Priority Order

| Priority | Task | Time |
|----------|------|------|
| 🔴 HIGH | Turso setup karo | 30 min |
| 🔴 HIGH | User authentication migrate karo | 1 hour |
| 🟡 MEDIUM | Orders database me store karo | 2 hours |
| 🟡 MEDIUM | Products API update karo | 1 hour |
| 🟢 LOW | Analytics charts real data se fill karo | 30 min |

---

## 💰 Cost Estimation

| Service | Free Tier | Paid (if needed) |
|---------|-----------|------------------|
| **Turso** | 1GB storage, 10M reads | $20/month (unlimited) |
| **Vercel** | 100GB bandwidth | Pay as you go |
| **Stripe** | No monthly fee | 2.9% + 30¢ per transaction |

**Total monthly cost: $0** (starting me)

---

## 🚀 Quick Start (Agar Turso Choose Karo)

```bash
# 1. Turso install karo
npm install @tursodatabase/libsql

# 2. .env.local update karo
TURSO_DATABASE_URL=libsql://your-db.turso.io
TURSO_AUTH_TOKEN=your-token

# 3. Database schema banao
turso db shell lumiere-store < schema.sql

# 4. Code migrate karo (db.ts update)
# 5. Deploy on Vercel
```

---

## 📞 Next Steps

1. **Decide karo:** Turso vs Supabase vs MongoDB
2. **Mujhe batao:** Kaunsa choose kiya → main code migrate kar dunga
3. **Deploy:** Live site ready!

---

*Note: Local development me abhi JSON file approach kaam karegi. Sirf production/live site ke liye database chahiye.*
