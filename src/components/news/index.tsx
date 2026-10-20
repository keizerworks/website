import PostCard from "~/components/post-card";
import { SeeAll } from "~/components/selected-work";
import { sectionTitle } from "~/components/studio-services";
import { inter } from "~/config/font";
import { posts } from "~/data/posts";
import { cn } from "~/lib/utils";

// Home preview of /blogs: our best four pieces of writing.
export default function NewsSection() {
  return (
    <section
      id="news"
      className={cn(
        inter.className,
        "mx-auto w-full max-w-[1536px] scroll-mt-[100px] bg-black px-4 py-16 text-[#ebebeb] md:px-24 md:py-[100px]",
      )}
    >
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2 className={cn(sectionTitle, "mb-0")}>Blogs</h2>
        <SeeAll href="/blogs">All writing</SeeAll>
      </div>

      {/* Phones: a swipeable row (native scroll, snapping to each card, the
          next one peeking in). Wider screens: the grid. */}
      <ul className="-mx-4 flex snap-x snap-mandatory scroll-px-1 gap-2 overflow-x-auto overscroll-x-contain px-1 [scrollbar-width:none] sm:-mx-3 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 xl:grid-cols-4 [&::-webkit-scrollbar]:hidden">
        {posts.slice(0, 4).map((post) => (
          <li key={post.slug} className="w-[85%] shrink-0 snap-start sm:w-auto">
            <PostCard post={post} tone="dark" />
          </li>
        ))}
      </ul>
    </section>
  );
}
