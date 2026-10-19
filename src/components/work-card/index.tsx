import Image from "next/image";
import Link from "next/link";
import type { Project } from "~/data/work";
import { cn } from "~/lib/utils";

// Light card holding a brand-color panel with the project's landing page,
// plus what makes it ours: a result chip on the panel and a client quote.

const panels: Record<Project["coverColor"], string> = {
  blue: "bg-[#2D2DC3]",
  black: "bg-[#111]",
  pink: "bg-[#ff66ff]",
};

// True for dark hex colors, so the window chrome can flip light/dark.
function isDark(hex = "#ffffff") {
  const n = Number.parseInt(hex.replace("#", ""), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b < 128;
}

// Placeholder window fill per panel color (no screenshot yet).
const emptyWindows: Record<Project["coverColor"], string> = {
  blue: "bg-white/10 text-white",
  black: "bg-white/[0.06] text-white",
  pink: "bg-white/45 text-black",
};

function Panel({
  project,
  priority,
  className,
}: {
  project: Project;
  priority?: boolean;
  className?: string;
}) {
  const result = project.results[0];
  const darkChrome = project.coverImage
    ? isDark(project.coverImageBg)
    : project.coverColor !== "pink";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg",
        panels[project.coverColor],
        className,
      )}
    >
      {/* Every project sits in the same browser window, screenshot or not,
          so the grid reads as one set. The window takes the screenshot's
          own shape and sits centred in the panel, so there's never blank
          space inside it, and its 2px hover lift (mouse only) can't reveal a
          gap at the edge. */}
      <div className="absolute inset-0 flex items-center justify-center px-[8%] pb-[4%] pt-[13%]">
        <div
          style={
            project.coverImage
              ? { backgroundColor: project.coverImageBg }
              : undefined
          }
          className={cn(
            "flex w-full flex-col overflow-hidden rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.22)] transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-y-0.5",
            !project.coverImage && emptyWindows[project.coverColor],
          )}
        >
          <div
            aria-hidden="true"
            className={cn(
              "flex h-5 shrink-0 items-center gap-1 px-2.5 md:h-6",
              darkChrome ? "bg-white/[0.06]" : "bg-black/[0.05]",
            )}
          >
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className={cn(
                  "size-1.5 rounded-full",
                  darkChrome ? "bg-white/25" : "bg-black/15",
                )}
              />
            ))}
          </div>

          {project.coverImage && project.coverImageSize ? (
            <Image
              src={project.coverImage}
              alt={`${project.name} landing page`}
              width={project.coverImageSize.width}
              height={project.coverImageSize.height}
              priority={priority}
              sizes="(min-width: 768px) 60vw, 90vw"
              className="h-auto w-full"
            />
          ) : (
            <div className="flex aspect-[16/9] flex-col items-center justify-center gap-3">
              {project.icon && (
                <Image
                  src={project.icon}
                  alt=""
                  width={56}
                  height={56}
                  className="size-10 rounded-xl object-contain md:size-14"
                />
              )}
              <span className="text-[20px] font-semibold tracking-[-0.02em] md:text-[26px]">
                {project.name}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* The headline result, pinned to the panel like a sticker. */}
      {result && (
        <span className="absolute left-3 top-3 z-10 inline-flex items-baseline gap-1.5 rounded-full bg-[#fafafd] px-3 py-1.5 text-black shadow-sm md:left-4 md:top-4">
          <span className="text-[15px] font-semibold tracking-[-0.02em]">
            {result.value}
          </span>
          <span className="text-xs text-black/60">{result.label}</span>
        </span>
      )}
    </div>
  );
}

function Title({ project, large }: { project: Project; large?: boolean }) {
  return (
    <h2
      className={cn(
        "leading-[1.3] tracking-[-0.015em]",
        large ? "text-[22px] md:text-[28px]" : "text-[19px] md:text-[22px]",
      )}
    >
      {/* `inline`: globals.css makes spans inline-block, which eats spaces. */}
      <span className="inline font-semibold">{project.name}</span>
      <span className="inline text-black/40"> – </span>
      {project.headline.charAt(0).toUpperCase() + project.headline.slice(1)}
    </h2>
  );
}

// Just the highlighted phrase from the client's note, with attribution.
function QuoteSnippet({ project }: { project: Project }) {
  const quote = project.quote;
  if (!quote) return null;
  return (
    <p className="mt-3 text-[14px] leading-[1.55] text-black/70">
      “
      <mark className="bg-[#ff66ff] px-0.5 text-black [box-decoration-break:clone]">
        {quote.highlight}
      </mark>
      ”<span className="inline text-black/45"> — {quote.name}</span>
    </p>
  );
}

function Meta({ project }: { project: Project }) {
  return (
    <p className="mt-3 text-[13px] text-black/50">
      {project.url
        ? project.url.replace(/^https?:\/\//, "")
        : project.tags.join(", ")}
    </p>
  );
}

export default function WorkCard({
  project,
  wide,
  featured,
  priority,
}: {
  project: Project;
  // Spans the full row: panel on the left, story beside it.
  wide?: boolean;
  // Shows the "Featured" label (first project only).
  featured?: boolean;
  priority?: boolean;
}) {
  const card =
    "group flex h-full rounded-xl bg-[#fafafd] p-3 text-black transition-transform duration-150 active:scale-[0.99] md:p-4";

  if (wide) {
    return (
      <Link
        href={`/v2/work/${project.slug}`}
        className={cn(card, "flex-col gap-5 md:flex-row md:gap-8")}
      >
        <Panel
          project={project}
          priority={priority}
          className="aspect-[16/10] md:w-[62%] md:shrink-0"
        />
        {/* Label pinned to the top, story to the bottom of the column. */}
        <div className="flex flex-col justify-between gap-6 px-1 pb-1 md:py-2 md:pr-4">
          {featured ? (
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-black/40">
              Featured
            </p>
          ) : (
            <span />
          )}
          <div>
            <Title project={project} large />
            <QuoteSnippet project={project} />
            <Meta project={project} />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/v2/work/${project.slug}`} className={cn(card, "flex-col")}>
      <Panel project={project} priority={priority} className="aspect-[16/10]" />
      <div className="mt-4 px-1 pb-1">
        <Title project={project} />
        <QuoteSnippet project={project} />
        <Meta project={project} />
      </div>
    </Link>
  );
}
