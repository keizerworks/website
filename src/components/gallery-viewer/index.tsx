"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import {
  type PointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { dmMono } from "~/config/font";
import { cn } from "~/lib/utils";

// The gallery wall and its viewer. Open any image and it fills the screen
// over a blurred page: the image, its caption, a strip of every image below
// (the current one ringed), arrows at the edges, and a close button.
// Arrow keys, swipe, and Escape work too.

export type GalleryItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  project: string;
  caption?: string;
};

const ease = "ease-[cubic-bezier(0.23,1,0.32,1)]";
// Hover effects use [@media(hover:hover)_and_(pointer:fine)] (a real mouse
// only, so taps don't stick), written out in full: Tailwind can't see class
// names built from template strings.

const roundButton =
  "flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-[background-color,transform] duration-150 active:scale-[0.95] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/20 outline-none focus-visible:ring-2 focus-visible:ring-white";

// How many images show at first, and how many each "Load more" adds.
const BATCH = 9;

// Masonry as real columns, filled left to right: new images land at the
// bottom, so nothing already on screen moves when more load. One layout per
// breakpoint; the hidden ones' lazy images never download.
const layouts = [
  { columns: 1, className: "flex sm:hidden" },
  { columns: 2, className: "hidden sm:flex lg:hidden" },
  { columns: 3, className: "hidden lg:flex" },
];

export default function GalleryViewer({ items }: { items: GalleryItem[] }) {
  const [visible, setVisible] = useState(BATCH);
  // Which image is open; null when the viewer is closed.
  const [index, setIndex] = useState<number | null>(null);
  const triggers = useRef(new Map<string, HTMLButtonElement>());

  // Only what's loaded on the page: the viewer never fetches the rest.
  const shown = items.slice(0, visible);
  const remaining = items.length - shown.length;

  const close = useCallback(() => {
    setIndex((current) => {
      // Return focus to the image that was open, in the layout on screen.
      if (current !== null) {
        for (const { columns } of layouts) {
          const button = triggers.current.get(`${columns}-${current}`);
          if (button?.offsetParent) button.focus();
        }
      }
      return null;
    });
  }, []);

  return (
    <>
      {layouts.map(({ columns, className }) => (
        <div key={columns} className={cn("mt-10 gap-4", className)}>
          {Array.from({ length: columns }, (_, column) => (
            <ul key={column} className="flex min-w-0 flex-1 flex-col gap-4">
              {shown.map((item, i) =>
                i % columns === column ? (
                  <li key={item.src}>
                    <figure>
                      <button
                        ref={(el) => {
                          const key = `${columns}-${i}`;
                          if (el) triggers.current.set(key, el);
                          else triggers.current.delete(key);
                        }}
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`Open ${item.alt}`}
                        className="group block w-full cursor-zoom-in overflow-hidden rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#ff66ff] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                      >
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={item.width}
                          height={item.height}
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className={cn(
                            "h-auto w-full bg-white/[0.04] transition-transform duration-300 motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.02]",
                            ease,
                          )}
                        />
                      </button>
                      <figcaption
                        className={cn(
                          dmMono.className,
                          "mt-2 text-[12px] uppercase tracking-[0.08em] text-[#ebebeb]/45",
                        )}
                      >
                        {item.project}
                      </figcaption>
                    </figure>
                  </li>
                ) : null,
              )}
            </ul>
          ))}
        </div>
      ))}

      <div className="mt-12 flex flex-col items-center gap-3">
        <p aria-live="polite" className="text-sm text-[#ebebeb]/45">
          Showing {shown.length} of {items.length}
        </p>
        {remaining > 0 && (
          <button
            type="button"
            onClick={() => setVisible((count) => count + BATCH)}
            className="rounded-full bg-white px-6 py-2.5 text-[15px] font-medium text-black outline-none transition-[background-color,transform] duration-150 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[#ff66ff] focus-visible:ring-offset-2 focus-visible:ring-offset-black [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#ff66ff]"
          >
            Load more
          </button>
        )}
      </div>

      {index !== null &&
        createPortal(
          <Viewer
            items={shown}
            index={index}
            onIndex={setIndex}
            onClose={close}
          />,
          document.body,
        )}
    </>
  );
}

