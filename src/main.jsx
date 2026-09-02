import React from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Building2,
  Download,
  ExternalLink,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  Play,
  Shield,
  Trophy,
  X,
  Youtube,
} from "lucide-react";
import "./styles.css";

const site = {
  name: "Inspire Stars Academy Rwanda",
  shortName: "ISAR",
  tagline: "From Rwanda to the World.",
  url: "https://www.inspirestarsacademyrwanda.com/",
  instagram: "https://www.instagram.com/inspirestarsacademy/",
  youtube: "https://www.youtube.com/results?search_query=INSPIRE+STARS+ACADEMY+RWANDA",
  phone: "+250 789 921 727",
  email: "info@inspirestarsacademyrwanda.com",
  location: "Kigali, Rwanda",
};

const img = {
  logo: "/assets/optimized/isar-logo.webp",
  hero: "/assets/optimized/isar-global-exposure.webp",
  football: "/assets/optimized/isar-young-football-team.webp",
  trophy: "/assets/optimized/isar-trophy-team.webp",
  award: "/assets/optimized/isar-award-moment.webp",
  certificate: "/assets/optimized/isar-certificate-award.webp",
  school: "/assets/optimized/isar-school-session.webp",
  leadership: "/assets/optimized/isar-leadership-meeting.webp",
};

const navItems = [
  ["Home", "#home"],
  ["Academy", "#academy"],
  ["Sports", "#sports"],
  ["Athletes", "#athletes"],
  ["Programs", "#programs"],
  ["News", "#news"],
  ["Partners", "#partners"],
  ["Contact", "#contact"],
];

const impactStats = [
  { value: "9", label: "Private schools in Gasabo league" },
  { value: "500+", label: "Students reached through competition" },
  { value: "7", label: "Sports development disciplines" },
  { value: "5 yr", label: "International education partnerships" },
];

const timeline = [
  { year: "2018", title: "Foundation", body: "Sports development programs established under Coach Rodrigue Nzeye's leadership." },
  { year: "2019", title: "Inclusion", body: "Expanded support for children from disadvantaged backgrounds and widened access to training." },
  { year: "2023", title: "Schools", body: "Growth through training centers, school partnerships and structured youth programs." },
  { year: "2024", title: "UK Experience", body: "International football development opportunities, including Arsenal-related training experiences." },
  { year: "2026", title: "Germany Pathway", body: "International expansion through Germany trials, DFI partnership activity and scholarship pathways." },
];

const sports = [
  ["Football", img.football, "Technical training, game awareness, competition habits and international football pathways."],
  ["Basketball", img.trophy, "Court confidence, movement, teamwork and school-league competition structures."],
  ["Swimming", img.school, "Water confidence, discipline, fitness and competitive foundation programs."],
  ["Table Tennis", img.award, "Speed, reaction, coordination and precision for young developing athletes."],
  ["Karate", img.certificate, "Focus, respect, self-control and physical discipline."],
  ["Taekwondo", img.trophy, "Athletic discipline, balance, confidence and character through martial arts."],
  ["Badminton", img.football, "Footwork, coordination, speed and tactical thinking in a fast technical sport."],
];

const pillars = [
  ["01", "Technical Excellence", "Sport-specific skill development, movement quality, game awareness and consistent coaching standards."],
  ["02", "Discipline & Character", "Athletes learn punctuality, respect, resilience, accountability and sporting ethics."],
  ["03", "Education", "Sport is connected to school progress, mentorship and long-term life opportunity."],
  ["04", "Competition", "Tournaments and inter-school leagues create pressure, leadership and talent identification moments."],
  ["05", "Global Opportunity", "International training, scholarships and development pathways help talent move beyond local limits."],
];

const countries = ["Rwanda", "France", "Germany", "United Kingdom", "China"];

const athleteStories = [
  {
    title: "Germany Scholarship Pathway",
    meta: "Football / International development",
    body: "Two players selected through Germany trials earned full scholarships through documented academy pathway activity.",
  },
  {
    title: "Olympique Lyonnais U17 Progression",
    meta: "Football / France pathway",
    body: "Documented player progression connected Inspire Stars talent with an Olympique Lyonnais U17 opportunity.",
  },
  {
    title: "United Kingdom Development Route",
    meta: "Football / UK exposure",
    body: "Athletes have entered development pathways through UK-linked international football opportunities.",
  },
];

