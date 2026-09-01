import React from "react";
import { createRoot } from "react-dom/client";
import { Instagram, Menu, X } from "lucide-react";
import "./styles.css";

const logo = "/assets/logo/WhatsApp Image 2026-09-01 at 7.29.02 AM.jpeg";

const images = {
  hero: "/assets/img/WhatsApp Image 2026-09-01 at 7.28.01 AM(1).jpeg",
  mobileHero: "/assets/img/WhatsApp Image 2026-09-01 at 7.27.59 AM.jpeg",
  meeting: "/assets/img/WhatsApp Image 2026-09-01 at 7.28.01 AM.jpeg",
  teamGreen: "/assets/img/WhatsApp Image 2026-09-01 at 7.27.59 AM.jpeg",
  trophyTeam: "/assets/img/WhatsApp Image 2026-09-01 at 7.27.58 AM(1).jpeg",
  trophyAward: "/assets/img/WhatsApp Image 2026-09-01 at 7.27.59 AM(1).jpeg",
  certificate: "/assets/img/WhatsApp Image 2026-09-01 at 7.28.00 AM.jpeg",
  gathering: "/assets/img/WhatsApp Image 2026-09-01 at 7.28.00 AM(1).jpeg",
};

const navItems = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Pathway", href: "#pathway" },
  { label: "Gallery", href: "#gallery" },
];

const stats = [
  { value: "197", label: "players in the academy" },
  { value: "15+", label: "nationalities represented" },
  { value: "Europe", label: "scouting exposure pathway" },
];

const programs = [
  {
    title: "Football Technique",
    body: "Ball mastery, passing, movement, finishing, defending, and match habits taught through age-aware sessions.",
  },
  {
    title: "Character and Discipline",
    body: "Players are coached to bring consistency, humility, respect, responsibility, and focus into every session.",
  },
  {
    title: "Education First",
    body: "Sport is treated as a partner to school, helping young athletes build confidence, ambition, and strong decision-making.",
  },
  {
    title: "International Exposure",
    body: "Promising players are prepared for scouting tours, academy visits, and opportunities to be seen outside Rwanda.",
  },
];

const pathwayItems = [
  { title: "Amahoro Stadium", body: "Regular training environment" },
  { title: "Zaria Court", body: "Additional sessions and academy activity" },
  { title: "Scouting Tours", body: "Exposure for selected young players" },
];

const values = [
  { title: "Discipline", body: "Talent grows when training habits are reliable." },
  { title: "Teamwork", body: "Players learn to compete together and lead together." },
  { title: "Confidence", body: "Young athletes build belief through preparation and results." },
  { title: "Vision", body: "Every player is encouraged to dream beyond their surroundings." },
];

const gallery = [
  { src: images.teamGreen, alt: "Young academy football players in bright green kits" },
  { src: images.trophyTeam, alt: "Inspire Stars youth team celebrating with a trophy" },
  { src: images.trophyAward, alt: "Young player receiving a trophy and medal" },
  { src: images.certificate, alt: "Young player receiving a certificate and medal" },
  { src: images.gathering, alt: "Academy players seated during an organized activity" },
  { src: images.hero, alt: "Academy group on a European exposure visit" },
];

