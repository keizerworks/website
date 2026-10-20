import { DM_Mono, Source_Serif_4, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-dm-mono",
});

export const gotham_font = localFont({
  src: "./Gotham-Bold.otf",
  display: "swap",
  variable: "--font-gb",
});

// HEX-style sections: free stand-in for HEX's licensed Lausanne.
// Served from our own files: building with Inter from next/font/google
// failed on Vercel (Turbopack couldn't resolve the fetched font files).
export const inter = localFont({
  src: [
    { path: "./fonts/inter-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/inter-600.woff2", weight: "600", style: "normal" },
  ],
  display: "swap",
});

// Large pull quotes in Client Notes.
export const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400"],
  // Real italic for the case study headline accents (no faux slant).
  style: ["normal", "italic"],
  display: "swap",
});
