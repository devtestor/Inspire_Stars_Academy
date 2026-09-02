import PageHero from "@/components/PageHero";
import { AthleteStories, Pathway } from "@/components/HomeSections";
import { athleteStories, images } from "@/content/siteContent";

export const metadata = {
  title: "Athletes",
  description: "Documented athlete development pathways and international exposure from Inspire Stars Academy Rwanda.",
};

export default function AthletesPage() {
  return (
    <main>
      <PageHero eyebrow="Athletes" title="Next Generation" accent="Profiles" body="Documented pathway examples from Rwanda into international development, scholarships and training exposure." image={images.award} />
      <AthleteStories />
      <Pathway />
      <section className="route-section">
        <div className="scout-grid">
          {athleteStories.map((story) => (
            <article key={story.title} data-reveal>
              <p>{story.meta}</p>
              <h3>{story.title}</h3>
              <span>{story.body}</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
