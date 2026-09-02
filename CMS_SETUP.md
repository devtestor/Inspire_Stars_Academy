# Inspire Stars Academy CMS

The admin content editor is Sanity Studio. It is kept separate from the public Next.js bundle so the website stays fast.

## Create the Sanity project

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage).
2. Choose the `production` dataset.
3. Copy the project ID into a local `.env.local` file. The project ID is available in the Sanity project settings:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_STUDIO_PROJECT_ID=your-project-id
```

4. Sign in with `npx sanity login`.
5. Start the editor with `npm run studio`.
6. Publish the Studio with `npm run studio:deploy` when it is ready for staff use.

The public News page automatically displays published Sanity posts. Until the environment variables are configured, it continues showing the built-in academy stories.

## Available content

- `News post`: title, category, excerpt, rich-text story, cover image, alt text, publish date and homepage feature flag.
- `Gallery image`: image, alt text, caption and publish date.

Add the same `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` values to Vercel under Project Settings > Environment Variables, then redeploy the website.
