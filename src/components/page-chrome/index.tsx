import { ArrowLeft, CornerUpLeft } from "lucide-react";
import Link from "next/link";
import { serif } from "~/config/font";
import { cn } from "~/lib/utils";

// Shared by the light long-form pages (case studies, blog posts): the back
// link, the headline with its serif accent, and the sign-off footer.

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-[15px] text-black/45 transition-colors duration-150 hover:text-black/80 active:scale-[0.97]"
    >
      <span
        aria-hidden="true"
        className="flex size-6 items-center justify-center rounded-full bg-black/45 text-[#fafafd] transition-colors duration-150 group-hover:bg-black/80"
      >
        <CornerUpLeft className="size-3" strokeWidth={2.75} />
      </span>
      {label}
    </Link>
  );
}

// The last two words get the italic serif accent, LCA-style. Blog posts
// pass `accent={false}` and stay in Inter, the navbar's (HEX-style) font.
export function Headline({
  text,
  accent = true,
}: {
  text: string;
  accent?: boolean;
}) {
  // Non-breaking hyphens keep words like "AI-native" on one line.
  const sentence = (text.charAt(0).toUpperCase() + text.slice(1)).replace(
    /-/g,
    "\u2011",
  );
  const words = sentence.split(" ");
  return (
    <h1 className="mx-auto max-w-[900px] text-[36px] leading-[1.1] tracking-[-0.025em] [text-wrap:balance] md:text-[56px]">
      {accent ? (
        <>
          {words.slice(0, -2).join(" ")}{" "}
          <em className={cn(serif.className, "italic tracking-normal")}>
            {words.slice(-2).join(" ")}
          </em>
        </>
      ) : (
        sentence
      )}
    </h1>
  );
}

// Solid glyphs, like LCA's footer (lucide only draws outlines).
type Glyph = { className?: string };

function MailGlyph({ className }: Glyph) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        d="M2 4.5h20v15H2zM4.2 7l7.8 5.4L19.8 7v2.5L12 14.9 4.2 9.5z"
      />
    </svg>
  );
}

function XGlyph({ className }: Glyph) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

function LinkedInGlyph({ className }: Glyph) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <circle cx="4.5" cy="4.5" r="2.4" />
      <path d="M2.5 8.8h4v12.7h-4zM9 8.8h3.8v1.8c.6-1.1 2-2.1 4.1-2.1 3.9 0 4.6 2.5 4.6 5.8v7.2h-4v-6.4c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3v6.5H9z" />
    </svg>
  );
}

function InstagramGlyph({ className }: Glyph) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        d="M8 2h8a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6V8a6 6 0 0 1 6-6Zm4 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2.6a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8ZM17.6 5a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Z"
      />
    </svg>
  );
}

function GitHubGlyph({ className }: Glyph) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

const tile =
  "flex size-11 items-center justify-center rounded-xl bg-black/[0.06] text-black/40 transition-[color,background-color,transform] duration-150 hover:bg-black/[0.1] hover:text-black/70 active:scale-[0.95]";

const socials = [
  { label: "Email", href: "mailto:biz@keizerworks.com", icon: MailGlyph },
  { label: "X", href: "https://x.com/keizerHq", icon: XGlyph },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/keizerworks",
    icon: LinkedInGlyph,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/keizerworks/",
    icon: InstagramGlyph,
  },
  {
    label: "GitHub",
    href: "https://github.com/keizerworks",
    icon: GitHubGlyph,
  },
];

// LCA-style sign-off: back, ways to reach us, copyright.
export function PageFooter({
  back,
}: { back: { href: string; label: string } }) {
  return (
    <footer className="mt-24 flex flex-col items-center gap-5">
      <nav aria-label="Keizerworks links" className="flex gap-2">
        <Link href={back.href} aria-label={back.label} className={tile}>
          <ArrowLeft className="size-[22px]" strokeWidth={2.5} />
        </Link>
        {socials.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            className={tile}
            {...(href.startsWith("http")
              ? { target: "_blank", rel: "noreferrer" }
              : {})}
          >
            <Icon className="size-[22px]" />
          </a>
        ))}
      </nav>
      <p className="text-[15px] text-black/50">
        © Keizerworks {new Date().getFullYear()}
      </p>
    </footer>
  );
}
