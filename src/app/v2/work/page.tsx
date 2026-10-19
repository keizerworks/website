import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "~/components/ui/navbar";
import WorkCard from "~/components/work-card";
import { inter } from "~/config/font";
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
    <main
      className={cn(inter.className, "min-h-screen bg-black text-[#ebebeb]")}
    >
      <Navbar />

      <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-[110px] md:px-16">
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

        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {shown.map((project, index) => {
            // Bento: the first project takes the full row; if that leaves an
            // odd one at the end, it does too, so no card sits alone.
            const featured = index === 0;
            const lastAlone =
              index === shown.length - 1 && (shown.length - 1) % 2 === 1;
            return (
              <li
                key={project.slug}
                className={cn((featured || lastAlone) && "md:col-span-2")}
              >
                <WorkCard
                  project={project}
                  wide={featured || lastAlone}
                  featured={featured}
                  priority={index < 3}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
