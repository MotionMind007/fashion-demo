"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  "Bespoke Tailoring",
  "SS 2026 Collection",
  "Editorial Fashion",
  "Wear the Silence",
  "Handcrafted Quality",
  "Jakarta Studio",
];

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-noir-white py-5 border-b border-noir-cream overflow-hidden"
      aria-label="Brand highlights"
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-2 mx-6 md:mx-8 shrink-0"
          >
            <span className="text-noir-red text-sm" aria-hidden="true">
              ✦
            </span>
            <span className="font-serif text-sm italic text-noir-gray tracking-wider">
              {item}
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
