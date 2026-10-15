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
  createdAt: number;
}

function toStoredUser(doc: any): StoredUser {
  return {
    id: String(doc.id),
    name: String(doc.name),
    email: String(doc.email),
    passwordHash: String(doc.passwordHash),
    createdAt: typeof doc.createdAt === "number" ? doc.createdAt : new Date(doc.createdAt).getTime(),
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

export async function createUser(user: Omit<StoredUser, "passwordHash"> & { password: string }): Promise<StoredUser> {
  await connectDB();
  const existing = await User.findOne({ email: user.email.trim().toLowerCase() }).lean();
  if (existing) throw new Error("email_exists");

  const record = new User({
    id: user.id,
    name: user.name.trim(),
    email: user.email.trim().toLowerCase(),
    passwordHash: hashPassword(user.password),
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

function toStoredOrder(doc: any): StoredOrder {
  return {
    id: String(doc.id),
    date: String(doc.date),
    status: doc.status,
    items: (doc.items ?? []).map((it: any) => ({
      id: String(it.id),
      name: String(it.name),
      price: Number(it.price),
      quantity: Number(it.quantity),
      image: String(it.image ?? ""),
      color: it.color,
      size: it.size,
    })),
    subtotal: Number(doc.subtotal ?? 0),
    shipping: Number(doc.shipping ?? 0),
    tax: Number(doc.tax ?? 0),
    total: Number(doc.total ?? 0),
    email: doc.email,
    customerName: doc.customerName,
    stripeSessionId: doc.stripeSessionId,
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
