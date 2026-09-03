import { getAdminSession } from "@/lib/admin-auth";
import { storePublicImage } from "@/lib/cms";

function getExtension(filename) {
  const match = String(filename || "").toLowerCase().match(/\.(png|jpg|jpeg|webp|avif)$/);
  return match ? match[0] : "";
}

export async function POST(request) {
  const session = await getAdminSession();
  if (!session) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");

  if (!(file instanceof File)) {
    return Response.json({ error: "No file uploaded." }, { status: 400 });
  }

  const extension = getExtension(file.name);
  if (!extension) {
    return Response.json({ error: "Use PNG, JPG, WEBP or AVIF images." }, { status: 415 });
  }

  const result = await storePublicImage({
    filename: file.name,
    body: await file.arrayBuffer(),
    contentType: file.type || `image/${extension.slice(1)}`,
  });

  return Response.json(result);
}
