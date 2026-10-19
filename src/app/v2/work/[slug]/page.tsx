import { ArrowLeft, CornerUpLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import Navbar from "~/components/ui/navbar";
import { inter, serif } from "~/config/font";
import { type Project, type Visual, getProject, projects } from "~/data/work";
import { cn } from "~/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

const siteUrl = "https://keizerworks.com";

// Best image for link previews: the cover, else the first real visual.
function seoImage(project: Project) {
  const visual = project.story?.visuals?.built;
  if (project.coverImage) return project.coverImage;
  if (visual) return visual.src;
  return "/opengraph-image.png";
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

// Editorial chapter: small label in a left rail, content on the right.
// Body copy is left-aligned; centred paragraphs are hard to read.
function Chapter({
  title,
  statement,
  children,
}: {
  title: string;
  statement?: string;
  children?: ReactNode;
}) {
  return (
    <section
      className={cn(
        column,
        "mt-24 grid gap-4 border-t border-black/[0.07] pt-8 md:mt-32 md:grid-cols-[200px_1fr] md:gap-10",
      )}
    >
      <h2 className={cn(label, "md:pt-2")}>{title}</h2>
      <div className="max-w-[720px]">
        {statement ? (
          <p className="text-[24px] leading-[1.3] tracking-[-0.015em] [text-wrap:balance] md:text-[30px]">
            {statement}
          </p>
        ) : (
          <TextPlaceholder lines={2} />
        )}
        {children}
      </div>
    </section>
  );
}

// The last two words get the italic serif accent, LCA-style.
function Headline({ text }: { text: string }) {
  const sentence = text.charAt(0).toUpperCase() + text.slice(1);
  const words = sentence.split(" ");
  return (
    <h1 className="mx-auto max-w-[900px] text-[36px] leading-[1.1] tracking-[-0.025em] [text-wrap:balance] md:text-[56px]">
      {words.slice(0, -2).join(" ")}{" "}
      <em className={cn(serif.className, "italic tracking-normal")}>
        {words.slice(-2).join(" ")}
      </em>
    </h1>
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

// Solid glyphs, like LCA's footer (lucide only draws outlines).
type Glyph = { className?: string };

function MailGlyph({ className }: Glyph) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        d="M2 4.5h20v15H2zM4.2 7l7.8 5.4L19.8 7v2.5L12 14.9 4.2 9.5z"
      />
    </svg>
  );
}

function XGlyph({ className }: Glyph) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

function LinkedInGlyph({ className }: Glyph) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <circle cx="4.5" cy="4.5" r="2.4" />
      <path d="M2.5 8.8h4v12.7h-4zM9 8.8h3.8v1.8c.6-1.1 2-2.1 4.1-2.1 3.9 0 4.6 2.5 4.6 5.8v7.2h-4v-6.4c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3v6.5H9z" />
    </svg>
  );
}

function InstagramGlyph({ className }: Glyph) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        d="M8 2h8a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6V8a6 6 0 0 1 6-6Zm4 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2.6a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8ZM17.6 5a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Z"
      />
    </svg>
  );
}

function GitHubGlyph({ className }: Glyph) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

const tile =
  "flex size-11 items-center justify-center rounded-xl bg-black/[0.06] text-black/40 transition-[color,background-color,transform] duration-150 hover:bg-black/[0.1] hover:text-black/70 active:scale-[0.95]";

const socials = [
  { label: "Email", href: "mailto:biz@keizerworks.com", icon: MailGlyph },
  { label: "X", href: "https://x.com/keizerHq", icon: XGlyph },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/keizerworks",
    icon: LinkedInGlyph,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/keizerworks/",
    icon: InstagramGlyph,
  },
  {
    label: "GitHub",
    href: "https://github.com/keizerworks",
    icon: GitHubGlyph,
  },
];

