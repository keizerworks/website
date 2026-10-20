import type { Metadata } from "next";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import type { ReactNode } from "react";
import ImageCarousel from "~/components/image-carousel";
import { BackLink, Headline, PageFooter } from "~/components/page-chrome";
import Navbar from "~/components/ui/navbar";
import VideoEmbed from "~/components/video-embed";
import ZoomImage from "~/components/zoom-image";
import { dmMono, inter } from "~/config/font";
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
  // Plain metadata until a project's SEO copy is written, and kept out of
  // search: these pages are mostly "coming soon".
  if (!seo) {
    return {
      title: `${project.name} | Work`,
      description: `${project.name}: ${project.headline}.`,
      alternates: { canonical: `/work/${project.slug}` },
      robots: { index: false, follow: true },
    };
  }

  const path = `/work/${project.slug}`;
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
  const url = `${siteUrl}/work/${project.slug}`;
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
            item: `${siteUrl}/work`,
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
const label = "text-[14px] text-black/45";

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

// One left-aligned reading column, after LCA's AI field guide.
const reading = "mx-auto w-full max-w-[760px]";

// Chapter: a hairline, a small mono tag, a large heading (the statement),
// a brighter lead paragraph, then the body.
function ChapterText({
  label: title,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <section
      className={cn(
        reading,
        "mt-24 border-t border-black/[0.08] pt-6 md:mt-32",
      )}
    >
      <p
        className={cn(
          dmMono.className,
          "inline-block bg-[#111] px-2 py-1 text-[12px] uppercase leading-none tracking-[0.12em] text-[#fafafd]",
        )}
      >
        {title}
      </p>
      <div className="mt-8">{children}</div>
    </section>
  );
}

// Non-breaking hyphens keep words like "AI-native" on one line.
function noBreakHyphens(text: string) {
  return text.replace(/(\w)-(\w)/g, "$1\u2011$2");
}

function Statement({ text }: { text: string }) {
  return (
    <h2 className="text-[30px] font-medium leading-[1.12] tracking-[-0.03em] text-[#111] [text-wrap:balance] md:text-[40px]">
      {noBreakHyphens(text)}
    </h2>
  );
}

// Screens sit in the text column, not the full page width.
const wide = "(min-width: 1040px) 1000px, 100vw";
const half = "(min-width: 768px) 500px, 100vw";

