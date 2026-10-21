// Case studies for /work. Draft: fields marked TODO still need the real
// story, images, numbers, years, and links from the team.

export type WorkTag = "Product" | "Web" | "AI" | "Mobile" | "Brand";

export type Visual = {
  src: string;
  alt: string;
  width: number;
  height: number;
  // Short line under the image saying what it shows.
  caption?: string;
};

// One step of the story: what we say, then the screens that prove it,
// right underneath. Chapters are numbered on the page in this order.
export type StoryChapter = {
  // Short rail label, e.g. "For teachers".
  label: string;
  // The one sentence the chapter is about.
  statement: string;
  paragraphs?: string[];
  // Named pieces, shown as cards.
  cards?: { title: string; body: string }[];
  // Feature list, shown as a dotted two-column list.
  bullets?: string[];
  visuals?: Visual[];
  // stack: full width, one per row. pair: two per row.
  // gallery: first full width, the rest in pairs.
  // carousel: one swipeable row at a single height.
  layout?: "stack" | "pair" | "gallery" | "carousel";
};

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
  // Pixel size of coverImage, so the card's window takes its exact shape.
  coverImageSize?: { width: number; height: number };
  problem: string;
  whatWeDid: string;
  services: string[];
  results: { value: string; label: string }[];
  quote?: {
    text: string;
    highlight: string;
    name: string;
    detail: string;
    // Stand-in until the client's real words arrive. Kept out of the
    // structured data, so search engines never see it as a real review.
    placeholder?: boolean;
  };
  url?: string;
  // No case study: the card opens `url` directly, in a new tab.
  linkOnly?: boolean;
  // A demo video shown as the case study's hero, in place of the cover.
  // `poster` is a local image shown until someone presses play.
  heroVideo?: { youtubeId: string; title: string; poster: string };
  // Hero drawn like a social profile: coverImage as the banner, with `icon`
  // as a round avatar overlapping it.
  heroProfile?: boolean;
  // Hand-written search and link-preview copy. Projects without it get a
  // plain title and description; we write these one project at a time.
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };
  // Long-form case study. Projects without it show placeholder chapters.
  story?: {
    chapters: StoryChapter[];
    // One line above the result numbers.
    result: string;
  };
};

const TODO_PROBLEM = "The problem statement for this project is coming soon.";

