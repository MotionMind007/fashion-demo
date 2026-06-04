export default function AdminSettings() {
  return (
    <div className="space-y-5">
      <p className="text-[11px] text-noir-gray">Pengaturan umum website NOIR.</p>

      <div className="bg-white rounded-lg border border-noir-border overflow-hidden">
        <div className="px-5 py-3.5 border-b border-noir-border">
          <h2 className="text-[12px] font-medium text-noir-black tracking-wide">
            Brand Identity
          </h2>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-[9px] uppercase tracking-[2px] text-noir-gray font-medium mb-1.5">
              Brand Name
            </label>
            <input
              type="text"
              defaultValue="NOIR"
              className="w-full max-w-sm px-3 py-2.5 text-[12px] bg-noir-surface border border-noir-border rounded-md outline-none focus:border-noir-black/30 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[9px] uppercase tracking-[2px] text-noir-gray font-medium mb-1.5">
              Tagline
            </label>
            <input
              type="text"
              defaultValue="Wear the Silence."
              className="w-full max-w-sm px-3 py-2.5 text-[12px] bg-noir-surface border border-noir-border rounded-md outline-none focus:border-noir-black/30 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[9px] uppercase tracking-[2px] text-noir-gray font-medium mb-1.5">
              Email Kontak
            </label>
            <input
              type="email"
              defaultValue="hello@noir-studio.id"
              className="w-full max-w-sm px-3 py-2.5 text-[12px] bg-noir-surface border border-noir-border rounded-md outline-none focus:border-noir-black/30 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[9px] uppercase tracking-[2px] text-noir-gray font-medium mb-1.5">
              Alamat Studio
            </label>
            <textarea
              defaultValue={"Jl. Kemang Raya No. 12\nJakarta Selatan, 12730"}
              rows={2}
              className="w-full max-w-sm px-3 py-2.5 text-[12px] bg-noir-surface border border-noir-border rounded-md outline-none resize-y focus:border-noir-black/30 transition-colors"
            />
          </div>
        </div>
        <div className="px-5 py-3.5 border-t border-noir-border flex justify-end">
          <button className="px-4 py-2 text-[10px] uppercase tracking-[1px] font-medium bg-noir-black text-noir-white rounded hover:bg-noir-black/90 transition-colors cursor-pointer">
            Simpan Perubahan
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-noir-border overflow-hidden">
        <div className="px-5 py-3.5 border-b border-noir-border">
          <h2 className="text-[12px] font-medium text-noir-black tracking-wide">
            Jam Operasional
          </h2>
        </div>
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-noir-black w-24">Senin – Sabtu</span>
            <input
              type="text"
              defaultValue="10:00 – 19:00 WIB"
              className="px-3 py-2 text-[12px] bg-noir-surface border border-noir-border rounded-md outline-none focus:border-noir-black/30 transition-colors"
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-noir-black w-24">Minggu</span>
            <input
              type="text"
              defaultValue="Tutup"
              className="px-3 py-2 text-[12px] bg-noir-surface border border-noir-border rounded-md outline-none focus:border-noir-black/30 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
