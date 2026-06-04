"use client";

import { useState } from "react";
import { Edit2, Trash2, Plus, GripVertical, X } from "lucide-react";
import { useAdminStore, Service } from "@/store/admin";

type FormData = { name: string; tagline: string; description: string; price: string; status: Service["status"] };
const emptyForm: FormData = { name: "", tagline: "", description: "", price: "", status: "Published" };

export default function AdminServices() {
  const { services, addService, updateService, deleteService } = useAdminStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const openAdd = () => { setEditingId(null); setFormData(emptyForm); setShowForm(true); };
  const openEdit = (svc: Service) => {
    setEditingId(svc.id);
    setFormData({ name: svc.name, tagline: svc.tagline, description: svc.description, price: svc.price, status: svc.status });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!formData.name) { showToast("Nama service wajib diisi!"); return; }
    if (editingId) {
      updateService(editingId, formData);
      showToast(`"${formData.name}" berhasil diupdate.`);
    } else {
      addService({ ...formData, order: services.length + 1, image: "" });
      showToast(`"${formData.name}" berhasil ditambahkan.`);
    }
    setShowForm(false); setEditingId(null); setFormData(emptyForm);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteService(deleteTarget.id);
    showToast(`"${deleteTarget.name}" berhasil dihapus.`);
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-5">
      {toast && (
        <div className="bg-noir-black text-noir-white px-4 py-2.5 rounded-md text-[12px] flex items-center gap-2 border-l-3 border-l-noir-red">
          <span className="text-noir-red">✓</span> {toast}
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-[11px] text-noir-gray">{services.length} layanan terdaftar</p>
        <button onClick={openAdd} className="inline-flex items-center gap-1.5 px-4 py-2 text-[11px] uppercase tracking-[1px] font-medium bg-noir-black text-noir-white rounded-md hover:bg-noir-black/90 transition-colors cursor-pointer">
          <Plus size={13} /> Tambah Service
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg border border-noir-border overflow-hidden">
          <div className="px-5 py-3.5 border-b border-noir-border flex items-center justify-between">
            <h3 className="text-[12px] font-medium text-noir-black">{editingId ? "Edit Service" : "Service Baru"}</h3>
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="text-noir-gray hover:text-noir-black cursor-pointer"><X size={16} /></button>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-[9px] uppercase tracking-[2px] text-noir-gray font-medium mb-1.5">Nama Service *</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="cth: Bespoke Tailoring" className="w-full px-3 py-2.5 text-[12px] bg-noir-surface border border-noir-border rounded-md outline-none focus:border-noir-black/30" />
            </div>
            <div>
              <label className="block text-[9px] uppercase tracking-[2px] text-noir-gray font-medium mb-1.5">Tagline</label>
              <input type="text" value={formData.tagline} onChange={(e) => setFormData({ ...formData, tagline: e.target.value })} placeholder="cth: Handmade — 4–6 Weeks" className="w-full px-3 py-2.5 text-[12px] bg-noir-surface border border-noir-border rounded-md outline-none focus:border-noir-black/30" />
            </div>
            <div>
              <label className="block text-[9px] uppercase tracking-[2px] text-noir-gray font-medium mb-1.5">Deskripsi</label>
              <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} className="w-full px-3 py-2.5 text-[12px] bg-noir-surface border border-noir-border rounded-md outline-none resize-y focus:border-noir-black/30" />
            </div>
            <div>
              <label className="block text-[9px] uppercase tracking-[2px] text-noir-gray font-medium mb-1.5">Harga</label>
              <input type="text" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="cth: Mulai dari Rp 3.500.000" className="w-full px-3 py-2.5 text-[12px] bg-noir-surface border border-noir-border rounded-md outline-none focus:border-noir-black/30" />
            </div>
          </div>
          <div className="px-5 py-3.5 border-t border-noir-border flex justify-end gap-2">
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="px-4 py-2 text-[10px] uppercase tracking-[1px] font-medium border border-noir-border rounded text-noir-gray hover:bg-noir-surface cursor-pointer">Batal</button>
            <button onClick={handleSave} className="px-4 py-2 text-[10px] uppercase tracking-[1px] font-medium bg-noir-red text-white rounded hover:bg-noir-red-dark cursor-pointer">Simpan</button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {services.map((svc) => (
          <div key={svc.id} className="bg-white rounded-lg border border-noir-border p-5 flex gap-4 items-start hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-3 shrink-0 pt-1">
              <GripVertical size={14} className="text-noir-gray/40 cursor-grab" />
              <span className="font-serif text-3xl font-black text-noir-cream">{String(svc.order).padStart(2, "0")}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="block text-[9px] uppercase tracking-[3px] text-noir-red font-medium mb-1">{svc.tagline}</span>
                  <h3 className="font-serif text-xl font-bold text-noir-black mb-1">{svc.name}</h3>
                  <p className="text-[11px] text-noir-gray line-clamp-2">{svc.description}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-medium text-noir-black">{svc.price}</span>
                  <button onClick={() => openEdit(svc)} className="w-7 h-7 rounded border border-noir-border flex items-center justify-center text-noir-gray hover:bg-noir-cream hover:text-noir-black transition-colors cursor-pointer"><Edit2 size={13} /></button>
                  <button onClick={() => setDeleteTarget(svc)} className="w-7 h-7 rounded border border-noir-border flex items-center justify-center text-noir-gray hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors cursor-pointer"><Trash2 size={13} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-noir-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg border border-noir-border w-full max-w-sm shadow-xl">
            <div className="px-5 py-4 border-b border-noir-border"><h3 className="text-[13px] font-medium text-noir-black">Hapus Service</h3></div>
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
