"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Package, Search } from "lucide-react";
import { Sheet } from "@/components/ui/sheet";
import { CurrencySwitcher } from "@/components/layout/currency-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { PRIMARY_NAV, SECONDARY_LINKS } from "@/lib/navigation";
import { CATEGORY_LABELS, type ProductCategory } from "@/data/products";
import { COLLECTIONS } from "@/data/collections";
import { useAuth } from "@/store/auth-context";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSearch: () => void;
}

function NavGroup({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details className="group border-b border-border" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between py-3.5 text-sm font-medium text-foreground marker:content-none">
        <span>{title}</span>
        <ChevronDown
          className="h-4 w-4 shrink-0 text-gold-ink transition-transform duration-300 group-open:rotate-180"
          aria-hidden
        />
      </summary>
      <div className="pb-3">{children}</div>
    </details>
  );
}

export function MobileNav({ open, onOpenChange, onSearch }: MobileNavProps) {
  const { user } = useAuth();
  const close = () => onOpenChange(false);

  const about = PRIMARY_NAV.find((item) => item.label === "About");
  const contact = PRIMARY_NAV.find((item) => item.label === "Contact");

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      side="left"
      title="Menu"
      description="Browse the house"
      footer={
        <Link
          href={user ? "/account" : "/login"}
          onClick={close}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-obsidian px-4 py-3 text-sm font-semibold text-silk transition-colors hover:bg-gold-ink"
        >
          {user ? `My account · ${user.name.split(" ")[0]}` : "Login / Sign up"}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      }
    >
      {/* Search */}
      <button
        type="button"
        onClick={() => {
          close();
          onSearch();
        }}
        className="mb-4 flex w-full items-center gap-3 rounded-lg border border-border px-3.5 py-3 text-left text-sm text-slate-500 transition-colors hover:border-gold/60 hover:text-foreground"
      >
        <Search className="h-4 w-4 shrink-0 text-gold-ink" aria-hidden />
        Search the collection…
      </button>

      {/* Primary navigation */}
      <nav aria-label="Mobile" className="border-t border-border">
        <NavGroup title="Shop" defaultOpen>
          <ul className="space-y-1">
            <li>
              <Link
                href="/shop"
                onClick={close}
                className="block rounded-md px-2 py-2 text-sm text-foreground/80 transition-colors hover:bg-mist hover:text-gold-ink"
              >
                All Products
              </Link>
            </li>
            {(Object.keys(CATEGORY_LABELS) as ProductCategory[]).map((key) => (
              <li key={key}>
                <Link
                  href={`/shop?cat=${key}`}
                  onClick={close}
                  className="block rounded-md px-2 py-2 text-sm text-foreground/80 transition-colors hover:bg-mist hover:text-gold-ink"
                >
                  {CATEGORY_LABELS[key]}
                </Link>
              </li>
            ))}
          </ul>
        </NavGroup>

        <NavGroup title="Collections">
          <ul className="space-y-1">
            {COLLECTIONS.map((collection) => (
              <li key={collection.slug}>
                <Link
                  href={`/shop?collection=${collection.slug}`}
                  onClick={close}
                  className="block rounded-md px-2 py-2 transition-colors hover:bg-mist"
                >
                  <span className="block text-sm text-foreground/80">{collection.title}</span>
                  <span className="mt-0.5 block text-xs text-slate-500">{collection.tagline}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/collections"
                onClick={close}
                className="block rounded-md px-2 py-2 text-sm font-medium text-gold-ink transition-colors hover:bg-mist"
              >
                View all collections
              </Link>
            </li>
          </ul>
        </NavGroup>

        {[about, contact].map((item) =>
          item ? (
            <Link
              key={item.label}
              href={item.href}
              onClick={close}
              className="block border-b border-border py-3.5 text-sm font-medium text-foreground transition-colors hover:text-gold-ink"
            >
              {item.label}
            </Link>
          ) : null
        )}
      </nav>

      {/* Secondary links */}
      <div className="mt-6">
        <p className="label-xs mb-3 text-slate-500">More from Lumière</p>
        <ul className="space-y-1">
          {SECONDARY_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={close}
                className="flex items-center justify-between rounded-md px-2 py-2 text-sm text-foreground/80 transition-colors hover:bg-mist hover:text-gold-ink"
              >
                {link.label}
                <ArrowRight className="h-3.5 w-3.5 text-slate-400" aria-hidden />
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/account"
              onClick={close}
              className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground/80 transition-colors hover:bg-mist hover:text-gold-ink"
            >
              <Package className="h-4 w-4 text-gold-ink" aria-hidden />
              Track my orders
            </Link>
          </li>
        </ul>
      </div>

      {/* Preferences */}
      <div className="mt-7 space-y-5 border-t border-border pt-6">
        <CurrencySwitcher />
        <ThemeToggle withLabel />
      </div>
    </Sheet>
  );
}
