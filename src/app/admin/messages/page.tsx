"use client";

import { useState } from "react";
import { Mail, MailOpen, Trash2, Reply } from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  initials: string;
  message: string;
  time: string;
  status: "unread" | "read" | "replied";
}

const initialMessages: Message[] = [
  {
    id: "1",
    name: "Andika Kusuma",
    email: "andika@gmail.com",
    initials: "AK",
    message: "Halo, saya tertarik dengan layanan Bespoke Tailoring untuk suit pernikahan saya bulan depan. Apakah masih menerima order?",
    time: "2 jam lalu",
    status: "unread",
  },
  {
    id: "2",
    name: "Sari Rahayu",
    email: "sari.r@outlook.com",
    initials: "SR",
    message: "Apakah tersedia untuk editorial shoot bulan depan? Kami membutuhkan styling untuk 4 orang model untuk campaign brand kami.",
    time: "5 jam lalu",
    status: "unread",
  },
  {
    id: "3",
    name: "Kevin Lim",
    email: "kevin.lim@company.co",
    initials: "KL",
    message: "Apa bisa konsultasi dulu sebelum buat janji styling session? Saya mau tanya soal dress code buat event formal.",
    time: "1 hari lalu",
    status: "unread",
  },
  {
    id: "4",
    name: "Diana Putri",
    email: "diana.p@email.id",
    initials: "DP",
    message: "Terima kasih atas response-nya. Saya akan datang hari Sabtu sesuai appointment yang sudah dibuat.",
    time: "3 hari lalu",
    status: "replied",
  },
  {
    id: "5",
    name: "Reza Pratama",
    email: "reza.p@mail.com",
    initials: "RP",
    message: "Mau tanya apakah The Onyx Coat available dalam ukuran L? Kalau bisa custom, berapa lama proses pembuatannya?",
    time: "5 hari lalu",
    status: "read",
  },
];

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [selectedMsg, setSelectedMsg] = useState<Message | null>(null);

  const unreadCount = messages.filter((m) => m.status === "unread").length;

  const markAsRead = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id && m.status === "unread" ? { ...m, status: "read" as const } : m))
    );
  };

  return (
    <div className="space-y-5">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <p className="text-[11px] text-noir-gray">
          {unreadCount} pesan belum dibaca
        </p>
        <button
          onClick={() => setMessages((prev) => prev.map((m) => ({ ...m, status: m.status === "unread" ? "read" as const : m.status })))}
          className="text-[10px] uppercase tracking-[1px] text-noir-gray hover:text-noir-black transition-colors cursor-pointer"
        >
          Tandai Semua Dibaca
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Message List */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-noir-border overflow-hidden">
          <div className="px-4 py-3 border-b border-noir-border">
            <span className="text-[12px] font-medium text-noir-black">Inbox</span>
          </div>
          <div className="max-h-[500px] overflow-y-auto">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => { setSelectedMsg(msg); markAsRead(msg.id); }}
                className={`w-full text-left flex items-start gap-3 px-4 py-3.5 border-b border-noir-border/40 last:border-b-0 transition-colors cursor-pointer ${
                  selectedMsg?.id === msg.id
                    ? "bg-noir-surface"
                    : msg.status === "unread"
                    ? "bg-noir-surface/50 hover:bg-noir-surface"
                    : "hover:bg-noir-surface/30"
                }`}
              >
                {msg.status === "unread" && (
                  <div className="w-1.5 h-1.5 bg-noir-red rounded-full shrink-0 mt-2" />
                )}
                <div className="w-8 h-8 rounded-full bg-noir-cream flex items-center justify-center text-[10px] font-medium text-noir-black shrink-0">
                  {msg.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[12px] ${msg.status === "unread" ? "font-bold text-noir-black" : "font-medium text-noir-black"}`}>
                      {msg.name}
                    </span>
                    <span className="text-[9px] text-noir-gray/60 shrink-0">{msg.time}</span>
                  </div>
                  <p className="text-[11px] text-noir-gray truncate mt-0.5">{msg.message}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-noir-border overflow-hidden">
          {selectedMsg ? (
            <>
              <div className="px-5 py-4 border-b border-noir-border">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-[14px] font-medium text-noir-black">
                      {selectedMsg.name}
                    </h3>
                    <p className="text-[11px] text-noir-gray mt-0.5">
                      {selectedMsg.email} · {selectedMsg.time}
                    </p>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      className="w-7 h-7 rounded border border-noir-border flex items-center justify-center text-noir-gray hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors cursor-pointer"
                      aria-label="Reply"
                    >
                      <Reply size={13} />
                    </button>
                    <button
                      className="w-7 h-7 rounded border border-noir-border flex items-center justify-center text-noir-gray hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors cursor-pointer"
                      aria-label="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-[13px] text-noir-black leading-relaxed">
                  {selectedMsg.message}
                </p>
              </div>
              <div className="px-5 py-4 border-t border-noir-border">
                <textarea
                  placeholder="Tulis balasan..."
                  rows={3}
                  className="w-full px-3 py-2.5 text-[12px] bg-noir-surface border border-noir-border rounded-md outline-none resize-y focus:border-noir-black/30 transition-colors mb-3"
                />
                <button className="px-4 py-2 text-[10px] uppercase tracking-[1px] font-medium bg-noir-black text-noir-white rounded hover:bg-noir-black/90 transition-colors cursor-pointer">
                  Kirim Balasan
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Mail size={32} className="text-noir-gray/30 mb-3" />
              <p className="text-[12px] text-noir-gray">
                Pilih pesan untuk membaca isi lengkapnya
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
