import { getAdminSession, isAdminConfigured } from "@/lib/admin-auth";

export async function GET() {
  const session = await getAdminSession();

  return Response.json({
    configured: isAdminConfigured(),
    authenticated: Boolean(session),
    username: session?.username || null,
  });
}
