"use client";

import { Edit2, Eye } from "lucide-react";

const pages = [
  {
    page: "Home",
    heroTitle: "WEAR THE SILENCE",
    heroSubtitle: "Defined by contrast. Worn with intent.",
    lastUpdated: "2 hari lalu",
  },
  {
    page: "Products",
    heroTitle: "SS 2026",
    heroSubtitle: "Collection",
    lastUpdated: "1 minggu lalu",
  },
  {
    page: "Services",
    heroTitle: "WE DRESS YOUR STORY",
    heroSubtitle: "Three ways to experience NOIR.",
    lastUpdated: "2 minggu lalu",
  },
  {
    page: "Contact",
    heroTitle: "LET'S TALK",
    heroSubtitle: "Setiap kolaborasi terbaik dimulai dari percakapan yang jujur.",
    lastUpdated: "1 bulan lalu",
  },
];

export default function AdminPages() {
  return (
    <div className="space-y-5">
      <p className="text-[11px] text-noir-gray">
        Edit konten hero setiap halaman website publik.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pages.map((pg) => (
          <div
            key={pg.page}
            className="bg-white rounded-lg border border-noir-border p-5 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-[9px] uppercase tracking-[3px] text-noir-red font-medium">
                {pg.page}
              </span>
              <span className="text-[10px] text-noir-gray">{pg.lastUpdated}</span>
            </div>

            <h3 className="font-serif text-lg font-bold text-noir-black leading-tight mb-1">
              {pg.heroTitle}
            </h3>
            <p className="text-[12px] text-noir-gray italic mb-5">
              {pg.heroSubtitle}
            </p>

            <div className="flex gap-2">
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] uppercase tracking-[1px] font-medium border border-noir-border rounded text-noir-gray hover:bg-noir-surface transition-colors cursor-pointer">
                <Eye size={12} />
                Preview
              </button>
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] uppercase tracking-[1px] font-medium bg-noir-black text-noir-white rounded hover:bg-noir-black/90 transition-colors cursor-pointer">
                <Edit2 size={12} />
                Edit Hero
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
