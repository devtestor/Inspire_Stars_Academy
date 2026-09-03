import PageHero from "@/components/PageHero";
import SportsCarousel from "@/components/SportsCarousel";
import SplitHeading from "@/components/SplitHeading";
import { sports, sportsFramework, images } from "@/content/siteContent";

export const metadata = {
  title: "Sports",
  description: "Football, basketball, swimming, table tennis, karate, taekwondo and badminton development at Inspire Stars Academy Rwanda.",
};

export default function SportsPage() {
  return (
    <main>
      <PageHero eyebrow="Sports" title="Multi-Sport" accent="Development" body="A premium training environment for football, basketball, swimming, table tennis, karate, taekwondo and badminton." image={images.football} imageAlt="Football training at Inspire Stars Academy" />
      <SportsCarousel heading={false} />
      <section className="route-section">
        <div className="route-intro" data-reveal>
          <SplitHeading eyebrow="Sports Model" title="How Training" accent="Is Built" dark />
          <p>The academy uses a shared performance model across every discipline, then adapts the work to the technical needs of each sport.</p>
        </div>
        <div className="route-grid">
          {sportsFramework.map(([title, body]) => (
            <article key={title} data-reveal>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="route-section route-section-tight">
        <div className="section-heading" data-reveal>
          <p className="eyebrow dark">Disciplines</p>
          <h2>Each Sport Has A Clear Role</h2>
        </div>
        <div className="route-grid">
          {sports.map(([name, , body]) => (
            <article key={name} data-reveal>
              <h3>{name}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
