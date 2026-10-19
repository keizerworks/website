import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ServiceList,
  StudioIntro,
  sectionTitle,
} from "~/components/studio-services";
import Navbar from "~/components/ui/navbar";
import { inter } from "~/config/font";
import { cn } from "~/lib/utils";

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
    name: "Permaweb",
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

const sections = [
  { id: "overview", label: "Overview" },
  { id: "services", label: "Services" },
  { id: "clients", label: "Clients" },
  { id: "client-notes", label: "Client Notes" },
];

const socials = [
  { label: "X", href: "https://x.com/keizerHq" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/keizerworks" },
  { label: "GitHub", href: "https://github.com/keizerworks" },
];

export default function InfoPage() {
  return (
    <main
      className={cn(inter.className, "min-h-screen bg-black text-[#ebebeb]")}
    >
      <Navbar />

      {/* Section index, pinned on the left like hex.inc/info. */}
      <aside className="fixed bottom-6 left-5 top-[110px] hidden w-[240px] flex-col justify-between text-sm lg:flex">
        <div className="flex flex-col gap-10">
          <ul className="flex flex-col gap-1">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="hover:text-[#ff66ff]">
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
          <Link
            href="/#contact"
            className="group flex items-center justify-between rounded bg-[#ff66ff] px-3 py-2.5 text-black shadow-[0_0_0_4px_rgba(255,102,255,0.15)] transition-transform duration-150 active:scale-[0.97]"
          >
            Get in touch
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
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

      <div className="px-5 pb-24 pt-[110px] lg:ml-[300px] xl:ml-auto xl:mr-5 xl:max-w-[960px] xl:px-0">
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
                    <span className="text-2xl font-semibold">
                      {client.name}
                    </span>
                  )}
                </div>
                <p className="text-base leading-6">{client.description}</p>
              </li>
            ))}
          </ul>
          <Link
            href="/portfolio"
            className="mt-12 block rounded bg-white py-2 text-center text-base text-black shadow-[0_0_0_4px_rgba(255,255,255,0.12)] transition-[background-color,transform] duration-200 hover:bg-[#ff66ff] active:scale-[0.99]"
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
      </div>
    </main>
  );
}
