import Image from "next/image";
import { cn } from "~/lib/utils";
import type { Project } from "~/data/work";

const backgrounds: Record<Project["coverColor"], string> = {
  blue: "bg-[#2D2DC3]",
  // A step lighter than the page so dark covers still read as cards.
  black: "bg-[#1a1a2e] ring-1 ring-inset ring-white/10",
  pink: "bg-[#ff66ff]",
};

// Placeholder cover until real project images exist: brand color + app icon.
export default function ProjectCover({
  project,
  className,
  priority,
}: {
  project: Project;
  className?: string;
  priority?: boolean;
}) {
  if (project.coverImage) {
    return (
      <div
        style={{ backgroundColor: project.coverImageBg }}
        className={cn(
          "relative aspect-video overflow-hidden rounded-lg ring-1 ring-inset ring-white/10",
          className,
        )}
      >
        <Image
          src={project.coverImage}
          alt={`${project.name} cover`}
          fill
          priority={priority}
          sizes="(min-width: 1040px) 960px, 100vw"
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex aspect-video items-center justify-center overflow-hidden rounded-lg",
        backgrounds[project.coverColor],
        className,
      )}
    >
      {project.icon ? (
        <Image
          src={project.icon}
          alt=""
          width={128}
          height={128}
          priority={priority}
          className="size-20 rounded-2xl object-contain md:size-28"
        />
      ) : (
        <span
          className={cn(
            "text-[40px] font-semibold tracking-[-0.03em] md:text-[64px]",
            project.coverColor === "pink" ? "text-black" : "text-white",
          )}
        >
          {project.name}
        </span>
      )}
    </div>
  );
}
