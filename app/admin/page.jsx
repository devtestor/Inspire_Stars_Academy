import { redirect } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard";
import { getAdminSession, isAdminConfigured } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  if (!isAdminConfigured()) {
    redirect("/admin/login");
  }

  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return <AdminDashboard username={session.username} />;
}
