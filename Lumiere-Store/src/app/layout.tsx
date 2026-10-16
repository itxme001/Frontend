import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { Cursor } from "@/components/motion/cursor";
import { AppErrorBoundary } from "@/components/ui/error-boundary";
import { PageTransition } from "@/components/motion/page-transition";
import { WhatsAppChat } from "@/components/whatsapp-chat";
import { Analytics } from "@vercel/analytics/next";
import "@/lib/seed";

const jost = localFont({
  variable: "--font-jost",
  display: "swap",
  src: [
    { path: "./fonts/jost-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/jost-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/jost-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/jost-600.woff2", weight: "600", style: "normal" },
  ],
});

const playfair = localFont({
  variable: "--font-playfair",
  display: "swap",
  src: [
    { path: "./fonts/playfair-display-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/playfair-display-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/playfair-display-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/playfair-display-400-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/playfair-display-600-italic.woff2", weight: "600", style: "italic" },
  ],
});

export const metadata: Metadata = {
  title: {
    default: "Lumière — Luxury Fashion & Boutique",
    template: "%s · Lumière",
  },
  description:
    "Lumière is a luxury fashion and boutique e-commerce experience: conscious elegance, curated design and secure worldwide checkout. Shop 82+ pieces across apparel, accessories, living and fragrance.",
  keywords: [
    "luxury fashion",
    "boutique clothing",
    "sustainable fashion",
    "designer apparel",
    "handcrafted accessories",
    "slow fashion",
    "Italian silk",
    "cashmere knitwear",
    "ethical fashion",
    "premium leather",
  ],
  authors: [{ name: "Lumière" }],
  creator: "Lumière",
  publisher: "Lumière",
  formatDetection: { email: false, address: false, telephone: false },
  metadataBase: new URL("https://lumiere.store"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Lumière",
    title: "Lumière — Luxury Fashion & Boutique",
    description:
      "Conscious elegance, curated design and secure worldwide checkout. Shop 82+ pieces across apparel, accessories, living and fragrance.",
    images: [
      {
        url: "/photos/editorial/atelier.webp",
        width: 1920,
        height: 1080,
        alt: "Lumière luxury fashion collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumière — Luxury Fashion & Boutique",
    description: "Conscious elegance, curated design and secure worldwide checkout.",
    images: ["/photos/editorial/atelier.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jost.variable} ${playfair.variable}`} suppressHydrationWarning data-theme="light">
      <head>
        <link rel="preconnect" href="https://api.stripe.com" crossOrigin="anonymous" />
        <link rel="preload" href="/photos/editorial/home-hero.webp" as="image" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FashionBrand",
              name: "Lumière",
              description: "Luxury fashion and boutique e-commerce experience",
              url: "https://lumiere.store",
              logo: "https://lumiere.store/logo.png",
              sameAs: ["https://instagram.com/wtf__sheri"],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+92-305-7168742",
                contactType: "customer service",
                availableLanguage: ["English"],
              },
              makesOffer: {
                "@type": "Offer",
                itemOffered: {
                  "@type": "CollectionPage",
                  name: "Lumière Collection",
                  description: "155+ luxury fashion pieces",
                },
              },
            }),
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-background text-obsidian antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:bg-gold focus:text-obsidian focus:px-4 focus:py-2 focus:font-medium"
        >
          Skip to main content
        </a>
        <Providers>
          <SmoothScroll />
          <Cursor />
          <ScrollProgress />
          <AppErrorBoundary>
            <PageTransition>
              <Navbar />
              <main id="main-content" className="flex-1">{children}</main>
              <Footer />
            </PageTransition>
          </AppErrorBoundary>
          <WhatsAppChat />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
