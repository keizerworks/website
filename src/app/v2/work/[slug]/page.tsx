import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import ImageCarousel from "~/components/image-carousel";
import { BackLink, Headline, PageFooter } from "~/components/page-chrome";
import Navbar from "~/components/ui/navbar";
import { inter, serif } from "~/config/font";
import {
  type Project,
  type StoryChapter,
  type Visual,
  getProject,
  projects,
} from "~/data/work";
import { cn } from "~/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

const siteUrl = "https://keizerworks.com";

// Best image for link previews: the cover, else the first real visual.
function seoImage(project: Project) {
  if (project.coverImage) return project.coverImage;
  const visual = project.story?.chapters.find((c) => c.visuals?.length)
    ?.visuals?.[0];
  return visual?.src ?? "/opengraph-image.png";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};

  const seo = project.seo;
  // Plain metadata until a project's SEO copy is written.
  if (!seo) {
    return {
      title: `${project.name} | Work`,
      description: `${project.name}: ${project.headline}.`,
    };
  }

  const path = `/v2/work/${project.slug}`;
  const image = {
    url: seoImage(project),
    alt: `${project.name} by Keizerworks`,
  };

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      siteName: "Keizerworks",
      title: seo.title,
      description: seo.description,
      images: [image],
      tags: [...project.tags, ...project.services],
    },
    twitter: {
      card: "summary_large_image",
      site: "@keizerHq",
      creator: "@keizerHq",
      title: seo.title,
      description: seo.description,
      images: [image],
    },
  };
}

// Structured data so search engines read the page as a case study by us.
function JsonLd({
  project,
  seo,
}: {
  project: Project;
  seo: NonNullable<Project["seo"]>;
}) {
  const url = `${siteUrl}/v2/work/${project.slug}`;
  const keizer = {
    "@type": "Organization",
    name: "Keizerworks",
    url: siteUrl,
    sameAs: [
      "https://x.com/keizerHq",
      "https://www.linkedin.com/company/keizerworks",
      "https://www.instagram.com/keizerworks/",
      "https://github.com/keizerworks",
    ],
  };
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#case-study`,
        name: seo.title,
        headline: seo.title,
        description: seo.description,
        url,
        image: `${siteUrl}${seoImage(project)}`,
        ...(project.year && { dateCreated: project.year }),
        genre: "Case study",
        keywords: seo.keywords.join(", "),
        creator: keizer,
        publisher: keizer,
        about: {
          "@type": "Organization",
          name: project.name,
          ...(project.url && { url: project.url }),
        },
        ...(project.quote &&
          !project.quote.placeholder && {
            review: {
              "@type": "Review",
              reviewBody: project.quote.text,
              author: { "@type": "Person", name: project.quote.name },
              itemReviewed: keizer,
            },
          }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Work",
            item: `${siteUrl}/v2/work`,
          },
          { "@type": "ListItem", position: 3, name: project.name, item: url },
        ],
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

// Shared measure: chapters and the meta strip align to it.
const column = "mx-auto max-w-[1000px]";
const label = "text-xs font-medium uppercase tracking-[0.12em] text-black/40";

// Soft empty block where a visual will go. Deliberately blank.
function VisualPlaceholder({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "rounded-2xl bg-gradient-to-br from-[#ececf2] to-[#f5f5f8] ring-1 ring-inset ring-black/[0.04]",
        className,
      )}
    />
  );
}

// A real project image at its natural shape, framed like the placeholders.
function Shot({ visual, sizes }: { visual: Visual; sizes: string }) {
  return (
    <Image
      src={visual.src}
      alt={visual.alt}
      width={visual.width}
      height={visual.height}
      sizes={sizes}
      className="h-auto w-full rounded-2xl ring-1 ring-inset ring-black/[0.06]"
    />
  );
}

