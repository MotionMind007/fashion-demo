"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";

/* ═══════════════════════════════════════════════════
   Background images — auto-rotating with parallax
   ═══════════════════════════════════════════════════ */
const bgSlides = [
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&h=1080&fit=crop&q=80",
    alt: "Dark fashion runway with dramatic lighting",
  },
  {
    src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&h=1080&fit=crop&q=80",
    alt: "Minimal fashion editorial with muted tones",
  },
  {
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop&q=80",
    alt: "Fashion store interior with dark aesthetic",
  },
];

/* ═══════════════════════════════════════════════════
   Right-side editorial slider — manual control
   ═══════════════════════════════════════════════════ */
const editorialSlides = [
  {
    src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop&q=80",
    alt: "Model in dark editorial fashion look — structured coat",
    label: "Look 01",
  },
  {
    src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=800&fit=crop&q=80",
    alt: "Fashion model in minimalist black outfit",
    label: "Look 02",
  },
  {
    src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop&crop=center&q=80",
    alt: "Editorial pose with dramatic silhouette",
    label: "Look 03",
  },
  {
    src: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop&q=80",
    alt: "High fashion model in elegant dark dress",
    label: "Look 04",
  },
];

/* ═══════════════════════════════════════════════════
   Hero text rotation — auto-cycling headlines
   ═══════════════════════════════════════════════════ */
const heroTexts = [
  { line1: "WEAR", line2: "THE", line3: "SILENCE" },
  { line1: "OWN", line2: "YOUR", line3: "SHADOW" },
  { line1: "DRESS", line2: "THE", line3: "CONTRAST" },
  { line1: "FIND", line2: "YOUR", line3: "EDGE" },
];

