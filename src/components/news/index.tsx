import PostCard from "~/components/post-card";
import { SeeAll } from "~/components/selected-work";
import { sectionTitle } from "~/components/studio-services";
import { inter } from "~/config/font";
import { posts } from "~/data/posts";
import { cn } from "~/lib/utils";

// Home preview of /v2/blogs: our best four pieces of writing.
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
        <SeeAll href="/v2/blogs">All writing</SeeAll>
      </div>

      <ul className="-mx-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {posts.slice(0, 4).map((post) => (
          <li key={post.slug}>
            <PostCard post={post} tone="dark" />
          </li>
        ))}
      </ul>
    </section>
  );
}