// Soft bars where copy will go.
function TextPlaceholder({
  lines = 3,
  center,
}: {
  lines?: number;
  center?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex flex-col gap-2.5", center && "items-center")}
    >
      {Array.from({ length: lines }, (_, i) => (
        <span
          key={i}
          className="h-3 rounded-full bg-black/[0.06]"
          style={{ width: i === lines - 1 ? "60%" : "100%" }}
        />
      ))}
    </div>
  );
}

function ClientMark({ project }: { project: Project }) {
  return project.icon ? (
    <Image
      src={project.icon}
      alt=""
      width={24}
      height={24}
      className="size-6 rounded-full object-cover"
    />
  ) : (
    <span
      aria-hidden="true"
      className="flex size-6 items-center justify-center rounded-full bg-[#2D2DC3] text-[11px] font-semibold text-white"
    >
      {project.name[0]}
    </span>
  );
}

const prose =
  "flex flex-col gap-4 text-[17px] leading-[1.65] text-black/65 [text-wrap:pretty]";

// Editorial chapter: number and label in a left rail, the statement and
// copy on the right. Body copy is left-aligned; centred paragraphs are hard
// to read.
function ChapterText({
  number,
  label: title,
  children,
}: {
  number: number;
  label: string;
  children: ReactNode;
}) {
  return (
    <section
      className={cn(
        column,
        "mt-24 grid gap-4 border-t border-black/[0.07] pt-8 md:mt-32 md:grid-cols-[200px_1fr] md:gap-10",
      )}
    >
      <h2 className="flex items-baseline gap-3 md:flex-col md:gap-1.5 md:pt-2">
        <span className="text-xs font-medium tabular-nums text-[#2D2DC3]">
          {String(number).padStart(2, "0")}
        </span>
        <span className={label}>{title}</span>
      </h2>
      <div className="max-w-[720px]">{children}</div>
    </section>
  );
}

