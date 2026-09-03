export const hasSanityConfig = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);

async function fetchSanityQuery(query) {
  if (!hasSanityConfig) return [];

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const url = `https://${projectId}.api.sanity.io/v2026-01-01/data/query/${dataset}?query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) return [];

    const payload = await response.json();
    return payload.result || [];
  } catch {
    return [];
  }
}

export async function fetchNewsPosts() {
  return fetchSanityQuery(`*[_type == "newsPost" && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) {
    _id, title, category, excerpt, publishedAt,
    "image": coverImage.asset->url,
    "alt": coverImage.alt
  }`);
}

export async function fetchGalleryImages() {
  return fetchSanityQuery(`*[_type == "galleryImage" && defined(image) && (!defined(publishedAt) || publishedAt <= now())] | order(publishedAt desc) {
    _id, title, caption,
    "image": image.asset->url,
    "alt": image.alt
  }`);
}
