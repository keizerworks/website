// Writing for /blogs and the home page. Placeholders: the titles are
// working topics and the posts have no body yet. Swap in the real best four
// when they're ready; a post with `body` renders it, one without shows bars.

export type PostCategory =
  | "Studio"
  | "Product"
  | "Engineering"
  | "AI"
  | "Design";

export type Post = {
  slug: string;
  title: string;
  // One or two lines for cards and the post intro.
  excerpt: string;
  category: PostCategory;
  // Cover panel color, rotating through the brand colors.
  coverColor: "blue" | "black" | "pink";
  // A few words printed on the brand-color cover when there's no image.
  coverLine?: string;
  // Optional cover image, shown on `bg` in place of the brand-color panel.
  cover?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    bg: string;
  };
  // ISO date (YYYY-MM-DD). Missing means unpublished: cards say "Soon".
  date?: string;
  readTime?: string;
  // The post, block by block. Each `h2` becomes a section in the left-hand
  // contents. `draft` blocks render as soft bars until the copy is written.
  body?: Block[];
  // Case study this post comes out of, if any.
  project?: string;
  // Byline. Defaults to the studio until posts are signed by a person.
  author?: Author;
};

export type Author = { name: string; avatar: string };

// Text in `p` and `list` items can use **bold** and [links](https://…).
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | {
      type: "figure";
      src: string;
      alt: string;
      width: number;
      height: number;
      caption?: string;
      bg?: string;
      // "small" for logos and marks, shown at their own size.
      size?: "small";
    }
  // A short muted loop, like a GIF; or with `sound`, a clip people play.
  | {
      type: "video";
      sound?: boolean;
      src: string;
      poster: string;
      width: number;
      height: number;
      caption?: string;
    }
  | { type: "quote"; text: string; by?: string }
  | { type: "draft"; lines?: number };

// Anchor id for a section heading: "The first client" -> "the-first-client".
export function headingId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Written, as opposed to an outline of draft blocks.
export function hasContent(post: Post) {
  return Boolean(post.body?.some((block) => block.type === "p"));
}

export const studioAuthor: Author = {
  name: "Keizerworks",
  avatar: "/assets/logos/keizer-logo.svg",
};

export function postAuthor(post: Post) {
  return post.author ?? studioAuthor;
}