// LCA-style sign-off: back to work, ways to reach us, copyright.
function PageFooter() {
  return (
    <footer className="mt-24 flex flex-col items-center gap-5">
      <nav aria-label="Keizerworks links" className="flex gap-2">
        <Link href="/v2/work" aria-label="Back to Work" className={tile}>
          <ArrowLeft className="size-[22px]" strokeWidth={2.5} />
        </Link>
        {socials.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            className={tile}
            {...(href.startsWith("http")
              ? { target: "_blank", rel: "noreferrer" }
              : {})}
          >
            <Icon className="size-[22px]" />
          </a>
        ))}
      </nav>
      <p className="text-[15px] text-black/50">
        © Keizerworks {new Date().getFullYear()}
      </p>
    </footer>
  );
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const quote = project.quote;
  const [before, after] = quote ? quote.text.split(quote.highlight) : ["", ""];
  const story = project.story;
  const visuals = story?.visuals;
  const brand = visuals?.brand ?? [];
  const problem = project.problem.startsWith(TODO_PROBLEM_PREFIX)
    ? undefined
    : project.problem;

  return (
    <main
      className={cn(inter.className, "min-h-screen bg-[#fafafd] text-[#111]")}
    >
      {project.seo && <JsonLd project={project} seo={project.seo} />}
      <Navbar />

      <div className="mx-auto max-w-[1200px] px-5 pb-24 pt-[96px] md:pt-[120px]">
        <Link
          href="/v2/work"
          className="group inline-flex items-center gap-2 text-[15px] text-black/45 transition-colors duration-150 hover:text-black/80 active:scale-[0.97]"
        >
          <span
            aria-hidden="true"
            className="flex size-6 items-center justify-center rounded-full bg-black/45 text-[#fafafd] transition-colors duration-150 group-hover:bg-black/80"
          >
            <CornerUpLeft className="size-3" strokeWidth={2.75} />
          </span>
          Back to Work
        </Link>

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

        {/* Hero visual: the real cover when there is one, else a soft block. */}
        <div className="mt-10">
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
                sizes="(min-width: 1240px) 1160px, 100vw"
                className="object-contain"
              />
            </div>
          ) : (
            <VisualPlaceholder className="aspect-video" />
          )}
        </div>

        <Chapter title="Vision" statement={problem}>
          <div className="mt-6">
            {story ? (
              <div className="flex flex-col gap-4 text-[17px] leading-[1.65] text-black/65 [text-wrap:pretty]">
                {story.vision.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <TextPlaceholder lines={3} />
            )}
          </div>
        </Chapter>
        <div className="mt-12 grid items-start gap-4 md:grid-cols-2">
          {visuals?.vision ? (
            visuals.vision.map((visual) => (
              <Shot
                key={visual.src}
                visual={visual}
                sizes="(min-width: 768px) 580px, 100vw"
              />
            ))
          ) : (
            <>
              <VisualPlaceholder className="aspect-[4/3]" />
              <VisualPlaceholder className="aspect-[4/3]" />
            </>
          )}
        </div>

        <Chapter
          title={story?.built.title ?? "What we built"}
          statement={story?.built.statement}
        >
          {story && (
            <>
              {story.built.notes && (
                <div className="mt-6 flex flex-col gap-4 text-[17px] leading-[1.65] text-black/65 [text-wrap:pretty]">
                  {story.built.notes.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              )}
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {story.built.parts.map((part) => (
                  <li
                    key={part.title}
                    className="rounded-xl bg-black/[0.03] p-5 ring-1 ring-inset ring-black/[0.04]"
                  >
                    <h3 className="font-semibold">{part.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-[1.55] text-black/65">
                      {part.body}
                    </p>
                  </li>
                ))}
              </ul>
              <ul className="mt-8 grid gap-x-8 gap-y-3 text-[15px] leading-snug text-black/75 sm:grid-cols-2">
                {story.built.highlights.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[7px] size-1.5 shrink-0 rounded-full bg-[#2D2DC3]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
          <ul className="mt-8 flex flex-wrap gap-2">
            {project.services.map((service) => (
              <li
                key={service}
                className="rounded-full bg-black/[0.05] px-3 py-1 text-sm text-black/70"
              >
                {service}
              </li>
            ))}
          </ul>
        </Chapter>
        <div className="mt-12">
          {visuals?.built ? (
            <Shot
              visual={visuals.built}
              sizes="(min-width: 1240px) 1160px, 100vw"
            />
          ) : (
            <VisualPlaceholder className="aspect-[21/9]" />
          )}
        </div>

        {brand.length > 0 && (
          <>
            <Chapter
              title="Brand & social"
              statement="A brand to match the product, carried through the site, launch banners, and social posts."
            />
            {/* First and last run full width; the ones between pair up. */}
            <div className="mt-12 grid items-start gap-4 md:grid-cols-2">
              {brand.map((visual, i) => {
                const full = i === 0 || (i === brand.length - 1 && i % 2 === 1);
                return (
                  <div key={visual.src} className={cn(full && "md:col-span-2")}>
                    <Shot
                      visual={visual}
                      sizes={
                        full
                          ? "(min-width: 1240px) 1160px, 100vw"
                          : "(min-width: 768px) 580px, 100vw"
                      }
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Result stays centred: a closing moment, not another chapter. */}
        <section className="mx-auto mt-28 max-w-[760px] text-center md:mt-36">
          <p className={label}>Result</p>
          <div className="mx-auto mt-4 max-w-[620px]">
            {story?.result ? (
              <p className="text-[24px] leading-[1.3] tracking-[-0.01em] [text-wrap:balance] md:text-[28px]">
                {story.result}
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

        <PageFooter />
      </div>
    </main>
  );
}
