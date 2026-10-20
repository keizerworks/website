import type { Metadata } from "next";
import BookCallLink from "~/components/book-call-link";
import StudioPage from "~/components/studio-page";
import { ServiceList, StudioIntro } from "~/components/studio-services";

const description =
  "Web design, web development, product design, MVPs, AI products, MCP servers, mobile apps, SaaS, and Web3, from a product studio that designs, builds, and maintains them.";

export const metadata: Metadata = {
  title: "Services",
  description,
  alternates: { canonical: "/services" },
  openGraph: {
    url: "/services",
    title: "Services | Keizerworks",
    description,
    siteName: "Keizerworks",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
};

// The home page's intro and services list, on a page of its own so search
// can list it (a home page section can't be a sitelink).
export default function ServicesPage() {
  return (
    <StudioPage>
      <StudioIntro as="h1" />
      <div className="mt-20">
        <ServiceList />
      </div>
      <BookCallLink
        from="services"
        className="mt-12 block rounded bg-white py-2 text-center text-base text-black shadow-[0_0_0_4px_rgba(250,250,253,0.12)] transition-[background-color,transform] duration-200 active:scale-[0.99] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#ff66ff]"
      >
        Book a call
      </BookCallLink>
    </StudioPage>
  );
}
