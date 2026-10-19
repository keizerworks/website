import { inter } from "~/config/font";
import { cn } from "~/lib/utils";
import { sectionTitle } from "../studio-services";

// From the testimonial.to submissions. The Edulume note has no name attached yet.
const notes = [
  {
    quote:
      "Working with Keizerworks felt like having an in-house product and engineering team. From branding and product design to development and long-term execution, they handled everything end-to-end and helped turn Edulume into a real, scalable platform.",
    name: "Edulume",
    detail: "Full Product Development & Brand Partnership",
  },
  {
    quote:
      "Keizerworks helped us redesign our product at a critical stage right before our fundraise. Their team moved fast, understood our vision immediately, and delivered a much cleaner and more polished user experience.",
    name: "Nischal",
    detail: "Arlink · Custom Brand & Product Design",
  },
  {
    quote:
      "The website created for us is incredibly fast, responsive, and visually stunning. The attention to technical detail is unmatched. It has significantly boosted our online authority and user engagement.",
    name: "Dr. Rashmi Verma",
    detail: "Samriddh Square · Website Development",
  },
  {
    quote:
      "Loved working with the team. We were heading into an acquisition at the time, and they helped us a ton with launching our social and content game. Absolutely recommended and will work with them again.",
    name: "Ankush Kun",
    detail: "BetterIDEa · Social & Content Launch",
  },
];

export default function ClientNotes() {
  return (
    <section
      id="client-notes"
      className={cn(
        inter.className,
        "mx-auto w-full max-w-[1536px] scroll-mt-[100px] bg-black px-4 py-[100px] text-[#ebebeb] md:px-24",
      )}
    >
      <h2 className={sectionTitle}>Client Notes</h2>
      <ul className="grid gap-4 md:grid-cols-2">
        {notes.map((note) => (
          <li
            key={note.name}
            className="flex flex-col justify-between gap-8 rounded-lg bg-white p-5 text-black"
          >
            <blockquote className="text-xl leading-7">
              “{note.quote}”
            </blockquote>
            <div className="text-sm">
              <p>{note.name}</p>
              <p className="text-black/60">{note.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
