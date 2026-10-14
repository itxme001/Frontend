import type { Metadata } from "next";
import Link from "next/link";
import {
  Clock,
  Leaf,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Lumière about an order, a product, shipping or returns. Real people, replies within one business day.",
};

const CHANNELS = [
  {
    Icon: Mail,
    label: "Email care",
    value: "care@lumiere.store",
    note: "Replies within 1 business day",
    href: "mailto:care@lumiere.store",
  },
  {
    Icon: Phone,
    label: "Order hotline",
    value: "+92 300 111 2233",
    note: "Mon–Sat, 9:00 – 20:00 PKT",
    href: "tel:+923001112233",
  },
  {
    Icon: MessageCircle,
    label: "Live chat",
    value: "Start a conversation",
    note: "Typically answers in under 5 minutes",
    href: "#contact-form",
  },
  {
    Icon: MapPin,
    label: "Atelier & showroom",
    value: "12 Gulberg III, Lahore",
    note: "Visits by appointment only",
    href: "#locations",
  },
];

const FAQ = [
  {
    q: "How long does shipping take?",
    a: "Orders are dispatched within 48 hours. Express delivery arrives in 1–3 business days and standard delivery in 3–7. Express shipping is complimentary on orders above $300.",
  },
  {
    q: "Can I change or cancel an order?",
    a: "Yes — as long as the order has not been dispatched. Message us with your order number as soon as possible and we will amend or cancel it free of charge.",
  },
  {
    q: "What is your returns policy?",
    a: "You have 30 days from delivery to return or exchange anything unworn and in its original packaging. Fragrance must be unopened for hygiene reasons. Returns are free within Pakistan.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "Visa, Mastercard and American Express through our encrypted Stripe checkout. Your card details are handled entirely by Stripe and are never stored on our servers.",
  },
  {
    q: "Do you ship internationally?",
    a: "We ship to 40 countries. Duties and taxes are calculated at checkout where applicable so there are no surprises on delivery.",
  },
  {
    q: "How do I care for my pieces?",
    a: "Every product page includes specific care guidance. As a rule: cold gentle wash, air dry, and store knitwear folded. Repairs are free for the first two years.",
  },
];

const LOCATIONS = [
  {
    city: "Lahore",
    label: "Atelier & Showroom",
    address: "12 Gulberg III, Lahore, Pakistan",
    hours: "Mon–Sat · 10:00 – 19:00",
  },
  {
    city: "Dubai",
    label: "Regional Studio",
    address: "Unit 4, Alserkal Avenue, Dubai, UAE",
    hours: "Tue–Sun · 11:00 – 20:00",
  },
];

const HIGHLIGHTS = [
  { Icon: Truck, text: "Free express shipping over $300" },
  { Icon: RotateCcw, text: "30-day easy returns" },
  { Icon: ShieldCheck, text: "Secure Stripe checkout" },
  { Icon: Leaf, text: "Plastic-free packaging" },
];

export default function ContactPage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-mist">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <span className="label-xs text-gold-ink">Support</span>
          <h1 className="mt-4 font-serif text-4xl text-foreground sm:text-5xl">We&apos;re Here to Help</h1>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-slate-500">
            Questions about an order, a fabric, or a return? You will reach a real person at Lumière
            — never a script, and never a bot.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-slate-500">
            {HIGHLIGHTS.map(({ Icon, text }) => (
              <span key={text} className="inline-flex items-center gap-2">
                <Icon className="h-4 w-4 text-gold-ink" aria-hidden />
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Channels */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CHANNELS.map(({ Icon, label, value, note, href }) => (
            <a
              key={label}
              href={href}
              className="group rounded-none border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60"
            >
              <Icon className="h-5 w-5 text-gold-ink" aria-hidden />
              <h2 className="label-xs mt-4 text-slate-500">{label}</h2>
              <p className="mt-2 font-medium text-foreground transition-colors group-hover:text-gold-ink">
                {value}
              </p>
              <p className="mt-1 text-xs text-slate-500">{note}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Form + side info */}
      <section id="contact-form" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-20 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <div>
            <h2 className="font-serif text-3xl text-foreground">Send Us a Message</h2>
            <p className="mt-2 text-slate-500">
              Fill in the form and we will reply within one business day. For urgent order matters,
              the hotline is faster.
            </p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-none border border-border bg-card p-6">
              <h3 className="flex items-center gap-2 font-serif text-lg text-foreground">
                <Clock className="h-4 w-4 text-gold-ink" aria-hidden /> Support Hours
              </h3>
              <dl className="mt-4 space-y-2 text-sm">
                {[
                  ["Monday – Friday", "9:00 – 20:00"],
                  ["Saturday", "10:00 – 18:00"],
                  ["Sunday", "Closed"],
                ].map(([d, t]) => (
                  <div key={d} className="flex justify-between gap-4 border-b border-border pb-2 last:border-b-0">
                    <dt className="text-slate-500">{d}</dt>
                    <dd className="font-medium text-foreground">{t}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs leading-relaxed text-slate-500">
                Messages sent outside these hours are answered the next working morning.
              </p>
            </div>

            <div id="locations" className="scroll-mt-24 rounded-none border border-border bg-card p-6">
              <h3 className="flex items-center gap-2 font-serif text-lg text-foreground">
                <MapPin className="h-4 w-4 text-gold-ink" aria-hidden /> Where to Find Us
              </h3>
              <ul className="mt-4 space-y-5">
                {LOCATIONS.map((loc) => (
                  <li key={loc.city}>
                    <p className="text-sm font-semibold text-foreground">
                      {loc.city} <span className="font-normal text-slate-500">· {loc.label}</span>
                    </p>
                    <p className="mt-1 text-sm text-slate-500">{loc.address}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{loc.hours}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-none border border-gold/40 bg-gold/10 p-6">
              <h3 className="font-serif text-lg text-foreground">Already have an order?</h3>
              <p className="mt-2 text-sm text-slate-500">
                Check live status, tracking and past receipts in your account.
              </p>
              <Button variant="outline" asChild className="mt-4 w-full">
                <Link href="/account">View my orders</Link>
              </Button>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 border-t border-border bg-mist py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <header className="mb-10 text-center">
            <span className="label-xs text-gold-ink">Before You Ask</span>
            <h2 className="mt-4 font-serif text-3xl text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-slate-500">
              The six questions our care team answers every day.
            </p>
          </header>
          <Accordion items={FAQ} />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="rounded-none bg-obsidian px-6 py-14 text-center sm:px-12">
          <Mail className="mx-auto h-8 w-8 text-gold" aria-hidden />
          <h2 className="mt-5 font-serif text-3xl text-silk sm:text-4xl">Still not sure?</h2>
          <p className="mx-auto mt-4 max-w-xl text-silk/60">
            Email <span className="text-gold">care@lumiere.store</span> and you will hear back from
            a person who knows the collection inside out.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button variant="primary" size="lg" asChild className="w-full sm:w-auto">
              <Link href="/shop">Browse the collection</Link>
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
