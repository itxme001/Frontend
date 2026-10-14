import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes from the Lumière atelier on slow craft, responsible materials and dressing well for longer.",
};

// 75+ editorial posts
const POSTS = [
  // Issue 01-10: Craft & Materials
  { title: "Why we make thirty-three things", category: "Craft", excerpt: "A philosophy of intentional scarcity", date: "2024-01-15", readTime: "6 min", image: "/photos/editorial/journal-1.webp" },
  { title: "European linen, and what it costs", category: "Materials", excerpt: "Tracing the journey from flax to fabric", date: "2024-01-22", readTime: "8 min", image: "/photos/editorial/journal-2.webp" },
  { title: "The four hands behind our linen", category: "People", excerpt: "Meet the artisans of our supply chain", date: "2024-02-05", readTime: "5 min", image: "/photos/editorial/journal-4.webp" },
  { title: "Silk without compromise", category: "Materials", excerpt: "How we source peace silk ethically", date: "2024-02-12", readTime: "7 min", image: "/photos/editorial/atelier.webp" },
  { title: "The weight of a good coat", category: "Craft", excerpt: "Why 800gsm wool matters", date: "2024-02-19", readTime: "4 min", image: "/photos/products/lumiere-couture-gown-1.webp" },
  { title: "Dyeing with walnut husks", category: "Craft", excerpt: "Natural color from the orchard", date: "2024-02-26", readTime: "6 min", image: "/photos/editorial/journal-1.webp" },
  { title: "Japanese denim, three years aging", category: "Materials", excerpt: "The patience of indigo", date: "2024-03-05", readTime: "9 min", image: "/photos/editorial/journal-2.webp" },
  { title: "Hand-stitching versus machine", category: "Craft", excerpt: "When the seam tells a story", date: "2024-03-12", readTime: "5 min", image: "/photos/editorial/atelier.webp" },
  { title: "Cashmere from the high-altitude goat", category: "Materials", excerpt: "Mongolian herders and their ancient practice", date: "2024-03-19", readTime: "7 min", image: "/photos/editorial/journal-4.webp" },
  { title: "The geometry of a pattern piece", category: "Craft", excerpt: "How twenty shapes become a garment", date: "2024-03-26", readTime: "6 min", image: "/photos/products/lumiere-couture-gown-1.webp" },
  
  // Issue 11-20: The Atelier
  { title: "Morning at the Milan workshop", category: "Atelier", excerpt: "6 AM light through the east window", date: "2024-04-02", readTime: "4 min", image: "/photos/editorial/atelier.webp" },
  { title: "The cutting table ritual", category: "Atelier", excerpt: "How we lay out every piece before cutting", date: "2024-04-09", readTime: "5 min", image: "/photos/editorial/journal-1.webp" },
  { title: "Seamstress Rosa, twenty years", category: "People", excerpt: "A portrait of dedication", date: "2024-04-16", readTime: "8 min", image: "/photos/editorial/journal-2.webp" },
  { title: "The sound of the sewing room", category: "Atelier", excerpt: "Ambient noise as creative fuel", date: "2024-04-23", readTime: "3 min", image: "/photos/editorial/atelier.webp" },
  { title: "Our fabric library, organized by season", category: "Atelier", excerpt: "Six hundred bolts, each with a story", date: "2024-04-30", readTime: "6 min", image: "/photos/editorial/journal-4.webp" },
  { title: "Pattern drafting by hand", category: "Craft", excerpt: "Why we still use paper and pencil", date: "2024-05-07", readTime: "7 min", image: "/photos/products/lumiere-couture-gown-1.webp" },
  { title: "The fitting model's perspective", category: "People", excerpt: "How garments move on real bodies", date: "2024-05-14", readTime: "5 min", image: "/photos/editorial/atelier.webp" },
  { title: "End-of-day cleanup routine", category: "Atelier", excerpt: "Leaving the workshop pristine", date: "2024-05-21", readTime: "4 min", image: "/photos/editorial/journal-1.webp" },
  { title: "Tool maintenance: pressing the iron", category: "Craft", excerpt: "The care behind the craft", date: "2024-05-28", readTime: "3 min", image: "/photos/editorial/journal-2.webp" },
  { title: "Color matching by eye versus machine", category: "Craft", excerpt: "When human judgment wins", date: "2024-06-04", readTime: "6 min", image: "/photos/editorial/atelier.webp" },

  // Issue 21-30: Design Philosophy
  { title: "Thirty-three is our number", category: "Philosophy", excerpt: "Why limitation breeds creativity", date: "2024-06-11", readTime: "5 min", image: "/photos/editorial/journal-4.webp" },
  { title: "The case against trends", category: "Philosophy", excerpt: "Building a wardrobe that outlasts fashion", date: "2024-06-18", readTime: "7 min", image: "/photos/products/lumiere-couture-gown-1.webp" },
  { title: "What zero-waste pattern cutting means", category: "Philosophy", excerpt: "Every scrap has a purpose", date: "2024-06-25", readTime: "6 min", image: "/photos/editorial/atelier.webp" },
  { title: "Designing for the second decade", category: "Philosophy", excerpt: "Garments that age gracefully", date: "2024-07-02", readTime: "8 min", image: "/photos/editorial/journal-1.webp" },
  { title: "The ethics of beautiful things", category: "Philosophy", excerpt: "Can luxury and responsibility coexist?", date: "2024-07-09", readTime: "9 min", image: "/photos/editorial/journal-2.webp" },
  { title: "Why we don't do sales", category: "Philosophy", excerpt: "The psychology of permanent pricing", date: "2024-07-16", readTime: "5 min", image: "/photos/editorial/atelier.webp" },
  { title: "The slow fashion manifesto", category: "Philosophy", excerpt: "Our founding principles reimagined", date: "2024-07-23", readTime: "10 min", image: "/photos/editorial/journal-4.webp" },
  { title: "Beauty in the making", category: "Philosophy", excerpt: "Honoring the process, not just the product", date: "2024-07-30", readTime: "6 min", image: "/photos/products/lumiere-couture-gown-1.webp" },
  { title: "Capsule wardrobes, truly considered", category: "Philosophy", excerpt: "Beyond the minimalist cliché", date: "2024-08-06", readTime: "7 min", image: "/photos/editorial/atelier.webp" },
  { title: "The myth of more", category: "Philosophy", excerpt: "Why less truly is more", date: "2024-08-13", readTime: "5 min", image: "/photos/editorial/journal-1.webp" },

  // Issue 31-40: Travel & Origins
  { title: "Visiting the cashmere farms", category: "Travel", excerpt: "A journey to the source", date: "2024-08-20", readTime: "8 min", image: "/photos/editorial/journal-2.webp" },
  { title: "Scottish mills, three generations", category: "Travel", excerpt: "The evolution of tweed weaving", date: "2024-08-27", readTime: "7 min", image: "/photos/editorial/atelier.webp" },
  { title: "Turkish cotton fields at harvest", category: "Travel", excerpt: "White gold from the earth", date: "2024-09-03", readTime: "6 min", image: "/photos/editorial/journal-4.webp" },
  { title: "The silk route reimagined", category: "Travel", excerpt: "Following ancient trade paths", date: "2024-09-10", readTime: "9 min", image: "/photos/products/lumiere-couture-gown-1.webp" },
  { title: "Portuguese leather tanneries", category: "Travel", excerpt: "Traditional methods in modern times", date: "2024-09-17", readTime: "7 min", image: "/photos/editorial/atelier.webp" },
  { title: "Indian block printing workshops", category: "Travel", excerpt: "Hand-carved stamps, living heritage", date: "2024-09-24", readTime: "8 min", image: "/photos/editorial/journal-1.webp" },
  { title: "Scandinavian wool processors", category: "Travel", excerpt: "Cold climate, warm textiles", date: "2024-10-01", readTime: "5 min", image: "/photos/editorial/journal-2.webp" },
  { title: "Moroccan ceramic workshops", category: "Travel", excerpt: "Home scent meets ancient craft", date: "2024-10-08", readTime: "6 min", image: "/photos/editorial/atelier.webp" },
  { title: "The Japanese denim pilgrimage", category: "Travel", excerpt: "Okayama's hidden mills", date: "2024-10-15", readTime: "10 min", image: "/photos/editorial/journal-4.webp" },
  { title: "Italian wool fairs in Biella", category: "Travel", excerpt: "Where textile dreams come true", date: "2024-10-22", readTime: "7 min", image: "/photos/products/lumiere-couture-gown-1.webp" },

  // Issue 41-50: Styling & Care
  { title: "How to wear white after Labor Day", category: "Style", excerpt: "The old rule, reconsidered", date: "2024-10-29", readTime: "4 min", image: "/photos/editorial/atelier.webp" },
  { title: "The art of the layered look", category: "Style", excerpt: "Three pieces, endless combinations", date: "2024-11-05", readTime: "6 min", image: "/photos/editorial/journal-1.webp" },
  { title: "Caring for your wool coat", category: "Care", excerpt: "A winter guide to garment longevity", date: "2024-11-12", readTime: "5 min", image: "/photos/editorial/journal-2.webp" },
  { title: "Steam versus iron: when to use which", category: "Care", excerpt: "Protecting your fabrics", date: "2024-11-19", readTime: "4 min", image: "/photos/editorial/atelier.webp" },
  { title: "The capsule wardrobe calculator", category: "Style", excerpt: "How many pieces do you really need?", date: "2024-11-26", readTime: "7 min", image: "/photos/products/lumiere-couture-gown-1.webp" },
  { title: "Seasonal rotation made simple", category: "Care", excerpt: "Storage tips for transition months", date: "2024-12-03", readTime: "5 min", image: "/photos/editorial/journal-4.webp" },
  { title: "Accessories that elevate basics", category: "Style", excerpt: "The power of thoughtful details", date: "2024-12-10", readTime: "6 min", image: "/photos/editorial/atelier.webp" },
  { title: "Repair, don't replace", category: "Care", excerpt: "Basic mending skills everyone should know", date: "2024-12-17", readTime: "8 min", image: "/photos/editorial/journal-1.webp" },
  { title: "The perfect fitting guide", category: "Style", excerpt: "Understanding your measurements", date: "2024-12-24", readTime: "7 min", image: "/photos/editorial/journal-2.webp" },
  { title: "Gift wrapping with intention", category: "Care", excerpt: "Plastic-free presentation ideas", date: "2024-12-31", readTime: "3 min", image: "/photos/editorial/atelier.webp" },

  // Issue 51-60: Behind the Brand
  { title: "How we chose our name", category: "Brand", excerpt: "Light in Latin, meaning in practice", date: "2025-01-07", readTime: "5 min", image: "/photos/products/lumiere-couture-gown-1.webp" },
  { title: "The first collection, five years ago", category: "Brand", excerpt: "Looking back at where it started", date: "2025-01-14", readTime: "8 min", image: "/photos/editorial/atelier.webp" },
  { title: "Our packaging, unpacked", category: "Brand", excerpt: "Every element considered", date: "2025-01-21", readTime: "6 min", image: "/photos/editorial/journal-1.webp" },
  { title: "The team behind the label", category: "Brand", excerpt: "Twelve people, one vision", date: "2025-01-28", readTime: "7 min", image: "/photos/editorial/journal-2.webp" },
  { title: "Why we photograph by natural light", category: "Brand", excerpt: "The importance of authentic imagery", date: "2025-02-04", readTime: "5 min", image: "/photos/editorial/atelier.webp" },
  { title: "Our commitment to carbon neutrality", category: "Brand", excerpt: "Measuring what matters", date: "2025-02-11", readTime: "9 min", image: "/photos/editorial/journal-4.webp" },
  { title: "The story of our logo", category: "Brand", excerpt: "Typography with intention", date: "2025-02-18", readTime: "4 min", image: "/photos/products/lumiere-couture-gown-1.webp" },
  { title: "Community over competition", category: "Brand", excerpt: "Supporting other slow brands", date: "2025-02-25", readTime: "6 min", image: "/photos/editorial/atelier.webp" },
  { title: "Our return policy, explained", category: "Brand", excerpt: "Transparency in action", date: "2025-03-04", readTime: "5 min", image: "/photos/editorial/journal-1.webp" },
  { title: "What 'made to order' actually means", category: "Brand", excerpt: "Reducing waste, increasing quality", date: "2025-03-11", readTime: "7 min", image: "/photos/editorial/journal-2.webp" },

  // Issue 61-70: Seasonal Features
  { title: "Spring transition: layering light", category: "Seasonal", excerpt: "Lightweight pieces for changing weather", date: "2025-03-18", readTime: "6 min", image: "/photos/editorial/atelier.webp" },
  { title: "Summer essentials, thoughtfully chosen", category: "Seasonal", excerpt: "Breathable fabrics for hot days", date: "2025-03-25", readTime: "5 min", image: "/photos/products/lumiere-couture-gown-1.webp" },
  { title: "Autumn palette: earth tones", category: "Seasonal", excerpt: "Colors drawn from the season", date: "2025-04-01", readTime: "7 min", image: "/photos/editorial/journal-1.webp" },
  { title: "Winter whites, actually wearable", category: "Seasonal", excerpt: "Keeping cream clean and fresh", date: "2025-04-08", readTime: "4 min", image: "/photos/editorial/journal-2.webp" },
  { title: "Holiday party outfit guide", category: "Seasonal", excerpt: "From dinner to dancing", date: "2025-04-15", readTime: "6 min", image: "/photos/editorial/atelier.webp" },
  { title: "New Year, same values", category: "Seasonal", excerpt: "Resolution: buy better, buy less", date: "2025-04-22", readTime: "5 min", image: "/photos/products/lumiere-couture-gown-1.webp" },
  { title: "Valentine's day gifting guide", category: "Seasonal", excerpt: "Thoughtful presents for loved ones", date: "2025-04-29", readTime: "7 min", image: "/photos/editorial/journal-4.webp" },
  { title: "Easter brunch outfit ideas", category: "Seasonal", excerpt: "Spring celebration styling", date: "2025-05-06", readTime: "4 min", image: "/photos/editorial/atelier.webp" },
  { title: "Father's day: the practical gift", category: "Seasonal", excerpt: "Things dads actually want", date: "2025-05-13", readTime: "5 min", image: "/photos/editorial/journal-1.webp" },
  { title: "Summer solstice celebration", category: "Seasonal", excerpt: "Marking the longest day", date: "2025-05-20", readTime: "3 min", image: "/photos/editorial/journal-2.webp" },

  // Issue 71-75: Special Features
  { title: "The perfect wool overcoat", category: "Special", excerpt: "Our most requested piece, explained", date: "2025-05-27", readTime: "10 min", image: "/photos/products/lumiere-couture-gown-1.webp" },
  { title: "Interview: The head seamstress", category: "Special", excerpt: "Twenty years of craftsmanship", date: "2025-06-03", readTime: "12 min", image: "/photos/editorial/atelier.webp" },
  { title: "How we test every fabric", category: "Special", excerpt: "Quality control from bolt to garment", date: "2025-06-10", readTime: "8 min", image: "/photos/editorial/journal-1.webp" },
  { title: "The history of the little black dress", category: "Special", excerpt: "And why ours is different", date: "2025-06-17", readTime: "9 min", image: "/photos/editorial/journal-2.webp" },
  { title: "Fifth anniversary retrospective", category: "Special", excerpt: "Looking back, looking forward", date: "2025-06-24", readTime: "11 min", image: "/photos/editorial/atelier.webp" },
];

