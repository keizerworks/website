import {
  DM_Mono,
  Inter,
  Source_Serif_4,
  Space_Grotesk,
} from "next/font/google";
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
export const inter = Inter({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

// Large pull quotes in Client Notes.
export const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});
