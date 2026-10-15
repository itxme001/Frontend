"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUp, AtSign, CreditCard, Globe, Send, Share2, Phone, Mail, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { CATEGORY_LABELS, type ProductCategory } from "@/data/products";

const SOCIALS = [
  { label: "Instagram", Icon: AtSign, href: "https://instagram.com/wtf__sheri" },
  { label: "WhatsApp", Icon: Send, href: "https://wa.me/923057168742" },
  { label: "Email", Icon: Mail, href: "mailto:itxme204@gmail.com" },
  { label: "Pinterest", Icon: Share2, href: "#" },
];

const SHOP_LINKS = [
  { label: "All products", href: "/shop" },
  { label: "Collections", href: "/collections" },
  ...(Object.keys(CATEGORY_LABELS) as ProductCategory[]).map((key) => ({
    label: CATEGORY_LABELS[key],
    href: `/shop?cat=${key}`,
  })),
];

const HOUSE_LINKS = [
  { label: "Our story", href: "/story" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

const CARE_LINKS = [
  { label: "Shipping", href: "/contact#faq" },
  { label: "Returns & exchanges", href: "/contact#faq" },
  { label: "Product care", href: "/contact#faq" },
  { label: "FAQ", href: "/contact#faq" },
];

const ACCOUNT_LINKS = [
  { label: "Sign in", href: "/login" },
  { label: "Create account", href: "/signup" },
  { label: "My orders", href: "/account" },
  { label: "Shopping bag", href: "/cart" },
];

export function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = React.useState("");
  const [year, setYear] = React.useState<string>("");

  React.useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);

  function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ title: "Check that email", description: "That address doesn't look right.", variant: "error" });
      return;
    }
    toast({
      title: "You're on the list",
      description: "Your 15% code is on its way.",
      variant: "success",
    });
    setEmail("");
  }

  return (
    <footer className="mt-24 bg-obsidian text-silk">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">

        {/* Newsletter */}
        <section className="grid gap-8 border-b border-white/12 py-14 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <h2 className="headline text-silk">Fifteen percent off, and one letter a month.</h2>
            <p className="mt-4 max-w-md text-silk/55">
              New pieces, restocks, and notes from the atelier. Unsubscribe whenever you like.
            </p>
          </div>
          <form onSubmit={subscribe} className="flex w-full items-stretch gap-3">
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              suppressHydrationWarning
              className="min-w-0 flex-1 border-b border-white/25 bg-transparent px-1 py-3 text-base text-silk outline-none transition-colors placeholder:text-silk/35 focus:border-gold"
            />
            <button
              type="submit"
              className="shrink-0 bg-gold px-6 text-xs font-medium uppercase tracking-[0.16em] text-obsidian transition-colors hover:bg-gold-light"
            >
              Join
            </button>
          </form>
        </section>

        {/* Links */}
        <nav aria-label="Footer" className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <FooterColumn title="Shop" links={SHOP_LINKS} />
          <FooterColumn title="House" links={HOUSE_LINKS} />
          <FooterColumn title="Care" links={CARE_LINKS} />
          <FooterColumn title="Account" links={ACCOUNT_LINKS} />
        </nav>

        {/* Oversized wordmark */}
        <div className="border-t border-white/12 pt-10" aria-hidden>
          <p className="select-none text-center font-serif text-[clamp(3.5rem,17vw,15rem)] leading-[0.8] tracking-[-0.04em] text-silk/10">
            LUMIÈRE
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-6 border-t border-white/12 py-8 text-sm text-silk/45 lg:flex-row lg:justify-between">
          <p>&copy; {year} Lumière. All rights reserved.</p>

          <div className="flex items-center gap-2">
            {SOCIALS.map(({ label, Icon }) => (
              <Link
                key={label}
                href="#"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center border border-white/15 text-silk/60 transition-colors hover:border-gold hover:bg-gold hover:text-obsidian"
              >
                <Icon className="h-4 w-4" aria-hidden />
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a href="tel:+923057168742" className="flex items-center gap-1.5 text-silk/60 transition-colors hover:text-gold">
              <Phone className="h-3.5 w-3.5" aria-hidden />
              0305 7168742
            </a>
            <a href="mailto:itxme204@gmail.com" className="flex items-center gap-1.5 text-silk/60 transition-colors hover:text-gold">
              <Mail className="h-3.5 w-3.5" aria-hidden />
              itxme204@gmail.com
            </a>
            <span className="flex items-center gap-1.5 text-silk/60">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              Samanabad, Faisalabad
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" aria-hidden />
              Visa · Mastercard · Amex
            </span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-1.5 text-silk/60 transition-colors hover:text-gold"
            >
              Back to top
              <ArrowUp className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="label-xs text-gold">{title}</h3>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <Link
              href={link.href}
              className="text-sm text-silk/55 transition-colors hover:text-silk"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
