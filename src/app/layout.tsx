import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import type { ReactNode } from "react";
import { dmMono, spaceGrotesk } from "~/config/font";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://keizerworks.com",
  ),
  title: "Keizer - Invest In Future",
  description:
    "We build with founders working on what matters. AI, Web3, mobile, scalable systems. Equity or fixed-price.",
  keywords: [
    "startup studio",
    "product engineering",
    "AI development",
    "Web3",
    "mobile apps",
    "MVP development",
    "equity investment",
  ],
  authors: [{ name: "Keizer" }],
  creator: "Keizer",
  publisher: "Keizer",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://keizerworks.com",
    title: "Keizer - Invest In Future",
    description: "We build with founders working on what matters. Equity or fixed-price.",
    siteName: "Keizer",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Keizer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Keizer - Invest In Future",
    description: "We build with founders working on what matters. Equity or fixed-price.",
    creator: "@keizerHq",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Keizer",
      },
    ],
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
