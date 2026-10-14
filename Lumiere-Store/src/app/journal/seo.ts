export const metadata = {
  title: "Journal — Notes on Slow Craft",
  description: "Read our editorial content on sustainable fashion, artisan craftsmanship, material sourcing, and conscious living. 76+ articles published weekly.",
  openGraph: {
    title: "Journal — Lumière",
    description: "Notes on slow craft, responsible materials, and dressing well for longer.",
    url: "https://lumiere.store/journal",
    type: "blog",
    images: [
      {
        url: "/photos/editorial/journal-1.webp",
        width: 1200,
        height: 630,
        alt: "Lumière Journal",
      },
    ],
  },
  twitter: {
    title: "Journal — Lumière",
    description: "76+ articles on slow craft and sustainable fashion.",
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/journal",
  },
  keywords: ["sustainable fashion", "slow fashion", "artisan craft", "fashion journal", "ethical clothing"],
  robots: {
    index: true,
    follow: true,
  },
};

export { default } from "@/app/journal/page";
