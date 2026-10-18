import { DM_Mono, Inter, Space_Grotesk } from "next/font/google";
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

// Navbar only: free stand-in for HEX's licensed Lausanne.
export const inter = Inter({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});
