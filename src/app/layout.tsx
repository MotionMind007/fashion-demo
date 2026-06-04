import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://noir-studio.id"),
  title: {
    default: "NOIR — Wear the Silence",
    template: "%s | NOIR",
  },
  description:
    "Fashion brand Indonesia yang percaya bahwa cara kamu berpakaian adalah cara kamu berbicara tanpa kata. Bespoke tailoring, styling session, editorial shoot.",
  keywords: ["fashion", "Indonesia", "luxury", "bespoke", "tailoring", "NOIR", "Jakarta", "editorial fashion"],
  authors: [{ name: "NOIR Studio" }],
  creator: "NOIR Studio Jakarta",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://noir-studio.id",
    siteName: "NOIR",
    title: "NOIR — Wear the Silence",
    description: "Fashion brand Indonesia. Bespoke tailoring, styling session, editorial shoot.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NOIR Fashion Brand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NOIR — Wear the Silence",
    description: "Fashion brand Indonesia. Defined by contrast. Worn with intent.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${cormorant.variable} ${dmSans.variable} h-full`}
    >
      <head>
        <link rel="canonical" href="https://noir-studio.id" />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
