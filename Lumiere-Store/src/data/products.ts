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
    "image": "/photos/products/abdullah-raafat--rnMlsKuh3I-unsplash.jpg",
    "heroImage": "/photos/products/abdullah-raafat--rnMlsKuh3I-unsplash.jpg",
    "images": [
      "/photos/products/abdullah-raafat--rnMlsKuh3I-unsplash.jpg"
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
    "image": "/photos/products/adam-kenton-E-HdFoOyyX0-unsplash.jpg",
    "heroImage": "/photos/products/adam-kenton-E-HdFoOyyX0-unsplash.jpg",
    "images": [
      "/photos/products/adam-kenton-E-HdFoOyyX0-unsplash.jpg"
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
    "image": "/photos/products/admin.jpeg",
    "heroImage": "/photos/products/admin.jpeg",
    "images": [
      "/photos/products/admin.jpeg"
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
    "image": "/photos/products/aleksandrs-karevs-4fz3fM8Pbnw-unsplash.jpg",
    "heroImage": "/photos/products/aleksandrs-karevs-4fz3fM8Pbnw-unsplash.jpg",
    "images": [
      "/photos/products/aleksandrs-karevs-4fz3fM8Pbnw-unsplash.jpg"
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
    "image": "/photos/products/aleksandrs-karevs-riaw3M3l0mI-unsplash.jpg",
    "heroImage": "/photos/products/aleksandrs-karevs-riaw3M3l0mI-unsplash.jpg",
    "images": [
      "/photos/products/aleksandrs-karevs-riaw3M3l0mI-unsplash.jpg"
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
    "image": "/photos/products/aleksandrs-karevs-zv2-u_4ceRQ-unsplash.jpg",
    "heroImage": "/photos/products/aleksandrs-karevs-zv2-u_4ceRQ-unsplash.jpg",
    "images": [
      "/photos/products/aleksandrs-karevs-zv2-u_4ceRQ-unsplash.jpg"
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
    "image": "/photos/products/alex-tyson-OHO0IgoB72o-unsplash.jpg",
    "heroImage": "/photos/products/alex-tyson-OHO0IgoB72o-unsplash.jpg",
    "images": [
      "/photos/products/alex-tyson-OHO0IgoB72o-unsplash.jpg"
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
    "image": "/photos/products/alexandar-todov-6vtsGipAadE-unsplash.jpg",
    "heroImage": "/photos/products/alexandar-todov-6vtsGipAadE-unsplash.jpg",
    "images": [
      "/photos/products/alexandar-todov-6vtsGipAadE-unsplash.jpg"
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
    "image": "/photos/products/ali-bakhtiari-7ic3yF64FS8-unsplash.jpg",
    "heroImage": "/photos/products/ali-bakhtiari-7ic3yF64FS8-unsplash.jpg",
    "images": [
      "/photos/products/ali-bakhtiari-7ic3yF64FS8-unsplash.jpg"
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
    "image": "/photos/products/aman-chaturvedi-AAkjysvbDYM-unsplash.jpg",
    "heroImage": "/photos/products/aman-chaturvedi-AAkjysvbDYM-unsplash.jpg",
    "images": [
      "/photos/products/aman-chaturvedi-AAkjysvbDYM-unsplash.jpg"
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
    "image": "/photos/products/amr-taha-z4CsM71d7Co-unsplash.jpg",
    "heroImage": "/photos/products/amr-taha-z4CsM71d7Co-unsplash.jpg",
    "images": [
      "/photos/products/amr-taha-z4CsM71d7Co-unsplash.jpg"
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
    "image": "/photos/products/andrey-zvyagintsev-x0c6vTO5ibA-unsplash.jpg",
    "heroImage": "/photos/products/andrey-zvyagintsev-x0c6vTO5ibA-unsplash.jpg",
    "images": [
      "/photos/products/andrey-zvyagintsev-x0c6vTO5ibA-unsplash.jpg"
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
    "image": "/photos/products/andrijana-bozic-xBSrwygHrzg-unsplash.jpg",
    "heroImage": "/photos/products/andrijana-bozic-xBSrwygHrzg-unsplash.jpg",
    "images": [
      "/photos/products/andrijana-bozic-xBSrwygHrzg-unsplash.jpg"
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
    "image": "/photos/products/arno-senoner-q1WqpjAyG9k-unsplash.jpg",
    "heroImage": "/photos/products/arno-senoner-q1WqpjAyG9k-unsplash.jpg",
    "images": [
      "/photos/products/arno-senoner-q1WqpjAyG9k-unsplash.jpg"
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
    "image": "/photos/products/artem-ivanchencko-I-4bg_c7N24-unsplash.jpg",
    "heroImage": "/photos/products/artem-ivanchencko-I-4bg_c7N24-unsplash.jpg",
    "images": [
      "/photos/products/artem-ivanchencko-I-4bg_c7N24-unsplash.jpg"
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
    "image": "/photos/products/behrooz-9_dIcLd3_P8-unsplash.jpg",
    "heroImage": "/photos/products/behrooz-9_dIcLd3_P8-unsplash.jpg",
    "images": [
      "/photos/products/behrooz-9_dIcLd3_P8-unsplash.jpg"
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
    "image": "/photos/products/behrooz-MMBBQ2p1Dsk-unsplash.jpg",
    "heroImage": "/photos/products/behrooz-MMBBQ2p1Dsk-unsplash.jpg",
    "images": [
      "/photos/products/behrooz-MMBBQ2p1Dsk-unsplash.jpg"
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
    "image": "/photos/products/bozhin-karaivanov-6yU7_W7-D0w-unsplash.jpg",
    "heroImage": "/photos/products/bozhin-karaivanov-6yU7_W7-D0w-unsplash.jpg",
    "images": [
      "/photos/products/bozhin-karaivanov-6yU7_W7-D0w-unsplash.jpg"
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
    "image": "/photos/products/brian-lawson-4A5ItQSnbNY-unsplash.jpg",
    "heroImage": "/photos/products/brian-lawson-4A5ItQSnbNY-unsplash.jpg",
    "images": [
      "/photos/products/brian-lawson-4A5ItQSnbNY-unsplash.jpg"
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
    "image": "/photos/products/brian-lawson-6qvCcNrNjcM-unsplash.jpg",
    "heroImage": "/photos/products/brian-lawson-6qvCcNrNjcM-unsplash.jpg",
    "images": [
      "/photos/products/brian-lawson-6qvCcNrNjcM-unsplash.jpg"
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
    "image": "/photos/products/brian-lawson-9vzfoIpHTbs-unsplash.jpg",
    "heroImage": "/photos/products/brian-lawson-9vzfoIpHTbs-unsplash.jpg",
    "images": [
      "/photos/products/brian-lawson-9vzfoIpHTbs-unsplash.jpg"
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
    "image": "/photos/products/brian-lawson-AXH6s4M8qVQ-unsplash.jpg",
    "heroImage": "/photos/products/brian-lawson-AXH6s4M8qVQ-unsplash.jpg",
    "images": [
      "/photos/products/brian-lawson-AXH6s4M8qVQ-unsplash.jpg"
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
    "image": "/photos/products/brian-lawson-AldAsYrniYg-unsplash.jpg",
    "heroImage": "/photos/products/brian-lawson-AldAsYrniYg-unsplash.jpg",
    "images": [
      "/photos/products/brian-lawson-AldAsYrniYg-unsplash.jpg"
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
    "image": "/photos/products/brian-lawson-C4NZk9-VP84-unsplash.jpg",
    "heroImage": "/photos/products/brian-lawson-C4NZk9-VP84-unsplash.jpg",
    "images": [
      "/photos/products/brian-lawson-C4NZk9-VP84-unsplash.jpg"
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
    "image": "/photos/products/brian-lawson-FbKHGSQxOdE-unsplash.jpg",
    "heroImage": "/photos/products/brian-lawson-FbKHGSQxOdE-unsplash.jpg",
    "images": [
      "/photos/products/brian-lawson-FbKHGSQxOdE-unsplash.jpg"
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
    "image": "/photos/products/brian-lawson-REW0pkn4nx0-unsplash.jpg",
    "heroImage": "/photos/products/brian-lawson-REW0pkn4nx0-unsplash.jpg",
    "images": [
      "/photos/products/brian-lawson-REW0pkn4nx0-unsplash.jpg"
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
    "image": "/photos/products/brian-lawson-_XKzo-Du-3w-unsplash.jpg",
    "heroImage": "/photos/products/brian-lawson-_XKzo-Du-3w-unsplash.jpg",
    "images": [
      "/photos/products/brian-lawson-_XKzo-Du-3w-unsplash.jpg"
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
    "image": "/photos/products/brian-lawson-a-mtphgCGo8-unsplash.jpg",
    "heroImage": "/photos/products/brian-lawson-a-mtphgCGo8-unsplash.jpg",
    "images": [
      "/photos/products/brian-lawson-a-mtphgCGo8-unsplash.jpg"
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
    "image": "/photos/products/brian-lawson-fPGYVaUuAHI-unsplash.jpg",
    "heroImage": "/photos/products/brian-lawson-fPGYVaUuAHI-unsplash.jpg",
    "images": [
      "/photos/products/brian-lawson-fPGYVaUuAHI-unsplash.jpg"
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
    "image": "/photos/products/brian-lawson-gy-cxc0D0fQ-unsplash.jpg",
    "heroImage": "/photos/products/brian-lawson-gy-cxc0D0fQ-unsplash.jpg",
    "images": [
      "/photos/products/brian-lawson-gy-cxc0D0fQ-unsplash.jpg"
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
    "image": "/photos/products/brian-lawson-hSl4cWp27FA-unsplash.jpg",
    "heroImage": "/photos/products/brian-lawson-hSl4cWp27FA-unsplash.jpg",
    "images": [
      "/photos/products/brian-lawson-hSl4cWp27FA-unsplash.jpg"
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
    "image": "/photos/products/brian-lawson-hpmHV56fpEY-unsplash.jpg",
    "heroImage": "/photos/products/brian-lawson-hpmHV56fpEY-unsplash.jpg",
    "images": [
      "/photos/products/brian-lawson-hpmHV56fpEY-unsplash.jpg"
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
    "image": "/photos/products/brian-lawson-ov150m0K7Ag-unsplash.jpg",
    "heroImage": "/photos/products/brian-lawson-ov150m0K7Ag-unsplash.jpg",
    "images": [
      "/photos/products/brian-lawson-ov150m0K7Ag-unsplash.jpg"
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
    "image": "/photos/products/brian-lawson-t9DENSNdzPg-unsplash.jpg",
    "heroImage": "/photos/products/brian-lawson-t9DENSNdzPg-unsplash.jpg",
    "images": [
      "/photos/products/brian-lawson-t9DENSNdzPg-unsplash.jpg"
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
    "image": "/photos/products/brian-lawson-tdC8x_ank-Q-unsplash.jpg",
    "heroImage": "/photos/products/brian-lawson-tdC8x_ank-Q-unsplash.jpg",
    "images": [
      "/photos/products/brian-lawson-tdC8x_ank-Q-unsplash.jpg"
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
    "image": "/photos/products/brian-lawson-vdYzT-wo3NA-unsplash.jpg",
    "heroImage": "/photos/products/brian-lawson-vdYzT-wo3NA-unsplash.jpg",
    "images": [
      "/photos/products/brian-lawson-vdYzT-wo3NA-unsplash.jpg"
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
    "image": "/photos/products/caroline-badran-aDtv0uDomA0-unsplash.jpg",
    "heroImage": "/photos/products/caroline-badran-aDtv0uDomA0-unsplash.jpg",
    "images": [
      "/photos/products/caroline-badran-aDtv0uDomA0-unsplash.jpg"
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
    "image": "/photos/products/crystalweed-cannabis-j-CRNIwEGfk-unsplash.jpg",
    "heroImage": "/photos/products/crystalweed-cannabis-j-CRNIwEGfk-unsplash.jpg",
    "images": [
      "/photos/products/crystalweed-cannabis-j-CRNIwEGfk-unsplash.jpg"
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
    "image": "/photos/products/daniel-romero-VitXrx5ajeQ-unsplash.jpg",
    "heroImage": "/photos/products/daniel-romero-VitXrx5ajeQ-unsplash.jpg",
    "images": [
      "/photos/products/daniel-romero-VitXrx5ajeQ-unsplash.jpg"
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
    "image": "/photos/products/devin-santiago-ij6JGuYzCd4-unsplash.jpg",
    "heroImage": "/photos/products/devin-santiago-ij6JGuYzCd4-unsplash.jpg",
    "images": [
      "/photos/products/devin-santiago-ij6JGuYzCd4-unsplash.jpg"
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
    "image": "/photos/products/dmitry-ganin-8O4hI7XW8Z4-unsplash.jpg",
    "heroImage": "/photos/products/dmitry-ganin-8O4hI7XW8Z4-unsplash.jpg",
    "images": [
      "/photos/products/dmitry-ganin-8O4hI7XW8Z4-unsplash.jpg"
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
    "image": "/photos/products/ela-de-pure-32Js0PTnf9I-unsplash.jpg",
    "heroImage": "/photos/products/ela-de-pure-32Js0PTnf9I-unsplash.jpg",
    "images": [
      "/photos/products/ela-de-pure-32Js0PTnf9I-unsplash.jpg"
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
    "image": "/photos/products/ela-de-pure-4uDa0AHvszI-unsplash.jpg",
    "heroImage": "/photos/products/ela-de-pure-4uDa0AHvszI-unsplash.jpg",
    "images": [
      "/photos/products/ela-de-pure-4uDa0AHvszI-unsplash.jpg"
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
    "image": "/photos/products/ela-de-pure-4yvJ5uVPPYc-unsplash.jpg",
    "heroImage": "/photos/products/ela-de-pure-4yvJ5uVPPYc-unsplash.jpg",
    "images": [
      "/photos/products/ela-de-pure-4yvJ5uVPPYc-unsplash.jpg"
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
    "image": "/photos/products/ela-de-pure-nzisN6dYiV8-unsplash.jpg",
    "heroImage": "/photos/products/ela-de-pure-nzisN6dYiV8-unsplash.jpg",
    "images": [
      "/photos/products/ela-de-pure-nzisN6dYiV8-unsplash.jpg"
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
    "image": "/photos/products/ela-de-pure-wuBiNO345DE-unsplash.jpg",
    "heroImage": "/photos/products/ela-de-pure-wuBiNO345DE-unsplash.jpg",
    "images": [
      "/photos/products/ela-de-pure-wuBiNO345DE-unsplash.jpg"
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
    "image": "/photos/products/fabio-alves-eAUE_FmclYE-unsplash.jpg",
    "heroImage": "/photos/products/fabio-alves-eAUE_FmclYE-unsplash.jpg",
    "images": [
      "/photos/products/fabio-alves-eAUE_FmclYE-unsplash.jpg"
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
    "image": "/photos/products/faith-yarn-Wr0TpKqf26s-unsplash.jpg",
    "heroImage": "/photos/products/faith-yarn-Wr0TpKqf26s-unsplash.jpg",
    "images": [
      "/photos/products/faith-yarn-Wr0TpKqf26s-unsplash.jpg"
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
    "image": "/photos/products/faizur-rehman-iwd_99qV7Uk-unsplash.jpg",
    "heroImage": "/photos/products/faizur-rehman-iwd_99qV7Uk-unsplash.jpg",
    "images": [
      "/photos/products/faizur-rehman-iwd_99qV7Uk-unsplash.jpg"
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
    "image": "/photos/products/farkas-mario-qLrJZdOZFag-unsplash.jpg",
    "heroImage": "/photos/products/farkas-mario-qLrJZdOZFag-unsplash.jpg",
    "images": [
      "/photos/products/farkas-mario-qLrJZdOZFag-unsplash.jpg"
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
    "image": "/photos/products/feey-H_vUPQtokFI-unsplash.jpg",
    "heroImage": "/photos/products/feey-H_vUPQtokFI-unsplash.jpg",
    "images": [
      "/photos/products/feey-H_vUPQtokFI-unsplash.jpg"
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
    "image": "/photos/products/filip-baotic-Vq511boXLUk-unsplash.jpg",
    "heroImage": "/photos/products/filip-baotic-Vq511boXLUk-unsplash.jpg",
    "images": [
      "/photos/products/filip-baotic-Vq511boXLUk-unsplash.jpg"
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
    "image": "/photos/products/heidi-walley-m6sh2vS0Yjk-unsplash.jpg",
    "heroImage": "/photos/products/heidi-walley-m6sh2vS0Yjk-unsplash.jpg",
    "images": [
      "/photos/products/heidi-walley-m6sh2vS0Yjk-unsplash.jpg"
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
    "image": "/photos/products/hydra-4x-X4Ya3-wg2OU-unsplash.jpg",
    "heroImage": "/photos/products/hydra-4x-X4Ya3-wg2OU-unsplash.jpg",
    "images": [
      "/photos/products/hydra-4x-X4Ya3-wg2OU-unsplash.jpg"
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
    "image": "/photos/products/i-m-zion-YZHHrVhyc9I-unsplash.jpg",
    "heroImage": "/photos/products/i-m-zion-YZHHrVhyc9I-unsplash.jpg",
    "images": [
      "/photos/products/i-m-zion-YZHHrVhyc9I-unsplash.jpg"
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
    "image": "/photos/products/i-m-zion-vYxnwamt6HE-unsplash.jpg",
    "heroImage": "/photos/products/i-m-zion-vYxnwamt6HE-unsplash.jpg",
    "images": [
      "/photos/products/i-m-zion-vYxnwamt6HE-unsplash.jpg"
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
    "image": "/photos/products/imana-l_5sO5-7wGY-unsplash.jpg",
    "heroImage": "/photos/products/imana-l_5sO5-7wGY-unsplash.jpg",
    "images": [
      "/photos/products/imana-l_5sO5-7wGY-unsplash.jpg"
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
    "image": "/photos/products/imana-zHI1eay3Myo-unsplash.jpg",
    "heroImage": "/photos/products/imana-zHI1eay3Myo-unsplash.jpg",
    "images": [
      "/photos/products/imana-zHI1eay3Myo-unsplash.jpg"
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
    "image": "/photos/products/improve-in-design.jpeg",
    "heroImage": "/photos/products/improve-in-design.jpeg",
    "images": [
      "/photos/products/improve-in-design.jpeg"
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
    "image": "/photos/products/iuliia-pilipeichenko-mS_QzcElEAo-unsplash.jpg",
    "heroImage": "/photos/products/iuliia-pilipeichenko-mS_QzcElEAo-unsplash.jpg",
    "images": [
      "/photos/products/iuliia-pilipeichenko-mS_QzcElEAo-unsplash.jpg"
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
    "image": "/photos/products/jan-kopriva-nBwdYS1_rgA-unsplash.jpg",
    "heroImage": "/photos/products/jan-kopriva-nBwdYS1_rgA-unsplash.jpg",
    "images": [
      "/photos/products/jan-kopriva-nBwdYS1_rgA-unsplash.jpg"
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
    "image": "/photos/products/jean-philippe-delberghe-3EC_3r8-yME-unsplash.jpg",
    "heroImage": "/photos/products/jean-philippe-delberghe-3EC_3r8-yME-unsplash.jpg",
    "images": [
      "/photos/products/jean-philippe-delberghe-3EC_3r8-yME-unsplash.jpg"
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
    "image": "/photos/products/jimmy-fermin-bqe0J0b26RQ-unsplash.jpg",
    "heroImage": "/photos/products/jimmy-fermin-bqe0J0b26RQ-unsplash.jpg",
    "images": [
      "/photos/products/jimmy-fermin-bqe0J0b26RQ-unsplash.jpg"
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
    "image": "/photos/products/julia-RuCVvjuyNeQ-unsplash.jpg",
    "heroImage": "/photos/products/julia-RuCVvjuyNeQ-unsplash.jpg",
    "images": [
      "/photos/products/julia-RuCVvjuyNeQ-unsplash.jpg"
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
    "image": "/photos/products/kam-idris-_HqHX3LBN18-unsplash.jpg",
    "heroImage": "/photos/products/kam-idris-_HqHX3LBN18-unsplash.jpg",
    "images": [
      "/photos/products/kam-idris-_HqHX3LBN18-unsplash.jpg"
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
    "image": "/photos/products/karlis-zalans-HSADHC_QboY-unsplash.jpg",
    "heroImage": "/photos/products/karlis-zalans-HSADHC_QboY-unsplash.jpg",
    "images": [
      "/photos/products/karlis-zalans-HSADHC_QboY-unsplash.jpg"
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
    "image": "/photos/products/karly-jones-4i9ef6xU738-unsplash.jpg",
    "heroImage": "/photos/products/karly-jones-4i9ef6xU738-unsplash.jpg",
    "images": [
      "/photos/products/karly-jones-4i9ef6xU738-unsplash.jpg"
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
    "image": "/photos/products/katie-puzatova-xtSZ7I6vU1Q-unsplash.jpg",
    "heroImage": "/photos/products/katie-puzatova-xtSZ7I6vU1Q-unsplash.jpg",
    "images": [
      "/photos/products/katie-puzatova-xtSZ7I6vU1Q-unsplash.jpg"
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
    "image": "/photos/products/kelvin-lutan-5f4yovjJw4c-unsplash.jpg",
    "heroImage": "/photos/products/kelvin-lutan-5f4yovjJw4c-unsplash.jpg",
    "images": [
      "/photos/products/kelvin-lutan-5f4yovjJw4c-unsplash.jpg"
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
    "image": "/photos/products/kimson-doan-HD8KlyWRYYM-unsplash.jpg",
    "heroImage": "/photos/products/kimson-doan-HD8KlyWRYYM-unsplash.jpg",
    "images": [
      "/photos/products/kimson-doan-HD8KlyWRYYM-unsplash.jpg"
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
    "image": "/photos/products/kirill-balobanov-2rIs8OH5ng0-unsplash.jpg",
    "heroImage": "/photos/products/kirill-balobanov-2rIs8OH5ng0-unsplash.jpg",
    "images": [
      "/photos/products/kirill-balobanov-2rIs8OH5ng0-unsplash.jpg"
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
    "image": "/photos/products/laura-chouette-3yZzalP1bqA-unsplash.jpg",
    "heroImage": "/photos/products/laura-chouette-3yZzalP1bqA-unsplash.jpg",
    "images": [
      "/photos/products/laura-chouette-3yZzalP1bqA-unsplash.jpg"
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
    "image": "/photos/products/laura-chouette-4sKdeIMiFEI-unsplash.jpg",
    "heroImage": "/photos/products/laura-chouette-4sKdeIMiFEI-unsplash.jpg",
    "images": [
      "/photos/products/laura-chouette-4sKdeIMiFEI-unsplash.jpg"
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
    "image": "/photos/products/laura-chouette-9THwaaH18rI-unsplash.jpg",
    "heroImage": "/photos/products/laura-chouette-9THwaaH18rI-unsplash.jpg",
    "images": [
      "/photos/products/laura-chouette-9THwaaH18rI-unsplash.jpg"
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
    "image": "/photos/products/laura-chouette-EO_5gG5f48I-unsplash.jpg",
    "heroImage": "/photos/products/laura-chouette-EO_5gG5f48I-unsplash.jpg",
    "images": [
      "/photos/products/laura-chouette-EO_5gG5f48I-unsplash.jpg"
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
    "image": "/photos/products/laura-chouette-HD_KAQYngsA-unsplash.jpg",
    "heroImage": "/photos/products/laura-chouette-HD_KAQYngsA-unsplash.jpg",
    "images": [
      "/photos/products/laura-chouette-HD_KAQYngsA-unsplash.jpg"
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
    "image": "/photos/products/laura-chouette-XiU-KOy3bys-unsplash.jpg",
    "heroImage": "/photos/products/laura-chouette-XiU-KOy3bys-unsplash.jpg",
    "images": [
      "/photos/products/laura-chouette-XiU-KOy3bys-unsplash.jpg"
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
    "image": "/photos/products/laura-chouette-eBndU5LEr7w-unsplash.jpg",
    "heroImage": "/photos/products/laura-chouette-eBndU5LEr7w-unsplash.jpg",
    "images": [
      "/photos/products/laura-chouette-eBndU5LEr7w-unsplash.jpg"
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
    "image": "/photos/products/leiada-krozjhen-2x5F8pD7T5Q-unsplash.jpg",
    "heroImage": "/photos/products/leiada-krozjhen-2x5F8pD7T5Q-unsplash.jpg",
    "images": [
      "/photos/products/leiada-krozjhen-2x5F8pD7T5Q-unsplash.jpg"
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
    "image": "/photos/products/lhon-karwan-jZ3f2TKsgw8-unsplash.jpg",
    "heroImage": "/photos/products/lhon-karwan-jZ3f2TKsgw8-unsplash.jpg",
    "images": [
      "/photos/products/lhon-karwan-jZ3f2TKsgw8-unsplash.jpg"
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
    "image": "/photos/products/liza_rudyuk-2ri8elAF1js-unsplash.jpg",
    "heroImage": "/photos/products/liza_rudyuk-2ri8elAF1js-unsplash.jpg",
    "images": [
      "/photos/products/liza_rudyuk-2ri8elAF1js-unsplash.jpg"
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
    "image": "/photos/products/luke-jones-veLNJubUuxo-unsplash.jpg",
    "heroImage": "/photos/products/luke-jones-veLNJubUuxo-unsplash.jpg",
    "images": [
      "/photos/products/luke-jones-veLNJubUuxo-unsplash.jpg"
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
    "image": "/photos/products/maeliss-demaison-Iscfwx2b4FA-unsplash.jpg",
    "heroImage": "/photos/products/maeliss-demaison-Iscfwx2b4FA-unsplash.jpg",
    "images": [
      "/photos/products/maeliss-demaison-Iscfwx2b4FA-unsplash.jpg"
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
    "image": "/photos/products/malvestida-u79wy47kvVs-unsplash.jpg",
    "heroImage": "/photos/products/malvestida-u79wy47kvVs-unsplash.jpg",
    "images": [
      "/photos/products/malvestida-u79wy47kvVs-unsplash.jpg"
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
    "image": "/photos/products/marissa-grootes-D4jRahaUaIc-unsplash.jpg",
    "heroImage": "/photos/products/marissa-grootes-D4jRahaUaIc-unsplash.jpg",
    "images": [
      "/photos/products/marissa-grootes-D4jRahaUaIc-unsplash.jpg"
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
    "image": "/photos/products/mathias-reding-7uyrjHHyWWM-unsplash.jpg",
    "heroImage": "/photos/products/mathias-reding-7uyrjHHyWWM-unsplash.jpg",
    "images": [
      "/photos/products/mathias-reding-7uyrjHHyWWM-unsplash.jpg"
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
    "image": "/photos/products/md-salman-tWOz2_EK5EQ-unsplash.jpg",
    "heroImage": "/photos/products/md-salman-tWOz2_EK5EQ-unsplash.jpg",
    "images": [
      "/photos/products/md-salman-tWOz2_EK5EQ-unsplash.jpg"
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
    "image": "/photos/products/michael-dam-mEZ3PoFGs_k-unsplash.jpg",
    "heroImage": "/photos/products/michael-dam-mEZ3PoFGs_k-unsplash.jpg",
    "images": [
      "/photos/products/michael-dam-mEZ3PoFGs_k-unsplash.jpg"
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
    "image": "/photos/products/minh-pham-OtXADkUh3-I-unsplash.jpg",
    "heroImage": "/photos/products/minh-pham-OtXADkUh3-I-unsplash.jpg",
    "images": [
      "/photos/products/minh-pham-OtXADkUh3-I-unsplash.jpg"
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
    "image": "/photos/products/minh-pham-YAPZt8wxMO4-unsplash.jpg",
    "heroImage": "/photos/products/minh-pham-YAPZt8wxMO4-unsplash.jpg",
    "images": [
      "/photos/products/minh-pham-YAPZt8wxMO4-unsplash.jpg"
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
    "image": "/photos/products/mohamadreza-khashay-6BS2lgJ5EX8-unsplash.jpg",
    "heroImage": "/photos/products/mohamadreza-khashay-6BS2lgJ5EX8-unsplash.jpg",
    "images": [
      "/photos/products/mohamadreza-khashay-6BS2lgJ5EX8-unsplash.jpg"
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
    "image": "/photos/products/mohammad-hossein-mirzagol-vrAhDgjOD6c-unsplash.jpg",
    "heroImage": "/photos/products/mohammad-hossein-mirzagol-vrAhDgjOD6c-unsplash.jpg",
    "images": [
      "/photos/products/mohammad-hossein-mirzagol-vrAhDgjOD6c-unsplash.jpg"
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
    "image": "/photos/products/mohammadreza-babaei-OvgnTfieQq4-unsplash.jpg",
    "heroImage": "/photos/products/mohammadreza-babaei-OvgnTfieQq4-unsplash.jpg",
    "images": [
      "/photos/products/mohammadreza-babaei-OvgnTfieQq4-unsplash.jpg"
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
    "image": "/photos/products/muhammad-abdullah-zaeBgN8OTsg-unsplash.jpg",
    "heroImage": "/photos/products/muhammad-abdullah-zaeBgN8OTsg-unsplash.jpg",
    "images": [
      "/photos/products/muhammad-abdullah-zaeBgN8OTsg-unsplash.jpg"
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
    "image": "/photos/products/muneeb-malhotra-LAqgGN072Ac-unsplash.jpg",
    "heroImage": "/photos/products/muneeb-malhotra-LAqgGN072Ac-unsplash.jpg",
    "images": [
      "/photos/products/muneeb-malhotra-LAqgGN072Ac-unsplash.jpg"
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
    "image": "/photos/products/naeem-ad-4GbbkUJAt-g-unsplash.jpg",
    "heroImage": "/photos/products/naeem-ad-4GbbkUJAt-g-unsplash.jpg",
    "images": [
      "/photos/products/naeem-ad-4GbbkUJAt-g-unsplash.jpg"
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
    "image": "/photos/products/naeem-ad-GZ6AJCvqL5I-unsplash.jpg",
    "heroImage": "/photos/products/naeem-ad-GZ6AJCvqL5I-unsplash.jpg",
    "images": [
      "/photos/products/naeem-ad-GZ6AJCvqL5I-unsplash.jpg"
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
    "image": "/photos/products/naeem-ad-Xco0gWXMJf4-unsplash.jpg",
    "heroImage": "/photos/products/naeem-ad-Xco0gWXMJf4-unsplash.jpg",
    "images": [
      "/photos/products/naeem-ad-Xco0gWXMJf4-unsplash.jpg"
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
    "image": "/photos/products/naris-aly-OX_s2mAzAGE-unsplash.jpg",
    "heroImage": "/photos/products/naris-aly-OX_s2mAzAGE-unsplash.jpg",
    "images": [
      "/photos/products/naris-aly-OX_s2mAzAGE-unsplash.jpg"
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
    "image": "/photos/products/nikhil-uttam-QSr1f3ZcAcs-unsplash.jpg",
    "heroImage": "/photos/products/nikhil-uttam-QSr1f3ZcAcs-unsplash.jpg",
    "images": [
      "/photos/products/nikhil-uttam-QSr1f3ZcAcs-unsplash.jpg"
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
    "image": "/photos/products/nikolay-kolosovskiy-MDPBzzwg81w-unsplash.jpg",
    "heroImage": "/photos/products/nikolay-kolosovskiy-MDPBzzwg81w-unsplash.jpg",
    "images": [
      "/photos/products/nikolay-kolosovskiy-MDPBzzwg81w-unsplash.jpg"
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
    "image": "/photos/products/nimble-made-hMMXhKSZk7k-unsplash.jpg",
    "heroImage": "/photos/products/nimble-made-hMMXhKSZk7k-unsplash.jpg",
    "images": [
      "/photos/products/nimble-made-hMMXhKSZk7k-unsplash.jpg"
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
    "image": "/photos/products/nitin-m-nisar-3qVEX_KQnsI-unsplash.jpg",
    "heroImage": "/photos/products/nitin-m-nisar-3qVEX_KQnsI-unsplash.jpg",
    "images": [
      "/photos/products/nitin-m-nisar-3qVEX_KQnsI-unsplash.jpg"
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
    "image": "/photos/products/old-youth-29sudGmuzeo-unsplash.jpg",
    "heroImage": "/photos/products/old-youth-29sudGmuzeo-unsplash.jpg",
    "images": [
      "/photos/products/old-youth-29sudGmuzeo-unsplash.jpg"
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
    "image": "/photos/products/olena-bohovyk-eh9f505ljSA-unsplash.jpg",
    "heroImage": "/photos/products/olena-bohovyk-eh9f505ljSA-unsplash.jpg",
    "images": [
      "/photos/products/olena-bohovyk-eh9f505ljSA-unsplash.jpg"
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
    "image": "/photos/products/omar-al-ghosson-TaEAE9cdpVU-unsplash.jpg",
    "heroImage": "/photos/products/omar-al-ghosson-TaEAE9cdpVU-unsplash.jpg",
    "images": [
      "/photos/products/omar-al-ghosson-TaEAE9cdpVU-unsplash.jpg"
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
    "image": "/photos/products/pavlo-talpa-1Mhre9qvZeY-unsplash.jpg",
    "heroImage": "/photos/products/pavlo-talpa-1Mhre9qvZeY-unsplash.jpg",
    "images": [
      "/photos/products/pavlo-talpa-1Mhre9qvZeY-unsplash.jpg"
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
    "image": "/photos/products/pavlo-talpa-8LTBMSfytT0-unsplash.jpg",
    "heroImage": "/photos/products/pavlo-talpa-8LTBMSfytT0-unsplash.jpg",
    "images": [
      "/photos/products/pavlo-talpa-8LTBMSfytT0-unsplash.jpg"
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
    "image": "/photos/products/pavlo-talpa-bpuh0wx0O5I-unsplash.jpg",
    "heroImage": "/photos/products/pavlo-talpa-bpuh0wx0O5I-unsplash.jpg",
    "images": [
      "/photos/products/pavlo-talpa-bpuh0wx0O5I-unsplash.jpg"
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
    "image": "/photos/products/perry-merrity-ii-gPrJi5R4RAk-unsplash.jpg",
    "heroImage": "/photos/products/perry-merrity-ii-gPrJi5R4RAk-unsplash.jpg",
    "images": [
      "/photos/products/perry-merrity-ii-gPrJi5R4RAk-unsplash.jpg"
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
    "image": "/photos/products/pesce-huang-mq73cWf9ZAQ-unsplash.jpg",
    "heroImage": "/photos/products/pesce-huang-mq73cWf9ZAQ-unsplash.jpg",
    "images": [
      "/photos/products/pesce-huang-mq73cWf9ZAQ-unsplash.jpg"
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
    "image": "/photos/products/pexels-akash-tetwal-309778-17076311.jpg",
    "heroImage": "/photos/products/pexels-akash-tetwal-309778-17076311.jpg",
    "images": [
      "/photos/products/pexels-akash-tetwal-309778-17076311.jpg"
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
    "image": "/photos/products/pexels-arina-dmitrieva-66352626-14440412.jpg",
    "heroImage": "/photos/products/pexels-arina-dmitrieva-66352626-14440412.jpg",
    "images": [
      "/photos/products/pexels-arina-dmitrieva-66352626-14440412.jpg"
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
    "image": "/photos/products/pexels-cottonbro-6616673.jpg",
    "heroImage": "/photos/products/pexels-cottonbro-6616673.jpg",
    "images": [
      "/photos/products/pexels-cottonbro-6616673.jpg"
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
    "image": "/photos/products/pexels-cottonbro-7969812.jpg",
    "heroImage": "/photos/products/pexels-cottonbro-7969812.jpg",
    "images": [
      "/photos/products/pexels-cottonbro-7969812.jpg"
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
    "image": "/photos/products/pexels-farhad-chaudhary-168779643-10952730.jpg",
    "heroImage": "/photos/products/pexels-farhad-chaudhary-168779643-10952730.jpg",
    "images": [
      "/photos/products/pexels-farhad-chaudhary-168779643-10952730.jpg"
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
    "image": "/photos/products/pexels-leistylize-18786589.jpg",
    "heroImage": "/photos/products/pexels-leistylize-18786589.jpg",
    "images": [
      "/photos/products/pexels-leistylize-18786589.jpg"
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
    "image": "/photos/products/pexels-marsianin-18199559.jpg",
    "heroImage": "/photos/products/pexels-marsianin-18199559.jpg",
    "images": [
      "/photos/products/pexels-marsianin-18199559.jpg"
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
    "image": "/photos/products/pexels-moh-adbelghaffar-28947727.jpg",
    "heroImage": "/photos/products/pexels-moh-adbelghaffar-28947727.jpg",
    "images": [
      "/photos/products/pexels-moh-adbelghaffar-28947727.jpg"
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
    "image": "/photos/products/pexels-pedrofurtadoo-30752853.jpg",
    "heroImage": "/photos/products/pexels-pedrofurtadoo-30752853.jpg",
    "images": [
      "/photos/products/pexels-pedrofurtadoo-30752853.jpg"
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
    "image": "/photos/products/pexels-ron-lach-8306359.jpg",
    "heroImage": "/photos/products/pexels-ron-lach-8306359.jpg",
    "images": [
      "/photos/products/pexels-ron-lach-8306359.jpg"
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
    "image": "/photos/products/pexels-zehra-k-710717493-27866575.jpg",
    "heroImage": "/photos/products/pexels-zehra-k-710717493-27866575.jpg",
    "images": [
      "/photos/products/pexels-zehra-k-710717493-27866575.jpg"
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
    "image": "/photos/products/plantadea-91UJkhxxhDk-unsplash.jpg",
    "heroImage": "/photos/products/plantadea-91UJkhxxhDk-unsplash.jpg",
    "images": [
      "/photos/products/plantadea-91UJkhxxhDk-unsplash.jpg"
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
    "image": "/photos/products/plantadea-G5I-VSKomYI-unsplash.jpg",
    "heroImage": "/photos/products/plantadea-G5I-VSKomYI-unsplash.jpg",
    "images": [
      "/photos/products/plantadea-G5I-VSKomYI-unsplash.jpg"
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
    "image": "/photos/products/premchand-s-ehfhkGVmkvY-unsplash.jpg",
    "heroImage": "/photos/products/premchand-s-ehfhkGVmkvY-unsplash.jpg",
    "images": [
      "/photos/products/premchand-s-ehfhkGVmkvY-unsplash.jpg"
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
    "image": "/photos/products/priyanka-aggarwal-OlnFC9uCwZ4-unsplash.jpg",
    "heroImage": "/photos/products/priyanka-aggarwal-OlnFC9uCwZ4-unsplash.jpg",
    "images": [
      "/photos/products/priyanka-aggarwal-OlnFC9uCwZ4-unsplash.jpg"
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
    "image": "/photos/products/puscas-adryan-Qy7MWfpXpak-unsplash.jpg",
    "heroImage": "/photos/products/puscas-adryan-Qy7MWfpXpak-unsplash.jpg",
    "images": [
      "/photos/products/puscas-adryan-Qy7MWfpXpak-unsplash.jpg"
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
    "image": "/photos/products/raamin-ka-uR51HXLO7G0-unsplash.jpg",
    "heroImage": "/photos/products/raamin-ka-uR51HXLO7G0-unsplash.jpg",
    "images": [
      "/photos/products/raamin-ka-uR51HXLO7G0-unsplash.jpg"
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
    "image": "/photos/products/robert-arnar-z0xIHTF5HNk-unsplash.jpg",
    "heroImage": "/photos/products/robert-arnar-z0xIHTF5HNk-unsplash.jpg",
    "images": [
      "/photos/products/robert-arnar-z0xIHTF5HNk-unsplash.jpg"
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
    "image": "/photos/products/robert-richman-vcTKFYNZop4-unsplash.jpg",
    "heroImage": "/photos/products/robert-richman-vcTKFYNZop4-unsplash.jpg",
    "images": [
      "/photos/products/robert-richman-vcTKFYNZop4-unsplash.jpg"
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
    "image": "/photos/products/roberto-nickson-rEJxpBskj3Q-unsplash.jpg",
    "heroImage": "/photos/products/roberto-nickson-rEJxpBskj3Q-unsplash.jpg",
    "images": [
      "/photos/products/roberto-nickson-rEJxpBskj3Q-unsplash.jpg"
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
    "image": "/photos/products/rodrigo-rodrigues-wolf-r-t-qpVjMpUMSw8-unsplash.jpg",
    "heroImage": "/photos/products/rodrigo-rodrigues-wolf-r-t-qpVjMpUMSw8-unsplash.jpg",
    "images": [
      "/photos/products/rodrigo-rodrigues-wolf-r-t-qpVjMpUMSw8-unsplash.jpg"
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
    "image": "/photos/products/roman-manshin-DMwISkUxH_E-unsplash.jpg",
    "heroImage": "/photos/products/roman-manshin-DMwISkUxH_E-unsplash.jpg",
    "images": [
      "/photos/products/roman-manshin-DMwISkUxH_E-unsplash.jpg"
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
    "image": "/photos/products/rostislav-budzan-0LuDaMPfSW0-unsplash.jpg",
    "heroImage": "/photos/products/rostislav-budzan-0LuDaMPfSW0-unsplash.jpg",
    "images": [
      "/photos/products/rostislav-budzan-0LuDaMPfSW0-unsplash.jpg"
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
    "image": "/photos/products/rosy-h-nguyen-5HrlEGTsaB4-unsplash.jpg",
    "heroImage": "/photos/products/rosy-h-nguyen-5HrlEGTsaB4-unsplash.jpg",
    "images": [
      "/photos/products/rosy-h-nguyen-5HrlEGTsaB4-unsplash.jpg"
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
    "image": "/photos/products/ruan-richard-rodrigues-m7D_mI4bgeI-unsplash.jpg",
    "heroImage": "/photos/products/ruan-richard-rodrigues-m7D_mI4bgeI-unsplash.jpg",
    "images": [
      "/photos/products/ruan-richard-rodrigues-m7D_mI4bgeI-unsplash.jpg"
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
    "image": "/photos/products/ryan-lu-hvDd-UCT24c-unsplash.jpg",
    "heroImage": "/photos/products/ryan-lu-hvDd-UCT24c-unsplash.jpg",
    "images": [
      "/photos/products/ryan-lu-hvDd-UCT24c-unsplash.jpg"
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
    "image": "/photos/products/saeed-isavy-i-WLGGm6f0o-unsplash.jpg",
    "heroImage": "/photos/products/saeed-isavy-i-WLGGm6f0o-unsplash.jpg",
    "images": [
      "/photos/products/saeed-isavy-i-WLGGm6f0o-unsplash.jpg"
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
    "image": "/photos/products/samuel-regan-asante--F7Unn7bUEo-unsplash.jpg",
    "heroImage": "/photos/products/samuel-regan-asante--F7Unn7bUEo-unsplash.jpg",
    "images": [
      "/photos/products/samuel-regan-asante--F7Unn7bUEo-unsplash.jpg"
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
    "image": "/photos/products/sayan-majhi-Ix-sJLRfh1c-unsplash.jpg",
    "heroImage": "/photos/products/sayan-majhi-Ix-sJLRfh1c-unsplash.jpg",
    "images": [
      "/photos/products/sayan-majhi-Ix-sJLRfh1c-unsplash.jpg"
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
    "image": "/photos/products/see-plus-921hnQzFNoc-unsplash.jpg",
    "heroImage": "/photos/products/see-plus-921hnQzFNoc-unsplash.jpg",
    "images": [
      "/photos/products/see-plus-921hnQzFNoc-unsplash.jpg"
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
    "image": "/photos/products/see-plus-RoH656UZEgY-unsplash.jpg",
    "heroImage": "/photos/products/see-plus-RoH656UZEgY-unsplash.jpg",
    "images": [
      "/photos/products/see-plus-RoH656UZEgY-unsplash.jpg"
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
    "image": "/photos/products/shahin-khalaji-DCJkSsyaVTM-unsplash.jpg",
    "heroImage": "/photos/products/shahin-khalaji-DCJkSsyaVTM-unsplash.jpg",
    "images": [
      "/photos/products/shahin-khalaji-DCJkSsyaVTM-unsplash.jpg"
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
    "image": "/photos/products/sharvina-aathymoolam-6iphiqb2zuw-unsplash.jpg",
    "heroImage": "/photos/products/sharvina-aathymoolam-6iphiqb2zuw-unsplash.jpg",
    "images": [
      "/photos/products/sharvina-aathymoolam-6iphiqb2zuw-unsplash.jpg"
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
    "image": "/photos/products/sharvina-aathymoolam-LmD20Yw5AyE-unsplash.jpg",
    "heroImage": "/photos/products/sharvina-aathymoolam-LmD20Yw5AyE-unsplash.jpg",
    "images": [
      "/photos/products/sharvina-aathymoolam-LmD20Yw5AyE-unsplash.jpg"
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
    "image": "/photos/products/shayan-rostami-26HIcL3_r8E-unsplash.jpg",
    "heroImage": "/photos/products/shayan-rostami-26HIcL3_r8E-unsplash.jpg",
    "images": [
      "/photos/products/shayan-rostami-26HIcL3_r8E-unsplash.jpg"
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
    "image": "/photos/products/shutter-speed-sTAgKRVpe-E-unsplash.jpg",
    "heroImage": "/photos/products/shutter-speed-sTAgKRVpe-E-unsplash.jpg",
    "images": [
      "/photos/products/shutter-speed-sTAgKRVpe-E-unsplash.jpg"
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
    "image": "/photos/products/spacejoy-IH7wPsjwomc-unsplash.jpg",
    "heroImage": "/photos/products/spacejoy-IH7wPsjwomc-unsplash.jpg",
    "images": [
      "/photos/products/spacejoy-IH7wPsjwomc-unsplash.jpg"
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
    "image": "/photos/products/spacejoy-h2_3dL9yLpU-unsplash.jpg",
    "heroImage": "/photos/products/spacejoy-h2_3dL9yLpU-unsplash.jpg",
    "images": [
      "/photos/products/spacejoy-h2_3dL9yLpU-unsplash.jpg"
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
    "image": "/photos/products/swello-VvOuej-fcmU-unsplash.jpg",
    "heroImage": "/photos/products/swello-VvOuej-fcmU-unsplash.jpg",
    "images": [
      "/photos/products/swello-VvOuej-fcmU-unsplash.jpg"
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
    "image": "/photos/products/thom-bradley-4A897lG0g3Y-unsplash.jpg",
    "heroImage": "/photos/products/thom-bradley-4A897lG0g3Y-unsplash.jpg",
    "images": [
      "/photos/products/thom-bradley-4A897lG0g3Y-unsplash.jpg"
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
    "image": "/photos/products/toa-heftiba--abWByT3yg4-unsplash.jpg",
    "heroImage": "/photos/products/toa-heftiba--abWByT3yg4-unsplash.jpg",
    "images": [
      "/photos/products/toa-heftiba--abWByT3yg4-unsplash.jpg"
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
    "image": "/photos/products/tron-le-E5zsokLJkVQ-unsplash.jpg",
    "heroImage": "/photos/products/tron-le-E5zsokLJkVQ-unsplash.jpg",
    "images": [
      "/photos/products/tron-le-E5zsokLJkVQ-unsplash.jpg"
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
    "image": "/photos/products/vadim-sherbakov-tCICLJ5ktBE-unsplash.jpg",
    "heroImage": "/photos/products/vadim-sherbakov-tCICLJ5ktBE-unsplash.jpg",
    "images": [
      "/photos/products/vadim-sherbakov-tCICLJ5ktBE-unsplash.jpg"
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
    "image": "/photos/products/valentina-schick-9AS2t3rgGko-unsplash.jpg",
    "heroImage": "/photos/products/valentina-schick-9AS2t3rgGko-unsplash.jpg",
    "images": [
      "/photos/products/valentina-schick-9AS2t3rgGko-unsplash.jpg"
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
