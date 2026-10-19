import Link from "next/link";
import { inter } from "~/config/font";
import { cn } from "~/lib/utils";
import { sectionTitle } from "../studio-services";

type Project = {
  name: string;
  tag: string;
  summary: string;
};

const projects: Project[] = [
  {
    name: "Edulume",
    tag: "AI learning platform",
    summary:
      "A multi-tenant, AI-native learning platform. We build the product and run the engineering team.",
  },
  {
    name: "Chem0",
    tag: "Scientific AI",
    summary:
      "A simulation engine that predicts unseen chemical reactions at 94.84% accuracy. Live at 3 institutions.",
  },
  {
    name: "Plobbo",
    tag: "AI marketing · MVP",
    summary:
      "Designed and shipped the MVP of an AI platform that distributes content across every channel automatically.",
  },
  {
    name: "Arlink",
    tag: "Product redesign",
    summary:
      "Rebuilt the product experience in the weeks before a critical fundraise.",
  },
  {
    name: "Voice",
    tag: "Voice infrastructure",
    summary: "Building the voice infrastructure that powers AI learning.",
  },
  {
    name: "Samriddh Square",
    tag: "Website",
    summary:
      "A fast, responsive website that lifted their online authority and engagement.",
  },
];

export default function SelectedWork() {
  return (
    <section
      id="work"
      className={cn(
        inter.className,
        "mx-auto w-full max-w-[1536px] scroll-mt-[100px] bg-black px-4 py-[100px] text-[#ebebeb] md:px-24",
      )}
    >
      <div className="flex items-end justify-between">
        <h2 className={sectionTitle}>Selected Work</h2>
        <Link
          href="/portfolio"
          className="mb-6 text-sm text-[#ebebeb]/70 hover:text-[#ff66ff]"
        >
          All work →
        </Link>
      </div>

      {/* 1px gaps over a tinted background draw crisp hairlines between cells. */}
      <ol className="grid gap-px border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <li
            key={project.name}
            className="flex min-h-[240px] flex-col bg-black p-6 md:p-8"
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.08em] text-[#ebebeb]/50">
              <span className="tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{project.tag}</span>
            </div>
            <h3 className="mt-auto pt-10 text-[32px] font-semibold leading-none tracking-[-0.03em]">
              {project.name}
            </h3>
            <p className="mt-4 text-base leading-6 text-[#ebebeb]/70">
              {project.summary}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
