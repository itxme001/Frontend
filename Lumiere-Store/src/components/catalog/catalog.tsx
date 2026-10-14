"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { products, CATEGORY_LABELS, type ProductCategory } from "@/data/products";
import { getCollection } from "@/data/collections";
import { ProductGrid } from "@/components/catalog/product-grid";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useCurrency } from "@/store/currency-context";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type SortKey = "featured" | "price-low" | "price-high" | "newest";

interface CatalogProps {
  initialCategory?: string;
  initialQuery?: string;
  /** Collection slug from `/shop?collection=…`. */
  initialCollection?: string;
}

const CATEGORY_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "all", label: "All" },
  ...(Object.keys(CATEGORY_LABELS) as ProductCategory[]).map((key) => ({
    value: key,
    label: CATEGORY_LABELS[key],
  })),
];

const MAX_PRICE = Math.max(...products.map((p) => p.price));

export function Catalog({ initialCategory, initialQuery, initialCollection }: CatalogProps) {
  const { format } = useCurrency();

  const [category, setCategory] = React.useState(initialCategory ?? "all");
  const [sort, setSort] = React.useState<SortKey>("featured");
  const [query, setQuery] = React.useState(initialQuery ?? "");
  const [maxPrice, setMaxPrice] = React.useState(MAX_PRICE);
  const [collectionSlug, setCollectionSlug] = React.useState<string | null>(
    initialCollection ?? null
  );
  const gridRef = React.useRef<HTMLDivElement>(null);

  const collection = getCollection(collectionSlug);

  // GSAP animations
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    // Animate product cards on scroll
    const cards = gridRef.current?.querySelectorAll("[data-product-card]");
    if (cards) {
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }

    // Parallax for collection banner
    const banner = document.querySelector("[data-collection-banner]");
    if (banner) {
      gsap.to(banner, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: banner,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, [collection]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = products.filter((product) => {
      const matchesCollection = !collection || collection.match(product);
      const matchesCategory = category === "all" || product.category === category;
      const matchesQuery =
        !q ||
        `${product.name} ${product.category} ${product.description} ${(product.tags ?? []).join(" ")}`
          .toLowerCase()
          .includes(q);
      const matchesPrice = product.price <= maxPrice;
      return matchesCollection && matchesCategory && matchesQuery && matchesPrice;
    });

    list = [...list];
    if (sort === "price-low") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-high") list.sort((a, b) => b.price - a.price);
    else if (sort === "newest") list.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    else list.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));

    return list;
  }, [collection, category, query, maxPrice, sort]);

  const hasActiveFilters =
    Boolean(collection) || category !== "all" || query !== "" || maxPrice < MAX_PRICE;

  function reset() {
    setCollectionSlug(null);
    setCategory("all");
    setQuery("");
    setMaxPrice(MAX_PRICE);
    setSort("featured");
  }

  return (
    <div>
      {/* Active collection banner */}
      {collection ? (
        <div data-collection-banner className="mb-8 flex flex-col gap-4 overflow-hidden rounded-none border border-border bg-card sm:flex-row sm:items-center">
          <Image
            src={collection.image}
            alt=""
            width={160}
            height={128}
            className="h-32 w-full object-cover sm:h-28 sm:w-40"
            unoptimized
          />
          <div className="flex-1 p-5 sm:py-4">
            <span className="label-xs text-gold-ink">{collection.tagline}</span>
            <h2 className="mt-1.5 font-serif text-xl text-foreground">{collection.title}</h2>
            <p className="mt-1 text-sm text-slate-500">{collection.description}</p>
          </div>
          <button
            type="button"
            onClick={() => setCollectionSlug(null)}
            aria-label="Clear collection filter"
            className="mr-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500 transition-colors hover:border-gold hover:text-gold-ink"
          >
            <X className="h-3.5 w-3.5" aria-hidden />
            Clear
          </button>
        </div>
      ) : null}

      <div className="mb-8 rounded-none border border-border bg-card p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <div className="flex-1">
            <label
              htmlFor="catalog-search"
              className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              Search
            </label>
            <Input
              id="catalog-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the collection…"
            />
          </div>

          <div className="lg:w-52">
            <label
              htmlFor="catalog-sort"
              className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              Sort by
            </label>
            <Select id="catalog-sort" value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </Select>
          </div>

          <div className="lg:w-60">
            <label
              htmlFor="catalog-price"
              className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              Max price: {format(maxPrice)}
            </label>
            <input
              id="catalog-price"
              type="range"
              min={100}
              max={MAX_PRICE}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-border accent-gold"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {CATEGORY_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setCategory(option.value)}
              aria-pressed={category === option.value}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                category === option.value
                  ? "border-gold bg-gold text-white"
                  : "border-border text-slate-500 hover:border-gold hover:text-gold-ink"
              }`}
            >
              {option.label}
            </button>
          ))}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={reset}
              className="ml-auto text-xs font-medium text-slate-400 underline hover:text-foreground"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      <p className="mb-6 text-sm text-slate-500">
        Showing <strong className="text-foreground">{filtered.length}</strong> of {products.length}{" "}
        pieces
        {collection ? <> in <strong className="text-foreground">{collection.title}</strong></> : null}
        {query ? <> for &ldquo;<strong className="text-foreground">{query}</strong>&rdquo;</> : null}
        {collection ? null : (
          <>
            {" "}
            · <Link href="/collections" className="underline hover:text-gold-ink">Browse collections</Link>
          </>
        )}
      </p>

      <div ref={gridRef}>
        <ProductGrid
          items={filtered}
          emptyMessage="No products match your filters. Try widening your search."
        />
      </div>
    </div>
  );
}
