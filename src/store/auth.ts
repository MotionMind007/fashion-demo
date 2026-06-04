import { create } from "zustand";

interface AuthStore {
  isAuthenticated: boolean;
  user: { name: string; email: string; role: string; initials: string } | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

// Demo credentials
const DEMO_ACCOUNTS = [
  { email: "rizky@noir-studio.id", password: "admin123", name: "Rizky Admin", role: "Super Admin", initials: "RA" },
  { email: "anya@noir-studio.id", password: "editor123", name: "Anya Editor", role: "Editor", initials: "AE" },
  { email: "budi@noir-studio.id", password: "viewer123", name: "Budi Viewer", role: "Viewer", initials: "BV" },
];

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,

  login: (email, password) => {
    const account = DEMO_ACCOUNTS.find(
      (a) => a.email === email && a.password === password
    );
    if (account) {
      set({ isAuthenticated: true, user: { name: account.name, email: account.email, role: account.role, initials: account.initials } });
      return true;
    }
    return false;
  },

  logout: () => {
    set({ isAuthenticated: false, user: null });
  },
}));
