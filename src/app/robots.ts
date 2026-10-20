import type { MetadataRoute } from "next";

const siteUrl = "https://keizerworks.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Admin and claim links aren't for search.
      disallow: ["/admin", "/claim", "/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
