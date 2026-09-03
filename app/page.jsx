import {
  ArsenalExperience,
  AthleteStories,
  FinalCTA,
  GasaboLeague,
  Hero,
  Impact,
  PartnersNewsInstagram,
  Pathway,
  PeopleCommunity,
  Pillars,
  SportsCarousel,
  Sponsorship,
  Timeline,
  TrainingCenters,
} from "@/components/HomeSections";
import { getCmsSettings } from "@/lib/cms";

export const revalidate = 60;

export default async function HomePage() {
  const settings = await getCmsSettings();

  return (
    <main>
      <Hero settings={settings} />
      <Impact />
      <Timeline />
      <SportsCarousel />
      <Pillars />
      <Pathway />
      <AthleteStories />
      <ArsenalExperience />
      <GasaboLeague />
      <TrainingCenters />
      <PeopleCommunity />
      <Sponsorship />
      <PartnersNewsInstagram />
      <FinalCTA settings={settings} />
    </main>
  );
}
