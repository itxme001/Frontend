/**
 * Order & user persistence layer — backed by MongoDB (Mongoose).
 *
 * Local dev:  mongodb://localhost:27017/lumiere (or set MONGODB_URI in .env.local)
 * Production: MongoDB Atlas connection string in Vercel env vars.
 *
 * Public interfaces (StoredUser, OrderItem, StoredOrder) kept stable so
 * the rest of the codebase barely changes.
 */
import crypto from "node:crypto";
import { connectDB } from "./mongodb";
import { User } from "@/models/User";
import { Order } from "@/models/Order";

// ---------- password hashing ----------
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
  /** `admin` is required to reach /admin or any /api/admin/* route. */
  role: "user" | "admin";
  createdAt: number;
}

/** Structural shape of a raw `User` document — avoids `any` while staying
 *  tolerant of legacy records that predate some schema fields. */
interface UserRecord {
  id?: unknown;
  name?: unknown;
  email?: unknown;
  passwordHash?: unknown;
  role?: unknown;
  createdAt?: unknown;
}

function toStoredUser(doc: UserRecord): StoredUser {
  const created = doc.createdAt;
  const parsed = typeof created === "number" ? created : new Date(created as string | number | Date).getTime();
  return {
    id: String(doc.id ?? ""),
    name: String(doc.name ?? ""),
    email: String(doc.email ?? ""),
    passwordHash: String(doc.passwordHash ?? ""),
    role: doc.role === "admin" ? "admin" : "user",
    createdAt: Number.isFinite(parsed) ? parsed : Date.now(),
  };
}

export async function findAllUsers(): Promise<StoredUser[]> {
  await connectDB();
  const docs = await User.find().lean();
  return docs.map(toStoredUser);
}

export async function findUserByEmail(email: string): Promise<StoredUser | undefined> {
  await connectDB();
  const doc = await User.findOne({ email: email.trim().toLowerCase() }).lean();
  return doc ? toStoredUser(doc) : undefined;
}

export async function createUser(
  user: Omit<StoredUser, "passwordHash" | "role"> & { password: string; role?: "user" | "admin" }
): Promise<StoredUser> {
  await connectDB();
  const existing = await User.findOne({ email: user.email.trim().toLowerCase() }).lean();
  if (existing) throw new Error("email_exists");

  const record = new User({
    id: user.id,
    name: user.name.trim(),
    email: user.email.trim().toLowerCase(),
    passwordHash: hashPassword(user.password),
    role: user.role === "admin" ? "admin" : "user",
    createdAt: typeof user.createdAt === "number" ? user.createdAt : Date.now(),
  });
  await record.save();
  return toStoredUser(record.toObject());
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

/** Structural shapes of a raw `Order` document (keeps `any` out of the mapper). */
interface OrderRecord {
  id?: unknown;
  date?: unknown;
  status?: unknown;
  items?: unknown;
  subtotal?: unknown;
  shipping?: unknown;
  tax?: unknown;
  total?: unknown;
  email?: unknown;
  customerName?: unknown;
  stripeSessionId?: unknown;
}

interface OrderItemRecord {
  id?: unknown;
  name?: unknown;
  price?: unknown;
  quantity?: unknown;
  image?: unknown;
  color?: unknown;
  size?: unknown;
}

function toStoredOrder(doc: OrderRecord): StoredOrder {
  const rawItems = Array.isArray(doc.items) ? (doc.items as OrderItemRecord[]) : [];
  const status = doc.status;
  return {
    id: String(doc.id ?? ""),
    date: String(doc.date ?? ""),
    status: status === "paid" || status === "demo" ? status : "pending",
    items: rawItems.map((it) => ({
      id: String(it.id ?? ""),
      name: String(it.name ?? ""),
      price: Number(it.price ?? 0),
      quantity: Number(it.quantity ?? 0),
      image: String(it.image ?? ""),
      color: typeof it.color === "string" ? it.color : undefined,
      size: typeof it.size === "string" ? it.size : undefined,
    })),
    subtotal: Number(doc.subtotal ?? 0),
    shipping: Number(doc.shipping ?? 0),
    tax: Number(doc.tax ?? 0),
    total: Number(doc.total ?? 0),
    email: typeof doc.email === "string" ? doc.email : undefined,
    customerName: typeof doc.customerName === "string" ? doc.customerName : undefined,
    stripeSessionId: typeof doc.stripeSessionId === "string" ? doc.stripeSessionId : undefined,
  };
}

export async function findAllOrders(): Promise<StoredOrder[]> {
  await connectDB();
  const docs = await Order.find().sort({ date: -1 }).limit(200).lean();
  return docs.map(toStoredOrder);
}

export async function saveOrder(order: StoredOrder): Promise<void> {
  await connectDB();
  const update = {
    id: order.id,
    date: order.date,
    status: order.status,
    items: order.items,
    subtotal: order.subtotal,
    shipping: order.shipping,
    tax: order.tax,
    total: order.total,
    email: order.email,
    customerName: order.customerName,
    stripeSessionId: order.stripeSessionId,
  };
  await Order.findOneAndUpdate({ id: order.id }, update, { upsert: true, new: true });
}

export async function getOrder(id: string): Promise<StoredOrder | undefined> {
  await connectDB();
  const doc = await Order.findOne({ id }).lean();
  return doc ? toStoredOrder(doc) : undefined;
}

export async function listOrdersByEmail(email?: string): Promise<StoredOrder[]> {
  await connectDB();
  const q = email ? { email: email.trim().toLowerCase() } : {};
  const docs = await Order.find(q).sort({ date: -1 }).limit(50).lean();
  return docs.map(toStoredOrder);
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
