import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import BookCallLink from "~/components/book-call-link";
import Navbar from "~/components/ui/navbar";
import { inter } from "~/config/font";
import { cn } from "~/lib/utils";

export type SidebarLink = { href: string; label: string };

const socials = [
  { label: "X", href: "https://x.com/keizerHq" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/keizerworks" },
  { label: "GitHub", href: "https://github.com/keizerworks" },
];

// Shared shell for the HEX-style pages (/v2/info, /v2/work): navbar, a
// pinned index on the left, and a 960px content column on the right.
// Without `links`, the sidebar is dropped and the column is centered.
// `ink` is a deep navy tinted by the brand blue: softer than pure black.
const tones = {
  black: "#000000",
  ink: "#0e0e1b",
};

export default function StudioPage({
  links,
  tone = "black",
  children,
}: {
  links?: SidebarLink[];
  tone?: keyof typeof tones;
  children: ReactNode;
}) {
  return (
    <main
      // Children use var(--page-bg) for cells that should match the page.
      style={{ "--page-bg": tones[tone] } as CSSProperties}
      className={cn(
        inter.className,
        "min-h-screen bg-[var(--page-bg)] text-[#ebebeb]",
      )}
    >
      <Navbar />

      {links && (
        <aside className="fixed bottom-6 left-5 top-[110px] hidden w-[240px] flex-col justify-between text-sm lg:flex">
          <div className="flex flex-col gap-10">
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[#ff66ff]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <BookCallLink
              from="info-sidebar"
              className="group flex items-center justify-between rounded bg-[#ff66ff] px-3 py-2.5 text-black shadow-[0_0_0_4px_rgba(255,102,255,0.15)] transition-transform duration-150 active:scale-[0.97]"
            >
              Book a call
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </BookCallLink>
          </div>

          <div className="flex flex-col gap-4 text-[#ebebeb]/80">
            <p>
              Keizerworks is a product studio.
              <br />
              Led by Rahul Sain.
            </p>
            <ul className="flex flex-wrap gap-x-3 gap-y-1">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#ff66ff]"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="mailto:rahul.sain@keizerworks.com"
                  className="hover:text-[#ff66ff]"
                >
                  rahul.sain@keizerworks.com
                </a>
              </li>
            </ul>
          </div>
        </aside>
      )}

      <div
        className={cn(
          "px-5 pb-24 pt-[110px]",
          links
            ? "lg:ml-[300px] xl:ml-auto xl:mr-5 xl:max-w-[960px] xl:px-0"
            : "mx-auto max-w-[1000px]",
        )}
      >
        {children}
      </div>
    </main>
  );
}
