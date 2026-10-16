import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Product, type ProductDoc } from "@/models/Product";
import { products as defaultProducts } from "@/data/products";

/**
 * GET  /api/admin/products  → merged list (DB products + defaults not in DB)
 * POST /api/admin/products  → create product
 * PUT  /api/admin/products  → update product
 * DELETE /api/admin/products?id= → delete product
 *
 * Every verb requires an administrator session — the merged list leaks
 * unpublished stock levels, so GET is not public.
 */

export async function GET() {
  const guard = await requireAdmin();
  if (!guard.ok) {
    return NextResponse.json({ error: guard.error }, { status: guard.status });
  }

  await connectDB();
  const dbProducts = await Product.find().lean();
  const dbIds = new Set(dbProducts.map((p) => p.id));
  const merged: ProductDoc[] = [...dbProducts];
  for (const def of defaultProducts) {
    if (!dbIds.has(def.id)) merged.push(def as unknown as ProductDoc);
  }
  return NextResponse.json({ products: merged }, { headers: { "Cache-Control": "private, no-store" } });
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) {
    return NextResponse.json({ error: guard.error }, { status: guard.status });
  }

  await connectDB();
  const body = await req.json();
  const newId = `p${String((await Product.countDocuments()) + defaultProducts.length + 1).padStart(2, "0")}`;
  const product = {
    id: body.id ?? newId,
    name: body.name,
    slug: body.slug ?? body.name?.toLowerCase().replace(/\s+/g, "-"),
    category: body.category,
    price: Number(body.price),
    originalPrice: body.originalPrice ? Number(body.originalPrice) : undefined,
    image: body.image ?? "",
    heroImage: body.heroImage ?? body.image ?? "",
    images: body.images ?? [body.image ?? ""],
    colors: body.colors ?? [],
    sizes: body.sizes ?? [],
    stock: Number(body.stock) || 0,
    material: body.material ?? "",
    rating: Number(body.rating) || 0,
    reviews: Number(body.reviews) || 0,
    description: body.description ?? "",
    tags: body.tags ?? [],
    isNew: body.isNew ?? false,
    isFeatured: body.isFeatured ?? false,
    // allow category-specific extra fields pass-through
    ...Object.fromEntries(
      Object.entries(body).filter(
        ([k]) =>
          ![
            "id",
            "name",
            "slug",
            "category",
            "price",
            "originalPrice",
            "image",
            "heroImage",
            "images",
            "colors",
            "sizes",
            "stock",
            "material",
            "rating",
            "reviews",
            "description",
            "tags",
            "isNew",
            "isFeatured",
          ].includes(k)
      )
    ),
  };

  const created = await Product.create(product);
  return NextResponse.json({ product: created.toObject() });
}

export async function PUT(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) {
    return NextResponse.json({ error: guard.error }, { status: guard.status });
  }

  await connectDB();
  const body = await req.json();
  const updated = await Product.findOneAndUpdate(
    { id: body.id },
    { $set: body },
    { new: true, upsert: false }
  ).lean();

  if (!updated) {
    return NextResponse.json({ error: "Product not found (only DB-added products can be edited)" }, { status: 404 });
  }
  return NextResponse.json({ product: updated });
}

export async function DELETE(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) {
    return NextResponse.json({ error: guard.error }, { status: guard.status });
  }

  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  await Product.deleteOne({ id });
  return NextResponse.json({ ok: true });
}
