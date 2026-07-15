import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import "@/styles/admin.css";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="admin-shell flex">
      <AdminSidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <AdminTopbar email={session.email} />
        <main className="admin-main">{children}</main>
      </div>
    </div>
  );
}