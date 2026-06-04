"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";

export default function AdminAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    // Show loading while redirecting
    return (
      <div className="flex h-screen items-center justify-center bg-noir-bg">
        <div className="text-center">
          <div className="w-6 h-6 border-2 border-noir-border border-t-noir-red rounded-full animate-spin mx-auto mb-3" />
          <p className="text-[11px] text-noir-gray">Redirecting...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
