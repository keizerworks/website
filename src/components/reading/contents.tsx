"use client";

import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";

// Left-hand contents. The section you're reading is dark; the rest stay
// grey. Tracks headings as they pass the top third of the screen.
export default function Contents({
  title,
  sections,
}: {
  title: string;
  sections: { id: string; text: string }[];
}) {
  const [active, setActive] = useState<string>();

  useEffect(() => {
    const headings = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            setActive(id);
          } else if (entry.boundingClientRect.top > 0) {
            // Scrolled back up past this heading: the previous one is current.
            const i = sections.findIndex((section) => section.id === id);
            setActive((current) =>
              current === id ? sections[i - 1]?.id : current,
            );
          }
        }
      },
      { rootMargin: "0px 0px -70% 0px" },
    );
    for (const heading of headings) observer.observe(heading);
    return () => observer.disconnect();
  }, [sections]);

  // After a click, briefly tint the heading you landed on (like benji.org's
  // highlight), so it's obvious where you are. Skipped with reduced motion.
  const flash = (id: string) => {
    const heading = document.getElementById(id);
    if (!heading) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    heading.animate(
      [
        { backgroundColor: "rgba(45, 45, 195, 0.12)" },
        { backgroundColor: "rgba(45, 45, 195, 0.12)", offset: 0.6 },
        { backgroundColor: "rgba(45, 45, 195, 0)" },
      ],
      { duration: 1400, easing: "ease-out" },
    );
  };

  const item =
    "block py-1 text-[15px] leading-snug transition-colors duration-150";

  return (
    <nav aria-label="Contents" className="mt-14">
      <a
        href="#top"
        className={cn(
          item,
          "mb-3",
          active ? "text-black/35 hover:text-black/70" : "text-black/80",
        )}
      >
        {title}
      </a>
      <ul>
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={() => flash(section.id)}
              aria-current={active === section.id ? "location" : undefined}
              className={cn(
                item,
                active === section.id
                  ? "text-black/80"
                  : "text-black/35 hover:text-black/70",
              )}
            >
              {section.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
