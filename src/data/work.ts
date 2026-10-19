// Case studies for /v2/work. Draft: fields marked TODO still need the real
// story, images, numbers, years, and links from the team.

export type WorkTag = "Product" | "Web" | "AI" | "Mobile" | "Brand";

export type Project = {
  slug: string;
  name: string;
  // One line, shown on the card after "Name:".
  headline: string;
  tags: WorkTag[];
  year?: string;
  // Square app icon, shown on the cover until real cover images exist.
  icon?: string;
  // Cover background; rotates through the brand colors.
  coverColor: "blue" | "black" | "pink";
  // Real cover image. Shown whole (contained) on `coverImageBg`, which
  // matches the image's own edge color so the letterbox is invisible.
  coverImage?: string;
  coverImageBg?: string;
  problem: string;
  whatWeDid: string;
  services: string[];
  results: { value: string; label: string }[];
  quote?: { text: string; highlight: string; name: string; detail: string };
  url?: string;
};

const TODO_PROBLEM = "The problem statement for this project is coming soon.";

// Note: the portfolio image files are named after the wrong projects
// (e.g. samriddh-cover.png is the Edulume icon), so each path is checked by eye.
export const projects: Project[] = [
  {
    slug: "edulume",
    name: "Edulume",
    headline: "building a multi-tenant, AI-native learning platform",
    tags: ["AI", "Product", "Brand"],
    icon: "/assets/portfolio/samriddh-cover.png",
    coverColor: "blue",
    coverImage: "/assets/work/edulume-cover.png",
    coverImageBg: "#f3f2ef",
    problem: TODO_PROBLEM,
    whatWeDid:
      "We build Edulume's multi-tenant, AI-native learning platform end to end, from branding and product design to development, and run the engineering team behind it.",
    services: ["Brand", "Product Design", "Development", "Engineering Team"],
    results: [],
    quote: {
      text: "Working with Keizerworks felt like having an in-house product and engineering team. From branding and product design to development and long-term execution, they handled everything end-to-end and helped turn Edulume into a real, scalable platform.",
      highlight: "felt like having an in-house product and engineering team",
      name: "Edulume",
      detail: "Full Product Development & Brand Partnership",
    },
  },
  {
    slug: "chem0",
    name: "Chem0",
    headline: "a chemistry engine that predicts reactions no one has run yet",
    tags: ["AI", "Product"],
    icon: "/assets/portfolio/edulume-cover.png",
    coverColor: "black",
    problem: TODO_PROBLEM,
    whatWeDid:
      "We built a chemistry simulation engine capable of predicting previously unseen reactions, and took it live with research institutions.",
    services: ["AI", "Product Development"],
    results: [
      { value: "94.84%", label: "model accuracy" },
      { value: "3", label: "institutions live" },
    ],
  },
  {
    slug: "arlink",
    name: "Arlink",
    headline: "a cleaner product, shipped right before the fundraise",
    tags: ["Product", "Brand"],
    icon: "/assets/portfolio/betteridea-cover.png",
    coverColor: "pink",
    coverImage: "/assets/work/arlink-cover.png",
    coverImageBg: "#141414",
    problem: TODO_PROBLEM,
    whatWeDid:
      "We redesigned Arlink's product experience and brand at a critical stage, ahead of their fundraising milestone.",
    services: ["Brand", "Product Design"],
    results: [],
    quote: {
      text: "Keizerworks helped us redesign our product at a critical stage right before our fundraise. Their team moved fast, understood our vision immediately, and delivered a much cleaner and more polished user experience.",
      highlight: "moved fast, understood our vision immediately",
      name: "Nischal",
      detail: "Arlink · Custom Brand & Product Design",
    },
  },
  {
    slug: "plobbo",
    name: "Plobbo",
    headline: "the MVP of an AI platform that distributes content everywhere",
    tags: ["AI", "Product"],
    coverColor: "blue",
    problem: TODO_PROBLEM,
    whatWeDid:
      "We designed the product and built the MVP behind an AI marketing platform that automates multi-channel content distribution.",
    services: ["Product Design", "MVP Development", "AI"],
    results: [],
  },
  {
    slug: "voice",
    name: "Voice",
    headline: "the voice infrastructure for learning",
    tags: ["AI", "Product"],
    icon: "/assets/portfolio/voice-cover.png",
    coverColor: "black",
    problem: TODO_PROBLEM,
    whatWeDid: "We're building the voice infrastructure for learning.",
    services: ["AI", "Infrastructure"],
    results: [],
  },
  {
    slug: "samriddh-square",
    name: "Samriddh Square",
    headline: "a fast, responsive website that grew their online presence",
    tags: ["Web"],
    coverColor: "pink",
    problem: TODO_PROBLEM,
    whatWeDid:
      "We designed and developed Samriddh Square's website, built to be fast, responsive, and easy to grow.",
    services: ["Web Design", "Web Development"],
    results: [],
    quote: {
      text: "The website created for us is incredibly fast, responsive, and visually stunning. The attention to technical detail is unmatched. It has significantly boosted our online authority and user engagement.",
      highlight: "incredibly fast, responsive, and visually stunning",
      name: "Dr. Rashmi Verma",
      detail: "Samriddh Square · Website Development",
    },
  },
  {
    slug: "betteridea",
    name: "BetterIDEa",
    headline: "launching a social and content game ahead of an acquisition",
    tags: ["Brand"],
    coverColor: "blue",
    coverImage: "/assets/work/betteridea-cover.png",
    coverImageBg: "#ffffff",
    problem: TODO_PROBLEM,
    whatWeDid:
      "We helped BetterIDEa launch their social and content presence while they were heading into an acquisition.",
    services: ["Brand", "Social & Content"],
    results: [],
    quote: {
      text: "Loved working with the team. We were heading into an acquisition at the time, and they helped us a ton with launching our social and content game. Absolutely recommended and will work with them again.",
      highlight:
        "We were heading into an acquisition at the time, and they helped us a ton",
      name: "Ankush Kun",
      detail: "BetterIDEa · Social & Content Launch",
    },
  },
];

export const workTags: WorkTag[] = ["Product", "Web", "AI", "Mobile", "Brand"];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
