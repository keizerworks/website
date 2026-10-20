import Link from "next/link";
import type { ReactNode } from "react";
import { PageFooter } from "~/components/page-chrome";
import Navbar from "~/components/ui/navbar";
import { inter } from "~/config/font";
import { headingId } from "~/data/posts";
import { cn } from "~/lib/utils";

// Privacy and Terms, after studentintelligence.ai's legal pages: a centred
// title, then numbered sections in one calm column. A switcher at the top moves between the two documents. Dark, on
// the same woven texture as the home footer.

export type LegalSection = {
  title: string;
  content: ReactNode;
};

const documents = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

// Body styles live on the column, so each page writes plain JSX.
const prose = cn(
  "text-[17px] leading-7 tracking-[-0.01em] text-[#ebebeb]/70 [text-wrap:pretty]",
  "[&_p]:my-0 [&_strong]:font-semibold [&_strong]:text-[#ebebeb]",
  "[&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2.5 [&_ul]:pl-5 [&_li]:marker:text-white/30",
  "[&_a]:text-[#ebebeb] [&_a]:underline [&_a]:decoration-white/25 [&_a]:underline-offset-4 [&_a]:transition-colors [&_a]:duration-150 hover:[&_a]:decoration-[#ff66ff]",
  "[&_table]:w-full [&_table]:border-collapse [&_table]:text-[15px] [&_table]:leading-6",
  "[&_th]:border-b [&_th]:border-white/15 [&_th]:py-3 [&_th]:pr-4 [&_th]:text-left [&_th]:align-top [&_th]:font-medium [&_th]:text-[#ebebeb]",
  "[&_td]:border-b [&_td]:border-white/[0.08] [&_td]:py-3 [&_td]:pr-4 [&_td]:align-top",
);

export default function LegalPage({
  title,
  updated,
  current,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  // Which document this is, for the switcher.
  current: string;
  intro: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <main
      className={cn(
        inter.className,
        "texture-weave min-h-screen text-[#ebebeb]",
      )}
    >
      <Navbar tone="woven" />

      <div className="mx-auto w-full max-w-[732px] px-6 pb-16 pt-[120px] md:pt-[150px]">
        <header className="flex flex-col items-center text-center">
          {/* Switch between the two documents. */}
          <nav
            aria-label="Legal documents"
            className="flex gap-1 rounded-full bg-white/[0.06] p-1 text-[14px] ring-1 ring-inset ring-white/[0.08]"
          >
            {documents.map((doc) => {
              const active = doc.href === current;
              return (
                <Link
                  key={doc.href}
                  href={doc.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-1.5 transition-[color,background-color,box-shadow] duration-150",
                    active
                      ? "bg-white/[0.12] font-medium text-[#ebebeb]"
                      : "text-white/50 hover:text-white/80",
                  )}
                >
                  {doc.label}
                </Link>
              );
            })}
          </nav>

          <h1 className="mt-10 text-[36px] font-medium leading-[1.05] tracking-[-0.035em] sm:text-[52px]">
            {title}
          </h1>
          <p className="mt-4 text-[15px] text-white/45">
            Last updated {updated}
          </p>
        </header>

        <div className={cn(prose, "mt-14 flex flex-col gap-12")}>
          <div className="flex flex-col gap-5">{intro}</div>

          {sections.map((section, i) => (
            <section
              key={section.title}
              id={headingId(section.title)}
              className="legal-section flex scroll-mt-28 flex-col gap-5"
            >
              <h2 className="-mx-2 w-fit rounded-lg px-2 text-[26px] font-medium leading-[1.15] tracking-[-0.03em] text-[#ebebeb] sm:text-[30px]">
                <span className="inline text-white/25">{i + 1}.</span>{" "}
                {section.title}
              </h2>
              {section.content}
            </section>
          ))}
        </div>

        <PageFooter tone="dark" back={{ href: "/", label: "Back to Home" }} />
      </div>
    </main>
  );
}
