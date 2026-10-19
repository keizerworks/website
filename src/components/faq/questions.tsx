"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import BookCallLink from "~/components/book-call-link";
import { cn } from "~/lib/utils";

type Item = {
  question: string;
  answer: string;
  link?: { href: string; label: string };
};

const ease = "ease-[cubic-bezier(0.23,1,0.32,1)]";

// Hairline-divided rows, like the Services strings. Radix handles keyboard
// and screen readers; one answer open at a time.
export default function Questions({ items }: { items: Item[] }) {
  return (
    <Accordion.Root
      type="single"
      collapsible
      className="border-b border-white/10"
    >
      {items.map((item) => (
        <Accordion.Item
          key={item.question}
          value={item.question}
          className="border-t border-white/10"
        >
          <Accordion.Header>
            <Accordion.Trigger
              className={cn(
                "group -mx-3 flex w-[calc(100%+1.5rem)] items-center justify-between gap-6 rounded-lg px-3 py-5 text-left text-[17px] leading-snug text-[#ebebeb] outline-none transition-colors duration-150 md:text-xl",
                "focus-visible:ring-2 focus-visible:ring-[#2D2DC3]",
                "active:bg-white/[0.05] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/[0.03]",
              )}
            >
              {item.question}
              {/* + turns into × when open. */}
              <Plus
                aria-hidden="true"
                strokeWidth={1.75}
                className={cn(
                  "size-5 shrink-0 text-[#ebebeb]/50 transition-transform duration-200 group-data-[state=open]:rotate-45 group-data-[state=open]:text-[#ff66ff] motion-reduce:transition-none",
                  ease,
                )}
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down motion-reduce:animate-none">
            <div className="max-w-[680px] pb-6 pr-10 text-base leading-[1.65] text-[#ebebeb]/65">
              <p>{item.answer}</p>
              {item.link && (
                <BookCallLink
                  from="faq"
                  className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-medium text-[#ebebeb] underline decoration-white/25 underline-offset-4 transition-colors duration-150 hover:decoration-[#ff66ff]"
                >
                  {item.link.label} →
                </BookCallLink>
              )}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
