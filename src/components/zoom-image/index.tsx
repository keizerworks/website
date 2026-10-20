"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "~/lib/utils";

// An image you can click to see full size. The viewer fades in and scales
// up slightly from the centre (it's modal, so centre is the right origin),
// closes on click, Escape, or the × button, and skips the motion when
// reduced motion is on.

const ease = "ease-[cubic-bezier(0.23,1,0.32,1)]";

export default function ZoomImage({
  src,
  alt,
  width,
  height,
  sizes,
  className,
  buttonClassName,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
  // Sizing for the clickable wrapper, e.g. filling a frame.
  buttonClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  // Mounted, then shown a frame later, so the enter transition runs.
  const [shown, setShown] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => setShown(true));
    // Block scrolling without hiding the scrollbar: hiding it changes the
    // viewport width and shifts the page (and the fixed navbar) sideways.
    const block = (event: Event) => event.preventDefault();
    const scrollKeys = new Set([
      "ArrowUp",
      "ArrowDown",
      "PageUp",
      "PageDown",
      "Home",
      "End",
    ]);
    const blockKeys = (event: KeyboardEvent) => {
      if (scrollKeys.has(event.key)) event.preventDefault();
    };
    window.addEventListener("wheel", block, { passive: false });
    window.addEventListener("touchmove", block, { passive: false });
    window.addEventListener("keydown", blockKeys);
    close.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("wheel", block);
      window.removeEventListener("touchmove", block);
      window.removeEventListener("keydown", blockKeys);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function dismiss() {
    setShown(false);
    // Let the exit fade finish, then unmount and return focus.
    window.setTimeout(() => {
      setOpen(false);
      trigger.current?.focus();
    }, 180);
  }

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View larger: ${alt}`}
        className={cn(
          "block cursor-zoom-in rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#2D2DC3] focus-visible:ring-offset-2",
          buttonClassName,
        )}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className={className}
        />
      </button>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={dismiss}
            className={cn(
              // Undo the body's 0.9 zoom so the viewer uses the real screen.
              "fixed inset-0 z-[2000] flex cursor-zoom-out items-center justify-center bg-black/85 p-4 backdrop-blur-sm transition-opacity duration-200 [zoom:calc(1/0.9)] motion-reduce:transition-none md:p-8",
              shown ? "opacity-100" : "opacity-0",
            )}
          >
            {/* As large as the screen allows, keeping the image's shape:
                full width, or full height minus the padding if it's tall. */}
            <div
              style={{
                aspectRatio: `${width} / ${height}`,
                width: `min(100%, calc((100dvh - 4rem) * ${(width / height).toFixed(4)}))`,
              }}
              className={cn(
                "relative overflow-hidden rounded-lg shadow-[0_20px_80px_rgba(0,0,0,0.5)] transition-[transform,opacity] duration-300 motion-reduce:transition-none",
                ease,
                shown
                  ? "scale-100 opacity-100"
                  : "scale-[0.96] opacity-0 motion-reduce:scale-100",
              )}
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes="100vw"
                quality={90}
                className="object-cover"
              />
            </div>
            <button
              ref={close}
              type="button"
              aria-label="Close"
              onClick={dismiss}
              className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-[background-color,transform] duration-150 hover:bg-white/20 active:scale-[0.95] md:right-6 md:top-6"
            >
              <X className="size-5" strokeWidth={2} />
            </button>
          </div>,
          document.body,
        )}
    </>
  );
}
