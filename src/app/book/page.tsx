import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { preconnect } from "react-dom";
import CalBooking from "~/components/contact/cal-booking";
import { inter } from "~/config/font";
import { cn } from "~/lib/utils";
import BackButton from "./back-button";

export const metadata: Metadata = {
  title: "Book a call",
  description:
    "Book a 30-minute call with Keizerworks about the product you're building.",
  alternates: { canonical: "/book" },
  openGraph: {
    url: "/book",
    title: "Book a call | Keizerworks",
    description:
      "Book a 30-minute call with Keizerworks about the product you're building.",
    siteName: "Keizerworks",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
};

// One job: pick a time. No navbar, nothing else to click.
export default function BookPage() {
  // Start the connection to Cal before the embed script asks for it.
  preconnect("https://app.cal.com");

  return (
    <main
      className={cn(
        inter.className,
        "min-h-screen bg-[#fafafd] px-4 pb-16 pt-5 text-[#111] md:px-6",
      )}
    >
      <BackButton />

      <header className="mx-auto mt-6 max-w-[900px] text-center md:mt-4">
        <h1 className="text-[30px] font-semibold leading-[1.05] tracking-[-0.04em] md:text-[56px]">
          <span className="block text-[#2D2DC3]">Book a 30 min call.</span>
          <span className="block">Let's build it.</span>
        </h1>
        <p className="mt-3 text-[14px] text-black/50 md:mt-5 md:text-[15px]">
          Trusted by founders at{" "}
          <span className="inline text-black/80">
            Edulume · Chem0 · Arlink · BetterIDEa
          </span>
        </p>
      </header>

      <div className="-mx-4 mt-6 max-w-[1100px] md:mx-auto md:mt-14">
        <CalBooking />
      </div>

      <footer className="mt-10 flex flex-col items-center gap-3 text-[14px] text-black/50">
        <p>
          Or email{" "}
          <a
            href="mailto:biz@keizerworks.com"
            className="inline text-black/80 underline decoration-black/20 underline-offset-4 transition-colors duration-150 hover:decoration-[#2D2DC3]"
          >
            biz@keizerworks.com
          </a>
        </p>
        <Link href="/" aria-label="Keizer home">
          <Image
            src="/assets/logos/keizer-logo-name.svg"
            width={70}
            height={32}
            alt="Keizer"
            className="h-8 w-auto invert"
          />
        </Link>
      </footer>
    </main>
  );
}
