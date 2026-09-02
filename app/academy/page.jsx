import PageHero from "@/components/PageHero";
import SplitHeading from "@/components/SplitHeading";
import { Impact, PeopleCommunity, Timeline } from "@/components/HomeSections";
import { images, programs } from "@/content/siteContent";

export const metadata = {
  title: "Academy",
  description: "Learn how Inspire Stars Academy Rwanda develops young athletes through coaching, education, discipline, inclusion and opportunity.",
};

export default function AcademyPage() {
  return (
    <main>
      <PageHero eyebrow="Academy" title="Athlete Development" accent="Ecosystem" body="ISAR develops the complete young person through sport, education, mentorship, discipline and family support." image={images.leadership} />
      <Impact />
      <Timeline />
      <section className="route-section">
        <SplitHeading eyebrow="Who We Serve" title="Clear" accent="Pathways" dark />
        <div className="route-grid">
          {programs.map(([title, body]) => (
            <article key={title} data-reveal>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <PeopleCommunity />
    </main>
  );
}
