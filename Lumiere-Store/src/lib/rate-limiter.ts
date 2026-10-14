/**
 * In-memory sliding-window rate limiter.
 *
 * Safe for single-process deployments. For multi-replica setups a shared
 * store (Redis) would be needed — but that is out of scope for this project.
 *
 * Usage:
 *   const limiter = new RateLimiter({ max: 5, windowMs: 60_000 });
 *   if (!limiter.tryTake(key)) return NextResponse.json({ error: "Too many attempts" }, { status: 429 });
 */
export class RateLimiter {
  private readonly max: number;
  private readonly windowMs: number;
  /** Map<key, timestamp[]> */
  private readonly buckets = new Map<string, number[]>();

  constructor(init: { max: number; windowMs: number }) {
    this.max = init.max;
    this.windowMs = init.windowMs;
  }

  private prune(key: string): void {
    const now = Date.now();
    let bucket = this.buckets.get(key) ?? [];
    bucket = bucket.filter((t) => now - t < this.windowMs);
    this.buckets.set(key, bucket);
  }

  /** Returns true if the request is allowed; false if the limit is exceeded. */
  tryTake(key: string): boolean {
    this.prune(key);
    const bucket = this.buckets.get(key) ?? [];
    if (bucket.length >= this.max) return false;
    bucket.push(Date.now());
    this.buckets.set(key, bucket);
    return true;
  }

  reset(key: string): void {
    this.buckets.delete(key);
  }
}

/** IP-based limiter for login attempts — blocks an IP after 5 tries per minute. */
export const loginLimiter = new RateLimiter({ max: 5, windowMs: 60_000 });

/** IP-based limiter for signup attempts — blocks an IP after 3 tries per minute. */
export const signupLimiter = new RateLimiter({ max: 3, windowMs: 60_000 });

/**
 * Derive a stable key from the incoming request. Falls back to "unknown"
 * when the real key cannot be determined (e.g. behind a proxy without headers).
 */
export function rateKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return `ip:${forwarded.split(",")[0].trim()}`;
  const cfConnectingIp = req.headers.get("cf-connecting-ip");
  if (cfConnectingIp) return `ip:${cfConnectingIp}`;
  return "ip:unknown";
}
