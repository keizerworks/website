"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ZoomImage from "~/components/zoom-image";
import { dmMono } from "~/config/font";
import type { Visual } from "~/data/work";
import { cn } from "~/lib/utils";

// A row of images at one height, each at its own width. Native scroll-snap
// does the swiping; the arrows just step to the next image.

const arrow =
  "flex size-10 items-center justify-center rounded-full bg-black/[0.06] text-black/60 transition-[color,background-color,transform,opacity] duration-150 hover:bg-black/[0.1] hover:text-black active:scale-[0.95] disabled:pointer-events-none disabled:opacity-30";

export default function ImageCarousel({
  visuals,
  label,
}: {
  visuals: Visual[];
  label: string;
}) {
  const track = useRef<HTMLUListElement>(null);
  const items = useRef<(HTMLLIElement | null)[]>([]);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      setAtStart(el.scrollLeft <= 4);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Snap to the first image past the left edge in the chosen direction.
  // offsetLeft, not getBoundingClientRect: the body is zoomed.
  const step = (direction: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const lefts = items.current
      .filter((item): item is HTMLLIElement => item !== null)
      .map((item) => item.offsetLeft - el.offsetLeft);
    const target =
      direction === 1
        ? lefts.find((left) => left > el.scrollLeft + 4)
        : [...lefts].reverse().find((left) => left < el.scrollLeft - 4);
    el.scrollTo({ left: target ?? (direction === 1 ? el.scrollWidth : 0) });
  };

  return (
    <div className="mt-12">
      <div className="mb-4 flex justify-end gap-2">
        <button
          type="button"
          aria-label="Previous image"
          disabled={atStart}
          onClick={() => step(-1)}
          className={arrow}
        >
          <ArrowLeft className="size-[18px]" strokeWidth={2.25} />
        </button>
        <button
          type="button"
          aria-label="Next image"
          disabled={atEnd}
          onClick={() => step(1)}
          className={arrow}
        >
          <ArrowRight className="size-[18px]" strokeWidth={2.25} />
        </button>
      </div>

      <ul
        ref={track}
        aria-label={label}
        className="flex items-start snap-x snap-mandatory gap-4 [container-type:inline-size] overflow-x-auto scroll-smooth [scrollbar-width:none] motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
      >
        {visuals.map((visual, index) => (
          <li
            key={visual.src}
            ref={(el) => {
              items.current[index] = el;
            }}
            className="shrink-0 snap-start"
          >
            <figure>
              {/* One height for all; width follows each image's own shape.
                  Wide banners shrink so none is wider than 85% of the
                  carousel, so the next slide always peeks in. */}
              <div
                style={{
                  aspectRatio: `${visual.width} / ${visual.height}`,
                  height: `min(var(--h), ${((85 * visual.height) / visual.width).toFixed(2)}cqw)`,
                }}
                className="relative overflow-hidden rounded-2xl ring-1 ring-inset ring-black/[0.06] [--h:280px] md:[--h:380px]"
              >
                <ZoomImage
                  src={visual.src}
                  alt={visual.alt}
                  width={visual.width}
                  height={visual.height}
                  sizes="(min-width: 768px) 860px, 640px"
                  buttonClassName="size-full rounded-2xl"
                  className="size-full object-cover"
                />
              </div>
              {visual.caption && (
                <figcaption
                  className={cn(
                    dmMono.className,
                    "mt-3 text-[13px] leading-snug text-black/50",
                  )}
                >
                  {visual.caption}
                </figcaption>
              )}
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
