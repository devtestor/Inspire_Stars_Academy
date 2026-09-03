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

export const revalidate = 60;

export default function HomePage() {
  return (
    <main>
      <Hero />
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
      <FinalCTA />
    </main>
  );
}
