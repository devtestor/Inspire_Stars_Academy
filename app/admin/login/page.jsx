import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/AdminLoginForm";
import { getAdminSession, isAdminConfigured } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Login",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage() {
  if (!isAdminConfigured()) {
    return (
      <main className="admin-auth-page">
        <section className="admin-auth-card">
          <p className="eyebrow dark">Dashboard Setup</p>
          <h1>Admin credentials missing</h1>
          <p>Add `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET` to your environment before using the dashboard.</p>
        </section>
      </main>
    );
  }

  const session = await getAdminSession();
  if (session) redirect("/admin");

  return (
    <main className="admin-auth-page">
      <section className="admin-auth-card admin-auth-layout">
        <div className="admin-auth-copy">
          <p className="eyebrow dark">Private Dashboard</p>
          <h1>Editorial Sign In</h1>
          <p>Access the academy publishing workspace to manage site stories, gallery media and homepage updates.</p>
          <div className="admin-auth-signals" aria-hidden="true">
            <span>News publishing</span>
            <span>Gallery updates</span>
            <span>Blob-backed media</span>
          </div>
        </div>
        <AdminLoginForm />
      </section>
    </main>
  );
}
