import PageHero from "@/components/PageHero";
import { AthleteStories, Pathway } from "@/components/HomeSections";
import SplitHeading from "@/components/SplitHeading";
import { athletePrinciples, athleteStories, images } from "@/content/siteContent";

export const metadata = {
  title: "Athletes",
  description: "Documented athlete development pathways and international exposure from Inspire Stars Academy Rwanda.",
};

export default function AthletesPage() {
  return (
    <main>
      <PageHero eyebrow="Athletes" title="Next Generation" accent="Profiles" body="Documented pathway examples from Rwanda into international development, scholarships and training exposure." image={images.award} imageAlt="Athlete recognition moment" />
      <section className="route-section route-section-tight">
        <div className="route-intro" data-reveal>
          <SplitHeading eyebrow="Profile Standard" title="Scouting" accent="Perspective" dark />
          <p>The athlete section should read like a serious development pipeline. That means clarity, documented outcomes and stronger editorial structure around each progression story.</p>
        </div>
        <div className="route-grid">
          {athletePrinciples.map(([title, body]) => (
            <article key={title} data-reveal>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <AthleteStories />
      <Pathway />
      <section className="route-section">
        <div className="section-heading" data-reveal>
          <p className="eyebrow dark">Verified Examples</p>
          <h2>Progression Notes</h2>
        </div>
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
