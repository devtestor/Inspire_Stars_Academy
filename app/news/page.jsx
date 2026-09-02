import PageHero from "@/components/PageHero";
import { PartnersNewsInstagram } from "@/components/HomeSections";
import { images, newsCards } from "@/content/siteContent";
import { fetchNewsPosts } from "@/lib/sanity";

export const metadata = {
  title: "News",
  description: "Academy news, tournament reports, athlete stories and international opportunity updates from Inspire Stars Academy Rwanda.",
};

export default async function NewsPage() {
  const cmsPosts = await fetchNewsPosts();

  return (
    <main>
      <PageHero eyebrow="News" title="Stories From" accent="The Journey" body="Academy news, tournament reports, athlete stories, training camps and community impact." image={images.certificate} />
      <section className="route-section">
        <div className="news-grid" aria-live="polite">
          {(cmsPosts.length ? cmsPosts : newsCards.map(([title, body, image]) => ({ title, excerpt: body, category: title, image, alt: `${title} at Inspire Stars Academy` }))).map((post) => (
            <article className="news-card" key={post._id || post.title} data-reveal>
              <img src={post.image} alt={post.alt || `${post.title} at Inspire Stars Academy`} loading="lazy" />
              <div>
                <p>{post.category}</p>
                <h3>{post.excerpt}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>
      <PartnersNewsInstagram />
    </main>
  );
}
