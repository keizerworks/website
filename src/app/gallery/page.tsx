import type { Metadata } from "next";
import GalleryViewer, { type GalleryItem } from "~/components/gallery-viewer";
import Navbar from "~/components/ui/navbar";
import { inter } from "~/config/font";
import { projects } from "~/data/work";
import { cn } from "~/lib/utils";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Screens, brands, and launches from the products Keizerworks has designed and built.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    url: "/gallery",
    title: "Gallery | Keizerworks",
    description:
      "Screens, brands, and launches from the products Keizerworks has designed and built.",
    siteName: "Keizerworks",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
};

type Item = GalleryItem;

// Left out of the gallery (they stay on their case study pages).
const hidden = new Set([
  "/assets/work/betteridea-cover.png",
  "/assets/work/chem0/research-mode.webp",
  "/assets/work/arlink-cover.png",
  "/assets/work/tael/partner-x-tael.webp",
]);

// Designs that live only in the gallery: concepts and landing pages that
// aren't part of a case study.
const extras: Item[] = [
  {
    src: "/assets/work/edulume/concept-content-list.webp",
    alt: "Edulume concept: the content library in a compact grid with a folder sidebar",
    caption: "Concept: the content library, compact, with folders.",
    width: 2880,
    height: 1800,
    project: "Edulume · Concept",
  },
  {
    src: "/assets/gallery/airbills-landing.webp",
    alt: "Airbills landing page: Pay for everything, with airtime, data, and bills paid in USDC on Solana",
    caption: "Pay for everything: airtime, data, and bills in USDC.",
    width: 2880,
    height: 1800,
    project: "Airbills",
  },
  {
    src: "/assets/gallery/fiatrouter-landing.webp",
    alt: "Fiatrouter landing page: Making Crypto Simple, your gateway to Solana",
    caption: "Making Crypto Simple: a gateway to Solana.",
    width: 2880,
    height: 1800,
    project: "Fiatrouter",
  },
];

// The newest designs, shown first in this order; everything else follows.
const newest = [
  "/assets/work/chem0/landing-site.webp",
  "/assets/work/plobbo/ocean-dashboard.webp",
  "/assets/gallery/fiatrouter-landing.webp",
  "/assets/work/edulume/concept-content-list.webp",
  "/assets/work/chem0/book-a-call.webp",
  "/assets/work/plobbo/created-post.webp",
  "/assets/work/plobbo/schedule.webp",
  "/assets/work/plobbo/onboarding.webp",
  "/assets/work/plobbo/calendar.webp",
  "/assets/work/plobbo/pricing.webp",
  "/assets/work/plobbo/language-region.webp",
  "/assets/work/plobbo/payment-methods.webp",
  "/assets/work/plobbo/billing-currency.webp",
];

// Every image from the work, each once: the newest designs first, then the
// rest in project order (cover first).
function galleryItems(): Item[] {
  const seen = new Set<string>();
  const items: Item[] = [];
  const add = (item: Item) => {
    if (seen.has(item.src) || hidden.has(item.src)) return;
    seen.add(item.src);
    items.push(item);
  };
  for (const project of projects) {
    if (project.coverImage && project.coverImageSize) {
      add({
        src: project.coverImage,
        alt: `${project.name} cover`,
        ...project.coverImageSize,
        project: project.name,
      });
    }
    for (const chapter of project.story?.chapters ?? []) {
      for (const visual of chapter.visuals ?? []) {
        add({ ...visual, project: project.name });
      }
    }
  }
  for (const extra of extras) add(extra);
  const rank = (item: Item) => {
    const i = newest.indexOf(item.src);
    return i === -1 ? newest.length : i;
  };
  // A stable sort keeps project order among everything not listed.
  return items.sort((a, b) => rank(a) - rank(b));
}

// A wall of the work: masonry columns; open any image to browse them all.
export default function GalleryPage() {
  const items = galleryItems();

  return (
    <main
      className={cn(inter.className, "min-h-screen bg-black text-[#ebebeb]")}
    >
      <Navbar />

      <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-[110px] md:px-16">
        <h1 className="text-[32px] leading-[1.1] tracking-[-0.02em] md:text-[40px]">
          Gallery
        </h1>
        <p className="mt-4 max-w-[640px] text-base leading-[1.5] text-[#ebebeb]/70">
          Screens, brands, and launches from the products we've built with
          founders.
        </p>

        <GalleryViewer items={items} />
      </div>
    </main>
  );
}
