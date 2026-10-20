import type { Metadata } from "next";
import type { ReactNode } from "react";

// The application form is a client page, so its metadata lives here.
const description =
  "Internships at Keizerworks, a product studio building websites, MVPs, and AI products with founders. Now hiring sales interns.";

export const metadata: Metadata = {
  title: "Careers",
  description,
  alternates: { canonical: "/careers" },
  openGraph: {
    url: "/careers",
    title: "Careers | Keizerworks",
    description,
    siteName: "Keizerworks",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
};

export default function CareersLayout({ children }: { children: ReactNode }) {
  return children;
}
