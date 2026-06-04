"use client";

import { usePathname } from "next/navigation";
import { Bell, Plus } from "lucide-react";
import Link from "next/link";

const pageTitles: Record<string, { title: string; breadcrumb: string }> = {
  "/admin": { title: "Dashboard", breadcrumb: "Selamat datang kembali, Rizky" },
  "/admin/products": { title: "Products", breadcrumb: "Kelola koleksi NOIR" },
  "/admin/services": { title: "Services", breadcrumb: "Kelola layanan NOIR" },
  "/admin/pages": { title: "Pages / Hero", breadcrumb: "Edit hero content" },
  "/admin/media": { title: "Media Library", breadcrumb: "Upload & kelola gambar" },
  "/admin/messages": { title: "Pesan Masuk", breadcrumb: "3 pesan belum dibaca" },
  "/admin/users": { title: "Users", breadcrumb: "Manajemen pengguna" },
  "/admin/settings": { title: "Settings", breadcrumb: "Pengaturan umum" },
};

export default function AdminTopbar() {
  const pathname = usePathname();
  const page = pageTitles[pathname] || { title: "Admin", breadcrumb: "" };

  return (
    <header className="bg-white h-[52px] px-6 flex items-center justify-between border-b border-noir-border shrink-0">
      <div>
        <h1 className="text-sm font-medium text-noir-black tracking-wide">
          {page.title}
        </h1>
        <p className="text-[11px] text-noir-gray mt-0.5">{page.breadcrumb}</p>
      </div>

      <div className="flex items-center gap-3">
        {pathname === "/admin" && (
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] uppercase tracking-[1px] font-medium border border-noir-border rounded text-noir-gray hover:bg-noir-surface hover:text-noir-black transition-colors duration-150 cursor-pointer"
          >
            <Plus size={12} />
            Produk Baru
          </Link>
        )}

        <button
          className="relative p-2 text-noir-gray hover:text-noir-black transition-colors duration-150 cursor-pointer"
          aria-label="Notifications"
        >
          <Bell size={16} strokeWidth={1.5} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-noir-red rounded-full" />
        </button>
      </div>
    </header>
  );
}
