import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { get, head, put } from "@vercel/blob";
import { images, site } from "@/content/siteContent";

const cmsDirectory = path.join(process.cwd(), "data");
const cmsFile = path.join(cmsDirectory, "cms.json");
const cmsBlobPath = "isar/cms/content.json";
const defaultRequestOptions = ["Join the Academy", "Partner With Us", "School Partnership", "Sponsor Support", "International Opportunity"];
const defaultSettings = {
  site: {
    name: site.name,
    shortName: site.shortName,
    tagline: site.tagline,
    phone: site.phone,
    email: site.email,
    instagram: site.instagram,
    youtube: site.youtube,
    location: site.location,
    websiteLabel: "inspirestarsacademyrwanda.com",
    joinCtaLabel: "Join the Academy",
  },
  hero: {
    locationLabel: "Kigali • Rwanda",
    titleLineOne: "From",
    titleLineTwo: "Rwanda",
    accentLine: "to the",
    titleLineThree: "World.",
    body: "Developing young athletes through sport, education, discipline and global opportunity.",
    primaryCtaLabel: "Explore the Academy",
    primaryCtaHref: "/academy",
    secondaryCtaLabel: "Start Your Journey",
    secondaryCtaHref: "/join",
  },
  finalCta: {
    eyebrow: site.tagline,
    title: "Your Journey",
    accent: "Starts Here.",
    body: "For parents, athletes, schools and partners ready to build the next chapter with Inspire Stars Academy Rwanda.",
    primaryLabel: "Join the Academy",
    primaryHref: "/join",
    secondaryLabel: "Partner With Us",
    secondaryHref: "/partners",
    tertiaryLabel: "Contact the Academy",
    tertiaryHref: `tel:${site.phone.replaceAll(" ", "")}`,
  },
  contact: {
    eyebrow: "Contact the Academy",
    title: "Tell us what you want to build.",
    body: "Choose your request type and share the details. The academy team can follow up directly.",
    requestOptions: defaultRequestOptions,
  },
};

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
  settings: defaultSettings,
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

function sanitizeHref(value, fallback) {
  const input = sanitizeText(value);
  if (!input) return fallback;
  if (input.startsWith("/") || input.startsWith("http://") || input.startsWith("https://") || input.startsWith("mailto:") || input.startsWith("tel:")) {
    return input;
  }
  return fallback;
}

function sanitizeArray(values, fallback) {
  if (!Array.isArray(values)) return fallback;
  const next = values.map(sanitizeText).filter(Boolean);
  return next.length ? next : fallback;
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

function normalizeSettings(settings) {
  const siteSettings = settings?.site || {};
  const heroSettings = settings?.hero || {};
  const finalCtaSettings = settings?.finalCta || {};
  const contactSettings = settings?.contact || {};

  const phone = sanitizeText(siteSettings.phone) || defaultSettings.site.phone;
  const email = sanitizeText(siteSettings.email) || defaultSettings.site.email;

  return {
    site: {
      name: sanitizeText(siteSettings.name) || defaultSettings.site.name,
      shortName: sanitizeText(siteSettings.shortName) || defaultSettings.site.shortName,
      tagline: sanitizeText(siteSettings.tagline) || defaultSettings.site.tagline,
      phone,
      email,
      instagram: sanitizeHref(siteSettings.instagram, defaultSettings.site.instagram),
      youtube: sanitizeHref(siteSettings.youtube, defaultSettings.site.youtube),
      location: sanitizeText(siteSettings.location) || defaultSettings.site.location,
      websiteLabel: sanitizeText(siteSettings.websiteLabel) || defaultSettings.site.websiteLabel,
      joinCtaLabel: sanitizeText(siteSettings.joinCtaLabel) || defaultSettings.site.joinCtaLabel,
    },
    hero: {
      locationLabel: sanitizeText(heroSettings.locationLabel) || defaultSettings.hero.locationLabel,
      titleLineOne: sanitizeText(heroSettings.titleLineOne) || defaultSettings.hero.titleLineOne,
      titleLineTwo: sanitizeText(heroSettings.titleLineTwo) || defaultSettings.hero.titleLineTwo,
      accentLine: sanitizeText(heroSettings.accentLine) || defaultSettings.hero.accentLine,
      titleLineThree: sanitizeText(heroSettings.titleLineThree) || defaultSettings.hero.titleLineThree,
      body: sanitizeText(heroSettings.body) || defaultSettings.hero.body,
      primaryCtaLabel: sanitizeText(heroSettings.primaryCtaLabel) || defaultSettings.hero.primaryCtaLabel,
      primaryCtaHref: sanitizeHref(heroSettings.primaryCtaHref, defaultSettings.hero.primaryCtaHref),
      secondaryCtaLabel: sanitizeText(heroSettings.secondaryCtaLabel) || defaultSettings.hero.secondaryCtaLabel,
      secondaryCtaHref: sanitizeHref(heroSettings.secondaryCtaHref, defaultSettings.hero.secondaryCtaHref),
    },
    finalCta: {
      eyebrow: sanitizeText(finalCtaSettings.eyebrow) || defaultSettings.finalCta.eyebrow,
      title: sanitizeText(finalCtaSettings.title) || defaultSettings.finalCta.title,
      accent: sanitizeText(finalCtaSettings.accent) || defaultSettings.finalCta.accent,
      body: sanitizeText(finalCtaSettings.body) || defaultSettings.finalCta.body,
      primaryLabel: sanitizeText(finalCtaSettings.primaryLabel) || defaultSettings.finalCta.primaryLabel,
      primaryHref: sanitizeHref(finalCtaSettings.primaryHref, defaultSettings.finalCta.primaryHref),
      secondaryLabel: sanitizeText(finalCtaSettings.secondaryLabel) || defaultSettings.finalCta.secondaryLabel,
      secondaryHref: sanitizeHref(finalCtaSettings.secondaryHref, defaultSettings.finalCta.secondaryHref),
      tertiaryLabel: sanitizeText(finalCtaSettings.tertiaryLabel) || defaultSettings.finalCta.tertiaryLabel,
      tertiaryHref: sanitizeHref(finalCtaSettings.tertiaryHref, defaultSettings.finalCta.tertiaryHref),
    },
    contact: {
      eyebrow: sanitizeText(contactSettings.eyebrow) || defaultSettings.contact.eyebrow,
      title: sanitizeText(contactSettings.title) || defaultSettings.contact.title,
      body: sanitizeText(contactSettings.body) || defaultSettings.contact.body,
      requestOptions: sanitizeArray(contactSettings.requestOptions, defaultSettings.contact.requestOptions),
    },
  };
}

function normalizeCmsData(data) {
  return {
    news: sortByPublishedDate(Array.isArray(data.news) ? data.news.map(normalizeNewsItem).filter((item) => item.title && item.excerpt && item.image) : fallbackCmsData.news),
    gallery: sortByPublishedDate(Array.isArray(data.gallery) ? data.gallery.map(normalizeGalleryItem).filter((item) => item.title && item.image) : fallbackCmsData.gallery),
    settings: normalizeSettings(data.settings),
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

export async function getCmsSettings() {
  const data = await readCmsData();
  return data.settings;
}

export function cmsStorageMode() {
  return hasBlobConfig() ? "blob" : "local";
}
