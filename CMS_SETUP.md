# ISAR Dashboard Setup

The website now uses a first-party admin dashboard instead of Sanity.

## Environment variables

Add these values to `.env.local` for local development and to your hosting provider for production:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change-this
ADMIN_SESSION_SECRET=replace-with-a-long-random-string
BLOB_READ_WRITE_TOKEN=
CONTACT_WEBHOOK_URL=
```

## Start the app

```bash
npm install
npm run dev
```

The public site runs through the main Next.js app. The admin dashboard is available at `/admin/login`.

## Dashboard behavior

- News stories and gallery images are stored in `data/cms.json`
- Uploaded images are written to `public/uploads/admin/`
- Content updates revalidate `/`, `/news`, and `/partners`

## Durable production storage

For Vercel deployments, connect a Vercel Blob store to the project. Vercel's Blob docs state that connected projects receive `BLOB_STORE_ID` and `VERCEL_OIDC_TOKEN` automatically, and local development works after `vercel env pull`. This app also supports `BLOB_READ_WRITE_TOKEN` as a manual fallback.

When Blob is connected:

- CMS content is stored in `isar/cms/content.json`
- Uploaded images are stored under `isar/uploads/`
- The dashboard automatically switches from local disk to Blob-backed storage

## Local fallback

If Blob is not configured, the app falls back to local files:

- Content: `data/cms.json`
- Uploads: `public/uploads/admin/`
