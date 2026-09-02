import PageHero from "@/components/PageHero";
import { PartnersNewsInstagram } from "@/components/HomeSections";
import { images, newsCards } from "@/content/siteContent";

export const metadata = {
  title: "News",
  description: "Academy news, tournament reports, athlete stories and international opportunity updates from Inspire Stars Academy Rwanda.",
};

export default function NewsPage() {
  return (
    <main>
      <PageHero eyebrow="News" title="Stories From" accent="The Journey" body="Academy news, tournament reports, athlete stories, training camps and community impact." image={images.certificate} />
      <section className="route-section">
        <div className="news-grid">
          {newsCards.map(([title, body, image]) => (
            <article className="news-card" key={title} data-reveal>
              <img src={image} alt={`${title} at Inspire Stars Academy`} loading="lazy" />
              <div>
                <p>{title}</p>
                <h3>{body}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>
      <PartnersNewsInstagram />
    </main>
  );
}
