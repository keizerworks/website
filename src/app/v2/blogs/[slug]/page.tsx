import { CornerUpLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageFooter } from "~/components/page-chrome";
import { inter } from "~/config/font";
import {
  type Block,
  formatPostDate,
  getPost,
  hasContent,
  headingId,
  posts,
} from "~/data/posts";
import { getProject } from "~/data/work";
import { cn } from "~/lib/utils";
import Contents from "./contents";

type Props = { params: Promise<{ slug: string }> };

const siteUrl = "https://keizerworks.com";
const label = "text-xs font-medium uppercase tracking-[0.12em] text-black/40";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const path = `/v2/blogs/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: path },
    // Outlines and placeholders stay out of search until they're written.
    robots: hasContent(post) ? undefined : { index: false, follow: true },
    openGraph: {
      type: "article",
      url: path,
      siteName: "Keizerworks",
      title: post.title,
      description: post.excerpt,
      ...(post.date && { publishedTime: post.date }),
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
  priority,
}: Omit<Extract<Block, { type: "figure" }>, "type"> & { priority?: boolean }) {
  return (
    <figure className="my-14">
      <div
        style={bg ? { backgroundColor: bg } : undefined}
        className="overflow-hidden rounded-2xl ring-1 ring-inset ring-black/[0.06]"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes="(min-width: 1024px) 680px, 100vw"
          className="h-auto w-full"
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

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p className="my-5">{block.text}</p>;
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
  if (!post) notFound();

  const project = post.project ? getProject(post.project) : undefined;
  const more = posts.filter((other) => other.slug !== post.slug).slice(0, 3);
  const sections = (post.body ?? [])
    .filter((block) => block.type === "h2")
    .map((block) => ({ id: headingId(block.text), text: block.text }));

  const indexLink = (
    <Link
      href="/v2/blogs"
      className="inline-flex items-center gap-2 text-[15px] text-black/40 transition-colors duration-150 hover:text-black/80"
    >
      <CornerUpLeft className="size-4" strokeWidth={1.75} />
      Index
    </Link>
  );

  return (
    <main
      id="top"
      className={cn(inter.className, "min-h-screen bg-[#fafafd] text-[#111]")}
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
              url: `${siteUrl}/v2/blogs/${post.slug}`,
              author: { "@type": "Organization", name: "Keizerworks" },
              publisher: { "@type": "Organization", name: "Keizerworks" },
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

          {post.cover && <Figure {...post.cover} priority />}

          {post.body?.map((block, i) => (
            <BlockView key={i} block={block} />
          ))}

          {project && (
            <Link
              href={`/v2/work/${project.slug}`}
              className="group mt-16 flex items-center justify-between gap-6 rounded-xl bg-black/[0.03] p-5 ring-1 ring-inset ring-black/[0.05] transition-colors duration-150 hover:bg-black/[0.05] active:scale-[0.99]"
            >
              <span>
                <span className={cn(label, "block")}>Case study</span>
                <span className="mt-1.5 block text-[17px] font-semibold">
                  {project.name}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="text-xl transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          )}

          <section className="mt-24">
            <h2 className={label}>More writing</h2>
            <ul className="mt-4 border-t border-black/[0.07]">
              {more.map((other) => (
                <li key={other.slug} className="border-b border-black/[0.07]">
                  <Link
                    href={`/v2/blogs/${other.slug}`}
                    className="group flex items-baseline justify-between gap-6 py-5"
                  >
                    <span className="text-[17px] leading-[1.4] transition-colors duration-150 group-hover:text-black/60">
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

          <PageFooter back={{ href: "/v2/blogs", label: "Back to Blogs" }} />
        </article>
      </div>
    </main>
  );
}
