import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Hubungi NOIR Studio",
  description:
    "Hubungi NOIR Studio Jakarta untuk bespoke tailoring, styling session, atau kolaborasi editorial. Jl. Kemang Raya No. 12, Jakarta Selatan.",
  openGraph: {
    title: "Contact NOIR Studio Jakarta",
    description: "Hubungi kami untuk konsultasi fashion personal. Senin–Sabtu, 10:00–19:00 WIB.",
    url: "https://noir-studio.id/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
