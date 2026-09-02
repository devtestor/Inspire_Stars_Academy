import { defineCliConfig } from "sanity/cli";

try {
  process.loadEnvFile?.(".env.local");
} catch {
  // The CLI can also receive environment variables directly from the shell.
}

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
});
