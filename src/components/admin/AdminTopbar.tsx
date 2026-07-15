"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function AdminTopbar({ email }: { email: string }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const initial = email?.[0]?.toUpperCase() ?? "A";

  return (
    <header className="admin-topbar">
      <span className="text-sm text-gray-500 md:hidden font-semibold">
        VBC Admin
      </span>
      <div className="ml-auto flex items-center gap-4">
        <div className="admin-topbar-user">
          <div className="admin-topbar-avatar">{initial}</div>
          <span className="text-sm text-gray-600 hidden sm:inline">{email}</span>
        </div>
        <button onClick={handleLogout} className="admin-logout-btn">
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </header>
  );
}
