import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // 90 is used by the full-size viewers (zoom, gallery); Next 16 refuses
  // any quality not listed here.
  images: {
    qualities: [75, 90],
  },
  // Old URLs, kept working (and passing their search ranking on) with
  // permanent redirects.
  async redirects() {
    return [
      { source: "/v2/info", destination: "/", permanent: true },
      // Services is a section of the home page, not a page of its own.
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/v2/:path*", destination: "/:path*", permanent: true },
      { source: "/k25", destination: "/careers", permanent: true },
      { source: "/k25/form", destination: "/careers", permanent: true },
    ];
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
