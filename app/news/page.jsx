import PageHero from "@/components/PageHero";
import { images, newsCards } from "@/content/siteContent";
import { getPublishedNews } from "@/lib/cms";

export const revalidate = 60;

export const metadata = {
  title: "News",
  description: "Academy news, tournament reports, athlete stories and international opportunity updates from Inspire Stars Academy Rwanda.",
};

export default async function NewsPage() {
  const cmsPosts = await getPublishedNews();
  const displayedPosts = cmsPosts.length ? cmsPosts : newsCards.map(([title, body, image]) => ({ title, excerpt: body, body, category: title, image, alt: `${title} at Inspire Stars Academy`, featured: false }));
  const featuredPost = displayedPosts.find((post) => post.featured) || displayedPosts[0];
  const archivePosts = displayedPosts.filter((post) => post !== featuredPost);

  return (
    <main>
      <PageHero eyebrow="News" title="Stories From" accent="The Journey" body="Academy news, tournament reports, athlete stories, training camps and community impact." image={images.certificate} imageAlt="Certificate and academy recognition moment" />
      <section className="route-section route-section-tight">
        {featuredPost && (
          <article className="feature-story" data-reveal>
            <img src={featuredPost.image} alt={featuredPost.alt || featuredPost.title} />
            <div>
              <p className="eyebrow dark">{featuredPost.category}</p>
              <h2>{featuredPost.title}</h2>
              <p>{featuredPost.body || featuredPost.excerpt}</p>
            </div>
          </article>
        )}
      </section>
      <section className="route-section">
        <div className="section-heading" data-reveal>
          <p className="eyebrow dark">Story Archive</p>
          <h2>Latest Academy Coverage</h2>
        </div>
        <div className="news-grid" aria-live="polite">
          {archivePosts.map((post) => (
            <article className="news-card" key={post._id || post.title} data-reveal>
              <img src={post.image} alt={post.alt || `${post.title} at Inspire Stars Academy`} loading="lazy" />
              <div>
                <p>{post.category}</p>
                <h3>{post.title}</h3>
                <span>{post.excerpt}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
