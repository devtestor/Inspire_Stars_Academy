import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/admin-auth";
import { cmsStorageMode, readCmsData, writeCmsData } from "@/lib/cms";

function revalidatePublicPages() {
  revalidatePath("/");
  revalidatePath("/news");
  revalidatePath("/partners");
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  const content = await readCmsData();
  return Response.json({ ...content, storageMode: cmsStorageMode() });
}

export async function PUT(request) {
  const session = await getAdminSession();
  if (!session) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const content = await writeCmsData(body);
  revalidatePublicPages();
  return Response.json({ ...content, storageMode: cmsStorageMode() });
}
