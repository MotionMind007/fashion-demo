"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StatementSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Big number slides in from left
      gsap.fromTo(
        ".stmt-number",
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Eyebrow fades in
      gsap.fromTo(
        ".stmt-eyebrow",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Headline reveals line by line
      gsap.fromTo(
        ".stmt-headline",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        }
      );

      // Red line grows
      gsap.fromTo(
        ".stmt-red-line",
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );

      // Body text fades up
      gsap.fromTo(
        ".stmt-body",
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
      className="bg-noir-white py-20 md:py-28 px-6 md:px-12 lg:px-16"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-16">
        <div className="stmt-number font-serif text-[80px] md:text-[120px] font-black text-noir-cream leading-none shrink-0 select-none">
          01
        </div>
        <div className="flex-1">
          <span className="stmt-eyebrow block text-[10px] uppercase tracking-[4px] text-noir-red font-medium mb-4">
            Our Philosophy
          </span>
          <h2 className="stmt-headline font-serif text-3xl md:text-4xl lg:text-[42px] font-bold text-noir-black leading-[1.15] mb-5 text-balance">
            Fashion is not{" "}
            <em className="italic text-noir-red">clothing.</em>
            <br />
            It is language.
          </h2>
          <div className="stmt-red-line w-12 h-0.5 bg-noir-red mb-6" />
          <p className="stmt-body text-sm md:text-[15px] leading-relaxed text-noir-gray max-w-lg">
            Setiap potongan, setiap jahitan, setiap pilihan kain adalah
            pernyataan. NOIR percaya bahwa cara kamu berpakaian adalah cara kamu
            berbicara tanpa kata — dan keheningan yang paling kuat kadang datang
            dari pilihan yang paling tegas.
          </p>
        </div>
      </div>
    </section>
  );
}
