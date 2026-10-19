"use client";

import { Loader2 } from "lucide-react";
import { type FormEvent, useState } from "react";
import { sectionTitle } from "~/components/studio-services";
import { inter } from "~/config/font";
import { cn } from "~/lib/utils";

// Newsletter signup, in the same style as the other home sections.
export default function NewsLetter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!email) return;
    setLoading(true);
    setStatus(null);
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await response.json().catch(() => ({}));
      if (response.ok) {
        setEmail("");
        setStatus({
          message: result.message || "You're in. Thanks for subscribing.",
          type: "success",
        });
      } else {
        setStatus({
          message: result.error || "Couldn't subscribe. Try again?",
          type: "error",
        });
      }
    } catch {
      setStatus({ message: "Couldn't subscribe. Try again?", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="newsletter"
      className={cn(
        inter.className,
        "mx-auto w-full max-w-[1536px] px-4 pt-16 text-[#ebebeb] md:px-24 md:pt-[100px]",
      )}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className={cn(sectionTitle, "mb-0")}>Notes from the studio</h2>
          <p className="mt-2 max-w-[440px] text-[15px] leading-[1.55] text-[#ebebeb]/55">
            What we're building, shipping, and learning. No spam, unsubscribe
            any time.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-2 lg:max-w-[440px]"
        >
          <div className="flex items-center gap-2 rounded-lg bg-white/[0.06] p-1.5 ring-1 ring-inset ring-white/10 transition-shadow duration-150 focus-within:ring-white/40">
            <label htmlFor="newsletter-email" className="sr-only">
              Email
            </label>
            <input
              id="newsletter-email"
              className="w-full bg-transparent px-3 py-2 text-[15px] text-[#ebebeb] outline-none placeholder:text-[#ebebeb]/40"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@company.com"
              disabled={loading}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="flex h-9 shrink-0 items-center justify-center rounded bg-white px-4 text-sm font-medium text-black transition-[background-color,transform] duration-150 hover:bg-[#ff66ff] active:scale-[0.97] disabled:opacity-60"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Subscribe"
              )}
            </button>
          </div>
          {status && (
            <p
              role="status"
              className={cn(
                "text-[14px]",
                status.type === "success"
                  ? "text-[#ebebeb]/70"
                  : "text-[#ff66ff]",
              )}
            >
              {status.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
