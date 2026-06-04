import { create } from "zustand";

/* ═══════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════ */

export interface Product {
  id: string;
  name: string;
  category: "Men" | "Women" | "Limited";
  price: number;
  description: string;
  status: "Published" | "Draft";
  featured: boolean;
  image: string;
  createdAt: string;
}

export interface Service {
  id: string;
  order: number;
  name: string;
  tagline: string;
  description: string;
  price: string;
  image: string;
  status: "Published" | "Draft";
}

export interface PageHero {
  id: string;
  page: "home" | "products" | "services" | "contact";
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  status: "unread" | "read" | "replied";
  receivedAt: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Editor" | "Viewer";
  initials: string;
  lastLogin: string;
}

/* ═══════════════════════════════════════════════════
   Store
   ═══════════════════════════════════════════════════ */

interface AdminStore {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, "id" | "createdAt">) => void;
  updateProduct: (id: string, data: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleFeatured: (id: string) => void;

  // Services
  services: Service[];
  addService: (service: Omit<Service, "id">) => void;
  updateService: (id: string, data: Partial<Service>) => void;
  deleteService: (id: string) => void;

  // Pages
  pages: PageHero[];
  updatePage: (id: string, data: Partial<PageHero>) => void;

  // Messages
  messages: ContactMessage[];
  addMessage: (message: Omit<ContactMessage, "id">) => void;
  updateMessageStatus: (id: string, status: ContactMessage["status"]) => void;
  deleteMessage: (id: string) => void;

  // Users
  users: AdminUser[];
  addUser: (user: Omit<AdminUser, "id">) => void;
  updateUser: (id: string, data: Partial<AdminUser>) => void;
  deleteUser: (id: string) => void;
}

const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

