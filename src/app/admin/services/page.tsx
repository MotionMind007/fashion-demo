"use client";

import { Edit2, GripVertical } from "lucide-react";

const services = [
  {
    order: "01",
    name: "Bespoke Tailoring",
    tagline: "Handmade — 4–6 Weeks",
    price: "Mulai dari Rp 3.500.000",
    description: "Pakaian dibuat khusus untuk proporsi tubuh, pilihan kain, dan kepribadian kamu.",
  },
  {
    order: "02",
    name: "Styling Session",
    tagline: "In-Person — 90 Menit",
    price: "Rp 850.000 / sesi",
    description: "Konsultasi personal dengan head stylist kami, satu-satu.",
  },
  {
    order: "03",
    name: "Editorial Shoot",
    tagline: "Collaboration — Full Day",
    price: "Mulai dari Rp 5.500.000",
    description: "Kolaborasi pemotretan editorial dengan tim NOIR.",
  },
];

export default function AdminServices() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-[11px] text-noir-gray">
          Drag untuk mengubah urutan layanan
        </p>
        <button className="inline-flex items-center gap-1.5 px-4 py-2 text-[11px] uppercase tracking-[1px] font-medium bg-noir-black text-noir-white rounded-md hover:bg-noir-black/90 transition-colors cursor-pointer">
          + Tambah Service
        </button>
      </div>

      <div className="space-y-3">
        {services.map((svc) => (
          <div
            key={svc.order}
            className="bg-white rounded-lg border border-noir-border p-5 flex gap-4 items-start hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center gap-3 shrink-0 pt-1">
              <GripVertical size={14} className="text-noir-gray/40 cursor-grab" />
              <span className="font-serif text-3xl font-black text-noir-cream">
                {svc.order}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="block text-[9px] uppercase tracking-[3px] text-noir-red font-medium mb-1">
                    {svc.tagline}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-noir-black mb-2">
                    {svc.name}
                  </h3>
                  <p className="text-[12px] text-noir-gray leading-relaxed max-w-lg">
                    {svc.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-medium text-noir-black">
                    {svc.price}
                  </span>
                  <button
                    className="w-7 h-7 rounded border border-noir-border flex items-center justify-center text-noir-gray hover:bg-noir-cream hover:text-noir-black transition-colors cursor-pointer"
                    aria-label={`Edit ${svc.name}`}
                  >
                    <Edit2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
