import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const cookieName = "isar_admin_session";
const sessionLifetime = 60 * 60 * 24 * 7;

function getAuthConfig() {
  return {
    username: process.env.ADMIN_USERNAME || process.env.ADMIN_EMAIL || "",
    password: process.env.ADMIN_PASSWORD || "",
    secret: process.env.ADMIN_SESSION_SECRET || "",
  };
}

function toBase64Url(value) {
  return Buffer.from(value).toString("base64url");
}

function fromBase64Url(value) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(value, secret) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function safeCompare(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) return false;
  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function isAdminConfigured() {
  const config = getAuthConfig();
  return Boolean(config.username && config.password && config.secret);
}

export function validateAdminCredentials(username, password) {
  const config = getAuthConfig();

  if (!isAdminConfigured()) return false;

  return safeCompare(String(username || "").trim(), config.username) && safeCompare(String(password || ""), config.password);
}

function createSessionToken(username) {
  const config = getAuthConfig();
  const payload = JSON.stringify({
    username,
    expiresAt: Date.now() + sessionLifetime * 1000,
  });
  const encodedPayload = toBase64Url(payload);
  const signature = sign(encodedPayload, config.secret);
  return `${encodedPayload}.${signature}`;
}

function readSessionToken(token) {
  const config = getAuthConfig();
  if (!token || !config.secret) return null;

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return null;

  const expectedSignature = sign(encodedPayload, config.secret);
  if (!safeCompare(signature, expectedSignature)) return null;

  try {
    const payload = JSON.parse(fromBase64Url(encodedPayload));
    if (!payload?.username || !payload?.expiresAt || payload.expiresAt < Date.now()) {
      return null;
    }

    return { username: payload.username };
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  if (!isAdminConfigured()) return null;

  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName)?.value;
  return readSessionToken(token);
}

export async function setAdminSession(username) {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, createSessionToken(username), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionLifetime,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