// Copy marks its key phrase with **double asterisks**. Statements show it
// by contrast (the rest fades back); body copy gets a pink highlighter.
function Rich({ text, tone }: { text: string; tone: "statement" | "body" }) {
  // Non-breaking hyphens keep words like "AI-native" on one line.
  const parts = text.replace(/(\w)-(\w)/g, "$1\u2011$2").split(/\*\*(.+?)\*\*/);
  return parts.map((part, i) =>
    // Odd indexes are the captured **phrases**.
    i % 2 === 1 ? (
      <mark
        key={i}
        className={cn(
          "text-[#111] [box-decoration-break:clone]",
          tone === "statement"
            ? "bg-transparent"
            : "rounded-[3px] bg-[#ff66ff]/30 px-0.5",
        )}
      >
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

function Statement({ text }: { text: string }) {
  // Fully black when nothing is marked; otherwise the mark carries it.
  const marked = text.includes("**");
  return (
    <p
      className={cn(
        "text-[24px] leading-[1.3] tracking-[-0.015em] [text-wrap:balance] md:text-[30px]",
        marked && "text-black/40",
      )}
    >
      <Rich text={text} tone="statement" />
    </p>
  );
}

// Screens sit in the text column, not the full page width.
const wide = "(min-width: 1040px) 1000px, 100vw";
const half = "(min-width: 768px) 500px, 100vw";

// A screen with its caption, so every image says what it shows.
function Figure({ visual, sizes }: { visual: Visual; sizes: string }) {
  return (
    <figure>
      <Shot visual={visual} sizes={sizes} />
      {visual.caption && (
        <figcaption className="mt-3 text-[14px] leading-snug text-black/50">
          {visual.caption}
        </figcaption>
      )}
    </figure>
  );
}

// The chapter's screens, right under its text.
function ChapterVisuals({ chapter }: { chapter: StoryChapter }) {
  const visuals = chapter.visuals ?? [];
  if (visuals.length === 0) return null;
  const layout = chapter.layout ?? "stack";

  if (layout === "carousel") {
    return (
      <div className={column}>
        <ImageCarousel visuals={visuals} label={chapter.label} />
      </div>
    );
  }

  if (layout === "stack") {
    return (
      <div className={cn(column, "mt-12 flex flex-col gap-10")}>
        {visuals.map((visual) => (
          <Figure key={visual.src} visual={visual} sizes={wide} />
        ))}
      </div>
    );
  }

  // pair: two per row. gallery: first (and a lone last) full width.
  return (
    <div
      className={cn(
        column,
        "mt-12 grid items-start gap-x-4 gap-y-10 md:grid-cols-2",
      )}
    >
      {visuals.map((visual, i) => {
        const full =
          layout === "gallery" &&
          (i === 0 || (i === visuals.length - 1 && i % 2 === 1));
        return (
          <div key={visual.src} className={cn(full && "md:col-span-2")}>
            <Figure visual={visual} sizes={full ? wide : half} />
          </div>
        );
      })}
    </div>
  );
}

function Chapter({
  chapter,
  number,
}: {
  chapter: StoryChapter;
  number: number;
}) {
  return (
    <>
      <ChapterText number={number} label={chapter.label}>
        <Statement text={chapter.statement} />
        {chapter.paragraphs && (
          <div className={cn(prose, "mt-6")}>
            {chapter.paragraphs.map((paragraph) => (
              <p key={paragraph}>
                <Rich text={paragraph} tone="body" />
              </p>
            ))}
          </div>
        )}
        {chapter.cards && (
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {chapter.cards.map((card) => (
              <li
                key={card.title}
                className="rounded-xl bg-black/[0.03] p-5 ring-1 ring-inset ring-black/[0.04]"
              >
                <h3 className="font-semibold">{card.title}</h3>
                <p className="mt-1.5 text-[15px] leading-[1.55] text-black/65">
                  {card.body}
                </p>
              </li>
            ))}
          </ul>
        )}
        {chapter.bullets && (
          <ul className="mt-8 grid gap-x-8 gap-y-3 text-[15px] leading-snug text-black/75 sm:grid-cols-2">
            {chapter.bullets.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-[7px] size-1.5 shrink-0 rounded-full bg-[#2D2DC3]"
                />
                {item}
              </li>
            ))}
          </ul>
        )}
      </ChapterText>
      <ChapterVisuals chapter={chapter} />
    </>
  );
}

function MetaItem({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <dt className={label}>{title}</dt>
      <dd className="mt-2 text-[15px] leading-snug text-black/80">
        {children}
      </dd>
    </div>
  );
}

// Matches the TODO text in ~/data/work until real problem statements land.
const TODO_PROBLEM_PREFIX = "The problem statement";

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const quote = project.quote;
  const [before, after] = quote ? quote.text.split(quote.highlight) : ["", ""];
  const story = project.story;
  const problem = project.problem.startsWith(TODO_PROBLEM_PREFIX)
    ? undefined
    : project.problem;

  return (
    <main
      className={cn(inter.className, "min-h-screen bg-[#fafafd] text-[#111]")}
    >
      {project.seo && <JsonLd project={project} seo={project.seo} />}
      <Navbar tone="light" />

      <div className="mx-auto max-w-[1200px] px-5 pb-24 pt-[96px] md:pt-[120px]">
        <div className={column}>
          <BackLink href="/v2/work" label="Back to Work" />
        </div>

        <header className="mt-14 text-center md:mt-20">
          <Headline text={project.headline} />
          <p className="mx-auto mt-6 max-w-[640px] text-[17px] leading-[1.6] text-black/65 [text-wrap:pretty] md:text-lg">
            {project.whatWeDid}
          </p>
        </header>

        {/* Facts in one quiet strip instead of a crowded inline row. */}
        <dl
          className={cn(
            column,
            "mt-14 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-black/[0.07] py-6 md:grid-cols-[1fr_2fr_1fr_1fr]",
          )}
        >
          <MetaItem title="Client">
            <span className="flex items-center gap-2">
              <ClientMark project={project} />
              {project.name}
            </span>
          </MetaItem>
          <MetaItem title="Focus">{project.services.join(", ")}</MetaItem>
          <MetaItem title="Year">{project.year ?? "—"}</MetaItem>
          <MetaItem title="Website">
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-black/20 underline-offset-4 transition-colors duration-150 hover:text-black hover:decoration-black/60"
              >
                {project.url.replace(/^https?:\/\//, "")} ↗
              </a>
            ) : (
              "—"
            )}
          </MetaItem>
        </dl>

        {/* Hero visual: the real cover when there is one, else a soft block.
            Same column as the text and screens below. */}
        <div className={cn(column, "mt-10")}>
          {project.coverImage ? (
            <div
              style={{ backgroundColor: project.coverImageBg }}
              className="relative aspect-video overflow-hidden rounded-2xl ring-1 ring-inset ring-black/[0.06]"
            >
              <Image
                src={project.coverImage}
                alt={`${project.name} cover`}
                fill
                priority
                sizes="(min-width: 1040px) 1000px, 100vw"
                className="object-contain"
              />
            </div>
          ) : (
            <VisualPlaceholder className="aspect-video" />
          )}
        </div>

        {story ? (
          story.chapters.map((chapter, i) => (
            <Chapter key={chapter.label} chapter={chapter} number={i + 1} />
          ))
        ) : (
          // Draft projects: the same shape, with soft placeholders.
          <>
            <ChapterText number={1} label="The brief">
              {problem ? (
                <Statement text={problem} />
              ) : (
                <TextPlaceholder lines={2} />
              )}
              <div className="mt-6">
                <TextPlaceholder lines={3} />
              </div>
            </ChapterText>
            <ChapterText number={2} label="What we built">
              <TextPlaceholder lines={2} />
              <div className="mt-6">
                <TextPlaceholder lines={3} />
              </div>
            </ChapterText>
            <VisualPlaceholder className={cn(column, "mt-12 aspect-[21/9]")} />
          </>
        )}

        {/* Result stays centred: a closing moment, not another chapter. */}
        <section className="mx-auto mt-28 max-w-[760px] text-center md:mt-36">
          <p className={label}>Result</p>
          <div className="mx-auto mt-4 max-w-[620px]">
            {story?.result ? (
              <p
                className={cn(
                  "text-[24px] leading-[1.3] tracking-[-0.01em] [text-wrap:balance] md:text-[28px]",
                  story.result.includes("**") && "text-black/40",
                )}
              >
                <Rich text={story.result} tone="statement" />
              </p>
            ) : (
              <TextPlaceholder lines={2} center />
            )}
          </div>
          {project.results.length > 0 && (
            <dl className="mx-auto mt-10 grid max-w-[860px] grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
              {project.results.map((result) => (
                <div key={result.label}>
                  <dt className="sr-only">{result.label}</dt>
                  <dd>
                    <span className="block text-[40px] font-semibold leading-none tracking-[-0.04em] md:text-[52px]">
                      {result.value}
                    </span>
                    <span className="mx-auto mt-2 block max-w-[180px] text-[15px] leading-snug text-black/60">
                      {result.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </section>

        {quote && (
          <figure className="mx-auto mt-28 max-w-[860px] text-center md:mt-36">
            <blockquote
              className={cn(
                serif.className,
                "text-[24px] leading-[1.4] [text-wrap:pretty] md:text-[32px]",
              )}
            >
              “{before}
              <mark className="bg-[#ff66ff] px-1 text-black [box-decoration-break:clone]">
                {quote.highlight}
              </mark>
              {after}”
            </blockquote>
            <figcaption className="mt-6 text-sm">
              <span className="block">{quote.name}</span>
              <span className="block text-black/50">{quote.detail}</span>
            </figcaption>
          </figure>
        )}

        <PageFooter back={{ href: "/v2/work", label: "Back to Work" }} />
      </div>
    </main>
  );
}
