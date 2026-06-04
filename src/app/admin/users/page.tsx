"use client";

import { useState } from "react";
import { Edit2, Trash2, Plus, X, Shield, PenTool, Eye } from "lucide-react";
import { useAdminStore, AdminUser } from "@/store/admin";

type FormData = { name: string; email: string; role: AdminUser["role"] };
const emptyForm: FormData = { name: "", email: "", role: "Viewer" };

export default function AdminUsers() {
  const { users, addUser, updateUser, deleteUser } = useAdminStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const openAdd = () => { setEditingId(null); setFormData(emptyForm); setShowForm(true); };
  const openEdit = (user: AdminUser) => {
    setEditingId(user.id);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.email) { showToast("Nama dan Email wajib diisi!"); return; }
    const initials = formData.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    if (editingId) {
      updateUser(editingId, { ...formData, initials });
      showToast(`User "${formData.name}" berhasil diupdate.`);
    } else {
      addUser({ ...formData, initials, lastLogin: "Belum pernah" });
      showToast(`User "${formData.name}" berhasil ditambahkan.`);
    }
    setShowForm(false); setEditingId(null); setFormData(emptyForm);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteUser(deleteTarget.id);
    showToast(`User "${deleteTarget.name}" berhasil dihapus.`);
    setDeleteTarget(null);
  };

  const roleIcon = (role: string) => {
    switch (role) { case "Super Admin": return <Shield size={10} />; case "Editor": return <PenTool size={10} />; default: return <Eye size={10} />; }
  };
  const roleBadge = (role: string) => {
    switch (role) { case "Super Admin": return "bg-noir-red/10 text-noir-red"; case "Editor": return "bg-blue-50 text-blue-700"; default: return "bg-noir-surface text-noir-gray"; }
  };

  return (
    <div className="space-y-5">
      {toast && (
        <div className="bg-noir-black text-noir-white px-4 py-2.5 rounded-md text-[12px] flex items-center gap-2 border-l-3 border-l-noir-red">
          <span className="text-noir-red">✓</span> {toast}
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-[11px] text-noir-gray">Kelola akun admin dan hak akses.</p>
        <button onClick={openAdd} className="inline-flex items-center gap-1.5 px-4 py-2 text-[11px] uppercase tracking-[1px] font-medium bg-noir-black text-noir-white rounded-md hover:bg-noir-black/90 transition-colors cursor-pointer">
          <Plus size={13} /> Tambah User
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg border border-noir-border overflow-hidden">
          <div className="px-5 py-3.5 border-b border-noir-border flex items-center justify-between">
            <h3 className="text-[12px] font-medium text-noir-black">{editingId ? "Edit User" : "User Baru"}</h3>
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="text-noir-gray hover:text-noir-black cursor-pointer"><X size={16} /></button>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-[9px] uppercase tracking-[2px] text-noir-gray font-medium mb-1.5">Nama Lengkap *</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2.5 text-[12px] bg-noir-surface border border-noir-border rounded-md outline-none focus:border-noir-black/30" />
            </div>
            <div>
              <label className="block text-[9px] uppercase tracking-[2px] text-noir-gray font-medium mb-1.5">Email *</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-3 py-2.5 text-[12px] bg-noir-surface border border-noir-border rounded-md outline-none focus:border-noir-black/30" />
            </div>
            <div>
              <label className="block text-[9px] uppercase tracking-[2px] text-noir-gray font-medium mb-1.5">Role</label>
              <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value as AdminUser["role"] })} className="w-full px-3 py-2.5 text-[12px] bg-noir-surface border border-noir-border rounded-md cursor-pointer">
                <option value="Super Admin">Super Admin</option><option value="Editor">Editor</option><option value="Viewer">Viewer</option>
              </select>
            </div>
          </div>
          <div className="px-5 py-3.5 border-t border-noir-border flex justify-end gap-2">
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="px-4 py-2 text-[10px] uppercase tracking-[1px] font-medium border border-noir-border rounded text-noir-gray hover:bg-noir-surface cursor-pointer">Batal</button>
            <button onClick={handleSave} className="px-4 py-2 text-[10px] uppercase tracking-[1px] font-medium bg-noir-red text-white rounded hover:bg-noir-red-dark cursor-pointer">Simpan</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg border border-noir-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="bg-noir-surface">
                <th className="text-left px-5 py-2.5 text-[9px] uppercase tracking-[2px] text-noir-gray font-medium border-b border-noir-border">User</th>
                <th className="text-left px-4 py-2.5 text-[9px] uppercase tracking-[2px] text-noir-gray font-medium border-b border-noir-border">Role</th>
                <th className="text-left px-4 py-2.5 text-[9px] uppercase tracking-[2px] text-noir-gray font-medium border-b border-noir-border">Last Login</th>
                <th className="text-left px-4 py-2.5 text-[9px] uppercase tracking-[2px] text-noir-gray font-medium border-b border-noir-border w-20">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-noir-border/40 last:border-b-0 hover:bg-noir-surface/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-noir-cream flex items-center justify-center text-[10px] font-medium text-noir-black shrink-0">{user.initials}</div>
                      <div><span className="block font-medium text-noir-black">{user.name}</span><span className="block text-[10px] text-noir-gray">{user.email}</span></div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5"><span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] uppercase tracking-[1.5px] font-medium ${roleBadge(user.role)}`}>{roleIcon(user.role)}{user.role}</span></td>
                  <td className="px-4 py-3.5 text-noir-gray">{user.lastLogin}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex gap-1.5">
                      <button onClick={() => openEdit(user)} className="w-7 h-7 rounded border border-noir-border flex items-center justify-center text-noir-gray hover:bg-noir-cream hover:text-noir-black transition-colors cursor-pointer"><Edit2 size={13} /></button>
                      <button onClick={() => setDeleteTarget(user)} className="w-7 h-7 rounded border border-noir-border flex items-center justify-center text-noir-gray hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors cursor-pointer"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-noir-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg border border-noir-border w-full max-w-sm shadow-xl">
            <div className="px-5 py-4 border-b border-noir-border"><h3 className="text-[13px] font-medium text-noir-black">Hapus User</h3></div>
            <div className="p-5"><p className="text-[12px] text-noir-gray">Hapus user &ldquo;{deleteTarget.name}&rdquo;?</p></div>
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
