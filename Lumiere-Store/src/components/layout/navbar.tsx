"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/store/cart-store";
import { useAuth } from "@/store/auth-context";
import { useCurrency } from "@/store/currency-context";
import { CartDrawer } from "@/components/cart/drawer";
import { MegaPanel } from "@/components/layout/mega-menu";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { PRIMARY_NAV, isNavItemActive } from "@/lib/navigation";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

const MEGA_CLOSE_DELAY = 140;

/** Brand wordmark rendered with letter-spacing for luxury feel. */
function Wordmark({ compact }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Lumière — home"
      className={cn(
        "font-serif font-medium tracking-[0.18em] text-foreground transition-opacity hover:opacity-75",
        compact ? "text-lg" : "text-xl"
      )}
    >
      LUM
      <span className="text-gold-ink">I</span>
      ÈRE
    </Link>
  );
}

/** Small dot-badge showing count, used on cart & wishlist icons. */
function CountBadge({ value }: { value: number }) {
  return (
    <span
      aria-hidden
      className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-ink px-1 text-[10px] font-bold text-white"
    >
      {value}
    </span>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { itemCount, wishlist } = useCart();
  const { user } = useAuth();
  const { format } = useCurrency();

  const [cartOpen, setCartOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openMega, setOpenMega] = React.useState<string | null>(null);
  const [scrolled, setScrolled] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const searchRef = React.useRef<HTMLInputElement>(null);
  const navRegionRef = React.useRef<HTMLDivElement>(null);
  const closeTimer = React.useRef<number | null>(null);

  /* ---------- mega menu timers ---------- */
  const cancelClose = React.useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = React.useCallback(() => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpenMega(null), MEGA_CLOSE_DELAY);
  }, [cancelClose]);

  React.useEffect(() => cancelClose, [cancelClose]);

  /* ---------- close everything on navigation ---------- */
  React.useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setOpenMega(null);
  }, [pathname]);

  /* ---------- glassmorphism once scrolled ---------- */
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------- keyboard: ⌘K / Ctrl+K opens search, Escape closes layers ---------- */
  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setOpenMega(null);
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  React.useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 60);
  }, [searchOpen]);

  /* ---------- close the mega panel when focus leaves the nav region ---------- */
  function handleNavBlur(event: React.FocusEvent<HTMLDivElement>) {
    const next = event.relatedTarget as Node | null;
    if (!next || !navRegionRef.current?.contains(next)) setOpenMega(null);
  }

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter((p) =>
        `${p.name} ${p.category} ${p.description} ${(p.tags ?? []).join(" ")}`
          .toLowerCase()
          .includes(q)
      )
      .slice(0, 8);
  }, [query]);

  function submitSearch(productName?: string) {
    const q = (productName ?? query).trim();
    if (!q) return;
    setSearchOpen(false);
    setQuery("");
    router.push(`/shop?q=${encodeURIComponent(q)}`);
  }

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300",
          scrolled
            ? "border-border/60 bg-background/85 shadow-[0_1px_0_0_rgba(0,0,0,0.06)] backdrop-blur-md"
            : "border-border bg-background"
        )}
      >
        {/* Slim announcement bar — gold accent on left */}
        <div className="relative overflow-hidden bg-obsidian">
          <div className="absolute left-0 top-0 h-full w-1 bg-gold" aria-hidden />
          <div className="px-4 py-2 text-center text-[11px] uppercase tracking-[0.18em] text-silk/90">
            Complimentary express shipping on orders over $300
          </div>
        </div>

        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
          {/* Logo */}
          <Wordmark />

          {/* Desktop navigation */}
          <div
            ref={navRegionRef}
            className="hidden lg:block"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            onBlur={handleNavBlur}
          >
            <nav aria-label="Primary">
              <ul className="flex items-center gap-10">
                {PRIMARY_NAV.map((item) => {
                  const active = isNavItemActive(pathname, item.href);
                  const megaOpen = Boolean(item.mega) && openMega === item.mega?.id;

                  return (
                    <li
                      key={item.label}
                      onMouseEnter={() => {
                        cancelClose();
                        setOpenMega(item.mega ? item.mega.id : null);
                      }}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        aria-expanded={item.mega ? megaOpen : undefined}
                        aria-controls={item.mega ? `mega-${item.mega.id}` : undefined}
                        aria-haspopup={item.mega ? "true" : undefined}
                        onFocus={() => {
                          cancelClose();
                          setOpenMega(item.mega ? item.mega.id : null);
                        }}
                        className={cn(
                          "relative inline-flex items-center gap-1 py-2 text-xs font-medium uppercase tracking-[0.14em]",
                          "transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-gold after:transition-all after:duration-300",
                          active
                            ? "text-foreground after:w-full"
                            : "text-slate-500 after:w-0 hover:text-foreground hover:after:w-full",
                          megaOpen && !active && "text-foreground after:w-full"
                        )}
                      >
                        {item.label}
                        {item.mega ? (
                          <ChevronDown
                            className={cn(
                              "h-3 w-3 transition-transform duration-300",
                              megaOpen && "rotate-180"
                            )}
                            aria-hidden
                          />
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {PRIMARY_NAV.map((item) =>
              item.mega ? (
                <MegaPanel key={item.mega.id} menu={item.mega} open={openMega === item.mega.id} />
              ) : null
            )}
          </div>

          {/* Utility actions */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              aria-keyshortcuts="Meta+K Control+K"
              className="group flex items-center gap-2 rounded-full p-2 text-slate-500 transition-colors hover:bg-mist hover:text-foreground"
            >
              <Search className="h-5 w-5" aria-hidden />
              <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-[10px] font-medium text-slate-400 xl:inline-block">
                ⌘K
              </kbd>
            </button>

            {/* Wishlist */}
            <Link
              href="/account"
              aria-label={`Wishlist, ${wishlist.length} saved`}
              className="relative rounded-full p-2 text-slate-500 transition-colors hover:bg-mist hover:text-foreground"
            >
              <Heart className="h-5 w-5" aria-hidden />
              {wishlist.length > 0 && <CountBadge value={wishlist.length} />}
            </Link>

            {/* Currency switcher lives in mobile nav */}

            {/* Account / Login */}
            <Link
              href={user ? "/account" : "/login"}
              aria-label={user ? `Account, signed in as ${user.name}` : "Login or create an account"}
              className="ml-1 hidden items-center gap-2 rounded-full bg-obsidian py-1.5 pl-1.5 pr-4 text-xs font-semibold uppercase tracking-[0.12em] text-silk transition-colors hover:bg-gold-ink sm:inline-flex"
            >
              <span
                aria-hidden
                className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-obsidian"
              >
                {(user?.name ?? "L").charAt(0).toUpperCase()}
              </span>
              {user ? user.name.split(" ")[0] : "Login"}
            </Link>

            {/* Cart */}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Open shopping bag, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
              className="relative rounded-full p-2 text-slate-500 transition-colors hover:bg-mist hover:text-foreground"
            >
              <ShoppingBag className="h-5 w-5" aria-hidden />
              {itemCount > 0 && <CountBadge value={itemCount} />}
            </button>

            {/* Mobile menu */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-dialog"
              className="ml-1 rounded-full p-2 text-foreground transition-colors hover:bg-mist lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {/* Search overlay */}
      {searchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search products"
          className="fixed inset-0 z-[60] bg-obsidian/95 px-4 py-20 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            aria-label="Close search"
            className="absolute right-6 top-6 rounded-full p-2 text-silk/80 transition-colors hover:text-gold"
          >
            <X className="h-7 w-7" aria-hidden />
          </button>

          <div className="mx-auto max-w-2xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitSearch();
              }}
              className="flex items-center gap-3 border-b border-white/15 pb-3"
            >
              <Search className="h-6 w-6 shrink-0 text-gold" aria-hidden />
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the collection…"
                aria-label="Search products"
                className="min-w-0 flex-1 bg-transparent py-3 font-serif text-2xl text-silk outline-none placeholder:text-silk/40"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full border border-gold/40 px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold transition-colors hover:bg-gold hover:text-obsidian"
              >
                Search
              </button>
            </form>

            <div className="mt-6 max-h-[55vh] overflow-y-auto text-silk/90">
              {query && results.length === 0 && (
                <p className="py-4 text-sm text-silk/60">No products matched &ldquo;{query}&rdquo;.</p>
              )}
              {results.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => submitSearch(product.name)}
                  className="flex w-full items-center gap-4 border-b border-white/10 py-3 text-left transition-colors hover:bg-white/5"
                >
                  <Image
                    src={product.heroImage ?? product.image}
                    alt=""
                    width={56}
                    height={70}
                    className="h-14 w-11 rounded object-cover"
                    unoptimized
                  />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-silk">{product.name}</p>
                    <p className="text-xs text-silk/50">{product.category}</p>
                  </div>
                  <span className="text-sm font-semibold text-gold">{format(product.price)}</span>
                </button>
              ))}
              {!query && (
                <p className="py-6 text-sm text-silk/50">Start typing to search the collection.</p>
              )}
            </div>
          </div>
        </div>
      )}

      <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} onSearch={() => setSearchOpen(true)} />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}
