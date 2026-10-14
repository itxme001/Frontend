import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Catalog } from "@/components/catalog/catalog";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse the full Lumière collection of apparel, accessories, living and fragrance.",
};

interface ShopPageProps {
  searchParams: Promise<{
    cat?: string | string[];
    q?: string | string[];
    collection?: string | string[];
  }>;
}

async function ShopContent({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const category = typeof params.cat === "string" ? params.cat : undefined;
  const query = typeof params.q === "string" ? params.q : undefined;
  const collection = typeof params.collection === "string" ? params.collection : undefined;

  return (
    <Catalog
      key={`${collection ?? "all"}-${category ?? "all"}-${query ?? ""}`}
      initialCategory={category}
      initialQuery={query}
      initialCollection={collection}
    />
  );
}

function CatalogSkeleton() {
  return (
    <div className="space-y-6">
      <div className="skeleton h-32 rounded-none" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="skeleton h-96 rounded-none" />
        ))}
      </div>
    </div>
  );
}

export default function ShopPage({ searchParams }: ShopPageProps) {
  return (
    <Suspense fallback={<CatalogSkeleton />}>
      <ShopContent searchParams={searchParams} />
    </Suspense>
  );
}
