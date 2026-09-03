import PageHero from "@/components/PageHero";
import SplitHeading from "@/components/SplitHeading";
import { Impact, PeopleCommunity, Timeline } from "@/components/HomeSections";
import { academyPathways, images } from "@/content/siteContent";

export const metadata = {
  title: "Academy",
  description: "Learn how Inspire Stars Academy Rwanda develops young athletes through coaching, education, discipline, inclusion and opportunity.",
};

export default function AcademyPage() {
  return (
    <main>
      <PageHero eyebrow="Academy" title="Athlete Development" accent="Ecosystem" body="ISAR develops the complete young person through sport, education, mentorship, discipline and family support." image={images.leadership} imageAlt="Leadership meeting at Inspire Stars Academy" />
      <section className="route-section route-section-tight">
        <div className="route-intro" data-reveal>
          <SplitHeading eyebrow="Academy Mission" title="Built For" accent="Long-Term Growth" dark />
          <p>
            The academy is positioned as an athlete development ecosystem, not just a training ground. Every layer of the environment is designed to help young people grow through coaching, competition, education and support.
          </p>
        </div>
        <div className="route-grid">
          {academyPathways.map(([title, body]) => (
            <article key={title} data-reveal>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <Impact />
      <Timeline />
      <PeopleCommunity />
    </main>
  );
}
