import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COLLECTIONS, countCollection } from "@/data/collections";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Six curated edits from the house of Lumière — new season, best sellers, gift edit, essentials and final sale.",
};

export default function CollectionsPage() {
  return (
    <div>
      <header className="border-b border-border bg-mist">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <span className="label-xs text-gold-ink">Curated</span>
          <h1 className="mt-4 font-serif text-4xl text-foreground sm:text-5xl">Collections</h1>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-slate-500">
            Six themed edits drawn from the same thirty-three pieces — so you can shop the way you
            actually think: by season, by occasion, by price.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <Stagger className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {COLLECTIONS.map((collection) => {
            const count = countCollection(collection, products);
            return (
              <StaggerItem key={collection.slug}>
                <Link
                  href={`/shop?collection=${collection.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-none border border-border bg-card transition-colors hover:border-gold/60"
                >
                <div className="relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={collection.image}
                    alt=""
                    className="h-60 w-full object-cover"
                  />
                  <span className="absolute right-3 top-3 rounded-full bg-card/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-foreground backdrop-blur">
                    {count} {count === 1 ? "piece" : "pieces"}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <span className="label-xs text-gold-ink">{collection.tagline}</span>
                  <h2 className="mt-3 font-serif text-xl text-foreground">{collection.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                    {collection.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold-ink">
                    Shop the edit
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </div>
              </Link>
              </StaggerItem>
            );
          })}
        </Stagger>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 rounded-none border border-border bg-mist px-6 py-8 sm:flex-row">
          <div>
            <h2 className="font-serif text-2xl text-foreground">Prefer to browse everything?</h2>
            <p className="mt-1 text-sm text-slate-500">
              All {products.length} pieces, filterable by category, price and keyword.
            </p>
          </div>
          <Button variant="primary" asChild className="shrink-0">
            <Link href="/shop">
              All Products <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
