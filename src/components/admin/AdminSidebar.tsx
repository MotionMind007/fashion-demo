"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Shirt,
  Scissors,
  FileText,
  Image,
  Mail,
  Users,
  Settings,
} from "lucide-react";

const navSections = [
  {
    label: "Overview",
    items: [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    label: "Konten",
    items: [
      { name: "Products", href: "/admin/products", icon: Shirt, badge: "12" },
      { name: "Services", href: "/admin/services", icon: Scissors },
      { name: "Pages / Hero", href: "/admin/pages", icon: FileText },
      { name: "Media", href: "/admin/media", icon: Image },
    ],
  },
  {
    label: "Komunikasi",
    items: [
      { name: "Pesan Masuk", href: "/admin/messages", icon: Mail, badge: "3" },
    ],
  },
  {
    label: "Pengaturan",
    items: [
      { name: "Users", href: "/admin/users", icon: Users },
      { name: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[220px] bg-noir-black flex flex-col shrink-0 border-r border-white/5">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/[0.06]">
        <Link href="/admin" className="block cursor-pointer">
          <span className="font-serif font-black text-base tracking-[4px] text-noir-white block">
            NOIR
          </span>
          <span className="text-[9px] tracking-[2px] text-white/30 uppercase mt-0.5 block">
            Admin Panel
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2">
        {navSections.map((section) => (
          <div key={section.label} className="py-3 border-b border-white/[0.04]">
            <span className="block px-5 pb-2 text-[9px] tracking-[3px] text-white/25 uppercase font-medium">
              {section.label}
            </span>
            {section.items.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-5 py-2.5 text-[12px] tracking-wide border-l-2 transition-all duration-150 cursor-pointer ${
                    isActive
                      ? "bg-noir-red/10 border-l-noir-red text-noir-white"
                      : "border-l-transparent text-white/50 hover:bg-white/[0.04] hover:text-white/70"
                  }`}
                >
                  <Icon
                    size={15}
                    className={isActive ? "text-noir-red" : "text-white/40"}
                  />
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <span className="bg-noir-red text-white text-[9px] px-1.5 py-0.5 rounded-full leading-none">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User Footer */}
      <div className="px-5 py-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-noir-red flex items-center justify-center text-[10px] text-white font-medium">
            RA
          </div>
          <div>
            <span className="block text-[11px] text-white/60">Rizky Admin</span>
            <span className="block text-[9px] tracking-[1px] text-white/25 uppercase">
              Super Admin
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
