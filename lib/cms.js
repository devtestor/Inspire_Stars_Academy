import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { get, head, put } from "@vercel/blob";
import { images } from "@/content/siteContent";

const cmsDirectory = path.join(process.cwd(), "data");
const cmsFile = path.join(cmsDirectory, "cms.json");
const cmsBlobPath = "isar/cms/content.json";

const fallbackCmsData = {
  news: [
    {
      id: "academy-news",
      slug: "academy-news",
      title: "Academy News",
      category: "Academy Update",
      excerpt: "Training updates, academy growth and development milestones from Kigali.",
      body: "Follow the latest academy milestones, training environments and multi-sport development activity from Inspire Stars Academy Rwanda.",
      image: images.football,
      alt: "Inspire Stars Academy football session",
      publishedAt: "2026-09-01T08:00:00.000Z",
      featured: true,
    },
    {
      id: "gasabo-private-school-league",
      slug: "gasabo-private-school-league",
      title: "Gasabo Private School League",
      category: "Competition",
      excerpt: "Nine private schools and more than 500 students came together through structured youth competition.",
      body: "The league was designed to build teamwork, leadership, sportsmanship and talent identification through football, basketball and swimming.",
      image: images.trophy,
      alt: "Inspire Stars Academy trophy celebration",
      publishedAt: "2026-08-28T08:00:00.000Z",
      featured: false,
    },
    {
      id: "international-opportunities",
      slug: "international-opportunities",
      title: "International Opportunities",
      category: "Global Pathway",
      excerpt: "Pathway activity continues across France, Germany, the United Kingdom and China.",
      body: "Inspire Stars Academy keeps building development routes that connect local talent with international education, training and scholarship opportunities.",
      image: images.hero,
      alt: "Inspire Stars Academy international travel moment",
      publishedAt: "2026-08-22T08:00:00.000Z",
      featured: false,
    },
  ],
  gallery: [
    {
      id: "gallery-football",
      title: "Football Development",
      caption: "Training and team-building sessions.",
      image: images.football,
      alt: "Football training at Inspire Stars Academy",
      publishedAt: "2026-09-01T08:00:00.000Z",
    },
    {
      id: "gallery-trophy",
      title: "Competition Moments",
      caption: "Team success and recognition.",
      image: images.trophy,
      alt: "Team trophy celebration at Inspire Stars Academy",
      publishedAt: "2026-08-29T08:00:00.000Z",
    },
    {
      id: "gallery-award",
      title: "Recognition",
      caption: "Athlete award and development highlights.",
      image: images.award,
      alt: "Award moment at Inspire Stars Academy",
      publishedAt: "2026-08-25T08:00:00.000Z",
    },
    {
      id: "gallery-certificate",
      title: "Certification",
      caption: "Progress and recognition through development programs.",
      image: images.certificate,
      alt: "Certificate ceremony at Inspire Stars Academy",
      publishedAt: "2026-08-23T08:00:00.000Z",
    },
    {
      id: "gallery-global",
      title: "Global Exposure",
      caption: "Travel and international opportunity.",
      image: images.hero,
      alt: "International exposure trip at Inspire Stars Academy",
      publishedAt: "2026-08-20T08:00:00.000Z",
    },
    {
      id: "gallery-school",
      title: "School Partnership",
      caption: "Student-athlete development environments.",
      image: images.school,
      alt: "School session with Inspire Stars Academy",
      publishedAt: "2026-08-18T08:00:00.000Z",
    },
  ],
};

function hasBlobConfig() {
  return Boolean(process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN);
}

function sortByPublishedDate(items) {
  return [...items].sort((left, right) => new Date(right.publishedAt || 0).getTime() - new Date(left.publishedAt || 0).getTime());
}

function sanitizeText(value) {
  return String(value || "").trim();
}

function normalizeNewsItem(item) {
  const title = sanitizeText(item.title);
  return {
    id: sanitizeText(item.id) || randomUUID(),
    slug: sanitizeText(item.slug) || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || randomUUID(),
    title,
    category: sanitizeText(item.category) || "Academy Update",
    excerpt: sanitizeText(item.excerpt),
    body: sanitizeText(item.body),
    image: sanitizeText(item.image),
    alt: sanitizeText(item.alt) || title || "Inspire Stars Academy news image",
    publishedAt: sanitizeText(item.publishedAt) || new Date().toISOString(),
    featured: Boolean(item.featured),
  };
}

