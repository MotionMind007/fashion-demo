import { Upload, Plus } from "lucide-react";

const mediaFiles = [
  { name: "onyx-coat-01.jpg", type: "dark" },
  { name: "wool-blazer-hero.jpg", type: "light" },
  { name: "silk-shirt-front.jpg", type: "mid" },
  { name: "linen-trousers.jpg", type: "cream" },
  { name: "shadow-trench.jpg", type: "dark" },
  { name: "hero-ss2026.jpg", type: "light" },
  { name: "editorial-01.jpg", type: "mid" },
  { name: "studio-bg.jpg", type: "cream" },
  { name: "onyx-coat-02.jpg", type: "dark" },
];

const bgClasses: Record<string, string> = {
  dark: "bg-zinc-800",
  light: "bg-stone-300",
  mid: "bg-stone-400",
  cream: "bg-stone-200",
};

export default function AdminMedia() {
  return (
    <div className="space-y-5">
      {/* Upload zone */}
      <div className="bg-white rounded-lg border border-dashed border-noir-border p-8 text-center hover:border-noir-gray/50 transition-colors cursor-pointer">
        <Upload size={28} className="mx-auto text-noir-gray/40 mb-3" />
        <p className="text-[12px] text-noir-gray font-medium">
          Drag & drop files atau klik untuk upload
        </p>
        <p className="text-[10px] text-noir-gray/60 mt-1">
          PNG, JPG, WEBP — Maks 10MB per file
        </p>
      </div>

      {/* Media Grid */}
      <div className="bg-white rounded-lg border border-noir-border overflow-hidden">
        <div className="px-5 py-3.5 border-b border-noir-border flex items-center justify-between">
          <h2 className="text-[12px] font-medium text-noir-black tracking-wide">
            Semua Media{" "}
            <span className="text-noir-gray font-normal">(24 file)</span>
          </h2>
          <span className="text-[10px] text-noir-gray">
            Kapasitas: 4.2GB / 25GB
          </span>
        </div>
        <div className="p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {mediaFiles.map((file) => (
            <div key={file.name} className="group cursor-pointer">
              <div
                className={`aspect-square rounded-md overflow-hidden border border-noir-border group-hover:border-noir-black/30 transition-colors ${
                  bgClasses[file.type]
                }`}
              />
              <p className="text-[9px] text-noir-gray mt-1.5 truncate">
                {file.name}
              </p>
            </div>
          ))}
          {/* Upload placeholder */}
          <div className="aspect-square rounded-md border border-dashed border-noir-border flex flex-col items-center justify-center cursor-pointer hover:border-noir-gray/50 transition-colors">
            <Plus size={18} className="text-noir-gray/40" />
            <span className="text-[9px] text-noir-gray/50 mt-1">Upload</span>
          </div>
        </div>
      </div>
    </div>
  );
}
