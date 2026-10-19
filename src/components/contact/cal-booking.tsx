"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "~/lib/track";
import { cn } from "~/lib/utils";

// Inline Cal.com booking for keizer/30min, in our brand blue.

const CAL_LINK = "keizer/30min";
const NAMESPACE = "30min";

type CalApi = ((...args: unknown[]) => void) & {
  ns: Record<string, (...args: unknown[]) => void>;
  q?: unknown[];
  loaded?: boolean;
};

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

// Cal.com's official loader, typed: queues calls until embed.js arrives.
function loadCal() {
  if (window.Cal) return window.Cal;
  const push = (target: object, args: unknown) => {
    const api = target as { q?: unknown[] };
    api.q = api.q || [];
    api.q.push(args);
  };
  const cal = ((...args: unknown[]) => {
    const self = window.Cal as CalApi;
    if (!self.loaded) {
      self.ns = {};
      self.q = self.q || [];
      const script = document.createElement("script");
      script.src = "https://app.cal.com/embed/embed.js";
      document.head.appendChild(script);
      self.loaded = true;
    }
    if (args[0] === "init") {
      const api = (...apiArgs: unknown[]) => push(api, apiArgs);
      const namespace = args[1];
      if (typeof namespace === "string") {
        self.ns[namespace] = self.ns[namespace] || api;
        push(self.ns[namespace], args);
        push(self, ["initNamespace", namespace]);
      } else push(self, args);
      return;
    }
    push(self, args);
  }) as CalApi;
  window.Cal = cal;
  return cal;
}

export default function CalBooking() {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cal = loadCal();
    // On phones the page headline already says what this is, so drop Cal's
    // event-details block and go straight to the dates.
    const phone = window.matchMedia("(max-width: 767px)").matches;
    cal("init", NAMESPACE, { origin: "https://app.cal.com" });
    cal.ns[NAMESPACE]("inline", {
      elementOrSelector: el,
      calLink: CAL_LINK,
      config: { layout: "month_view", theme: "light" },
    });
    cal.ns[NAMESPACE]("ui", {
      theme: "light",
      hideEventTypeDetails: phone,
      layout: "month_view",
      cssVarsPerTheme: { light: { "cal-brand": "#2D2DC3" } },
    });
    // Swap the placeholder for the calendar once Cal says it's ready.
    cal.ns[NAMESPACE]("on", {
      action: "linkReady",
      callback: () => {
        setReady(true);
        track({ name: "booking_page_ready" });
      },
    });
    cal.ns[NAMESPACE]("on", {
      action: "bookingSuccessful",
      callback: () => track({ name: "booking_completed" }),
    });
  }, []);

  return (
    <div className="relative min-h-[420px] w-full md:min-h-[560px]">
      {/* Calendar-shaped placeholder so the page never looks empty while
          Cal loads. Fades out when the real calendar is ready. */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 grid h-[420px] grid-cols-1 md:h-[560px] overflow-hidden rounded-xl bg-white ring-1 ring-black/[0.08] transition-opacity duration-300 md:grid-cols-[1fr_2fr_1fr]",
          ready ? "opacity-0" : "opacity-100",
        )}
      >
        <div className="hidden flex-col gap-3 border-r border-black/[0.06] p-6 md:flex">
          <span className="size-8 rounded-full bg-black/[0.06]" />
          <span className="mt-2 h-3 w-1/2 rounded-full bg-black/[0.06]" />
          <span className="h-5 w-3/4 rounded-full bg-black/[0.08]" />
          <span className="mt-4 h-3 w-full rounded-full bg-black/[0.05]" />
          <span className="h-3 w-5/6 rounded-full bg-black/[0.05]" />
          <span className="h-3 w-2/3 rounded-full bg-black/[0.05]" />
        </div>
        <div className="p-6">
          <span className="block h-4 w-1/3 rounded-full bg-black/[0.08]" />
          <div className="mt-8 grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }, (_, i) => (
              <span
                key={i}
                className="aspect-square animate-pulse rounded-lg bg-black/[0.04] motion-reduce:animate-none"
              />
            ))}
          </div>
        </div>
        <div className="hidden flex-col gap-3 border-l border-black/[0.06] p-6 md:flex">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} className="h-10 rounded-lg bg-black/[0.04]" />
          ))}
        </div>
      </div>
      <div ref={ref} className="relative w-full overflow-auto" />
    </div>
  );
}
