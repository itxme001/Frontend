"use client";

import * as React from "react";
import Image from "next/image";
import { getProduct, CATEGORY_LABELS } from "@/data/products";
import { useCart } from "@/store/cart-store";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/store/currency-context";

interface QuickViewModalProps {
  productId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickViewModal({ productId, open, onOpenChange }: QuickViewModalProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const { format } = useCurrency();
  const product = productId ? getProduct(productId) : undefined;

  const [color, setColor] = React.useState<string>("");
  const [size, setSize] = React.useState<string>("");
  const [activeImage, setActiveImage] = React.useState(0);

  React.useEffect(() => {
    if (open && product) {
      setColor(product.colors?.[0] ?? "");
      setSize(product.sizes?.[0] ?? "");
      setActiveImage(0);
    }
  }, [open, product]);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onOpenChange(false);
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  if (!open || !product) return null;

  const images = product.images?.length ? product.images : [product.heroImage ?? product.image];

  function addToBag() {
    if (product!.colors?.length && !color) {
      toast({ title: "Select a colour", variant: "error" });
      return;
    }
    if (product!.sizes?.length && !size) {
      toast({ title: "Select a size", variant: "error" });
      return;
    }
    addItem({
      id: product!.id,
      name: product!.name,
      price: product!.price,
      originalPrice: product!.originalPrice ?? undefined,
      category: product!.category,
      image: images[0],
      color: color || undefined,
      size: size || undefined,
    });
    toast({
      title: "Added to bag",
      description: `${product!.name}${color ? ` · ${color}` : ""}${size ? ` / ${size}` : ""}`,
      variant: "success",
    });
    onOpenChange(false);
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/55"
        onClick={() => onOpenChange(false)}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        className="relative z-10 grid max-h-[92vh] w-full max-w-3xl grid-cols-1 overflow-y-auto rounded-none bg-card shadow-2xl md:grid-cols-2"
      >
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 rounded-full bg-card/90 px-2 text-2xl leading-none text-slate-400 shadow-sm transition-colors hover:text-obsidian"
        >
          &times;
        </button>

        <div className="bg-silk p-4">
          <Image
            src={images[activeImage]}
            alt={product.name}
            width={320}
            height={400}
            className="mx-auto aspect-[4/5] w-full rounded-lg object-cover"
            unoptimized
          />
          {images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {images.map((img, i) => (
                <button
                  key={img + i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`h-16 w-14 overflow-hidden rounded-md border-2 ${
                    i === activeImage ? "border-gold" : "border-transparent"
                  }`}
                >
                  <Image
                    src={img}
                    alt=""
                    width={56}
                    height={64}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col p-6">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-ink">
            {CATEGORY_LABELS[product.category]}
          </span>
          <h2 className="mt-1 font-serif text-2xl text-obsidian">{product.name}</h2>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-semibold text-gold-ink">{format(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-slate-400 line-through">
                {format(product.originalPrice)}
              </span>
            )}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">{product.description}</p>
          <p className="mt-3 text-xs uppercase tracking-[0.14em] text-slate-500">
            Material · <span className="text-foreground">{product.material}</span>
          </p>

          {product.colors && product.colors.length > 0 && (
            <div className="mt-5">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Colour</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                      color === c ? "border-gold bg-gold/10 text-obsidian" : "border-border text-slate-500 hover:border-gold"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-4">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Size</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`min-w-11 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      size === s ? "border-gold bg-gold/10 text-obsidian" : "border-border text-slate-500 hover:border-gold"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="mt-4 text-xs text-slate-400">Only {product.stock} left in stock</p>

          <div className="mt-auto flex gap-3 pt-6">
            <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button variant="primary" className="flex-1" onClick={addToBag}>
              Add to Bag
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
