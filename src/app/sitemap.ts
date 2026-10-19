import type { MetadataRoute } from "next";
import { hasContent, posts } from "~/data/posts";
import { projects } from "~/data/work";

const siteUrl = "https://keizerworks.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/k25`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/v2/work`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Case studies with written SEO copy; the rest are still drafts.
    ...projects
      .filter((project) => project.seo)
      .map((project) => ({
        url: `${siteUrl}/v2/work/${project.slug}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
    {
      url: `${siteUrl}/v2/blogs`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    // Written posts only; outlines and placeholders stay out.
    ...posts
      .filter((post) => hasContent(post))
      .map((post) => ({
        url: `${siteUrl}/v2/blogs/${post.slug}`,
        lastModified: post.date ? new Date(post.date) : lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
  ];
}
