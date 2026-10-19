"use client";

import { useEffect, useRef } from "react";

// A minor pentatonic, low to high: any run of rows sounds musical.
const NOTES = [
  110, 130.81, 146.83, 164.81, 196, 220, 261.63, 293.66, 329.63, 392, 440,
  523.25, 587.33,
];

// Karplus-Strong: a noise burst fed through a damped delay loop sounds like
// a plucked string. Rendered once per note, then replayed from a buffer.
function renderString(ctx: AudioContext, frequency: number) {
  const seconds = 1.6;
  const length = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  const period = Math.round(ctx.sampleRate / frequency);
  const ring = new Float32Array(period);
  for (let i = 0; i < period; i++) ring[i] = Math.random() * 2 - 1;
  let index = 0;
  for (let i = 0; i < length; i++) {
    const next = (index + 1) % period;
    // Averaging neighbours is the low-pass that makes the tone decay.
    ring[index] = (ring[index] + ring[next]) * 0.4985;
    data[i] = ring[index];
    index = next;
  }
  return buffer;
}

// Damped vertical wobble, like a string settling after a pluck.
const wobble = [0, -3, 2.4, -1.7, 1.1, -0.6, 0.25, 0].map((y) => ({
  transform: `translateY(${y}px)`,
}));

export default function StringList({ items }: { items: string[] }) {
  const ctxRef = useRef<AudioContext | null>(null);
  const buffers = useRef<Map<number, AudioBuffer>>(new Map());
  const rows = useRef<(HTMLLIElement | null)[]>([]);
  const lastRow = useRef<number | null>(null);
  const reduceMotion = useRef(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotion.current = query.matches;
    const update = () => {
      reduceMotion.current = query.matches;
    };
    query.addEventListener("change", update);

    // Browsers keep audio muted until the visitor clicks, taps, or types
    // somewhere on the page. Unlock on that first gesture, wherever it is.
    const unlock = () => {
      ensureAudio();
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
    window.addEventListener("pointerdown", unlock);
    window.addEventListener("keydown", unlock);

    return () => {
      query.removeEventListener("change", update);
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      ctxRef.current?.close();
    };
  }, []);

  function ensureAudio() {
    ctxRef.current ??= new AudioContext();
    if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
  }

  function playNote(index: number) {
    // If the visitor already clicked anywhere (e.g. a nav link), audio is allowed.
    if (!ctxRef.current && navigator.userActivation?.hasBeenActive) {
      ensureAudio();
    }
    const ctx = ctxRef.current;
    if (!ctx || ctx.state !== "running") return;
    const frequency = NOTES[index % NOTES.length];
    let buffer = buffers.current.get(frequency);
    if (!buffer) {
      buffer = renderString(ctx, frequency);
      buffers.current.set(frequency, buffer);
    }
    const source = ctx.createBufferSource();
    const gain = ctx.createGain();
    gain.gain.value = 0.25;
    source.buffer = buffer;
    source.connect(gain).connect(ctx.destination);
    source.start();
  }

  function pluck(index: number) {
    if (lastRow.current === index) return;
    lastRow.current = index;
    playNote(index);

    const row = rows.current[index];
    if (!row) return;
    // WAAPI keeps it on the compositor and restarts cleanly on a re-pluck.
    if (!reduceMotion.current) {
      row.animate(wobble, {
        duration: 450,
        easing: "cubic-bezier(0.23, 1, 0.32, 1)",
      });
    }
    row.animate(
      [
        { borderColor: "#ff66ff", color: "#ff66ff" },
        { borderColor: "rgb(217 217 217 / 0.8)", color: "#ebebeb" },
      ],
      { duration: 500, easing: "ease-out" },
    );
  }

  function rowAt(x: number, y: number) {
    const hit = document.elementFromPoint(x, y)?.closest("[data-string]");
    return hit ? Number(hit.getAttribute("data-string")) : null;
  }

  return (
    <>
      <ol
        className="flex flex-col gap-0.5"
        onPointerMove={(event) => {
          if (event.pointerType !== "mouse") return;
          const index = rowAt(event.clientX, event.clientY);
          if (index !== null) pluck(index);
        }}
        onPointerLeave={() => {
          lastRow.current = null;
        }}
        onTouchMove={(event) => {
          const touch = event.touches[0];
          const index = rowAt(touch.clientX, touch.clientY);
          if (index !== null) pluck(index);
        }}
        onTouchEnd={() => {
          lastRow.current = null;
        }}
      >
        {items.map((item, index) => (
          <li
            key={item}
            data-string={index}
            ref={(el) => {
              rows.current[index] = el;
            }}
            className="flex select-none items-center justify-between border border-[#d9d9d9]/80 px-2 py-2.5 text-xl leading-5"
          >
            <span>{item}</span>
            <span className="tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
          </li>
        ))}
      </ol>
    </>
  );
}
