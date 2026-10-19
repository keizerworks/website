import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import StudioPage from "~/components/studio-page";
import {
  ServiceList,
  StudioIntro,
  sectionTitle,
} from "~/components/studio-services";

export const metadata: Metadata = {
  title: "Info",
  description:
    "Keizerworks is a product studio building meaningful websites, MVPs, and full-scale products.",
};

type Client = {
  name: string;
  logo?: string;
  description: string;
};

// Draft: descriptions for BetterIdea and Square still need writing.
const clients: Client[] = [
  {
    name: "Edulume",
    logo: "/assets/logos/edulume.svg",
    description:
      "We're building Edulume's multi-tenant, AI-native learning platform and the engineering team behind it.",
  },
  {
    name: "Chem0",
    logo: "/assets/logos/chem0.svg",
    description:
      "We built a chemistry simulation engine that predicts unseen reactions with 94.84% accuracy, live with 3 institutions.",
  },
  {
    name: "Arlink",
    logo: "/assets/logos/arlink.svg",
    description:
      "We redesigned Arlink's product experience ahead of a critical fundraising milestone.",
  },
  {
    name: "Plobbo",
    description:
      "We designed and built the MVP of an AI marketing platform that automates multi-channel content distribution.",
  },
  {
    name: "BetterIdea",
    logo: "/assets/logos/betterIdea.svg",
    description: "Description to come.",
  },
  {
    name: "Square",
    logo: "/assets/logos/square.svg",
    description: "Description to come.",
  },
];

// Placeholders until real client quotes are added.
const notes = [
  {
    quote: "Client quote goes here.",
    name: "Client name",
    role: "Role, Company",
  },
  {
    quote: "Client quote goes here.",
    name: "Client name",
    role: "Role, Company",
  },
];

const links = [
  { href: "#overview", label: "Overview" },
  { href: "#services", label: "Services" },
  { href: "#clients", label: "Clients" },
  { href: "#client-notes", label: "Client Notes" },
  { href: "/v2/work", label: "Work" },
];

export default function InfoPage() {
  return (
    <StudioPage links={links}>
      <section id="overview" className="scroll-mt-[110px]">
        <StudioIntro as="h1" />
      </section>

      <section id="services" className="mt-20 scroll-mt-[110px]">
        <ServiceList />
      </section>

      <section id="clients" className="mt-20 scroll-mt-[110px]">
        <h2 className={sectionTitle}>Select Clients</h2>
        <ul className="grid gap-x-[30px] gap-y-12 sm:grid-cols-2 md:grid-cols-3">
          {clients.map((client) => (
            <li key={client.name} className="flex flex-col gap-4">
              <div className="flex h-10 items-center">
                {client.logo ? (
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={140}
                    height={40}
                    className="h-8 w-auto invert"
                  />
                ) : (
                  <span className="text-2xl font-semibold">{client.name}</span>
                )}
              </div>
              <p className="text-base leading-6">{client.description}</p>
            </li>
          ))}
        </ul>
        <Link
          href="/portfolio"
          className="mt-12 block rounded bg-white py-2 text-center text-base text-black shadow-[0_0_0_4px_rgba(250,250,253,0.12)] transition-[background-color,transform] duration-200 hover:bg-[#ff66ff] active:scale-[0.99]"
        >
          All Clients
        </Link>
      </section>

      <section id="client-notes" className="mt-20 scroll-mt-[110px]">
        <h2 className={sectionTitle}>Client Notes</h2>
        <ul className="flex flex-col gap-4">
          {notes.map((note, index) => (
            // Placeholder notes share text, so the index keeps keys unique.
            <li
              key={`${note.name}-${index}`}
              className="rounded-lg bg-white p-3 text-black"
            >
              <p className="text-xl leading-6">{note.quote}</p>
              <p className="mt-6 text-sm">{note.name}</p>
              <p className="text-sm text-black/60">{note.role}</p>
            </li>
          ))}
        </ul>
      </section>
    </StudioPage>
  );
}
