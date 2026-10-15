"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Award, HandHeart, Leaf, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { ProductGrid } from "@/components/catalog/product-grid";
import { Rating } from "@/components/ui/rating";
import { Parallax } from "@/components/motion/parallax";
import { Counter } from "@/components/motion/counter";
import { Magnetic } from "@/components/motion/cursor";
import { CurtainImage } from "@/components/motion/curtain-image";
import { Reveal, Stagger, StaggerItem, MaskReveal } from "@/components/motion/reveal";
import { COLLECTIONS, countCollection } from "@/data/collections";
import { CATEGORY_LABELS, products, type ProductCategory } from "@/data/products";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TRUST = [
  { Icon: Truck, text: "Free express shipping over $300" },
  { Icon: RotateCcw, text: "30-day returns" },
  { Icon: ShieldCheck, text: "Secure Stripe checkout" },
  { Icon: Leaf, text: "Plastic-free packaging" },
  { Icon: HandHeart, text: "Made by named artisans" },
  { Icon: Award, text: "Free repairs for two years" },
];

const HOUSE_FACTS = [
  { value: 120, suffix: "+", label: "Artisan partners" },
  { value: 16, suffix: "", label: "Countries sourced" },
  { value: 92, suffix: "%", label: "Buy again" },
];

const REVIEWS = [
  {
    quote:
      "The wool overcoat is the first piece of clothing I would genuinely call an heirloom. Three winters in and it still looks new.",
    name: "Sara Ahmed",
    detail: "Herringbone Wool Overcoat",
    rating: 5,
  },
  {
    quote:
      "I asked about the origin of the silk and got the mill's name within a day. That transparency is rare in fashion.",
    name: "Daniel Okafor",
    detail: "Silk Charmeuse Blouse",
    rating: 5,
  },
  {
    quote:
      "Beautiful packaging, no plastic, and the candle arrived intact. It has become the scent of our whole apartment.",
    name: "Mei Lin",
    detail: "Champagne Gold Candle",
    rating: 4,
  },
];

const NOTES = [
  { title: "Why we make thirty-three things", kind: "Craft", image: "/photos/editorial/journal-1.webp" },
  { title: "European linen, and what it costs", kind: "Materials", image: "/photos/editorial/journal-2.webp" },
  { title: "The four hands behind our linen", kind: "People", image: "/photos/editorial/journal-4.webp" },
];

