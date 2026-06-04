"use client";

import { useState } from "react";
import { Mail, Trash2, Reply, Check, CheckCheck } from "lucide-react";
import { useAdminStore, ContactMessage } from "@/store/admin";

export default function AdminMessages() {
  const { messages, updateMessageStatus, deleteMessage } = useAdminStore();
  const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ContactMessage | null>(null);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };
  const unreadCount = messages.filter((m) => m.status === "unread").length;

  const markAllRead = () => {
    messages.filter((m) => m.status === "unread").forEach((m) => updateMessageStatus(m.id, "read"));
    showToast("Semua pesan ditandai sudah dibaca.");
  };

  const selectMessage = (msg: ContactMessage) => {
    setSelectedMsg(msg);
    if (msg.status === "unread") updateMessageStatus(msg.id, "read");
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteMessage(deleteTarget.id);
    if (selectedMsg?.id === deleteTarget.id) setSelectedMsg(null);
    showToast("Pesan berhasil dihapus.");
    setDeleteTarget(null);
  };

  const markReplied = (id: string) => {
    updateMessageStatus(id, "replied");
    showToast("Ditandai sebagai sudah dibalas.");
  };

  const formatTime = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return "Baru saja";
    if (hours < 24) return `${hours} jam lalu`;
    const days = Math.floor(hours / 24);
    return `${days} hari lalu`;
  };

  return (
    <div className="space-y-5">
      {toast && (
        <div className="bg-noir-black text-noir-white px-4 py-2.5 rounded-md text-[12px] flex items-center gap-2 border-l-3 border-l-noir-red">
          <span className="text-noir-red">✓</span> {toast}
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-[11px] text-noir-gray">{unreadCount} pesan belum dibaca</p>
        <button onClick={markAllRead} className="text-[10px] uppercase tracking-[1px] text-noir-gray hover:text-noir-black transition-colors cursor-pointer">Tandai Semua Dibaca</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* List */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-noir-border overflow-hidden">
          <div className="px-4 py-3 border-b border-noir-border">
            <span className="text-[12px] font-medium text-noir-black">Inbox ({messages.length})</span>
          </div>
          <div className="max-h-[500px] overflow-y-auto">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => selectMessage(msg)}
                className={`w-full text-left flex items-start gap-3 px-4 py-3.5 border-b border-noir-border/40 last:border-b-0 transition-colors cursor-pointer ${
                  selectedMsg?.id === msg.id ? "bg-noir-surface" : msg.status === "unread" ? "bg-noir-surface/50 hover:bg-noir-surface" : "hover:bg-noir-surface/30"
                }`}
              >
                {msg.status === "unread" && <div className="w-1.5 h-1.5 bg-noir-red rounded-full shrink-0 mt-2" />}
                {msg.status === "read" && <Check size={12} className="text-noir-gray shrink-0 mt-1.5" />}
                {msg.status === "replied" && <CheckCheck size={12} className="text-green-600 shrink-0 mt-1.5" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[12px] ${msg.status === "unread" ? "font-bold text-noir-black" : "font-medium text-noir-black"}`}>{msg.name}</span>
                    <span className="text-[9px] text-noir-gray/60 shrink-0">{formatTime(msg.receivedAt)}</span>
                  </div>
                  <p className="text-[11px] text-noir-gray truncate mt-0.5">{msg.message}</p>
                </div>
              </button>
            ))}
            {messages.length === 0 && (
              <div className="px-4 py-8 text-center text-[12px] text-noir-gray">Tidak ada pesan.</div>
            )}
          </div>
        </div>

        {/* Detail */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-noir-border overflow-hidden">
          {selectedMsg ? (
            <>
              <div className="px-5 py-4 border-b border-noir-border">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-[14px] font-medium text-noir-black">{selectedMsg.name}</h3>
                    <p className="text-[11px] text-noir-gray mt-0.5">{selectedMsg.email} · {formatTime(selectedMsg.receivedAt)}</p>
                  </div>
                  <div className="flex gap-1.5">
                    <button onClick={() => markReplied(selectedMsg.id)} className="w-7 h-7 rounded border border-noir-border flex items-center justify-center text-noir-gray hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors cursor-pointer" aria-label="Mark replied"><Reply size={13} /></button>
                    <button onClick={() => setDeleteTarget(selectedMsg)} className="w-7 h-7 rounded border border-noir-border flex items-center justify-center text-noir-gray hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors cursor-pointer" aria-label="Delete"><Trash2 size={13} /></button>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-[13px] text-noir-black leading-relaxed">{selectedMsg.message}</p>
                <div className="mt-3">
                  <span className={`inline-flex px-2 py-0.5 rounded text-[9px] uppercase tracking-[1.5px] font-medium ${
                    selectedMsg.status === "unread" ? "bg-noir-red/10 text-noir-red" : selectedMsg.status === "replied" ? "bg-green-50 text-green-800" : "bg-noir-surface text-noir-gray"
                  }`}>{selectedMsg.status}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Mail size={32} className="text-noir-gray/30 mb-3" />
              <p className="text-[12px] text-noir-gray">Pilih pesan untuk membaca detail</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-noir-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg border border-noir-border w-full max-w-sm shadow-xl">
            <div className="px-5 py-4 border-b border-noir-border"><h3 className="text-[13px] font-medium text-noir-black">Hapus Pesan</h3></div>
            <div className="p-5"><p className="text-[12px] text-noir-gray">Hapus pesan dari &ldquo;{deleteTarget.name}&rdquo;?</p></div>
            <div className="px-5 py-3.5 border-t border-noir-border flex justify-end gap-2">
              <button onClick={() => setDeleteTarget(null)} className="px-4 py-2 text-[10px] uppercase tracking-[1px] font-medium border border-noir-border rounded text-noir-gray hover:bg-noir-surface cursor-pointer">Batal</button>
              <button onClick={handleDelete} className="px-4 py-2 text-[10px] uppercase tracking-[1px] font-medium bg-noir-red text-white rounded hover:bg-noir-red-dark cursor-pointer">Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
