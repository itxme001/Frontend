import mongoose from "mongoose";

/**
 * Global cache for the MongoDB connection.
 * Prevents creating new connections on every hot-reload (dev) or
 * cold start (Vercel serverless).
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };
global.mongooseCache = cached;

export function isMongoConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI);
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");

  if (!cached.promise) {
    const attempt = mongoose.connect(uri, {
      // Disable long-running queries taking down serverless
      maxPoolSize: 10,
      // Atlas cold-start (DNS SRV + TCP + TLS) can exceed the 5s default on
      // slower networks, which strands healthy connections. Once the pool is
      // warm every later query reuses it, so this only affects the first hit.
      serverSelectionTimeoutMS: 10_000,
      connectTimeoutMS: 10_000,
    });
    // A transient outage must not poison the cache. Clear the slot as soon as
    // this attempt rejects so the *next* request opens a fresh connection
    // instead of awaiting the same dead promise forever.
    cached.promise = attempt.catch((err: unknown) => {
      cached.promise = null;
      throw err;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
