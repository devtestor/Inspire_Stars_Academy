import PageHero from "@/components/PageHero";
import { GasaboLeague, Pillars, TrainingCenters } from "@/components/HomeSections";
import SplitHeading from "@/components/SplitHeading";
import { images, programBlueprint } from "@/content/siteContent";

export const metadata = {
  title: "Programs",
  description: "Structured academy, school partnership, elite pathway and sponsorship programs from Inspire Stars Academy Rwanda.",
};

export default function ProgramsPage() {
  return (
    <main>
      <PageHero eyebrow="Programs" title="Training With" accent="Purpose" body="Programs are built for parents, athletes, schools, sponsors and international partners." image={images.school} imageAlt="School-based program session" />
      <section className="route-section dark-route">
        <div className="route-intro" data-reveal>
          <SplitHeading eyebrow="Program Design" title="Clear Entry" accent="Points" />
          <p className="dark-copy">Each program is designed around a distinct audience and a defined result, so families and partners can understand where they fit immediately.</p>
        </div>
        <div className="route-grid">
          {programBlueprint.map(([title, body]) => (
            <article key={title} data-reveal>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <Pillars />
      <GasaboLeague />
      <TrainingCenters />
    </main>
  );
}
