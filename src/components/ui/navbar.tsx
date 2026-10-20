"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import BookCallLink from "~/components/book-call-link";
import { inter } from "~/config/font";
import { cn } from "~/lib/utils";

// Home sections use "/#id" so they also work from other pages.
const links = [
  { label: "Home", href: "/#hero" },
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/work" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blogs", href: "/blogs" },
];

// Dark on the black pages; light on the #fafafd long-form pages (case
// studies, blog posts), so a black bar doesn't sit on top of them.
const tones = {
  dark: {
    bar: "border-white/10 bg-black text-[#ebebeb]",
    logo: "",
    link: "hover:bg-[#ff66ff]/[0.12] hover:text-[#ff66ff]",
    cta: "bg-white text-black shadow-[0_0_0_4px_rgba(250,250,253,0.12)] hover:bg-[#ff66ff]",
    menu: "bg-black text-[#ebebeb]",
    rule: "border-white/10",
  },
  // Dark pages on the woven texture: the bar shares the same fixed texture,
  // so it reads as part of the page.
  woven: {
    bar: "texture-weave border-white/[0.08] text-[#ebebeb]",
    logo: "",
    link: "hover:bg-[#ff66ff]/[0.12] hover:text-[#ff66ff]",
    cta: "bg-white text-black shadow-[0_0_0_4px_rgba(250,250,253,0.12)] hover:bg-[#ff66ff]",
    menu: "texture-weave text-[#ebebeb]",
    rule: "border-white/10",
  },
  // The charcoal pages (Blogs): same as dark, on #181818.
  charcoal: {
    bar: "border-white/10 bg-[#181818] text-[#ebebeb]",
    logo: "",
    link: "hover:bg-[#ff66ff]/[0.12] hover:text-[#ff66ff]",
    cta: "bg-white text-black shadow-[0_0_0_4px_rgba(250,250,253,0.12)] hover:bg-[#ff66ff]",
    menu: "bg-[#181818] text-[#ebebeb]",
    rule: "border-white/10",
  },
  light: {
    bar: "border-black/[0.06] bg-[#fafafd]/85 text-[#111] backdrop-blur-md",
    // The logo file is white; invert it to black.
    logo: "invert",
    link: "hover:bg-[#2D2DC3]/[0.07] hover:text-[#2D2DC3]",
    cta: "bg-[#111] text-[#fafafd] shadow-[0_0_0_4px_rgba(17,17,17,0.06)] hover:bg-[#2D2DC3]",
    menu: "bg-[#fafafd] text-[#111]",
    rule: "border-black/[0.08]",
  },
};

const Navbar = ({ tone = "dark" }: { tone?: keyof typeof tones }) => {
  const [open, setOpen] = useState(false);
  const t = tones[tone];

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* globals.css zooms the body to 0.9; undo it here so the bar is HEX's true size. */}
      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-[1000] [zoom:calc(1/0.9)] border-b py-3 font-medium",
          t.bar,
          inter.className,
        )}
      >
        {/* Same box as the hero (max 1536px, px-4 / md:px-24), scaled by 0.9 to match the zoomed page. */}
        <div className="mx-auto grid h-8 grid-rows-[2rem] max-w-[calc(1536px*0.9)] grid-cols-[1fr_auto_1fr] items-center px-[calc(1rem*0.9)] md:px-[calc(6rem*0.9)]">
          <Link
            href="/"
            aria-label="Keizer home"
            className="flex items-center justify-self-start"
          >
            <Image
              src="/assets/logos/keizer-logo-name.svg"
              width={88}
              height={40}
              alt="Keizer"
              priority
              className={cn("h-10 w-auto", t.logo)}
            />
          </Link>

          <ul className="hidden items-center md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "block rounded-lg px-2 py-1 text-sm leading-[1.5]",
                    t.link,
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="col-start-3 flex items-center gap-2 justify-self-end">
            <BookCallLink
              from="navbar"
              className={cn(
                "block whitespace-nowrap rounded p-2 text-sm leading-none transition-[background-color,transform] duration-200 active:scale-[0.97] md:text-base",
                t.cta,
              )}
            >
              Book a call
            </BookCallLink>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((prev) => !prev)}
              className={cn(
                "flex size-8 items-center justify-center rounded-lg md:hidden",
                t.link,
              )}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 top-[57px] z-[999] [zoom:calc(1/0.9)] px-5 pt-4 font-medium transition-opacity duration-200 md:hidden",
          t.menu,
          inter.className,
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <ul className="flex flex-col">
          {links.map((link) => (
            <li key={link.href} className={cn("border-b", t.rule)}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block py-3 text-2xl leading-none",
                  tone === "light"
                    ? "hover:text-[#2D2DC3]"
                    : "hover:text-[#ff66ff]",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
