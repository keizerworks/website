import type { Metadata } from "next";
import PostCard, { PostHero } from "~/components/post-card";
import Navbar from "~/components/ui/navbar";
import { inter } from "~/config/font";
import { hasContent, posts } from "~/data/posts";
import { cn } from "~/lib/utils";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Notes from Keizerworks on building products, AI, design, and engineering with founders.",
  alternates: { canonical: "/blogs" },
  openGraph: {
    url: "/blogs",
    title: "Blogs | Keizerworks",
    description:
      "Notes from Keizerworks on building products, AI, design, and engineering with founders.",
    siteName: "Keizerworks",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
};

// The newest written post leads as a big card; every other post, written
// or still coming, follows in a three-column grid.
export default function BlogsPage() {
  const latest = posts.find((post) => hasContent(post)) ?? posts[0];
  const rest = posts.filter((post) => post !== latest);

  return (
    <main
      // Soft charcoal (as on LCA's field guide) instead of pure black, so
      // black covers and cards still stand apart from the page.
      className={cn(
        inter.className,
        "min-h-screen bg-[#181818] text-[#ebebeb]",
      )}
    >
      <Navbar tone="charcoal" />

      <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-[110px] md:px-16">
        {/* Same header as the Work page. */}
        <h1 className="text-[32px] leading-[1.1] tracking-[-0.02em] md:text-[40px]">
          Ball Knowledge
        </h1>
        <p className="mt-4 max-w-[640px] text-base leading-[1.5] text-[#ebebeb]/70">
          Notes from the studio: how we work with founders, and what we learn
          along the way.
        </p>

        {latest && (
          <div className="mt-10">
            <PostHero post={latest} tone="dark" />
          </div>
        )}

        {rest.length > 0 && (
          <ul className="mt-8 grid gap-8 md:grid-cols-2 lg:mt-12 lg:grid-cols-3">
            {rest.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} tone="dark" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
