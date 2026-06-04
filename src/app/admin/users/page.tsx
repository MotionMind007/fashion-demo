import { Edit2, Trash2, Plus, Shield, Eye, PenTool } from "lucide-react";

const users = [
  {
    name: "Rizky Admin",
    email: "rizky@noir-studio.id",
    role: "Super Admin",
    initials: "RA",
    lastLogin: "Hari ini",
  },
  {
    name: "Anya Editor",
    email: "anya@noir-studio.id",
    role: "Editor",
    initials: "AE",
    lastLogin: "Kemarin",
  },
  {
    name: "Budi Viewer",
    email: "budi@noir-studio.id",
    role: "Viewer",
    initials: "BV",
    lastLogin: "3 hari lalu",
  },
];

const roleIcons: Record<string, typeof Shield> = {
  "Super Admin": Shield,
  Editor: PenTool,
  Viewer: Eye,
};

const roleBadgeClass: Record<string, string> = {
  "Super Admin": "bg-noir-red/10 text-noir-red",
  Editor: "bg-blue-50 text-blue-700",
  Viewer: "bg-noir-surface text-noir-gray",
};

export default function AdminUsers() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-[11px] text-noir-gray">
          Kelola akun admin dan hak akses.
        </p>
        <button className="inline-flex items-center gap-1.5 px-4 py-2 text-[11px] uppercase tracking-[1px] font-medium bg-noir-black text-noir-white rounded-md hover:bg-noir-black/90 transition-colors cursor-pointer">
          <Plus size={13} />
          Tambah User
        </button>
      </div>

      <div className="bg-white rounded-lg border border-noir-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="bg-noir-surface">
                <th className="text-left px-5 py-2.5 text-[9px] uppercase tracking-[2px] text-noir-gray font-medium border-b border-noir-border">
                  User
                </th>
                <th className="text-left px-4 py-2.5 text-[9px] uppercase tracking-[2px] text-noir-gray font-medium border-b border-noir-border">
                  Role
                </th>
                <th className="text-left px-4 py-2.5 text-[9px] uppercase tracking-[2px] text-noir-gray font-medium border-b border-noir-border">
                  Last Login
                </th>
                <th className="text-left px-4 py-2.5 text-[9px] uppercase tracking-[2px] text-noir-gray font-medium border-b border-noir-border w-20">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const RoleIcon = roleIcons[user.role] || Shield;
                return (
                  <tr
                    key={user.email}
                    className="border-b border-noir-border/40 last:border-b-0 hover:bg-noir-surface/50 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-noir-cream flex items-center justify-center text-[10px] font-medium text-noir-black shrink-0">
                          {user.initials}
                        </div>
                        <div>
                          <span className="block font-medium text-noir-black">
                            {user.name}
                          </span>
                          <span className="block text-[10px] text-noir-gray">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] uppercase tracking-[1.5px] font-medium ${roleBadgeClass[user.role]}`}
                      >
                        <RoleIcon size={10} />
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-noir-gray">{user.lastLogin}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex gap-1.5">
                        <button
                          className="w-7 h-7 rounded border border-noir-border flex items-center justify-center text-noir-gray hover:bg-noir-cream hover:text-noir-black transition-colors cursor-pointer"
                          aria-label={`Edit ${user.name}`}
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          className="w-7 h-7 rounded border border-noir-border flex items-center justify-center text-noir-gray hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors cursor-pointer"
                          aria-label={`Delete ${user.name}`}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
