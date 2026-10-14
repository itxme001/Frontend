import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Gem,
  HandHeart,
  Leaf,
  Quote,
  Recycle,
  Scissors,
  Truck,
  Users,
} from "lucide-react";
import { MaskReveal, Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { Parallax } from "@/components/motion/parallax";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Lumière was founded in 2016 on a simple belief: modern luxury should be ethical, sustainable and deeply intentional.",
};

const STATS = [
  { value: 120, suffix: "+", label: "Artisan partners" },
  { value: 16, suffix: "", label: "Countries sourced" },
  { value: 92, suffix: "%", label: "Repeat customers" },
  { value: 2500, suffix: "+", label: "Verified reviews" },
];

const TIMELINE = [
  {
    year: "2016",
    title: "A table, two notebooks, one idea",
    body: "Lumière began in a Lahore apartment with a single question: could beautiful things be made without taking from the people who make them?",
  },
  {
    year: "2018",
    title: "The first atelier",
    body: "We opened a small studio for our inaugural linen collection — twelve pieces, made by four artisans, sold to forty customers.",
  },
  {
    year: "2021",
    title: "The sustainability charter",
    body: "Every partner in our supply chain signed a binding charter covering fair wages, water use, and traceable raw materials.",
  },
  {
    year: "2024",
    title: "Worldwide at last",
    body: "We began shipping to 40 countries with fully carbon-offset express delivery and plastic-free packaging.",
  },
  {
    year: "2026",
    title: "Thirty-three pieces, still slow",
    body: "Our collection is deliberately small. Every item must earn its place, be made to last, and be worth repairing.",
  },
];

