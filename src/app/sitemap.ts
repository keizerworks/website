import type { MetadataRoute } from "next";

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
  ];
}
