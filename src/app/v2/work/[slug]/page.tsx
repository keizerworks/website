import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import Navbar from "~/components/ui/navbar";
import { inter, serif } from "~/config/font";
import { type Project, getProject, projects } from "~/data/work";
import { cn } from "~/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: `${project.name} | Work`,
    description: `${project.name}: ${project.headline}.`,
  };
}

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

// Soft bars where copy will go.
function TextPlaceholder({ lines = 3 }: { lines?: number }) {
  return (
    <div aria-hidden="true" className="flex flex-col items-center gap-2.5">
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
      width={40}
      height={40}
      className="size-10 rounded-full object-cover"
    />
  ) : (
    <span
      aria-hidden="true"
      className="flex size-10 items-center justify-center rounded-full bg-[#2D2DC3] text-sm font-semibold text-white"
    >
      {project.name[0]}
    </span>
  );
}

function Chapter({
  label,
  statement,
  children,
}: {
  label: string;
  statement?: string;
  children?: ReactNode;
}) {
  return (
    <section className="mx-auto mt-28 max-w-[760px] text-center">
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-black/40">
        {label}
      </p>
      <div className="mx-auto mt-4 max-w-[620px]">
        {statement ? (
          <h2 className="text-[24px] leading-[1.3] tracking-[-0.01em] md:text-[28px]">
            {statement}
          </h2>
        ) : (
          <TextPlaceholder lines={2} />
        )}
      </div>
      {children}
    </section>
  );
}

// The last two words get the italic serif accent, LCA-style.
function Headline({ text }: { text: string }) {
  const sentence = text.charAt(0).toUpperCase() + text.slice(1);
  const words = sentence.split(" ");
  return (
    <h1 className="mx-auto mt-8 max-w-[860px] text-[34px] leading-[1.15] tracking-[-0.02em] md:text-[48px]">
      {words.slice(0, -2).join(" ")}{" "}
      <em className={cn(serif.className, "italic tracking-normal")}>
        {words.slice(-2).join(" ")}
      </em>
    </h1>
  );
}

// Matches the TODO text in ~/data/work until real problem statements land.
const TODO_PROBLEM_PREFIX = "The problem statement";

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const quote = project.quote;
  const [before, after] = quote ? quote.text.split(quote.highlight) : ["", ""];
  const problem = project.problem.startsWith(TODO_PROBLEM_PREFIX)
    ? undefined
    : project.problem;

  return (
    <main
      className={cn(inter.className, "min-h-screen bg-[#fafafd] text-[#111]")}
    >
      <Navbar />

      <div className="mx-auto max-w-[1200px] px-5 pb-24 pt-[96px] md:pt-[120px]">
        <Link
          href="/v2/work"
          className="group inline-flex items-center gap-2 text-sm text-black/50 transition-colors duration-150 hover:text-black"
        >
          <span
            aria-hidden="true"
            className="flex size-6 items-center justify-center rounded-full bg-black/[0.06] transition-transform duration-200 group-hover:-translate-x-0.5"
          >
            ←
          </span>
          All work
        </Link>

        <header className="mt-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
            <ClientMark project={project} />
            <span className="flex items-center gap-2">
              <span>Client</span>
              <span className="text-black/40">·</span>
              <span className="text-black/60">{project.name}</span>
            </span>
            <span className="flex items-center gap-2">
              <span>Focus</span>
              <span className="text-black/40">·</span>
              <span className="text-black/60">
                {project.services.join(", ")}
              </span>
            </span>
          </div>

          <Headline text={project.headline} />

          <p className="mx-auto mt-6 max-w-[680px] text-base leading-[1.6] text-black/70 md:text-lg">
            {project.whatWeDid}
          </p>
        </header>

        {/* Hero visual: the real cover when there is one, else a soft block. */}
        <div className="mt-16">
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

        <Chapter label="Vision" statement={problem}>
          <div className="mx-auto mt-6 max-w-[560px]">
            <TextPlaceholder lines={3} />
          </div>
        </Chapter>
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          <VisualPlaceholder className="aspect-[4/3]" />
          <VisualPlaceholder className="aspect-[4/3]" />
        </div>

        <Chapter label="What we built">
          <ul className="mt-6 flex flex-wrap justify-center gap-2">
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
        <VisualPlaceholder className="mt-14 aspect-[21/9]" />

        <Chapter label="Result">
          {project.results.length > 0 ? (
            <dl className="mx-auto mt-8 flex max-w-[620px] flex-wrap justify-center gap-x-16 gap-y-8">
              {project.results.map((result) => (
                <div key={result.label}>
                  <dt className="sr-only">{result.label}</dt>
                  <dd>
                    <span className="block text-[48px] font-semibold leading-none tracking-[-0.04em] md:text-[64px]">
                      {result.value}
                    </span>
                    <span className="mt-2 block text-black/60">
                      {result.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </Chapter>

        {quote && (
          <figure className="mx-auto mt-24 max-w-[860px] text-center">
            <blockquote
              className={cn(
                serif.className,
                "text-[24px] leading-[1.4] md:text-[32px]",
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

        <Link
          href={`/v2/work/${next.slug}`}
          className="group mx-auto mt-28 flex max-w-[860px] items-center justify-between border-y border-black/10 py-8"
        >
          <span>
            <span className="block text-xs font-medium uppercase tracking-[0.12em] text-black/40">
              Next project
            </span>
            <span className="mt-2 block text-2xl font-semibold md:text-[32px]">
              {next.name}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="text-2xl transition-transform duration-200 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </main>
  );
}
