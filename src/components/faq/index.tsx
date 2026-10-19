import BookCallLink from "~/components/book-call-link";
import { sectionTitle } from "~/components/studio-services";
import { inter } from "~/config/font";
import { cn } from "~/lib/utils";
import data from "./data.json";
import Questions from "./questions";

// HEX-style: title and a way out on the left, questions on the right.
export default function FAQ() {
  return (
    <section
      id="faq"
      className={cn(
        inter.className,
        "mx-auto w-full max-w-[1536px] scroll-mt-[100px] bg-black px-4 py-16 text-[#ebebeb] md:px-24 md:py-[100px]",
      )}
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
        <div>
          <h2 className={cn(sectionTitle, "mb-0")}>
            Frequently asked questions
          </h2>
          <p className="mt-4 max-w-[320px] text-[15px] leading-[1.55] text-[#ebebeb]/55">
            Something else on your mind?{" "}
            <BookCallLink
              from="faq-aside"
              className="inline text-[#ebebeb] underline decoration-white/25 underline-offset-4 transition-colors duration-150 hover:decoration-[#ff66ff]"
            >
              Book a call
            </BookCallLink>{" "}
            and ask us directly.
          </p>
        </div>

        <Questions items={data} />
      </div>
    </section>
  );
}