function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`site-header ${isScrolled ? "is-scrolled" : ""} ${isOpen ? "menu-open" : ""}`}>
      <a className="brand" href="#home" aria-label="Inspire Stars Academy Rwanda home" onClick={closeMenu}>
        <img src={logo} alt="Inspire Stars Academy Rwanda logo" />
        <span>Inspire Stars</span>
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <X size={22} strokeWidth={2.4} /> : <Menu size={22} strokeWidth={2.4} />}
      </button>

      <nav className={`site-nav ${isOpen ? "is-open" : ""}`}>
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={closeMenu}>
            {item.label}
          </a>
        ))}
        <a className="nav-cta" href="#join" onClick={closeMenu}>
          Join
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <picture>
        <source media="(max-width: 760px)" srcSet={images.mobileHero} />
        <img src={images.hero} alt="Inspire Stars Academy players on an international exposure visit in Paris" />
      </picture>
      <div className="hero-shade" />
      <div className="hero-content">
        <p className="eyebrow">Kigali, Rwanda</p>
        <h1>Inspire Stars Academy Rwanda</h1>
        <p className="hero-copy">
          Where young players grow through football training, discipline, education, values, teamwork, and global exposure.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#join">
            Start the journey
          </a>
          <a className="button button-secondary" href="#programs">
            Explore training
          </a>
        </div>
      </div>
      <aside className="hero-panel" aria-label="Academy highlights">
        {stats.map((stat) => (
          <div key={stat.value}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </aside>
    </section>
  );
}

function Programs() {
  return (
    <section className="section" id="programs">
      <div className="section-inner">
        <div className="section-heading">
          <p className="eyebrow dark">Training focus</p>
          <h2>Complete development, on and off the pitch.</h2>
        </div>
        <div className="program-grid">
          {programs.map((program, index) => (
            <article className="program-card" key={program.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{program.title}</h3>
              <p>{program.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pathway() {
  return (
    <section className="feature-section" id="pathway">
      <div className="feature-media">
        <img src={images.meeting} alt="Academy representatives during a football development meeting" />
      </div>
      <div className="feature-copy">
        <p className="eyebrow">Player pathway</p>
        <h2>Local training with an international outlook.</h2>
        <p>
          The academy has created pathways for young footballers to travel for exposure and scouting in Europe, including
          Germany and France. That pathway begins with daily habits in Kigali: punctual training, coachability, fitness,
          teamwork, and academic commitment.
        </p>
        <div className="pathway-list">
          {pathwayItems.map((item) => (
            <div key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.body}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="section values-section">
      <div className="section-inner values-grid">
        <div className="value-intro">
          <p className="eyebrow dark">Academy values</p>
          <h2>The standard is bigger than talent.</h2>
        </div>
        <div className="value-list">
          {values.map((value) => (
            <div key={value.title}>
              <h3>{value.title}</h3>
              <p>{value.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="gallery-section" id="gallery" aria-label="Academy gallery">
      <div className="section-inner">
        <div className="section-heading compact">
          <p className="eyebrow">Moments</p>
          <h2>Training, recognition, travel, and team pride.</h2>
        </div>
        <div className="photo-grid">
          {gallery.map((photo) => (
            <img key={photo.src} src={photo.src} alt={photo.alt} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Join() {
  return (
    <section className="join-section" id="join">
      <div className="join-content">
        <p className="eyebrow dark">Join the academy</p>
        <h2>Ready to train with purpose?</h2>
        <p>
          Families, young players, partners, and scouts can connect with Inspire Stars Academy Rwanda through Instagram
          for registration questions, training updates, and program information.
        </p>
        <a className="button button-primary instagram-button" href="https://www.instagram.com/inspirestarsacademyrwanda" target="_blank" rel="noreferrer">
          <Instagram size={20} strokeWidth={2.4} />
          Message on Instagram
        </a>
      </div>
      <div className="join-card">
        <h3>What to expect</h3>
        <ul>
          <li>Football training for developing players</li>
          <li>A disciplined, multicultural academy environment</li>
          <li>Recognition through tournaments and academy events</li>
          <li>Pathways toward international exposure for selected talent</li>
        </ul>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <img src={logo} alt="" />
        <span>Inspire Stars Academy Rwanda</span>
      </div>
      <p>Kigali, Rwanda. Training young players with discipline, education, values, and ambition.</p>
    </footer>
  );
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <section className="intro-band" id="about">
          <div className="section-inner intro-grid">
            <div>
              <p className="eyebrow dark">About the academy</p>
              <h2>Building confident players and grounded young people.</h2>
            </div>
            <p>
              Inspire Stars Academy Rwanda is a football development community based in Kigali. The academy brings
              together Rwandan and international families around a clear standard: train well, study seriously, compete
              with respect, and prepare players for opportunities beyond their current environment.
            </p>
          </div>
        </section>
        <Programs />
        <Pathway />
        <Values />
        <Gallery />
        <Join />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
