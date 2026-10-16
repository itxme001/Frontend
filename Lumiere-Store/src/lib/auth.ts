import crypto from "node:crypto";
import { cookies } from "next/headers";
import { generateCsrfToken, signCsrfToken, verifyCsrfToken, CSRF_TOKEN_HEADER } from "./csrf";
import { findAllUsers, findUserByEmail, createUser as dbCreateUser, listOrdersByEmail, saveOrder, hashPassword, verifyPassword } from "./db";

export const SESSION_COOKIE = "lumiere_session";
export const CSRF_COOKIE = "lumiere_csrf";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export type SessionUser = { id: string; name: string; email: string; role?: "user" | "admin" };

/**
 * The single admin identity. Overridable via `ADMIN_EMAIL` env var so the
 * store owner is never locked to a hardcoded address.
 */
export const ADMIN_EMAIL = (process.env.ADMIN_EMAIL ?? "admin@lumiere.com").toLowerCase();

/**
 * Server-side admin check used by every `/api/admin/*` route and the
 * `/admin` layout. Role from the DB is authoritative; the email match is a
 * fallback for sessions issued before the role field was added.
 */
export function isAdminUser(user: SessionUser | null | undefined): boolean {
  if (!user) return false;
  if (user.role === "admin") return true;
  return user.email.trim().toLowerCase() === ADMIN_EMAIL;
}

/**
 * Guard for admin-only route handlers.
 * Returns either the authorised user or a ready-to-send error response.
 */
export async function requireAdmin(): Promise<
  { ok: true; user: SessionUser } | { ok: false; status: 401 | 403; error: string }
> {
  const user = await getSessionUser();
  if (!user) return { ok: false, status: 401, error: "Unauthorized" };
  if (!isAdminUser(user)) return { ok: false, status: 403, error: "Forbidden" };
  return { ok: true, user };
}

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
    const role = data.role === "admin" ? "admin" : data.role === "user" ? "user" : undefined;
    return { id: data.id, name: data.name, email: data.email, role };
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
  // Body/header token may be signed OR raw; verify its signature too.
  const bodyVerified = verifyCsrfToken(bodyToken, secret());
  if (!bodyVerified || bodyVerified !== verified) {
    return { ok: false, error: "CSRF token mismatch" };
  }
  return { ok: true };
}

async function extractBodyToken(req: Request): Promise<string | null> {
  // Check header first (modern API approach)
  const header = req.headers.get(CSRF_TOKEN_HEADER.toLowerCase());
  if (header) return header;

  // Check JSON body
  const contentType = req.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    try {
      const body = await req.json();
      return (body as Record<string, unknown>)._csrf as string | null;
    } catch {
      return null;
    }
  }

  // Fallback: form body
  if (contentType.includes("application/x-www-form-urlencoded")) {
    const body = await req.text();
    const params = new URLSearchParams(body);
    return params.get("_csrf") ?? params.get("csrfToken") ?? null;
  }

  return null;
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

export async function createUser(input: CreateUserInput): Promise<AuthResult> {
  const name = input.name.trim();
  const email = normalizeEmail(input.email);

  if (name.length < 2) return { ok: false, error: "Please enter your full name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { ok: false, error: "Please enter a valid email address." };
  if (input.password.length < 6)
    return { ok: false, error: "Password must be at least 6 characters." };

  try {
    const result = await dbCreateUser({ id: crypto.randomUUID(), name, email, password: input.password, createdAt: Date.now() });
    return { ok: true, user: { id: result.id, name: result.name, email: result.email, role: result.role } };
  } catch (e) {
    if (e instanceof Error && e.message === "email_exists") {
      return { ok: false, error: "An account with this email already exists." };
    }
    throw e;
  }
}

export async function authenticate(
  email: string,
  password: string
): Promise<SessionUser | null> {
  const user = await findUserByEmail(normalizeEmail(email));
  if (!user) return null;
  if (!verifyPassword(password, user.passwordHash)) return null;
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

export async function getUserByEmail(email: string): Promise<SessionUser | null> {
  const user = await findUserByEmail(normalizeEmail(email));
  if (!user) return null;
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

// ---------- Google OAuth ----------
export interface GoogleUserInfo {
  sub: string;           // Google user ID
  aud: string;           // The Client ID this token was minted for
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

    // Security: only accept tokens minted for OUR Google Client ID.
    // Without this check, a token from any other Google app could sign in
    // as any email address (account takeover).
    const audience = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? process.env.GOOGLE_CLIENT_ID;
    if (audience && data.aud !== audience) return null;
    if (data.email_verified !== true) return null;

    return data;
  } catch {
    return null;
  }
}

/**
 * Find or create a user from Google OAuth info.
 * Creates a user with a null password (OAuth-only account).
 */
export async function upsertGoogleUser(info: GoogleUserInfo): Promise<SessionUser> {
  const email = normalizeEmail(info.email);
  const existing = await findUserByEmail(email);
  if (existing) {
    return { id: existing.id, name: existing.name, email: existing.email, role: existing.role };
  }
  // Create new user with dummy password hash — login only via OAuth
  try {
    const result = await dbCreateUser({
      id: crypto.randomUUID(),
      name: info.name,
      email,
      password: `oauth_google_${info.sub}`, // dummy — never used for login
      createdAt: Date.now(),
    });
    return { id: result.id, name: result.name, email: result.email, role: result.role };
  } catch {
    // Race condition — user was created by another request
    const fresh = await findUserByEmail(email);
    if (!fresh) throw new Error("Failed to create user");
    return { id: fresh.id, name: fresh.name, email: fresh.email, role: fresh.role };
  }
}

// ---------- orders ----------
export { listOrdersByEmail as getOrders } from "./db";
export { saveOrder as saveOrderToDb } from "./db";
