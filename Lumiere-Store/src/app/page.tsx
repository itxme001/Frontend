"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  HandHeart,
  Leaf,
  Quote,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProductGrid } from "@/components/catalog/product-grid";
import { Rating } from "@/components/ui/rating";
import { MaskReveal, Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/cursor";
import { CurtainImage } from "@/components/motion/curtain-image";
import { Parallax } from "@/components/motion/parallax";
import { Counter } from "@/components/motion/counter";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { COLLECTIONS, countCollection } from "@/data/collections";
import {
  CATEGORY_LABELS,
  CATEGORY_TAGLINES,
  products,
  type ProductCategory,
} from "@/data/products";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const TRUST = [
  { Icon: Truck, text: "Complimentary express shipping over $300" },
  { Icon: RotateCcw, text: "30-day returns, no questions asked" },
  { Icon: ShieldCheck, text: "Secure, encrypted checkout" },
  { Icon: Leaf, text: "Plastic-free, carbon-offset delivery" },
  { Icon: HandHeart, text: "Made by named artisans" },
  { Icon: Award, text: "Free repairs for two years" },
];

const HOUSE_FACTS = [
  { value: 120, suffix: "+", label: "Artisan partners" },
  { value: 16, suffix: "", label: "Countries sourced" },
  { value: 92, suffix: "%", label: "Customers who return" },
];

const REVIEWS = [
  {
    quote:
      "The wool overcoat is the first piece of clothing I have owned that I would genuinely call an heirloom. Three winters in and it still looks new.",
    name: "Sara Ahmed",
    detail: "Verified purchase · Wool Overcoat",
    rating: 5,
  },
  {
    quote:
      "I asked about the origin of the silk and received a straight answer with the mill's name within a day. That transparency is rare.",
    name: "Daniel Okafor",
    detail: "Verified purchase · Silk Charmeuse Blouse",
    rating: 5,
  },
  {
    quote:
      "Beautiful packaging, no plastic, and the candle arrived intact. It has become the scent of our whole apartment.",
    name: "Mei Lin",
    detail: "Verified purchase · Champagne Gold Candle",
    rating: 4,
  },
];

const NOTES = [
  {
    title: "Why we make thirty-three things",
    kind: "Craft",
    read: "6 min read",
    image: "/photos/editorial/journal-1.webp",
  },
  {
    title: "European linen, and what it truly costs",
    kind: "Materials",
    read: "8 min read",
    image: "/photos/editorial/journal-2.webp",
  },
  {
    title: "The hands behind the atelier",
    kind: "People",
    read: "5 min read",
    image: "/photos/editorial/journal-3.webp",
  },
];

/**
 * The catalogue's `collection.image` paths are legacy and no longer resolve.
 * Map each edit to a live editorial photograph so nothing renders broken.
 */
const COLLECTION_IMAGES: Record<string, string> = {
  "summer-2026": "/photos/editorial/journal-featured.webp",
  "best-sellers": "/photos/editorial/about-hero.webp",
  "new-in": "/photos/editorial/story-hero.webp",
  "gift-edit": "/photos/editorial/founder.webp",
  essentials: "/photos/editorial/journal-6.webp",
  "final-sale": "/photos/editorial/journal-4.webp",
};

const CATEGORY_TILES: { category: ProductCategory; image: string }[] = [
  { category: "apparel", image: "/photos/editorial/atelier.webp" },
  { category: "accessories", image: "/photos/editorial/craft.webp" },
  { category: "living", image: "/photos/editorial/sourcing.webp" },
  { category: "fragrance", image: "/photos/editorial/packing.webp" },
];

/* ------------------------------------------------------------------ */
/*  Motion primitives                                                  */
/* ------------------------------------------------------------------ */

/**
 * Staggered word reveal — each word rises out of its own mask with a
 * short delay. Reduced motion renders the plain, fully-readable line.
 */
function WordStagger({
  words,
  className,
  baseDelay = 0,
}: {
  words: string[];
  className?: string;
  baseDelay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <span className={className}>{words.join(" ")}</span>;

  return (
    <span className={cn("block", className)}>
      {words.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
              className="inline-block will-change-transform"
              initial={{ y: "112%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: baseDelay + i * 0.09 }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </span>
  );
}

/** Framer-motion hover zoom that simply renders plain under reduced motion. */
function HoverZoom({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.07 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function CategoryTile({
  category,
  image,
  index,
}: {
  category: ProductCategory;
  image: string;
  index: number;
}) {
  const count = products.filter((p) => p.category === category).length;

  return (
    <Link
      href={`/shop?cat=${category}`}
      className="category-tile group relative block h-[24rem] overflow-hidden bg-obsidian sm:h-[28rem] lg:h-[32rem]"
    >
      <div className="absolute inset-0">
        <HoverZoom className="h-full w-full">
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
            unoptimized
          />
        </HoverZoom>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/30 to-obsidian/10" />
      <div className="relative flex h-full flex-col justify-end p-6 sm:p-8">
        <span className="label-xs text-gold">0{index + 1}</span>
        <h3 className="mt-3 font-serif text-3xl leading-tight text-silk sm:text-4xl">
          {CATEGORY_LABELS[category]}
        </h3>
        <p className="mt-2 text-sm text-silk/55">{CATEGORY_TAGLINES[category]}</p>
        <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4">
          <span className="text-xs uppercase tracking-[0.16em] text-silk/45">
            {count} pieces
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-obsidian">
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Homepage                                                           */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  const featured = products.filter((p) => p.isFeatured).slice(0, 8);
  const categories = Object.keys(CATEGORY_LABELS) as ProductCategory[];

  /* ── GSAP scroll-triggered animation ─────────────────────────────── */
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Section headers + standalone blocks — quiet fade up.
        gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 36 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        // Category tiles — gentle stagger up.
        gsap.utils.toArray<HTMLElement>(".category-tile").forEach((el, i) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 48 },
            {
              opacity: 1,
              y: 0,
              duration: 0.95,
              ease: "power3.out",
              delay: (i % 4) * 0.08,
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        // Collection cards — slide in from the right.
        gsap.utils.toArray<HTMLElement>(".collection-card").forEach((el, i) => {
          gsap.fromTo(
            el,
            { opacity: 0, x: 72 },
            {
              opacity: 1,
              x: 0,
              duration: 0.85,
              ease: "power3.out",
              delay: (i % 3) * 0.08,
              scrollTrigger: {
                trigger: el,
                start: "top 92%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        // Editorial rules draw themselves in.
        gsap.utils.toArray<HTMLElement>(".gsap-rule").forEach((el) => {
          gsap.fromTo(
            el,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              duration: 1.2,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: el,
                start: "top 94%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      });

      ScrollTrigger.refresh();
    });

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* ═══════════════ 1 · HERO ═══════════════ */}
      <section className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-obsidian px-4 py-28 text-center sm:px-6">
        <Parallax className="absolute inset-0 -z-10" speed={0.12} scale={1.15}>
          <Image
            src="/photos/editorial/home-hero.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            unoptimized
          />
        </Parallax>
        <div className="absolute inset-0 -z-10 bg-obsidian/45" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-obsidian via-obsidian/35 to-obsidian/10" />
        <div
          aria-hidden
          className="absolute left-1/2 top-0 h-px w-[72%] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/50 to-transparent"
        />

        <div className="relative w-full max-w-5xl">
          <p className="label-xs text-gold">
            <MaskReveal delay={0.1}>Maison Lumière · Est. 2016</MaskReveal>
          </p>

          <h1 className="display mx-auto mt-8 max-w-4xl text-silk">
            <WordStagger words={["Quiet", "luxury,"]} baseDelay={0.25} />
            <WordStagger
              words={["made", "to", "last."]}
              baseDelay={0.6}
              className="mt-2 text-gold-light italic"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.05 }}
            className="lede mx-auto mt-8 max-w-xl text-silk/65"
          >
            Small-batch pieces in traceable silk, linen and leather — cut slowly,
            finished by hand, and made to outlast the season they were born in.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
            className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Magnetic>
              <Link
                href="/shop"
                className="inline-flex h-14 items-center bg-gold px-10 text-xs font-medium uppercase tracking-[0.18em] text-obsidian transition-all hover:bg-gold-light hover:shadow-[0_0_50px_-12px_rgba(200,164,77,0.7)]"
              >
                Shop the collection
              </Link>
            </Magnetic>
            <Link
              href="/story"
              className="inline-flex h-14 items-center border border-silk/25 px-10 text-xs font-medium uppercase tracking-[0.18em] text-silk transition-all hover:border-gold hover:text-gold"
            >
              Our story
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.32em] text-silk/40">Scroll</span>
          <span className="relative block h-14 w-px overflow-hidden bg-white/10">
            <span className="scroll-cue-line absolute inset-x-0 block h-6 bg-gold" />
          </span>
        </div>
      </section>

      {/* ═══════════════ 2 · TRUST TICKER ═══════════════ */}
      <section data-trust-ticker className="reveal-up border-y border-border bg-shell py-5">
        <div className="overflow-hidden">
          <div className="marquee-track items-center">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex shrink-0 items-center"
                aria-hidden={copy === 1}
              >
                {TRUST.map(({ Icon, text }) => (
                  <span
                    key={text}
                    className="flex shrink-0 items-center gap-3 border-r border-border px-8 text-[11px] uppercase tracking-[0.18em] text-slate-500"
                  >
                    <Icon className="h-3.5 w-3.5 text-gold-ink" aria-hidden />
                    {text}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 3 · FEATURED PRODUCTS ═══════════════ */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <header className="reveal-up mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label-xs text-gold-ink">New arrivals</p>
              <h2 className="headline mt-3">New &amp; noteworthy</h2>
            </div>
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-500 transition-colors hover:text-gold-ink"
            >
              View all {products.length} pieces
              <ArrowRight
                className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </header>

          <ProductGrid items={featured} />
        </div>
      </section>

      <div className="gsap-rule mx-auto h-px w-[min(1400px,92%)] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      {/* ═══════════════ 4 · CATEGORY SHOWCASE ═══════════════ */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <header className="reveal-up mb-12 max-w-2xl">
            <p className="label-xs text-gold-ink">The house</p>
            <h2 className="headline mt-3">Four ways in</h2>
            <p className="mt-5 leading-relaxed text-slate-500">
              Apparel, objects and scent — each drawn from the same short list of
              fibres, and each made to be kept rather than replaced.
            </p>
          </header>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORY_TILES.map(({ category, image }, index) => (
              <CategoryTile
                key={category}
                category={category}
                image={image}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 5 · COLLECTIONS PREVIEW ═══════════════ */}
      <section className="border-y border-border bg-shell py-20 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <header className="reveal-up mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label-xs text-gold-ink">Curated edits</p>
              <h2 className="headline mt-3">Six ways to shop the house</h2>
            </div>
            <Link
              href="/collections"
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-500 transition-colors hover:text-gold-ink"
            >
              Every collection
              <ArrowRight
                className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </header>
        </div>

        {/* Horizontal rail — native scroll on mobile, parallax depth throughout */}
        <div className="overflow-x-auto overscroll-x-contain pb-2 scrollbar-hide snap-x snap-mandatory">
          <div className="flex w-max gap-5 px-4 sm:px-6 lg:px-8">
            {COLLECTIONS.map((collection, index) => (
              <Link
                key={collection.slug}
                href={`/shop?collection=${collection.slug}`}
                className="collection-card group relative block h-[28rem] w-[20rem] shrink-0 snap-start overflow-hidden bg-obsidian sm:h-[32rem] sm:w-[24rem]"
              >
                <Parallax className="absolute inset-0" speed={0.1} scale={1.15}>
                  <Image
                    src={COLLECTION_IMAGES[collection.slug] ?? collection.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 84vw, (max-width: 1024px) 52vw, 24vw"
                    className="object-cover"
                    unoptimized
                  />
                </Parallax>
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/30 to-obsidian/10" />

                <div className="relative flex h-full flex-col justify-end p-7">
                  <span className="label-xs text-gold">
                    0{index + 1} · {collection.tagline}
                  </span>
                  <h3 className="mt-3 font-serif text-2xl text-silk sm:text-3xl">
                    {collection.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-silk/55">
                    {collection.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4">
                    <span className="text-xs uppercase tracking-[0.16em] text-silk/45">
                      {countCollection(collection, products)} pieces
                    </span>
                    <ArrowRight
                      className="h-4 w-4 text-gold transition-transform duration-500 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 6 · BRAND STORY ═══════════════ */}
      <section className="border-b border-border bg-mist py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
          <div className="reveal-up relative order-2 lg:order-1">
            <CurtainImage
              src="/photos/editorial/founder.webp"
              alt="Ayesha Rahman, founder of Lumière, in the atelier"
              ratio="3/4"
            />
            <div className="absolute -bottom-6 -right-4 hidden bg-obsidian px-7 py-6 sm:block lg:-right-8">
              <p className="font-serif text-3xl text-gold">2016</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-silk/50">
                Founded in Lahore
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="label-xs text-gold-ink">The house</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="headline mt-4">
                A house built on{" "}
                <span className="italic text-gold-ink">intention</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="lede mt-6">
                Lumière began with a question we could not answer for years: could
                beautiful things be made without taking from the people who make
                them? So we built the opposite of a fast-fashion label — small
                runs, a short supply chain, and a name for every pair of hands
                involved.
              </p>
            </Reveal>

            <dl className="mt-12 grid grid-cols-3 gap-8 border-t border-border pt-10">
              {HOUSE_FACTS.map((fact) => (
                <div key={fact.label}>
                  <Counter
                    value={fact.value}
                    suffix={fact.suffix}
                    className="block font-serif text-3xl tabular-nums text-gold-ink sm:text-4xl"
                  />
                  <span className="mt-2 block text-[11px] uppercase tracking-[0.14em] text-slate-500">
                    {fact.label}
                  </span>
                </div>
              ))}
            </dl>

            <Reveal delay={0.24}>
              <Link
                href="/about"
                className="group mt-12 inline-flex h-14 items-center gap-3 border border-foreground/15 px-8 text-xs font-medium uppercase tracking-[0.16em] text-foreground transition-all hover:border-gold-ink hover:text-gold-ink"
              >
                More about the house
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ 7 · TESTIMONIALS ═══════════════ */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <header className="reveal-up mb-12 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="label-xs text-gold-ink">Verified reviews</p>
              <h2 className="headline mt-3">Loved, then loved again</h2>
              <p className="mt-5 leading-relaxed text-slate-500">
                Every review below comes from a confirmed order. We publish the
                four-star ones too.
              </p>
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <Rating value={4.9} count={2547} />
              <span className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                4.9 average across {categories.length} departments
              </span>
            </div>
          </header>

          <Stagger className="grid gap-6 lg:grid-cols-3">
            {REVIEWS.map((review, i) => (
              <StaggerItem
                as="figure"
                key={review.name}
                className="flex h-full flex-col border border-border bg-card p-8"
              >
                <div className="flex items-center justify-between">
                  <Rating value={review.rating} />
                  <span className="label-xs text-slate-400">0{i + 1}</span>
                </div>
                <Quote className="mt-6 h-6 w-6 text-gold/50" aria-hidden />
                <blockquote className="mt-4 flex-1 font-serif text-xl leading-relaxed text-foreground/85">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 border-t border-border pt-5">
                  <p className="font-medium">{review.name}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-slate-500">
                    {review.detail}
                  </p>
                </figcaption>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══════════════ 8 · JOURNAL PREVIEW ═══════════════ */}
      <section className="border-t border-border bg-shell py-20 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <header className="reveal-up mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label-xs text-gold-ink">From the journal</p>
              <h2 className="headline mt-3">Notes on slow craft</h2>
            </div>
            <Link
              href="/journal"
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-500 transition-colors hover:text-gold-ink"
            >
              All notes
              <ArrowRight
                className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </header>

          <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {NOTES.map((note) => (
              <StaggerItem as="article" key={note.title}>
                <Link href="/journal" className="group block">
                  <div className="overflow-hidden bg-mist">
                    <HoverZoom className="relative aspect-[3/2] w-full overflow-hidden">
                      <Image
                        src={note.image}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                        unoptimized
                      />
                    </HoverZoom>
                  </div>
                  <div className="mt-5 flex items-center gap-3">
                    <span className="label-xs text-gold-ink">{note.kind}</span>
                    <span aria-hidden className="h-px w-6 bg-gold/40" />
                    <span className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
                      {note.read}
                    </span>
                  </div>
                  <h3 className="mt-3 max-w-[26ch] font-serif text-2xl leading-snug text-foreground transition-colors group-hover:text-gold-ink">
                    {note.title}
                  </h3>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══════════════ 9 · NEWSLETTER ═══════════════ */}
      <section className="border-y border-white/10 bg-obsidian py-20 sm:py-28">
        <NewsletterForm />
      </section>

      {/* ═══════════════ 10 · FINAL CTA ═══════════════ */}
      <section className="relative isolate overflow-hidden bg-obsidian">
        <Parallax className="absolute inset-0 -z-10" speed={0.08} scale={1.15}>
          <Image
            src="/photos/editorial/home-hero.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            unoptimized
          />
        </Parallax>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-obsidian/60 via-obsidian/40 to-obsidian" />
        <div
          aria-hidden
          className="absolute left-1/2 top-0 h-px w-[72%] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        />

        <div className="relative mx-auto max-w-3xl px-4 py-28 text-center sm:px-6 sm:py-36">
          <Reveal>
            <span className="label-xs inline-flex items-center gap-2 text-gold">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              The house of Lumière
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display mt-6 text-silk">
              Buy less.
              <br />
              <span className="italic text-gold-light">Choose well.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-lg text-lg leading-relaxed text-silk/60">
              Free express shipping over $300, 30-day returns, and a care team
              that answers within one business day.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
              <Magnetic>
                <Link
                  href="/shop"
                  className="inline-flex h-14 w-full items-center justify-center bg-gold px-10 text-xs font-medium uppercase tracking-[0.18em] text-obsidian transition-all hover:bg-gold-light hover:shadow-[0_0_50px_-12px_rgba(200,164,77,0.7)] sm:w-auto"
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