function Viewer({
  items,
  index,
  onIndex,
  onClose,
}: {
  items: GalleryItem[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const item = items[index];
  const count = items.length;
  const [shown, setShown] = useState(false);
  // The current image fades in once it has loaded, so a slow image never
  // pops in half-drawn. Tracked by src: a cached image can finish loading
  // before any effect runs, so a reset-on-change flag would hide it forever.
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const loaded = loadedSrc === item.src;
  const closeButton = useRef<HTMLButtonElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const thumbs = useRef<(HTMLButtonElement | null)[]>([]);
  const swipeStart = useRef<number | null>(null);

  const go = useCallback(
    (step: number) => onIndex((index + step + count) % count),
    [index, count, onIndex],
  );

  // Enter: fade the backdrop in a frame after mounting so it transitions.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setShown(true));
    closeButton.current?.focus();
    return () => cancelAnimationFrame(frame);
  }, []);

  const dismiss = useCallback(() => {
    setShown(false);
    // Let the exit fade finish, then unmount.
    window.setTimeout(onClose, 180);
  }, [onClose]);

  // Keys: arrows move, Escape closes. Page scrolling is blocked without
  // hiding the scrollbar (hiding it shifts the page sideways), except inside
  // the thumbnail strip, which scrolls on its own.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
      else if (event.key === "ArrowRight") go(1);
      else if (event.key === "ArrowLeft") go(-1);
      else if (
        ["ArrowUp", "ArrowDown", "PageUp", "PageDown", " "].includes(event.key)
      ) {
        event.preventDefault();
      }
    };
    const block = (event: Event) => {
      if (strip.current?.contains(event.target as Node)) return;
      event.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", block, { passive: false });
    window.addEventListener("touchmove", block, { passive: false });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", block);
      window.removeEventListener("touchmove", block);
    };
  }, [go, dismiss]);

  // New image: bring its thumbnail to the middle of the strip.
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    thumbs.current[index]?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [index]);

  // Swipe left or right on the image to move.
  const onPointerDown = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") swipeStart.current = event.clientX;
  };
  const onPointerUp = (event: PointerEvent) => {
    if (swipeStart.current === null) return;
    const distance = event.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(distance) > 50) go(distance < 0 ? 1 : -1);
  };

  const ratio = item.width / item.height;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Gallery"
      className={cn(
        // Undo the body's 0.9 zoom so the viewer uses the real screen.
        "fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-black/80 backdrop-blur-lg transition-opacity duration-200 [zoom:calc(1/0.9)] motion-reduce:transition-none",
        shown ? "opacity-100" : "opacity-0",
      )}
    >
      {/* Clicking the dark area around everything closes the viewer. */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={dismiss}
        className="absolute inset-0 cursor-default"
      />

      <button
        ref={closeButton}
        type="button"
        aria-label="Close"
        onClick={dismiss}
        className={cn(
          roundButton,
          "absolute right-4 top-4 z-10 md:right-6 md:top-6",
        )}
      >
        <X className="size-5" strokeWidth={2} />
      </button>

      <button
        type="button"
        aria-label="Previous image"
        onClick={() => go(-1)}
        className={cn(
          roundButton,
          "absolute left-3 top-1/2 z-10 -translate-y-1/2 max-sm:hidden md:left-5",
        )}
      >
        <ChevronLeft className="size-5" strokeWidth={2} />
      </button>
      <button
        type="button"
        aria-label="Next image"
        onClick={() => go(1)}
        className={cn(
          roundButton,
          "absolute right-3 top-1/2 z-10 -translate-y-1/2 max-sm:hidden md:right-5",
        )}
      >
        <ChevronRight className="size-5" strokeWidth={2} />
      </button>

      {/* One fixed-width column: the image sizes itself inside it, while the
          caption and strip keep the full width whatever the image's shape. */}
      <div
        className={cn(
          "relative flex w-full max-w-[1280px] flex-col px-4 transition-transform duration-300 motion-reduce:transition-none sm:px-20",
          ease,
          shown ? "scale-100" : "scale-[0.97] motion-reduce:scale-100",
        )}
      >
        <div
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          style={{
            aspectRatio: `${item.width} / ${item.height}`,
            // As large as the screen allows, leaving room for caption + strip.
            width: `min(100%, calc((100dvh - 15rem) * ${ratio.toFixed(4)}))`,
          }}
          className="relative mx-auto touch-pan-y overflow-hidden rounded-2xl bg-white/[0.04] ring-1 ring-inset ring-white/10"
        >
          <Image
            key={item.src}
            src={item.src}
            alt={item.alt}
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            quality={90}
            priority
            onLoad={() => setLoadedSrc(item.src)}
            className={cn(
              "object-cover transition-opacity duration-200 motion-reduce:transition-none",
              loaded ? "opacity-100" : "opacity-0",
            )}
          />
        </div>

        {/* On phones the counter sits above a two-line caption. */}
        <div className="mt-4 flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <p
            aria-live="polite"
            className="line-clamp-2 text-[14px] leading-snug text-[#ebebeb]/80 sm:line-clamp-none sm:text-[15px]"
          >
            {item.caption ?? item.alt}
          </p>
          <p
            className={cn(
              dmMono.className,
              "order-first shrink-0 text-[11px] uppercase tracking-[0.08em] text-[#ebebeb]/45 sm:order-none sm:text-[12px]",
            )}
          >
            {item.project} · {String(index + 1).padStart(2, "0")} / {count}
          </p>
        </div>

        {/* Every image, the current one ringed; edges fade out. */}
        <div
          ref={strip}
          className="mt-5 flex gap-2 overflow-x-auto py-1 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((thumb, i) => (
            <button
              key={thumb.src}
              ref={(el) => {
                thumbs.current[i] = el;
              }}
              type="button"
              onClick={() => onIndex(i)}
              aria-label={`Show ${thumb.alt}`}
              aria-current={i === index ? "true" : undefined}
              className={cn(
                "relative h-14 shrink-0 overflow-hidden rounded-lg outline-none transition-opacity duration-200 focus-visible:ring-2 focus-visible:ring-[#ff66ff] sm:h-16",
                i === index
                  ? "opacity-100 ring-2 ring-white"
                  : "opacity-45 [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-80",
              )}
              style={{ aspectRatio: `${thumb.width} / ${thumb.height}` }}
            >
              <Image
                src={thumb.src}
                alt=""
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