interface JournalProps {
  searchParams: Promise<{ cat?: string | string[]; q?: string | string[] }>;
}

export default function JournalPage({ searchParams }: JournalProps) {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-16 text-center">
          <p className="label-xs text-gold-ink">Est. 2019</p>
          <h1 className="mt-4 font-serif text-5xl text-foreground sm:text-6xl">The Journal</h1>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-slate-500">
            Notes on slow craft, responsible materials, and dressing well for longer.
            Published weekly from our Milan atelier.
          </p>
        </header>

        {/* Featured Post */}
        <article className="mb-16 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="overflow-hidden rounded-none">
            <ImageBlock src={POSTS[0].image} alt={POSTS[0].title} ratio="4/3" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="label-xs text-gold-ink">{POSTS[0].category}</span>
            <h2 className="mt-3 font-serif text-3xl text-foreground sm:text-4xl">{POSTS[0].title}</h2>
            <p className="mt-4 text-lg text-slate-500">{POSTS[0].excerpt}</p>
            <div className="mt-6 flex items-center gap-4 text-sm text-slate-400">
              <time>{formatDate(POSTS[0].date)}</time>
              <span>·</span>
              <span>{POSTS[0].readTime} read</span>
            </div>
            <button className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-medium text-gold-ink hover:text-gold">
              Read article
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </article>

        {/* Posts Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {POSTS.slice(1).map((post) => (
            <article
              key={post.title}
              className="group flex flex-col overflow-hidden rounded-none border border-border bg-card transition-colors hover:border-gold/60"
            >
              <div className="overflow-hidden">
                <ImageBlock src={post.image} alt={post.title} ratio="3/2" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="label-xs text-gold-ink">{post.category}</span>
                <h3 className="mt-3 font-serif text-xl leading-snug text-foreground group-hover:text-gold-ink">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-slate-500">{post.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                  <time>{formatDate(post.date)}</time>
                  <span>{post.readTime} read</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-16 text-center">
          <p className="text-sm text-slate-400">Showing {POSTS.length} articles</p>
          <button className="mt-4 inline-flex items-center gap-2 rounded-full border border-foreground px-8 py-3 text-xs font-medium uppercase tracking-[0.14em] transition-colors hover:bg-foreground hover:text-background">
            View archive
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </main>
  );
}

function ImageBlock({ src, alt, ratio }: { src: string; alt: string; ratio: string }) {
  const aspect = {
    "4/3": "aspect-[4/3]",
    "3/2": "aspect-[3/2]",
    "16/9": "aspect-[16/9]",
  }[ratio] || "aspect-[4/3]";

  return (
    <div className={`${aspect} w-full overflow-hidden bg-mist`}>
      <Image src={src} alt={alt} width={600} height={400} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
    </div>
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
