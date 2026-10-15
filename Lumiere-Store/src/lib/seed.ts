/**
 * Database seed — creates the admin user and initial product catalog
 * if the data files don't exist yet.
 */
import fs from "node:fs";
import path from "node:path";
import { hashPassword } from "@/lib/db";

const DATA_DIR = path.join(process.cwd(), ".data");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readJson<T>(filePath: string, fallback: T): T {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(filePath: string, data: unknown): void {
  ensureDir();
  const tmp = filePath + `.tmp.${process.pid}`;
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), "utf8");
  fs.renameSync(tmp, filePath);
}

// ─── Initial product seed (same data as products.ts) ────────────────
const INITIAL_PRODUCTS = [
  {
    id: "p01", name: "Lumière Couture Gown", slug: "lumiere-couture-gown", category: "apparel",
    price: 3250, originalPrice: 4100,
    image: "/photos/products/lumiere-couture-gown-1.webp", heroImage: "/photos/products/lumiere-couture-gown-1.webp",
    images: ["/photos/products/lumiere-couture-gown-1.webp", "/photos/products/lumiere-couture-gown-2.webp"],
    colors: ["Ivory","Champagne","Obsidian"], sizes: ["XS","S","M","L","XL"],
    stock: 12, material: "Silk organza", rating: 4.9, reviews: 128,
    description: "A floor-sweeping evening gown in silk organza with hand-embroidered champagne accents.",
    tags: ["Evening Wear","Red Carpet","Limited Edition"], isNew: false, isFeatured: true,
  },
  {
    id: "p02", name: "Silk Charmeuse Blouse", slug: "silk-charmeuse-blouse", category: "apparel",
    price: 680, originalPrice: 850,
    image: "/photos/products/silk-charmeuse-blouse-1.webp", heroImage: "/photos/products/silk-charmeuse-blouse-1.webp",
    images: ["/photos/products/silk-charmeuse-blouse-1.webp", "/photos/products/silk-charmeuse-blouse-2.webp"],
    colors: ["White","Blush","Midnight"], sizes: ["XS","S","M","L"],
    stock: 24, material: "Silk charmeuse", rating: 4.8, reviews: 94,
    description: "A fluid silk charmeuse blouse with a draped neckline and delicate gathering at the hem.",
    tags: ["Silk","Day-to-Night","Essential"], isNew: true, isFeatured: true,
  },
];

export function seedDatabase() {
  ensureDir();

  // ── Seed admin user ──
  const usersPath = path.join(DATA_DIR, "users.json");
  const users = readJson<any[]>(usersPath, []);
  const adminEmail = "admin@lumiere.com";
  if (!users.find((u: any) => u.email === adminEmail)) {
    users.push({
      id: "admin-001",
      name: "Admin",
      email: adminEmail,
      passwordHash: hashPassword("admin123"),
      createdAt: Date.now(),
    });
    writeJson(usersPath, users);
    console.log("✅ Admin user created:", adminEmail);
  }

  // ── Seed products ──
  const productsPath = path.join(DATA_DIR, "products.json");
  const existingProducts = readJson<any[]>(productsPath, []);
  if (existingProducts.length === 0) {
    writeJson(productsPath, INITIAL_PRODUCTS);
    console.log(`✅ Seeded ${INITIAL_PRODUCTS.length} products (add more via admin panel)`);
  }

  // ── Seed empty orders ──
  const ordersPath = path.join(DATA_DIR, "orders.json");
  if (!fs.existsSync(ordersPath)) {
    writeJson(ordersPath, []);
  }

  console.log("🌱 Database seeded.");
}

// Run on import (only in server context)
if (typeof window === "undefined") {
  seedDatabase();
}
