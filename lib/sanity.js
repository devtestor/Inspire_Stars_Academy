export const hasSanityConfig = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);

export async function fetchNewsPosts() {
  if (!hasSanityConfig) return [];

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const query = encodeURIComponent(`*[_type == "newsPost" && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) {
    _id, title, category, excerpt, publishedAt,
    "image": coverImage.asset->url,
    "alt": coverImage.alt
  }`);
  const response = await fetch(`https://${projectId}.api.sanity.io/v2026-01-01/data/query/${dataset}?query=${query}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) return [];
  const payload = await response.json();
  return payload.result || [];
}
