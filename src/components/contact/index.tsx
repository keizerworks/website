import BookCallLink from "~/components/book-call-link";
import { inter } from "~/config/font";
import { cn } from "~/lib/utils";

// Closing call to action on the home page: one button to the booking page,
// and the email for anyone who'd rather write.
export default function ContactSection() {
  return (
    <section
      id="contact"
      className={cn(
        inter.className,
        "mx-auto w-full max-w-[1536px] scroll-mt-[100px] bg-black px-4 py-16 text-[#ebebeb] md:px-24 md:py-[100px]",
      )}
    >
      <div className="flex flex-col gap-8 border-t border-white/10 pt-12 md:flex-row md:items-end md:justify-between md:pt-16">
        <div>
          <h2 className="max-w-[720px] text-[32px] leading-[1.1] tracking-[-0.02em] [text-wrap:balance] md:text-[48px]">
            Have something in mind?{" "}
            <span className="inline text-[#ff66ff]">Let's talk.</span>
          </h2>
          <p className="mt-4 text-[15px] text-[#ebebeb]/60">
            Or email{" "}
            <a
              href="mailto:biz@keizerworks.com"
              className="inline text-[#ebebeb] underline decoration-white/25 underline-offset-4 transition-colors duration-150 hover:decoration-[#ff66ff]"
            >
              biz@keizerworks.com
            </a>
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <BookCallLink
            from="home-closing"
            className="whitespace-nowrap rounded bg-white px-5 py-3 text-base font-medium leading-none text-black shadow-[0_0_0_4px_rgba(250,250,253,0.12)] transition-[background-color,transform] duration-200 hover:bg-[#ff66ff] active:scale-[0.97]"
          >
            Book a call
          </BookCallLink>
        </div>
      </div>
    </section>
  );
}
