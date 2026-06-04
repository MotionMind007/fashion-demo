"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    if (result.success) {
      router.push("/admin");
    } else {
      setError(result.error || "Email atau password salah.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-noir-black relative overflow-hidden px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(200,0,26,0.08)_0%,transparent_60%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(200,0,26,0.05)_0%,transparent_50%)]" />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="font-serif font-black text-3xl tracking-[0.4em] text-noir-white mb-2">
            NOIR
          </h1>
          <p className="text-[10px] uppercase tracking-[3px] text-white/30">
            Admin Panel
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-lg p-7">
          <h2 className="text-[13px] font-medium text-noir-white mb-1">
            Selamat Datang
          </h2>
          <p className="text-[11px] text-white/40 mb-6">
            Masuk untuk mengelola konten NOIR.
          </p>

          {/* Error */}
          {error && (
            <div className="mb-4 px-3 py-2.5 bg-noir-red/10 border border-noir-red/20 rounded-md">
              <p className="text-[11px] text-noir-red">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[9px] uppercase tracking-[2px] text-white/40 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rizky@noir-studio.id"
                className="w-full px-4 py-3 text-[13px] bg-white/[0.05] border border-white/10 rounded-md text-noir-white placeholder:text-white/20 outline-none focus:border-noir-red/50 transition-colors"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-[9px] uppercase tracking-[2px] text-white/40 font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-11 text-[13px] bg-white/[0.05] border border-white/10 rounded-md text-noir-white placeholder:text-white/20 outline-none focus:border-noir-red/50 transition-colors"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-noir-red text-white text-[11px] uppercase tracking-[2px] font-medium rounded-md hover:bg-noir-red-dark transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={14} />
                  Masuk
                </>
              )}
            </button>
          </form>

          {/* Demo credentials hint */}
          <div className="mt-6 pt-5 border-t border-white/[0.06]">
            <p className="text-[9px] uppercase tracking-[2px] text-white/25 mb-2">
              Demo Accounts
            </p>
            <div className="space-y-1.5">
              <p className="text-[10px] text-white/35">
                <span className="text-white/50">Super Admin:</span> rizky@noir-studio.id / admin123
              </p>
              <p className="text-[10px] text-white/35">
                <span className="text-white/50">Editor:</span> anya@noir-studio.id / editor123
              </p>
              <p className="text-[10px] text-white/35">
                <span className="text-white/50">Viewer:</span> budi@noir-studio.id / viewer123
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[9px] text-white/20 mt-6 tracking-wider">
          © 2026 NOIR Studio Jakarta
        </p>
      </div>
    </div>
  );
}
