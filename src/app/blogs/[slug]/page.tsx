import { CornerUpLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookCallLink from "~/components/book-call-link";
import { PageFooter } from "~/components/page-chrome";
import Contents from "~/components/reading/contents";
import ZoomImage from "~/components/zoom-image";
import { inter } from "~/config/font";
import {
  type Block,
  formatPostDate,
  getPost,
  hasContent,
  headingId,
  postAuthor,
  posts,
} from "~/data/posts";
import { getProject } from "~/data/work";
import { cn } from "~/lib/utils";

type Props = { params: Promise<{ slug: string }> };

const siteUrl = "https://keizerworks.com";
const label = "text-xs font-medium uppercase tracking-[0.12em] text-black/40";

// Keyboard focus, and hover effects only for a real mouse, so a tap on a
// phone doesn't leave them stuck on.
const focus =
  "outline-none focus-visible:ring-2 focus-visible:ring-[#2D2DC3] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f7f6f4]";

export function generateStaticParams() {
  return posts.filter(hasContent).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const path = `/blogs/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: path },
    authors: [{ name: postAuthor(post).name }],
    // Outlines and placeholders stay out of search until they're written.
    robots: hasContent(post) ? undefined : { index: false, follow: true },
    openGraph: {
      type: "article",
      url: path,
      siteName: "Keizerworks",
      title: post.title,
      description: post.excerpt,
      ...(post.date && { publishedTime: post.date }),
      authors: [postAuthor(post).name],
      ...(post.cover && { images: [{ url: post.cover.src }] }),
      tags: [post.category],
    },
    twitter: {
      card: "summary_large_image",
      site: "@keizerHq",
      title: post.title,
      description: post.excerpt,
    },
  };
}

// Soft bars where copy will go.
function Draft({ lines = 4 }: { lines?: number }) {
  return (
    <div aria-hidden="true" className="flex flex-col gap-3 py-1.5">
      {Array.from({ length: lines }, (_, i) => (
        <span
          key={i}
          className="block h-3 rounded-full bg-black/[0.06]"
          style={{ width: i === lines - 1 ? "60%" : "100%" }}
        />
      ))}
    </div>
  );
}

function Figure({
  src,
  alt,
  width,
  height,
  caption,
  bg,
  size,
}: Omit<Extract<Block, { type: "figure" }>, "type">) {
  const small = size === "small";
  return (
    <figure className="my-14">
      <div
        style={bg ? { backgroundColor: bg } : undefined}
        className={cn(
          "overflow-hidden rounded-2xl",
          small ? "mx-auto w-fit" : "ring-1 ring-inset ring-black/[0.06]",
        )}
      >
        <ZoomImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(min-width: 1024px) 680px, 100vw"
          buttonClassName="w-full"
          className={small ? "h-auto w-[130px] rounded-2xl" : "h-auto w-full"}
        />
      </div>
      {caption && (
        <figcaption className="mt-5 text-center text-[14px] leading-snug text-black/45">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

const inlineLink =
  "rounded-sm text-[#111] underline decoration-black/25 underline-offset-4 transition-[text-decoration-color] duration-150 outline-none focus-visible:ring-2 focus-visible:ring-[#2D2DC3] [@media(hover:hover)_and_(pointer:fine)]:hover:decoration-[#2D2DC3]";

// **bold** and [label](url) inside a line of text.
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) {
      return (
        <strong key={i} className="font-semibold text-[#111]">
          {bold[1]}
        </strong>
      );
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    // The booking page: same tab, and counted like every Book a call button.
    if (link && link[2] === "/book") {
      return (
        <BookCallLink key={i} from="blog-post" className={inlineLink}>
          {link[1]}
        </BookCallLink>
      );
    }
    if (link) {
      return (
        <a
          key={i}
          href={link[2]}
          target="_blank"
          rel="noopener noreferrer"
          className={inlineLink}
        >
          {link[1]}
        </a>
      );
    }
    return part;
  });
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return (
        <p className="my-5">
          <Inline text={block.text} />
        </p>
      );
    case "h3":
      return (
        <h3 className="mb-2 mt-10 font-semibold text-[#111]">{block.text}</h3>
      );
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List
          className={cn(
            "my-5 flex flex-col gap-2 pl-5 marker:text-black/35",
            block.ordered ? "list-decimal" : "list-disc",
          )}
        >
          {block.items.map((item) => (
            <li key={item} className="pl-1">
              <Inline text={item} />
            </li>
          ))}
        </List>
      );
    }
    case "video":
      return (
        <figure className="my-14">
          <video
            src={block.src}
            poster={block.poster}
            width={block.width}
            height={block.height}
            // With sound: plays on request, with controls (browsers block
            // autoplay with sound). Without: a muted loop, like a GIF.
            {...(block.sound
              ? { controls: true }
              : { autoPlay: true, muted: true, loop: true })}
            playsInline
            preload="metadata"
            className="h-auto w-full rounded-2xl bg-black ring-1 ring-inset ring-black/[0.06]"
          />
          {block.caption && (
            <figcaption className="mt-5 text-center text-[14px] leading-snug text-black/45">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "h2":
      return (
        <h2
          id={headingId(block.text)}
          className="-mx-2 mb-3 mt-14 w-fit scroll-mt-10 rounded-lg px-2 py-0.5 font-semibold text-[#111]"
        >
          {block.text}
        </h2>
      );
    case "figure":
      return <Figure {...block} />;
    case "quote":
      return (
        <blockquote className="my-10 border-l-2 border-[#2D2DC3] pl-5 text-[#111]">
          <p>{block.text}</p>
          {block.by && (
            <footer className="mt-2 text-[15px] text-black/50">
              — {block.by}
            </footer>
          )}
        </blockquote>
      );
    case "draft":
      return (
        <div className="my-5">
          <Draft lines={block.lines} />
        </div>
      );
  }
}

// Reading layout, after benji.org: a quiet left rail (back to the index and
// the contents) and one comfortable column of text. No navbar; the rail is
// where links and booking can go later.
export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  // Posts that aren't written yet don't have a page.
  if (!post || !hasContent(post)) notFound();

  const project = post.project ? getProject(post.project) : undefined;
  const more = posts
    .filter((other) => other.slug !== post.slug && hasContent(other))
    .slice(0, 3);
  const sections = (post.body ?? [])
    .filter((block) => block.type === "h2")
    .map((block) => ({ id: headingId(block.text), text: block.text }));

  const indexLink = (
    <Link
      href="/blogs"
      className={cn(
        "inline-flex items-center gap-2 rounded text-[15px] text-black/40 transition-colors duration-150 [@media(hover:hover)_and_(pointer:fine)]:hover:text-black/80",
        focus,
      )}
    >
      <CornerUpLeft className="size-4" strokeWidth={1.75} />
      All blogs
    </Link>
  );

  return (
    <main
      id="top"
      className={cn(inter.className, "min-h-screen bg-[#f7f6f4] text-[#111]")}
    >
      {hasContent(post) && post.date && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.title,
              description: post.excerpt,
              datePublished: post.date,
              url: `${siteUrl}/blogs/${post.slug}`,
              ...(post.cover && { image: `${siteUrl}${post.cover.src}` }),
              author: post.author
                ? { "@type": "Person", name: post.author.name }
                : { "@type": "Organization", name: "Keizerworks" },
              publisher: {
                "@type": "Organization",
                name: "Keizerworks",
                url: siteUrl,
              },
            }).replace(/</g, "\\u003c"),
          }}
        />
      )}

      <div className="mx-auto grid max-w-[1200px] gap-x-24 px-5 pb-24 pt-10 md:px-10 md:pt-14 lg:grid-cols-[240px_minmax(0,680px)]">
        <aside className="hidden lg:block">
          <div className="sticky top-14">
            {indexLink}
            <Contents title={post.title} sections={sections} />
          </div>
        </aside>

        <article className="text-[17px] leading-[1.75] text-black/85 [text-wrap:pretty]">
          <div className="mb-12 lg:hidden">{indexLink}</div>

          <header>
            <h1 className="font-semibold text-[#111]">{post.title}</h1>
            <p className="text-black/45">{formatPostDate(post.date)}</p>
          </header>

          <p className="mt-10">{post.excerpt}</p>

          {post.cover && <Figure {...post.cover} />}

          {post.body?.map((block, i) => (
            <BlockView key={i} block={block} />
          ))}

          {project && (
            <Link
              href={`/work/${project.slug}`}
              className={cn(
                "group mt-16 flex items-center justify-between gap-6 rounded-xl bg-black/[0.03] p-5 ring-1 ring-inset ring-black/[0.05] transition-[background-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.99] motion-reduce:active:scale-100 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-black/[0.05]",
                focus,
              )}
            >
              <span>
                <span className={cn(label, "block")}>Case study</span>
                <span className="mt-1.5 block text-[17px] font-semibold">
                  {project.name}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="text-xl transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          )}

          {more.length > 0 && (
            <section className="mt-24">
              <h2 className={label}>More writing</h2>
              <ul className="mt-4 border-t border-black/[0.07]">
                {more.map((other) => (
                  <li key={other.slug} className="border-b border-black/[0.07]">
                    <Link
                      href={`/blogs/${other.slug}`}
                      className={cn(
                        "group flex items-baseline justify-between gap-6 rounded py-5",
                        focus,
                      )}
                    >
                      <span className="text-[17px] leading-[1.4] transition-colors duration-150 [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-black/60">
                        {other.title}
                      </span>
                      <span className="shrink-0 text-[13px] text-black/45">
                        {other.category}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <PageFooter back={{ href: "/blogs", label: "Back to Blogs" }} />
        </article>
      </div>
    </main>
  );
}
