import Image from "next/image";
import Link from "next/link";
import {
  type Post,
  formatPostDate,
  hasContent,
  postAuthor,
} from "~/data/posts";
import { cn } from "~/lib/utils";

// Blog items, LCA-style: image first, a small byline, then the title (Inter,
// like the navbar), all left-aligned. Grid items have no card until you hover.

type Tone = "light" | "dark";

const ease = "ease-[cubic-bezier(0.23,1,0.32,1)]";

// Hover effects use [@media(hover:hover)_and_(pointer:fine)], so taps on
// phones don't leave them stuck on. Written out in full each time: Tailwind
// can't see class names built from template strings.

const focus =
  "outline-none focus-visible:ring-2 focus-visible:ring-[#2D2DC3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafafd]";

const panels: Record<Post["coverColor"], string> = {
  blue: "bg-[#2D2DC3] text-[#fafafd]",
  black: "bg-[#111] text-[#fafafd]",
  pink: "bg-[#ff66ff] text-black",
};

// The post's cover image, or until it has one, a brand-color panel with the
// category, a short cover line, and the badge's four stripes.
function Cover({
  post,
  className,
  sizes,
  priority,
  large,
}: {
  post: Post;
  className: string;
  sizes: string;
  priority?: boolean;
  large?: boolean;
}) {
  if (post.cover) {
    return (
      <div
        style={{ backgroundColor: post.cover.bg }}
        className={cn("relative overflow-hidden rounded-2xl", className)}
      >
        <Image
          src={post.cover.src}
          alt={post.cover.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            "object-cover transition-transform duration-300 motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.02] motion-reduce:[@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-100",
            ease,
          )}
        />
        {/* A hairline edge above the image, so dark covers keep their shape. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10"
        />
      </div>
    );
  }
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex flex-col justify-between overflow-hidden rounded-2xl p-5 md:p-6",
        panels[post.coverColor],
        className,
      )}
    >
      <span className="text-xs font-medium uppercase tracking-[0.14em] opacity-70">
        {post.category}
      </span>
      <div className="flex items-end justify-between gap-4">
        {post.coverLine && (
          <span
            className={cn(
              "block font-semibold leading-[1.1] tracking-[-0.03em] [text-wrap:balance]",
              large
                ? "text-[32px] md:text-[48px]"
                : "text-[24px] xl:text-[26px]",
            )}
          >
            {post.coverLine}
          </span>
        )}
        {/* The four stripes from the Keizer badge. */}
        <span
          className={cn(
            "ml-auto flex shrink-0 gap-1.5 self-end transition-transform duration-300 motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-x-1 motion-reduce:[@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0",
            ease,
          )}
        >
          {["#2fa84f", "#1e88e5", "#e53935", "#fdd835"].map((color) => (
            <span
              key={color}
              style={{ backgroundColor: color }}
              className={cn(
                "-skew-x-[20deg] rounded-[3px]",
                large ? "h-10 w-5 md:h-14 md:w-7" : "h-7 w-3.5",
              )}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

function Byline({
  post,
  tone,
  date,
}: {
  post: Post;
  tone: Tone;
  date?: boolean;
}) {
  const author = postAuthor(post);
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 text-sm",
        tone === "light" ? "text-black/60" : "text-[#ebebeb]/60",
      )}
    >
      <Image
        src={author.avatar}
        alt=""
        width={24}
        height={24}
        className="size-6 rounded-full"
      />
      <span className="inline">{author.name}</span>
      {date && (
        <>
          <span aria-hidden="true" className="inline opacity-40">
            •
          </span>
          <span className="inline">{formatPostDate(post.date)}</span>
        </>
      )}
    </div>
  );
}

// The newest post: a card with the image left, story right. White on light
// pages, a faint panel on dark ones.
export function PostHero({
  post,
  tone = "light",
}: {
  post: Post;
  tone?: Tone;
}) {
  const dark = tone === "dark";
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className={cn(
        "group relative block rounded-3xl p-3 ring-1 transition-[transform,background-color] duration-150 active:scale-[0.99] motion-reduce:active:scale-100",
        dark
          ? "bg-white/[0.06] ring-white/10 focus-visible:ring-offset-[#181818] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/[0.08]"
          : "bg-white ring-black/[0.06]",
        ease,
        focus,
      )}
    >
      <div className="relative flex flex-col items-center gap-6 md:flex-row lg:gap-10">
        <Cover
          post={post}
          priority
          large
          sizes="(min-width: 768px) 55vw, 100vw"
          className="aspect-[16/10] w-full md:w-[55%]"
        />
        <div className="flex flex-1 flex-col items-center gap-4 px-3 pb-5 text-center md:items-start md:px-0 md:pb-0 md:pr-6 md:text-left">
          <p
            className={cn(
              "text-sm font-medium",
              dark ? "text-[#ff66ff]" : "text-[#2D2DC3]",
            )}
          >
            Latest
          </p>
          <h2
            className={cn(
              "text-[26px] leading-[1.25] tracking-[-0.02em] [text-wrap:balance] lg:text-[32px] xl:text-[40px]",
              dark ? "text-[#ebebeb]" : "text-[#111]",
            )}
          >
            {post.title}
          </h2>
          <p
            className={cn(
              "line-clamp-2 text-base leading-[1.6]",
              dark ? "text-[#ebebeb]/60" : "text-black/60",
            )}
          >
            {post.excerpt}
          </p>
          <Byline post={post} tone={tone} date />
          <span
            className={cn(
              "mt-2 inline-flex items-center gap-1.5 text-sm font-medium",
              dark ? "text-[#ebebeb]" : "text-[#111]",
            )}
          >
            Read more
            <span
              aria-hidden="true"
              className={cn(
                "transition-transform duration-200",
                "[@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5",
                ease,
              )}
            >
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

// A grid item: no card at rest; on hover (mouse only) it becomes one.
export default function PostCard({
  post,
  tone = "light",
}: {
  post: Post;
  tone?: Tone;
}) {
  const content = (
    <>
      <Cover
        post={post}
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        className="relative aspect-[16/10]"
      />
      <div className="relative mt-5 flex px-1">
        <Byline post={post} tone={tone} date />
      </div>
      <h3
        className={cn(
          // Two lines, always: short titles reserve the space and long ones
          // are clamped, so every excerpt starts at the same height.
          "relative mt-3 line-clamp-2 min-h-[2.5em] px-1 text-left text-[20px] leading-[1.25] tracking-[-0.015em] [text-wrap:balance] md:text-[22px]",
          tone === "light" ? "text-[#111]" : "text-[#ebebeb]",
        )}
      >
        {post.title}
      </h3>
      <p
        className={cn(
          "relative mt-2.5 line-clamp-2 min-h-[3.25em] px-1 text-left text-[15px] leading-relaxed",
          tone === "light" ? "text-black/60" : "text-[#ebebeb]/60",
        )}
      >
        {post.excerpt}
      </p>
    </>
  );

  // Not written yet: shown, but not a link, with no hover or press.
  if (!hasContent(post)) {
    return <div className="relative h-full p-3 pb-6">{content}</div>;
  }

  return (
    <Link
      href={`/blogs/${post.slug}`}
      className={cn(
        "group relative block h-full rounded-3xl p-3 pb-6 transition-transform duration-150 active:scale-[0.99] motion-reduce:active:scale-100",
        ease,
        focus,
        tone === "dark" && "focus-visible:ring-offset-[#181818]",
      )}
    >
      {/* The hover card fades in as one layer (opacity only). */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-200",
          "[@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100",
          tone === "light"
            ? "bg-white ring-1 ring-black/[0.06]"
            : "bg-white/[0.05]",
        )}
      />
      {content}
    </Link>
  );
}
