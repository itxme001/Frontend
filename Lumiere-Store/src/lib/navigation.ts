import { CATEGORY_LABELS, products, type ProductCategory } from "@/data/products";
import { COLLECTIONS } from "@/data/collections";

export interface NavLink {
  label: string;
  href: string;
  note?: string;
}

export interface MegaColumn {
  heading: string;
  links: NavLink[];
  /** Bigger, counted rows used by the Shop directory. */
  rows?: { label: string; href: string; count: number; low: number }[];
}

export interface MegaTile {
  label: string;
  href: string;
  image: string;
  tagline: string;
}

/**
 * Two deliberately different mega-menu shapes.
 *
 * `directory` — a functional index of the catalogue (counts, kinds, one clear
 *   "everything" exit). This is the Shop menu.
 * `gallery` — an image-led set of curated edits. This is the Collections menu.
 *
 * They used to both render the same column-of-text-links, which is why Shop and
 * Collections read as duplicates.
 */
export type MegaKind = "directory" | "gallery";

export interface MegaMenu {
  id: string;
  kind: MegaKind;
  intro: string;
  directory?: MegaColumn;
  tiles?: MegaTile[];
  feature: { label: string; href: string; note: string };
}

export interface NavItem {
  label: string;
  href: string;
  mega?: MegaMenu;
}

const categories = Object.keys(CATEGORY_LABELS) as ProductCategory[];

function categoryStats(category: ProductCategory) {
  const items = products.filter((p) => p.category === category);
  const low = Math.min(...items.map((p) => p.price));
  return { count: items.length, low };
}

export const PRIMARY_NAV: NavItem[] = [
  {
    label: "Shop",
    href: "/shop",
    mega: {
      id: "shop",
      kind: "directory",
      intro: "Browse the catalogue by category",
      directory: {
        heading: "Categories",
        links: [],
        rows: categories.map((category) => {
          const { count, low } = categoryStats(category);
          return {
            label: CATEGORY_LABELS[category],
            href: `/shop?cat=${category}`,
            count,
            low,
          };
        }),
      },
      feature: {
        label: "All 33 pieces",
        href: "/shop",
        note: "Search, filter and sort the full catalogue",
      },
    },
  },
  {
    label: "Collections",
    href: "/collections",
    mega: {
      id: "collections",
      kind: "gallery",
      intro: "Curated edits, refreshed each season",
      tiles: COLLECTIONS.map((collection) => ({
        label: collection.title,
        href: `/shop?collection=${collection.slug}`,
        image: collection.image,
        tagline: collection.tagline,
      })),
      feature: {
        label: "Every collection",
        href: "/collections",
        note: "Six themed edits drawn from the same pieces",
      },
    },
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Secondary links surfaced in the mobile drawer and the footer. */
export const SECONDARY_LINKS: NavLink[] = [
  { label: "Journal", href: "/journal", note: "Notes on slow craft" },
  { label: "Our Story", href: "/story", note: "How Lumière began" },
  { label: "FAQ", href: "/contact#faq", note: "Shipping, returns, payments" },
  { label: "My Account", href: "/account", note: "Orders and wishlist" },
];

export function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