export const useAdminStore = create<AdminStore>((set) => ({
  /* ═══ PRODUCTS ═══ */
  products: [
    { id: "p1", name: "The Onyx Coat", category: "Men", price: 4800000, description: "Dibuat dari wol Merino Jepang berat 380gsm. Siluet oversized dengan bahu terstruktur.", status: "Published", featured: true, image: "", createdAt: "2026-05-28" },
    { id: "p2", name: "Wool Blazer", category: "Men", price: 3200000, description: "Blazer wool premium dengan cutting slim modern.", status: "Published", featured: false, image: "", createdAt: "2026-05-25" },
    { id: "p3", name: "Silk Shirt No. 7", category: "Women", price: 2100000, description: "Kemeja sutra halus dengan detail pearl button.", status: "Published", featured: false, image: "", createdAt: "2026-05-20" },
    { id: "p4", name: "Linen Trousers", category: "Women", price: 1650000, description: "Celana linen breathable untuk gaya kasual elegan.", status: "Draft", featured: false, image: "", createdAt: "2026-05-18" },
    { id: "p5", name: "Shadow Trench", category: "Limited", price: 7500000, description: "Trench coat limited edition, hanya 50 pcs.", status: "Published", featured: true, image: "", createdAt: "2026-05-15" },
    { id: "p6", name: "Grey Turtleneck", category: "Men", price: 1200000, description: "Turtleneck kasmir blend yang ringan dan hangat.", status: "Draft", featured: false, image: "", createdAt: "2026-05-10" },
  ],
  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, { ...product, id: generateId(), createdAt: new Date().toISOString().split("T")[0] }],
    })),
  updateProduct: (id, data) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? { ...p, ...data } : p)),
    })),
  deleteProduct: (id) =>
    set((state) => ({ products: state.products.filter((p) => p.id !== id) })),
  toggleFeatured: (id) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)),
    })),

  /* ═══ SERVICES ═══ */
  services: [
    { id: "s1", order: 1, name: "Bespoke Tailoring", tagline: "Handmade — 4–6 Weeks", description: "Kami merancang dan membuat pakaian dari nol, sesuai dengan proporsi tubuh, pilihan kain, dan kepribadian kamu.", price: "Mulai dari Rp 3.500.000", image: "", status: "Published" },
    { id: "s2", order: 2, name: "Styling Session", tagline: "In-Person — 90 Menit", description: "Satu sesi intens bersama head stylist kami. Menganalisis gaya hidup dan menyusun panduan berpakaian.", price: "Rp 850.000 / sesi", image: "", status: "Published" },
    { id: "s3", order: 3, name: "Editorial Shoot", tagline: "Collaboration — Full Day", description: "Kolaborasi pemotretan editorial dengan tim NOIR — stylist, fotografer, dan art director.", price: "Mulai dari Rp 5.500.000", image: "", status: "Published" },
    { id: "s4", order: 4, name: "Make Your Own Design", tagline: "Interactive — Design It Yourself", description: "Pilih jenis pakaian, tentukan warna, upload gambar desainmu, atur posisi depan-belakang.", price: "Mulai dari Rp 250.000", image: "", status: "Published" },
  ],
  addService: (service) =>
    set((state) => ({ services: [...state.services, { ...service, id: generateId() }] })),
  updateService: (id, data) =>
    set((state) => ({
      services: state.services.map((s) => (s.id === id ? { ...s, ...data } : s)),
    })),
  deleteService: (id) =>
    set((state) => ({ services: state.services.filter((s) => s.id !== id) })),

  /* ═══ PAGES ═══ */
  pages: [
    { id: "pg1", page: "home", heroTitle: "WEAR THE SILENCE", heroSubtitle: "Defined by contrast. Worn with intent.", heroImage: "", updatedAt: "2026-06-02" },
    { id: "pg2", page: "products", heroTitle: "SS 2026", heroSubtitle: "Collection", heroImage: "", updatedAt: "2026-05-28" },
    { id: "pg3", page: "services", heroTitle: "WE DRESS YOUR STORY", heroSubtitle: "Four ways to experience NOIR.", heroImage: "", updatedAt: "2026-05-20" },
    { id: "pg4", page: "contact", heroTitle: "LET'S TALK", heroSubtitle: "Setiap kolaborasi terbaik dimulai dari percakapan yang jujur.", heroImage: "", updatedAt: "2026-05-10" },
  ],
  updatePage: (id, data) =>
    set((state) => ({
      pages: state.pages.map((p) => (p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString().split("T")[0] } : p)),
    })),

  /* ═══ MESSAGES ═══ */
  messages: [
    { id: "m1", name: "Andika Kusuma", email: "andika@gmail.com", message: "Halo, saya tertarik dengan layanan Bespoke Tailoring untuk suit pernikahan saya bulan depan. Apakah masih menerima order?", status: "unread", receivedAt: "2026-06-04T08:00:00" },
    { id: "m2", name: "Sari Rahayu", email: "sari.r@outlook.com", message: "Apakah tersedia untuk editorial shoot bulan depan? Kami membutuhkan styling untuk 4 orang model untuk campaign brand kami.", status: "unread", receivedAt: "2026-06-04T05:00:00" },
    { id: "m3", name: "Kevin Lim", email: "kevin.lim@company.co", message: "Apa bisa konsultasi dulu sebelum buat janji styling session? Saya mau tanya soal dress code buat event formal.", status: "unread", receivedAt: "2026-06-03T10:00:00" },
    { id: "m4", name: "Diana Putri", email: "diana.p@email.id", message: "Terima kasih atas response-nya. Saya akan datang hari Sabtu sesuai appointment yang sudah dibuat.", status: "replied", receivedAt: "2026-06-01T14:00:00" },
    { id: "m5", name: "Reza Pratama", email: "reza.p@mail.com", message: "Mau tanya apakah The Onyx Coat available dalam ukuran L? Kalau bisa custom, berapa lama proses pembuatannya?", status: "read", receivedAt: "2026-05-30T09:00:00" },
  ],
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, { ...message, id: generateId() }] })),
  updateMessageStatus: (id, status) =>
    set((state) => ({
      messages: state.messages.map((m) => (m.id === id ? { ...m, status } : m)),
    })),
  deleteMessage: (id) =>
    set((state) => ({ messages: state.messages.filter((m) => m.id !== id) })),

  /* ═══ USERS ═══ */
  users: [
    { id: "u1", name: "Rizky Admin", email: "rizky@noir-studio.id", role: "Super Admin", initials: "RA", lastLogin: "2026-06-04" },
    { id: "u2", name: "Anya Editor", email: "anya@noir-studio.id", role: "Editor", initials: "AE", lastLogin: "2026-06-03" },
    { id: "u3", name: "Budi Viewer", email: "budi@noir-studio.id", role: "Viewer", initials: "BV", lastLogin: "2026-06-01" },
  ],
  addUser: (user) =>
    set((state) => ({ users: [...state.users, { ...user, id: generateId() }] })),
  updateUser: (id, data) =>
    set((state) => ({ users: state.users.map((u) => (u.id === id ? { ...u, ...data } : u)) })),
  deleteUser: (id) =>
    set((state) => ({ users: state.users.filter((u) => u.id !== id) })),
}));
