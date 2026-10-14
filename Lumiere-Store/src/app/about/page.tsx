import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Gem,
  HandHeart,
  Leaf,
  Mail,
  MapPin,
  Package,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description:
    "The house of Lumière: who we are today, how we work with artisans, customers and partners, and how to visit or work with us.",
};

const FACTS = [
  { label: "Founded", value: "2016, Lahore" },
  { label: "Headquarters", value: "12 Gulberg III, Lahore" },
  { label: "Ateliers", value: "Lahore · Dubai" },
  { label: "Artisan partners", value: "120+" },
  { label: "Sourcing countries", value: "16" },
  { label: "Shipping countries", value: "40" },
  { label: "Pieces in the collection", value: "33" },
  { label: "Certifications", value: "GOTS · Oeko-Tex · LWG" },
];

const STAKEHOLDERS = [
  {
    Icon: HandHeart,
    title: "With our artisans",
    body: "Named makers on fair contracts, paid above the regional living wage, with at least two studio visits a year.",
  },
  {
    Icon: Gem,
    title: "With our customers",
    body: "Free repairs for the first two years, 30-day returns, and a take-back programme at the end of a piece's life.",
  },
  {
    Icon: Leaf,
    title: "With the planet",
    body: "Traceable fibres, plastic-free dispatch and fully offset shipping. We publish our water and waste figures annually.",
  },
  {
    Icon: Package,
    title: "With our partners",
    body: "Every mill, tannery and factory signs a binding charter on wages, water use and material provenance.",
  },
];

const WORK_WITH_US = [
  {
    Icon: Users,
    title: "Careers",
    body: "We hire slowly and keep people for years. Open roles across atelier, care and studio.",
    cta: "See open roles",
    href: "mailto:careers@lumiere.store?subject=Careers%20at%20Lumi%C3%A8re",
  },
  {
    Icon: Award,
    title: "Press",
    body: "Lookbooks, high-resolution imagery and founder interviews on request.",
    cta: "Contact press",
    href: "mailto:press@lumiere.store?subject=Press%20enquiry",
  },
  {
    Icon: Package,
    title: "Wholesale",
    body: "Selected pieces available to a small number of stockists. Minimum order applies.",
    cta: "Request linesheet",
    href: "mailto:wholesale@lumiere.store?subject=Wholesale%20enquiry",
  },
];

const ATELIERS = [
  {
    city: "Lahore",
    label: "Atelier & showroom",
    address: "12 Gulberg III, Lahore, Pakistan",
    hours: "Mon–Sat · 10:00 – 19:00",
    note: "Visits by appointment",
  },
  {
    city: "Dubai",
    label: "Regional studio",
    address: "Unit 4, Alserkal Avenue, Dubai, UAE",
    hours: "Tue–Sun · 11:00 – 20:00",
    note: "Walk-ins welcome",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-obsidian">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/photos/editorial/about-hero.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-obsidian/40"
        />
        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32">
          <span className="label-xs inline-flex items-center gap-2 text-gold">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            The House
          </span>
          <h1 className="mt-5 font-serif text-5xl leading-tight text-silk sm:text-6xl">
            About Lumière
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-silk/70">
            A small house of considered design, based in Lahore with a studio in Dubai. We make
            thirty-three pieces, and we make each one to be repaired rather than replaced.
          </p>
        </div>
      </section>

      {/* Fact sheet */}
      <section className="border-b border-border bg-mist">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h2 className="label-xs mb-8 text-gold-ink">At a glance</h2>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-6 lg:grid-cols-4">
            {FACTS.map((fact) => (
              <div key={fact.label} className="border-t border-border pt-3">
                <dt className="text-xs uppercase tracking-[0.14em] text-slate-500">{fact.label}</dt>
                <dd className="mt-1.5 text-sm font-medium text-foreground">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Who we answer to */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <header className="mb-12 max-w-2xl">
          <span className="label-xs text-gold-ink">Accountability</span>
          <h2 className="mt-4 font-serif text-3xl text-foreground sm:text-4xl">
            Who we answer to
          </h2>
          <p className="mt-3 leading-relaxed text-slate-500">
            Luxury is a set of obligations, not a price bracket. These are the four we hold
            ourselves to — and the ones we publish numbers for.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2">
          {STAKEHOLDERS.map(({ Icon, title, body }) => (
            <article
              key={title}
              className="flex gap-5 rounded-none border border-border bg-card p-6"
            >
              <Icon className="mt-1 h-5 w-5 shrink-0 text-gold-ink" aria-hidden />
              <div>
                <h3 className="font-serif text-lg text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Work with us */}
      <section className="bg-mist py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <header className="mb-12 text-center">
            <span className="label-xs text-gold-ink">Opportunities</span>
            <h2 className="mt-4 font-serif text-3xl text-foreground sm:text-4xl">Work with us</h2>
          </header>

          <div className="grid gap-6 lg:grid-cols-3">
            {WORK_WITH_US.map(({ Icon, title, body, cta, href }) => (
              <article
                key={title}
                className="flex flex-col rounded-none border border-border bg-card p-6"
              >
                <h3 className="flex items-center gap-2.5 font-serif text-lg text-foreground">
                  <Icon className="h-5 w-5 shrink-0 text-gold-ink" aria-hidden />
                  {title}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-500">{body}</p>
                <a
                  href={href}
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold-ink transition-colors hover:text-foreground"
                >
                  {cta}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Visit */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <header className="mb-12 text-center">
          <span className="label-xs text-gold-ink">Visit</span>
          <h2 className="mt-4 font-serif text-3xl text-foreground sm:text-4xl">Our ateliers</h2>
          <p className="mx-auto mt-3 max-w-lg text-slate-500">
            Both spaces are working studios — you will usually see a collection being cut.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2">
          {ATELIERS.map((atelier) => (
            <article key={atelier.city} className="rounded-none border border-border bg-card p-7">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold-ink" aria-hidden />
                <span className="label-xs text-slate-500">{atelier.label}</span>
              </div>
              <h3 className="mt-3 font-serif text-2xl text-foreground">{atelier.city}</h3>
              <p className="mt-2 text-sm text-slate-500">{atelier.address}</p>
              <p className="mt-1 text-sm text-slate-500">{atelier.hours}</p>
              <p className="mt-4 inline-flex rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold-ink">
                {atelier.note}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
        <div className="rounded-none bg-obsidian px-6 py-16 text-center sm:px-12">
          <Mail className="mx-auto h-8 w-8 text-gold" aria-hidden />
          <h2 className="mt-5 font-serif text-3xl text-silk sm:text-4xl">
            Questions the site does not answer?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-silk/60">
            Our care team replies within one business day — and a real person reads every message.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button variant="primary" size="lg" asChild className="w-full sm:w-auto">
              <Link href="/contact">Contact the house</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="w-full border-silk text-silk hover:bg-silk hover:text-obsidian sm:w-auto"
            >
              <Link href="/story">Read our story</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
