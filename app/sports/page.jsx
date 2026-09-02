import PageHero from "@/components/PageHero";
import SportsCarousel from "@/components/SportsCarousel";
import { sports, images } from "@/content/siteContent";

export const metadata = {
  title: "Sports",
  description: "Football, basketball, swimming, table tennis, karate, taekwondo and badminton development at Inspire Stars Academy Rwanda.",
};

export default function SportsPage() {
  return (
    <main>
      <PageHero eyebrow="Sports" title="Multi-Sport" accent="Development" body="A premium training environment for football, basketball, swimming, table tennis, karate, taekwondo and badminton." image={images.football} />
      <SportsCarousel heading={false} />
      <section className="route-section">
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
