"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products, CATEGORY_LABELS, type ProductCategory } from "@/data/products";
import { getCollection } from "@/data/collections";
import { ProductGrid } from "@/components/catalog/product-grid";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useCurrency } from "@/store/currency-context";
import { cn } from "@/lib/utils";

type SortKey = "featured" | "price-low" | "price-high" | "newest";

interface CatalogProps {
  initialCategory?: string;
  initialQuery?: string;
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

/** Elegant category pills with gold accent on active */
function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "relative overflow-hidden rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300",
        active
          ? "border-gold bg-gold text-white shadow-[0_0_20px_-6px_rgba(184,148,46,0.5)]"
          : "border-border bg-transparent text-slate-500 hover:border-gold/60 hover:text-gold-ink"
      )}
    >
      {label}
    </button>
  );
}

export function Catalog({ initialCategory, initialQuery, initialCollection }: CatalogProps) {
  const { format } = useCurrency();

  const [category, setCategory] = React.useState(initialCategory ?? "all");
  const [sort, setSort] = React.useState<SortKey>("featured");
  const [query, setQuery] = React.useState(initialQuery ?? "");
  const [maxPrice, setMaxPrice] = React.useState(MAX_PRICE);
  const [collectionSlug, setCollectionSlug] = React.useState<string | null>(
    initialCollection ?? null
  );
  const [filtersVisible, setFiltersVisible] = React.useState(false);
  const gridRef = React.useRef<HTMLDivElement>(null);
  const filterBarRef = React.useRef<HTMLDivElement>(null);
  const productsSectionRef = React.useRef<HTMLDivElement>(null);

  const collection = getCollection(collectionSlug);

  // Animate filter bar on mount
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    // Filter bar slide-in
    if (filterBarRef.current) {
      gsap.fromTo(
        filterBarRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.1 }
      );
    }

    // Section title counter animation
    const resultCount = productsSectionRef.current?.querySelector("[data-result-count]");
    if (resultCount) {
      gsap.fromTo(
        resultCount,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.4)", delay: 0.3 }
      );
    }
  }, []);

  // GSAP product card animations
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const cards = gridRef.current?.querySelectorAll("[data-product-card]");
    if (!cards || cards.length === 0) return;

    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          delay: Math.min(i * 0.04, 0.4),
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, [collection, category, query, maxPrice, sort]);

  // Parallax for collection banner
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const banner = document.querySelector("[data-collection-banner]");
    if (banner) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: banner,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      tl.to(banner, { yPercent: -8, ease: "none" });
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
    <div className="min-h-screen">
      {/* ── Hero / Banner ── */}
      <div className="relative overflow-hidden bg-obsidian">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/photos/editorial/home-hero.webp"
            alt=""
            fill
            className="object-cover opacity-25"
            priority
            unoptimized
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-obsidian/40 to-obsidian" />
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
          <p className="label-xs text-gold-light mb-3">The Collection</p>
          <h1 className="display text-silk">Shop</h1>
          {collection ? (
            <p className="mt-4 max-w-lg text-lg text-silk/60">{collection.description}</p>
          ) : (
            <p className="mt-4 max-w-lg text-lg text-silk/60">
              {products.length} pieces across four categories — each one made to last.
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-16">
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

        {/* ── Filter bar ── */}
        <div ref={filterBarRef} className="mb-10 rounded-none border border-border bg-card p-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end">
            {/* Search */}
            <div className="flex-1">
              <label
                htmlFor="catalog-search"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500"
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

            {/* Sort */}
            <div className="lg:w-48">
              <label
                htmlFor="catalog-sort"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                Sort by
              </label>
              <Select
                id="catalog-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </Select>
            </div>

            {/* Price range */}
            <div className="lg:w-56">
              <label
                htmlFor="catalog-price"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                Max: {format(maxPrice)}
              </label>
              <input
                id="catalog-price"
                type="range"
                min={100}
                max={MAX_PRICE}
                step={50}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full border border-border bg-mist accent-gold"
              />
              <div className="mt-2 flex justify-between text-[10px] text-slate-400">
                <span>$100</span>
                <span>{format(MAX_PRICE)}</span>
              </div>
            </div>
          </div>

          {/* Category pills */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {CATEGORY_OPTIONS.map((option) => (
              <CategoryPill
                key={option.value}
                label={option.label}
                active={category === option.value}
                onClick={() => setCategory(option.value)}
              />
            ))}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={reset}
                className="ml-auto text-xs font-medium text-slate-400 underline underline-offset-4 hover:text-foreground"
              >
                Reset all
              </button>
            )}
          </div>
        </div>

        {/* ── Results count ── */}
        <div
          ref={productsSectionRef}
          data-result-count
          className="mb-8 flex items-baseline gap-3 border-b border-border pb-4"
        >
          <p className="text-sm text-slate-500">
            Showing{" "}
            <strong className="font-semibold text-foreground">{filtered.length}</strong> of{" "}
            {products.length} pieces
            {collection ? (
              <>
                {" "}
                in{" "}
                <strong className="font-semibold text-gold-ink">{collection.title}</strong>
              </>
            ) : null}
            {query ? (
              <>
                {" "}
                for <span className="italic text-foreground">"{query}"</span>
              </>
            ) : null}
          </p>
          {!collection && (
            <Link
              href="/collections"
              className="ml-auto text-xs text-slate-400 underline hover:text-gold-ink"
            >
              Browse collections
            </Link>
          )}
        </div>

        {/* ── Product grid ── */}
        <div ref={gridRef}>
          <ProductGrid
            items={filtered}
            emptyMessage="No products match your filters. Try widening your search or resetting."
          />
        </div>
      </div>
    </div>
  );
}
