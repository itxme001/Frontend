import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { products as defaultProducts } from "@/data/products";

/**
 * GET  /api/admin/products  → merged list (DB products + defaults not in DB)
 * POST /api/admin/products  → create product
 * PUT  /api/admin/products  → update product
 * DELETE /api/admin/products?id= → delete product
 */
async function isAdmin(userEmail: string | undefined) {
  return userEmail === "admin@lumiere.com";
}

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const dbProducts = await Product.find().lean();
  const dbIds = new Set(dbProducts.map((p: any) => p.id));
  const merged = [...dbProducts];
  for (const def of defaultProducts) {
    if (!dbIds.has(def.id)) merged.push(def as any);
  }
  return NextResponse.json({ products: merged });
}

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user || !(await isAdmin(user.email))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
  const user = await getSessionUser();
  if (!user || !(await isAdmin(user.email))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
  const user = await getSessionUser();
  if (!user || !(await isAdmin(user.email))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  await Product.deleteOne({ id });
  return NextResponse.json({ ok: true });
}
