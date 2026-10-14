"use client";

import * as React from "react";
import Image from "next/image";
import { Heart, Plus } from "lucide-react";
import { products as allProducts, CATEGORY_LABELS, type Product } from "@/data/products";
import { useCart } from "@/store/cart-store";
import { useToast } from "@/components/ui/toast";
import { Rating } from "@/components/ui/rating";
import { useCurrency } from "@/store/currency-context";
import { QuickViewModal } from "@/components/catalog/quick-view-modal";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  items?: Product[];
  title?: string;
  emptyMessage?: string;
}

const WISHLIST_ACTIVE_COLOR = "var(--color-gold-dark, #a8873f)";

/**
 * Editorial product list.
 *
 * Deliberately not a card grid: no border, no radius, no shadow, no tinted
 * surface. The photograph sits on a neutral block and the copy sits on the page.
 */
export function ProductGrid({ items, title, emptyMessage }: ProductGridProps) {
  const list = items ?? allProducts;
  const { addItem, toggleWishlist, isWishlisted } = useCart();
  const { toast } = useToast();
  const { format } = useCurrency();
  const [quickViewId, setQuickViewId] = React.useState<string | null>(null);

  function handleAdd(product: Product) {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice ?? undefined,
      category: product.category,
      image: product.heroImage ?? product.image,
    });
    toast({ title: "Added to bag", description: product.name, variant: "success" });
  }

  if (list.length === 0) {
    return (
      <div className="border border-border py-20 text-center text-slate-500">
        {emptyMessage ?? "No products found."}
      </div>
    );
  }

  return (
    <section>
      {title ? (
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 className="headline">{title}</h2>
          <span className="text-sm text-slate-500">{list.length} pieces</span>
        </div>
      ) : null}

      <Stagger className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((product) => {
          const saved = isWishlisted(product.id);
          const alt = product.images?.[1] ?? product.image;
          const discount = product.originalPrice
            ? Math.round((1 - product.price / product.originalPrice) * 100)
            : 0;

          return (
            <StaggerItem as="article" key={product.id} className="group">
              <div className="relative overflow-hidden bg-mist">
                <button
                  type="button"
                  onClick={() => setQuickViewId(product.id)}
                  aria-label={`View ${product.name}`}
                  className="block w-full"
                >
                  {/* Primary image */}
                  <Image
                    src={product.heroImage ?? product.image}
                    alt={product.name}
                    width={400}
                    height={500}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="aspect-[4/5] w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                    priority={false}
                  />
                  {/* Hover image (second photo) */}
                  <Image
                    src={alt}
                    alt=""
                    aria-hidden
                    width={400}
                    height={500}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="absolute inset-0 aspect-[4/5] w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    priority={false}
                  />
                </button>

                {discount > 0 ? (
                  <span className="absolute left-0 top-0 bg-foreground px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-background">
                    {discount}% off
                  </span>
                ) : null}

                <button
                  type="button"
                  onClick={() => {
                    toggleWishlist(product.id);
                    toast({
                      title: saved ? "Removed from wishlist" : "Saved to wishlist",
                      description: product.name,
                      variant: saved ? "info" : "success",
                    });
                  }}
                  aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
                  aria-pressed={saved}
                  className={cn(
                    "absolute right-3 top-3 flex h-10 w-10 items-center justify-center backdrop-blur transition-colors hover:bg-background/90",
                    saved ? "bg-background/90 text-red-500" : "bg-background/80 text-slate-700"
                  )}
                >
                  <Heart className="h-4 w-4" fill={saved ? "currentColor" : "none"} aria-hidden />
                </button>

                <button
                  type="button"
                  onClick={() => handleAdd(product)}
                  className="absolute inset-x-0 bottom-0 flex h-12 items-center justify-center gap-2 bg-foreground text-[11px] font-medium uppercase tracking-[0.16em] text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100"
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden />
                  Add to bag
                </button>
              </div>

              <div className="mt-4">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-serif text-lg leading-snug text-foreground">
                    {product.name}
                  </h3>
                  <p className="shrink-0 text-sm tabular-nums">
                    <span className="text-gold-ink">{format(product.price)}</span>
                    {product.originalPrice ? (
                      <span className="ml-2 text-slate-400 line-through">
                        {format(product.originalPrice)}
                      </span>
                    ) : null}
                  </p>
                </div>
                <p className="mt-1 text-sm text-slate-500">{CATEGORY_LABELS[product.category]}</p>
                <Rating value={product.rating} count={product.reviews} className="mt-2" />
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>

      <QuickViewModal
        productId={quickViewId}
        open={Boolean(quickViewId)}
        onOpenChange={(open) => !open && setQuickViewId(null)}
      />
    </section>
  );
}
