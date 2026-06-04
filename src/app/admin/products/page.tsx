"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Search, Filter } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: "Men" | "Women" | "Limited";
  price: string;
  status: "Published" | "Draft";
  featured: boolean;
}

const initialProducts: Product[] = [
  { id: "1", name: "The Onyx Coat", category: "Men", price: "Rp 4.800.000", status: "Published", featured: true },
  { id: "2", name: "Wool Blazer", category: "Men", price: "Rp 3.200.000", status: "Published", featured: false },
  { id: "3", name: "Silk Shirt No. 7", category: "Women", price: "Rp 2.100.000", status: "Published", featured: false },
  { id: "4", name: "Linen Trousers", category: "Women", price: "Rp 1.650.000", status: "Draft", featured: false },
  { id: "5", name: "Shadow Trench", category: "Limited", price: "Rp 7.500.000", status: "Published", featured: true },
  { id: "6", name: "Grey Turtleneck", category: "Men", price: "Rp 1.200.000", status: "Draft", featured: false },
];

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const filteredProducts = products.filter((p) => {
    if (filterCategory && p.category !== filterCategory) return false;
    if (filterStatus && p.status !== filterStatus) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()))
      return false;
    return true;
  });

  const toggleFeatured = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleteTarget(null);
  };

  const categoryBadgeClass = (cat: string) => {
    switch (cat) {
      case "Men": return "bg-blue-50 text-blue-800";
      case "Women": return "bg-pink-50 text-pink-800";
      case "Limited": return "bg-amber-50 text-amber-800";
      default: return "bg-noir-surface text-noir-gray";
    }
  };

  return (
    <div className="space-y-5">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3 flex-1 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:max-w-[260px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-noir-gray" />
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-[12px] bg-white border border-noir-border rounded-md outline-none focus:border-noir-black/30 transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 text-[11px] bg-white border border-noir-border rounded-md text-noir-black cursor-pointer outline-none focus:border-noir-black/30"
            >
              <option value="">Semua Kategori</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Limited">Limited</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 text-[11px] bg-white border border-noir-border rounded-md text-noir-black cursor-pointer outline-none focus:border-noir-black/30"
            >
              <option value="">Semua Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-[11px] uppercase tracking-[1px] font-medium bg-noir-black text-noir-white rounded-md hover:bg-noir-black/90 transition-colors cursor-pointer"
        >
          <Plus size={13} />
          Tambah Produk
        </button>
      </div>

      {/* Add Product Form */}
      {showForm && (
        <div className="bg-white rounded-lg border border-noir-border overflow-hidden">
          <div className="px-5 py-3.5 border-b border-noir-border">
            <h3 className="text-[12px] font-medium text-noir-black tracking-wide">
              Produk Baru
            </h3>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-[9px] uppercase tracking-[2px] text-noir-gray font-medium mb-1.5">
                  Nama Produk
                </label>
                <input
                  type="text"
                  placeholder="cth: The Onyx Coat"
                  className="w-full px-3 py-2.5 text-[12px] bg-noir-surface border border-noir-border rounded-md outline-none focus:border-noir-black/30 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-[2px] text-noir-gray font-medium mb-1.5">
                  Kategori
                </label>
                <select className="w-full px-3 py-2.5 text-[12px] bg-noir-surface border border-noir-border rounded-md outline-none cursor-pointer">
                  <option>Pilih kategori</option>
                  <option>Men</option>
                  <option>Women</option>
                  <option>Limited</option>
                </select>
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-[2px] text-noir-gray font-medium mb-1.5">
                  Harga (Rp)
                </label>
                <input
                  type="number"
                  placeholder="4800000"
                  className="w-full px-3 py-2.5 text-[12px] bg-noir-surface border border-noir-border rounded-md outline-none focus:border-noir-black/30 transition-colors"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[9px] uppercase tracking-[2px] text-noir-gray font-medium mb-1.5">
                  Deskripsi
                </label>
                <textarea
                  placeholder="Deskripsi produk..."
                  rows={3}
                  className="w-full px-3 py-2.5 text-[12px] bg-noir-surface border border-noir-border rounded-md outline-none resize-y focus:border-noir-black/30 transition-colors"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[9px] uppercase tracking-[2px] text-noir-gray font-medium mb-1.5">
                  Upload Gambar
                </label>
                <div className="border border-dashed border-noir-border rounded-md p-8 text-center bg-noir-surface cursor-pointer hover:border-noir-gray/50 transition-colors">
                  <div className="text-noir-gray text-2xl mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  </div>
                  <p className="text-[11px] text-noir-gray">
                    Drag & drop atau klik untuk upload
                  </p>
                  <p className="text-[10px] text-noir-gray/60 mt-1">
                    PNG, JPG, WEBP — Maks 10MB per file
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-5 py-3.5 border-t border-noir-border flex items-center justify-between">
            <span className="text-[10px] text-noir-gray">
              * Semua field wajib diisi sebelum publish
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-[10px] uppercase tracking-[1px] font-medium border border-noir-border rounded text-noir-gray hover:bg-noir-surface transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button className="px-4 py-2 text-[10px] uppercase tracking-[1px] font-medium border border-noir-border rounded text-noir-black hover:bg-noir-surface transition-colors cursor-pointer">
                Simpan Draft
              </button>
              <button className="px-4 py-2 text-[10px] uppercase tracking-[1px] font-medium bg-noir-red text-white rounded hover:bg-noir-red-dark transition-colors cursor-pointer">
                Publish Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-lg border border-noir-border overflow-hidden">
        <div className="px-5 py-3.5 border-b border-noir-border flex items-center justify-between">
          <h2 className="text-[12px] font-medium text-noir-black tracking-wide">
            Semua Produk{" "}
            <span className="text-noir-gray font-normal">
              ({filteredProducts.length})
            </span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="bg-noir-surface">
                <th className="text-left px-5 py-2.5 text-[9px] uppercase tracking-[2px] text-noir-gray font-medium border-b border-noir-border w-10">
                  <input type="checkbox" className="w-3.5 h-3.5 cursor-pointer" aria-label="Select all" />
                </th>
                <th className="text-left px-4 py-2.5 text-[9px] uppercase tracking-[2px] text-noir-gray font-medium border-b border-noir-border">
                  Produk
                </th>
                <th className="text-left px-4 py-2.5 text-[9px] uppercase tracking-[2px] text-noir-gray font-medium border-b border-noir-border">
                  Kategori
                </th>
                <th className="text-left px-4 py-2.5 text-[9px] uppercase tracking-[2px] text-noir-gray font-medium border-b border-noir-border">
                  Harga
                </th>
                <th className="text-left px-4 py-2.5 text-[9px] uppercase tracking-[2px] text-noir-gray font-medium border-b border-noir-border">
                  Status
                </th>
                <th className="text-left px-4 py-2.5 text-[9px] uppercase tracking-[2px] text-noir-gray font-medium border-b border-noir-border">
                  Featured
                </th>
                <th className="text-left px-4 py-2.5 text-[9px] uppercase tracking-[2px] text-noir-gray font-medium border-b border-noir-border w-20">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-noir-border/40 last:border-b-0 hover:bg-noir-surface/50 transition-colors"
                >
                  <td className="px-5 py-3">
                    <input type="checkbox" className="w-3.5 h-3.5 cursor-pointer" aria-label={`Select ${product.name}`} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded bg-noir-cream shrink-0" />
                      <span className="font-medium text-noir-black">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded text-[9px] uppercase tracking-[1.5px] font-medium ${categoryBadgeClass(
                        product.category
                      )}`}
                    >
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-noir-black">{product.price}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded text-[9px] uppercase tracking-[1.5px] font-medium ${
                        product.status === "Published"
                          ? "bg-green-50 text-green-800"
                          : "bg-noir-surface text-noir-gray"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleFeatured(product.id)}
                      className={`w-8 h-[18px] rounded-full relative cursor-pointer transition-colors duration-200 ${
                        product.featured ? "bg-noir-black" : "bg-noir-border"
                      }`}
                      aria-label={`Toggle featured for ${product.name}`}
                    >
                      <div
                        className={`absolute top-[3px] w-3 h-3 rounded-full bg-white transition-all duration-200 ${
                          product.featured ? "left-[17px]" : "left-[3px]"
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button
                        className="w-7 h-7 rounded border border-noir-border flex items-center justify-center text-noir-gray hover:bg-noir-cream hover:text-noir-black transition-colors cursor-pointer"
                        aria-label={`Edit ${product.name}`}
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(product)}
                        className="w-7 h-7 rounded border border-noir-border flex items-center justify-center text-noir-gray hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors cursor-pointer"
                        aria-label={`Delete ${product.name}`}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-3 border-t border-noir-border flex items-center justify-between">
          <span className="text-[11px] text-noir-gray">
            Menampilkan 1–{filteredProducts.length} dari {products.length} produk
          </span>
          <div className="flex gap-1">
            <button className="px-3 py-1 text-[10px] border border-noir-border rounded text-noir-gray hover:bg-noir-surface transition-colors cursor-pointer">
              ‹ Prev
            </button>
            <button className="px-3 py-1 text-[10px] bg-noir-black text-noir-white rounded cursor-pointer">
              1
            </button>
            <button className="px-3 py-1 text-[10px] border border-noir-border rounded text-noir-gray hover:bg-noir-surface transition-colors cursor-pointer">
              2
            </button>
            <button className="px-3 py-1 text-[10px] border border-noir-border rounded text-noir-gray hover:bg-noir-surface transition-colors cursor-pointer">
              Next ›
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-noir-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg border border-noir-border w-full max-w-sm shadow-xl">
            <div className="px-5 py-4 border-b border-noir-border flex items-center justify-between">
              <h3 className="text-[13px] font-medium text-noir-black">
                Konfirmasi Hapus
              </h3>
              <button
                onClick={() => setDeleteTarget(null)}
                className="text-noir-gray hover:text-noir-black transition-colors cursor-pointer text-lg leading-none"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="p-5">
              <p className="text-[12px] text-noir-gray leading-relaxed">
                Apakah kamu yakin ingin menghapus produk ini? Aksi ini tidak bisa
                dibatalkan.
              </p>
              <p className="text-[14px] font-medium text-noir-black mt-2">
                {deleteTarget.name}
              </p>
            </div>
            <div className="px-5 py-3.5 border-t border-noir-border flex justify-end gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-[10px] uppercase tracking-[1px] font-medium border border-noir-border rounded text-noir-gray hover:bg-noir-surface transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => deleteProduct(deleteTarget.id)}
                className="px-4 py-2 text-[10px] uppercase tracking-[1px] font-medium bg-noir-red text-white rounded hover:bg-noir-red-dark transition-colors cursor-pointer"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
