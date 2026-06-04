"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Login page renders without sidebar/topbar/auth guard
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <AdminAuthGuard>
      <div className="flex h-screen overflow-hidden bg-noir-bg">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <AdminTopbar />
          <main className="flex-1 overflow-y-auto p-5 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