const centers = [
  ["Kibagabaga International School", "School training center and academy development partner."],
  ["Wellspring Academy", "School-based youth sports development environment."],
  ["St. Joseph Kicukiro", "Training and student-athlete development center."],
  ["Zaria Court", "VIPERS Center elite training hub."],
  ["Amahoro Stadium", "VIPERS Center elite training hub."],
];

const sponsorBenefits = [
  "Brand visibility",
  "Jersey branding",
  "Event exposure",
  "Social media exposure",
  "Community impact",
  "Athlete engagement",
  "Youth development impact",
];

const partnerGroups = [
  ["Schools", "Kibagabaga International School, Wellspring Academy, St. Joseph Kicukiro"],
  ["International Partners", "Trans World Education Experiences, DFI Germany"],
  ["Sports Organizations", "Football development and multi-sport pathway collaborators"],
  ["Community Partners", "Families, mentors, schools and local support networks"],
  ["Sponsors", "Strategic partners supporting access, competition and opportunity"],
];

const newsCards = [
  ["Academy News", "Training updates, academy growth and development milestones.", img.football],
  ["Tournament Reports", "Competition recaps from school leagues and academy events.", img.trophy],
  ["International Opportunities", "Pathway updates across France, Germany, the UK and China.", img.hero],
];

function useReveal() {
  React.useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`navbar ${scrolled ? "is-scrolled" : ""} ${open ? "menu-open" : ""}`}>
      <a className="brand-mark" href="#home" onClick={close} aria-label={`${site.name} home`}>
        <img src={img.logo} alt="" />
        <span>Inspire Stars Academy</span>
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <div className="nav-actions">
        <a className="icon-link" href={site.instagram} target="_blank" rel="noreferrer" aria-label="Open Instagram">
          <Instagram size={19} />
        </a>
        <a className="nav-cta" href="#contact">
          Join the Academy
        </a>
        <button className="menu-button" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>
      <div className="mobile-menu" aria-hidden={!open}>
        <div className="mobile-menu-inner">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} onClick={close}>
              {label}
            </a>
          ))}
          <a href={site.instagram} target="_blank" rel="noreferrer" onClick={close}>
            Instagram <ExternalLink size={18} />
          </a>
          <a className="mobile-cta" href="#contact" onClick={close}>
            Join the Academy
          </a>
        </div>
      </div>
    </header>
  );
}

function SplitHeading({ eyebrow, title, accent, dark = false }) {
  return (
    <div className="section-heading" data-reveal>
      <p className={`eyebrow ${dark ? "dark" : ""}`}>{eyebrow}</p>
      <h2>
        {title} <span>{accent}</span>
      </h2>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <img className="hero-bg" src={img.hero} alt="Inspire Stars Academy athletes during international exposure travel" />
      <div className="hero-film" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-content">
        <p className="location"><MapPin size={16} /> Kigali • Rwanda</p>
        <h1>
          From<br />
          Rwanda <span>to the<br />World.</span>
        </h1>
        <p>Developing young athletes through sport, education, discipline and global opportunity.</p>
        <div className="hero-actions">
          <a className="btn primary" href="#academy">Explore the Academy <ArrowRight size={18} /></a>
          <a className="btn secondary" href="#contact">Start Your Journey</a>
        </div>
      </div>
      <div className="scroll-cue">Scroll to discover</div>
    </section>
  );
}

