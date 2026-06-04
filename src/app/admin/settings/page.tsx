"use client";

import { useState } from "react";
import { Save } from "lucide-react";

interface Settings {
  brandName: string;
  tagline: string;
  email: string;
  address: string;
  hoursWeekday: string;
  hoursSunday: string;
  instagram: string;
}

const initialSettings: Settings = {
  brandName: "NOIR",
  tagline: "Wear the Silence.",
  email: "hello@noir-studio.id",
  address: "Jl. Kemang Raya No. 12\nJakarta Selatan, 12730",
  hoursWeekday: "10:00 – 19:00 WIB",
  hoursSunday: "Tutup",
  instagram: "@noir.studio",
};

export default function AdminSettings() {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [toast, setToast] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const handleChange = (key: keyof Settings, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    showToast("Pengaturan berhasil disimpan.");
    setHasChanges(false);
  };

  return (
    <div className="space-y-5">
      {toast && (
        <div className="bg-noir-black text-noir-white px-4 py-2.5 rounded-md text-[12px] flex items-center gap-2 border-l-3 border-l-noir-red">
          <span className="text-noir-red">✓</span> {toast}
        </div>
      )}

      <p className="text-[11px] text-noir-gray">Pengaturan umum website NOIR.</p>

      {/* Brand Identity */}
      <div className="bg-white rounded-lg border border-noir-border overflow-hidden">
        <div className="px-5 py-3.5 border-b border-noir-border">
          <h2 className="text-[12px] font-medium text-noir-black tracking-wide">Brand Identity</h2>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-[9px] uppercase tracking-[2px] text-noir-gray font-medium mb-1.5">Brand Name</label>
            <input type="text" value={settings.brandName} onChange={(e) => handleChange("brandName", e.target.value)} className="w-full max-w-sm px-3 py-2.5 text-[12px] bg-noir-surface border border-noir-border rounded-md outline-none focus:border-noir-black/30 transition-colors" />
          </div>
          <div>
            <label className="block text-[9px] uppercase tracking-[2px] text-noir-gray font-medium mb-1.5">Tagline</label>
            <input type="text" value={settings.tagline} onChange={(e) => handleChange("tagline", e.target.value)} className="w-full max-w-sm px-3 py-2.5 text-[12px] bg-noir-surface border border-noir-border rounded-md outline-none focus:border-noir-black/30 transition-colors" />
          </div>
          <div>
            <label className="block text-[9px] uppercase tracking-[2px] text-noir-gray font-medium mb-1.5">Email Kontak</label>
            <input type="email" value={settings.email} onChange={(e) => handleChange("email", e.target.value)} className="w-full max-w-sm px-3 py-2.5 text-[12px] bg-noir-surface border border-noir-border rounded-md outline-none focus:border-noir-black/30 transition-colors" />
          </div>
          <div>
            <label className="block text-[9px] uppercase tracking-[2px] text-noir-gray font-medium mb-1.5">Instagram</label>
            <input type="text" value={settings.instagram} onChange={(e) => handleChange("instagram", e.target.value)} className="w-full max-w-sm px-3 py-2.5 text-[12px] bg-noir-surface border border-noir-border rounded-md outline-none focus:border-noir-black/30 transition-colors" />
          </div>
          <div>
            <label className="block text-[9px] uppercase tracking-[2px] text-noir-gray font-medium mb-1.5">Alamat Studio</label>
            <textarea value={settings.address} onChange={(e) => handleChange("address", e.target.value)} rows={2} className="w-full max-w-sm px-3 py-2.5 text-[12px] bg-noir-surface border border-noir-border rounded-md outline-none resize-y focus:border-noir-black/30 transition-colors" />
          </div>
        </div>
      </div>

      {/* Jam Operasional */}
      <div className="bg-white rounded-lg border border-noir-border overflow-hidden">
        <div className="px-5 py-3.5 border-b border-noir-border">
          <h2 className="text-[12px] font-medium text-noir-black tracking-wide">Jam Operasional</h2>
        </div>
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-noir-black w-28">Senin – Sabtu</span>
            <input type="text" value={settings.hoursWeekday} onChange={(e) => handleChange("hoursWeekday", e.target.value)} className="px-3 py-2 text-[12px] bg-noir-surface border border-noir-border rounded-md outline-none focus:border-noir-black/30 transition-colors" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-noir-black w-28">Minggu</span>
            <input type="text" value={settings.hoursSunday} onChange={(e) => handleChange("hoursSunday", e.target.value)} className="px-3 py-2 text-[12px] bg-noir-surface border border-noir-border rounded-md outline-none focus:border-noir-black/30 transition-colors" />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={!hasChanges}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 text-[10px] uppercase tracking-[1px] font-medium bg-noir-black text-noir-white rounded-md hover:bg-noir-black/90 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Save size={13} /> Simpan Perubahan
        </button>
      </div>
    </div>
  );
}
