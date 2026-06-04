import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  initials: string;
}

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,

      login: async (email, password) => {
        try {
          const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          const data = await res.json();

          if (res.ok && data.success) {
            set({
              isAuthenticated: true,
              user: data.user,
              token: data.token,
            });
            return { success: true };
          }

          return { success: false, error: data.error || "Login gagal." };
        } catch {
          return { success: false, error: "Koneksi gagal. Coba lagi." };
        }
      },

      logout: async () => {
        try {
          await fetch("/api/auth/logout", { method: "POST" });
        } catch {
          // Ignore network errors on logout
        }
        set({ isAuthenticated: false, user: null, token: null });
      },

      checkAuth: () => {
        // Token expiry check could be added here
        // For now, persist middleware handles rehydration
      },
    }),
    {
      name: "noir-auth",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
      }),
    }
  )
);
