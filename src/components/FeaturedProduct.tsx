"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProduct() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Image zoom-in reveal
      gsap.fromTo(
        ".feat-image img",
        { scale: 1.2, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Badge slides up
      gsap.fromTo(
        ".feat-badge",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Content stagger
      gsap.fromTo(
        ".feat-content > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-noir-cream grid grid-cols-1 lg:grid-cols-2 min-h-[420px] lg:min-h-[500px] overflow-hidden"
    >
      {/* Image Side */}
      <div className="feat-image relative overflow-hidden min-h-[360px] lg:min-h-0">
        <img
          src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=700&h=900&fit=crop&q=80"
          alt="The Onyx Coat — NOIR featured product, dark structured overcoat"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-noir-black/10 to-transparent" />

        {/* Badge */}
        <div className="feat-badge absolute bottom-6 left-6">
          <span className="bg-noir-black text-noir-white text-[9px] uppercase tracking-[3px] px-4 py-2 font-medium">
            New Arrival
          </span>
        </div>
      </div>

      {/* Content Side */}
      <div className="feat-content flex flex-col justify-center px-8 md:px-12 lg:px-14 py-12 lg:py-16">
        <span className="text-[9px] uppercase tracking-[4px] text-noir-red font-medium mb-4">
          Featured Piece
        </span>

        <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-black text-noir-black leading-[0.9] tracking-tight mb-6">
          THE
          <br />
          ONYX
          <br />
          COAT
        </h2>

        <p className="text-[13px] leading-relaxed text-noir-gray mb-8 max-w-sm">
          Dibuat dari wol Merino Jepang berat 380gsm. Siluet oversized dengan
          bahu terstruktur. Satu kancing tersembunyi. Warna: Deep Onyx.
        </p>

        <div className="font-serif text-2xl md:text-3xl font-bold text-noir-black mb-8">
          Rp 4.800.000
        </div>

        <a
          href="/products"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[3px] font-medium text-noir-black hover:text-noir-red transition-colors cursor-pointer group"
        >
          See All Pieces
          <span className="text-noir-red text-base transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </section>
  );
}
