import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware — security headers + the first-line admin gate.
 *
 * The admin page is a partially-prerendered route: its static HTML shell is
 * built at compile time and the auth check in `src/app/admin/layout.tsx` only
 * resolves inside the streamed dynamic hole. So a plain request for /admin
 * would otherwise receive 200 + the admin shell before the redirect lands.
 *
 * Running the check here means an unauthorised visitor never gets a shell at
 * all — they receive a real 307 (HTML) or 401/403 (API) with no admin markup.
 *
 * The session cookie is HMAC-SHA256 over `payload.signature`, so it can be
 * verified in the edge runtime with Web Crypto without touching the database.
 * `src/app/admin/layout.tsx` and every `/api/admin/*` handler re-check with
 * Node crypto, so this is defence in depth rather than the only gate.
 */

const SESSION_COOKIE = "lumiere_session";
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL ?? "admin@lumiere.com").toLowerCase();
/** Must mirror `secret()` in src/lib/auth.ts. */
const DEV_FALLBACK_SECRET = "lumiere-dev-secret-key-32chars!!";

const toBase64Url = (bytes: Uint8Array): string => {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

function fromBase64Url(value: string): Uint8Array {
  const normalised = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalised + "=".repeat((4 - (normalised.length % 4)) % 4);
  const binary = atob(padded);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i);
  return out;
}

/** Length-safe constant-time comparison (never throws, unlike timingSafeEqual). */
function constantTimeEquals(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function secret(): string | null {
  const key = process.env.AUTH_SECRET;
  if (key && key.length >= 16) return key;
  // Same escape hatch as the server, so local dev works without a real secret.
  return process.env.NODE_ENV === "development" ? DEV_FALLBACK_SECRET : null;
}

interface EdgeSession {
  email: string;
  role?: "admin" | "user";
}

/** Verifies the signed session cookie. Returns null when it is invalid. */
async function verifySessionEdge(token: string): Promise<EdgeSession | null> {
  const key = secret();
  if (!key) return null;

  const separator = token.indexOf(".");
  if (separator <= 0 || separator === token.length - 1) return null;
  const payload = token.slice(0, separator);
  const signature = token.slice(separator + 1);

  try {
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(key),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const mac = await crypto.subtle.sign("HMAC", cryptoKey, new TextEncoder().encode(payload));
    if (!constantTimeEquals(toBase64Url(new Uint8Array(mac)), signature)) return null;

    const data = JSON.parse(new TextDecoder().decode(fromBase64Url(payload))) as {
      email?: unknown;
      role?: unknown;
      exp?: unknown;
    };
    if (typeof data.exp !== "number" || data.exp < Date.now()) return null;
    if (typeof data.email !== "string" || !data.email) return null;

    return {
      email: data.email,
      role: data.role === "admin" ? "admin" : data.role === "user" ? "user" : undefined,
    };
  } catch {
    return null;
  }
}

function isAdminPath(pathname: string): boolean {
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return true;
  return pathname === "/api/admin" || pathname.startsWith("/api/admin/");
}

/** Blocks /admin and /api/admin/* before any markup or data is produced. */
async function guardAdminRoute(request: NextRequest): Promise<Response | null> {
  const path = request.nextUrl.pathname;
  if (!isAdminPath(path)) return null;

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const user = token ? await verifySessionEdge(token) : null;
  const allowed = Boolean(
    user && (user.role === "admin" || user.email.trim().toLowerCase() === ADMIN_EMAIL)
  );
  if (allowed) return null;

  // API verbs get JSON; pages are bounced — a signed-in customer to their own
  // account, a visitor to sign-in with a return path straight back to /admin.
  if (path.startsWith("/api/")) {
    return NextResponse.json(
      { error: user ? "Forbidden" : "Unauthorized" },
      { status: user ? 403 : 401, headers: { "Cache-Control": "private, no-store" } }
    );
  }

  const url = request.nextUrl.clone();
  url.search = "";
  if (user) {
    url.pathname = "/account";
  } else {
    url.pathname = "/login";
    url.searchParams.set("next", path);
  }
  return NextResponse.redirect(url, 307);
}

export async function middleware(request: NextRequest) {
  // Admin gate runs first; whether it lets the request through or returns a
  // redirect/JSON denial, the same security headers are applied below.
  const response = (await guardAdminRoute(request)) ?? NextResponse.next();

  // ── Security headers ──
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "0");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  );

  // Cache control for static assets
  if (request.nextUrl.pathname.startsWith("/photos/")) {
    response.headers.set("Cache-Control", "public, max-age=31536000, immutable");
  }

  // Private routes must never be stored by a shared cache.
  if (/^\/(admin|account|cart|checkout|login|signup|reset)(\/|$)/.test(request.nextUrl.pathname)) {
    response.headers.set("Cache-Control", "private, no-store");
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  // CSP
  const csp = [
    "default-src 'self'",
    // 'unsafe-inline' is required by next/font and inline style attributes;
    // accounts.google.com is required for Google Identity Services.
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://checkout.stripe.com https://accounts.google.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://images.stripe.com https://*.googleusercontent.com",
    "font-src 'self' data:",
    "connect-src 'self' https://api.stripe.com https://api.resend.com https://accounts.google.com https://oauth2.googleapis.com",
    "frame-src 'self' https://js.stripe.com https://checkout.stripe.com https://accounts.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

  response.headers.set("Content-Security-Policy", csp);

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
