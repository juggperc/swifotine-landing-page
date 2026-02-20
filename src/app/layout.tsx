import type { Metadata } from "next";
import {
  Archivo_Black,
  Bricolage_Grotesque,
  IBM_Plex_Mono,
  Playfair_Display,
  Sora,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["500", "600", "700", "800"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500", "600", "700"],
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["400", "500", "700", "800"],
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  variable: "--font-archivo-black",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://swifotine.vercel.app",
  ),
  title: "Swifotine | Any song in the world, for free",
  description:
    "Swifotine is a native macOS Soulseek client for searching, downloading, organizing, and playing music in one focused workflow.",
  icons: {
    icon: "/favicon.ico",
    apple: "/brand/swifotine-app-icon.png",
  },
  openGraph: {
    title: "Swifotine",
    description:
      "Any song in the world, for free. Native macOS Soulseek workflow with search, downloads, library, and playback.",
    images: [
      {
        url: "/brand/swifotine-app-icon.png",
        width: 1200,
        height: 1200,
        alt: "Swifotine app icon",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swifotine",
    description:
      "Any song in the world, for free. Native macOS Soulseek workflow with search, downloads, and playback.",
    images: ["/brand/swifotine-app-icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${spaceGrotesk.variable} ${playfair.variable} ${plexMono.variable} ${bricolage.variable} ${archivoBlack.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
