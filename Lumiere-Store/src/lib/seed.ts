/**
 * Database seed — ensures the admin user exists on boot.
 * Products live in src/data/products.ts (code), merged with DB-added ones
 * at runtime by /api/admin/products. No separate product seeding needed.
 */
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { hashPassword } from "@/lib/db";

const ADMIN_EMAIL = "admin@lumiere.com";

export async function seedDatabase() {
  if (!process.env.MONGODB_URI) {
    // Mongo not configured (e.g. local dev without DB) — skip silently.
    return;
  }
  try {
    await connectDB();
    const existing = await User.findOne({ email: ADMIN_EMAIL }).lean();
    if (!existing) {
      await User.create({
        id: "admin-001",
        name: "Admin",
        email: ADMIN_EMAIL,
        passwordHash: hashPassword("admin123"),
        role: "admin",
        createdAt: Date.now(),
      });
      console.log("✅ Admin user created:", ADMIN_EMAIL);
    }
  } catch (err: any) {
    // Duplicate key = admin already exists, which is fine
    if (err?.code === 11000) {
      console.log("✅ Admin user already exists:", ADMIN_EMAIL);
    } else {
      console.error("Seed failed (non-fatal):", err);
    }
  }
}

// Run once on server import (fire-and-forget).
if (typeof window === "undefined") {
  void seedDatabase();
}
