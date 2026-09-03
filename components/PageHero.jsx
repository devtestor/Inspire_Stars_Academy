export default function PageHero({ eyebrow, title, accent, body, image, imageAlt = "" }) {
  return (
    <section className="page-hero">
      {image && <img src={image} alt={imageAlt} />}
      <div className="page-hero-film" />
      <div className="page-hero-content" data-reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h1>
          {title} <span>{accent}</span>
        </h1>
        <p>{body}</p>
      </div>
    </section>
  );
}
