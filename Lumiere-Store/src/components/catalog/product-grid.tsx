"use client";

import * as React from "react";
import Image from "next/image";
import { Heart, Plus } from "lucide-react";
import { gsap } from "gsap";
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

const WISHLIST_ACTIVE_COLOR = "#8a6d1a";

/**
 * Editorial product card with GSAP-powered hover interactions.
 * Image crossfade, magnetic add-to-bag, and smooth scale transitions.
 */
export function ProductGrid({ items, title, emptyMessage }: ProductGridProps) {
  const list = items ?? allProducts;
  const { addItem, toggleWishlist, isWishlisted } = useCart();
  const { toast } = useToast();
  const { format } = useCurrency();
  const [quickViewId, setQuickViewId] = React.useState<string | null>(null);
  const cardRefs = React.useRef<Map<string, HTMLDivElement>>(new Map());

  // GSAP hover interactions for each card
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const cards = cardRefs.current;
    if (cards.size === 0) return;

    cards.forEach((card, id) => {
      const imgPrimary = card.querySelector("[data-img-primary]") as HTMLElement;
      const imgHover = card.querySelector("[data-img-hover]") as HTMLElement;
      const addToBag = card.querySelector("[data-add-to-bag]") as HTMLElement;

      if (imgPrimary && imgHover) {
        // Smooth crossfade on hover
        card.addEventListener("mouseenter", () => {
          gsap.to(imgPrimary, { opacity: 0, duration: 0.35, ease: "power2.inOut" });
          gsap.to(imgHover, { opacity: 1, duration: 0.45, ease: "power2.out" });
          gsap.to(addToBag, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.2)" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(imgPrimary, { opacity: 1, duration: 0.35, ease: "power2.inOut" });
          gsap.to(imgHover, { opacity: 0, duration: 0.45, ease: "power2.out" });
          gsap.to(addToBag, { opacity: 0, y: 4, duration: 0.25, ease: "power2.in" });
        });
      }
    });
  }, [list]);

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

  function handleWishlist(product: Product) {
    const wasWishlisted = isWishlisted(product.id);
    toggleWishlist(product.id);
    toast({
      title: wasWishlisted ? "Removed from wishlist" : "Saved to wishlist",
      description: product.name,
      variant: wasWishlisted ? "info" : "success",
    });
  }

  if (list.length === 0) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center border border-dashed border-border py-20 text-slate-400">
        <p className="text-sm">{emptyMessage ?? "No products found."}</p>
      </div>
    );
  }

  return (
    <section>
      {title ? (
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 className="headline">{title}</h2>
          <span className="label-xs text-slate-400">{list.length} pieces</span>
        </div>
      ) : null}

      <Stagger className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((product) => {
          const saved = isWishlisted(product.id);
          const alt = product.images?.[1] ?? product.image;
          const discount = product.originalPrice
            ? Math.round((1 - product.price / product.originalPrice) * 100)
            : 0;

          return (
            <StaggerItem as="article" key={product.id} className="group">
              <div
                ref={(el) => {
                  if (el) cardRefs.current.set(product.id, el);
                  else cardRefs.current.delete(product.id);
                }}
                data-product-card
                className="relative cursor-pointer"
              >
                {/* ── Image container ── */}
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
                      className="aspect-[4/5] w-full object-cover transition-opacity duration-500"
                      data-img-primary
                      priority={false}
                    />
                    {/* Hover image */}
                    <Image
                      src={alt}
                      alt=""
                      aria-hidden
                      width={400}
                      height={500}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="absolute inset-0 aspect-[4/5] w-full object-cover opacity-0 transition-opacity duration-500"
                      data-img-hover
                      priority={false}
                    />
                  </button>

                  {/* Discount badge */}
                  {discount > 0 ? (
                    <span className="absolute left-0 top-0 bg-foreground px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-background">
                      {discount}% off
                    </span>
                  ) : null}

                  {/* Wishlist button */}
                  <button
                    type="button"
                    onClick={() => handleWishlist(product)}
                    aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
                    aria-pressed={saved}
                    className={cn(
                      "absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300",
                      saved
                        ? "bg-white/90 text-gold-dark shadow-sm"
                        : "bg-white/70 text-slate-600 opacity-0 group-hover:opacity-100 hover:bg-white hover:text-gold-dark"
                    )}
                  >
                    <Heart className="h-4 w-4" fill={saved ? "currentColor" : "none"} aria-hidden />
                  </button>

                  {/* Add to bag — slides up on hover */}
                  <button
                    type="button"
                    onClick={() => handleAdd(product)}
                    data-add-to-bag
                    className="absolute inset-x-0 bottom-0 flex h-11 items-center justify-center gap-2 bg-foreground/95 text-[11px] font-semibold uppercase tracking-[0.16em] text-background opacity-0 transition-opacity duration-300 translate-y-2"
                  >
                    <Plus className="h-3.5 w-3.5" aria-hidden />
                    Add to bag
                  </button>
                </div>

                {/* ── Product info ── */}
                <div className="mt-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-serif text-[1.05rem] leading-snug text-foreground group-hover:text-gold-dark transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="shrink-0 text-sm tabular-nums font-medium">
                      <span className="text-gold-dark">{format(product.price)}</span>
                      {product.originalPrice ? (
                        <span className="ml-2 text-slate-400 line-through text-sm">
                          {format(product.originalPrice)}
                        </span>
                      ) : null}
                    </p>
                  </div>
                  <p className="mt-0.5 text-xs uppercase tracking-[0.12em] text-slate-400">
                    {CATEGORY_LABELS[product.category]}
                  </p>
                  <Rating value={product.rating} count={product.reviews} className="mt-2" />
                </div>
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