// Every screen sits in the same frame (same shape, same backdrop), so a
// chapter's images read as one set whatever their own proportions. Click
// one to see it full size.
function Figure({ visual, sizes }: { visual: Visual; sizes: string }) {
  return (
    <figure>
      <div className="flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl bg-[#efeff3] p-[5%]">
        <ZoomImage
          src={visual.src}
          alt={visual.alt}
          width={visual.width}
          height={visual.height}
          sizes={sizes}
          buttonClassName="flex size-full items-center justify-center"
          className="h-auto max-h-full w-auto max-w-full rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
        />
      </div>
      {visual.caption && (
        <figcaption
          className={cn(
            dmMono.className,
            "mt-3 text-[13px] leading-snug text-black/50",
          )}
        >
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

function Chapter({ chapter }: { chapter: StoryChapter }) {
  return (
    <>
      <ChapterText label={chapter.label}>
        <Statement text={chapter.statement} />
        {chapter.paragraphs && (
          <div className="mt-6 flex flex-col gap-5 [text-wrap:pretty]">
            {chapter.paragraphs.map((paragraph, i) => (
              <p
                key={paragraph}
                // The first paragraph leads, a step brighter and larger.
                className={
                  i === 0
                    ? "text-[19px] leading-[1.55] text-[#111]/85 md:text-[20px]"
                    : "text-[17px] leading-[1.7] text-black/65"
                }
              >
                {noBreakHyphens(paragraph)}
              </p>
            ))}
          </div>
        )}
        {chapter.cards && (
          <ul
            className={cn(
              "mt-10 grid gap-x-8 gap-y-6 border-t border-black/[0.08] pt-6",
              chapter.cards.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2",
            )}
          >
            {chapter.cards.map((card) => (
              <li key={card.title}>
                <h3 className="text-[16px] font-medium text-[#111]">
                  {card.title}
                </h3>
                <p className="mt-1.5 text-[15px] leading-[1.55] text-black/60">
                  {card.body}
                </p>
              </li>
            ))}
          </ul>
        )}
        {chapter.bullets && (
          <ul className="mt-8 border-b border-black/[0.08] text-[17px] leading-snug text-black/75">
            {chapter.bullets.map((item) => (
              <li key={item} className="border-t border-black/[0.08] py-3.5">
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

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  // Link-only projects have no case study; send visitors to the site.
  if (project.linkOnly && project.url) redirect(project.url);

  const quote = project.quote;
  const [before, after] = quote ? quote.text.split(quote.highlight) : ["", ""];
  const story = project.story;

  return (
    <main
      className={cn(inter.className, "min-h-screen bg-[#fafafd] text-[#111]")}
    >
      {project.seo && <JsonLd project={project} seo={project.seo} />}
      <Navbar tone="light" />

      <div className="mx-auto max-w-[1200px] px-5 pb-24 pt-[96px] md:pt-[120px]">
        <div className={column}>
          <BackLink href="/work" label="Back to Work" />
        </div>

        <header className="mt-14 text-center md:mt-20">
          <Headline text={project.headline} accent={false} />
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
          {project.heroVideo ? (
            <VideoEmbed {...project.heroVideo} />
          ) : project.heroProfile && project.coverImage && project.icon ? (
            // Like the client's X profile: their banner, with the round
            // logo overlapping its bottom-left corner.
            <div className="relative pb-12 md:pb-16">
              <div
                style={{
                  backgroundColor: project.coverImageBg,
                  aspectRatio: project.coverImageSize
                    ? `${project.coverImageSize.width} / ${project.coverImageSize.height}`
                    : "3 / 1",
                }}
                className="relative overflow-hidden rounded-2xl ring-1 ring-inset ring-black/[0.06]"
              >
                <Image
                  src={project.coverImage}
                  alt={`${project.name} banner`}
                  fill
                  priority
                  sizes="(min-width: 1040px) 1000px, 100vw"
                  className="object-cover"
                />
              </div>
              <Image
                src={project.icon}
                alt={`${project.name} logo`}
                width={160}
                height={160}
                className="absolute bottom-0 left-5 size-24 rounded-full bg-black ring-4 ring-[#fafafd] md:left-8 md:size-32"
              />
            </div>
          ) : project.coverImage ? (
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
          ) : // Nothing to show yet: no grey block.
          null}
        </div>

        {story ? (
          story.chapters.map((chapter) => (
            <Chapter key={chapter.label} chapter={chapter} />
          ))
        ) : (
          // No story written yet: say so plainly, in the Result's style.
          <section className="mx-auto mt-24 max-w-[760px] text-center md:mt-32">
            <p className={label}>Case study</p>
            <p className="mx-auto mt-4 max-w-[620px] text-[24px] leading-[1.3] tracking-[-0.01em] [text-wrap:balance] md:text-[28px]">
              The full story is coming soon.
            </p>
            {quote && (
              <p className="mt-4 text-[17px] text-black/55">
                Until then, here's what they said.
              </p>
            )}
          </section>
        )}

        {/* Result stays centred: a closing moment, not another chapter. */}
        {story && (
          <section className="mx-auto mt-28 max-w-[760px] text-center md:mt-36">
            <p className={label}>Result</p>
            <div className="mx-auto mt-4 max-w-[620px]">
              {story?.result ? (
                <p
                  className={cn(
                    "text-[24px] leading-[1.3] tracking-[-0.01em] [text-wrap:balance] md:text-[28px]",
                  )}
                >
                  {noBreakHyphens(story.result)}
                </p>
              ) : null}
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
        )}

        {quote && (
          <figure className="mx-auto mt-28 max-w-[860px] text-center md:mt-36">
            <blockquote className="text-[24px] leading-[1.35] tracking-[-0.015em] [text-wrap:pretty] md:text-[30px]">
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

        <PageFooter back={{ href: "/work", label: "Back to Work" }} />
      </div>
    </main>
  );
}
