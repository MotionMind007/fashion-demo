"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-noir-white/95 backdrop-blur-md shadow-sm border-b border-noir-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif font-black text-xl md:text-2xl tracking-[0.3em] text-noir-black cursor-pointer"
          >
            NOIR
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-8 lg:gap-12">
            {["Home", "Products", "Services", "Contact"].map((item) => (
              <li key={item}>
                <Link
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-[11px] uppercase tracking-[2px] font-medium text-noir-black hover:text-noir-red transition-colors duration-200 cursor-pointer"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            <button
              className="text-noir-gray hover:text-noir-black transition-colors duration-200 cursor-pointer"
              aria-label="Search"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button
              className="flex items-center gap-1.5 text-[11px] tracking-[1.5px] text-noir-red font-medium cursor-pointer"
              aria-label="Shopping bag"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              <span className="hidden sm:inline">(0)</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-noir-black cursor-pointer"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            >
              {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-noir-white border-t border-noir-border">
          <ul className="flex flex-col py-6 px-6 gap-6">
            {["Home", "Products", "Services", "Contact"].map((item) => (
              <li key={item}>
                <Link
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-sm uppercase tracking-[2px] font-medium text-noir-black hover:text-noir-red transition-colors duration-200 cursor-pointer"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
