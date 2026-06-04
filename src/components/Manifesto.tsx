"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Year number fades in with scale
      gsap.fromTo(
        ".manif-year",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Divider grows
      gsap.fromTo(
        ".manif-divider",
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        }
      );

      // Quote slides in from right
      gsap.fromTo(
        ".manif-quote",
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );

      // Body text fades up
      gsap.fromTo(
        ".manif-body",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 55%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-noir-black py-20 md:py-28 px-6 md:px-12 lg:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
        {/* Year */}
        <div className="manif-year font-serif text-[100px] md:text-[140px] font-black text-noir-red/15 leading-none shrink-0 tracking-tighter select-none">
          2026
        </div>

        {/* Divider */}
        <div className="manif-divider hidden md:block w-px self-stretch bg-noir-red/30 min-h-[120px]" />

        {/* Quote & Text */}
        <div className="flex-1">
          <blockquote className="manif-quote font-accent text-2xl md:text-3xl font-light italic text-noir-white leading-snug mb-6">
            &ldquo;Kami tidak membuat tren. Kami membuat sesuatu yang bertahan
            setelah tren berlalu.&rdquo;
          </blockquote>
          <p className="manif-body text-[13px] leading-loose text-white/50 max-w-lg">
            NOIR lahir dari keyakinan bahwa pakaian terbaik adalah pakaian yang
            tidak perlu berbicara keras untuk diperhatikan. Kami merancang untuk
            mereka yang tahu siapa mereka — dan tidak perlu membuktikannya pada
            siapa pun.
          </p>
        </div>
      </div>
    </section>
  );
}
