"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    name: "Bespoke Tailoring",
    desc: "Pakaian dibuat khusus untuk proporsi dan kepribadian kamu.",
  },
  {
    num: "02",
    name: "Styling Session",
    desc: "Konsultasi personal dengan head stylist kami, satu-satu.",
  },
  {
    num: "03",
    name: "Editorial Shoot",
    desc: "Kolaborasi pemotretan untuk personal branding atau campaign.",
  },
];

export default function ServicesTeaser() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header title
      gsap.fromTo(
        ".svc-header-title",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Header link
      gsap.fromTo(
        ".svc-header-link",
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Each service row staggers in
      gsap.fromTo(
        ".svc-row",
        { opacity: 0, y: 30, x: -15 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".svc-list",
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-noir-white py-20 md:py-28 px-6 md:px-12 lg:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4">
          <h2 className="svc-header-title font-serif text-4xl md:text-5xl font-black text-noir-black leading-none">
            What
            <br />
            <em className="italic">We Do</em>
          </h2>
          <a
            href="/services"
            className="svc-header-link text-[11px] uppercase tracking-[3px] text-noir-gray hover:text-noir-black transition-colors cursor-pointer"
          >
            Our Services →
          </a>
        </div>

        {/* Service Items */}
        <div className="svc-list">
          {services.map((svc) => (
            <a
              key={svc.num}
              href="/services"
              className="svc-row group flex items-center gap-6 md:gap-8 py-6 md:py-7 border-t border-noir-cream last:border-b last:border-noir-cream cursor-pointer"
            >
              <span className="font-serif text-[11px] text-noir-red tracking-[2px] min-w-[24px]">
                {svc.num}
              </span>
              <span className="font-serif text-2xl md:text-[32px] font-bold text-noir-black flex-1 tracking-tight group-hover:text-noir-red transition-colors duration-200">
                {svc.name}
              </span>
              <span className="hidden md:block text-[12px] text-noir-gray max-w-[200px] leading-relaxed">
                {svc.desc}
              </span>
              <ArrowRight
                size={18}
                className="text-noir-red opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