function normalizeGalleryItem(item) {
  const title = sanitizeText(item.title);
  return {
    id: sanitizeText(item.id) || randomUUID(),
    title,
    caption: sanitizeText(item.caption),
    image: sanitizeText(item.image),
    alt: sanitizeText(item.alt) || title || "Inspire Stars Academy gallery image",
    publishedAt: sanitizeText(item.publishedAt) || new Date().toISOString(),
  };
}

function normalizeCmsData(data) {
  return {
    news: sortByPublishedDate(Array.isArray(data.news) ? data.news.map(normalizeNewsItem).filter((item) => item.title && item.excerpt && item.image) : fallbackCmsData.news),
    gallery: sortByPublishedDate(Array.isArray(data.gallery) ? data.gallery.map(normalizeGalleryItem).filter((item) => item.title && item.image) : fallbackCmsData.gallery),
  };
}

async function ensureCmsFile() {
  await fs.mkdir(cmsDirectory, { recursive: true });

  try {
    await fs.access(cmsFile);
  } catch {
    await fs.writeFile(cmsFile, JSON.stringify(fallbackCmsData, null, 2), "utf8");
  }
}

async function readLocalCmsData() {
  await ensureCmsFile();

  try {
    const raw = await fs.readFile(cmsFile, "utf8");
    return normalizeCmsData(JSON.parse(raw));
  } catch {
    return normalizeCmsData(fallbackCmsData);
  }
}

async function writeLocalCmsData(data) {
  const normalized = normalizeCmsData(data);
  await ensureCmsFile();
  await fs.writeFile(cmsFile, JSON.stringify(normalized, null, 2), "utf8");
  return normalized;
}

async function readBlobCmsData() {
  try {
    await head(cmsBlobPath);
  } catch {
    const seeded = normalizeCmsData(await readLocalCmsData());
    await writeBlobCmsData(seeded);
    return seeded;
  }

  try {
    const result = await get(cmsBlobPath, { access: "public", useCache: false });
    if (!result || result.statusCode !== 200 || !result.stream) {
      return normalizeCmsData(fallbackCmsData);
    }

    const raw = await new Response(result.stream).text();
    return normalizeCmsData(JSON.parse(raw));
  } catch {
    return normalizeCmsData(fallbackCmsData);
  }
}

async function writeBlobCmsData(data) {
  const normalized = normalizeCmsData(data);

  await put(cmsBlobPath, JSON.stringify(normalized, null, 2), {
    access: "public",
    allowOverwrite: true,
    contentType: "application/json; charset=utf-8",
    cacheControlMaxAge: 0,
  });

  return normalized;
}

export async function readCmsData() {
  if (hasBlobConfig()) {
    return readBlobCmsData();
  }

  return readLocalCmsData();
}

export async function writeCmsData(data) {
  if (hasBlobConfig()) {
    return writeBlobCmsData(data);
  }

  return writeLocalCmsData(data);
}

export async function storePublicImage({ filename, body, contentType }) {
  if (hasBlobConfig()) {
    const extension = path.extname(filename);
    const pathname = `isar/uploads/${Date.now()}-${randomUUID()}${extension}`;
    const blob = await put(pathname, body, {
      access: "public",
      addRandomSuffix: false,
      contentType,
      cacheControlMaxAge: 31536000,
    });

    return { path: blob.url, storage: "blob" };
  }

  const uploadDirectory = path.join(process.cwd(), "public", "uploads", "admin");
  await fs.mkdir(uploadDirectory, { recursive: true });

  const localFilename = `${Date.now()}-${randomUUID()}${path.extname(filename)}`;
  const targetPath = path.join(uploadDirectory, localFilename);
  await fs.writeFile(targetPath, Buffer.from(body));

  return { path: `/uploads/admin/${localFilename}`, storage: "local" };
}

export async function getPublishedNews() {
  const data = await readCmsData();
  const now = Date.now();
  return data.news.filter((item) => new Date(item.publishedAt).getTime() <= now);
}

export async function getPublishedGallery() {
  const data = await readCmsData();
  const now = Date.now();
  return data.gallery.filter((item) => new Date(item.publishedAt).getTime() <= now);
}

export function cmsStorageMode() {
  return hasBlobConfig() ? "blob" : "local";
}
