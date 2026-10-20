// One place for conversion events, sent to Google Analytics 4 when it's
// loaded (see NEXT_PUBLIC_GA_ID in the root layout). Without GA, events are
// only logged in development.

type Event =
  | { name: "book_call_click"; from: string }
  | { name: "booking_page_ready" }
  | { name: "booking_completed" };

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track({ name, ...props }: Event) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, props);
  if (process.env.NODE_ENV === "development") {
    console.info("[track]", name, props);
  }
}
