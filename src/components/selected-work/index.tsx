import Link from "next/link";
import { sectionTitle } from "~/components/studio-services";
import WorkCard from "~/components/work-card";
import { inter } from "~/config/font";
import { getProject } from "~/data/work";
import { cn } from "~/lib/utils";

// Picked by hand for the home page, featured first.
const homeSlugs = ["edulume", "arlink", "chem0"];

// Home preview of /work: the featured case study across the row, then
// the next two side by side. Same cards as the work page.
export default function SelectedWork() {
  const [featured, ...rest] = homeSlugs
    .map((slug) => getProject(slug))
    .filter((project) => project !== undefined);

  return (
    <section
      id="work"
      className={cn(
        inter.className,
        "mx-auto w-full max-w-[1536px] scroll-mt-[100px] bg-black px-4 py-16 text-[#ebebeb] md:px-24 md:py-[100px]",
      )}
    >
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2 className={cn(sectionTitle, "mb-0")}>Selected work</h2>
        <SeeAll href="/work">All work</SeeAll>
      </div>

      <ul className="grid gap-5 md:grid-cols-2">
        <li className="md:col-span-2">
          <WorkCard project={featured} wide featured />
        </li>
        {rest.map((project) => (
          <li key={project.slug}>
            <WorkCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SeeAll({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex shrink-0 items-center gap-1.5 text-[15px] text-[#ebebeb]/60 transition-colors duration-150 hover:text-[#ebebeb]"
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5"
      >
        →
      </span>
    </Link>
  );
}
