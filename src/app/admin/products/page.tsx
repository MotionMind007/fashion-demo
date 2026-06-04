"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Search, X } from "lucide-react";
import { useAdminStore, Product } from "@/store/admin";

type FormData = {
  name: string;
  category: Product["category"];
  price: string;
  description: string;
  status: Product["status"];
};

const emptyForm: FormData = { name: "", category: "Men", price: "", description: "", status: "Draft" };

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct, toggleFeatured } = useAdminStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [toast, setToast] = useState("");

  const filteredProducts = products.filter((p) => {
    if (filterCategory && p.category !== filterCategory) return false;
    if (filterStatus && p.status !== filterStatus) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const openAdd = () => { setEditingId(null); setFormData(emptyForm); setShowForm(true); };

  const openEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData({ name: product.name, category: product.category, price: String(product.price), description: product.description, status: product.status });
    setShowForm(true);
  };

  const handleSave = (status: Product["status"]) => {
    if (!formData.name || !formData.price) { showToast("Nama dan Harga wajib diisi!"); return; }
    const data = { name: formData.name, category: formData.category, price: Number(formData.price), description: formData.description, status, featured: false, image: "" };
    if (editingId) {
      updateProduct(editingId, { ...data, status });
      showToast(`"${formData.name}" berhasil diupdate.`);
    } else {
      addProduct(data);
      showToast(`"${formData.name}" berhasil ditambahkan.`);
    }
    setShowForm(false); setEditingId(null); setFormData(emptyForm);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteProduct(deleteTarget.id);
    showToast(`"${deleteTarget.name}" berhasil dihapus.`);
    setDeleteTarget(null);
  };

  const formatPrice = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

  const catBadge = (cat: string) => {
    switch (cat) { case "Men": return "bg-blue-50 text-blue-800"; case "Women": return "bg-pink-50 text-pink-800"; case "Limited": return "bg-amber-50 text-amber-800"; default: return ""; }
  };

  return (
    <div className="space-y-5">
      {/* Toast */}
      {toast && (
        <div className="bg-noir-black text-noir-white px-4 py-2.5 rounded-md text-[12px] flex items-center gap-2 border-l-3 border-l-noir-red animate-fade-in">
          <span className="text-noir-red">✓</span> {toast}
        </div>
      )}

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3 flex-1 w-full sm:w-auto">
          <div className="relative flex-1 sm:max-w-[260px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-noir-gray" />
            <input type="text" placeholder="Cari produk..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-9 pr-3 py-2 text-[12px] bg-white border border-noir-border rounded-md outline-none focus:border-noir-black/30 transition-colors" />
          </div>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="px-3 py-2 text-[11px] bg-white border border-noir-border rounded-md cursor-pointer outline-none">
            <option value="">Semua Kategori</option><option value="Men">Men</option><option value="Women">Women</option><option value="Limited">Limited</option>
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 text-[11px] bg-white border border-noir-border rounded-md cursor-pointer outline-none">
            <option value="">Semua Status</option><option value="Published">Published</option><option value="Draft">Draft</option>
          </select>
        </div>
        <button onClick={openAdd} className="inline-flex items-center gap-1.5 px-4 py-2 text-[11px] uppercase tracking-[1px] font-medium bg-noir-black text-noir-white rounded-md hover:bg-noir-black/90 transition-colors cursor-pointer">
          <Plus size={13} /> Tambah Produk
        </button>
      </div>

      {/* Form (Add / Edit) */}
      {showForm && (
        <div className="bg-white rounded-lg border border-noir-border overflow-hidden">
          <div className="px-5 py-3.5 border-b border-noir-border flex items-center justify-between">
            <h3 className="text-[12px] font-medium text-noir-black">{editingId ? "Edit Produk" : "Produk Baru"}</h3>
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="text-noir-gray hover:text-noir-black cursor-pointer"><X size={16} /></button>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-[9px] uppercase tracking-[2px] text-noir-gray font-medium mb-1.5">Nama Produk *</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="cth: The Onyx Coat" className="w-full px-3 py-2.5 text-[12px] bg-noir-surface border border-noir-border rounded-md outline-none focus:border-noir-black/30" />
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-[2px] text-noir-gray font-medium mb-1.5">Kategori</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value as Product["category"] })} className="w-full px-3 py-2.5 text-[12px] bg-noir-surface border border-noir-border rounded-md cursor-pointer">
                  <option value="Men">Men</option><option value="Women">Women</option><option value="Limited">Limited</option>
                </select>
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-[2px] text-noir-gray font-medium mb-1.5">Harga (Rp) *</label>
                <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="4800000" className="w-full px-3 py-2.5 text-[12px] bg-noir-surface border border-noir-border rounded-md outline-none focus:border-noir-black/30" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[9px] uppercase tracking-[2px] text-noir-gray font-medium mb-1.5">Deskripsi</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} placeholder="Deskripsi produk..." className="w-full px-3 py-2.5 text-[12px] bg-noir-surface border border-noir-border rounded-md outline-none resize-y focus:border-noir-black/30" />
              </div>
            </div>
          </div>
          <div className="px-5 py-3.5 border-t border-noir-border flex items-center justify-between">
            <span className="text-[10px] text-noir-gray">* Wajib diisi</span>
            <div className="flex gap-2">
              <button onClick={() => { setShowForm(false); setEditingId(null); }} className="px-4 py-2 text-[10px] uppercase tracking-[1px] font-medium border border-noir-border rounded text-noir-gray hover:bg-noir-surface cursor-pointer">Batal</button>
              <button onClick={() => handleSave("Draft")} className="px-4 py-2 text-[10px] uppercase tracking-[1px] font-medium border border-noir-border rounded text-noir-black hover:bg-noir-surface cursor-pointer">Simpan Draft</button>
              <button onClick={() => handleSave("Published")} className="px-4 py-2 text-[10px] uppercase tracking-[1px] font-medium bg-noir-red text-white rounded hover:bg-noir-red-dark cursor-pointer">Publish</button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg border border-noir-border overflow-hidden">
        <div className="px-5 py-3.5 border-b border-noir-border">
          <h2 className="text-[12px] font-medium text-noir-black">Semua Produk <span className="text-noir-gray font-normal">({filteredProducts.length})</span></h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="bg-noir-surface">
                <th className="text-left px-4 py-2.5 text-[9px] uppercase tracking-[2px] text-noir-gray font-medium border-b border-noir-border">Produk</th>
                <th className="text-left px-4 py-2.5 text-[9px] uppercase tracking-[2px] text-noir-gray font-medium border-b border-noir-border">Kategori</th>
                <th className="text-left px-4 py-2.5 text-[9px] uppercase tracking-[2px] text-noir-gray font-medium border-b border-noir-border">Harga</th>
                <th className="text-left px-4 py-2.5 text-[9px] uppercase tracking-[2px] text-noir-gray font-medium border-b border-noir-border">Status</th>
                <th className="text-left px-4 py-2.5 text-[9px] uppercase tracking-[2px] text-noir-gray font-medium border-b border-noir-border">Featured</th>
                <th className="text-left px-4 py-2.5 text-[9px] uppercase tracking-[2px] text-noir-gray font-medium border-b border-noir-border w-20">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr key={p.id} className="border-b border-noir-border/40 last:border-b-0 hover:bg-noir-surface/50 transition-colors">
                  <td className="px-4 py-3"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded bg-noir-cream shrink-0" /><span className="font-medium text-noir-black">{p.name}</span></div></td>
                  <td className="px-4 py-3"><span className={`inline-flex px-2 py-0.5 rounded text-[9px] uppercase tracking-[1.5px] font-medium ${catBadge(p.category)}`}>{p.category}</span></td>
                  <td className="px-4 py-3 text-noir-black">{formatPrice(p.price)}</td>
                  <td className="px-4 py-3"><span className={`inline-flex px-2 py-0.5 rounded text-[9px] uppercase tracking-[1.5px] font-medium ${p.status === "Published" ? "bg-green-50 text-green-800" : "bg-noir-surface text-noir-gray"}`}>{p.status}</span></td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleFeatured(p.id)} className={`w-8 h-[18px] rounded-full relative cursor-pointer transition-colors duration-200 ${p.featured ? "bg-noir-black" : "bg-noir-border"}`} aria-label="Toggle featured">
                      <div className={`absolute top-[3px] w-3 h-3 rounded-full bg-white transition-all duration-200 ${p.featured ? "left-[17px]" : "left-[3px]"}`} />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button onClick={() => openEdit(p)} className="w-7 h-7 rounded border border-noir-border flex items-center justify-center text-noir-gray hover:bg-noir-cream hover:text-noir-black transition-colors cursor-pointer"><Edit2 size={13} /></button>
                      <button onClick={() => setDeleteTarget(p)} className="w-7 h-7 rounded border border-noir-border flex items-center justify-center text-noir-gray hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors cursor-pointer"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-[12px] text-noir-gray">Tidak ada produk ditemukan.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-noir-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg border border-noir-border w-full max-w-sm shadow-xl">
            <div className="px-5 py-4 border-b border-noir-border flex items-center justify-between">
              <h3 className="text-[13px] font-medium text-noir-black">Konfirmasi Hapus</h3>
              <button onClick={() => setDeleteTarget(null)} className="text-noir-gray hover:text-noir-black cursor-pointer text-lg">×</button>
            </div>
            <div className="p-5">
              <p className="text-[12px] text-noir-gray">Apakah kamu yakin ingin menghapus produk ini?</p>
              <p className="text-[14px] font-medium text-noir-black mt-2">{deleteTarget.name}</p>
            </div>
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
