import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { products as defaultProducts } from "@/data/products";

const PRODUCTS_FILE = ".data/products.json";

function readProducts(): Array<Record<string, any>> {
  try {
    const fs = require("node:fs");
    if (!fs.existsSync(PRODUCTS_FILE)) return [];
    const raw = fs.readFileSync(PRODUCTS_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeProducts(data: unknown) {
  const fs = require("node:fs");
  const path = require("node:path");
  const dir = path.dirname(PRODUCTS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(data, null, 2), "utf8");
}

/** Merge default products with any user-added ones from .data/products.json */
function getAllProducts() {
  const dbProducts = readProducts();
  const dbIds = new Set(dbProducts.map((p: any) => p.id));
  // Include defaults that aren't in DB + all DB products (DB wins on conflicts)
  const merged = [...dbProducts];
  for (const def of defaultProducts) {
    if (!dbIds.has(def.id)) merged.push(def);
  }
  return merged;
}

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const products = getAllProducts();
  return NextResponse.json({ products });
}

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const products = readProducts();
  const newId = `p${String(products.length + defaultProducts.length + 1).padStart(2, "0")}`;
  const product = {
    id: body.id ?? newId,
    name: body.name,
    slug: body.slug ?? body.name?.toLowerCase().replace(/\s+/g, "-"),
    category: body.category,
    price: Number(body.price),
    originalPrice: body.originalPrice ? Number(body.originalPrice) : null,
    image: body.image ?? "",
    heroImage: body.heroImage ?? body.image ?? "",
    images: body.images ?? [body.image ?? ""],
    colors: body.colors ?? [],
    sizes: body.sizes ?? [],
    stock: Number(body.stock) ?? 0,
    material: body.material ?? "",
    rating: Number(body.rating) ?? 0,
    reviews: Number(body.reviews) ?? 0,
    description: body.description ?? "",
    tags: body.tags ?? [],
    isNew: body.isNew ?? false,
    isFeatured: body.isFeatured ?? false,
  };
  products.push(product);
  writeProducts(products);
  return NextResponse.json({ product });
}

export async function PUT(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const products = readProducts();
  const idx = products.findIndex((p: any) => p.id === body.id);
  if (idx === -1) return NextResponse.json({ error: "Product not found" }, { status: 404 });
  products[idx] = { ...products[idx], ...body };
  writeProducts(products);
  return NextResponse.json({ product: products[idx] });
}

export async function DELETE(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const products = readProducts().filter((p: any) => p.id !== id);
  writeProducts(products);
  return NextResponse.json({ ok: true });
}
