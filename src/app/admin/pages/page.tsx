"use client";

import { useState } from "react";
import { Edit2, Save, X } from "lucide-react";
import { useAdminStore } from "@/store/admin";

export default function AdminPages() {
  const { pages, updatePage } = useAdminStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formSubtitle, setFormSubtitle] = useState("");
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const openEdit = (pg: typeof pages[0]) => {
    setEditingId(pg.id);
    setFormTitle(pg.heroTitle);
    setFormSubtitle(pg.heroSubtitle);
  };

  const handleSave = () => {
    if (!editingId) return;
    updatePage(editingId, { heroTitle: formTitle, heroSubtitle: formSubtitle });
    showToast("Hero content berhasil diupdate.");
    setEditingId(null);
  };

  return (
    <div className="space-y-5">
      {toast && (
        <div className="bg-noir-black text-noir-white px-4 py-2.5 rounded-md text-[12px] flex items-center gap-2 border-l-3 border-l-noir-red">
          <span className="text-noir-red">✓</span> {toast}
        </div>
      )}

      <p className="text-[11px] text-noir-gray">Edit konten hero setiap halaman website publik.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pages.map((pg) => (
          <div key={pg.id} className="bg-white rounded-lg border border-noir-border p-5 hover:shadow-sm transition-shadow">
            {editingId === pg.id ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] uppercase tracking-[3px] text-noir-red font-medium">{pg.page}</span>
                  <button onClick={() => setEditingId(null)} className="text-noir-gray hover:text-noir-black cursor-pointer"><X size={14} /></button>
                </div>
                <div className="space-y-3 mb-4">
                  <div>
                    <label className="block text-[9px] uppercase tracking-[2px] text-noir-gray font-medium mb-1">Hero Title</label>
                    <input type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} className="w-full px-3 py-2 text-[12px] bg-noir-surface border border-noir-border rounded-md outline-none focus:border-noir-black/30" />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-[2px] text-noir-gray font-medium mb-1">Hero Subtitle</label>
                    <input type="text" value={formSubtitle} onChange={(e) => setFormSubtitle(e.target.value)} className="w-full px-3 py-2 text-[12px] bg-noir-surface border border-noir-border rounded-md outline-none focus:border-noir-black/30" />
                  </div>
                </div>
                <button onClick={handleSave} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] uppercase tracking-[1px] font-medium bg-noir-red text-white rounded hover:bg-noir-red-dark cursor-pointer">
                  <Save size={12} /> Simpan
                </button>
              </>
            ) : (
              <>
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[9px] uppercase tracking-[3px] text-noir-red font-medium">{pg.page}</span>
                  <span className="text-[10px] text-noir-gray">{pg.updatedAt}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-noir-black leading-tight mb-1">{pg.heroTitle}</h3>
                <p className="text-[12px] text-noir-gray italic mb-5">{pg.heroSubtitle}</p>
                <button onClick={() => openEdit(pg)} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] uppercase tracking-[1px] font-medium bg-noir-black text-noir-white rounded hover:bg-noir-black/90 cursor-pointer">
                  <Edit2 size={12} /> Edit Hero
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
