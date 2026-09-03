import {
  athleteStories,
  centers,
  countries,
  impactStats,
  navItems,
  newsCards,
  partnerGroups,
  pillars,
  programs,
  site,
  sponsorBenefits,
  sports,
  timeline,
} from "@/content/siteContent";
import { getCmsSettings, getPublishedGallery, getPublishedNews } from "@/lib/cms";

export async function GET() {
  const settings = await getCmsSettings();

  return Response.json({
    site: {
      ...site,
      ...settings.site,
    },
    navItems,
    impactStats,
    timeline,
    sports,
    pillars,
    countries,
    athleteStories,
    centers,
    sponsorBenefits,
    partnerGroups,
    newsCards,
    programs,
    cms: {
      settings,
      news: await getPublishedNews(),
      gallery: await getPublishedGallery(),
    },
  });
}
