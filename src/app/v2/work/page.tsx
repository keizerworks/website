import type { Metadata } from "next";
import Link from "next/link";
import ProjectCover from "~/components/project-cover";
import StudioPage from "~/components/studio-page";
import { type WorkTag, projects, workTags } from "~/data/work";
import { cn } from "~/lib/utils";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Products, platforms, and websites Keizerworks has designed and built for startups.",
};

type Props = { searchParams: Promise<{ tag?: string }> };

export default async function WorkPage({ searchParams }: Props) {
  const { tag } = await searchParams;
  const active = workTags.find((t) => t === tag);
  const shown = active
    ? projects.filter((project) => project.tags.includes(active))
    : projects;

  // Filters are plain links (?tag=AI), so the page needs no client JS.
  const filters: { label: string; tag?: WorkTag; count: number }[] = [
    { label: "All", count: projects.length },
    ...workTags
      .map((t) => ({
        label: t,
        tag: t,
        count: projects.filter((project) => project.tags.includes(t)).length,
      }))
      .filter((filter) => filter.count > 0),
  ];

  return (
    <StudioPage tone="ink">
      <h1 className="text-[32px] leading-[1.1] tracking-[-0.02em] md:text-[40px]">
        Selected work
      </h1>
      <p className="mt-4 max-w-[640px] text-base leading-[1.5] text-[#ebebeb]/70">
        Products, platforms, and websites we've designed and built with
        founders, from first screen to production.
      </p>

      <nav aria-label="Filter work" className="mt-8 flex flex-wrap gap-2">
        {filters.map((filter) => {
          const isActive = filter.tag === active;
          return (
            <Link
              key={filter.label}
              href={filter.tag ? `/v2/work?tag=${filter.tag}` : "/v2/work"}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "rounded-full border px-3 py-1 text-sm transition-colors duration-150",
                isActive
                  ? "border-white bg-white text-black"
                  : "border-white/20 text-[#ebebeb]/80 hover:border-white/50",
              )}
            >
              {filter.label}
              <span className="ml-1.5 tabular-nums opacity-50">
                {filter.count}
              </span>
            </Link>
          );
        })}
      </nav>

      <ul className="mt-10 flex flex-col gap-14">
        {shown.map((project, index) => (
          <li key={project.slug}>
            <Link href={`/v2/work/${project.slug}`} className="group block">
              <ProjectCover project={project} priority={index === 0} />
              <h2 className="mt-4 text-xl leading-snug md:text-2xl">
                <span className="font-semibold">{project.name}:</span>{" "}
                <span className="decoration-white/40 underline-offset-4 group-hover:underline">
                  {project.headline}
                </span>
              </h2>
              <p className="mt-2 flex gap-3 text-sm text-[#ebebeb]/60">
                <span>{project.tags.join(", ")}</span>
                {project.year && <span>{project.year}</span>}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </StudioPage>
  );
}
