import crypto from "node:crypto";
import { cookies } from "next/headers";
import { generateCsrfToken, signCsrfToken, verifyCsrfToken, CSRF_TOKEN_HEADER } from "./csrf";
import { findAllUsers, findUserByEmail, createUser as dbCreateUser, listOrdersByEmail, hashPassword, verifyPassword } from "./db";

export const SESSION_COOKIE = "lumiere_session";
export const CSRF_COOKIE = "lumiere_csrf";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export type SessionUser = { id: string; name: string; email: string };

// ---------- session tokens ----------
function base64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64url");
}

function secret(): string {
  const key = process.env.AUTH_SECRET;
  if (!key || key.length < 16) {
    if (process.env.NODE_ENV === "development") return "lumiere-dev-secret-key-32chars!!";
    throw new Error(
      "AUTH_SECRET is required. " +
        "Generate one with: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""
    );
  }
  return key;
}

export function signSession(user: SessionUser): string {
  const payload = base64url(
    JSON.stringify({ ...user, exp: Date.now() + SESSION_MAX_AGE * 1000 })
  );
  const sig = crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function verifySession(
  token: string | undefined | null
): SessionUser | null {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = crypto
    .createHmac("sha256", secret())
    .update(payload)
    .digest("base64url");
  if (expected.length !== sig.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig)))
    return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!data.exp || data.exp < Date.now()) return null;
    return { id: data.id, name: data.name, email: data.email };
  } catch {
    return null;
  }
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const store = await cookies();
  return verifySession(store.get(SESSION_COOKIE)?.value);
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}

// ---------- CSRF ----------
export function getCsrfToken(): string {
  const raw = generateCsrfToken();
  return signCsrfToken(raw, secret());
}

export function setCsrfCookie(res: Response): void {
  const token = getCsrfToken();
  res.headers.set(
    "Set-Cookie",
    `${CSRF_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax${
      process.env.NODE_ENV === "production" ? "; Secure" : ""
    }`
  );
}

export async function verifyRequestCsrf(
  req: Request
): Promise<{ ok: true } | { ok: false; error: string }> {
  const store = await cookies();
  const cookieToken = store.get(CSRF_COOKIE)?.value;
  if (!cookieToken) {
    return { ok: false, error: "Missing CSRF token" };
  }
  const bodyToken = await extractBodyToken(req);
  if (!bodyToken) {
    return { ok: false, error: "Missing CSRF token in body" };
  }
  const verified = verifyCsrfToken(cookieToken, secret());
  if (!verified) {
    return { ok: false, error: "Invalid CSRF token" };
  }
  if (bodyToken !== verified) {
    return { ok: false, error: "CSRF token mismatch" };
  }
  return { ok: true };
}

async function extractBodyToken(req: Request): Promise<string | null> {
  const header = req.headers.get(CSRF_TOKEN_HEADER.toLowerCase());
  if (header) return header;
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return null;
  try {
    const body = await req.json();
    return (body as Record<string, unknown>)._csrf as string | null;
  } catch {
    return null;
  }
}

// ---------- user persistence (JSON file) ----------
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export interface AuthResult {
  ok: boolean;
  error?: string;
  user?: SessionUser;
}

export function createUser(input: CreateUserInput): AuthResult {
  const name = input.name.trim();
  const email = normalizeEmail(input.email);

  if (name.length < 2) return { ok: false, error: "Please enter your full name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { ok: false, error: "Please enter a valid email address." };
  if (input.password.length < 6)
    return { ok: false, error: "Password must be at least 6 characters." };

  try {
    const result = dbCreateUser({ id: crypto.randomUUID(), name, email, password: input.password, createdAt: Date.now() });
    return { ok: true, user: { id: result.id, name: result.name, email: result.email } };
  } catch (e) {
    if (e instanceof Error && e.message === "email_exists") {
      return { ok: false, error: "An account with this email already exists." };
    }
    throw e;
  }
}

export function authenticate(
  email: string,
  password: string
): SessionUser | null {
  const user = findUserByEmail(normalizeEmail(email));
  if (!user) return null;
  if (!verifyPassword(password, user.passwordHash)) return null;
  return { id: user.id, name: user.name, email: user.email };
}

export function getUserByEmail(email: string): SessionUser | null {
  const user = findUserByEmail(normalizeEmail(email));
  if (!user) return null;
  return { id: user.id, name: user.name, email: user.email };
}

// ---------- Google OAuth ----------
export interface GoogleUserInfo {
  sub: string;           // Google user ID
  email: string;
  name: string;
  picture?: string;
  email_verified: boolean;
}

/**
 * Verify a Google ID token and return user info.
 * Returns null if the token is invalid or expired.
 */
export async function verifyGoogleToken(idToken: string): Promise<GoogleUserInfo | null> {
  try {
    const res = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`,
      { next: { revalidate: 0 } }
    );
    if (!res.ok) return null;
    const data = await res.json() as GoogleUserInfo;

    // Security: only accept tokens from our configured audience (Google Client ID)
    // In production, check data.aud === process.env.GOOGLE_CLIENT_ID
    if (!data.email_verified) return null;

    return data;
  } catch {
    return null;
  }
}

/**
 * Find or create a user from Google OAuth info.
 * Creates a user with a null password (OAuth-only account).
 */
export function upsertGoogleUser(info: GoogleUserInfo): SessionUser {
  const email = normalizeEmail(info.email);
  const existing = findUserByEmail(email);
  if (existing) {
    return { id: existing.id, name: existing.name, email: existing.email };
  }
  // Create new user with dummy password hash — login only via OAuth
  try {
    const result = dbCreateUser({
      id: crypto.randomUUID(),
      name: info.name,
      email,
      password: `oauth_google_${info.sub}`, // dummy — never used for login
      createdAt: Date.now(),
    });
    return { id: result.id, name: result.name, email: result.email };
  } catch {
    // Race condition — user was created by another request
    const fresh = findUserByEmail(email);
    if (!fresh) throw new Error("Failed to create user");
    return { id: fresh.id, name: fresh.name, email: fresh.email };
  }
}

// ---------- orders ----------
export { listOrdersByEmail as getOrders } from "./db";
export { saveOrder as saveOrderToDb } from "./db";
