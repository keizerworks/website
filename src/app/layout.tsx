import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import type { ReactNode } from "react";
import { dmMono, spaceGrotesk } from "~/config/font";

const siteUrl = "https://keizerworks.com";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Keizerworks",
  alternateName: ["Keizer", "KZR"],
  url: siteUrl,
  logo: `${siteUrl}/assets/logos/keizer-logo-name.svg`,
  foundingDate: "2024",
  founder: {
    "@type": "Person",
    name: "Rahul Sain",
    url: "https://www.linkedin.com/in/rahul-sain-649567250/",
    sameAs: [
      "https://x.com/rahulsainlll",
      "https://www.linkedin.com/in/rahul-sain-649567250/",
    ],
    jobTitle: "Founder",
    worksFor: {
      "@id": `${siteUrl}/#organization`,
    },
  },
  employee: [
    {
      "@type": "Person",
      name: "Rahul Sain",
      jobTitle: "Founder",
      sameAs: [
        "https://x.com/rahulsainlll",
        "https://www.linkedin.com/in/rahul-sain-649567250/",
      ],
    },
    {
      "@type": "Person",
      name: "Mayank Dhokal",
      jobTitle: "CPO & Co-founder",
      sameAs: ["https://www.linkedin.com/in/mayank-dhokal-5a11a7327/"],
    },
  ],
  description:
    "Keizerworks is a software company and product studio that designs, builds, and maintains web apps, mobile apps, SaaS products, AI products, and custom software for startups and growth-stage companies.",
  email: "rahul.sain@keizerworks.com",
  telephone: "+91-7357156587",
  areaServed: ["North America", "Europe", "Asia", "India"],
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 2,
    maxValue: 10,
  },
  sameAs: [
    "https://www.linkedin.com/company/keizerworks",
    "https://github.com/keizerworks",
    "https://x.com/keizerHq",
  ],
  knowsAbout: [
    "Product Development",
    "MVP Development",
    "Web Application Development",
    "Mobile App Development",
    "SaaS Development",
    "UI/UX Design",
    "Product Strategy",
    "AI Product Development",
    "Web3 Development",
    "Full-stack Development",
    "Cloud Solutions",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      name: "End-to-end product development",
      itemOffered: {
        "@type": "Service",
        name: "Product design, engineering, deployment, and maintenance",
        serviceType: "Software development",
      },
    },
    {
      "@type": "Offer",
      name: "Equity product partnership",
      description:
        "Keizerworks can selectively reduce the fee in exchange for 3-7% equity when a founder or company cannot pay the full build amount upfront.",
      itemOffered: {
        "@type": "Service",
        name: "Equity-based product studio partnership",
        serviceType: "Startup studio",
      },
    },
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || siteUrl,
  ),
  title: {
    default: "Keizerworks - Design, Build, and Maintain Products",
    template: "%s | Keizerworks",
  },
  description:
    "Keizerworks designs, builds, and maintains software products for startups and growth-stage companies. Web apps, mobile apps, SaaS, AI, Web3, MVPs, and full-stack product engineering.",
  keywords: [
    "Keizerworks",
    "Keizer",
    "KZR",
    "Rahul Sain",
    "Mayank Dhokal",
    "startup studio",
    "product engineering",
    "software development company",
    "product development company",
    "custom software development",
    "AI development",
    "Web3",
    "mobile apps",
    "web application development",
    "SaaS development",
    "MVP development",
    "UI/UX design",
    "product strategy",
    "equity product studio",
  ],
  authors: [{ name: "Keizerworks", url: siteUrl }],
  creator: "Keizerworks",
  publisher: "Keizerworks",
  alternates: {
    canonical: siteUrl,
  },
  category: "Software Development",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Keizerworks - Design, Build, and Maintain Products",
    description:
      "A software company and product studio for startups building products that matter. Equity partnerships or fee-based builds.",
    siteName: "Keizerworks",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Keizerworks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Keizerworks - Design, Build, and Maintain Products",
    description:
      "Design, engineering, deployment, and maintenance for startups and growth-stage companies.",
    creator: "@keizerHq",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Keizerworks",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmMono.variable}`}>
      <body className="font-sans antialiased dark bg-background">
        {children}
        <Script
          id="organization-json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <Script
          id="apollo-tracker"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function initApollo(){
                var n=Math.random().toString(36).substring(7),
                o=document.createElement("script");
                o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n;
                o.async=true;
                o.defer=true;
                o.onload=function(){
                  window.trackingFunctions.onLoad({appId:"6a00a92fe959d500192f435e"})
                };
                document.head.appendChild(o)
              }
              initApollo();
            `,
          }}
        />
      </body>
    </html>
  );
}