function Impact() {
  return (
    <section className="impact" id="academy">
      <div className="impact-statement" data-reveal>
        <p className="eyebrow dark">Athlete Development Ecosystem</p>
        <h2>
          We don't just train athletes. <span>We develop people.</span>
        </h2>
      </div>
      <p className="impact-copy" data-reveal>
        Through professional coaching, education, competition and mentorship, Inspire Stars Academy creates an environment where young people discover potential and prepare for opportunities beyond the field.
      </p>
      <div className="impact-stats">
        {impactStats.map((stat) => (
          <div className="stat-block" key={stat.label} data-reveal>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="journey">
      <SplitHeading eyebrow="The Inspire Stars Story" title="The" accent="Journey" dark />
      <div className="timeline">
        {timeline.map((item) => (
          <article className="timeline-card" key={item.year} data-reveal>
            <span>{item.year}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Sports() {
  return (
    <section className="sports" id="sports">
      <SplitHeading eyebrow="Sports Ecosystem" title="More Than" accent="A Game" />
      <div className="sports-strip" aria-label="Sports offered by Inspire Stars Academy">
        {sports.map(([name, image, body]) => (
          <article className="sport-card" key={name} data-reveal>
            <img src={image} alt={`${name} development at Inspire Stars Academy`} loading="lazy" />
            <div>
              <h3>{name}</h3>
              <p>{body}</p>
              <a href="#programs">Explore <ArrowRight size={16} /></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section className="pillars" id="programs">
      <SplitHeading eyebrow="Methodology" title="Building Complete" accent="Athletes" dark />
      <div className="pillar-grid">
        {pillars.map(([number, title, body]) => (
          <article className="pillar" key={title} data-reveal>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Pathway() {
  return (
    <section className="pathway">
      <div className="pathway-copy" data-reveal>
        <p className="eyebrow">International Pathway</p>
        <h2>
          Local Talent. <span>Global Opportunity.</span>
        </h2>
        <p>
          Inspire Stars Academy works to create pathways that connect talented young athletes with international training, education, scholarships and development opportunities.
        </p>
      </div>
      <div className="map-panel" data-reveal>
        <div className="world-line" aria-hidden="true" />
        {countries.map((country, index) => (
          <div className="country-node" key={country} style={{ "--i": index }}>
            <span>{country}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function AthleteStories() {
  return (
    <section className="athletes" id="athletes">
      <SplitHeading eyebrow="Athlete Stories" title="The Next" accent="Generation" dark />
      <div className="athlete-strip">
        {athleteStories.map((story) => (
          <article className="athlete-card" key={story.title} data-reveal>
            <div className="profile-frame">
              <Shield size={34} />
            </div>
            <p>{story.meta}</p>
            <h3>{story.title}</h3>
            <span>{story.body}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function ArsenalExperience() {
  return (
    <section className="case-study">
      <img src={img.hero} alt="Inspire Stars Academy athletes during an international development experience" loading="lazy" />
      <div className="case-copy" data-reveal>
        <p className="eyebrow">July 2024 • United Kingdom</p>
        <h2>
          Beyond <span>Rwanda.</span>
        </h2>
        <p>
          The academy organized international football development opportunities involving more than 30 students, including Arsenal-related professional training experiences.
        </p>
        <a className="btn secondary" href="#news"><Play size={17} /> View Experience</a>
      </div>
    </section>
  );
}

function GasaboLeague() {
  return (
    <section className="league">
      <div data-reveal>
        <p className="eyebrow dark">Gasabo Private School League</p>
        <h2>
          Building the Next Generation <span>Through Competition.</span>
        </h2>
        <p>
          The league creates structured competition for talent identification, teamwork, leadership, sportsmanship and international opportunity.
        </p>
      </div>
      <div className="league-stats">
        <div><strong>9</strong><span>Participating Schools</span></div>
        <div><strong>500+</strong><span>Students</span></div>
        <div><strong>3</strong><span>Sports: Football, Basketball, Swimming</span></div>
      </div>
    </section>
  );
}

function TrainingCenters() {
  const [active, setActive] = React.useState(centers[3]);

  return (
    <section className="centers">
      <SplitHeading eyebrow="Training Centers" title="Kigali" accent="Performance Network" dark />
      <div className="centers-layout">
        <div className="kigali-map" data-reveal>
          {centers.map((center, index) => (
            <button key={center[0]} className={active[0] === center[0] ? "active" : ""} style={{ "--i": index }} onClick={() => setActive(center)}>
              <span>{center[0]}</span>
            </button>
          ))}
        </div>
        <article className="center-panel" data-reveal>
          <MapPin size={24} />
          <h3>{active[0]}</h3>
          <p>{active[1]}</p>
        </article>
      </div>
    </section>
  );
}

function PeopleCommunity() {
  return (
    <section className="people-community">
      <div className="people" data-reveal>
        <img src={img.leadership} alt="Inspire Stars Academy leadership and development meeting" loading="lazy" />
        <div>
          <p className="eyebrow">People Behind the Mission</p>
          <h2>
            Coach Rodrigue <span>Nzeye</span>
          </h2>
          <p>Founder / Head Coach leading Inspire Stars Academy Rwanda as a sports development initiative for young athletes.</p>
        </div>
      </div>
      <div className="community" data-reveal>
        <p className="eyebrow dark">Inclusion & Community</p>
        <h2>
          Every Child Deserves <span>A Chance To Shine.</span>
        </h2>
        <p>
          ISAR supports children regardless of gender, socioeconomic background, physical abilities or mental abilities through education, school fees, health insurance, food, clothing, sports equipment, mentorship and family support.
        </p>
      </div>
    </section>
  );
}

function Sponsorship() {
  return (
    <section className="sponsor" id="partners">
      <div data-reveal>
        <p className="eyebrow">Sponsorship</p>
        <h2>
          Invest in the <span>Next Generation.</span>
        </h2>
        <p>Your support can turn potential into opportunity.</p>
        <div className="sponsor-actions">
          <a className="btn primary" href={`mailto:${site.email}?subject=Partnership%20with%20Inspire%20Stars%20Academy`}>Become a Partner</a>
          <a className="btn secondary" href={`mailto:${site.email}?subject=Request%20Partnership%20Deck`}><Download size={17} /> Request Partnership Deck</a>
        </div>
      </div>
      <div className="benefit-grid">
        {sponsorBenefits.map((benefit) => (
          <span key={benefit} data-reveal>{benefit}</span>
        ))}
      </div>
    </section>
  );
}

function PartnersNewsInstagram() {
  return (
    <section className="editorial" id="news">
      <SplitHeading eyebrow="Partners & Stories" title="A Serious" accent="Development Network" dark />
      <div className="partner-grid">
        {partnerGroups.map(([title, body]) => (
          <article key={title} data-reveal>
            <Building2 size={22} />
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
      <div className="news-grid">
        {newsCards.map(([title, body, image]) => (
          <article className="news-card" key={title} data-reveal>
            <img src={image} alt="" loading="lazy" />
            <div>
              <p>{title}</p>
              <h3>{body}</h3>
            </div>
          </article>
        ))}
      </div>
      <div className="instagram-block" data-reveal>
        <div>
          <p className="eyebrow dark">Instagram</p>
          <h2>
            Follow the <span>Journey.</span>
          </h2>
        </div>
        <div className="insta-grid" aria-label="Instagram-style academy photo grid">
          {[img.football, img.trophy, img.award, img.certificate, img.hero, img.school].map((photo) => (
            <img src={photo} alt="Inspire Stars Academy social media moment" loading="lazy" key={photo} />
          ))}
        </div>
        <a className="btn primary" href={site.instagram} target="_blank" rel="noreferrer">
          <Instagram size={18} /> Follow @inspirestarsacademy
        </a>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="final-cta" id="contact">
      <p className="eyebrow">From Rwanda to the World.</p>
      <h2>
        Your Journey <span>Starts Here.</span>
      </h2>
      <div>
        <a className="btn primary" href={`mailto:${site.email}?subject=Join%20Inspire%20Stars%20Academy`}>Join the Academy</a>
        <a className="btn secondary" href={`mailto:${site.email}?subject=Partner%20with%20ISAR`}>Partner With Us</a>
        <a className="btn secondary" href={`tel:${site.phone.replaceAll(" ", "")}`}>Contact the Academy</a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <img src={img.logo} alt="" />
        <h2>Inspire Stars Academy Rwanda</h2>
        <p>{site.tagline}</p>
      </div>
      <nav aria-label="Footer navigation">
        {navItems.slice(1).map(([label, href]) => (
          <a href={href} key={href}>{label}</a>
        ))}
      </nav>
      <address>
        <a href={`tel:${site.phone.replaceAll(" ", "")}`}><Phone size={16} /> {site.phone}</a>
        <a href={`mailto:${site.email}`}><Mail size={16} /> {site.email}</a>
        <a href={site.url}>inspirestarsacademyrwanda.com</a>
        <a href={site.instagram} target="_blank" rel="noreferrer"><Instagram size={16} /> Instagram</a>
        <a href={site.youtube} target="_blank" rel="noreferrer"><Youtube size={16} /> YouTube</a>
      </address>
      <p className="copyright">© 2026 Inspire Stars Academy Rwanda</p>
    </footer>
  );
}

function App() {
  useReveal();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Impact />
        <Timeline />
        <Sports />
        <Pillars />
        <Pathway />
        <AthleteStories />
        <ArsenalExperience />
        <GasaboLeague />
        <TrainingCenters />
        <PeopleCommunity />
        <Sponsorship />
        <PartnersNewsInstagram />
        <FinalCTA />
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
