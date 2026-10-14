/**
 * CSRF token generation and verification.
 *
 * Tokens are stored in the session cookie and verified against the incoming
 * request body. This prevents cross-site request forgery on all POST routes.
 *
 * Usage in a route handler:
 *   import { verifyCsrfToken } from "@/lib/csrf";
 *   const ok = verifyCsrfToken(req, cookies().get(SESSION_COOKIE)?.value ?? "");
 *   if (!ok) return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
 */
import crypto from "node:crypto";

export const CSRF_TOKEN_HEADER = "x-csrf-token";

/** Generate a cryptographically random 32-byte hex token. */
export function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Create a signed CSRF token: `<token>.<hmac>`.
 * The HMAC binds the token to the session secret so it cannot be forged.
 */
export function signCsrfToken(token: string, secret: string): string {
  const sig = crypto
    .createHmac("sha256", secret)
    .update(token)
    .digest("base64url");
  return `${token}.${sig}`;
}

/**
 * Verify a signed CSRF token and return the raw token on success, null on failure.
 */
export function verifyCsrfToken(signedToken: string | undefined | null, secret: string): string | null {
  if (!signedToken) return null;
  const dot = signedToken.indexOf(".");
  if (dot === -1) return null;
  const token = signedToken.slice(0, dot);
  const sig = signedToken.slice(dot + 1);
  if (token.length !== 64 || sig.length !== 43) return null; // hex + base64url lengths
  const expected = crypto
    .createHmac("sha256", secret)
    .update(token)
    .digest("base64url");
  if (expected.length !== sig.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig))) return null;
  return token;
}

/**
 * Read the CSRF token from the request. Supports both header and form body.
 * Returns null when no token is present.
 */
export async function extractCsrfToken(req: Request): Promise<string | null> {
  const header = req.headers.get(CSRF_TOKEN_HEADER.toLowerCase());
  if (header) return header;

  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/x-www-form-urlencoded")) return null;

  const body = await req.text();
  const params = new URLSearchParams(body);
  return params.get("_csrf") ?? null;
}
