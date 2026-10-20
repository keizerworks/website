"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track } from "~/lib/track";

// Every "Book a call" button goes through here, so we can count clicks and
// compare them with completed bookings.
export default function BookCallLink({
  from,
  className,
  children = "Book a call",
}: {
  // Where the click came from, e.g. "navbar" or "home-closing".
  from: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Link
      href="/book"
      className={className}
      onClick={() => track({ name: "book_call_click", from })}
    >
      {children}
    </Link>
  );
}
