import { setAdminSession, validateAdminCredentials, isAdminConfigured } from "@/lib/admin-auth";

export async function POST(request) {
  if (!isAdminConfigured()) {
    return Response.json({ error: "Admin credentials are not configured." }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!validateAdminCredentials(body.username, body.password)) {
    return Response.json({ error: "Invalid username or password." }, { status: 401 });
  }

  await setAdminSession(String(body.username).trim());
  return Response.json({ ok: true });
}
