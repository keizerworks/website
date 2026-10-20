"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";

// Left-hand contents. The section you're reading is dark, and a thin marker
// glides to it as you scroll, so the change reads as one smooth move instead
// of items blinking on and off.

const TOP = "top";

export default function Contents({
  title,
  sections,
}: {
  title: string;
  sections: { id: string; text: string }[];
}) {
  const [active, setActive] = useState<string>(TOP);
  const nav = useRef<HTMLElement>(null);
  const marker = useRef<HTMLSpanElement>(null);
  const links = useRef(new Map<string, HTMLAnchorElement>());

  // The current section is the last heading that has passed the top third
  // of the screen. Checked once per frame while scrolling.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      let current = TOP;
      for (const section of sections) {
        const heading = document.getElementById(section.id);
        if (heading && heading.getBoundingClientRect().top <= line) {
          current = section.id;
        }
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  // Move the marker to the active link. Offsets, not getBoundingClientRect,
  // so the page's body zoom doesn't throw the numbers off.
  useLayoutEffect(() => {
    const link = links.current.get(active);
    const bar = marker.current;
    if (!link || !bar) return;
    bar.style.transform = `translateY(${link.offsetTop}px)`;
    bar.style.height = `${link.offsetHeight}px`;
    bar.style.opacity = "1";
  }, [active]);

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

  const register = (id: string) => (el: HTMLAnchorElement | null) => {
    if (el) links.current.set(id, el);
    else links.current.delete(id);
  };

  // Colour follows the marker (300ms, same curve) when the section changes;
  // hover is mouse-only so taps don't stick.
  const item =
    "relative block rounded-sm py-1 pl-3 text-[15px] leading-snug outline-none transition-colors duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:ring-2 focus-visible:ring-[#2D2DC3] motion-reduce:transition-none";

  return (
    <nav ref={nav} aria-label="Contents" className="relative mt-14">
      {/* The marker: a 2px bar that slides and resizes to the active link. */}
      <span
        ref={marker}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 w-[2px] rounded-full bg-[#2D2DC3] opacity-0 transition-[transform,height,opacity] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none"
      />
      <a
        ref={register(TOP)}
        href="#top"
        className={cn(
          item,
          "mb-3",
          active === TOP
            ? "text-black/80"
            : "text-black/35 [@media(hover:hover)_and_(pointer:fine)]:hover:text-black/60",
        )}
      >
        {title}
      </a>
      <ul>
        {sections.map((section) => (
          <li key={section.id}>
            <a
              ref={register(section.id)}
              href={`#${section.id}`}
              onClick={() => flash(section.id)}
              aria-current={active === section.id ? "location" : undefined}
              className={cn(
                item,
                active === section.id
                  ? "text-black/80"
                  : "text-black/35 [@media(hover:hover)_and_(pointer:fine)]:hover:text-black/60",
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
