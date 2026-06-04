import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — Bespoke Tailoring, Styling & Editorial",
  description:
    "Layanan NOIR: Bespoke Tailoring, Styling Session, Editorial Shoot, dan Make Your Own Design. Pengalaman fashion yang personal di Jakarta.",
  openGraph: {
    title: "NOIR Services — Pengalaman Fashion Personal",
    description: "Bespoke Tailoring, Styling Session, Editorial Shoot, dan Design Tool interaktif.",
    url: "https://noir-studio.id/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