export const posts: Post[] = [
  {
    slug: "how-keizer-started",
    title: "How Keizer started",
    excerpt:
      "Why we started a product studio, and what 私たちは未来に投資します, “we invest in the future”, means to us.",
    category: "Studio",
    coverColor: "black",
    cover: {
      src: "/assets/blog/keizer-badge-cover.webp",
      alt: "The Keizer badge: the Keizer wordmark with green, blue, red, and yellow stripes, and 私たちは未来に投資します underneath",
      width: 720,
      height: 450,
      bg: "#000000",
    },
    date: "2026-10-20",
    readTime: "8 min read",
    author: { name: "Rahul Sain", avatar: "/assets/logos/keizer-logo.svg" },
    // Source: the "How Keizer started" doc (Claude Docs).
    body: [
      {
        type: "p",
        text: "In November 2022, a handful of us started shipping products in 72 hours or less. For prizes, for fun, for the rush of seeing something real go live. We called ourselves ARCHers.",
      },
      {
        type: "p",
        text: "This is the story of what happened in between, why we became a product studio instead of an agency, and what 私たちは未来に投資します, “we invest in the future”, means to us.",
      },
      { type: "h2", text: "Before Keizer: the ARCHers years" },
      {
        type: "p",
        text: "ARCHers was a builder collective of 8 engineers spread across different cities, and everyone was cracked at something: the best AI person you'd ever meet, people who had been coding since 6th grade, game developers who shipped Apple Vision software for under ₹500.",
      },
      {
        type: "p",
        text: "We competed across AR/VR, AI and Web3, at hackathons from ETHGlobal to Arweave and Solana. The culture was simple:",
      },
      {
        type: "list",
        items: [
          "High agency",
          "All-nighters",
          "Get it done",
          "Fuck around and find out",
        ],
      },
      {
        type: "p",
        text: "Concept to live product in 48 hours. Put it in front of people, take the feedback, ship again.",
      },
      {
        type: "p",
        text: "It worked. In a single year, ARCHers won more than 30 hackathons and competitions, and I won 20+ of them myself. In one month alone, we earned $20,000 in prizes. That run got noticed: I even sat down for an [interview with Harkirat Singh](https://x.com/kirat_tw/status/1843663117701788002?s=20).",
      },
      {
        type: "figure",
        src: "/assets/blog/how-keizer-started/hackathon.webp",
        alt: "A hackathon venue: laptops and cables on a table under a glass roof",
        caption:
          "Another hackathon, another all-nighter. Laptops, cables, cup noodles.",
        width: 1200,
        height: 900,
      },
      { type: "h3", text: "The craziest 10 days" },
      {
        type: "p",
        text: "At our peak, ARCHers won 4 hackathons in 10 days. At Arweave India Hacker House in Bengaluru, 1st, 2nd and 3rd place all went to ARCHers teams.",
      },
      {
        type: "p",
        text: "My own build there was an indexer for the Arweave ecosystem, made in 5 days. I picked the hardest problem on the board, pivoted twice, and shipped with 2 hours left before the demo. Before walking on stage, I cold-called a founder in the Arweave ecosystem and onboarded them as my first user. It took 1st place and the $3,000 bounty.",
      },
      {
        type: "figure",
        src: "/assets/blog/how-keizer-started/arweave-winners.webp",
        alt: "Arweave India's post announcing the Hacker House #3 bounty winners",
        caption:
          "Arweave India Hacker House #3 winners. The whole podium was ARCHers.",
        width: 1150,
        height: 1214,
      },
      {
        type: "p",
        text: "The lesson stuck with me: most builders optimize for the demo. The ones who win optimize for the user watching it.",
      },
      { type: "h3", text: "What came after ARCHers" },
      {
        type: "p",
        text: "Eventually we all hit the same question: we'd achieved so much together, so what's next? How do we add more value?",
      },
      {
        type: "p",
        text: "Everyone went to the next level. Mystic started a Web3 studio and moved on to bigger products. Aditya took on AI roles. Ankush became a founder, building construct.computer.",
      },
      { type: "h2", text: "Bangkok: where the spark got bigger" },
      {
        type: "p",
        text: "Late in 2024, I flew to Bangkok for ETHGlobal with the founder of ARCHers and Karan, another founding member.",
      },
      {
        type: "figure",
        src: "/assets/blog/how-keizer-started/bangkok.webp",
        alt: "Three of us at night outside the ETHGlobal venue in Bangkok",
        caption: "Bangkok, ETHGlobal 2024.",
        width: 828,
        height: 632,
      },
      {
        type: "p",
        text: "What we saw there was a level up. Teams building far more evolved things than hackathon demos, products with real users and real ambition. Winning competitions suddenly felt small.",
      },
      {
        type: "figure",
        src: "/assets/blog/how-keizer-started/polaroid.webp",
        alt: "A polaroid signed Rahul Sain held up in front of the event's photo wall",
        caption: "A polaroid from the event wall.",
        width: 828,
        height: 615,
      },
      {
        type: "p",
        text: "I came back wanting more than prizes, and started taking on bigger projects right away. The first one paid $4,000. More followed, and soon lots of people were reaching out asking us to build software for them.",
      },
      { type: "h2", text: "How I got my crew" },
      {
        type: "p",
        text: "I've always thought in systems. I wanted to build software for where technology is going, and to be part of that future, not watch it. That's the idea Keizer was built on: **invest in the future**.",
      },
      {
        type: "p",
        text: "So I found the most cracked people I knew from X and sent each of them a simple message.",
      },
      {
        type: "figure",
        src: "/assets/blog/how-keizer-started/recruiting.webp",
        alt: "A chat message from rahulsain: yo broh, wanna join my keizer crew?",
        caption: "The whole recruiting process.",
        width: 696,
        height: 190,
      },
      {
        type: "p",
        text: "That was it. No job post, no hiring funnel. Just people who wanted to build.",
      },
      { type: "p", text: "This was the original crazy crew:" },
      {
        type: "list",
        items: [
          "**Anukul**: my co-founder.",
          "**Yukti**: the first to join, Keizer's longest-standing member, and our technical go-to-market and sales lead.",
          "**Mayank**: our designer. He did most of the creative work and handled client work too.",
          "**Abhay**: software engineer and open-source maintainer.",
          "**Sudarsh**: full stack engineer and open-source maintainer.",
          "**Ayush**: frontend developer.",
          "**Dhruv**: frontend developer.",
          "**Retro**: designer.",
        ],
      },
      {
        type: "p",
        text: "Full stack, frontend, design: between us, we could build almost anything.",
      },
      {
        type: "figure",
        src: "/assets/blog/how-keizer-started/original-mark.webp",
        alt: "The original Keizer mark: a white K on black",
        caption: "The original Keizer mark. The legendary one.",
        width: 400,
        height: 400,
        size: "small",
      },
      { type: "h2", text: "The first office" },
      {
        type: "p",
        text: "Then came the first office. A desk, a whiteboard full of system diagrams, and the first Keizer website up on the big screen. ([My post from that day](https://x.com/Rahulsainlll/status/1866495918012534931?s=20).)",
      },
      {
        type: "figure",
        src: "/assets/blog/how-keizer-started/first-office.webp",
        alt: "The first Keizer office: a desk, chairs, and a glass-walled room",
        caption: "The first Keizer office.",
        width: 1200,
        height: 900,
      },
      { type: "h2", text: "The first clients" },
      {
        type: "p",
        text: "Once we formed a proper company, clients started coming in from the US and from Bengaluru. Anukul and I handled the US projects and ran product management across them. Many of those projects are under NDA, so we can't name them.",
      },
      { type: "p", text: "The ones we can talk about:" },
      {
        type: "list",
        items: [
          "**Arlink**: decentralized deployment infrastructure.",
          "**Edulume**: an AI learning experience platform (LXP).",
          "**Chem0**: came to us with an idea to animate chemical reactions. We sharpened the idea with them, built it, and connected them to funding opportunities through our network.",
          "**Plobbo**: distributes content across every platform.",
          "**Incubator startups**: we've worked with an incubator's startups for more than a year.",
        ],
      },
      {
        type: "figure",
        src: "/assets/blog/how-keizer-started/agreement.webp",
        alt: "A printed Keizerworks agreement for technology development",
        caption:
          "It's official: a Keizerworks agreement for technology development.",
        width: 1600,
        height: 1200,
      },
      { type: "h2", text: "Why a product studio, not an agency" },
      {
        type: "p",
        text: "An agency works to a fixed scope and a tight deadline, and quality is usually what gives. That didn't fit a company built to invest in the future.",
      },
      {
        type: "p",
        text: "So we chose startups where we could add real value, and we work with them like partners:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "**Validate the idea** together before writing much code.",
          "**They bring the LOI**, proof that someone actually wants it.",
          "**We ship before their demo day**, so they walk in with a real product.",
          "**We keep iterating** with them, consulting well beyond the build.",
          "**We open our network** to them, because their win is ours too.",
        ],
      },
      {
        type: "p",
        text: "Edulume is the clearest example. It started as an ERP. After many days of research and more than a year of working together, it became an AI-powered learning experience platform (LXP). Chem0 came to us with a basic idea, and we helped shape it into a product.",
      },
      {
        type: "p",
        text: "We enjoy working with startups. That's why we became a product studio, not an agency.",
      },
      { type: "h2", text: "Building a developer community" },
      {
        type: "p",
        text: "Alongside client work, we built something bigger than our own team: a community of more than 300 handpicked developers.",
      },
      {
        type: "p",
        text: "That community pushed us into open source. We built [Invoicen](https://github.com/keizerworks/invoicen), invoicing for businesses, and gave it to every startup that came to us. We also built Keizer Auth for startups. Today we still hand our customers tools, like conversational agents that help their users understand the product better.",
      },
      {
        type: "figure",
        src: "/assets/blog/how-keizer-started/invoicen.webp",
        alt: "Invoicen on GitHub with 48 stars and 30 forks",
        caption: "Invoicen on GitHub: 48 stars, 30 forks.",
        width: 930,
        height: 204,
      },
      { type: "h2", text: "私たちは未来に投資します: we invest in the future" },
      {
        type: "p",
        text: "For us, “we invest in the future” means we put our resources behind what we believe will work in the future. And we mean invest, not just bill.",
      },
      {
        type: "list",
        items: [
          "**Money:** more than ₹15 lakh invested in the startups we work with.",
          "**Service:** product, design and engineering work we put in as a stake, not just as a line item.",
          "**Expertise:** the instincts from my 20+ hackathon wins and every product we've shipped since.",
          "**Network:** introductions to investors, funding opportunities and people who can help.",
        ],
      },
      {
        type: "p",
        text: "That's what the line on the logo stands for. It's a promise about how we pick our work and how far we'll go for it.",
      },
      {
        type: "video",
        src: "/assets/blog/how-keizer-started/merch.mp4",
        sound: true,
        poster: "/assets/blog/how-keizer-started/merch-poster.webp",
        width: 854,
        height: 480,
        caption:
          "Keizer, invest in the future. A friend of the studio with the merch in Bengaluru.",
      },
      { type: "h2", text: "What we learned the hard way" },
      {
        type: "p",
        text: "We learned all of this on the way. The mistakes were real, and we fixed them fast.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "**Speed matters most.** Most startups fail, and slow ones fail first.",
          "**Never overcommit.** Promise less, deliver more.",
          "**Distribution is as important as the product.** Never ignore it.",
          "**Don't start too many things at once.**",
          "**Keep going to competitions from time to time.**",
          "**Put everything in writing.** Written agreements with clients and with the team. Never rely on trust without a document.",
          "**Say no to clients who aren't a fit.**",
          "**Get paid upfront, or in milestones.**",
          "**Plan for 6 months and for 6 years.**",
        ],
      },
      { type: "h2", text: "What's next" },
      {
        type: "p",
        text: "Two things: our own product, and more startups.",
      },
      {
        type: "p",
        text: "We're taking [Student Intelligence](https://studentintelligence.ai) to market. It's a voice-first AI tutor that lets students ask questions, understand concepts, revise smarter and study in a way that's personal to them. It's free on iOS and Android. We learned that distribution matters as much as the product, and now we're putting that lesson to work on something of our own.",
      },
      {
        type: "figure",
        src: "/assets/blog/how-keizer-started/student-intelligence.webp",
        alt: "Student Intelligence: your smartest personal tutor",
        caption: "Student Intelligence: your smartest personal tutor.",
        width: 1600,
        height: 811,
      },
      {
        type: "p",
        text: "And the studio keeps going. We're still partnering with startups: validating ideas, shipping before demo day and opening our network.",
      },
      {
        type: "p",
        text: "Same idea as day one. 私たちは未来に投資します. We invest in the future.",
      },
      {
        type: "p",
        text: "Building something? [Book a meeting with the team](/book).",
      },
    ],
  },
  {
    slug: "ai-chemists-can-trust",
    coverLine: "Show the inputs.",
    title: "Designing AI that chemists can actually trust",
    excerpt:
      "Why Chem0 runs three focused models instead of one, and shows its inputs every time.",
    category: "AI",
    coverColor: "black",
    project: "chem0",
  },
  {
    slug: "redesign-before-the-fundraise",
    coverLine: "Ship it before the raise.",
    title: "Redesigning a product in the weeks before a fundraise",
    excerpt:
      "What to change, what to leave alone, and how to ship it while investors are watching.",
    category: "Design",
    coverColor: "pink",
    project: "arlink",
  },
  {
    slug: "how-we-ship-mvps",
    coverLine: "Idea → MVP.",
    title: "How we take a product from idea to MVP",
    excerpt:
      "The way our team scopes, designs, and builds a first version founders can sell.",
    category: "Engineering",
    coverColor: "blue",
  },
];

export const postCategories: PostCategory[] = [
  "Studio",
  "Product",
  "Engineering",
  "AI",
  "Design",
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function formatPostDate(date?: string) {
  if (!date) return "Soon";
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
