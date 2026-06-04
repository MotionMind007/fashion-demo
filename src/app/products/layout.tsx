import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products — SS 2026 Collection",
  description:
    "Koleksi fashion premium NOIR SS 2026. Bespoke tailoring, wool blazer, silk shirt, dan limited edition pieces. Made in Jakarta.",
  openGraph: {
    title: "NOIR Products — SS 2026 Collection",
    description: "Koleksi fashion premium NOIR. Pakaian yang berbicara tanpa kata.",
    url: "https://noir-studio.id/products",
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