const PILLARS = [
  {
    Icon: Leaf,
    title: "Responsible materials",
    body: "Organic cotton, European linen, vegetable-tanned leather and recycled gold. We publish where every fibre comes from.",
  },
  {
    Icon: HandHeart,
    title: "Made by hand",
    body: "No anonymous factory lines. Our pieces pass through the hands of named artisans we visit at least twice a year.",
  },
  {
    Icon: Gem,
    title: "Built to be kept",
    body: "We under-produce on purpose. Fewer, better pieces that hold their shape — and their value — for decades.",
  },
  {
    Icon: Recycle,
    title: "Designed for a second life",
    body: "Free repairs for two years, and a take-back programme that rehomes or recycles every piece we have ever made.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Source",
    body: "We work only with mills and tanneries we have visited ourselves, choosing fibre that can be traced to a single region.",
    image: "/photos/editorial/sourcing.webp",
  },
  {
    step: "02",
    title: "Craft",
    body: "Pattern-cutting, hand-finishing and quality control happen in our own atelier, never outsourced to the lowest bidder.",
    image: "/photos/editorial/craft.webp",
  },
  {
    step: "03",
    title: "Deliver",
    body: "Each order is wrapped by hand in recycled tissue, dispatched within 48 hours, and offset in full.",
    image: "/photos/editorial/packing.webp",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "The wool overcoat is the first piece of clothing I have owned that I would genuinely call an heirloom. Three winters in and it still looks new.",
    name: "Sara Ahmed",
    detail: "Verified purchase · Herringbone Wool Overcoat",
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

export default function StoryPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-obsidian">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/photos/editorial/story-hero.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-obsidian/30" />
        <div className="relative mx-auto max-w-4xl px-4 py-28 text-center sm:py-36">
          <span className="label-xs text-gold">Since 2016</span>
          <h1 className="mt-5 font-serif text-5xl leading-[1.05] text-silk sm:text-7xl">
            Crafted slowly,
            <br />
            <span className="text-gold-light">worn for years</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-silk/70">
            Lumière is a small house of considered design. We make thirty-three pieces — no more —
            and we make each one to outlast the season it was born in.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
              <Link href="/shop">
                Explore the Collection
              </Link>
            </Button>
            <Button asChild
                variant="outline"
                size="lg"
                className="w-full border-silk text-silk hover:bg-silk hover:text-obsidian sm:w-auto"
              >
              <Link href="/journal">
                Read the Journal
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-mist">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-12 sm:px-6 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <Counter
                value={stat.value}
                suffix={stat.suffix}
                className="block font-serif text-3xl text-gold-ink sm:text-4xl"
              />
              <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Manifesto */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <span className="label-xs text-gold-ink">Our Belief</span>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-foreground sm:text-4xl">
              Luxury should leave things better than it found them
            </h2>
            <p className="mt-6 leading-relaxed text-slate-500">
              We started Lumière because we could not find what we wanted to wear: pieces that were
              beautiful without being disposable, and honest about how they were made.
            </p>
            <p className="mt-4 leading-relaxed text-slate-500">
              So we built the opposite of a fast-fashion label. We produce in small runs, keep our
              supply chain short enough to know every name in it, and price fairly for the people
              doing the work — not for a marketing budget.
            </p>
            <p className="mt-4 leading-relaxed text-slate-500">
              The result is a wardrobe that asks less of the planet and gives more, year after year.
            </p>
          </div>

          <figure className="rounded-none border border-border bg-mist p-8">
            <Quote className="h-8 w-8 text-gold" aria-hidden />
            <blockquote className="mt-5 font-serif text-2xl leading-snug text-foreground">
              “The most sustainable garment is the one you already own — and the second most is the
              one worth keeping.”
            </blockquote>
            <figcaption className="mt-6 text-sm text-slate-500">
              <strong className="text-foreground">Ayesha Rahman</strong> — Founder &amp; Creative
              Director
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-mist py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <header className="mb-12 text-center">
            <span className="label-xs text-gold-ink">What We Stand For</span>
            <h2 className="mt-4 font-serif text-3xl text-foreground sm:text-4xl">Four Commitments</h2>
          </header>
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map(({ Icon, title, body }) => (
              <StaggerItem
                as="article"
                key={title}
                className="rounded-none border border-border bg-card p-6"
              >
                <h3 className="flex items-center gap-2.5 font-serif text-lg text-foreground">
                  <Icon className="h-5 w-5 shrink-0 text-gold-ink" aria-hidden />
                  {title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-500">{body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <header className="mb-14 text-center">
          <span className="label-xs text-gold-ink">The Long Way Round</span>
          <h2 className="mt-4 font-serif text-3xl text-foreground sm:text-4xl">Ten Years, Five Dues Paid</h2>
        </header>

        <ol className="relative border-l border-border pl-8">
          {TIMELINE.map((item) => (
            <li key={item.year} className="relative pb-12 last:pb-0">
              <span
                aria-hidden
                className="absolute -left-[41px] flex h-5 w-5 items-center justify-center rounded-full border border-gold bg-card"
              >
                <span className="h-2 w-2 rounded-full bg-gold" />
              </span>
              <p className="font-serif text-2xl text-gold-ink">{item.year}</p>
              <h3 className="mt-1 font-serif text-xl text-foreground">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-slate-500">{item.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Process */}
      <section className="bg-mist py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <header className="mb-12 text-center">
            <span className="label-xs text-gold-ink">How It Is Made</span>
            <h2 className="mt-4 font-serif text-3xl text-foreground sm:text-4xl">
              Three Steps, No Shortcuts
            </h2>
          </header>

          <Stagger className="grid gap-8 lg:grid-cols-3">
            {PROCESS.map(({ step, title, body, image }) => (
              <StaggerItem
                as="article"
                key={step}
                className="overflow-hidden rounded-none border border-border bg-card"
              >
                <Parallax className="h-52 overflow-hidden" speed={0.06} scale={1.1}>
                  <Image
                    src={image}
                    alt=""
                    width={400}
                    height={208}
                    className="h-52 w-full object-cover"
                    unoptimized
                  />
                </Parallax>
                <div className="p-6">
                  <span className="font-serif text-3xl text-gold/60">{step}</span>
                  <h3 className="mt-2 font-serif text-xl text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Founder */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1fr]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/photos/editorial/founder.webp"
            alt="Portrait, founder of Lumière"
            className="w-full rounded-none object-cover"
          />
          <div>
            <span className="label-xs text-gold-ink">A Note From the Founder</span>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-foreground sm:text-4xl">
              “I wanted to know who made my clothes. So I became the answer.”
            </h2>
            <p className="mt-6 leading-relaxed text-slate-500">
              I spent six years in sourcing for larger labels, and I saw how quickly good intentions
              dissolve when a margin is at stake. Lumière is my attempt to build a business where
              the margin and the intention point the same direction.
            </p>
            <p className="mt-4 leading-relaxed text-slate-500">
              That means saying no a lot: no to cheaper fibre, no to a fourth production run, no to
              a calendar of constant newness. It means our customers wait occasionally. We think
              that is a fair trade.
            </p>
            <div className="mt-8">
              <Button variant="outline" asChild>
                <Link href="/contact">
                  Get in touch <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-mist py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <header className="mb-12 text-center">
            <span className="label-xs text-gold-ink">Verified Reviews</span>
            <h2 className="mt-4 font-serif text-3xl text-foreground sm:text-4xl">
              What Our Customers Say
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-500">
              Every review below comes from a confirmed order. We publish the four-star ones too.
            </p>
          </header>

          <Stagger className="grid gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <StaggerItem
                as="figure"
                key={t.name}
                className="flex flex-col rounded-none border border-border bg-card p-7"
              >
                <Rating value={t.rating} />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 border-t border-border pt-4 text-sm">
                  <strong className="text-foreground">{t.name}</strong>
                  <p className="mt-0.5 text-xs text-slate-500">{t.detail}</p>
                </figcaption>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="rounded-none bg-obsidian px-6 py-16 text-center sm:px-12">
          <Users className="mx-auto h-8 w-8 text-gold" aria-hidden />
          <h2 className="mt-5 font-serif text-3xl text-silk sm:text-4xl">
            Join the people who buy less, better
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-silk/60">
            Thirty-three pieces, made by hand, delivered worldwide. See what is in the collection
            right now.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
              <Link href="/shop">
                <Scissors className="h-4 w-4" aria-hidden /> Shop the Collection
              </Link>
            </Button>
            <Button asChild
                variant="outline"
                size="lg"
                className="w-full border-silk text-silk hover:bg-silk hover:text-obsidian sm:w-auto"
              >
              <Link href="/contact">
                <Truck className="h-4 w-4" aria-hidden /> Shipping &amp; Returns
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
