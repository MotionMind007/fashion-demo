"use client";

import { Package, Scissors, Mail, Clock } from "lucide-react";
import Link from "next/link";
import { useAdminStore } from "@/store/admin";

export default function AdminDashboard() {
  const { products, services, messages } = useAdminStore();
  const unreadCount = messages.filter((m) => m.status === "unread").length;
  const publishedCount = products.filter((p) => p.status === "Published").length;
  const draftCount = products.filter((p) => p.status === "Draft").length;
  const recentProducts = products.slice(0, 3);
  const recentMessages = messages.filter((m) => m.status === "unread").slice(0, 3);

  const formatPrice = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

  const stats = [
    { label: "Total Produk", value: String(products.length), sub: `${publishedCount} published, ${draftCount} draft`, icon: Package, highlight: false },
    { label: "Services", value: String(services.length), sub: "Semua aktif", icon: Scissors, highlight: false },
    { label: "Pesan Baru", value: String(unreadCount), sub: "Belum dibaca", icon: Mail, highlight: true },
    { label: "Last Update", value: "Hari Ini", sub: products[0]?.name || "-", icon: Clock, highlight: false },
  ];

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-lg border border-noir-border p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <span className="text-[10px] uppercase tracking-[2px] text-noir-gray font-medium">{stat.label}</span>
                <Icon size={14} className={stat.highlight ? "text-noir-red" : "text-noir-gray/50"} />
              </div>
              <div className={`font-serif text-2xl font-bold tracking-tight ${stat.highlight ? "text-noir-red" : "text-noir-black"}`}>{stat.value}</div>
              <span className="text-[10px] text-noir-gray mt-1 block">{stat.sub}</span>
            </div>
          );
        })}
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-lg border border-noir-border">
        <div className="px-5 py-3.5 border-b border-noir-border flex items-center justify-between">
          <h2 className="text-[12px] font-medium text-noir-black tracking-wide">Produk Terbaru</h2>
          <Link href="/admin/products" className="text-[10px] uppercase tracking-[1px] text-noir-gray hover:text-noir-black transition-colors cursor-pointer">Lihat Semua →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="bg-noir-surface">
                <th className="text-left px-5 py-2.5 text-[9px] uppercase tracking-[2px] text-noir-gray font-medium border-b border-noir-border">Produk</th>
                <th className="text-left px-4 py-2.5 text-[9px] uppercase tracking-[2px] text-noir-gray font-medium border-b border-noir-border">Kategori</th>
                <th className="text-left px-4 py-2.5 text-[9px] uppercase tracking-[2px] text-noir-gray font-medium border-b border-noir-border">Harga</th>
                <th className="text-left px-4 py-2.5 text-[9px] uppercase tracking-[2px] text-noir-gray font-medium border-b border-noir-border">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentProducts.map((p) => (
                <tr key={p.id} className="border-b border-noir-border/50 last:border-b-0 hover:bg-noir-surface/50 transition-colors">
                  <td className="px-5 py-3"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded bg-noir-cream shrink-0" /><span className="font-medium text-noir-black">{p.name}</span></div></td>
                  <td className="px-4 py-3"><span className={`inline-flex px-2 py-0.5 rounded text-[9px] uppercase tracking-[1.5px] font-medium ${p.category === "Men" ? "bg-blue-50 text-blue-800" : p.category === "Women" ? "bg-pink-50 text-pink-800" : "bg-amber-50 text-amber-800"}`}>{p.category}</span></td>
                  <td className="px-4 py-3 text-noir-black">{formatPrice(p.price)}</td>
                  <td className="px-4 py-3"><span className={`inline-flex px-2 py-0.5 rounded text-[9px] uppercase tracking-[1.5px] font-medium ${p.status === "Published" ? "bg-green-50 text-green-800" : "bg-noir-surface text-noir-gray"}`}>{p.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="bg-white rounded-lg border border-noir-border">
        <div className="px-5 py-3.5 border-b border-noir-border flex items-center justify-between">
          <h2 className="text-[12px] font-medium text-noir-black tracking-wide">Pesan Terbaru</h2>
          <Link href="/admin/messages" className="text-[10px] uppercase tracking-[1px] text-noir-gray hover:text-noir-black transition-colors cursor-pointer">Lihat Semua →</Link>
        </div>
        <div>
          {recentMessages.length > 0 ? recentMessages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-3 px-5 py-3.5 border-b border-noir-border/50 last:border-b-0 hover:bg-noir-surface/50 transition-colors cursor-pointer">
              <div className="w-1.5 h-1.5 bg-noir-red rounded-full shrink-0 mt-2" />
              <div className="w-8 h-8 rounded-full bg-noir-cream flex items-center justify-center text-[10px] font-medium text-noir-black shrink-0">
                {msg.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[12px] font-bold text-noir-black">{msg.name}</span>
                <p className="text-[11px] text-noir-gray truncate mt-0.5">{msg.message}</p>
              </div>
            </div>
          )) : (
            <div className="px-5 py-6 text-center text-[12px] text-noir-gray">Tidak ada pesan baru.</div>
          )}
        </div>
      </div>
    </div>
  );
}
