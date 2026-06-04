"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Mail, Clock, AtSign } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Form side animations
      gsap.fromTo(
        ".contact-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(
        ".contact-field",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.4,
        }
      );
      gsap.fromTo(
        ".contact-submit",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.8 }
      );
    }, formRef);

    const ctx2 = gsap.context(() => {
      gsap.fromTo(
        ".info-quote",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.3 }
      );
      gsap.fromTo(
        ".info-detail",
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          delay: 0.5,
        }
      );
    }, infoRef);

    return () => {
      ctx.revert();
      ctx2.revert();
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="min-h-[calc(100vh-80px)] grid grid-cols-1 lg:grid-cols-2">
          {/* Form Side */}
          <div
            ref={formRef}
            className="relative px-6 md:px-12 lg:px-16 py-16 md:py-20 flex flex-col justify-center overflow-hidden"
            style={{
              backgroundImage: `url('/images/hero-contact.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Light overlay */}
            <div className="absolute inset-0 bg-noir-white/90" />

            <div className="max-w-md relative z-10">
              <h1 className="contact-title font-serif text-5xl md:text-6xl lg:text-7xl font-black text-noir-black leading-[0.9] tracking-tight mb-12">
                LET&apos;S
                <br />
                <em className="italic text-noir-red">TALK</em>
              </h1>

              <form className="space-y-7" onSubmit={(e) => e.preventDefault()}>
                <div className="contact-field">
                  <label className="block text-[10px] uppercase tracking-[3px] text-noir-gray font-medium mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan nama kamu"
                    className="w-full border-0 border-b border-noir-cream bg-transparent text-[15px] text-noir-black py-3 outline-none focus:border-noir-red transition-colors placeholder:text-noir-gray/50"
                  />
                </div>

                <div className="contact-field">
                  <label className="block text-[10px] uppercase tracking-[3px] text-noir-gray font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="hello@example.com"
                    className="w-full border-0 border-b border-noir-cream bg-transparent text-[15px] text-noir-black py-3 outline-none focus:border-noir-red transition-colors placeholder:text-noir-gray/50"
                  />
                </div>

                <div className="contact-field">
                  <label className="block text-[10px] uppercase tracking-[3px] text-noir-gray font-medium mb-2">
                    Layanan yang Diminati
                  </label>
                  <select className="w-full border-0 border-b border-noir-cream bg-transparent text-[15px] text-noir-black py-3 outline-none focus:border-noir-red transition-colors cursor-pointer">
                    <option value="">Pilih layanan</option>
                    <option>Bespoke Tailoring</option>
                    <option>Styling Session</option>
                    <option>Editorial Shoot</option>
                    <option>Lainnya</option>
                  </select>
                </div>

                <div className="contact-field">
                  <label className="block text-[10px] uppercase tracking-[3px] text-noir-gray font-medium mb-2">
                    Pesan
                  </label>
                  <textarea
                    placeholder="Ceritakan apa yang kamu butuhkan..."
                    rows={4}
                    className="w-full border-0 border-b border-noir-cream bg-transparent text-[15px] text-noir-black py-3 outline-none focus:border-noir-red transition-colors resize-none placeholder:text-noir-gray/50"
                  />
                </div>

                <button
                  type="submit"
                  className="contact-submit bg-noir-red text-noir-white px-10 py-4 text-[10px] uppercase tracking-[3px] font-medium hover:bg-noir-red-dark transition-colors cursor-pointer mt-4"
                >
                  Kirim Pesan →
                </button>
              </form>
            </div>
          </div>

          {/* Info Side */}
          <div
            ref={infoRef}
            className="bg-noir-black px-6 md:px-12 lg:px-16 py-16 md:py-20 flex flex-col justify-center"
          >
            <div className="max-w-sm">
              <blockquote className="info-quote font-accent text-2xl md:text-3xl font-light italic text-noir-white leading-snug mb-10">
                &ldquo;Setiap kolaborasi terbaik dimulai dari percakapan yang
                jujur.&rdquo;
              </blockquote>

              <div className="space-y-7">
                <div className="info-detail flex gap-4">
                  <MapPin size={16} className="text-noir-red shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[9px] uppercase tracking-[3px] text-noir-red font-medium mb-1.5">
                      Studio
                    </span>
                    <p className="text-[13px] text-white/60 leading-relaxed">
                      Jl. Kemang Raya No. 12
                      <br />
                      Jakarta Selatan, 12730
                    </p>
                  </div>
                </div>

                <div className="info-detail flex gap-4">
                  <Mail size={16} className="text-noir-red shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[9px] uppercase tracking-[3px] text-noir-red font-medium mb-1.5">
                      Email
                    </span>
                    <p className="text-[13px] text-white/60">
                      hello@noir-studio.id
                    </p>
                  </div>
                </div>

                <div className="info-detail flex gap-4">
                  <Clock size={16} className="text-noir-red shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[9px] uppercase tracking-[3px] text-noir-red font-medium mb-1.5">
                      Jam Operasional
                    </span>
                    <p className="text-[13px] text-white/60 leading-relaxed">
                      Senin – Sabtu
                      <br />
                      10:00 – 19:00 WIB
                    </p>
                  </div>
                </div>

                <div className="info-detail flex gap-4">
                  <AtSign size={16} className="text-noir-red shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[9px] uppercase tracking-[3px] text-noir-red font-medium mb-1.5">
                      Sosial Media
                    </span>
                    <p className="text-[13px] text-white/60">@noir.studio</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
