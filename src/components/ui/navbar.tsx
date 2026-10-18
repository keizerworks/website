"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { inter } from "~/config/font";
import { cn } from "~/lib/utils";

const links = [
  { label: "Our Projects", href: "#ourprojects" },
  { label: "Services", href: "#services" },
  { label: "Blogs", href: "#news" },
  { label: "About Us", href: "#aboutus" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

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
        className={`fixed inset-x-0 top-0 z-[1000] [zoom:calc(1/0.9)] border-b border-white/10 bg-black py-3 font-medium text-[#ebebeb] ${inter.className}`}
      >
        {/* Same box as the hero (max 1536px, px-4 / md:px-24), scaled by 0.9 to match the zoomed page. */}
        <div className="mx-auto grid h-8 grid-rows-[2rem] max-w-[calc(1536px*0.9)] grid-cols-[1fr_auto_1fr] items-center px-[calc(1rem*0.9)] md:px-[calc(6rem*0.9)]">
          <Link
            href="#"
            aria-label="Keizer home"
            className="flex items-center justify-self-start"
          >
            <Image
              src="/assets/logos/keizer-logo-name.svg"
              width={88}
              height={40}
              alt="Keizer"
              priority
              className="h-10 w-auto"
            />
          </Link>

          <ul className="hidden items-center md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-2 py-1 text-sm leading-[1.5] hover:bg-[#ff66ff]/[0.12] hover:text-[#ff66ff]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="col-start-3 flex items-center gap-2 justify-self-end">
            <Link
              href="#contact"
              className="block rounded bg-white p-2 text-base leading-none text-black shadow-[0_0_0_4px_rgba(255,255,255,0.12)] transition-[background-color,transform] duration-200 hover:bg-[#ff66ff] active:scale-[0.97]"
            >
              Get in touch
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((prev) => !prev)}
              className="flex size-8 items-center justify-center rounded-lg hover:bg-[#ff66ff]/[0.12] hover:text-[#ff66ff] md:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 top-[57px] z-[999] [zoom:calc(1/0.9)] bg-black px-5 pt-4 font-medium text-[#ebebeb] transition-opacity duration-200 md:hidden",
          inter.className,
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <ul className="flex flex-col">
          {links.map((link) => (
            <li key={link.href} className="border-b border-white/10">
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-2xl leading-none hover:text-[#ff66ff]"
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
