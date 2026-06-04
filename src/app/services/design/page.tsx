"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Navbar from "@/components/Navbar";
import {
  RotateCcw,
  Upload,
  Move,
  ZoomIn,
  ZoomOut,
  FlipHorizontal,
  Trash2,
  Download,
} from "lucide-react";

/* ═══════════════════════════════════════════════════
   Garment Types & Mockup Images
   ═══════════════════════════════════════════════════ */
type GarmentType = "tshirt" | "jacket" | "hoodie" | "sweater";
type Side = "front" | "back";

interface DesignImage {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  side: Side;
}

const garmentOptions: {
  id: GarmentType;
  label: string;
  mockup: Record<Side, string>;
}[] = [
  {
    id: "tshirt",
    label: "Kaos",
    mockup: {
      front: "/images/mockups/tshirt-front.png",
      back: "/images/mockups/tshirt-back.png",
    },
  },
  {
    id: "jacket",
    label: "Jaket",
    mockup: {
      front: "/images/mockups/jacket-front.png",
      back: "/images/mockups/jacket-back.png",
    },
  },
  {
    id: "hoodie",
    label: "Hoodie",
    mockup: {
      front: "/images/mockups/hoodie-front.png",
      back: "/images/mockups/hoodie-back.png",
    },
  },
  {
    id: "sweater",
    label: "Sweater",
    mockup: {
      front: "/images/mockups/sweater-front.png",
      back: "/images/mockups/sweater-back.png",
    },
  },
];

const colors = [
  { name: "Original Gray", hex: "none" },
  { name: "Onyx Black", hex: "#0A0A0A" },
  { name: "Deep Navy", hex: "#1E3A5F" },
  { name: "Crimson Red", hex: "#8B1A1A" },
  { name: "Forest Green", hex: "#1A3A2A" },
  { name: "Royal Purple", hex: "#3D1F5C" },
  { name: "Warm Sand", hex: "#C4A882" },
  { name: "Sky Blue", hex: "#3B82F6" },
];

/* ═══════════════════════════════════════════════════
   Design areas — approximate printable zones
   per garment (% from top-left of container)
   ═══════════════════════════════════════════════════ */
const printZones: Record<GarmentType, Record<Side, { top: number; left: number; width: number; height: number }>> = {
  tshirt: {
    front: { top: 25, left: 28, width: 44, height: 40 },
    back: { top: 22, left: 28, width: 44, height: 42 },
  },
  jacket: {
    front: { top: 22, left: 26, width: 48, height: 45 },
    back: { top: 20, left: 24, width: 52, height: 48 },
  },
  hoodie: {
    front: { top: 30, left: 26, width: 48, height: 38 },
    back: { top: 25, left: 24, width: 52, height: 42 },
  },
  sweater: {
    front: { top: 25, left: 26, width: 48, height: 42 },
    back: { top: 22, left: 24, width: 52, height: 44 },
  },
};

