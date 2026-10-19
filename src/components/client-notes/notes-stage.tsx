"use client";

import { useEffect, useRef, useState } from "react";
import { serif } from "~/config/font";
import { cn } from "~/lib/utils";

export type Note = {
  quote: string;
  // The phrase that gets highlighted in the expanded view.
  highlight: string;
  name: string;
  detail: string;
};

const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";

function splitOnHighlight(note: Note) {
  const start = note.quote.indexOf(note.highlight);
  if (start === -1) return [note.quote, "", ""];
  const end = start + note.highlight.length;
  return [note.quote.slice(0, start), note.highlight, note.quote.slice(end)];
}

export default function NotesStage({ notes }: { notes: Note[] }) {
  const stage = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLLIElement | null)[]>([]);
  // `active` drives the expansion; `shown` keeps the last note on screen
  // while the panel shrinks back into its card.
  const [active, setActive] = useState<number | null>(null);
  const [shown, setShown] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const reduceMotion = useRef(false);
  const wasOpen = useRef(false);

  // Only on wide screens with a real pointer; touch and phones get the grid.
  useEffect(() => {
    const fine = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 768px)",
    );
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setEnabled(fine.matches);
      reduceMotion.current = reduce.matches;
    };
    update();
    fine.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  // The card's rectangle as a clip-path inset of the whole stage. Offsets
  // (not getBoundingClientRect) stay in CSS px under the page's body zoom.
  function cardInset(index: number) {
    const box = stage.current;
    const card = cards.current[index];
    if (!box || !card) return "inset(0 round 8px)";
    const top = card.offsetTop;
    const left = card.offsetLeft;
    const right = box.offsetWidth - left - card.offsetWidth;
    const bottom = box.offsetHeight - top - card.offsetHeight;
    return `inset(${top}px ${right}px ${bottom}px ${left}px round 8px)`;
  }

  // Open: grow out of the hovered card. Close: shrink back into it, faster.
  useEffect(() => {
    const panel = overlay.current;
    if (!panel) return;
    const opening = active !== null && !wasOpen.current;
    const closing = active === null && wasOpen.current;
    wasOpen.current = active !== null;

    if (opening) {
      panel.style.visibility = "visible";
      if (reduceMotion.current) {
        panel.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 200,
          easing: "ease",
        });
      } else {
        panel.animate(
          [{ clipPath: cardInset(active) }, { clipPath: "inset(0 round 8px)" }],
          { duration: 420, easing: EASE_OUT },
        );
      }
    }

    if (closing) {
      const animation = reduceMotion.current
        ? panel.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 150,
            easing: "ease",
          })
        : panel.animate(
            [
              { clipPath: "inset(0 round 8px)" },
              { clipPath: cardInset(shown) },
            ],
            { duration: 220, easing: EASE_OUT },
          );
      animation.onfinish = () => {
        // A re-hover during the shrink reopens, so only hide if still closed.
        if (!wasOpen.current) panel.style.visibility = "hidden";
      };
    }
  }, [active, shown]);

  // Each note change fades the text in and draws the highlighter across.
  useEffect(() => {
    if (active === null) return;
    const box = content.current;
    if (!box) return;
    if (!reduceMotion.current) {
      box.animate(
        [
          { opacity: 0, transform: "translateY(8px)", filter: "blur(4px)" },
          { opacity: 1, transform: "translateY(0)", filter: "blur(0)" },
        ],
        { duration: 300, easing: EASE_OUT },
      );
      box
        .querySelector("mark")
        ?.animate(
          [{ backgroundSize: "0% 100%" }, { backgroundSize: "100% 100%" }],
          { duration: 700, delay: 200, easing: EASE_OUT, fill: "backwards" },
        );
    }
  }, [active, shown]);

  function open(index: number) {
    if (!enabled) return;
    setShown(index);
    setActive(index);
  }

  const [before, highlight, after] = splitOnHighlight(notes[shown]);

  return (
    <div
      ref={stage}
      className="relative"
      onPointerLeave={() => setActive(null)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setActive(null);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setActive(null);
      }}
    >
      <ul className="grid gap-4 md:grid-cols-2">
        {notes.map((note, index) => (
          <li
            key={note.name}
            ref={(el) => {
              cards.current[index] = el;
            }}
            // Cards stay underneath the panel, so moving the cursor over
            // another quadrant switches the note without closing.
            onPointerEnter={() => open(index)}
            onFocus={() => open(index)}
            tabIndex={enabled ? 0 : undefined}
            className="flex flex-col justify-between gap-8 rounded-lg bg-white p-5 text-black outline-none focus-visible:ring-2 focus-visible:ring-[#ff66ff]"
          >
            <blockquote className="text-xl leading-7">
              “{note.quote}”
            </blockquote>
            <div className="text-sm">
              <p>{note.name}</p>
              <p className="text-black/60">{note.detail}</p>
            </div>
          </li>
        ))}
      </ul>

      <div
        ref={overlay}
        aria-hidden="true"
        style={{ visibility: "hidden" }}
        className="pointer-events-none absolute inset-0 flex flex-col justify-between overflow-hidden rounded-lg bg-[#2D2DC3] p-8 text-white md:p-12"
      >
        <div
          ref={content}
          className="flex h-full flex-col justify-between gap-10"
        >
          <p
            className={cn(
              serif.className,
              "max-w-[1100px] text-[clamp(24px,2.6vw,40px)] leading-[1.25] tracking-[-0.01em]",
            )}
          >
            “{before}
            <mark className="bg-[linear-gradient(#ff66ff,#ff66ff)] bg-no-repeat px-1 text-black [background-size:100%_100%] [box-decoration-break:clone]">
              {highlight}
            </mark>
            {after}”
          </p>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-lg">{notes[shown].name}</p>
              <p className="text-white/70">{notes[shown].detail}</p>
            </div>
            {/* Shows which card the cursor is over. */}
            <div className="grid grid-cols-2 gap-1">
              {notes.map((note, index) => (
                <span
                  key={note.name}
                  className={cn(
                    "size-2 rounded-[1px]",
                    index === shown ? "bg-[#ff66ff]" : "bg-white/30",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
