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
      url: `${siteUrl}/services`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/careers`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/book`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/work`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Case studies with written SEO copy; the rest are still drafts.
    ...projects
      .filter((project) => project.seo)
      .map((project) => ({
        url: `${siteUrl}/work/${project.slug}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
    {
      url: `${siteUrl}/gallery`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/blogs`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    // Written posts only; outlines and placeholders stay out.
    ...posts
      .filter((post) => hasContent(post))
      .map((post) => ({
        url: `${siteUrl}/blogs/${post.slug}`,
        lastModified: post.date ? new Date(post.date) : lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
  ];
}
