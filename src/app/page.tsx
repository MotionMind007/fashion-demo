import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeSection from "@/components/MarqueeSection";
import StatementSection from "@/components/StatementSection";
import FeaturedProduct from "@/components/FeaturedProduct";
import Manifesto from "@/components/Manifesto";
import ServicesTeaser from "@/components/ServicesTeaser";
import Footer from "@/components/Footer";
import { OrganizationSchema, LocalBusinessSchema } from "@/components/StructuredData";

export default function HomePage() {
  return (
    <>
      <OrganizationSchema />
      <LocalBusinessSchema />
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeSection />
        <StatementSection />
        <FeaturedProduct />
        <Manifesto />
        <ServicesTeaser />
      </main>
      <Footer />
    </>
  );
}