export default function DesignPage() {
  const [garment, setGarment] = useState<GarmentType>("tshirt");
  const [color, setColor] = useState("none");
  const [side, setSide] = useState<Side>("front");
  const [designs, setDesigns] = useState<DesignImage[]>([]);
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const canvasAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentGarment = garmentOptions.find((g) => g.id === garment)!;
  const currentDesigns = designs.filter((d) => d.side === side);
  const zone = printZones[garment][side];

  // Handle file upload
  const handleUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (ev) => {
        const src = ev.target?.result as string;
        const newDesign: DesignImage = {
          id: Date.now().toString(),
          src,
          x: 20,
          y: 20,
          width: 120,
          height: 120,
          side,
        };
        setDesigns((prev) => [...prev, newDesign]);
        setSelectedDesign(newDesign.id);
      };
      reader.readAsDataURL(file);
      e.target.value = "";
    },
    [side]
  );

  // Drag start
  const handleMouseDown = useCallback(
    (e: React.MouseEvent, designId: string) => {
      e.preventDefault();
      e.stopPropagation();
      setSelectedDesign(designId);
      setIsDragging(true);

      const design = designs.find((d) => d.id === designId);
      const printArea = document.getElementById("print-area");
      if (!design || !printArea) return;

      const rect = printArea.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left - design.x,
        y: e.clientY - rect.top - design.y,
      });
    },
    [designs]
  );

  // Touch support
  const handleTouchStart = useCallback(
    (e: React.TouchEvent, designId: string) => {
      e.stopPropagation();
      setSelectedDesign(designId);
      setIsDragging(true);

      const touch = e.touches[0];
      const design = designs.find((d) => d.id === designId);
      const printArea = document.getElementById("print-area");
      if (!design || !printArea) return;

      const rect = printArea.getBoundingClientRect();
      setDragOffset({
        x: touch.clientX - rect.left - design.x,
        y: touch.clientY - rect.top - design.y,
      });
    },
    [designs]
  );

  // Drag move
  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const printArea = document.getElementById("print-area");
      if (!printArea || !selectedDesign) return;

      const rect = printArea.getBoundingClientRect();
      let clientX: number, clientY: number;

      if ("touches" in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const x = clientX - rect.left - dragOffset.x;
      const y = clientY - rect.top - dragOffset.y;

      setDesigns((prev) =>
        prev.map((d) =>
          d.id === selectedDesign
            ? { ...d, x: Math.max(-20, Math.min(rect.width - 30, x)), y: Math.max(-20, Math.min(rect.height - 30, y)) }
            : d
        )
      );
    };

    const handleUp = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleUp);
    };
  }, [isDragging, selectedDesign, dragOffset]);

  // Resize design
  const resizeDesign = useCallback(
    (direction: "up" | "down") => {
      if (!selectedDesign) return;
      const scale = direction === "up" ? 1.2 : 0.8;
      setDesigns((prev) =>
        prev.map((d) =>
          d.id === selectedDesign
            ? { ...d, width: Math.max(40, d.width * scale), height: Math.max(40, d.height * scale) }
            : d
        )
      );
    },
    [selectedDesign]
  );

  // Delete selected
  const deleteSelected = useCallback(() => {
    if (!selectedDesign) return;
    setDesigns((prev) => prev.filter((d) => d.id !== selectedDesign));
    setSelectedDesign(null);
  }, [selectedDesign]);

  // Reset all
  const resetAll = useCallback(() => {
    setDesigns([]);
    setSelectedDesign(null);
    setColor("none");
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-20 bg-noir-bg min-h-screen">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-12">
          {/* Header */}
          <div className="mb-8">
            <span className="block text-[10px] uppercase tracking-[4px] text-noir-red font-medium mb-2">
              Service 04 — Interactive
            </span>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-black text-noir-black tracking-tight">
              Make Your Own Design
            </h1>
            <p className="text-[13px] text-noir-gray mt-2 max-w-lg">
              Pilih pakaian, warna, upload desain kamu, atur posisi depan &amp; belakang — dan kami akan mewujudkannya.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* ═══ LEFT PANEL — Controls ═══ */}
            <div className="lg:col-span-4 xl:col-span-3 space-y-4">
              {/* Garment Type */}
              <div className="bg-white rounded-lg border border-noir-border p-4">
                <h3 className="text-[9px] uppercase tracking-[2px] text-noir-gray font-medium mb-3">
                  Jenis Pakaian
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {garmentOptions.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setGarment(g.id)}
                      className={`py-2.5 px-3 text-[11px] font-medium rounded-md border transition-all duration-200 cursor-pointer ${
                        garment === g.id
                          ? "bg-noir-black text-noir-white border-noir-black"
                          : "bg-white text-noir-black border-noir-border hover:bg-noir-surface"
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Tint */}
              <div className="bg-white rounded-lg border border-noir-border p-4">
                <h3 className="text-[9px] uppercase tracking-[2px] text-noir-gray font-medium mb-3">
                  Warna Pakaian
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {colors.map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => setColor(c.hex)}
                      className={`aspect-square rounded-md border-2 transition-all duration-200 cursor-pointer relative overflow-hidden ${
                        color === c.hex
                          ? "border-noir-red scale-110 shadow-md"
                          : "border-noir-border hover:border-noir-gray"
                      }`}
                      style={{ backgroundColor: c.hex === "none" ? "#C8C4BC" : c.hex }}
                      aria-label={c.name}
                      title={c.name}
                    >
                      {c.hex === "none" && (
                        <span className="absolute inset-0 flex items-center justify-center text-[8px] text-noir-gray font-medium">
                          ORI
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-noir-gray mt-2">
                  {colors.find((c) => c.hex === color)?.name}
                </p>
              </div>

              {/* Side Toggle */}
              <div className="bg-white rounded-lg border border-noir-border p-4">
                <h3 className="text-[9px] uppercase tracking-[2px] text-noir-gray font-medium mb-3">
                  Tampilan
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSide("front")}
                    className={`py-2.5 text-[11px] font-medium rounded-md border transition-all duration-200 cursor-pointer ${
                      side === "front"
                        ? "bg-noir-black text-noir-white border-noir-black"
                        : "bg-white text-noir-black border-noir-border hover:bg-noir-surface"
                    }`}
                  >
                    Depan
                  </button>
                  <button
                    onClick={() => setSide("back")}
                    className={`py-2.5 text-[11px] font-medium rounded-md border transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                      side === "back"
                        ? "bg-noir-black text-noir-white border-noir-black"
                        : "bg-white text-noir-black border-noir-border hover:bg-noir-surface"
                    }`}
                  >
                    <FlipHorizontal size={12} />
                    Belakang
                  </button>
                </div>
              </div>

              {/* Upload */}
              <div className="bg-white rounded-lg border border-noir-border p-4">
                <h3 className="text-[9px] uppercase tracking-[2px] text-noir-gray font-medium mb-3">
                  Upload Desain
                </h3>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-4 border border-dashed border-noir-border rounded-md flex flex-col items-center gap-2 hover:border-noir-red/50 hover:bg-noir-surface/50 transition-all duration-200 cursor-pointer"
                >
                  <Upload size={20} className="text-noir-gray" />
                  <span className="text-[11px] text-noir-gray">
                    Upload desain format <strong>.PNG</strong> (transparant)
                  </span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".png,image/png"
                  className="hidden"
                  onChange={handleUpload}
                />
                <p className="text-[9px] text-noir-gray/60 mt-2">
                  Hanya file PNG agar background transparan. Ditempel di sisi {side === "front" ? "DEPAN" : "BELAKANG"}.
                </p>
              </div>

              {/* Design Tools */}
              {selectedDesign && (
                <div className="bg-white rounded-lg border border-noir-border p-4">
                  <h3 className="text-[9px] uppercase tracking-[2px] text-noir-gray font-medium mb-3">
                    Edit Desain
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => resizeDesign("up")}
                      className="flex items-center gap-1.5 px-3 py-2 text-[10px] border border-noir-border rounded-md hover:bg-noir-surface transition-colors cursor-pointer"
                    >
                      <ZoomIn size={13} /> Besar
                    </button>
                    <button
                      onClick={() => resizeDesign("down")}
                      className="flex items-center gap-1.5 px-3 py-2 text-[10px] border border-noir-border rounded-md hover:bg-noir-surface transition-colors cursor-pointer"
                    >
                      <ZoomOut size={13} /> Kecil
                    </button>
                    <button
                      onClick={deleteSelected}
                      className="flex items-center gap-1.5 px-3 py-2 text-[10px] border border-red-200 text-red-700 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <Trash2 size={13} /> Hapus
                    </button>
                  </div>
                  <p className="text-[9px] text-noir-gray/60 mt-2 flex items-center gap-1">
                    <Move size={10} /> Drag gambar untuk atur posisi
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={resetAll}
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 text-[10px] uppercase tracking-[1px] font-medium border border-noir-border rounded-md text-noir-gray hover:bg-noir-surface transition-colors cursor-pointer"
                >
                  <RotateCcw size={12} /> Reset
                </button>
                <button
                  onClick={() => {
                    const canvas = canvasAreaRef.current;
                    if (!canvas) return;
                    import("html2canvas").then((mod) => {
                      mod.default(canvas, { backgroundColor: "#ffffff", useCORS: true }).then((c) => {
                        const link = document.createElement("a");
                        link.download = `noir-design-${garment}-${side}.png`;
                        link.href = c.toDataURL("image/png");
                        link.click();
                      });
                    }).catch(() => {
                      alert("Download gagal. Coba screenshot manual.");
                    });
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 text-[10px] uppercase tracking-[1px] font-medium bg-noir-red text-white rounded-md hover:bg-noir-red-dark transition-colors cursor-pointer"
                >
                  <Download size={12} /> Download
                </button>
              </div>
            </div>

            {/* ═══ RIGHT PANEL — Mockup Preview ═══ */}
            <div className="lg:col-span-8 xl:col-span-9">
              <div className="bg-white rounded-lg border border-noir-border p-6 md:p-8 sticky top-24">
                {/* Side indicator */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase tracking-[2px] text-noir-gray font-medium">
                    {side === "front" ? "Tampak Depan" : "Tampak Belakang"} — {currentGarment.label}
                  </span>
                  <span className="text-[10px] text-noir-gray/60">
                    {currentDesigns.length} desain ditempel
                  </span>
                </div>

                {/* Mockup Canvas */}
                <div
                  ref={canvasAreaRef}
                  className="relative mx-auto rounded-md overflow-hidden select-none bg-white border border-noir-border"
                  style={{ width: "100%", maxWidth: 480, aspectRatio: "1/1" }}
                  onClick={() => setSelectedDesign(null)}
                >
                  {/* Mockup container — isolates blend mode from white bg */}
                  <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 1, isolation: "isolate" }}>
                    {/* Mockup Image */}
                    <img
                      src={currentGarment.mockup[side]}
                      alt={`${currentGarment.label} mockup — ${side}`}
                      className="absolute inset-0 w-full h-full object-contain"
                      draggable={false}
                    />

                    {/* Color tint — only blends with the mockup image, not the bg */}
                    {color !== "none" && (
                      <div
                        className="absolute inset-0 mix-blend-multiply pointer-events-none"
                        style={{ backgroundColor: color }}
                      />
                    )}
                  </div>

                  {/* Printable area indicator (dashed border) */}
                  <div
                    id="print-area"
                    className="absolute border border-dashed border-noir-gray/30 rounded-sm"
                    style={{
                      top: `${zone.top}%`,
                      left: `${zone.left}%`,
                      width: `${zone.width}%`,
                      height: `${zone.height}%`,
                      zIndex: 10,
                    }}
                  >
                    {/* User uploaded designs */}
                    {currentDesigns.map((design) => (
                      <div
                        key={design.id}
                        className={`absolute cursor-grab active:cursor-grabbing touch-none ${
                          selectedDesign === design.id
                            ? "ring-2 ring-noir-red ring-offset-1 ring-offset-transparent"
                            : "hover:ring-1 hover:ring-noir-gray/40"
                        }`}
                        style={{
                          left: design.x,
                          top: design.y,
                          width: design.width,
                          height: design.height,
                          zIndex: selectedDesign === design.id ? 25 : 15,
                        }}
                        onMouseDown={(e) => handleMouseDown(e, design.id)}
                        onTouchStart={(e) => handleTouchStart(e, design.id)}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDesign(design.id);
                        }}
                      >
                        <img
                          src={design.src}
                          alt="Custom design"
                          className="w-full h-full object-contain pointer-events-none"
                          draggable={false}
                        />
                        {/* Resize handles — visible when selected */}
                        {selectedDesign === design.id && (
                          <>
                            <button
                              onMouseDown={(e) => {
                                e.stopPropagation();
                                resizeDesign("up");
                              }}
                              className="absolute -top-2 -right-2 w-5 h-5 bg-noir-red rounded-full flex items-center justify-center text-white text-[10px] cursor-pointer shadow-md hover:scale-110 transition-transform z-30"
                              aria-label="Perbesar"
                              title="Perbesar"
                            >
                              +
                            </button>
                            <button
                              onMouseDown={(e) => {
                                e.stopPropagation();
                                resizeDesign("down");
                              }}
                              className="absolute -bottom-2 -right-2 w-5 h-5 bg-noir-black rounded-full flex items-center justify-center text-white text-[10px] cursor-pointer shadow-md hover:scale-110 transition-transform z-30"
                              aria-label="Perkecil"
                              title="Perkecil"
                            >
                              −
                            </button>
                          </>
                        )}
                      </div>
                    ))}

                    {/* Empty state hint */}
                    {currentDesigns.length === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center opacity-60">
                          <Upload size={20} className="mx-auto text-noir-gray/40 mb-1" />
                          <p className="text-[10px] text-noir-gray/50">
                            Area cetak
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tips */}
                <div className="mt-4 flex flex-wrap gap-4 text-[10px] text-noir-gray/60">
                  <span className="flex items-center gap-1">
                    <Move size={10} /> Drag untuk atur posisi
                  </span>
                  <span className="flex items-center gap-1">
                    <ZoomIn size={10} /> Resize dari panel kiri
                  </span>
                  <span className="flex items-center gap-1">
                    <FlipHorizontal size={10} /> Toggle depan/belakang
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
