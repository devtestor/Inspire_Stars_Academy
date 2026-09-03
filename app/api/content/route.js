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
import { getPublishedGallery, getPublishedNews } from "@/lib/cms";

export async function GET() {
  return Response.json({
    site,
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
      news: await getPublishedNews(),
      gallery: await getPublishedGallery(),
    },
  });
}