export default function HomePage() {
  const featured = products.filter((p) => p.isFeatured).slice(0, 8);
  const bestsellers = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 4);
  const categories = Object.keys(CATEGORY_LABELS) as ProductCategory[];
  const spotlight = products.find((p) => p.slug === "herringbone-wool-overcoat") ?? products[0];

  // ── GSAP ScrollTrigger animations ──
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    // Section reveal animations
    const reveals = document.querySelectorAll(".reveal-up");
    reveals.forEach((el) => {
      gsap.fromTo(
        el as HTMLElement,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el as HTMLElement,
            start: "top 86%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Horizontal collections scroll — parallax depth on each card
    const collectionCards = document.querySelectorAll(".collection-card");
    collectionCards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Trust ticker — subtle fade-in
    const trustSection = document.querySelector("[data-trust-ticker]");
    if (trustSection) {
      gsap.fromTo(
        trustSection,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: trustSection,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* ─────────── HERO ─────────── */}
      <section className="relative isolate min-h-[100svh] overflow-hidden bg-obsidian">
        <Parallax className="absolute inset-0 -z-10" speed={0.08} scale={1.12}>
          <Image
            src="/photos/editorial/home-hero.webp"
            alt=""
            fill
            className="object-cover opacity-40"
            priority
            unoptimized
          />
        </Parallax>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-obsidian/30 via-obsidian/70 to-obsidian" />
        <div aria-hidden className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-end px-4 pb-20 pt-28 sm:px-6 sm:pb-24">
          <div className="max-w-3xl">
            <Reveal delay={0.15}>
              <p className="label-xs text-gold-light">
                Established 2019 · Milan
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <h1 className="mt-6 display leading-[0.9] text-silk">
                <MaskReveal>Thirty-three</MaskReveal>
                <MaskReveal delay={0.1}>things worth</MaskReveal>
                <MaskReveal delay={0.2}>
                  <span className="text-gold-light italic">keeping.</span>
                </MaskReveal>
              </h1>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="mt-8 text-base leading-relaxed text-silk/55 max-w-lg">
                A small house of considered design. Named makers, traceable materials, and a
                collection cut deliberately short — because beauty doesn&apos;t need volume.
              </p>
            </Reveal>
            <Reveal delay={0.55}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Magnetic>
                  <Link
                    href="/shop"
                    className="inline-flex h-14 items-center bg-gold px-10 text-xs font-medium uppercase tracking-[0.18em] text-obsidian transition-all hover:bg-gold-light hover:shadow-[0_0_40px_-10px_rgba(200,164,77,0.5)]"
                  >
                    Shop the collection
                  </Link>
                </Magnetic>
                <Link
                  href="/collections"
                  className="inline-flex h-14 items-center border border-silk/25 px-10 text-xs font-medium uppercase tracking-[0.18em] text-silk transition-all hover:border-gold hover:text-gold"
                >
                  Browse edits
                </Link>
              </div>
            </Reveal>
          </div>

          <div aria-hidden className="mt-16 flex items-center gap-3 text-silk/30">
            <span className="relative block h-12 w-px overflow-hidden bg-white/10">
              <span className="scroll-cue-line absolute inset-x-0 block h-5 bg-gold" />
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em]">Scroll to explore</span>
          </div>
        </div>
      </section>

      {/* ─────────── TRUST TICKER ─────────── */}
      <section data-trust-ticker className="border-b border-white/5 bg-obsidian py-4">
        <div className="flex overflow-hidden">
          {TRUST.map(({ Icon, text }, i) => (
            <span
              key={text}
              className={cn(
                "flex shrink-0 items-center gap-3 px-10 text-xs uppercase tracking-[0.15em] text-silk/40",
                i < TRUST.length - 1 && "border-r border-white/10"
              )}
            >
              <Icon className="h-3.5 w-3.5 text-gold/70" aria-hidden />
              {text}
            </span>
          ))}
        </div>
      </section>

      {/* ─────────── COLLECTIONS ─────────── */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <div className="reveal-up mb-14 flex items-end justify-between gap-4">
            <div>
              <p className="label-xs text-gold-ink">Curated edits</p>
              <h2 className="headline mt-2">Six ways in</h2>
            </div>
            <Link
              href="/collections"
              className="group inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-gold-ink"
            >
              Every collection
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {COLLECTIONS.map((collection, index) => (
              <Link
                key={collection.slug}
                href={`/shop?collection=${collection.slug}`}
                className={cn(
                  "collection-card group relative flex shrink-0 flex-col justify-end overflow-hidden bg-obsidian p-6 snap-start",
                  index % 2 === 0 ? "h-[32rem] w-[22rem]" : "h-[28rem] w-[22rem] sm:w-[24rem]"
                )}
              >
                <Image
                  src={collection.image}
                  alt=""
                  fill
                  className="object-cover opacity-50 transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 22vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
                <div className="relative z-10">
                  <p className="label-xs text-gold">{collection.tagline}</p>
                  <h3 className="mt-2 font-serif text-3xl text-silk">{collection.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-silk/50">{collection.description}</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.16em] text-silk/40">
                    {countCollection(collection, products)} pieces
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── SPOTLIGHT ─────────── */}
      <section className="border-y border-border bg-mist">
        <div className="mx-auto grid max-w-[1400px] lg:grid-cols-2">
          <CurtainImage
            src={spotlight.heroImage ?? spotlight.image}
            alt={spotlight.name}
            ratio="4/5"
            className="aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[48rem]"
            priority
          />
          <div className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:py-24">
            <Reveal>
              <p className="label-xs text-gold-ink">The piece we are proudest of</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="headline mt-4">{spotlight.name}</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-lg leading-relaxed text-slate-500">{spotlight.description}</p>
            </Reveal>

            <Reveal delay={0.3}>
              <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-border pt-8 text-sm sm:grid-cols-4">
                <div>
                  <dt className="text-slate-500">Material</dt>
                  <dd className="mt-1 font-medium">{spotlight.material}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Rating</dt>
                  <dd className="mt-1 font-medium">{spotlight.rating} · {spotlight.reviews}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Stock</dt>
                  <dd className="mt-1 font-medium">{spotlight.stock} left</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Price</dt>
                  <dd className="mt-1 font-serif text-gold-ink">${spotlight.price.toLocaleString()}</dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Link
                  href={`/shop?q=${encodeURIComponent(spotlight.name)}`}
                  className="inline-flex h-14 items-center bg-foreground px-8 text-xs font-medium uppercase tracking-[0.16em] text-background transition-all hover:bg-gold-ink hover:shadow-lg"
                >
                  View this piece
                </Link>
                <Rating value={spotlight.rating} count={spotlight.reviews} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─────────── CATEGORIES ─────────── */}
      <section className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6">
        <div className="reveal-up mb-12 flex items-end justify-between gap-4">
          <h2 className="headline">Four ways into the house</h2>
          <Link href="/shop" className="text-sm text-slate-500 underline underline-offset-4 hover:text-gold-ink">
            All {products.length} pieces
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="reveal-up lg:col-span-2 lg:row-span-2">
            <CategoryTile category={categories[0]} hero />
          </div>
          {categories.slice(1).map((category) => (
            <div key={category} className="reveal-up">
              <CategoryTile category={category} />
            </div>
          ))}
        </div>
      </section>

      {/* ─────────── FEATURED ─────────── */}
      <section className="mx-auto max-w-[1400px] px-4 pb-24 sm:px-6">
        <div className="reveal-up mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="label-xs text-gold-ink">New arrivals</p>
            <h2 className="headline mt-2">New & noteworthy</h2>
          </div>
          <Link href="/shop" className="text-sm text-slate-500 underline underline-offset-4 hover:text-gold-ink">
            View all
          </Link>
        </div>
        <ProductGrid items={featured} />
      </section>

      {/* ─────────── HOUSE STORY ─────────── */}
      <section className="border-y border-white/10 bg-obsidian py-24">
        <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-4 sm:px-6 lg:grid-cols-2">
          <div className="reveal-up order-2 lg:order-1">
            <p className="label-xs text-gold">Our philosophy</p>
            <h2 className="headline mt-4 text-silk">
              We make thirty-three things. On purpose.
            </h2>
            <p className="mt-6 leading-relaxed text-silk/60">
              Lumière began with a question we could not answer for years: could beautiful things be
              made without taking from the people who make them? So we built the opposite of a
              fast-fashion label. Small runs, short supply chains, and a name for every pair of
              hands involved.
            </p>

            <dl className="mt-12 grid grid-cols-3 gap-8 border-t border-white/10 pt-10">
              {HOUSE_FACTS.map((fact) => (
                <div key={fact.label}>
                  <Counter
                    value={fact.value}
                    suffix={fact.suffix}
                    className="block font-serif text-4xl tabular-nums text-gold"
                  />
                  <span className="mt-2 block text-sm text-silk/50">{fact.label}</span>
                </div>
              ))}
            </dl>

            <Reveal delay={0.3}>
              <Link
                href="/about"
                className="reveal-up mt-12 inline-flex h-14 items-center border border-silk/20 px-8 text-xs font-medium uppercase tracking-[0.16em] text-silk transition-all hover:border-gold hover:text-gold"
              >
                More about the house
              </Link>
            </Reveal>
          </div>

          <div className="reveal-up order-1 lg:order-2">
            <CurtainImage src="/photos/editorial/atelier.webp" alt="The Lumière atelier" ratio="3/4" />
          </div>
        </div>
      </section>

      {/* ─────────── BESTSELLERS ─────────── */}
      <section className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6">
        <div className="reveal-up mb-12 flex items-end justify-between gap-4">
          <div>
            <p className="label-xs text-gold-ink">Customer favorites</p>
            <h2 className="headline mt-2">Most loved</h2>
          </div>
          <Link href="/shop" className="text-sm text-slate-500 underline underline-offset-4 hover:text-gold-ink">
            View all
          </Link>
        </div>
        <ProductGrid items={bestsellers} />
      </section>

      {/* ─────────── REVIEWS ─────────── */}
      <section className="border-y border-border bg-mist py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <div className="reveal-up mb-14 max-w-2xl">
            <p className="label-xs text-gold-ink">Verified reviews</p>
            <h2 className="headline mt-2">2,547 verified reviews</h2>
            <p className="mt-4 leading-relaxed text-slate-500">
              Every review comes from a confirmed order, including the four-star ones.
            </p>
          </div>

          <Stagger className="grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-3">
            {REVIEWS.map((review, i) => (
              <StaggerItem key={review.name} as="figure" className="flex flex-col bg-background p-8">
                <Rating value={review.rating} />
                <blockquote className="mt-5 flex-1 text-base leading-relaxed text-foreground/85">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-5 text-sm">
                  <strong className="font-medium">{review.name}</strong>
                  <p className="mt-1 text-slate-500">{review.detail}</p>
                </figcaption>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─────────── JOURNAL ─────────── */}
      <section className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6">
        <div className="reveal-up mb-12 flex items-end justify-between gap-4">
          <div>
            <p className="label-xs text-gold-ink">From the journal</p>
            <h2 className="headline mt-2">Notes on slow craft</h2>
          </div>
          <Link
            href="/journal"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-gold-ink"
          >
            All notes
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {NOTES.map((note) => (
            <StaggerItem key={note.title} as="article">
              <Link href="/journal" className="group block">
                <div className="overflow-hidden bg-mist">
                  <Image
                    src={note.image}
                    alt=""
                    width={400}
                    height={267}
                    className="aspect-[3/2] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                  />
                </div>
                <p className="label-xs mt-4">{note.kind}</p>
                <h3 className="mt-2 max-w-[24ch] font-serif text-2xl leading-snug">{note.title}</h3>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ─────────── NEWSLETTER ─────────── */}
      <section className="border-y border-border bg-obsidian py-24">
        <NewsletterForm />
      </section>

      {/* ─────────── CLOSING ─────────── */}
      <section className="relative isolate overflow-hidden bg-obsidian">
        <Parallax className="absolute inset-0 -z-10" speed={0.06} scale={1.1}>
          <Image
            src="/photos/editorial/journal-featured.webp"
            alt=""
            fill
            className="object-cover opacity-20"
            unoptimized
          />
        </Parallax>
        <div className="relative mx-auto max-w-3xl px-4 py-32 text-center sm:px-6">
          <Reveal>
            <h2 className="display text-silk">Buy less.</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="reveal-up mx-auto mt-8 max-w-lg text-lg leading-relaxed text-silk/60">
              Free express shipping over $300, 30-day returns, and a care team that answers within
              one business day.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="reveal-up mt-12 flex flex-col justify-center gap-4 sm:flex-row">
              <Magnetic>
                <Link
                  href="/shop"
                  className="inline-flex h-14 w-full items-center justify-center bg-gold px-10 text-xs font-medium uppercase tracking-[0.18em] text-obsidian transition-all hover:bg-gold-light hover:shadow-[0_0_50px_-10px_rgba(200,164,77,0.6)] sm:w-auto"
                >
                  Start shopping
                </Link>
              </Magnetic>
              <Link
                href="/contact"
                className="inline-flex h-14 w-full items-center justify-center border border-silk/25 px-10 text-xs font-medium uppercase tracking-[0.18em] text-silk transition-all hover:border-gold hover:text-gold sm:w-auto"
              >
                Talk to us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function CategoryTile({ category, hero = false }: { category: ProductCategory; hero?: boolean }) {
  const piece = products.find((p) => p.category === category);
  const count = products.filter((p) => p.category === category).length;

  return (
    <Link
      href={`/shop?cat=${category}`}
      className={cn(
        "reveal-up group relative flex items-end overflow-hidden bg-obsidian p-6",
        hero ? "h-[28rem] lg:h-[36rem]" : "h-[16rem]"
      )}
    >
      <Image
        src={`/photos/products/${piece?.slug ?? "lumiere-couture-gown"}-1.webp`}
        alt=""
        fill
        className="object-cover opacity-55 transition-transform duration-700 ease-out group-hover:scale-105"
        sizes={hero ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 640px) 100vw, 33vw"}
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
      <div className="relative z-10 flex w-full items-end justify-between gap-4">
        <div>
          <h3 className={cn("font-serif text-silk", hero ? "text-4xl" : "text-2xl")}>
            {CATEGORY_LABELS[category]}
          </h3>
          <p className="mt-1 text-sm text-silk/50">{count} pieces</p>
        </div>
        <ArrowUpRight
          className="h-5 w-5 shrink-0 text-gold transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          aria-hidden
        />
      </div>
    </Link>
  );
}
