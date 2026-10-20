"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "~/lib/utils";

// YouTube, loaded only when asked for: a local poster and a play button
// until someone clicks, then the real player (privacy-enhanced domain).
// Keeps the page fast; YouTube's player is heavy.
export default function VideoEmbed({
  youtubeId,
  title,
  poster,
  className,
}: {
  youtubeId: string;
  title: string;
  // Local image, so the poster loads with the page and needs no YouTube.
  poster: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className={cn(
        "relative aspect-video overflow-hidden rounded-2xl bg-black ring-1 ring-inset ring-black/[0.06]",
        className,
      )}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2D2DC3]"
        >
          <Image
            src={poster}
            alt=""
            fill
            sizes="(min-width: 1040px) 1000px, 100vw"
            className="object-cover"
          />
          <span className="absolute inset-0 bg-black/10 transition-colors duration-200 [@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-black/20" />
          <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-active:scale-95 motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105 md:size-20">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="ml-1 size-6 md:size-7"
            >
              <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.6-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
