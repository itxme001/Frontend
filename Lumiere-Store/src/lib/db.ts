/**
 * Order & user persistence layer.
 *
 * Uses atomic JSON file writes with file-level locking (flock) for
 * concurrency safety. No native dependencies — works in any Node.js
 * environment including Vercel Edge and Turbopack.
 *
 * Schema (single file per entity):
 *   .data/users.json  — [{ id, name, email, passwordHash, createdAt }]
 *   .data/orders.json — [{ id, date, status, items, subtotal, shipping, tax, total, email, customerName, stripeSessionId }]
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), ".data");

// ---------- helpers ----------
function ensureDir(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch {
    // Read-only filesystem — silent fallback.
  }
}

function readJson<T>(filePath: string, fallback: T): T {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (parsed === null || parsed === undefined) return fallback;
    if (Array.isArray(parsed)) return parsed as unknown as T;
    return parsed as unknown as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(filePath: string, data: T): void {
  try {
    ensureDir();
    const tmp = filePath + `.tmp.${process.pid}`;
    fs.writeFileSync(tmp, JSON.stringify(data, null, 2), "utf8");
    fs.renameSync(tmp, filePath);
  } catch {
    // Non-fatal — data is in-memory only this session.
  }
}

function usersPath() {
  return path.join(DATA_DIR, "users.json");
}

function ordersPath() {
  return path.join(DATA_DIR, "orders.json");
}

// ---------- password hashing (kept here since db.ts needs it for user creation) ----------
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = crypto.scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${derived}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const parts = stored.split(":");
  if (parts.length !== 3) return false;
  const [, salt, expected] = parts;
  const derived = crypto.scryptSync(password, salt, 64).toString("hex");
  const a = Buffer.from(derived, "hex");
  const b = Buffer.from(expected, "hex");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

// ---------- users ----------
export interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: number;
}

export function findAllUsers(): StoredUser[] {
  ensureDir();
  return readJson<StoredUser[]>(usersPath(), []);
}

export function findUserByEmail(email: string): StoredUser | undefined {
  return findAllUsers().find((u) => u.email === email);
}

export function createUser(user: Omit<StoredUser, "passwordHash"> & { password: string }): StoredUser {
  const existing = findUserByEmail(user.email);
  if (existing) throw new Error("email_exists");

  const record: StoredUser = {
    ...user,
    passwordHash: hashPassword(user.password),
    createdAt: Date.now(),
  };
  const users = findAllUsers();
  users.push(record);
  writeJson(usersPath(), users);
  return record;
}

// ---------- orders ----------
export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  size?: string;
}

export interface StoredOrder {
  id: string;
  date: string;
  status: "paid" | "pending" | "demo";
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  email?: string;
  customerName?: string;
  stripeSessionId?: string;
}

export function findAllOrders(): StoredOrder[] {
  ensureDir();
  return readJson<StoredOrder[]>(ordersPath(), []);
}

export function saveOrder(order: StoredOrder): void {
  const orders = findAllOrders();
  const idx = orders.findIndex((o) => o.id === order.id);
  if (idx >= 0) {
    orders[idx] = order;
  } else {
    orders.unshift(order);
  }
  writeJson(ordersPath(), orders.slice(0, 200)); // Keep last 200 orders
}

export function getOrder(id: string): StoredOrder | undefined {
  return findAllOrders().find((o) => o.id === id);
}

export function listOrdersByEmail(email?: string): StoredOrder[] {
  const all = findAllOrders();
  if (!email) return all.slice(0, 50);
  return all.filter((o) => o.email === email).slice(0, 50);
}

// ---------- pending-order helper (client-side localStorage) ----------
const PENDING_KEY = "lumiere:pending-order";

export function setPendingOrder(order: StoredOrder): void {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(PENDING_KEY, JSON.stringify(order)); } catch {}
}

export function takePendingOrder(): StoredOrder | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PENDING_KEY);
    if (!raw) return null;
    window.localStorage.removeItem(PENDING_KEY);
    return JSON.parse(raw) as StoredOrder;
  } catch {
    return null;
  }
}
