export default function SplitHeading({ eyebrow, title, accent, dark = false }) {
  return (
    <div className="section-heading" data-reveal>
      <p className={`eyebrow ${dark ? "dark" : ""}`}>{eyebrow}</p>
      <h2>
        {title} <span>{accent}</span>
      </h2>
    </div>
  );
}
