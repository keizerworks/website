// Writing for /v2/blogs and the home page. Placeholders: the titles are
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

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | {
      type: "figure";
      src: string;
      alt: string;
      width: number;
      height: number;
      caption?: string;
      bg?: string;
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
    // TODO: write the story. Working title and excerpt until then.
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
    // Outline only: sections to fill in once we have the story.
    body: [
      { type: "h2", text: "Where it started" },
      { type: "draft", lines: 4 },
      { type: "h2", text: "Why a studio" },
      { type: "draft", lines: 5 },
      { type: "h2", text: "The first client" },
      { type: "draft", lines: 4 },
      { type: "h2", text: "The name and the badge" },
      { type: "draft", lines: 3 },
      { type: "h2", text: "The hard part" },
      { type: "draft", lines: 5 },
      { type: "h2", text: "Where we are now" },
      { type: "draft", lines: 4 },
    ],
  },
  {
    slug: "building-an-ai-native-lms",
    coverLine: "One core, 1,000 schools.",
    title: "What we learned building an AI-native LMS for 1,000 schools",
    excerpt:
      "Multi-tenancy, custom roles, and curriculum-aware AI: the decisions that shaped Edulume.",
    category: "Product",
    coverColor: "blue",
    project: "edulume",
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
