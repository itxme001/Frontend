import type { Product } from "@/data/products";

export interface Collection {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  /** Predicate evaluated against the catalogue to build the collection. */
  match: (product: Product) => boolean;
}

export const COLLECTIONS: Collection[] = [
  {
    slug: "summer-2026",
    title: "Summer Collection 2026",
    tagline: "The new season",
    description:
      "Airy linen, washed silk and sun-bleached neutrals — twelve pieces cut for warm days.",
    image: "/photos/products/linen-wrap-dress-1.webp",
    match: (p) => p.isNew && (p.category === "apparel" || p.category === "accessories"),
  },
  {
    slug: "best-sellers",
    title: "Best Sellers",
    tagline: "Most loved",
    description: "The pieces our customers return for, ranked by verified reviews.",
    image: "/photos/products/minimalist-leather-tote-1.webp",
    match: (p) => p.reviews >= 100,
  },
  {
    slug: "new-in",
    title: "New Arrivals",
    tagline: "Just landed",
    description: "The most recent additions to the house, produced in limited numbers.",
    image: "/photos/products/merino-trench-coat-1.webp",
    match: (p) => p.isNew,
  },
  {
    slug: "gift-edit",
    title: "The Gift Edit",
    tagline: "For giving",
    description: "Considered objects under $250, wrapped by hand in recycled tissue.",
    image: "/photos/products/champagne-gold-candle-1.webp",
    match: (p) => p.price <= 250,
  },
  {
    slug: "essentials",
    title: "Everyday Essentials",
    tagline: "Wear it daily",
    description: "The quiet workhorses — designed to be worn hard and kept for years.",
    image: "/photos/products/organic-cotton-relaxed-tee-1.webp",
    match: (p) =>
      (p.tags ?? []).some((tag) =>
        ["Essential", "Everyday", "Basics", "Classic", "Wardrobe"].includes(tag)
      ),
  },
  {
    slug: "final-sale",
    title: "Final Sale",
    tagline: "Last pieces",
    description: "Reduced once, never restocked. All marked pieces are final sale.",
    image: "/photos/products/oud-noir-eau-de-parfum-1.webp",
    match: (p) => Boolean(p.originalPrice),
  },
];

export function getCollection(slug: string | undefined | null): Collection | undefined {
  if (!slug) return undefined;
  return COLLECTIONS.find((collection) => collection.slug === slug);
}

export function countCollection(collection: Collection, catalogue: Product[]): number {
  return catalogue.filter(collection.match).length;
}
