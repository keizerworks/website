import type { Metadata, Viewport } from "next";
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
        
      </body>
    </html>
  );
}
