import { Package, Scissors, Mail, Clock } from "lucide-react";
import Link from "next/link";

const stats = [
  {
    label: "Total Produk",
    value: "12",
    sub: "8 published, 4 draft",
    icon: Package,
  },
  {
    label: "Services",
    value: "3",
    sub: "Semua aktif",
    icon: Scissors,
  },
  {
    label: "Pesan Baru",
    value: "3",
    sub: "Belum dibaca",
    icon: Mail,
    highlight: true,
  },
  {
    label: "Last Update",
    value: "Hari Ini",
    sub: "The Onyx Coat",
    icon: Clock,
  },
];

const recentProducts = [
  {
    name: "The Onyx Coat",
    category: "Men",
    price: "Rp 4.800.000",
    status: "Published",
    featured: true,
  },
  {
    name: "Wool Blazer",
    category: "Men",
    price: "Rp 3.200.000",
    status: "Published",
    featured: false,
  },
  {
    name: "Silk Shirt No. 7",
    category: "Women",
    price: "Rp 2.100.000",
    status: "Draft",
    featured: false,
  },
];

const recentMessages = [
  {
    name: "Andika Kusuma",
    initials: "AK",
    message:
      "Halo, saya tertarik dengan layanan Bespoke Tailoring untuk suit pernikahan saya...",
    time: "2 jam lalu",
    unread: true,
  },
  {
    name: "Sari Rahayu",
    initials: "SR",
    message:
      "Apakah tersedia untuk editorial shoot bulan depan? Kami membutuhkan...",
    time: "5 jam lalu",
    unread: true,
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-5">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-lg border border-noir-border p-4 hover:shadow-sm transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-[10px] uppercase tracking-[2px] text-noir-gray font-medium">
                  {stat.label}
                </span>
                <Icon
                  size={14}
                  className={stat.highlight ? "text-noir-red" : "text-noir-gray/50"}
                />
              </div>
              <div
                className={`font-serif text-2xl font-bold tracking-tight ${
                  stat.highlight ? "text-noir-red" : "text-noir-black"
                }`}
              >
                {stat.value}
              </div>
              <span className="text-[10px] text-noir-gray mt-1 block">
                {stat.sub}
              </span>
            </div>
          );
        })}
      </div>

      {/* Recent Products Panel */}
      <div className="bg-white rounded-lg border border-noir-border">
        <div className="px-5 py-3.5 border-b border-noir-border flex items-center justify-between">
          <h2 className="text-[12px] font-medium text-noir-black tracking-wide">
            Produk Terbaru
          </h2>
          <Link
            href="/admin/products"
            className="text-[10px] uppercase tracking-[1px] text-noir-gray hover:text-noir-black transition-colors cursor-pointer"
          >
            Lihat Semua →
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="bg-noir-surface">
                <th className="text-left px-5 py-2.5 text-[9px] uppercase tracking-[2px] text-noir-gray font-medium border-b border-noir-border">
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
              </tr>
            </thead>
            <tbody>
              {recentProducts.map((product) => (
                <tr
                  key={product.name}
                  className="border-b border-noir-border/50 last:border-b-0 hover:bg-noir-surface/50 transition-colors"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded bg-noir-cream shrink-0" />
                      <span className="font-medium text-noir-black">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded text-[9px] uppercase tracking-[1.5px] font-medium ${
                        product.category === "Men"
                          ? "bg-blue-50 text-blue-800"
                          : product.category === "Women"
                          ? "bg-pink-50 text-pink-800"
                          : "bg-amber-50 text-amber-800"
                      }`}
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
                    <div
                      className={`w-8 h-[18px] rounded-full relative cursor-pointer transition-colors duration-200 ${
                        product.featured ? "bg-noir-black" : "bg-noir-border"
                      }`}
                    >
                      <div
                        className={`absolute top-[3px] w-3 h-3 rounded-full bg-white transition-all duration-200 ${
                          product.featured ? "left-[17px]" : "left-[3px]"
                        }`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Messages Panel */}
      <div className="bg-white rounded-lg border border-noir-border">
        <div className="px-5 py-3.5 border-b border-noir-border flex items-center justify-between">
          <h2 className="text-[12px] font-medium text-noir-black tracking-wide">
            Pesan Terbaru
          </h2>
          <Link
            href="/admin/messages"
            className="text-[10px] uppercase tracking-[1px] text-noir-gray hover:text-noir-black transition-colors cursor-pointer"
          >
            Lihat Semua →
          </Link>
        </div>

        <div>
          {recentMessages.map((msg) => (
            <div
              key={msg.name}
              className="flex items-start gap-3 px-5 py-3.5 border-b border-noir-border/50 last:border-b-0 hover:bg-noir-surface/50 transition-colors cursor-pointer"
            >
              {msg.unread && (
                <div className="w-1.5 h-1.5 bg-noir-red rounded-full shrink-0 mt-2" />
              )}
              <div className="w-8 h-8 rounded-full bg-noir-cream flex items-center justify-center text-[11px] font-medium text-noir-black shrink-0">
                {msg.initials}
              </div>
              <div className="flex-1 min-w-0">
                <span
                  className={`text-[12px] text-noir-black ${
                    msg.unread ? "font-bold" : "font-medium"
                  }`}
                >
                  {msg.name}
                </span>
                <p className="text-[11px] text-noir-gray truncate mt-0.5">
                  {msg.message}
                </p>
              </div>
              <span className="text-[10px] text-noir-gray/60 shrink-0">
                {msg.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
