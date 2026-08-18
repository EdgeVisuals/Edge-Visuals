import type { Metadata } from "next";
import { siteUrl } from "./site-config";
import { StructuredData } from "./structured-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Edge Visuals | Montaggio Reel, TikTok e YouTube Shorts",
  description:
    "Edge Visuals monta video brevi per creator e personal brand. Trasforma podcast, interviste e riprese grezze in Reel, TikTok e YouTube Shorts riconoscibili.",
  keywords: [
    "montaggio video breve",
    "video editor per creator",
    "montaggio Reel Instagram",
    "video TikTok",
    "YouTube Shorts",
    "motion graphics",
    "personal brand",
    "video editing Verona",
  ],
  authors: [{ name: "Edge Visuals", url: siteUrl }],
  creator: "Edge Visuals",
  publisher: "Edge Visuals",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "/",
    siteName: "Edge Visuals",
    title: "Edge Visuals | Montaggio video che conquista il primo secondo",
    description:
      "Edge Visuals monta video brevi per creator e personal brand su Instagram, TikTok e YouTube.",
  },
  twitter: {
    card: "summary",
    title: "Edge Visuals | Montaggio video breve",
    description:
      "Trasformo podcast, interviste e riprese grezze in contenuti brevi riconoscibili.",
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
  icons: {
    icon: "/edge-visuals-precision-mark.svg",
    shortcut: "/edge-visuals-precision-mark.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <head>
        <link rel="describedby" href="/llms.txt" />
        <link rel="alternate" type="text/markdown" href="/index.md" />
        <StructuredData />
      </head>
      <body>{children}</body>
    </html>
  );
}
