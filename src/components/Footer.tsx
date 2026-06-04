"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-inner > *",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-noir-black py-12 md:py-16 px-6 md:px-12 lg:px-16"
    >
      <div className="footer-inner max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <span className="font-serif font-black text-2xl tracking-[0.4em] text-noir-white">
          NOIR
        </span>
        <span className="text-[10px] tracking-[2px] text-white/30 text-center">
          © 2026 NOIR Studio Jakarta. All rights reserved.
        </span>
        <span className="font-accent text-sm italic text-white/40">
          Wear the Silence.
        </span>
      </div>
    </footer>
  );
}
