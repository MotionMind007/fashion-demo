"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    tagline: "Handmade — 4–6 Weeks",
    name: "Bespoke Tailoring",
    description:
      "Kami merancang dan membuat pakaian dari nol, sesuai dengan proporsi tubuh, pilihan kain, dan kepribadian kamu. Proses fitting 2–3 sesi untuk memastikan hasil yang sempurna. Tersedia untuk suits, overcoat, dress, dan trousers.",
    price: "Mulai dari Rp 3.500.000",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=500&h=600&fit=crop&q=80",
    href: null,
  },
  {
    num: "02",
    tagline: "In-Person — 90 Menit",
    name: "Styling Session",
    description:
      "Satu sesi intens bersama head stylist kami. Kami menganalisis gaya hidup, pekerjaan, dan ekspresi diri kamu — lalu menyusun panduan berpakaian yang relevan dan autentik, bukan hanya mengikuti tren.",
    price: "Rp 850.000 / sesi",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&h=600&fit=crop&q=80",
    href: null,
  },
  {
    num: "03",
    tagline: "Collaboration — Full Day",
    name: "Editorial Shoot",
    description:
      "Kolaborasi pemotretan editorial dengan tim NOIR — stylist, fotografer, dan art director. Ideal untuk personal branding, konten media sosial, atau kampanye brand. Wardrobe disediakan atau bisa menggunakan koleksi pribadi.",
    price: "Mulai dari Rp 5.500.000",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&h=600&fit=crop&q=80",
    href: null,
  },
  {
    num: "04",
    tagline: "Interactive — Design It Yourself",
    name: "Make Your Own Design",
    description:
      "Ekspresikan kreativitasmu sendiri. Pilih jenis pakaian (kaos, jaket, hoodie), tentukan warna, upload gambar desainmu, atur posisi depan-belakang — dan kami akan mewujudkannya. Pengalaman desain interaktif yang bisa kamu coba langsung.",
    price: "Mulai dari Rp 250.000",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&h=600&fit=crop&q=80",
    href: "/services/design",
  },
];

export default function ServicesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".svc-hero-tag",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.2 }
      );
      gsap.fromTo(
        ".svc-hero-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(
        ".svc-hero-sub",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.6 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const items = document.querySelectorAll(".svc-item");
      items.forEach((item) => {
        gsap.fromTo(
          item.querySelector(".svc-item-num"),
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 75%" },
          }
        );
        gsap.fromTo(
          item.querySelector(".svc-item-content"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: item, start: "top 70%" },
          }
        );
        gsap.fromTo(
          item.querySelector(".svc-item-image"),
          { opacity: 0, scale: 1.05 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: { trigger: item, start: "top 70%" },
          }
        );
      });
    }, listRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero with Background Image */}
        <div
          ref={heroRef}
          className="relative px-6 md:px-12 lg:px-16 py-20 md:py-28 overflow-hidden"
          style={{
            backgroundImage: `url('/images/hero-services.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-noir-black/50" />

          {/* Ghost text */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none" aria-hidden="true">
            <span className="font-serif text-[160px] md:text-[220px] font-black text-noir-red/[0.05] whitespace-nowrap">
              SERVICE
            </span>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <span className="svc-hero-tag block text-[10px] uppercase tracking-[4px] text-noir-red font-medium mb-5">
              What We Offer
            </span>
            <h1 className="svc-hero-title font-serif text-6xl md:text-7xl lg:text-8xl font-black italic text-noir-white leading-[0.9] tracking-tight">
              WE DRESS
              <br />
              YOUR STORY
            </h1>
            <p className="svc-hero-sub font-accent text-lg md:text-xl italic text-white/40 mt-6 tracking-wider">
              Four ways to experience NOIR.
            </p>
          </div>
        </div>

        {/* Service Items */}
        <div ref={listRef} className="bg-noir-white">
          {services.map((svc, i) => (
            <div
              key={svc.num}
              className={`svc-item px-6 md:px-12 lg:px-16 py-16 md:py-20 ${
                i < services.length - 1 ? "border-b border-noir-cream" : ""
              }`}
            >
              <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
                {/* Number */}
                <div className="svc-item-num font-serif text-6xl md:text-[80px] font-black text-noir-cream leading-none shrink-0 select-none">
                  {svc.num}
                </div>

                {/* Content */}
                <div className="svc-item-content flex-1 pt-2">
                  <span className="block text-[9px] uppercase tracking-[4px] text-noir-red font-medium mb-3">
                    {svc.tagline}
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-noir-black mb-5 tracking-tight">
                    {svc.name}
                  </h2>
                  <p className="text-[13px] md:text-[14px] leading-relaxed text-noir-gray max-w-lg mb-6">
                    {svc.description}
                  </p>
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[3px] font-medium text-noir-black">
                      {svc.price}
                      <span className="text-noir-red text-base">→</span>
                    </span>
                    {svc.href && (
                      <Link
                        href={svc.href}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-noir-red text-white text-[10px] uppercase tracking-[2px] font-medium rounded-sm hover:bg-noir-red-dark transition-colors cursor-pointer"
                      >
                        <Sparkles size={13} />
                        Coba Sekarang
                      </Link>
                    )}
                  </div>
                </div>

                {/* Image */}
                <div className="svc-item-image w-full lg:w-64 xl:w-72 shrink-0 rounded-sm overflow-hidden">
                  <img
                    src={svc.image}
                    alt={svc.name}
                    className="w-full h-48 lg:h-64 object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