// Note: the portfolio image files are named after the wrong projects
// (e.g. samriddh-cover.png is the Edulume icon), so each path is checked by eye.
export const projects: Project[] = [
  {
    // Source: notion_edulume_portfolio.pdf
    slug: "edulume",
    name: "Edulume",
    headline: "building a multi-tenant, AI-native learning platform",
    tags: ["AI", "Product", "Brand"],
    year: "2024",
    icon: "/assets/portfolio/samriddh-cover.png",
    coverColor: "blue",
    coverImage: "/assets/work/edulume/site-cover.webp",
    coverImageSize: { width: 2000, height: 1056 },
    coverImageBg: "#ffffff",
    url: "https://edulume.com",
    seo: {
      title: "Edulume case study: building an AI-native LMS for 1,000 schools",
      description:
        "How Keizerworks designed, built, and scaled Edulume, a multi-tenant AI-native learning platform, from idea to production in 18 months, with schools onboarded in about four hours.",
      keywords: [
        "Edulume",
        "Edulume case study",
        "AI LMS",
        "AI-native learning platform",
        "multi-tenant LMS",
        "school management system",
        "AI course generation",
        "EdTech product development",
        "CBSE NCERT RAG",
        "Keizerworks case study",
        "startup product studio",
      ],
    },
    problem:
      "Turn a one-page idea into an AI-native LMS any school can run, then make it ready for a thousand of them.",
    whatWeDid:
      "Edulume wanted to rebuild the school LMS around AI. We joined at the idea stage and became their product team. What does learning look like when every school gets its own AI-native platform?",
    services: [
      "Product Strategy",
      "Brand",
      "UX/UI Design",
      "Engineering",
      "Infrastructure",
      "AI",
    ],
    results: [
      { value: "1,000", label: "schools the platform is built for" },
      { value: "~4 hrs", label: "to onboard a new school" },
      { value: "8", label: "specialists on the dedicated team" },
      { value: "18 mo", label: "of partnership, and counting" },
    ],
    quote: {
      text: "Working with Keizerworks felt like having an in-house product and engineering team. From branding and product design to development and long-term execution, they handled everything end-to-end and helped turn Edulume into a real, scalable platform.",
      highlight: "felt like having an in-house product and engineering team",
      name: "COO, Edulume",
      detail: "Full Product Development & Brand Partnership",
    },
    story: {
      chapters: [
        {
          label: "The brief",
          statement:
            "Turn a one-page idea into an AI-native LMS any school can run, then make it ready for a thousand of them.",
          paragraphs: [
            "Edulume came to us with a concept, not a codebase. They needed one partner to own product, brand, design, engineering, and AI, and to stay for the long run.",
            "The brief was big from day one: a multi-tenant architecture for up to 1,000 schools, roles flexible enough for any institution, and AI that writes course content and lifts learning outcomes.",
          ],
        },
        {
          label: "The platform",
          statement:
            "One multi-tenant core, with a workspace on top for everyone who runs, teaches, or learns at a school.",
          paragraphs: [
            "The hardest part was permissions. Every school organises itself differently, so we designed one rule: principal + role + scope = access. Schools create as many custom roles as they need, with no new code.",
          ],
          cards: [
            {
              title: "Console",
              body: "Where we onboard and manage every school on the platform.",
            },
            {
              title: "School administration",
              body: "Staff, roles, and day-to-day operations for each institution.",
            },
            {
              title: "Teacher workspace",
              body: "Building courses, delivering content, grading, and collaboration.",
            },
            {
              title: "Student workspace",
              body: "Personalised, AI-assisted learning on the web and on mobile.",
            },
          ],
        },
        {
          label: "For schools",
          statement:
            "School leaders see every course, quiz, assignment, and wiki across the institution in one view.",
          paragraphs: [
            "A new school goes from the console to live in about four hours. From there, custom roles decide who creates, publishes, and reviews content.",
          ],
          visuals: [
            {
              src: "/assets/work/edulume/analytics.jpg",
              alt: "Edulume analytics: courses, quizzes, assignments, and wikis tracked over time",
              caption:
                "Analytics: everything a school has created, over time and by type.",
              width: 1280,
              height: 519,
            },
          ],
        },
        {
          label: "For teachers",
          statement:
            "Teachers build a course by describing it. Edulume drafts the chapters, quizzes, and assignments.",
          paragraphs: [
            "Generation runs on curriculum-aware RAG over CBSE and NCERT content, so drafts stay on syllabus. Teachers can turn any document into a quiz, and open a student's profile to see how they're doing.",
          ],
          visuals: [
            {
              src: "/assets/work/edulume/course-builder-chat.jpg",
              alt: "Edulume's AI assistant building a quantum physics course and quiz",
              caption:
                "AI course builder: a course and its quiz from one prompt.",
              width: 1280,
              height: 1282,
            },
            {
              src: "/assets/work/edulume/learner-profile.jpg",
              alt: "A learner profile overlay listing recent activity and progress",
              caption:
                "Learner profile: recent activity and progress at a glance.",
              width: 1080,
              height: 1087,
            },
          ],
          layout: "pair",
        },
        {
          label: "For students",
          statement:
            "Students get one home for everything they're learning, on the web and on their phone.",
          paragraphs: [
            "Progress, time spent, points, and a leaderboard give students a reason to come back. Personalised learner profiles and adaptive roadmaps decide what comes next.",
          ],
          visuals: [
            {
              src: "/assets/work/edulume/learner-dashboard.webp",
              alt: "Edulume learner dashboard: activity tracker, course progress, time spent, student spotlight, and leaderboard",
              caption:
                "Web dashboard: activity, course progress, time spent, and the leaderboard.",
              width: 1958,
              height: 1000,
            },
            {
              src: "/assets/work/edulume/learner-mobile.webp",
              alt: "Edulume mobile app: learner home, all content, profile menu, and notifications",
              caption:
                "Mobile app: home, all content, profile menu, and notifications.",
              width: 1840,
              height: 800,
            },
          ],
        },
        {
          label: "Brand & social",
          statement:
            "A brand to match the product, carried through the site, launch banners, and social posts.",
          visuals: [
            {
              src: "/assets/work/edulume/hero-banner.jpg",
              alt: "Edulume banner: AI platform that transforms how you learn",
              width: 1280,
              height: 571,
            },
            {
              src: "/assets/work/edulume/poster-illustration.jpg",
              alt: "Edulume poster with an illustrated student at a computer",
              width: 1228,
              height: 1536,
            },
            {
              src: "/assets/work/edulume/more-than-a-teacher.jpg",
              alt: "Edulume social post: More than a teacher, no less than a friend",
              width: 1280,
              height: 1282,
            },
            {
              src: "/assets/work/edulume/learning-fun.jpg",
              alt: "Edulume banner: Learning should be fun, not forced",
              width: 1280,
              height: 520,
            },
          ],
          layout: "carousel",
        },
      ],
      result:
        "In 18 months Edulume went from a pitch to a production platform, and a new school now goes live in about four hours.",
    },
  },
  {
    // Source: "Case Study — Tael" doc (Claude Docs).
    slug: "tael",
    name: "Tael",
    headline: "payments for AI agents, live on Stellar",
    tags: ["AI", "Product"],
    year: "2026",
    coverColor: "black",
    coverImage: "/assets/work/tael/title-card.webp",
    coverImageSize: { width: 2078, height: 1162 },
    coverImageBg: "#ffffff",
    url: "https://taelprotocol.xyz",
    seo: {
      title: "Tael case study: payments and discovery for AI agents on Stellar",
      description:
        "How we built Tael: one SDK and wallet that lets AI agents discover, pay for and run any capability with USDC micropayments on Stellar. Live on mainnet.",
      keywords: [
        "Tael",
        "Tael Protocol",
        "Tael case study",
        "AI agent payments",
        "x402",
        "HTTP 402 payments",
        "Stellar USDC",
        "agent wallet",
        "MCP payments",
        "Keizerworks case study",
      ],
    },
    problem:
      "Give AI agents a way to pay for what they use, without a human signing up, entering a card or approving an invoice.",
    whatWeDid:
      "Tael lets AI agents pay for the tools they use. We designed the protocol, built the SDK and the wallet, and took it live on Stellar mainnet within weeks.",
    services: [
      "Protocol Design",
      "SDK",
      "Payments Infrastructure",
      "Product Design",
    ],
    results: [
      { value: "25+", label: "builders integrating the SDK" },
      { value: "6", label: "partnerships signed, building agents on Tael" },
      { value: "100+", label: "developers on the waitlist" },
      { value: "4+", label: "open-source contributors, verified on Drips" },
    ],
    story: {
      chapters: [
        {
          label: "The problem",
          statement: "AI agents can do the work. They just can't pay for it.",
          paragraphs: [
            "Every tool an agent might need, from an API or a model to a dataset or another agent, sits behind its own account, its own billing, and often its own KYC.",
            "So builders patch it together by hand: a pile of API keys, prepaid credits that run out, invoices at the end of the month. It breaks the moment an agent needs something new.",
            "We built Tael to fix this once, at the protocol level.",
          ],
          visuals: [
            {
              src: "/assets/work/tael/coins.webp",
              alt: "Tael and Stellar coins: an illustration of an agent paying in USDC on Stellar",
              caption: "Tael × Stellar.",
              width: 1120,
              height: 720,
            },
          ],
        },
        {
          label: "How it works",
          statement: "One request finds a tool, pays for it, and runs it.",
          paragraphs: [
            'Tael uses HTTP 402, the web\'s "payment required" response. When an agent calls a paid tool, the SDK pays a fraction of a cent in USDC on Stellar, and the call goes through, all in one round trip.',
            "Getting started takes a minute: connect a Stellar wallet or a passkey, add USDC, and you're set. No KYC.",
          ],
          cards: [
            {
              title: "Discover",
              body: "The agent finds an API, model, MCP server, dataset, or another agent in the Tael marketplace.",
            },
            {
              title: "Pay",
              body: "The SDK settles a sub-cent USDC payment on Stellar. No invoices, no API keys.",
            },
            {
              title: "Run",
              body: "The tool runs and returns its result, in the same request.",
            },
          ],
          visuals: [
            {
              src: "/assets/work/tael/site-assistant.webp",
              alt: 'taelprotocol.xyz: "The payment layer. For AI agents." with Tael\'s assistant explaining the product',
              caption: "taelprotocol.xyz, with Tael's own assistant.",
              width: 2000,
              height: 1131,
            },
          ],
        },
        {
          label: "What we shipped",
          statement: "Everything a builder needs, live from day one.",
          bullets: [
            "An SDK to call and pay for any tool in a few lines of code",
            "An agent wallet with Stellar wallet or passkey login",
            "A marketplace where providers set a price per call",
            "A free sandbox with testnet USDC",
            "A 1% fee on each production transaction",
          ],
          visuals: [
            {
              src: "/assets/work/tael-cover.webp",
              alt: "Tael onboarding: Jump right in, no KYC required. Connect, Fund, All set.",
              caption: "Onboarding: connect, fund, done. No KYC.",
              width: 2000,
              height: 1131,
            },
          ],
        },
        {
          label: "Partners",
          statement: "Six teams are already building their agents on Tael.",
          visuals: [
            {
              src: "/assets/work/tael/vayyl-x-tael.webp",
              alt: "Vayyl × Tael Protocol partnership announcement",
              caption: "Vayyl × Tael.",
              width: 1774,
              height: 530,
            },
            {
              src: "/assets/work/tael/partner-x-tael.webp",
              alt: "Partnership announcement with Tael Protocol",
              caption: "Another partner building on Tael.",
              width: 1280,
              height: 427,
            },
          ],
          layout: "carousel",
        },
        {
          label: "What's next",
          statement: "Next, the same rails for support agents.",
          paragraphs: [
            "Most Web3 products still run support on Discord. Questions wait up to 72 hours, answers get buried in busy channels, and bots hand out forms instead of fixes.",
            "Tael's next product is an agent that answers, resolves, and follows up inside the conversation itself.",
          ],
        },
      ],
      result:
        "Live on Stellar mainnet within weeks of launch: from protocol design to SDK to a live product, one team, in weeks.",
    },
  },
  {
    // Source: notion_chem0.pdf
    slug: "chem0",
    name: "Chem0",
    headline: "a chemistry engine that predicts reactions no one has run yet",
    tags: ["AI", "Product", "Brand"],
    year: "2024–2025",
    icon: "/assets/portfolio/edulume-cover.png",
    coverColor: "black",
    coverImage: "/assets/work/chem0/landing-site.webp",
    coverImageSize: { width: 2880, height: 1800 },
    coverImageBg: "#ffffff",
    heroVideo: {
      youtubeId: "kTaOAV3Tfw8",
      title:
        "Chem0 Research Mode: stability score, pair risk, and reaction classification",
      poster: "/assets/work/chem0/demo-poster.webp",
    },
    url: "https://chem0.com",
    seo: {
      title:
        "Chem0 case study: an AI chemistry platform for pharmaceutical research",
      description:
        "How Keizerworks designed, built, and scaled Chem0, an AI chemistry simulation platform with Graph Neural Network models that reach 94.84% prediction accuracy, now live with three research and industry institutions.",
      keywords: [
        "Chem0",
        "Chem0 case study",
        "AI chemistry platform",
        "chemistry simulation software",
        "molecular prediction",
        "reaction prediction AI",
        "Graph Neural Networks chemistry",
        "pharmaceutical R&D software",
        "formulation stability prediction",
        "cheminformatics platform",
        "Keizerworks case study",
        "startup product studio",
      ],
    },
    problem:
      "Give chemists a way to test a reaction before they run it, in one platform that works for both labs and pharma.",
    whatWeDid:
      "Chem0 started as a research idea. We joined as their product, design, and AI team for two years. What if a researcher could see a reaction's risk, stability, and outcome before touching a single compound?",
    services: [
      "Product Strategy",
      "Brand",
      "UX/UI Design",
      "Engineering",
      "Machine Learning",
      "Infrastructure",
    ],
    results: [
      { value: "94.84%", label: "peak prediction accuracy" },
      { value: "3", label: "research and industry institutions live" },
      { value: "50,000+", label: "validated chemical combinations" },
      { value: "7", label: "specialists on the dedicated team" },
    ],
    quote: {
      // TODO: replace with the real testimonial from Chem0's co-founder.
      text: "We came to Keizerworks with a research idea and left with a platform chemists actually trust. They built the models, the product, and the brand as one team, and we had a Letter of Intent before we'd even finished building.",
      highlight: "a platform chemists actually trust",
      name: "Co-founder, Chem0",
      placeholder: true,
      detail: "Full Product, AI & Brand Partnership",
    },
    story: {
      chapters: [
        {
          label: "The brief",
          statement:
            "Give chemists a way to test a reaction before they run it, in one platform that works for both labs and pharma.",
          paragraphs: [
            "Chem0 came to us with a vision, not a product: modernise chemistry research by putting molecular intelligence, machine learning, and visualisation in one place.",
            "They needed a long-term partner to build it from scratch, from the brand and the interface to the AI models and the cloud they run on, for pharma companies, R&D labs, and universities alike.",
          ],
        },
        {
          label: "The models",
          statement:
            "Instead of one model that guesses everything, we built three engines, each trained for a single scientific question.",
          paragraphs: [
            "The hardest part was trust. Chemists won't act on a black box, so every engine shows its inputs, from pH and humidity to functional groups and pKa, and returns a score a researcher can reason about.",
            "Underneath, Graph Neural Networks learn how structure, physicochemical properties, and conditions interact. That lets Chem0 predict chemical interactions it has never seen, where rule-based systems stop.",
          ],
          cards: [
            {
              title: "Chemical Stability Engine",
              body: "Scores how stable a combination stays across pH, temperature, and humidity. About 92% accurate.",
            },
            {
              title: "Reaction Risk Engine",
              body: "Rates mixing compounds as low, medium, or high risk. Trained on 50,000+ combinations, up to 98% accurate.",
            },
            {
              title: "Reaction Classification Engine",
              body: "Predicts the most likely reaction type, including no reaction at all. About 94% accurate.",
            },
            {
              title: "Molecular intelligence engine",
              body: "The GNN core: descriptors, LogP, TPSA, pKa, and hydrogen bonding, feeding every model.",
            },
          ],
        },
        {
          label: "Research Mode",
          statement:
            "Can two drugs be formulated together safely? Chem0 answers in about 90 seconds.",
          paragraphs: [
            "A scientist drags two active ingredients onto the reaction canvas, sets real conditions such as 25°C, pH 7, and 60% humidity, and runs Research.",
            "All three models run at once: a stability score from 0 to 100, a low, medium, or high risk for every functional-group pair, and the likely reaction types, from salt formation to nucleophilic attack.",
            "LabMate, Chem0's AI assistant, watches the experiment. Click any risky pair and it explains, in plain terms for a formulator, why it matters under those conditions.",
          ],
          cards: [
            {
              title: "81.26",
              body: "Stability score for Avatrombopag + Azithromycin in the demo",
            },
            { title: "86%", body: "Model confidence for that result" },
            {
              title: "1",
              body: "High-risk functional-group pair flagged: ketone and ketone",
            },
          ],
          visuals: [
            {
              src: "/assets/work/chem0/research-mode.webp",
              alt: "Chem0 Research Mode: Avatrombopag and Azithromycin on the canvas, with LabMate explaining a medium-risk pair",
              caption:
                "Research Mode, with LabMate explaining a risk pair under the chosen conditions.",
              width: 1170,
              height: 666,
            },
          ],
        },
        {
          label: "The product",
          statement:
            "Around the models, a full product: the brand, the marketing site, and a research dashboard built for chemists.",
          paragraphs: [
            "Under the hood, a gateway on AWS Lambda runs the app's API and LabMate, powered by Gemini, while a separate service serves the Graph Neural Network models.",
          ],
          visuals: [
            {
              src: "/assets/work/chem0/landing-site.webp",
              alt: "Chem0 landing page: Formulate any chemical reaction and visualize, with a molecule graph and LabMate explaining a one-pot cascade",
              caption:
                "The marketing site: the pitch, the waitlist, and LabMate at work beside it.",
              width: 2880,
              height: 1800,
            },
            {
              src: "/assets/work/chem0/book-a-call.webp",
              alt: "Chem0 Book a Call page with a calendar, time and timezone scheduler",
              caption:
                "Book a Call: labs pick a date, time, and timezone in one step.",
              width: 2880,
              height: 1800,
            },
          ],
          bullets: [
            "Prediction of previously unseen chemical interactions",
            "AI chemistry assistant for scientific exploration",
            "Interactive 2D and 3D molecular visualisation",
            "Batch prediction APIs for large-scale workflows",
            "Multi-model inference architecture",
            "Enterprise-ready APIs with interactive documentation",
            "Research journeys designed for labs and institutions",
            "Complete brand, marketing site, and dashboard",
          ],
        },
      ],
      result:
        "Chem0 grew from a research idea into an investor-ready platform, earned a Letter of Intent from Strausswell Organics after beta, and drew acquisition offers while still in development.",
    },
  },
  {
    slug: "arlink",
    name: "Arlink",
    headline: "a cleaner product, shipped right before the fundraise",
    tags: ["Product", "Brand"],
    icon: "/assets/portfolio/betteridea-cover.png",
    coverColor: "pink",
    coverImage: "/assets/work/arlink-cover.png",
    coverImageSize: { width: 1068, height: 470 },
    coverImageBg: "#141414",
    url: "https://arlink.ar.io",
    linkOnly: true,
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
    headline: "one founder update, posted to every platform",
    tags: ["AI", "Product"],
    year: "2025",
    icon: "/assets/work/plobbo/logo.webp",
    coverColor: "blue",
    coverImage: "/assets/work/plobbo/banner.webp",
    heroProfile: true,
    coverImageSize: { width: 1500, height: 500 },
    coverImageBg: "#ffffff",
    url: "https://x.com/plobboo",
    problem:
      "Founders should be building, not rewriting the same update for four platforms.",
    whatWeDid:
      "Plobbo is agentic AI for founders: save time, stay consistent, and reach the right audience. We designed the product and built the MVP, with most of our effort on Ocean: write once, reach everywhere.",
    services: ["Product Design", "MVP Development", "AI"],
    results: [],
    story: {
      chapters: [
        {
          label: "The problem",
          statement:
            "Founders should be building, not rewriting the same update for four platforms.",
          paragraphs: [
            "In a 2024 founder survey, 92% of founders said building their personal brand directly affects business growth. Social has become the trend that matters most.",
            "But it's a second job. The average professional now runs six different social accounts, and every launch, event, or milestone has to be written again for each one, in its own voice.",
            "Plobbo takes that job over: you write down what happened once, and it handles the rest.",
          ],
          cards: [
            {
              title: "92%",
              body: "of founders say their personal brand drives business growth",
            },
            {
              title: "6",
              body: "social accounts the average professional manages",
            },
            { title: "1", body: "place to write it, with Plobbo" },
          ],
        },
        {
          label: "Ocean",
          statement: "Write once, reach everywhere.",
          paragraphs: [
            "Ocean is the feature we put the most into. Pick a chapter of your journey and it drafts a version for each platform, in that platform's voice: X, LinkedIn, Threads, and Reddit today, with Instagram, Facebook, Bluesky, Mastodon, Medium, and Notion planned. Add hashtags, regenerate a draft, or attach media, then post it or schedule it.",
            "We named it for what it does:",
          ],
          bullets: [
            "O — One-click publishing",
            "C — Cross-platform distribution",
            "E — Effortless content management",
            "A — AI-driven automation",
            "N — Network expansion",
          ],
          visuals: [
            {
              src: "/assets/work/plobbo/ocean-dashboard.webp",
              alt: "Plobbo Ocean dashboard: every post for X, Threads, Medium and Pinterest, filtered by All, Posted, Draft and Scheduled",
              caption: "Ocean: every post in one place, posted, draft, or scheduled.",
              width: 2880,
              height: 1800,
            },
            {
              src: "/assets/work/plobbo/created-post.webp",
              alt: "Plobbo created post: the description, generated images, and the platforms it was posted to",
              caption: "A post written once, with its images, sent to every platform.",
              width: 1770,
              height: 1158,
            },
            {
              src: "/assets/work/plobbo/schedule.webp",
              alt: "Plobbo schedule dialog: a calendar, time and timezone, and the platforms to post to",
              caption: "Schedule it: pick a day, time, and timezone, then the platforms.",
              width: 1770,
              height: 1158,
            },
          ],
          // Dashboard full width, then the post and the scheduler side by side.
          layout: "gallery",
        },
        {
          label: "Plobbo AI",
          statement: "And an assistant that knows your story.",
          paragraphs: [
            "Plobbo AI has read your journey. Ask it for your top achievements this year and it answers from what you logged, then sends the answer straight to Ocean to become posts.",
          ],
          visuals: [
            {
              src: "/assets/work/plobbo/onboarding.webp",
              alt: "Welcome to Plobbo onboarding: create with Plobbo AI, write your journey, publish via Ocean",
              caption: "Onboarding: create with Plobbo AI, write your journey, publish via Ocean.",
              width: 2134,
              height: 1344,
            },
          ],
        },
        {
          label: "The MVP",
          statement: "We designed every screen and built the MVP end to end.",
          paragraphs: [
            "Onboarding, the journey, Ocean, Plobbo AI, a content calendar, settings, and pricing, from the first empty state to a scheduled post.",
          ],
          visuals: [
            {
              src: "/assets/work/plobbo/calendar.webp",
              alt: "Plobbo content calendar: a week of scheduled posts with the platforms each goes to",
              caption: "The calendar: a week of scheduled posts, and where each one goes.",
              width: 2880,
              height: 1800,
            },
            {
              src: "/assets/work/plobbo/pricing.webp",
              alt: "Plobbo pricing: Free, Pro at $30, and Enterprise plans",
              caption: "Pricing: Free, Pro, and Enterprise.",
              width: 2880,
              height: 1800,
            },
            {
              src: "/assets/work/plobbo/language-region.webp",
              alt: "Plobbo settings: Language and Region, with language, currency, and timezone",
              caption: "Settings: language, currency, and timezone.",
              width: 2192,
              height: 1592,
            },
            {
              src: "/assets/work/plobbo/payment-methods.webp",
              alt: "Plobbo Payments and Billing: credit card and bank transfer payment methods",
              caption: "Payments and Billing: card or bank transfer.",
              width: 2192,
              height: 1592,
            },
            {
              src: "/assets/work/plobbo/billing-currency.webp",
              alt: "Plobbo Payments and Billing: currency and currency format settings",
              caption: "Currency settings for billing.",
              width: 2192,
              height: 1592,
            },
          ],
          // Calendar full width, then the rest in pairs.
          layout: "gallery",
        },
      ],
      result:
        "Plobbo went from an idea to a working MVP: a journey to write in, Ocean to publish everywhere, and an assistant that knows the story.",
    },
  },
  {
    slug: "voice",
    name: "Voice",
    headline: "the voice infrastructure for learning",
    tags: ["AI", "Product"],
    icon: "/assets/portfolio/voice-cover.png",
    coverColor: "black",
    coverImage: "/assets/work/student-intelligence-tutor.webp",
    coverImageSize: { width: 2000, height: 1011 },
    coverImageBg: "#f6f6f3",
    url: "https://studentintelligence.ai",
    linkOnly: true,
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
    coverImageSize: { width: 1622, height: 866 },
    coverImageBg: "#ffffff",
    url: "https://betteridea.ar.io",
    linkOnly: true,
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
