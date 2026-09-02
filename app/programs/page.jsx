import PageHero from "@/components/PageHero";
import { GasaboLeague, Pillars, TrainingCenters } from "@/components/HomeSections";
import { images, programs } from "@/content/siteContent";

export const metadata = {
  title: "Programs",
  description: "Structured academy, school partnership, elite pathway and sponsorship programs from Inspire Stars Academy Rwanda.",
};

export default function ProgramsPage() {
  return (
    <main>
      <PageHero eyebrow="Programs" title="Training With" accent="Purpose" body="Programs are built for parents, athletes, schools, sponsors and international partners." image={images.school} />
      <section className="route-section dark-route">
        <div className="route-grid">
          {programs.map(([title, body]) => (
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
