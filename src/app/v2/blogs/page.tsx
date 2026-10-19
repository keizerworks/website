import type { Metadata } from "next";
import PostCard, { PostHero } from "~/components/post-card";
import Navbar from "~/components/ui/navbar";
import { inter } from "~/config/font";
import { posts } from "~/data/posts";
import { cn } from "~/lib/utils";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Notes from Keizerworks on building products, AI, design, and engineering with founders.",
  alternates: { canonical: "/v2/blogs" },
};

// LCA-style: the posts are the page. The newest leads as a big card, the
// rest follow in a three-column grid.
export default function BlogsPage() {
  const [latest, ...rest] = posts;

  return (
    <main
      className={cn(inter.className, "min-h-screen bg-[#fafafd] text-[#111]")}
    >
      <Navbar tone="light" />

      <div className="mx-auto max-w-[1344px] px-5 pb-24 pt-[110px] md:px-8 lg:px-12">
        <h1 className="sr-only">Keizerworks blog</h1>

        {latest && <PostHero post={latest} />}

        <ul className="mt-8 grid gap-8 md:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {rest.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
