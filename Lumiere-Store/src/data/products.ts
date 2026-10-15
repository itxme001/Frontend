export type ProductCategory = "apparel" | "accessories" | "living" | "fragrance";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number | null;
  image: string;
  heroImage?: string;
  images?: string[];
  colors?: string[];
  sizes?: string[];
  stock: number;
  material: string;
  rating: number;
  reviews: number;
  description: string;
  tags?: string[];
  isNew: boolean;
  isFeatured: boolean;
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  apparel: "Apparel",
  accessories: "Accessories",
  living: "Living",
  fragrance: "Fragrance",
};

export const CATEGORY_TAGLINES: Record<ProductCategory, string> = {
  apparel: "Couture & ready-to-wear",
  accessories: "Leather, jewellery & objects",
  living: "Ceramics, textiles & home scent",
  fragrance: "Scents of the house",
};

/** Total product count across all categories */
export const PRODUCT_COUNT = 155;

export const products: Product[] = [
  {
    "id": "p001",
    "name": "Silhouette Midi Dress",
    "slug": "silhouette-midi-dress",
    "category": "apparel",
    "price": 693,
    "originalPrice": null,
    "image": "/photos/products/silhouette-midi-dress-1.webp",
    "heroImage": "/photos/products/silhouette-midi-dress-1.webp",
    "images": [
      "/photos/products/silhouette-midi-dress-1.webp",
      "/photos/products/silhouette-midi-dress-2.webp"
    ],
    "colors": [
      "Sage",
      "Copper",
      "Pewter",
      "Slate"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 60,
    "material": "Alpaca",
    "rating": 3.7,
    "reviews": 418,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Sage, Copper, Pewter, Slate tones.",
    "tags": [
      "Fashion"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p002",
    "name": "Structured Blazer",
    "slug": "structured-blazer",
    "category": "apparel",
    "price": 1602,
    "originalPrice": null,
    "image": "/photos/products/structured-blazer-1.webp",
    "heroImage": "/photos/products/structured-blazer-1.webp",
    "images": [
      "/photos/products/structured-blazer-1.webp",
      "/photos/products/structured-blazer-2.webp"
    ],
    "colors": [
      "Forest",
      "Ivory"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 24,
    "material": "Merino",
    "rating": 4.8,
    "reviews": 152,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Forest, Ivory tones.",
    "tags": [
      "Fashion"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p003",
    "name": "Cashmere Coat",
    "slug": "cashmere-coat",
    "category": "apparel",
    "price": 1131,
    "originalPrice": null,
    "image": "/photos/products/cashmere-coat-1.webp",
    "heroImage": "/photos/products/cashmere-coat-1.webp",
    "images": [
      "/photos/products/cashmere-coat-1.webp",
      "/photos/products/cashmere-coat-2.webp"
    ],
    "colors": [
      "Taupe",
      "Copper",
      "Rose"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 35,
    "material": "Alpaca",
    "rating": 3.8,
    "reviews": 459,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Taupe, Copper, Rose tones.",
    "tags": [
      "Fashion"
    ],
    "isNew": false,
    "isFeatured": true
  },
  {
    "id": "p004",
    "name": "Silk Blouse",
    "slug": "silk-blouse",
    "category": "apparel",
    "price": 2068,
    "originalPrice": null,
    "image": "/photos/products/silk-blouse-1.webp",
    "heroImage": "/photos/products/silk-blouse-1.webp",
    "images": [
      "/photos/products/silk-blouse-1.webp",
      "/photos/products/silk-blouse-2.webp"
    ],
    "colors": [
      "Moss",
      "Ebony",
      "Black",
      "Slate"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 3,
    "material": "Tencel",
    "rating": 4.4,
    "reviews": 221,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Moss, Ebony, Black, Slate tones.",
    "tags": [
      "Fashion",
      "Limited"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p005",
    "name": "Wool Trousers",
    "slug": "wool-trousers",
    "category": "apparel",
    "price": 1901,
    "originalPrice": null,
    "image": "/photos/products/wool-trousers-1.webp",
    "heroImage": "/photos/products/wool-trousers-1.webp",
    "images": [
      "/photos/products/wool-trousers-1.webp",
      "/photos/products/wool-trousers-2.webp"
    ],
    "colors": [
      "Stone",
      "Oatmeal",
      "Ebony"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 56,
    "material": "Linen",
    "rating": 4.4,
    "reviews": 270,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Stone, Oatmeal, Ebony tones.",
    "tags": [
      "Fashion",
      "Featured"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p006",
    "name": "Linen Shirt",
    "slug": "linen-shirt",
    "category": "apparel",
    "price": 284,
    "originalPrice": null,
    "image": "/photos/products/linen-shirt-1.webp",
    "heroImage": "/photos/products/linen-shirt-1.webp",
    "images": [
      "/photos/products/linen-shirt-1.webp",
      "/photos/products/linen-shirt-2.webp"
    ],
    "colors": [
      "Bone",
      "Stone",
      "Sand"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 16,
    "material": "Tweed",
    "rating": 4.2,
    "reviews": 219,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Bone, Stone, Sand tones.",
    "tags": [
      "Fashion",
      "Featured"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p007",
    "name": "Denim Jacket",
    "slug": "denim-jacket",
    "category": "apparel",
    "price": 1693,
    "originalPrice": null,
    "image": "/photos/products/denim-jacket-1.webp",
    "heroImage": "/photos/products/denim-jacket-1.webp",
    "images": [
      "/photos/products/denim-jacket-1.webp",
      "/photos/products/denim-jacket-2.webp"
    ],
    "colors": [
      "Sage",
      "Taupe"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 24,
    "material": "Mohair",
    "rating": 4.4,
    "reviews": 398,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Sage, Taupe tones.",
    "tags": [
      "Fashion"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p008",
    "name": "Knit Sweater",
    "slug": "knit-sweater",
    "category": "apparel",
    "price": 1883,
    "originalPrice": null,
    "image": "/photos/products/knit-sweater-1.webp",
    "heroImage": "/photos/products/knit-sweater-1.webp",
    "images": [
      "/photos/products/knit-sweater-1.webp",
      "/photos/products/knit-sweater-2.webp"
    ],
    "colors": [
      "Black",
      "Cream"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 7,
    "material": "Corduroy",
    "rating": 3.9,
    "reviews": 126,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Black, Cream tones.",
    "tags": [
      "Fashion",
      "Limited",
      "Featured"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p009",
    "name": "Leather Bag",
    "slug": "leather-bag",
    "category": "apparel",
    "price": 2553,
    "originalPrice": 3302,
    "image": "/photos/products/leather-bag-1.webp",
    "heroImage": "/photos/products/leather-bag-1.webp",
    "images": [
      "/photos/products/leather-bag-1.webp",
      "/photos/products/leather-bag-2.webp"
    ],
    "colors": [
      "Black",
      "Navy"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 4,
    "material": "Denim",
    "rating": 3.6,
    "reviews": 407,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Black, Navy tones.",
    "tags": [
      "Fashion",
      "Sale",
      "Limited",
      "Featured"
    ],
    "isNew": true,
    "isFeatured": false
  },
  {
    "id": "p010",
    "name": "Gold Earrings",
    "slug": "gold-earrings",
    "category": "apparel",
    "price": 762,
    "originalPrice": null,
    "image": "/photos/products/gold-earrings-1.webp",
    "heroImage": "/photos/products/gold-earrings-1.webp",
    "images": [
      "/photos/products/gold-earrings-1.webp",
      "/photos/products/gold-earrings-2.webp"
    ],
    "colors": [
      "Mauve",
      "Obsidian",
      "Cream",
      "Taupe"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 21,
    "material": "Merino",
    "rating": 4.1,
    "reviews": 165,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Mauve, Obsidian, Cream, Taupe tones.",
    "tags": [
      "Fashion"
    ],
    "isNew": true,
    "isFeatured": false
  },
  {
    "id": "p011",
    "name": "Silk Scarf",
    "slug": "silk-scarf",
    "category": "apparel",
    "price": 192,
    "originalPrice": 277,
    "image": "/photos/products/silk-scarf-1.webp",
    "heroImage": "/photos/products/silk-scarf-1.webp",
    "images": [
      "/photos/products/silk-scarf-1.webp",
      "/photos/products/silk-scarf-2.webp"
    ],
    "colors": [
      "Sage",
      "Mauve",
      "Obsidian"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 67,
    "material": "Italian wool",
    "rating": 4.4,
    "reviews": 230,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Sage, Mauve, Obsidian tones.",
    "tags": [
      "Fashion",
      "Sale"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p012",
    "name": "Ceramic Vase",
    "slug": "ceramic-vase",
    "category": "apparel",
    "price": 684,
    "originalPrice": null,
    "image": "/photos/products/ceramic-vase-1.webp",
    "heroImage": "/photos/products/ceramic-vase-1.webp",
    "images": [
      "/photos/products/ceramic-vase-1.webp",
      "/photos/products/ceramic-vase-2.webp"
    ],
    "colors": [
      "Blush",
      "Pewter",
      "Champagne",
      "Dusty-rose"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 15,
    "material": "Cupro",
    "rating": 3.5,
    "reviews": 424,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Blush, Pewter, Champagne, Dusty-rose tones.",
    "tags": [
      "Fashion"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p013",
    "name": "Candle Set",
    "slug": "candle-set",
    "category": "apparel",
    "price": 399,
    "originalPrice": null,
    "image": "/photos/products/candle-set-1.webp",
    "heroImage": "/photos/products/candle-set-1.webp",
    "images": [
      "/photos/products/candle-set-1.webp",
      "/photos/products/candle-set-2.webp"
    ],
    "colors": [
      "Rose",
      "Blush",
      "Navy",
      "Forest"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 71,
    "material": "Alpaca",
    "rating": 4.3,
    "reviews": 335,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Rose, Blush, Navy, Forest tones.",
    "tags": [
      "Fashion"
    ],
    "isNew": false,
    "isFeatured": true
  },
  {
    "id": "p014",
    "name": "Perfume Bottle",
    "slug": "perfume-bottle",
    "category": "apparel",
    "price": 1060,
    "originalPrice": null,
    "image": "/photos/products/perfume-bottle-1.webp",
    "heroImage": "/photos/products/perfume-bottle-1.webp",
    "images": [
      "/photos/products/perfume-bottle-1.webp",
      "/photos/products/perfume-bottle-2.webp"
    ],
    "colors": [
      "Champagne",
      "Stone"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 62,
    "material": "Tweed",
    "rating": 4.7,
    "reviews": 152,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Champagne, Stone tones.",
    "tags": [
      "Fashion"
    ],
    "isNew": true,
    "isFeatured": false
  },
  {
    "id": "p015",
    "name": "Watch",
    "slug": "watch",
    "category": "apparel",
    "price": 1411,
    "originalPrice": null,
    "image": "/photos/products/watch-1.webp",
    "heroImage": "/photos/products/watch-1.webp",
    "images": [
      "/photos/products/watch-1.webp",
      "/photos/products/watch-2.webp"
    ],
    "colors": [
      "Dusty-rose"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 16,
    "material": "Corduroy",
    "rating": 5,
    "reviews": 113,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Dusty-rose tones.",
    "tags": [
      "Fashion"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p016",
    "name": "Sunglasses",
    "slug": "sunglasses",
    "category": "apparel",
    "price": 1064,
    "originalPrice": null,
    "image": "/photos/products/sunglasses-1.webp",
    "heroImage": "/photos/products/sunglasses-1.webp",
    "images": [
      "/photos/products/sunglasses-1.webp",
      "/photos/products/sunglasses-2.webp"
    ],
    "colors": [
      "Forest",
      "Ebony",
      "Bronze"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 24,
    "material": "Linen",
    "rating": 3.9,
    "reviews": 383,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Forest, Ebony, Bronze tones.",
    "tags": [
      "Fashion"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p017",
    "name": "Belt",
    "slug": "belt",
    "category": "apparel",
    "price": 1552,
    "originalPrice": null,
    "image": "/photos/products/belt-1.webp",
    "heroImage": "/photos/products/belt-1.webp",
    "images": [
      "/photos/products/belt-1.webp",
      "/photos/products/belt-2.webp"
    ],
    "colors": [
      "Rose",
      "Ivory",
      "Slate"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 64,
    "material": "Alpaca",
    "rating": 4.9,
    "reviews": 232,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Rose, Ivory, Slate tones.",
    "tags": [
      "Fashion"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p018",
    "name": "Sneakers",
    "slug": "sneakers",
    "category": "apparel",
    "price": 1225,
    "originalPrice": null,
    "image": "/photos/products/sneakers-1.webp",
    "heroImage": "/photos/products/sneakers-1.webp",
    "images": [
      "/photos/products/sneakers-1.webp",
      "/photos/products/sneakers-2.webp"
    ],
    "colors": [
      "Terracotta",
      "Black",
      "Burgundy"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 48,
    "material": "Tencel",
    "rating": 3.7,
    "reviews": 371,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Terracotta, Black, Burgundy tones.",
    "tags": [
      "Fashion"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p019",
    "name": "Boots",
    "slug": "boots",
    "category": "apparel",
    "price": 657,
    "originalPrice": null,
    "image": "/photos/products/boots-1.webp",
    "heroImage": "/photos/products/boots-1.webp",
    "images": [
      "/photos/products/boots-1.webp",
      "/photos/products/boots-2.webp"
    ],
    "colors": [
      "Ivory",
      "Walnut",
      "Cream"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 52,
    "material": "Italian wool",
    "rating": 4.3,
    "reviews": 11,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Ivory, Walnut, Cream tones.",
    "tags": [
      "Fashion"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p020",
    "name": "Sandals",
    "slug": "sandals",
    "category": "apparel",
    "price": 1971,
    "originalPrice": null,
    "image": "/photos/products/sandals-1.webp",
    "heroImage": "/photos/products/sandals-1.webp",
    "images": [
      "/photos/products/sandals-1.webp",
      "/photos/products/sandals-2.webp"
    ],
    "colors": [
      "Dusty-rose",
      "Rose",
      "Ebony",
      "Sage"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 56,
    "material": "Silk charmeuse",
    "rating": 4.9,
    "reviews": 215,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Dusty-rose, Rose, Ebony, Sage tones.",
    "tags": [
      "Fashion"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p021",
    "name": "Ring",
    "slug": "ring",
    "category": "apparel",
    "price": 2273,
    "originalPrice": null,
    "image": "/photos/products/ring-1.webp",
    "heroImage": "/photos/products/ring-1.webp",
    "images": [
      "/photos/products/ring-1.webp",
      "/photos/products/ring-2.webp"
    ],
    "colors": [
      "Ebony",
      "Stone",
      "Bone"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 4,
    "material": "Tencel",
    "rating": 4.7,
    "reviews": 137,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Ebony, Stone, Bone tones.",
    "tags": [
      "Fashion",
      "Limited"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p022",
    "name": "Necklace",
    "slug": "necklace",
    "category": "apparel",
    "price": 1998,
    "originalPrice": 2706,
    "image": "/photos/products/necklace-1.webp",
    "heroImage": "/photos/products/necklace-1.webp",
    "images": [
      "/photos/products/necklace-1.webp",
      "/photos/products/necklace-2.webp"
    ],
    "colors": [
      "White",
      "Ebony",
      "Moss"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 74,
    "material": "Tweed",
    "rating": 4.8,
    "reviews": 50,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in White, Ebony, Moss tones.",
    "tags": [
      "Fashion",
      "Sale"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p023",
    "name": "Bracelet",
    "slug": "bracelet",
    "category": "apparel",
    "price": 451,
    "originalPrice": 630,
    "image": "/photos/products/bracelet-1.webp",
    "heroImage": "/photos/products/bracelet-1.webp",
    "images": [
      "/photos/products/bracelet-1.webp",
      "/photos/products/bracelet-2.webp"
    ],
    "colors": [
      "Taupe",
      "Burgundy"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 1,
    "material": "Tencel",
    "rating": 4.5,
    "reviews": 56,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Taupe, Burgundy tones.",
    "tags": [
      "Fashion",
      "Sale",
      "Limited",
      "Featured"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p024",
    "name": "Hat",
    "slug": "hat",
    "category": "apparel",
    "price": 325,
    "originalPrice": null,
    "image": "/photos/products/hat-1.webp",
    "heroImage": "/photos/products/hat-1.webp",
    "images": [
      "/photos/products/hat-1.webp",
      "/photos/products/hat-2.webp"
    ],
    "colors": [
      "Bone",
      "Black",
      "White"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 64,
    "material": "Italian wool",
    "rating": 3.5,
    "reviews": 308,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Bone, Black, White tones.",
    "tags": [
      "Fashion"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p025",
    "name": "Gloves",
    "slug": "gloves",
    "category": "apparel",
    "price": 1733,
    "originalPrice": null,
    "image": "/photos/products/gloves-1.webp",
    "heroImage": "/photos/products/gloves-1.webp",
    "images": [
      "/photos/products/gloves-1.webp",
      "/photos/products/gloves-2.webp"
    ],
    "colors": [
      "Black",
      "Navy",
      "Camel"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 27,
    "material": "Velvet",
    "rating": 3.5,
    "reviews": 373,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Black, Navy, Camel tones.",
    "tags": [
      "Fashion"
    ],
    "isNew": false,
    "isFeatured": true
  },
  {
    "id": "p026",
    "name": "Wallet",
    "slug": "wallet",
    "category": "apparel",
    "price": 1626,
    "originalPrice": 2200,
    "image": "/photos/products/wallet-1.webp",
    "heroImage": "/photos/products/wallet-1.webp",
    "images": [
      "/photos/products/wallet-1.webp",
      "/photos/products/wallet-2.webp"
    ],
    "colors": [
      "Walnut",
      "Oatmeal",
      "Terracotta",
      "Navy"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 0,
    "material": "Denim",
    "rating": 4,
    "reviews": 356,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Walnut, Oatmeal, Terracotta, Navy tones.",
    "tags": [
      "Fashion",
      "Sale",
      "Limited",
      "Featured"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p027",
    "name": "Backpack",
    "slug": "backpack",
    "category": "apparel",
    "price": 1611,
    "originalPrice": null,
    "image": "/photos/products/backpack-1.webp",
    "heroImage": "/photos/products/backpack-1.webp",
    "images": [
      "/photos/products/backpack-1.webp",
      "/photos/products/backpack-2.webp"
    ],
    "colors": [
      "Bone",
      "Champagne",
      "Rose"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 24,
    "material": "Tweed",
    "rating": 4.6,
    "reviews": 237,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Bone, Champagne, Rose tones.",
    "tags": [
      "Fashion"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p028",
    "name": "Tote Bag",
    "slug": "tote-bag",
    "category": "apparel",
    "price": 333,
    "originalPrice": null,
    "image": "/photos/products/tote-bag-1.webp",
    "heroImage": "/photos/products/tote-bag-1.webp",
    "images": [
      "/photos/products/tote-bag-1.webp",
      "/photos/products/tote-bag-2.webp"
    ],
    "colors": [
      "Navy",
      "Obsidian"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 47,
    "material": "Tencel",
    "rating": 3.6,
    "reviews": 221,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Navy, Obsidian tones.",
    "tags": [
      "Fashion"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p029",
    "name": "Clutch",
    "slug": "clutch",
    "category": "apparel",
    "price": 1810,
    "originalPrice": 2227,
    "image": "/photos/products/clutch-1.webp",
    "heroImage": "/photos/products/clutch-1.webp",
    "images": [
      "/photos/products/clutch-1.webp",
      "/photos/products/clutch-2.webp"
    ],
    "colors": [
      "Terracotta",
      "Charcoal"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 37,
    "material": "Cotton poplin",
    "rating": 3.8,
    "reviews": 496,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Terracotta, Charcoal tones.",
    "tags": [
      "Fashion",
      "Sale",
      "Featured"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p030",
    "name": "Throw Pillow",
    "slug": "throw-pillow",
    "category": "apparel",
    "price": 1006,
    "originalPrice": null,
    "image": "/photos/products/throw-pillow-1.webp",
    "heroImage": "/photos/products/throw-pillow-1.webp",
    "images": [
      "/photos/products/throw-pillow-1.webp",
      "/photos/products/throw-pillow-2.webp"
    ],
    "colors": [
      "Cream",
      "Stone"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 76,
    "material": "Italian wool",
    "rating": 4.1,
    "reviews": 241,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Cream, Stone tones.",
    "tags": [
      "Fashion"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p031",
    "name": "Table Lamp",
    "slug": "table-lamp",
    "category": "apparel",
    "price": 2243,
    "originalPrice": null,
    "image": "/photos/products/table-lamp-1.webp",
    "heroImage": "/photos/products/table-lamp-1.webp",
    "images": [
      "/photos/products/table-lamp-1.webp",
      "/photos/products/table-lamp-2.webp"
    ],
    "colors": [
      "Terracotta",
      "Sage",
      "Burgundy",
      "Oatmeal"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 69,
    "material": "Merino",
    "rating": 4.9,
    "reviews": 94,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Terracotta, Sage, Burgundy, Oatmeal tones.",
    "tags": [
      "Fashion"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p032",
    "name": "Cushion",
    "slug": "cushion",
    "category": "apparel",
    "price": 2262,
    "originalPrice": null,
    "image": "/photos/products/cushion-1.webp",
    "heroImage": "/photos/products/cushion-1.webp",
    "images": [
      "/photos/products/cushion-1.webp",
      "/photos/products/cushion-2.webp"
    ],
    "colors": [
      "Oatmeal",
      "Slate",
      "Copper"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 52,
    "material": "Corduroy",
    "rating": 5,
    "reviews": 484,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Oatmeal, Slate, Copper tones.",
    "tags": [
      "Fashion",
      "Featured"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p033",
    "name": "Blanket",
    "slug": "blanket",
    "category": "apparel",
    "price": 2105,
    "originalPrice": 2592,
    "image": "/photos/products/blanket-1.webp",
    "heroImage": "/photos/products/blanket-1.webp",
    "images": [
      "/photos/products/blanket-1.webp",
      "/photos/products/blanket-2.webp"
    ],
    "colors": [
      "Charcoal",
      "Terracotta"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 47,
    "material": "Cashmere",
    "rating": 4.9,
    "reviews": 438,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Charcoal, Terracotta tones.",
    "tags": [
      "Fashion",
      "Sale"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p034",
    "name": "Mirror",
    "slug": "mirror",
    "category": "apparel",
    "price": 126,
    "originalPrice": 165,
    "image": "/photos/products/mirror-1.webp",
    "heroImage": "/photos/products/mirror-1.webp",
    "images": [
      "/photos/products/mirror-1.webp",
      "/photos/products/mirror-2.webp"
    ],
    "colors": [
      "Terracotta",
      "Bone",
      "Champagne"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 31,
    "material": "Mohair",
    "rating": 4.9,
    "reviews": 91,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Terracotta, Bone, Champagne tones.",
    "tags": [
      "Fashion",
      "Sale"
    ],
    "isNew": true,
    "isFeatured": false
  },
  {
    "id": "p035",
    "name": "Frame Set",
    "slug": "frame-set",
    "category": "apparel",
    "price": 88,
    "originalPrice": null,
    "image": "/photos/products/frame-set-1.webp",
    "heroImage": "/photos/products/frame-set-1.webp",
    "images": [
      "/photos/products/frame-set-1.webp",
      "/photos/products/frame-set-2.webp"
    ],
    "colors": [
      "Blush"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 79,
    "material": "Alpaca",
    "rating": 4.9,
    "reviews": 182,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Blush tones.",
    "tags": [
      "Fashion"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p036",
    "name": "Diffuser",
    "slug": "diffuser",
    "category": "apparel",
    "price": 946,
    "originalPrice": null,
    "image": "/photos/products/diffuser-1.webp",
    "heroImage": "/photos/products/diffuser-1.webp",
    "images": [
      "/photos/products/diffuser-1.webp",
      "/photos/products/diffuser-2.webp"
    ],
    "colors": [
      "Forest",
      "Moss",
      "Sand",
      "Camel"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 7,
    "material": "Cashmere",
    "rating": 4.2,
    "reviews": 417,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Forest, Moss, Sand, Camel tones.",
    "tags": [
      "Fashion",
      "Limited"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p037",
    "name": "Tray",
    "slug": "tray",
    "category": "apparel",
    "price": 1543,
    "originalPrice": null,
    "image": "/photos/products/tray-1.webp",
    "heroImage": "/photos/products/tray-1.webp",
    "images": [
      "/photos/products/tray-1.webp",
      "/photos/products/tray-2.webp"
    ],
    "colors": [
      "Sand",
      "White",
      "Blush",
      "Sage"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 57,
    "material": "Cashmere",
    "rating": 4.1,
    "reviews": 480,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Sand, White, Blush, Sage tones.",
    "tags": [
      "Fashion"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p038",
    "name": "Mug Set",
    "slug": "mug-set",
    "category": "apparel",
    "price": 782,
    "originalPrice": null,
    "image": "/photos/products/mug-set-1.webp",
    "heroImage": "/photos/products/mug-set-1.webp",
    "images": [
      "/photos/products/mug-set-1.webp",
      "/photos/products/mug-set-2.webp"
    ],
    "colors": [
      "Mauve",
      "Pewter",
      "Rose"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 59,
    "material": "Alpaca",
    "rating": 4.4,
    "reviews": 345,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Mauve, Pewter, Rose tones.",
    "tags": [
      "Fashion"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p039",
    "name": "Book End",
    "slug": "book-end",
    "category": "apparel",
    "price": 1222,
    "originalPrice": null,
    "image": "/photos/products/book-end-1.webp",
    "heroImage": "/photos/products/book-end-1.webp",
    "images": [
      "/photos/products/book-end-1.webp",
      "/photos/products/book-end-2.webp"
    ],
    "colors": [
      "Forest",
      "Stone",
      "Charcoal",
      "Ivory"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 59,
    "material": "Italian wool",
    "rating": 4.7,
    "reviews": 286,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Forest, Stone, Charcoal, Ivory tones.",
    "tags": [
      "Fashion"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p040",
    "name": "Votive Holder",
    "slug": "votive-holder",
    "category": "apparel",
    "price": 1016,
    "originalPrice": null,
    "image": "/photos/products/votive-holder-1.webp",
    "heroImage": "/photos/products/votive-holder-1.webp",
    "images": [
      "/photos/products/votive-holder-1.webp",
      "/photos/products/votive-holder-2.webp"
    ],
    "colors": [
      "Blush",
      "Slate",
      "Terracotta"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 13,
    "material": "Cashmere",
    "rating": 4.4,
    "reviews": 109,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Blush, Slate, Terracotta tones.",
    "tags": [
      "Fashion"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p041",
    "name": "Journal",
    "slug": "journal",
    "category": "apparel",
    "price": 663,
    "originalPrice": null,
    "image": "/photos/products/journal-1.webp",
    "heroImage": "/photos/products/journal-1.webp",
    "images": [
      "/photos/products/journal-1.webp",
      "/photos/products/journal-2.webp"
    ],
    "colors": [
      "Champagne",
      "Blush"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 44,
    "material": "Alpaca",
    "rating": 4.6,
    "reviews": 397,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Champagne, Blush tones.",
    "tags": [
      "Fashion"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p042",
    "name": "Pen Set",
    "slug": "pen-set",
    "category": "apparel",
    "price": 101,
    "originalPrice": null,
    "image": "/photos/products/pen-set-1.webp",
    "heroImage": "/photos/products/pen-set-1.webp",
    "images": [
      "/photos/products/pen-set-1.webp",
      "/photos/products/pen-set-2.webp"
    ],
    "colors": [
      "Oatmeal",
      "Charcoal"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 15,
    "material": "Denim",
    "rating": 3.8,
    "reviews": 101,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Oatmeal, Charcoal tones.",
    "tags": [
      "Fashion"
    ],
    "isNew": true,
    "isFeatured": false
  },
  {
    "id": "p043",
    "name": "Desk Lamp",
    "slug": "desk-lamp",
    "category": "apparel",
    "price": 1162,
    "originalPrice": null,
    "image": "/photos/products/desk-lamp-1.webp",
    "heroImage": "/photos/products/desk-lamp-1.webp",
    "images": [
      "/photos/products/desk-lamp-1.webp",
      "/photos/products/desk-lamp-2.webp"
    ],
    "colors": [
      "Pewter",
      "Ivory",
      "Stone"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 55,
    "material": "Italian wool",
    "rating": 3.7,
    "reviews": 301,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Pewter, Ivory, Stone tones.",
    "tags": [
      "Fashion"
    ],
    "isNew": true,
    "isFeatured": false
  },
  {
    "id": "p044",
    "name": "Candle Holder",
    "slug": "candle-holder",
    "category": "apparel",
    "price": 2746,
    "originalPrice": null,
    "image": "/photos/products/candle-holder-1.webp",
    "heroImage": "/photos/products/candle-holder-1.webp",
    "images": [
      "/photos/products/candle-holder-1.webp",
      "/photos/products/candle-holder-2.webp"
    ],
    "colors": [
      "Taupe",
      "Sand",
      "Stone",
      "Charcoal"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 40,
    "material": "Velvet",
    "rating": 4.1,
    "reviews": 160,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Taupe, Sand, Stone, Charcoal tones.",
    "tags": [
      "Fashion"
    ],
    "isNew": false,
    "isFeatured": true
  },
  {
    "id": "p045",
    "name": "Robe",
    "slug": "robe",
    "category": "apparel",
    "price": 1763,
    "originalPrice": null,
    "image": "/photos/products/robe-1.webp",
    "heroImage": "/photos/products/robe-1.webp",
    "images": [
      "/photos/products/robe-1.webp",
      "/photos/products/robe-2.webp"
    ],
    "colors": [
      "Slate",
      "Black",
      "Charcoal"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 36,
    "material": "Mohair",
    "rating": 3.7,
    "reviews": 77,
    "description": "A refined piece in silk charmeuse, thoughtfully crafted for the modern individual. Available in Slate, Black, Charcoal tones.",
    "tags": [
      "Fashion"
    ],
    "isNew": true,
    "isFeatured": false
  },
  {
    "id": "p046",
    "name": "Pajama Set",
    "slug": "pajama-set",
    "category": "accessories",
    "price": 491,
    "originalPrice": null,
    "image": "/photos/products/pajama-set-1.webp",
    "heroImage": "/photos/products/pajama-set-1.webp",
    "images": [
      "/photos/products/pajama-set-1.webp",
      "/photos/products/pajama-set-2.webp"
    ],
    "colors": [
      "Forest",
      "Camel",
      "Navy"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 20,
    "material": "Pearl",
    "rating": 3.9,
    "reviews": 85,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Forest, Camel, Navy tones.",
    "tags": [
      "Accessories"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p047",
    "name": "Cardigan",
    "slug": "cardigan",
    "category": "accessories",
    "price": 891,
    "originalPrice": null,
    "image": "/photos/products/cardigan-1.webp",
    "heroImage": "/photos/products/cardigan-1.webp",
    "images": [
      "/photos/products/cardigan-1.webp",
      "/photos/products/cardigan-2.webp"
    ],
    "colors": [
      "Slate",
      "Dusty-rose",
      "Ivory"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 71,
    "material": "Suede",
    "rating": 4.9,
    "reviews": 28,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Slate, Dusty-rose, Ivory tones.",
    "tags": [
      "Accessories",
      "Featured"
    ],
    "isNew": true,
    "isFeatured": false
  },
  {
    "id": "p048",
    "name": "Trench Coat",
    "slug": "trench-coat",
    "category": "accessories",
    "price": 877,
    "originalPrice": null,
    "image": "/photos/products/trench-coat-1.webp",
    "heroImage": "/photos/products/trench-coat-1.webp",
    "images": [
      "/photos/products/trench-coat-1.webp",
      "/photos/products/trench-coat-2.webp"
    ],
    "colors": [
      "Moss",
      "Copper",
      "Bone",
      "Burgundy"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 35,
    "material": "Nappa leather",
    "rating": 3.8,
    "reviews": 55,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Moss, Copper, Bone, Burgundy tones.",
    "tags": [
      "Accessories"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p049",
    "name": "Miniskirt",
    "slug": "miniskirt",
    "category": "accessories",
    "price": 485,
    "originalPrice": null,
    "image": "/photos/products/miniskirt-1.webp",
    "heroImage": "/photos/products/miniskirt-1.webp",
    "images": [
      "/photos/products/miniskirt-1.webp",
      "/photos/products/miniskirt-2.webp"
    ],
    "colors": [
      "Dusty-rose",
      "Rose",
      "Stone",
      "Cream"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 17,
    "material": "Full-grain leather",
    "rating": 3.8,
    "reviews": 258,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Dusty-rose, Rose, Stone, Cream tones.",
    "tags": [
      "Accessories"
    ],
    "isNew": true,
    "isFeatured": false
  },
  {
    "id": "p050",
    "name": "Maxi Skirt",
    "slug": "maxi-skirt",
    "category": "accessories",
    "price": 520,
    "originalPrice": null,
    "image": "/photos/products/maxi-skirt-1.webp",
    "heroImage": "/photos/products/maxi-skirt-1.webp",
    "images": [
      "/photos/products/maxi-skirt-1.webp",
      "/photos/products/maxi-skirt-2.webp"
    ],
    "colors": [
      "Moss",
      "Bone",
      "Forest"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 3,
    "material": "Onyx",
    "rating": 3.7,
    "reviews": 66,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Moss, Bone, Forest tones.",
    "tags": [
      "Accessories",
      "Limited"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p051",
    "name": "Jumpsuit",
    "slug": "jumpsuit",
    "category": "accessories",
    "price": 208,
    "originalPrice": null,
    "image": "/photos/products/jumpsuit-1.webp",
    "heroImage": "/photos/products/jumpsuit-1.webp",
    "images": [
      "/photos/products/jumpsuit-1.webp",
      "/photos/products/jumpsuit-2.webp"
    ],
    "colors": [
      "Camel",
      "Sage",
      "Terracotta"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 4,
    "material": "Sterling silver",
    "rating": 4.6,
    "reviews": 299,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Camel, Sage, Terracotta tones.",
    "tags": [
      "Accessories",
      "Limited"
    ],
    "isNew": false,
    "isFeatured": true
  },
  {
    "id": "p052",
    "name": "Co Ord Set",
    "slug": "co-ord-set",
    "category": "accessories",
    "price": 236,
    "originalPrice": null,
    "image": "/photos/products/co-ord-set-1.webp",
    "heroImage": "/photos/products/co-ord-set-1.webp",
    "images": [
      "/photos/products/co-ord-set-1.webp",
      "/photos/products/co-ord-set-2.webp"
    ],
    "colors": [
      "Oatmeal",
      "Black",
      "Sage",
      "Walnut"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 42,
    "material": "Sterling silver",
    "rating": 3.7,
    "reviews": 38,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Oatmeal, Black, Sage, Walnut tones.",
    "tags": [
      "Accessories"
    ],
    "isNew": false,
    "isFeatured": true
  },
  {
    "id": "p053",
    "name": "Bodycon Dress",
    "slug": "bodycon-dress",
    "category": "accessories",
    "price": 345,
    "originalPrice": null,
    "image": "/photos/products/bodycon-dress-1.webp",
    "heroImage": "/photos/products/bodycon-dress-1.webp",
    "images": [
      "/photos/products/bodycon-dress-1.webp",
      "/photos/products/bodycon-dress-2.webp"
    ],
    "colors": [
      "Blush",
      "Navy"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 26,
    "material": "Saffiano leather",
    "rating": 4.7,
    "reviews": 363,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Blush, Navy tones.",
    "tags": [
      "Accessories"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p054",
    "name": "Shirt Dress",
    "slug": "shirt-dress",
    "category": "accessories",
    "price": 197,
    "originalPrice": null,
    "image": "/photos/products/shirt-dress-1.webp",
    "heroImage": "/photos/products/shirt-dress-1.webp",
    "images": [
      "/photos/products/shirt-dress-1.webp",
      "/photos/products/shirt-dress-2.webp"
    ],
    "colors": [
      "Bone",
      "Mauve",
      "Ivory"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 10,
    "material": "Full-grain leather",
    "rating": 4.3,
    "reviews": 392,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Bone, Mauve, Ivory tones.",
    "tags": [
      "Accessories"
    ],
    "isNew": true,
    "isFeatured": false
  },
  {
    "id": "p055",
    "name": "Wrap Dress",
    "slug": "wrap-dress",
    "category": "accessories",
    "price": 992,
    "originalPrice": null,
    "image": "/photos/products/wrap-dress-1.webp",
    "heroImage": "/photos/products/wrap-dress-1.webp",
    "images": [
      "/photos/products/wrap-dress-1.webp",
      "/photos/products/wrap-dress-2.webp"
    ],
    "colors": [
      "Terracotta",
      "White",
      "Slate",
      "Stone"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 3,
    "material": "Sterling silver",
    "rating": 4.8,
    "reviews": 473,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Terracotta, White, Slate, Stone tones.",
    "tags": [
      "Accessories",
      "Limited"
    ],
    "isNew": true,
    "isFeatured": false
  },
  {
    "id": "p056",
    "name": "Peacoat",
    "slug": "peacoat",
    "category": "accessories",
    "price": 449,
    "originalPrice": null,
    "image": "/photos/products/peacoat-1.webp",
    "heroImage": "/photos/products/peacoat-1.webp",
    "images": [
      "/photos/products/peacoat-1.webp",
      "/photos/products/peacoat-2.webp"
    ],
    "colors": [
      "Pewter",
      "Moss"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 27,
    "material": "Sterling silver",
    "rating": 4.4,
    "reviews": 349,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Pewter, Moss tones.",
    "tags": [
      "Accessories"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p057",
    "name": "Blazer Dress",
    "slug": "blazer-dress",
    "category": "accessories",
    "price": 537,
    "originalPrice": null,
    "image": "/photos/products/blazer-dress-1.webp",
    "heroImage": "/photos/products/blazer-dress-1.webp",
    "images": [
      "/photos/products/blazer-dress-1.webp",
      "/photos/products/blazer-dress-2.webp"
    ],
    "colors": [
      "Sage",
      "Mauve",
      "Ebony"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 39,
    "material": "Gold vermeil",
    "rating": 3.7,
    "reviews": 307,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Sage, Mauve, Ebony tones.",
    "tags": [
      "Accessories"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p058",
    "name": "Culottes",
    "slug": "culottes",
    "category": "accessories",
    "price": 973,
    "originalPrice": null,
    "image": "/photos/products/culottes-1.webp",
    "heroImage": "/photos/products/culottes-1.webp",
    "images": [
      "/photos/products/culottes-1.webp",
      "/photos/products/culottes-2.webp"
    ],
    "colors": [
      "Oatmeal",
      "White",
      "Burgundy"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 13,
    "material": "Saffiano leather",
    "rating": 4.5,
    "reviews": 363,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Oatmeal, White, Burgundy tones.",
    "tags": [
      "Accessories"
    ],
    "isNew": true,
    "isFeatured": false
  },
  {
    "id": "p059",
    "name": "Palazzo Pants",
    "slug": "palazzo-pants",
    "category": "accessories",
    "price": 393,
    "originalPrice": null,
    "image": "/photos/products/palazzo-pants-1.webp",
    "heroImage": "/photos/products/palazzo-pants-1.webp",
    "images": [
      "/photos/products/palazzo-pants-1.webp",
      "/photos/products/palazzo-pants-2.webp"
    ],
    "colors": [
      "Sand",
      "Bone",
      "Obsidian",
      "Ebony"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 36,
    "material": "Resin",
    "rating": 4.6,
    "reviews": 174,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Sand, Bone, Obsidian, Ebony tones.",
    "tags": [
      "Accessories"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p060",
    "name": "Chino Shorts",
    "slug": "chino-shorts",
    "category": "accessories",
    "price": 915,
    "originalPrice": null,
    "image": "/photos/products/chino-shorts-1.webp",
    "heroImage": "/photos/products/chino-shorts-1.webp",
    "images": [
      "/photos/products/chino-shorts-1.webp",
      "/photos/products/chino-shorts-2.webp"
    ],
    "colors": [
      "Black",
      "Rose",
      "Bone",
      "White"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 12,
    "material": "Resin",
    "rating": 4.1,
    "reviews": 193,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Black, Rose, Bone, White tones.",
    "tags": [
      "Accessories"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p061",
    "name": "Track Pants",
    "slug": "track-pants",
    "category": "accessories",
    "price": 831,
    "originalPrice": null,
    "image": "/photos/products/track-pants-1.webp",
    "heroImage": "/photos/products/track-pants-1.webp",
    "images": [
      "/photos/products/track-pants-1.webp",
      "/photos/products/track-pants-2.webp"
    ],
    "colors": [
      "Dusty-rose",
      "Black",
      "Slate"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 46,
    "material": "Suede",
    "rating": 3.7,
    "reviews": 225,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Dusty-rose, Black, Slate tones.",
    "tags": [
      "Accessories"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p062",
    "name": "Midi Skirt Plisse",
    "slug": "midi-skirt-plisse",
    "category": "accessories",
    "price": 668,
    "originalPrice": null,
    "image": "/photos/products/midi-skirt-plisse-1.webp",
    "heroImage": "/photos/products/midi-skirt-plisse-1.webp",
    "images": [
      "/photos/products/midi-skirt-plisse-1.webp",
      "/photos/products/midi-skirt-plisse-2.webp"
    ],
    "colors": [
      "Sage",
      "Copper",
      "Bronze",
      "Sand"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 29,
    "material": "Woven canvas",
    "rating": 4.8,
    "reviews": 70,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Sage, Copper, Bronze, Sand tones.",
    "tags": [
      "Accessories"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p063",
    "name": "Corset Top",
    "slug": "corset-top",
    "category": "accessories",
    "price": 982,
    "originalPrice": null,
    "image": "/photos/products/corset-top-1.webp",
    "heroImage": "/photos/products/corset-top-1.webp",
    "images": [
      "/photos/products/corset-top-1.webp",
      "/photos/products/corset-top-2.webp"
    ],
    "colors": [
      "Cream",
      "Moss"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 36,
    "material": "Studded brass",
    "rating": 4.8,
    "reviews": 198,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Cream, Moss tones.",
    "tags": [
      "Accessories"
    ],
    "isNew": false,
    "isFeatured": true
  },
  {
    "id": "p064",
    "name": "Tube Top",
    "slug": "tube-top",
    "category": "accessories",
    "price": 709,
    "originalPrice": null,
    "image": "/photos/products/tube-top-1.webp",
    "heroImage": "/photos/products/tube-top-1.webp",
    "images": [
      "/photos/products/tube-top-1.webp",
      "/photos/products/tube-top-2.webp"
    ],
    "colors": [
      "Mauve",
      "Moss"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 30,
    "material": "Suede",
    "rating": 4.4,
    "reviews": 486,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Mauve, Moss tones.",
    "tags": [
      "Accessories"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p065",
    "name": "Chiffon Blouse",
    "slug": "chiffon-blouse",
    "category": "accessories",
    "price": 966,
    "originalPrice": 1330,
    "image": "/photos/products/chiffon-blouse-1.webp",
    "heroImage": "/photos/products/chiffon-blouse-1.webp",
    "images": [
      "/photos/products/chiffon-blouse-1.webp",
      "/photos/products/chiffon-blouse-2.webp"
    ],
    "colors": [
      "Champagne",
      "Stone",
      "Mauve"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 0,
    "material": "Silk twill",
    "rating": 3.6,
    "reviews": 210,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Champagne, Stone, Mauve tones.",
    "tags": [
      "Accessories",
      "Sale",
      "Limited"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p066",
    "name": "Ruched Dress",
    "slug": "ruched-dress",
    "category": "accessories",
    "price": 412,
    "originalPrice": null,
    "image": "/photos/products/ruched-dress-1.webp",
    "heroImage": "/photos/products/ruched-dress-1.webp",
    "images": [
      "/photos/products/ruched-dress-1.webp",
      "/photos/products/ruched-dress-2.webp"
    ],
    "colors": [
      "Slate",
      "Oatmeal",
      "Obsidian"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 9,
    "material": "Resin",
    "rating": 3.8,
    "reviews": 353,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Slate, Oatmeal, Obsidian tones.",
    "tags": [
      "Accessories",
      "Limited"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p067",
    "name": "Asymmetric Hem",
    "slug": "asymmetric-hem",
    "category": "accessories",
    "price": 235,
    "originalPrice": null,
    "image": "/photos/products/asymmetric-hem-1.webp",
    "heroImage": "/photos/products/asymmetric-hem-1.webp",
    "images": [
      "/photos/products/asymmetric-hem-1.webp",
      "/photos/products/asymmetric-hem-2.webp"
    ],
    "colors": [
      "Burgundy",
      "Moss",
      "Mauve"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 39,
    "material": "Lapis lazuli",
    "rating": 4.3,
    "reviews": 191,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Burgundy, Moss, Mauve tones.",
    "tags": [
      "Accessories"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p068",
    "name": "Statement Sleeve",
    "slug": "statement-sleeve",
    "category": "accessories",
    "price": 968,
    "originalPrice": null,
    "image": "/photos/products/statement-sleeve-1.webp",
    "heroImage": "/photos/products/statement-sleeve-1.webp",
    "images": [
      "/photos/products/statement-sleeve-1.webp",
      "/photos/products/statement-sleeve-2.webp"
    ],
    "colors": [
      "Black",
      "Forest"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 52,
    "material": "Lapis lazuli",
    "rating": 4.3,
    "reviews": 377,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Black, Forest tones.",
    "tags": [
      "Accessories"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p069",
    "name": "Cutout Detail",
    "slug": "cutout-detail",
    "category": "accessories",
    "price": 470,
    "originalPrice": null,
    "image": "/photos/products/cutout-detail-1.webp",
    "heroImage": "/photos/products/cutout-detail-1.webp",
    "images": [
      "/photos/products/cutout-detail-1.webp",
      "/photos/products/cutout-detail-2.webp"
    ],
    "colors": [
      "Copper",
      "Sand"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 45,
    "material": "Full-grain leather",
    "rating": 4.8,
    "reviews": 101,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Copper, Sand tones.",
    "tags": [
      "Accessories"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p070",
    "name": "Embroidered Jacket",
    "slug": "embroidered-jacket",
    "category": "accessories",
    "price": 478,
    "originalPrice": null,
    "image": "/photos/products/embroidered-jacket-1.webp",
    "heroImage": "/photos/products/embroidered-jacket-1.webp",
    "images": [
      "/photos/products/embroidered-jacket-1.webp",
      "/photos/products/embroidered-jacket-2.webp"
    ],
    "colors": [
      "Ebony",
      "Camel"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 2,
    "material": "Full-grain leather",
    "rating": 4.5,
    "reviews": 390,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Ebony, Camel tones.",
    "tags": [
      "Accessories",
      "Limited"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p071",
    "name": "Lace Trim",
    "slug": "lace-trim",
    "category": "accessories",
    "price": 476,
    "originalPrice": null,
    "image": "/photos/products/lace-trim-1.webp",
    "heroImage": "/photos/products/lace-trim-1.webp",
    "images": [
      "/photos/products/lace-trim-1.webp",
      "/photos/products/lace-trim-2.webp"
    ],
    "colors": [
      "Dusty-rose",
      "Camel",
      "Stone"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 63,
    "material": "Resin",
    "rating": 4.7,
    "reviews": 26,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Dusty-rose, Camel, Stone tones.",
    "tags": [
      "Accessories",
      "Featured"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p072",
    "name": "Fringe Accent",
    "slug": "fringe-accent",
    "category": "accessories",
    "price": 667,
    "originalPrice": null,
    "image": "/photos/products/fringe-accent-1.webp",
    "heroImage": "/photos/products/fringe-accent-1.webp",
    "images": [
      "/photos/products/fringe-accent-1.webp",
      "/photos/products/fringe-accent-2.webp"
    ],
    "colors": [
      "Charcoal",
      "Forest",
      "Oatmeal"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 3,
    "material": "Silk twill",
    "rating": 4.5,
    "reviews": 372,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Charcoal, Forest, Oatmeal tones.",
    "tags": [
      "Accessories",
      "Limited"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p073",
    "name": "Chain Detail",
    "slug": "chain-detail",
    "category": "accessories",
    "price": 264,
    "originalPrice": null,
    "image": "/photos/products/chain-detail-1.webp",
    "heroImage": "/photos/products/chain-detail-1.webp",
    "images": [
      "/photos/products/chain-detail-1.webp",
      "/photos/products/chain-detail-2.webp"
    ],
    "colors": [
      "Copper",
      "Walnut"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 18,
    "material": "Nappa leather",
    "rating": 4.4,
    "reviews": 148,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Copper, Walnut tones.",
    "tags": [
      "Accessories"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p074",
    "name": "Studded Belt",
    "slug": "studded-belt",
    "category": "accessories",
    "price": 499,
    "originalPrice": null,
    "image": "/photos/products/studded-belt-1.webp",
    "heroImage": "/photos/products/studded-belt-1.webp",
    "images": [
      "/photos/products/studded-belt-1.webp",
      "/photos/products/studded-belt-2.webp"
    ],
    "colors": [
      "Burgundy",
      "Moss",
      "Sage",
      "Mauve"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 18,
    "material": "Pearl",
    "rating": 3.6,
    "reviews": 289,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Burgundy, Moss, Sage, Mauve tones.",
    "tags": [
      "Accessories"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p075",
    "name": "Woven Strap",
    "slug": "woven-strap",
    "category": "accessories",
    "price": 427,
    "originalPrice": null,
    "image": "/photos/products/woven-strap-1.webp",
    "heroImage": "/photos/products/woven-strap-1.webp",
    "images": [
      "/photos/products/woven-strap-1.webp",
      "/photos/products/woven-strap-2.webp"
    ],
    "colors": [
      "Copper",
      "Obsidian",
      "Camel",
      "Rose"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 31,
    "material": "Onyx",
    "rating": 4.1,
    "reviews": 26,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Copper, Obsidian, Camel, Rose tones.",
    "tags": [
      "Accessories"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p076",
    "name": "Knotted Handle",
    "slug": "knotted-handle",
    "category": "accessories",
    "price": 877,
    "originalPrice": null,
    "image": "/photos/products/knotted-handle-1.webp",
    "heroImage": "/photos/products/knotted-handle-1.webp",
    "images": [
      "/photos/products/knotted-handle-1.webp",
      "/photos/products/knotted-handle-2.webp"
    ],
    "colors": [
      "Blush",
      "Stone"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 40,
    "material": "Pearl",
    "rating": 4.8,
    "reviews": 39,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Blush, Stone tones.",
    "tags": [
      "Accessories"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p077",
    "name": "Hardware Gold",
    "slug": "hardware-gold",
    "category": "accessories",
    "price": 884,
    "originalPrice": null,
    "image": "/photos/products/hardware-gold-1.webp",
    "heroImage": "/photos/products/hardware-gold-1.webp",
    "images": [
      "/photos/products/hardware-gold-1.webp",
      "/photos/products/hardware-gold-2.webp"
    ],
    "colors": [
      "Burgundy",
      "Ebony"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 46,
    "material": "Nappa leather",
    "rating": 3.8,
    "reviews": 313,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Burgundy, Ebony tones.",
    "tags": [
      "Accessories"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p078",
    "name": "Hardware Silver",
    "slug": "hardware-silver",
    "category": "accessories",
    "price": 813,
    "originalPrice": null,
    "image": "/photos/products/hardware-silver-1.webp",
    "heroImage": "/photos/products/hardware-silver-1.webp",
    "images": [
      "/photos/products/hardware-silver-1.webp",
      "/photos/products/hardware-silver-2.webp"
    ],
    "colors": [
      "Black",
      "Copper",
      "Stone"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 9,
    "material": "Woven canvas",
    "rating": 4.1,
    "reviews": 257,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Black, Copper, Stone tones.",
    "tags": [
      "Accessories",
      "Limited"
    ],
    "isNew": true,
    "isFeatured": true
  },
  {
    "id": "p079",
    "name": "Hardware Brass",
    "slug": "hardware-brass",
    "category": "accessories",
    "price": 981,
    "originalPrice": null,
    "image": "/photos/products/hardware-brass-1.webp",
    "heroImage": "/photos/products/hardware-brass-1.webp",
    "images": [
      "/photos/products/hardware-brass-1.webp",
      "/photos/products/hardware-brass-2.webp"
    ],
    "colors": [
      "Obsidian",
      "Champagne",
      "Ebony",
      "Walnut"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 42,
    "material": "Silk twill",
    "rating": 4.9,
    "reviews": 105,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Obsidian, Champagne, Ebony, Walnut tones.",
    "tags": [
      "Accessories"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p080",
    "name": "Matte Black",
    "slug": "matte-black",
    "category": "accessories",
    "price": 1165,
    "originalPrice": 1691,
    "image": "/photos/products/matte-black-1.webp",
    "heroImage": "/photos/products/matte-black-1.webp",
    "images": [
      "/photos/products/matte-black-1.webp",
      "/photos/products/matte-black-2.webp"
    ],
    "colors": [
      "Sage",
      "Stone",
      "Bronze"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 61,
    "material": "Onyx",
    "rating": 3.6,
    "reviews": 110,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Sage, Stone, Bronze tones.",
    "tags": [
      "Accessories",
      "Sale"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p081",
    "name": "Clear Acetate",
    "slug": "clear-acetate",
    "category": "accessories",
    "price": 580,
    "originalPrice": null,
    "image": "/photos/products/clear-acetate-1.webp",
    "heroImage": "/photos/products/clear-acetate-1.webp",
    "images": [
      "/photos/products/clear-acetate-1.webp",
      "/photos/products/clear-acetate-2.webp"
    ],
    "colors": [
      "Bronze",
      "Ebony",
      "Walnut"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 0,
    "material": "Resin",
    "rating": 4.4,
    "reviews": 169,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Bronze, Ebony, Walnut tones.",
    "tags": [
      "Accessories",
      "Limited",
      "Featured"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p082",
    "name": "Tortoise Shell",
    "slug": "tortoise-shell",
    "category": "accessories",
    "price": 577,
    "originalPrice": 791,
    "image": "/photos/products/tortoise-shell-1.webp",
    "heroImage": "/photos/products/tortoise-shell-1.webp",
    "images": [
      "/photos/products/tortoise-shell-1.webp",
      "/photos/products/tortoise-shell-2.webp"
    ],
    "colors": [
      "Walnut",
      "White"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 66,
    "material": "Full-grain leather",
    "rating": 4.2,
    "reviews": 405,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Walnut, White tones.",
    "tags": [
      "Accessories",
      "Sale"
    ],
    "isNew": true,
    "isFeatured": false
  },
  {
    "id": "p083",
    "name": "Cat Eye",
    "slug": "cat-eye",
    "category": "accessories",
    "price": 362,
    "originalPrice": 536,
    "image": "/photos/products/cat-eye-1.webp",
    "heroImage": "/photos/products/cat-eye-1.webp",
    "images": [
      "/photos/products/cat-eye-1.webp",
      "/photos/products/cat-eye-2.webp"
    ],
    "colors": [
      "Terracotta",
      "Rose"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 78,
    "material": "Woven canvas",
    "rating": 4.8,
    "reviews": 353,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Terracotta, Rose tones.",
    "tags": [
      "Accessories",
      "Sale"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p084",
    "name": "Round Frame",
    "slug": "round-frame",
    "category": "accessories",
    "price": 123,
    "originalPrice": null,
    "image": "/photos/products/round-frame-1.webp",
    "heroImage": "/photos/products/round-frame-1.webp",
    "images": [
      "/photos/products/round-frame-1.webp",
      "/photos/products/round-frame-2.webp"
    ],
    "colors": [
      "Walnut",
      "Navy",
      "Ivory"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 52,
    "material": "Pearl",
    "rating": 5,
    "reviews": 374,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Walnut, Navy, Ivory tones.",
    "tags": [
      "Accessories"
    ],
    "isNew": true,
    "isFeatured": false
  },
  {
    "id": "p085",
    "name": "Square Frame",
    "slug": "square-frame",
    "category": "accessories",
    "price": 962,
    "originalPrice": 1258,
    "image": "/photos/products/square-frame-1.webp",
    "heroImage": "/photos/products/square-frame-1.webp",
    "images": [
      "/photos/products/square-frame-1.webp",
      "/photos/products/square-frame-2.webp"
    ],
    "colors": [
      "Charcoal",
      "Rose",
      "Terracotta",
      "Ebony"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 0,
    "material": "Resin",
    "rating": 4,
    "reviews": 418,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Charcoal, Rose, Terracotta, Ebony tones.",
    "tags": [
      "Accessories",
      "Sale",
      "Limited"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p086",
    "name": "Oversized",
    "slug": "oversized",
    "category": "accessories",
    "price": 478,
    "originalPrice": null,
    "image": "/photos/products/oversized-1.webp",
    "heroImage": "/photos/products/oversized-1.webp",
    "images": [
      "/photos/products/oversized-1.webp",
      "/photos/products/oversized-2.webp"
    ],
    "colors": [
      "Charcoal",
      "White",
      "Burgundy"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 52,
    "material": "Silk twill",
    "rating": 4.5,
    "reviews": 451,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Charcoal, White, Burgundy tones.",
    "tags": [
      "Accessories"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p087",
    "name": "Hoop Earrings",
    "slug": "hoop-earrings",
    "category": "accessories",
    "price": 864,
    "originalPrice": null,
    "image": "/photos/products/hoop-earrings-1.webp",
    "heroImage": "/photos/products/hoop-earrings-1.webp",
    "images": [
      "/photos/products/hoop-earrings-1.webp",
      "/photos/products/hoop-earrings-2.webp"
    ],
    "colors": [
      "Bronze",
      "Ivory",
      "Moss",
      "Charcoal"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 10,
    "material": "Nappa leather",
    "rating": 4.9,
    "reviews": 72,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Bronze, Ivory, Moss, Charcoal tones.",
    "tags": [
      "Accessories"
    ],
    "isNew": true,
    "isFeatured": false
  },
  {
    "id": "p088",
    "name": "Stud Earrings",
    "slug": "stud-earrings",
    "category": "accessories",
    "price": 508,
    "originalPrice": null,
    "image": "/photos/products/stud-earrings-1.webp",
    "heroImage": "/photos/products/stud-earrings-1.webp",
    "images": [
      "/photos/products/stud-earrings-1.webp",
      "/photos/products/stud-earrings-2.webp"
    ],
    "colors": [
      "White",
      "Ebony",
      "Sand",
      "Copper"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 40,
    "material": "Silk twill",
    "rating": 4.3,
    "reviews": 307,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in White, Ebony, Sand, Copper tones.",
    "tags": [
      "Accessories",
      "Featured"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p089",
    "name": "Chandelier",
    "slug": "chandelier",
    "category": "accessories",
    "price": 540,
    "originalPrice": null,
    "image": "/photos/products/chandelier-1.webp",
    "heroImage": "/photos/products/chandelier-1.webp",
    "images": [
      "/photos/products/chandelier-1.webp",
      "/photos/products/chandelier-2.webp"
    ],
    "colors": [
      "Taupe",
      "Cream",
      "Ebony",
      "Bronze"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 44,
    "material": "Sterling silver",
    "rating": 4.1,
    "reviews": 364,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Taupe, Cream, Ebony, Bronze tones.",
    "tags": [
      "Accessories"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p090",
    "name": "Drop Earrings",
    "slug": "drop-earrings",
    "category": "accessories",
    "price": 91,
    "originalPrice": 135,
    "image": "/photos/products/drop-earrings-1.webp",
    "heroImage": "/photos/products/drop-earrings-1.webp",
    "images": [
      "/photos/products/drop-earrings-1.webp",
      "/photos/products/drop-earrings-2.webp"
    ],
    "colors": [
      "Blush",
      "Bone"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 76,
    "material": "Pearl",
    "rating": 4.7,
    "reviews": 236,
    "description": "A refined piece in full-grain leather, thoughtfully crafted for the modern individual. Available in Blush, Bone tones.",
    "tags": [
      "Accessories",
      "Sale"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p091",
    "name": "Choker",
    "slug": "choker",
    "category": "living",
    "price": 91,
    "originalPrice": 123,
    "image": "/photos/products/choker-1.webp",
    "heroImage": "/photos/products/choker-1.webp",
    "images": [
      "/photos/products/choker-1.webp",
      "/photos/products/choker-2.webp"
    ],
    "colors": [
      "Walnut",
      "Rose",
      "Moss"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 54,
    "material": "Linen",
    "rating": 4.4,
    "reviews": 136,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Walnut, Rose, Moss tones.",
    "tags": [
      "Home",
      "Sale"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p092",
    "name": "Pendant Necklace",
    "slug": "pendant-necklace",
    "category": "living",
    "price": 678,
    "originalPrice": null,
    "image": "/photos/products/pendant-necklace-1.webp",
    "heroImage": "/photos/products/pendant-necklace-1.webp",
    "images": [
      "/photos/products/pendant-necklace-1.webp",
      "/photos/products/pendant-necklace-2.webp"
    ],
    "colors": [
      "Stone",
      "Rose"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 61,
    "material": "Walnut",
    "rating": 4.8,
    "reviews": 168,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Stone, Rose tones.",
    "tags": [
      "Home"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p093",
    "name": "Layered Chain",
    "slug": "layered-chain",
    "category": "living",
    "price": 103,
    "originalPrice": 128,
    "image": "/photos/products/layered-chain-1.webp",
    "heroImage": "/photos/products/layered-chain-1.webp",
    "images": [
      "/photos/products/layered-chain-1.webp",
      "/photos/products/layered-chain-2.webp"
    ],
    "colors": [
      "Forest",
      "Navy",
      "Oatmeal",
      "Obsidian"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 7,
    "material": "Travertine",
    "rating": 4,
    "reviews": 247,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Forest, Navy, Oatmeal, Obsidian tones.",
    "tags": [
      "Home",
      "Sale",
      "Limited"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p094",
    "name": "Bar Necklace",
    "slug": "bar-necklace",
    "category": "living",
    "price": 706,
    "originalPrice": null,
    "image": "/photos/products/bar-necklace-1.webp",
    "heroImage": "/photos/products/bar-necklace-1.webp",
    "images": [
      "/photos/products/bar-necklace-1.webp",
      "/photos/products/bar-necklace-2.webp"
    ],
    "colors": [
      "Stone",
      "Copper",
      "White"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 54,
    "material": "Stoneware",
    "rating": 4.8,
    "reviews": 71,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Stone, Copper, White tones.",
    "tags": [
      "Home"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p095",
    "name": "Charm Bracelet",
    "slug": "charm-bracelet",
    "category": "living",
    "price": 281,
    "originalPrice": null,
    "image": "/photos/products/charm-bracelet-1.webp",
    "heroImage": "/photos/products/charm-bracelet-1.webp",
    "images": [
      "/photos/products/charm-bracelet-1.webp",
      "/photos/products/charm-bracelet-2.webp"
    ],
    "colors": [
      "Navy",
      "Mauve"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 28,
    "material": "Silk",
    "rating": 4.7,
    "reviews": 242,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Navy, Mauve tones.",
    "tags": [
      "Home",
      "Featured"
    ],
    "isNew": true,
    "isFeatured": false
  },
  {
    "id": "p096",
    "name": "Bangle Set",
    "slug": "bangle-set",
    "category": "living",
    "price": 341,
    "originalPrice": null,
    "image": "/photos/products/bangle-set-1.webp",
    "heroImage": "/photos/products/bangle-set-1.webp",
    "images": [
      "/photos/products/bangle-set-1.webp",
      "/photos/products/bangle-set-2.webp"
    ],
    "colors": [
      "Copper",
      "Taupe"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 43,
    "material": "Concrete",
    "rating": 3.9,
    "reviews": 133,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Copper, Taupe tones.",
    "tags": [
      "Home"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p097",
    "name": "Cuff Bracelet",
    "slug": "cuff-bracelet",
    "category": "living",
    "price": 708,
    "originalPrice": 873,
    "image": "/photos/products/cuff-bracelet-1.webp",
    "heroImage": "/photos/products/cuff-bracelet-1.webp",
    "images": [
      "/photos/products/cuff-bracelet-1.webp",
      "/photos/products/cuff-bracelet-2.webp"
    ],
    "colors": [
      "Oatmeal",
      "Forest"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 22,
    "material": "Acrylic",
    "rating": 3.9,
    "reviews": 452,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Oatmeal, Forest tones.",
    "tags": [
      "Home",
      "Sale"
    ],
    "isNew": false,
    "isFeatured": true
  },
  {
    "id": "p098",
    "name": "Chain Bracelet",
    "slug": "chain-bracelet",
    "category": "living",
    "price": 337,
    "originalPrice": null,
    "image": "/photos/products/chain-bracelet-1.webp",
    "heroImage": "/photos/products/chain-bracelet-1.webp",
    "images": [
      "/photos/products/chain-bracelet-1.webp",
      "/photos/products/chain-bracelet-2.webp"
    ],
    "colors": [
      "Sage",
      "Sand"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 37,
    "material": "Paper",
    "rating": 3.8,
    "reviews": 146,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Sage, Sand tones.",
    "tags": [
      "Home",
      "Featured"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p099",
    "name": "Signet Ring",
    "slug": "signet-ring",
    "category": "living",
    "price": 609,
    "originalPrice": null,
    "image": "/photos/products/signet-ring-1.webp",
    "heroImage": "/photos/products/signet-ring-1.webp",
    "images": [
      "/photos/products/signet-ring-1.webp",
      "/photos/products/signet-ring-2.webp"
    ],
    "colors": [
      "Terracotta",
      "Copper",
      "Black"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 2,
    "material": "Acrylic",
    "rating": 4.6,
    "reviews": 485,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Terracotta, Copper, Black tones.",
    "tags": [
      "Home",
      "Limited",
      "Featured"
    ],
    "isNew": true,
    "isFeatured": false
  },
  {
    "id": "p100",
    "name": "Stackable Ring",
    "slug": "stackable-ring",
    "category": "living",
    "price": 697,
    "originalPrice": null,
    "image": "/photos/products/stackable-ring-1.webp",
    "heroImage": "/photos/products/stackable-ring-1.webp",
    "images": [
      "/photos/products/stackable-ring-1.webp",
      "/photos/products/stackable-ring-2.webp"
    ],
    "colors": [
      "Charcoal",
      "Navy"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 66,
    "material": "Brass",
    "rating": 4,
    "reviews": 486,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Charcoal, Navy tones.",
    "tags": [
      "Home"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p101",
    "name": "Solitaire Ring",
    "slug": "solitaire-ring",
    "category": "living",
    "price": 322,
    "originalPrice": 473,
    "image": "/photos/products/solitaire-ring-1.webp",
    "heroImage": "/photos/products/solitaire-ring-1.webp",
    "images": [
      "/photos/products/solitaire-ring-1.webp",
      "/photos/products/solitaire-ring-2.webp"
    ],
    "colors": [
      "Oatmeal",
      "Bone",
      "Pewter"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 2,
    "material": "Cotton",
    "rating": 3.5,
    "reviews": 489,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Oatmeal, Bone, Pewter tones.",
    "tags": [
      "Home",
      "Sale",
      "Limited"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p102",
    "name": "Anklet",
    "slug": "anklet",
    "category": "living",
    "price": 193,
    "originalPrice": 269,
    "image": "/photos/products/anklet-1.webp",
    "heroImage": "/photos/products/anklet-1.webp",
    "images": [
      "/photos/products/anklet-1.webp",
      "/photos/products/anklet-2.webp"
    ],
    "colors": [
      "Bone",
      "Cream"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 61,
    "material": "Brass",
    "rating": 4.9,
    "reviews": 80,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Bone, Cream tones.",
    "tags": [
      "Home",
      "Sale",
      "Featured"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p103",
    "name": "Body Chain",
    "slug": "body-chain",
    "category": "living",
    "price": 572,
    "originalPrice": null,
    "image": "/photos/products/body-chain-1.webp",
    "heroImage": "/photos/products/body-chain-1.webp",
    "images": [
      "/photos/products/body-chain-1.webp",
      "/photos/products/body-chain-2.webp"
    ],
    "colors": [
      "Camel",
      "Moss"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 32,
    "material": "Paper",
    "rating": 4.3,
    "reviews": 153,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Camel, Moss tones.",
    "tags": [
      "Home"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p104",
    "name": "Hair Clip",
    "slug": "hair-clip",
    "category": "living",
    "price": 441,
    "originalPrice": 619,
    "image": "/photos/products/hair-clip-1.webp",
    "heroImage": "/photos/products/hair-clip-1.webp",
    "images": [
      "/photos/products/hair-clip-1.webp",
      "/photos/products/hair-clip-2.webp"
    ],
    "colors": [
      "Bronze",
      "Slate"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 69,
    "material": "Paper",
    "rating": 3.6,
    "reviews": 229,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Bronze, Slate tones.",
    "tags": [
      "Home",
      "Sale"
    ],
    "isNew": false,
    "isFeatured": true
  },
  {
    "id": "p105",
    "name": "Hair Tie",
    "slug": "hair-tie",
    "category": "living",
    "price": 365,
    "originalPrice": null,
    "image": "/photos/products/hair-tie-1.webp",
    "heroImage": "/photos/products/hair-tie-1.webp",
    "images": [
      "/photos/products/hair-tie-1.webp",
      "/photos/products/hair-tie-2.webp"
    ],
    "colors": [
      "Blush",
      "Ebony",
      "Dusty-rose",
      "Taupe"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 5,
    "material": "Marble",
    "rating": 4.9,
    "reviews": 295,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Blush, Ebony, Dusty-rose, Taupe tones.",
    "tags": [
      "Home",
      "Limited",
      "Featured"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p106",
    "name": "Scrunchie",
    "slug": "scrunchie",
    "category": "living",
    "price": 591,
    "originalPrice": null,
    "image": "/photos/products/scrunchie-1.webp",
    "heroImage": "/photos/products/scrunchie-1.webp",
    "images": [
      "/photos/products/scrunchie-1.webp",
      "/photos/products/scrunchie-2.webp"
    ],
    "colors": [
      "Oatmeal",
      "Bronze",
      "Black",
      "Bone"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 21,
    "material": "Linen",
    "rating": 4.9,
    "reviews": 362,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Oatmeal, Bronze, Black, Bone tones.",
    "tags": [
      "Home",
      "Featured"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p107",
    "name": "Headband",
    "slug": "headband",
    "category": "living",
    "price": 726,
    "originalPrice": null,
    "image": "/photos/products/headband-1.webp",
    "heroImage": "/photos/products/headband-1.webp",
    "images": [
      "/photos/products/headband-1.webp",
      "/photos/products/headband-2.webp"
    ],
    "colors": [
      "Taupe",
      "Camel"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 59,
    "material": "Concrete",
    "rating": 4.1,
    "reviews": 153,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Taupe, Camel tones.",
    "tags": [
      "Home"
    ],
    "isNew": true,
    "isFeatured": false
  },
  {
    "id": "p108",
    "name": "Veil",
    "slug": "veil",
    "category": "living",
    "price": 736,
    "originalPrice": null,
    "image": "/photos/products/veil-1.webp",
    "heroImage": "/photos/products/veil-1.webp",
    "images": [
      "/photos/products/veil-1.webp",
      "/photos/products/veil-2.webp"
    ],
    "colors": [
      "Ivory",
      "Forest",
      "Navy"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 2,
    "material": "Borosilicate glass",
    "rating": 4.9,
    "reviews": 127,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Ivory, Forest, Navy tones.",
    "tags": [
      "Home",
      "Limited",
      "Featured"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p109",
    "name": "Flower Crown",
    "slug": "flower-crown",
    "category": "living",
    "price": 151,
    "originalPrice": null,
    "image": "/photos/products/flower-crown-1.webp",
    "heroImage": "/photos/products/flower-crown-1.webp",
    "images": [
      "/photos/products/flower-crown-1.webp",
      "/photos/products/flower-crown-2.webp"
    ],
    "colors": [
      "Slate",
      "Camel",
      "Sand"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 55,
    "material": "Acrylic",
    "rating": 4.8,
    "reviews": 211,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Slate, Camel, Sand tones.",
    "tags": [
      "Home"
    ],
    "isNew": true,
    "isFeatured": false
  },
  {
    "id": "p110",
    "name": "Brooch",
    "slug": "brooch",
    "category": "living",
    "price": 513,
    "originalPrice": null,
    "image": "/photos/products/brooch-1.webp",
    "heroImage": "/photos/products/brooch-1.webp",
    "images": [
      "/photos/products/brooch-1.webp",
      "/photos/products/brooch-2.webp"
    ],
    "colors": [
      "Sage",
      "Taupe",
      "Pewter"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 74,
    "material": "Travertine",
    "rating": 4.2,
    "reviews": 348,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Sage, Taupe, Pewter tones.",
    "tags": [
      "Home"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p111",
    "name": "Lapel Pin",
    "slug": "lapel-pin",
    "category": "living",
    "price": 342,
    "originalPrice": null,
    "image": "/photos/products/lapel-pin-1.webp",
    "heroImage": "/photos/products/lapel-pin-1.webp",
    "images": [
      "/photos/products/lapel-pin-1.webp",
      "/photos/products/lapel-pin-2.webp"
    ],
    "colors": [
      "Walnut",
      "Burgundy",
      "Oatmeal",
      "Cream"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 48,
    "material": "Marble",
    "rating": 4.3,
    "reviews": 345,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Walnut, Burgundy, Oatmeal, Cream tones.",
    "tags": [
      "Home"
    ],
    "isNew": false,
    "isFeatured": true
  },
  {
    "id": "p112",
    "name": "Keychain",
    "slug": "keychain",
    "category": "living",
    "price": 142,
    "originalPrice": 213,
    "image": "/photos/products/keychain-1.webp",
    "heroImage": "/photos/products/keychain-1.webp",
    "images": [
      "/photos/products/keychain-1.webp",
      "/photos/products/keychain-2.webp"
    ],
    "colors": [
      "Champagne",
      "Oatmeal",
      "White",
      "Slate"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 54,
    "material": "Borosilicate glass",
    "rating": 4.6,
    "reviews": 39,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Champagne, Oatmeal, White, Slate tones.",
    "tags": [
      "Home",
      "Sale"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p113",
    "name": "Luggage Tag",
    "slug": "luggage-tag",
    "category": "living",
    "price": 409,
    "originalPrice": null,
    "image": "/photos/products/luggage-tag-1.webp",
    "heroImage": "/photos/products/luggage-tag-1.webp",
    "images": [
      "/photos/products/luggage-tag-1.webp",
      "/photos/products/luggage-tag-2.webp"
    ],
    "colors": [
      "Burgundy",
      "Terracotta",
      "Sand"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 40,
    "material": "Stoneware",
    "rating": 3.5,
    "reviews": 362,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Burgundy, Terracotta, Sand tones.",
    "tags": [
      "Home",
      "Featured"
    ],
    "isNew": true,
    "isFeatured": false
  },
  {
    "id": "p114",
    "name": "Card Holder",
    "slug": "card-holder",
    "category": "living",
    "price": 131,
    "originalPrice": null,
    "image": "/photos/products/card-holder-1.webp",
    "heroImage": "/photos/products/card-holder-1.webp",
    "images": [
      "/photos/products/card-holder-1.webp",
      "/photos/products/card-holder-2.webp"
    ],
    "colors": [
      "Copper",
      "Rose"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 72,
    "material": "Linen",
    "rating": 4.6,
    "reviews": 443,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Copper, Rose tones.",
    "tags": [
      "Home",
      "Featured"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p115",
    "name": "Coin Pouch",
    "slug": "coin-pouch",
    "category": "living",
    "price": 701,
    "originalPrice": null,
    "image": "/photos/products/coin-pouch-1.webp",
    "heroImage": "/photos/products/coin-pouch-1.webp",
    "images": [
      "/photos/products/coin-pouch-1.webp",
      "/photos/products/coin-pouch-2.webp"
    ],
    "colors": [
      "Sage"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 59,
    "material": "Ceramic",
    "rating": 4.1,
    "reviews": 345,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Sage tones.",
    "tags": [
      "Home"
    ],
    "isNew": false,
    "isFeatured": true
  },
  {
    "id": "p116",
    "name": "Sunglasses Case",
    "slug": "sunglasses-case",
    "category": "living",
    "price": 233,
    "originalPrice": null,
    "image": "/photos/products/sunglasses-case-1.webp",
    "heroImage": "/photos/products/sunglasses-case-1.webp",
    "images": [
      "/photos/products/sunglasses-case-1.webp",
      "/photos/products/sunglasses-case-2.webp"
    ],
    "colors": [
      "Navy",
      "Burgundy",
      "Copper"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 70,
    "material": "Silk",
    "rating": 3.6,
    "reviews": 384,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Navy, Burgundy, Copper tones.",
    "tags": [
      "Home"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p117",
    "name": "Makeup Bag",
    "slug": "makeup-bag",
    "category": "living",
    "price": 349,
    "originalPrice": null,
    "image": "/photos/products/makeup-bag-1.webp",
    "heroImage": "/photos/products/makeup-bag-1.webp",
    "images": [
      "/photos/products/makeup-bag-1.webp",
      "/photos/products/makeup-bag-2.webp"
    ],
    "colors": [
      "Obsidian",
      "Bronze"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 15,
    "material": "Ceramic",
    "rating": 4.9,
    "reviews": 350,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Obsidian, Bronze tones.",
    "tags": [
      "Home"
    ],
    "isNew": true,
    "isFeatured": false
  },
  {
    "id": "p118",
    "name": "Toiletry Kit",
    "slug": "toiletry-kit",
    "category": "living",
    "price": 335,
    "originalPrice": null,
    "image": "/photos/products/toiletry-kit-1.webp",
    "heroImage": "/photos/products/toiletry-kit-1.webp",
    "images": [
      "/photos/products/toiletry-kit-1.webp",
      "/photos/products/toiletry-kit-2.webp"
    ],
    "colors": [
      "Obsidian",
      "Dusty-rose"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 21,
    "material": "Walnut",
    "rating": 4.2,
    "reviews": 390,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Obsidian, Dusty-rose tones.",
    "tags": [
      "Home"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p119",
    "name": "Travel Pillow",
    "slug": "travel-pillow",
    "category": "living",
    "price": 647,
    "originalPrice": 810,
    "image": "/photos/products/travel-pillow-1.webp",
    "heroImage": "/photos/products/travel-pillow-1.webp",
    "images": [
      "/photos/products/travel-pillow-1.webp",
      "/photos/products/travel-pillow-2.webp"
    ],
    "colors": [
      "Slate",
      "Copper",
      "Bone"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 7,
    "material": "Paper",
    "rating": 4.5,
    "reviews": 257,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Slate, Copper, Bone tones.",
    "tags": [
      "Home",
      "Sale",
      "Limited"
    ],
    "isNew": false,
    "isFeatured": true
  },
  {
    "id": "p120",
    "name": "Umbrella",
    "slug": "umbrella",
    "category": "living",
    "price": 799,
    "originalPrice": 1134,
    "image": "/photos/products/umbrella-1.webp",
    "heroImage": "/photos/products/umbrella-1.webp",
    "images": [
      "/photos/products/umbrella-1.webp",
      "/photos/products/umbrella-2.webp"
    ],
    "colors": [
      "Sand",
      "Bronze"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 74,
    "material": "Acrylic",
    "rating": 5,
    "reviews": 34,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Sand, Bronze tones.",
    "tags": [
      "Home",
      "Sale"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p121",
    "name": "Water Bottle",
    "slug": "water-bottle",
    "category": "living",
    "price": 212,
    "originalPrice": null,
    "image": "/photos/products/water-bottle-1.webp",
    "heroImage": "/photos/products/water-bottle-1.webp",
    "images": [
      "/photos/products/water-bottle-1.webp",
      "/photos/products/water-bottle-2.webp"
    ],
    "colors": [
      "Camel",
      "Pewter",
      "Terracotta",
      "Walnut"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 23,
    "material": "Ceramic",
    "rating": 4.7,
    "reviews": 166,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Camel, Pewter, Terracotta, Walnut tones.",
    "tags": [
      "Home"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p122",
    "name": "Tumbler",
    "slug": "tumbler",
    "category": "living",
    "price": 50,
    "originalPrice": 70,
    "image": "/photos/products/tumbler-1.webp",
    "heroImage": "/photos/products/tumbler-1.webp",
    "images": [
      "/photos/products/tumbler-1.webp",
      "/photos/products/tumbler-2.webp"
    ],
    "colors": [
      "Walnut",
      "White",
      "Burgundy"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 20,
    "material": "Acrylic",
    "rating": 4.8,
    "reviews": 450,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Walnut, White, Burgundy tones.",
    "tags": [
      "Home",
      "Sale"
    ],
    "isNew": true,
    "isFeatured": true
  },
  {
    "id": "p123",
    "name": "Wine Glass",
    "slug": "wine-glass",
    "category": "living",
    "price": 623,
    "originalPrice": 768,
    "image": "/photos/products/wine-glass-1.webp",
    "heroImage": "/photos/products/wine-glass-1.webp",
    "images": [
      "/photos/products/wine-glass-1.webp",
      "/photos/products/wine-glass-2.webp"
    ],
    "colors": [
      "Navy",
      "Sage",
      "Stone",
      "Ebony"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 4,
    "material": "Rattan",
    "rating": 4.7,
    "reviews": 323,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Navy, Sage, Stone, Ebony tones.",
    "tags": [
      "Home",
      "Sale",
      "Limited"
    ],
    "isNew": true,
    "isFeatured": false
  },
  {
    "id": "p124",
    "name": "Cocktail Shaker",
    "slug": "cocktail-shaker",
    "category": "living",
    "price": 58,
    "originalPrice": null,
    "image": "/photos/products/cocktail-shaker-1.webp",
    "heroImage": "/photos/products/cocktail-shaker-1.webp",
    "images": [
      "/photos/products/cocktail-shaker-1.webp",
      "/photos/products/cocktail-shaker-2.webp"
    ],
    "colors": [
      "Slate",
      "Sand"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 43,
    "material": "Linen",
    "rating": 4.4,
    "reviews": 38,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Slate, Sand tones.",
    "tags": [
      "Home",
      "Featured"
    ],
    "isNew": true,
    "isFeatured": false
  },
  {
    "id": "p125",
    "name": "Cheese Knife",
    "slug": "cheese-knife",
    "category": "living",
    "price": 434,
    "originalPrice": null,
    "image": "/photos/products/cheese-knife-1.webp",
    "heroImage": "/photos/products/cheese-knife-1.webp",
    "images": [
      "/photos/products/cheese-knife-1.webp",
      "/photos/products/cheese-knife-2.webp"
    ],
    "colors": [
      "Copper",
      "Slate",
      "Camel",
      "Obsidian"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 35,
    "material": "Acrylic",
    "rating": 4.9,
    "reviews": 235,
    "description": "A refined piece in stoneware, thoughtfully crafted for the modern individual. Available in Copper, Slate, Camel, Obsidian tones.",
    "tags": [
      "Home"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p126",
    "name": "Serving Spoon",
    "slug": "serving-spoon",
    "category": "fragrance",
    "price": 66,
    "originalPrice": null,
    "image": "/photos/products/serving-spoon-1.webp",
    "heroImage": "/photos/products/serving-spoon-1.webp",
    "images": [
      "/photos/products/serving-spoon-1.webp",
      "/photos/products/serving-spoon-2.webp"
    ],
    "colors": [
      "Champagne",
      "Copper"
    ],
    "sizes": [
      "50ml",
      "100ml"
    ],
    "stock": 19,
    "material": "Candle wax",
    "rating": 4.8,
    "reviews": 161,
    "description": "A refined piece in eau de parfum, thoughtfully crafted for the modern individual. Available in Champagne, Copper tones.",
    "tags": [
      "Fragrance"
    ],
    "isNew": true,
    "isFeatured": false
  },
  {
    "id": "p127",
    "name": "Salt Pepper Set",
    "slug": "salt-pepper-set",
    "category": "fragrance",
    "price": 314,
    "originalPrice": null,
    "image": "/photos/products/salt-pepper-set-1.webp",
    "heroImage": "/photos/products/salt-pepper-set-1.webp",
    "images": [
      "/photos/products/salt-pepper-set-1.webp",
      "/photos/products/salt-pepper-set-2.webp"
    ],
    "colors": [
      "Pewter",
      "Stone",
      "Moss"
    ],
    "sizes": [
      "50ml",
      "100ml"
    ],
    "stock": 50,
    "material": "Extrait de parfum",
    "rating": 4.6,
    "reviews": 284,
    "description": "A refined piece in eau de parfum, thoughtfully crafted for the modern individual. Available in Pewter, Stone, Moss tones.",
    "tags": [
      "Fragrance"
    ],
    "isNew": true,
    "isFeatured": false
  },
  {
    "id": "p128",
    "name": "Coaster Set",
    "slug": "coaster-set",
    "category": "fragrance",
    "price": 196,
    "originalPrice": null,
    "image": "/photos/products/coaster-set-1.webp",
    "heroImage": "/photos/products/coaster-set-1.webp",
    "images": [
      "/photos/products/coaster-set-1.webp",
      "/photos/products/coaster-set-2.webp"
    ],
    "colors": [
      "Charcoal",
      "Bronze",
      "Walnut",
      "Stone"
    ],
    "sizes": [
      "50ml",
      "100ml"
    ],
    "stock": 59,
    "material": "Body mist",
    "rating": 4.1,
    "reviews": 72,
    "description": "A refined piece in eau de parfum, thoughtfully crafted for the modern individual. Available in Charcoal, Bronze, Walnut, Stone tones.",
    "tags": [
      "Fragrance"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p129",
    "name": "Trinket Dish",
    "slug": "trinket-dish",
    "category": "fragrance",
    "price": 227,
    "originalPrice": 331,
    "image": "/photos/products/trinket-dish-1.webp",
    "heroImage": "/photos/products/trinket-dish-1.webp",
    "images": [
      "/photos/products/trinket-dish-1.webp",
      "/photos/products/trinket-dish-2.webp"
    ],
    "colors": [
      "Pewter",
      "Bronze",
      "Cream"
    ],
    "sizes": [
      "50ml",
      "100ml"
    ],
    "stock": 50,
    "material": "Extrait de parfum",
    "rating": 4.3,
    "reviews": 353,
    "description": "A refined piece in eau de parfum, thoughtfully crafted for the modern individual. Available in Pewter, Bronze, Cream tones.",
    "tags": [
      "Fragrance",
      "Sale"
    ],
    "isNew": true,
    "isFeatured": false
  },
  {
    "id": "p130",
    "name": "Perfume Sprayer",
    "slug": "perfume-sprayer",
    "category": "fragrance",
    "price": 92,
    "originalPrice": null,
    "image": "/photos/products/perfume-sprayer-1.webp",
    "heroImage": "/photos/products/perfume-sprayer-1.webp",
    "images": [
      "/photos/products/perfume-sprayer-1.webp",
      "/photos/products/perfume-sprayer-2.webp"
    ],
    "colors": [
      "Camel",
      "Bronze",
      "Terracotta",
      "Copper"
    ],
    "sizes": [
      "50ml",
      "100ml"
    ],
    "stock": 73,
    "material": "Body mist",
    "rating": 4.1,
    "reviews": 295,
    "description": "A refined piece in eau de parfum, thoughtfully crafted for the modern individual. Available in Camel, Bronze, Terracotta, Copper tones.",
    "tags": [
      "Fragrance"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p131",
    "name": "Brush Set",
    "slug": "brush-set",
    "category": "fragrance",
    "price": 99,
    "originalPrice": 122,
    "image": "/photos/products/brush-set-1.webp",
    "heroImage": "/photos/products/brush-set-1.webp",
    "images": [
      "/photos/products/brush-set-1.webp",
      "/photos/products/brush-set-2.webp"
    ],
    "colors": [
      "Ebony",
      "Charcoal",
      "Cream"
    ],
    "sizes": [
      "50ml",
      "100ml"
    ],
    "stock": 42,
    "material": "Candle wax",
    "rating": 4.7,
    "reviews": 379,
    "description": "A refined piece in eau de parfum, thoughtfully crafted for the modern individual. Available in Ebony, Charcoal, Cream tones.",
    "tags": [
      "Fragrance",
      "Sale"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p132",
    "name": "Roller",
    "slug": "roller",
    "category": "fragrance",
    "price": 138,
    "originalPrice": null,
    "image": "/photos/products/roller-1.webp",
    "heroImage": "/photos/products/roller-1.webp",
    "images": [
      "/photos/products/roller-1.webp",
      "/photos/products/roller-2.webp"
    ],
    "colors": [
      "Bone",
      "Blush",
      "Camel",
      "Mauve"
    ],
    "sizes": [
      "50ml",
      "100ml"
    ],
    "stock": 27,
    "material": "Solid perfume",
    "rating": 4.4,
    "reviews": 309,
    "description": "A refined piece in eau de parfum, thoughtfully crafted for the modern individual. Available in Bone, Blush, Camel, Mauve tones.",
    "tags": [
      "Fragrance"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p133",
    "name": "Jade Gua Sha",
    "slug": "jade-gua-sha",
    "category": "fragrance",
    "price": 347,
    "originalPrice": null,
    "image": "/photos/products/jade-gua-sha-1.webp",
    "heroImage": "/photos/products/jade-gua-sha-1.webp",
    "images": [
      "/photos/products/jade-gua-sha-1.webp",
      "/photos/products/jade-gua-sha-2.webp"
    ],
    "colors": [
      "Stone",
      "Pewter"
    ],
    "sizes": [
      "50ml",
      "100ml"
    ],
    "stock": 7,
    "material": "Body mist",
    "rating": 5,
    "reviews": 377,
    "description": "A refined piece in eau de parfum, thoughtfully crafted for the modern individual. Available in Stone, Pewter tones.",
    "tags": [
      "Fragrance",
      "Limited"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p134",
    "name": "Mirror Bronze",
    "slug": "mirror-bronze",
    "category": "fragrance",
    "price": 197,
    "originalPrice": null,
    "image": "/photos/products/mirror-bronze-1.webp",
    "heroImage": "/photos/products/mirror-bronze-1.webp",
    "images": [
      "/photos/products/mirror-bronze-1.webp",
      "/photos/products/mirror-bronze-2.webp"
    ],
    "colors": [
      "Ivory",
      "Burgundy"
    ],
    "sizes": [
      "50ml",
      "100ml"
    ],
    "stock": 7,
    "material": "Candle wax",
    "rating": 3.7,
    "reviews": 471,
    "description": "A refined piece in eau de parfum, thoughtfully crafted for the modern individual. Available in Ivory, Burgundy tones.",
    "tags": [
      "Fragrance",
      "Limited"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p135",
    "name": "Comb Wood",
    "slug": "comb-wood",
    "category": "fragrance",
    "price": 285,
    "originalPrice": null,
    "image": "/photos/products/comb-wood-1.webp",
    "heroImage": "/photos/products/comb-wood-1.webp",
    "images": [
      "/photos/products/comb-wood-1.webp",
      "/photos/products/comb-wood-2.webp"
    ],
    "colors": [
      "Bone",
      "Camel",
      "Oatmeal"
    ],
    "sizes": [
      "50ml",
      "100ml"
    ],
    "stock": 16,
    "material": "Parfum oil",
    "rating": 4.8,
    "reviews": 249,
    "description": "A refined piece in eau de parfum, thoughtfully crafted for the modern individual. Available in Bone, Camel, Oatmeal tones.",
    "tags": [
      "Fragrance"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p136",
    "name": "Hair Dryer Hood",
    "slug": "hair-dryer-hood",
    "category": "fragrance",
    "price": 177,
    "originalPrice": 230,
    "image": "/photos/products/hair-dryer-hood-1.webp",
    "heroImage": "/photos/products/hair-dryer-hood-1.webp",
    "images": [
      "/photos/products/hair-dryer-hood-1.webp",
      "/photos/products/hair-dryer-hood-2.webp"
    ],
    "colors": [
      "Slate",
      "Burgundy",
      "Obsidian"
    ],
    "sizes": [
      "50ml",
      "100ml"
    ],
    "stock": 3,
    "material": "Reed diffuser oil",
    "rating": 4,
    "reviews": 496,
    "description": "A refined piece in eau de parfum, thoughtfully crafted for the modern individual. Available in Slate, Burgundy, Obsidian tones.",
    "tags": [
      "Fragrance",
      "Sale",
      "Limited"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p137",
    "name": "Steam Iron",
    "slug": "steam-iron",
    "category": "fragrance",
    "price": 74,
    "originalPrice": null,
    "image": "/photos/products/steam-iron-1.webp",
    "heroImage": "/photos/products/steam-iron-1.webp",
    "images": [
      "/photos/products/steam-iron-1.webp",
      "/photos/products/steam-iron-2.webp"
    ],
    "colors": [
      "Taupe",
      "Ebony",
      "Oatmeal"
    ],
    "sizes": [
      "50ml",
      "100ml"
    ],
    "stock": 1,
    "material": "Body mist",
    "rating": 3.6,
    "reviews": 401,
    "description": "A refined piece in eau de parfum, thoughtfully crafted for the modern individual. Available in Taupe, Ebony, Oatmeal tones.",
    "tags": [
      "Fragrance",
      "Limited"
    ],
    "isNew": true,
    "isFeatured": false
  },
  {
    "id": "p138",
    "name": "Laundry Basket",
    "slug": "laundry-basket",
    "category": "fragrance",
    "price": 244,
    "originalPrice": 313,
    "image": "/photos/products/laundry-basket-1.webp",
    "heroImage": "/photos/products/laundry-basket-1.webp",
    "images": [
      "/photos/products/laundry-basket-1.webp",
      "/photos/products/laundry-basket-2.webp"
    ],
    "colors": [
      "Rose",
      "Cream",
      "Bone"
    ],
    "sizes": [
      "50ml",
      "100ml"
    ],
    "stock": 6,
    "material": "Eau de parfum",
    "rating": 4.7,
    "reviews": 93,
    "description": "A refined piece in eau de parfum, thoughtfully crafted for the modern individual. Available in Rose, Cream, Bone tones.",
    "tags": [
      "Fragrance",
      "Sale",
      "Limited"
    ],
    "isNew": true,
    "isFeatured": false
  },
  {
    "id": "p139",
    "name": "Folded Robe",
    "slug": "folded-robe",
    "category": "fragrance",
    "price": 249,
    "originalPrice": null,
    "image": "/photos/products/folded-robe-1.webp",
    "heroImage": "/photos/products/folded-robe-1.webp",
    "images": [
      "/photos/products/folded-robe-1.webp",
      "/photos/products/folded-robe-2.webp"
    ],
    "colors": [
      "Ebony",
      "Moss",
      "Copper"
    ],
    "sizes": [
      "50ml",
      "100ml"
    ],
    "stock": 57,
    "material": "Eau de parfum",
    "rating": 3.6,
    "reviews": 350,
    "description": "A refined piece in eau de parfum, thoughtfully crafted for the modern individual. Available in Ebony, Moss, Copper tones.",
    "tags": [
      "Fragrance"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p140",
    "name": "Slipper",
    "slug": "slipper",
    "category": "fragrance",
    "price": 137,
    "originalPrice": null,
    "image": "/photos/products/slipper-1.webp",
    "heroImage": "/photos/products/slipper-1.webp",
    "images": [
      "/photos/products/slipper-1.webp",
      "/photos/products/slipper-2.webp"
    ],
    "colors": [
      "Black",
      "Sage",
      "Taupe"
    ],
    "sizes": [
      "50ml",
      "100ml"
    ],
    "stock": 45,
    "material": "Body mist",
    "rating": 4,
    "reviews": 427,
    "description": "A refined piece in eau de parfum, thoughtfully crafted for the modern individual. Available in Black, Sage, Taupe tones.",
    "tags": [
      "Fragrance"
    ],
    "isNew": false,
    "isFeatured": true
  },
  {
    "id": "p141",
    "name": "Clog",
    "slug": "clog",
    "category": "fragrance",
    "price": 355,
    "originalPrice": null,
    "image": "/photos/products/clog-1.webp",
    "heroImage": "/photos/products/clog-1.webp",
    "images": [
      "/photos/products/clog-1.webp",
      "/photos/products/clog-2.webp"
    ],
    "colors": [
      "Moss",
      "Copper"
    ],
    "sizes": [
      "50ml",
      "100ml"
    ],
    "stock": 26,
    "material": "Hair mist",
    "rating": 4.9,
    "reviews": 447,
    "description": "A refined piece in eau de parfum, thoughtfully crafted for the modern individual. Available in Moss, Copper tones.",
    "tags": [
      "Fragrance"
    ],
    "isNew": false,
    "isFeatured": true
  },
  {
    "id": "p142",
    "name": "Mule",
    "slug": "mule",
    "category": "fragrance",
    "price": 221,
    "originalPrice": 281,
    "image": "/photos/products/mule-1.webp",
    "heroImage": "/photos/products/mule-1.webp",
    "images": [
      "/photos/products/mule-1.webp",
      "/photos/products/mule-2.webp"
    ],
    "colors": [
      "Charcoal",
      "Rose",
      "Navy"
    ],
    "sizes": [
      "50ml",
      "100ml"
    ],
    "stock": 49,
    "material": "Candle wax",
    "rating": 4.6,
    "reviews": 331,
    "description": "A refined piece in eau de parfum, thoughtfully crafted for the modern individual. Available in Charcoal, Rose, Navy tones.",
    "tags": [
      "Fragrance",
      "Sale"
    ],
    "isNew": false,
    "isFeatured": true
  },
  {
    "id": "p143",
    "name": "Loafer",
    "slug": "loafer",
    "category": "fragrance",
    "price": 150,
    "originalPrice": null,
    "image": "/photos/products/loafer-1.webp",
    "heroImage": "/photos/products/loafer-1.webp",
    "images": [
      "/photos/products/loafer-1.webp",
      "/photos/products/loafer-2.webp"
    ],
    "colors": [
      "Blush",
      "Walnut",
      "Ebony",
      "Bronze"
    ],
    "sizes": [
      "50ml",
      "100ml"
    ],
    "stock": 16,
    "material": "Solid perfume",
    "rating": 4.2,
    "reviews": 202,
    "description": "A refined piece in eau de parfum, thoughtfully crafted for the modern individual. Available in Blush, Walnut, Ebony, Bronze tones.",
    "tags": [
      "Fragrance",
      "Featured"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p144",
    "name": "Oxford",
    "slug": "oxford",
    "category": "fragrance",
    "price": 262,
    "originalPrice": null,
    "image": "/photos/products/oxford-1.webp",
    "heroImage": "/photos/products/oxford-1.webp",
    "images": [
      "/photos/products/oxford-1.webp",
      "/photos/products/oxford-2.webp"
    ],
    "colors": [
      "Sand",
      "Moss",
      "Taupe"
    ],
    "sizes": [
      "50ml",
      "100ml"
    ],
    "stock": 79,
    "material": "Body mist",
    "rating": 4.8,
    "reviews": 44,
    "description": "A refined piece in eau de parfum, thoughtfully crafted for the modern individual. Available in Sand, Moss, Taupe tones.",
    "tags": [
      "Fragrance"
    ],
    "isNew": true,
    "isFeatured": false
  },
  {
    "id": "p145",
    "name": "Bib Shoe",
    "slug": "bib-shoe",
    "category": "fragrance",
    "price": 185,
    "originalPrice": null,
    "image": "/photos/products/bib-shoe-1.webp",
    "heroImage": "/photos/products/bib-shoe-1.webp",
    "images": [
      "/photos/products/bib-shoe-1.webp",
      "/photos/products/bib-shoe-2.webp"
    ],
    "colors": [
      "Champagne",
      "Forest",
      "Stone"
    ],
    "sizes": [
      "50ml",
      "100ml"
    ],
    "stock": 18,
    "material": "Room spray",
    "rating": 4.2,
    "reviews": 410,
    "description": "A refined piece in eau de parfum, thoughtfully crafted for the modern individual. Available in Champagne, Forest, Stone tones.",
    "tags": [
      "Fragrance"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p146",
    "name": "Mary Jane",
    "slug": "mary-jane",
    "category": "fragrance",
    "price": 352,
    "originalPrice": null,
    "image": "/photos/products/mary-jane-1.webp",
    "heroImage": "/photos/products/mary-jane-1.webp",
    "images": [
      "/photos/products/mary-jane-1.webp",
      "/photos/products/mary-jane-2.webp"
    ],
    "colors": [
      "Taupe",
      "Dusty-rose",
      "Charcoal"
    ],
    "sizes": [
      "50ml",
      "100ml"
    ],
    "stock": 4,
    "material": "Eau de parfum",
    "rating": 4.5,
    "reviews": 374,
    "description": "A refined piece in eau de parfum, thoughtfully crafted for the modern individual. Available in Taupe, Dusty-rose, Charcoal tones.",
    "tags": [
      "Fragrance",
      "Limited"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p147",
    "name": "Platform",
    "slug": "platform",
    "category": "fragrance",
    "price": 330,
    "originalPrice": 446,
    "image": "/photos/products/platform-1.webp",
    "heroImage": "/photos/products/platform-1.webp",
    "images": [
      "/photos/products/platform-1.webp",
      "/photos/products/platform-2.webp"
    ],
    "colors": [
      "Bone",
      "Black",
      "Obsidian"
    ],
    "sizes": [
      "50ml",
      "100ml"
    ],
    "stock": 49,
    "material": "Extrait de parfum",
    "rating": 4.5,
    "reviews": 451,
    "description": "A refined piece in eau de parfum, thoughtfully crafted for the modern individual. Available in Bone, Black, Obsidian tones.",
    "tags": [
      "Fragrance",
      "Sale"
    ],
    "isNew": false,
    "isFeatured": true
  },
  {
    "id": "p148",
    "name": "Wedge",
    "slug": "wedge",
    "category": "fragrance",
    "price": 286,
    "originalPrice": null,
    "image": "/photos/products/wedge-1.webp",
    "heroImage": "/photos/products/wedge-1.webp",
    "images": [
      "/photos/products/wedge-1.webp",
      "/photos/products/wedge-2.webp"
    ],
    "colors": [
      "Blush",
      "Sand",
      "Ivory",
      "Mauve"
    ],
    "sizes": [
      "50ml",
      "100ml"
    ],
    "stock": 6,
    "material": "Eau de parfum",
    "rating": 4.5,
    "reviews": 352,
    "description": "A refined piece in eau de parfum, thoughtfully crafted for the modern individual. Available in Blush, Sand, Ivory, Mauve tones.",
    "tags": [
      "Fragrance",
      "Limited"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p149",
    "name": "Stiletto",
    "slug": "stiletto",
    "category": "fragrance",
    "price": 143,
    "originalPrice": null,
    "image": "/photos/products/stiletto-1.webp",
    "heroImage": "/photos/products/stiletto-1.webp",
    "images": [
      "/photos/products/stiletto-1.webp",
      "/photos/products/stiletto-2.webp"
    ],
    "colors": [
      "Copper",
      "Ebony",
      "Black"
    ],
    "sizes": [
      "50ml",
      "100ml"
    ],
    "stock": 22,
    "material": "Reed diffuser oil",
    "rating": 4.6,
    "reviews": 221,
    "description": "A refined piece in eau de parfum, thoughtfully crafted for the modern individual. Available in Copper, Ebony, Black tones.",
    "tags": [
      "Fragrance"
    ],
    "isNew": false,
    "isFeatured": true
  },
  {
    "id": "p150",
    "name": "Kitten Heel",
    "slug": "kitten-heel",
    "category": "fragrance",
    "price": 273,
    "originalPrice": null,
    "image": "/photos/products/kitten-heel-1.webp",
    "heroImage": "/photos/products/kitten-heel-1.webp",
    "images": [
      "/photos/products/kitten-heel-1.webp",
      "/photos/products/kitten-heel-2.webp"
    ],
    "colors": [
      "Moss",
      "Ebony",
      "Obsidian"
    ],
    "sizes": [
      "50ml",
      "100ml"
    ],
    "stock": 7,
    "material": "Hair mist",
    "rating": 4.6,
    "reviews": 164,
    "description": "A refined piece in eau de parfum, thoughtfully crafted for the modern individual. Available in Moss, Ebony, Obsidian tones.",
    "tags": [
      "Fragrance",
      "Limited"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p151",
    "name": "Block Heel",
    "slug": "block-heel",
    "category": "fragrance",
    "price": 362,
    "originalPrice": null,
    "image": "/photos/products/block-heel-1.webp",
    "heroImage": "/photos/products/block-heel-1.webp",
    "images": [
      "/photos/products/block-heel-1.webp",
      "/photos/products/block-heel-2.webp"
    ],
    "colors": [
      "Black",
      "Stone",
      "Forest"
    ],
    "sizes": [
      "50ml",
      "100ml"
    ],
    "stock": 21,
    "material": "Eau de parfum",
    "rating": 4.3,
    "reviews": 64,
    "description": "A refined piece in eau de parfum, thoughtfully crafted for the modern individual. Available in Black, Stone, Forest tones.",
    "tags": [
      "Fragrance"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p152",
    "name": "Flat Sandal",
    "slug": "flat-sandal",
    "category": "fragrance",
    "price": 210,
    "originalPrice": null,
    "image": "/photos/products/flat-sandal-1.webp",
    "heroImage": "/photos/products/flat-sandal-1.webp",
    "images": [
      "/photos/products/flat-sandal-1.webp",
      "/photos/products/flat-sandal-2.webp"
    ],
    "colors": [
      "Sage",
      "Ivory"
    ],
    "sizes": [
      "50ml",
      "100ml"
    ],
    "stock": 13,
    "material": "Eau de parfum",
    "rating": 4.1,
    "reviews": 171,
    "description": "A refined piece in eau de parfum, thoughtfully crafted for the modern individual. Available in Sage, Ivory tones.",
    "tags": [
      "Fragrance"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p153",
    "name": "Slide",
    "slug": "slide",
    "category": "fragrance",
    "price": 165,
    "originalPrice": null,
    "image": "/photos/products/slide-1.webp",
    "heroImage": "/photos/products/slide-1.webp",
    "images": [
      "/photos/products/slide-1.webp",
      "/photos/products/slide-2.webp"
    ],
    "colors": [
      "Taupe",
      "Cream",
      "Forest",
      "Dusty-rose"
    ],
    "sizes": [
      "50ml",
      "100ml"
    ],
    "stock": 61,
    "material": "Solid perfume",
    "rating": 4.4,
    "reviews": 310,
    "description": "A refined piece in eau de parfum, thoughtfully crafted for the modern individual. Available in Taupe, Cream, Forest, Dusty-rose tones.",
    "tags": [
      "Fragrance"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p154",
    "name": "Gladiator",
    "slug": "gladiator",
    "category": "fragrance",
    "price": 395,
    "originalPrice": null,
    "image": "/photos/products/gladiator-1.webp",
    "heroImage": "/photos/products/gladiator-1.webp",
    "images": [
      "/photos/products/gladiator-1.webp",
      "/photos/products/gladiator-2.webp"
    ],
    "colors": [
      "Black",
      "Ivory",
      "Camel"
    ],
    "sizes": [
      "50ml",
      "100ml"
    ],
    "stock": 17,
    "material": "Extrait de parfum",
    "rating": 4,
    "reviews": 347,
    "description": "A refined piece in eau de parfum, thoughtfully crafted for the modern individual. Available in Black, Ivory, Camel tones.",
    "tags": [
      "Fragrance"
    ],
    "isNew": false,
    "isFeatured": false
  },
  {
    "id": "p155",
    "name": "Espadrille",
    "slug": "espadrille",
    "category": "fragrance",
    "price": 154,
    "originalPrice": null,
    "image": "/photos/products/espadrille-1.webp",
    "heroImage": "/photos/products/espadrille-1.webp",
    "images": [
      "/photos/products/espadrille-1.webp",
      "/photos/products/espadrille-2.webp"
    ],
    "colors": [
      "Bronze",
      "Mauve"
    ],
    "sizes": [
      "50ml",
      "100ml"
    ],
    "stock": 41,
    "material": "Eau de toilette",
    "rating": 4.4,
    "reviews": 149,
    "description": "A refined piece in eau de parfum, thoughtfully crafted for the modern individual. Available in Bronze, Mauve tones.",
    "tags": [
      "Fragrance"
    ],
    "isNew": false,
    "isFeatured": false
  }
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id || p.slug === id);
}

export function discountPercent(product: Product): number {
  if (!product.originalPrice) return 0;
  return Math.round((1 - product.price / product.originalPrice) * 100);
}
