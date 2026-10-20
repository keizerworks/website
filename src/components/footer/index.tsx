import Image from "next/image";
import Link from "next/link";
import BookCallLink from "~/components/book-call-link";
import { inter } from "~/config/font";
import { cn } from "~/lib/utils";

// Absolute links, so they work from every page, matching the navbar.
const navigate = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/work" },
  { label: "Careers", href: "/careers" },
];

// Our Discord servers.
const community = [
  { label: "Founder community", href: "https://discord.gg/bpWBgNUPA5" },
  { label: "Dev community", href: "https://discord.gg/3xSG8rQNyv" },
];

const socials = [
  { label: "X", href: "https://x.com/keizerHq" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/keizerworks" },
  { label: "Instagram", href: "https://www.instagram.com/keizerworks/" },
  { label: "GitHub", href: "https://github.com/keizerworks" },
];

const heading = "text-[15px] text-[#ebebeb]/45";
const link =
  "whitespace-nowrap text-[15px] text-[#ebebeb]/85 transition-colors duration-150 [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#ff66ff]";

// An outside link: opens in a new tab.
function External({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={link}>
      {label}
    </a>
  );
}

export default function FooterSection() {
  return (
    <footer
      id="footer"
      className={cn(
        inter.className,
        "mx-auto w-full max-w-[1536px] px-4 pb-10 pt-16 text-[#ebebeb] md:px-24 md:pt-[100px]",
      )}
    >
      <div className="flex flex-col gap-12 border-t border-white/10 pt-12 lg:flex-row lg:justify-between">
        <div>
          <Image
            src="/assets/logos/keizer-logo-name.svg"
            width={132}
            height={60}
            alt="Keizerworks"
            className="h-[60px] w-auto"
          />
          <p className="mt-4 text-[15px] text-[#ebebeb]/55">
            We invest in the future.
          </p>
          <p lang="ja" className="mt-1 text-[13px] text-[#ebebeb]/35">
            私たちは未来に投資します
          </p>
        </div>

        {/* Four columns on wider screens, sized to their links; two on phones. */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-12 sm:grid-cols-[repeat(4,auto)] sm:gap-x-16">
          <div>
            <h3 className={heading}>Navigate</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navigate.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={link}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <BookCallLink from="footer" className={link}>
                  Book a call
                </BookCallLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={heading}>Socials</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {socials.map((item) => (
                <li key={item.label}>
                  <External {...item} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={heading}>Community</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {community.map((item) => (
                <li key={item.label}>
                  <External {...item} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={heading}>Contact</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <a href="mailto:biz@keizerworks.com" className={link}>
                  Mail
                </a>
              </li>
              <li>
                {/* Business number, +91 98170 69743. */}
                <External href="https://wa.me/919817069743" label="WhatsApp" />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-[13px] text-[#ebebeb]/40">
        <p>© {new Date().getFullYear()} Keizerworks LLP</p>
        <ul className="flex gap-5">
          <li>
            <Link
              href="/privacy"
              className="transition-colors duration-150 hover:text-[#ebebeb]"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              href="/terms"
              className="transition-colors duration-150 hover:text-[#ebebeb]"
            >
              Terms of Service
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
