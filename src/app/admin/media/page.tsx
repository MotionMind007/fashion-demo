"use client";

import { useState, useRef } from "react";
import { Upload, Plus, Trash2, Copy, Check } from "lucide-react";

interface MediaFile {
  id: string;
  name: string;
  src: string;
  size: string;
}

const initialMedia: MediaFile[] = [
  { id: "m1", name: "onyx-coat-01.jpg", src: "", size: "2.4 MB" },
  { id: "m2", name: "wool-blazer-hero.jpg", src: "", size: "1.8 MB" },
  { id: "m3", name: "silk-shirt-front.jpg", src: "", size: "1.5 MB" },
  { id: "m4", name: "linen-trousers.jpg", src: "", size: "1.2 MB" },
  { id: "m5", name: "shadow-trench.jpg", src: "", size: "3.1 MB" },
  { id: "m6", name: "hero-ss2026.jpg", src: "", size: "4.2 MB" },
  { id: "m7", name: "editorial-01.jpg", src: "", size: "2.8 MB" },
  { id: "m8", name: "studio-bg.jpg", src: "", size: "1.9 MB" },
];

const bgColors = ["bg-zinc-800", "bg-stone-300", "bg-stone-400", "bg-stone-200", "bg-zinc-700", "bg-stone-300", "bg-stone-400", "bg-stone-200"];

export default function AdminMedia() {
  const [media, setMedia] = useState<MediaFile[]>(initialMedia);
  const [selected, setSelected] = useState<string[]>([]);
  const [toast, setToast] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<MediaFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles: MediaFile[] = Array.from(files).map((file) => ({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
      name: file.name,
      src: URL.createObjectURL(file),
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
    }));

    setMedia((prev) => [...newFiles, ...prev]);
    showToast(`${files.length} file berhasil diupload.`);
    e.target.value = "";
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setMedia((prev) => prev.filter((m) => m.id !== deleteTarget.id));
    setSelected((prev) => prev.filter((id) => id !== deleteTarget.id));
    showToast(`"${deleteTarget.name}" berhasil dihapus.`);
    setDeleteTarget(null);
  };

  const deleteSelected = () => {
    setMedia((prev) => prev.filter((m) => !selected.includes(m.id)));
    showToast(`${selected.length} file berhasil dihapus.`);
    setSelected([]);
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const copyName = (name: string) => {
    navigator.clipboard.writeText(name);
    showToast(`"${name}" copied!`);
  };

  return (
    <div className="space-y-5">
      {toast && (
        <div className="bg-noir-black text-noir-white px-4 py-2.5 rounded-md text-[12px] flex items-center gap-2 border-l-3 border-l-noir-red">
          <span className="text-noir-red">✓</span> {toast}
        </div>
      )}

      {/* Upload Zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="bg-white rounded-lg border border-dashed border-noir-border p-8 text-center hover:border-noir-red/40 transition-colors cursor-pointer"
      >
        <Upload size={28} className="mx-auto text-noir-gray/40 mb-3" />
        <p className="text-[12px] text-noir-gray font-medium">Drag &amp; drop files atau klik untuk upload</p>
        <p className="text-[10px] text-noir-gray/60 mt-1">PNG, JPG, WEBP — Maks 10MB per file</p>
      </div>
      <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />

      {/* Actions bar */}
      {selected.length > 0 && (
        <div className="flex items-center gap-3 px-4 py-2.5 bg-noir-surface rounded-md border border-noir-border">
          <span className="text-[11px] text-noir-black font-medium">{selected.length} file dipilih</span>
          <button onClick={deleteSelected} className="inline-flex items-center gap-1 px-3 py-1.5 text-[10px] text-red-700 border border-red-200 rounded hover:bg-red-50 transition-colors cursor-pointer">
            <Trash2 size={11} /> Hapus Semua
          </button>
          <button onClick={() => setSelected([])} className="text-[10px] text-noir-gray hover:text-noir-black transition-colors cursor-pointer">Batal</button>
        </div>
      )}

      {/* Media Grid */}
      <div className="bg-white rounded-lg border border-noir-border overflow-hidden">
        <div className="px-5 py-3.5 border-b border-noir-border flex items-center justify-between">
          <h2 className="text-[12px] font-medium text-noir-black tracking-wide">Semua Media <span className="text-noir-gray font-normal">({media.length} file)</span></h2>
        </div>
        <div className="p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
          {media.map((file, i) => (
            <div key={file.id} className="group relative">
              <div
                onClick={() => toggleSelect(file.id)}
                className={`aspect-square rounded-md overflow-hidden border cursor-pointer transition-all ${
                  selected.includes(file.id) ? "border-noir-red ring-2 ring-noir-red/20" : "border-noir-border hover:border-noir-gray/50"
                }`}
              >
                {file.src ? (
                  <img src={file.src} alt={file.name} className="w-full h-full object-cover" />
                ) : (
                  <div className={`w-full h-full ${bgColors[i % bgColors.length]}`} />
                )}

                {/* Selection indicator */}
                {selected.includes(file.id) && (
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-noir-red rounded-full flex items-center justify-center">
                    <Check size={10} className="text-white" />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between mt-1.5">
                <p className="text-[9px] text-noir-gray truncate flex-1">{file.name}</p>
                <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => copyName(file.name)} className="p-0.5 text-noir-gray hover:text-noir-black cursor-pointer" title="Copy name"><Copy size={9} /></button>
                  <button onClick={() => setDeleteTarget(file)} className="p-0.5 text-noir-gray hover:text-red-600 cursor-pointer" title="Delete"><Trash2 size={9} /></button>
                </div>
              </div>
            </div>
          ))}

          {/* Upload placeholder tile */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square rounded-md border border-dashed border-noir-border flex flex-col items-center justify-center cursor-pointer hover:border-noir-red/40 transition-colors"
          >
            <Plus size={18} className="text-noir-gray/40" />
            <span className="text-[9px] text-noir-gray/50 mt-1">Upload</span>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-noir-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg border border-noir-border w-full max-w-sm shadow-xl">
            <div className="px-5 py-4 border-b border-noir-border"><h3 className="text-[13px] font-medium text-noir-black">Hapus Media</h3></div>
            <div className="p-5"><p className="text-[12px] text-noir-gray">Hapus &ldquo;{deleteTarget.name}&rdquo;?</p></div>
            <div className="px-5 py-3.5 border-t border-noir-border flex justify-end gap-2">
              <button onClick={() => setDeleteTarget(null)} className="px-4 py-2 text-[10px] uppercase tracking-[1px] font-medium border border-noir-border rounded text-noir-gray hover:bg-noir-surface cursor-pointer">Batal</button>
              <button onClick={handleDelete} className="px-4 py-2 text-[10px] uppercase tracking-[1px] font-medium bg-noir-red text-white rounded hover:bg-noir-red-dark cursor-pointer">Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