const heroSubtitles = [
  "Defined by contrast. Worn with intent.",
  "Where darkness meets elegance.",
  "Bold without being loud.",
  "Fashion that speaks in silence.",
];

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const scrollIndRef = useRef<HTMLDivElement>(null);
  const bgContainerRef = useRef<HTMLDivElement>(null);

  const [activeBg, setActiveBg] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeText, setActiveText] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [textAnimating, setTextAnimating] = useState(false);
  const textTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // Auto-rotate background
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBg((prev) => (prev + 1) % bgSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate text
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const interval = setInterval(() => {
      if (prefersReducedMotion) {
        setActiveText((prev) => (prev + 1) % heroTexts.length);
        return;
      }

      setTextAnimating(true);

      // Animate out
      const lines = document.querySelectorAll(".hero-text-line");
      const sub = document.querySelector(".hero-subtitle-text");

      const tl = gsap.timeline({
        onComplete: () => {
          setActiveText((prev) => (prev + 1) % heroTexts.length);
          setTextAnimating(false);
        },
      });

      tl.to(lines, {
        opacity: 0,
        y: -30,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.in",
      }).to(sub, { opacity: 0, y: -10, duration: 0.3, ease: "power2.in" }, "-=0.2");

      textTimelineRef.current = tl;
    }, 5000);

    return () => {
      clearInterval(interval);
      textTimelineRef.current?.kill();
    };
  }, []);

  // Animate new text in after state change
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const lines = document.querySelectorAll(".hero-text-line");
    const sub = document.querySelector(".hero-subtitle-text");

    if (lines.length > 0) {
      gsap.fromTo(
        lines,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }
      );
    }
    if (sub) {
      gsap.fromTo(
        sub,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.3, ease: "power2.out" }
      );
    }
  }, [activeText]);

  // Parallax on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!bgContainerRef.current) return;
      const scrollY = window.scrollY;
      const parallaxOffset = scrollY * 0.35;
      bgContainerRef.current.style.transform = `translateY(${parallaxOffset}px) scale(1.1)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP entrance animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      [tagRef, titleRef, subtitleRef, ctaRef, sliderRef, scrollIndRef].forEach(
        (ref) => {
          if (ref.current) {
            ref.current.style.opacity = "1";
            ref.current.style.transform = "none";
          }
        }
      );
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        tagRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      )
        .fromTo(
          titleRef.current?.querySelectorAll(".hero-text-line") || [],
          { opacity: 0, y: 60, rotateX: -15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3"
        )
        .fromTo(
          sliderRef.current,
          { opacity: 0, scale: 0.95, x: 40 },
          { opacity: 1, scale: 1, x: 0, duration: 1, ease: "power2.out" },
          "-=0.8"
        )
        .fromTo(
          scrollIndRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          "-=0.2"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Slider manual controls
  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setActiveSlide(index);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning]
  );

  const nextSlide = useCallback(() => {
    goToSlide((activeSlide + 1) % editorialSlides.length);
  }, [activeSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(
      (activeSlide - 1 + editorialSlides.length) % editorialSlides.length
    );
  }, [activeSlide, goToSlide]);

  const currentText = heroTexts[activeText];
  const currentSubtitle = heroSubtitles[activeText];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* ═══ PARALLAX BACKGROUND SLIDESHOW ═══ */}
      <div
        ref={bgContainerRef}
        className="absolute inset-0 scale-110 will-change-transform"
        aria-hidden="true"
      >
        {bgSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
              i === activeBg ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-noir-black/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.4)_100%)]" />
      </div>

      {/* Red vertical accent */}
      <div className="absolute left-6 md:left-12 lg:left-16 top-0 bottom-0 w-px bg-noir-red/30 z-10" />

      {/* Giant background text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-[1]"
        aria-hidden="true"
      >
        <span className="font-serif font-black italic text-[12rem] md:text-[18rem] lg:text-[24rem] text-white/[0.03] whitespace-nowrap tracking-tight">
          NOIR
        </span>
      </div>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-24 pb-16 md:pt-0 md:pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[80vh]">
          {/* Left — Text Content */}
          <div className="lg:col-span-7 xl:col-span-6">
            {/* Tag */}
            <div ref={tagRef} className="opacity-0 mb-6 md:mb-8">
              <span className="inline-flex items-center gap-2 text-[10px] md:text-[11px] uppercase tracking-[3px] md:tracking-[4px] text-noir-red font-medium">
                <span className="w-8 h-px bg-noir-red" />
                SS 2026 Collection — Now Available
              </span>
            </div>

            {/* Rotating Title */}
            <div ref={titleRef} className="mb-6 md:mb-8">
              <h1 className="font-serif font-black text-noir-white leading-[0.85] tracking-tight">
                <span className="hero-text-line block text-6xl md:text-7xl lg:text-8xl xl:text-[104px]">
                  {currentText.line1}
                </span>
                <span className="hero-text-line block text-6xl md:text-7xl lg:text-8xl xl:text-[104px] italic text-noir-red">
                  {currentText.line2}
                </span>
                <span className="hero-text-line block text-6xl md:text-7xl lg:text-8xl xl:text-[104px]">
                  {currentText.line3}
                </span>
              </h1>
            </div>

            {/* Rotating Subtitle */}
            <div ref={subtitleRef} className="opacity-0 mb-10 md:mb-12">
              <p className="hero-subtitle-text font-accent text-lg md:text-xl lg:text-2xl font-light italic text-noir-white/50 tracking-wider max-w-md">
                {currentSubtitle}
              </p>
            </div>

            {/* CTA */}
            <div ref={ctaRef} className="opacity-0">
              <a
                href="/products"
                className="group inline-flex items-center gap-4 cursor-pointer"
              >
                <span className="relative inline-block border border-noir-white/60 text-noir-white px-8 py-4 text-[10px] md:text-[11px] uppercase tracking-[3px] font-medium overflow-hidden transition-all duration-300 group-hover:border-noir-red group-hover:text-noir-white">
                  <span className="absolute inset-0 bg-noir-red scale-x-0 origin-left transition-transform duration-400 ease-out group-hover:scale-x-100" />
                  <span className="relative z-10">Explore Collection</span>
                </span>
                <span className="text-noir-white/40 text-sm transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>

            {/* Text rotation indicator */}
            <div className="flex items-center gap-1.5 mt-8">
              {heroTexts.map((_, i) => (
                <div
                  key={i}
                  className={`h-0.5 rounded-full transition-all duration-500 ${
                    i === activeText
                      ? "w-6 bg-noir-red"
                      : "w-2 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ═══ RIGHT — EDITORIAL SLIDER (Manual) ═══ */}
          <div
            ref={sliderRef}
            className="hidden lg:block lg:col-span-5 xl:col-span-6 opacity-0"
          >
            <div className="relative aspect-[3/4] max-h-[70vh] rounded-sm overflow-hidden group">
              {/* Slides */}
              {editorialSlides.map((slide, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-all duration-500 ease-out ${
                    i === activeSlide
                      ? "opacity-100 scale-100"
                      : i < activeSlide
                      ? "opacity-0 scale-95 -translate-x-4"
                      : "opacity-0 scale-95 translate-x-4"
                  }`}
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-noir-black/80 via-transparent to-noir-black/20 pointer-events-none" />

              {/* Slide Nav Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-noir-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:bg-noir-red/80 hover:text-white hover:border-noir-red/60 transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer z-20"
                aria-label="Previous slide"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-noir-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:bg-noir-red/80 hover:text-white hover:border-noir-red/60 transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer z-20"
                aria-label="Next slide"
              >
                <ChevronRight size={16} />
              </button>

              {/* Bottom Info + Dots */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="block text-[9px] uppercase tracking-[3px] text-white/50 mb-1">
                      Editorial — SS 2026
                    </span>
                    <span className="block text-sm font-medium text-white/80">
                      {editorialSlides[activeSlide].label}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {editorialSlides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goToSlide(i)}
                        className={`transition-all duration-300 rounded-full cursor-pointer ${
                          i === activeSlide
                            ? "w-6 h-1.5 bg-noir-red"
                            : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Red corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none z-10">
                <div className="absolute top-0 right-0 w-full h-px bg-noir-red/60" />
                <div className="absolute top-0 right-0 h-full w-px bg-noir-red/60" />
              </div>
            </div>

            {/* Slide counter */}
            <div className="flex items-center justify-between mt-4 px-1">
              <span className="text-[10px] uppercase tracking-[2px] text-white/30">
                {String(activeSlide + 1).padStart(2, "0")} /{" "}
                {String(editorialSlides.length).padStart(2, "0")}
              </span>
              <span className="text-[10px] uppercase tracking-[2px] text-white/30">
                Drag or click arrows
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Background slide indicators */}
      <div className="absolute bottom-8 left-6 md:left-12 lg:left-16 z-10 flex items-center gap-2">
        {bgSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveBg(i)}
            className={`transition-all duration-300 cursor-pointer ${
              i === activeBg
                ? "w-8 h-0.5 bg-noir-red"
                : "w-4 h-0.5 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Switch to background ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0 z-10"
      >
        <span className="text-[9px] uppercase tracking-[3px] text-white/30">
          Scroll
        </span>
        <div className="w-px h-8 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-noir-red animate-pulse-slow" />
        </div>
        <ArrowDown size={12} className="text-white/30" />
      </div>
    </section>
  );
}
