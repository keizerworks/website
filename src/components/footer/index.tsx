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

// The Keizer badge's four stripes, staggered like the share image's streaks.
const streaks = [
  { color: "#2fa84f", width: 14 },
  { color: "#1e88e5", width: 18 },
  { color: "#e53935", width: 12 },
  { color: "#fdd835", width: 16 },
];

const heading = "text-[15px] text-[#ebebeb]/45";
const link =
  "whitespace-nowrap text-[15px] text-[#ebebeb]/85 transition-colors duration-150 [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#ff66ff]";

// Discord's mark (lucide has no brand icons); takes the text colour.
function DiscordIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-[18px]"
      fill="currentColor"
    >
      <path d="M20.317 4.37a19.8 19.8 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.009c.12.1.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03ZM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
    </svg>
  );
}

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
        {/* The outcome, last thing read before booking; the brand line signs off. */}
        <div>
          <p className="max-w-[460px] text-[28px] font-medium leading-[1.15] tracking-[-0.02em] text-[#fafafd] [text-wrap:balance] md:text-[36px]">
            From idea to live product, faster than you planned.
          </p>
          {/* The next step, right under the promise. */}
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            {/* The founder community, in Discord's purple. */}
            <a
              href={community[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#5865F2] px-5 py-2.5 text-[15px] font-medium text-white outline-none transition-[background-color,transform] duration-150 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[#ff66ff] focus-visible:ring-offset-2 focus-visible:ring-offset-black [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#4752C4]"
            >
              <DiscordIcon />
              Join the founder community
            </a>
            <BookCallLink
              from="footer-headline"
              // Hover stays white: the streaks surging are the feedback, and
              // they'd be lost on the pink used elsewhere.
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#fafafd] px-5 py-2.5 text-[15px] font-medium text-black outline-none transition-[background-color,transform] duration-150 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[#ff66ff] focus-visible:ring-offset-2 focus-visible:ring-offset-black [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white"
            >
              Start with a call
              {/* The share image's speed streaks in miniature: on hover they
                  surge forward one after another. */}
              <span aria-hidden="true" className="flex flex-col gap-[2px]">
                {streaks.map((streak, i) => (
                  <span
                    key={streak.color}
                    style={{
                      backgroundImage: `linear-gradient(90deg, transparent, ${streak.color})`,
                      width: streak.width,
                      transitionDelay: `${i * 35}ms`,
                    }}
                    className="block h-[3px] -skew-x-[20deg] rounded-[1px] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-1 motion-reduce:[@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0"
                  />
                ))}
              </span>
            </BookCallLink>
          </div>
          <p className="mt-10 text-[15px] text-[#ebebeb]/55">
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
