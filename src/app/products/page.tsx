"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: "The Onyx Coat",
    price: "Rp 4.800.000",
    category: "Men",
    tag: null,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=650&fit=crop&q=80",
    tall: true,
  },
  {
    id: 2,
    name: "Linen Trousers",
    price: "Rp 1.650.000",
    category: "Women",
    tag: null,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=350&fit=crop&q=80",
    tall: false,
  },
  {
    id: 3,
    name: "Silk Shirt No. 7",
    price: "Rp 2.100.000",
    category: "Women",
    tag: null,
    image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&h=350&fit=crop&q=80",
    tall: false,
  },
  {
    id: 4,
    name: "Wool Blazer",
    price: "Rp 3.200.000",
    category: "Men",
    tag: "NEW",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=650&fit=crop&q=80",
    tall: true,
  },
  {
    id: 5,
    name: "Shadow Trench",
    price: "Rp 7.500.000",
    category: "Limited",
    tag: "LIMITED",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&h=650&fit=crop&q=80",
    tall: true,
  },
  {
    id: 6,
    name: "Grey Turtleneck",
    price: "Rp 1.200.000",
    category: "Men",
    tag: null,
    image: "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=500&h=350&fit=crop&q=80",
    tall: false,
  },
  {
    id: 7,
    name: "Merino Scarf",
    price: "Rp 980.000",
    category: "Women",
    tag: null,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&h=350&fit=crop&q=80",
    tall: false,
  },
  {
    id: 8,
    name: "Cropped Jacket",
    price: "Rp 2.850.000",
    category: "Women",
    tag: "NEW",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=650&fit=crop&q=80",
    tall: true,
  },
];

const filters = ["All", "Men", "Women", "Limited"];

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProducts =
    activeFilter === "All"
      ? products
      : products.filter((p) => p.category === activeFilter);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        ".prod-page-eyebrow",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.2 }
      );
      gsap.fromTo(
        ".prod-page-title",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(
        ".prod-page-filters",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.5 }
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".prod-card",
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Page Header with Background Image */}
        <div
          ref={headerRef}
          className="relative px-6 md:px-12 lg:px-16 pt-16 pb-10 border-b border-noir-cream overflow-hidden"
          style={{
            backgroundImage: `url('/images/hero-products.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Light overlay */}
          <div className="absolute inset-0 bg-noir-white/85" />

          <div className="max-w-7xl mx-auto relative z-10">
            <span className="prod-page-eyebrow block text-[10px] uppercase tracking-[4px] text-noir-red font-medium mb-3">
              Collection
            </span>
            <h1 className="prod-page-title font-serif text-6xl md:text-7xl lg:text-8xl font-black text-noir-black leading-[0.9] tracking-tight">
              SS 2026
            </h1>
            <div className="prod-page-filters flex gap-6 md:gap-8 mt-8">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`text-[11px] uppercase tracking-[2px] font-medium pb-1 border-b-2 transition-all duration-200 cursor-pointer ${
                    activeFilter === f
                      ? "text-noir-black border-noir-red"
                      : "text-noir-gray border-transparent hover:text-noir-black"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div
          ref={gridRef}
          className="bg-noir-white px-6 md:px-12 lg:px-16 py-12"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {filteredProducts.map((product) => (
              <a
                key={product.id}
                href="#"
                className={`prod-card group relative overflow-hidden rounded-sm cursor-pointer ${
                  product.tall ? "sm:row-span-2" : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden ${
                    product.tall ? "h-[460px] md:h-[560px]" : "h-[260px] md:h-[300px]"
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-noir-black/80 via-noir-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Tag */}
                  {product.tag && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-noir-red text-white text-[8px] uppercase tracking-[2px] px-2 py-1 font-medium">
                        {product.tag}
                      </span>
                    </div>
                  )}

                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-serif text-xl md:text-2xl font-bold italic text-noir-white">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[11px] tracking-[2px] text-white/60">
                        {product.price}
                      </span>
                      <span className="text-[9px] uppercase tracking-[2px] text-white/40">
                        {product.category}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
