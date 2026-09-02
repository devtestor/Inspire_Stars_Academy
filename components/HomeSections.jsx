import Link from "next/link";
import { ArrowRight, Building2, Download, Instagram, MapPin, Play, Shield } from "lucide-react";
import {
  athleteStories,
  centers,
  countries,
  images,
  impactStats,
  newsCards,
  partnerGroups,
  pillars,
  site,
  sponsorBenefits,
  timeline,
} from "@/content/siteContent";
import SplitHeading from "./SplitHeading";
import SportsCarousel from "./SportsCarousel";

export function Hero() {
  return (
    <section className="hero" id="home">
      <img className="hero-bg" src={images.hero} alt="Inspire Stars Academy athletes during international exposure travel" />
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
          <Link className="btn primary" href="/academy">Explore the Academy <ArrowRight size={18} /></Link>
          <Link className="btn secondary" href="/contact">Start Your Journey</Link>
        </div>
      </div>
      <div className="scroll-cue">Scroll to discover</div>
    </section>
  );
}

export function Impact() {
  return (
    <section className="impact" id="academy">
      <div className="impact-statement" data-reveal>
        <p className="eyebrow dark">Athlete Development Ecosystem</p>
        <h2>
          We develop athletes. <span>We develop people.</span>
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

export function Timeline() {
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

export function Pillars() {
  return (
    <section className="pillars" id="programs">
      <SplitHeading eyebrow="Methodology" title="Complete" accent="Athletes" dark />
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

export function Pathway() {
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

export function AthleteStories() {
  return (
    <section className="athletes" id="athletes">
      <SplitHeading eyebrow="Athlete Stories" title="Next" accent="Generation" dark />
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

export function ArsenalExperience() {
  return (
    <section className="case-study">
      <img src={images.hero} alt="Inspire Stars Academy athletes during an international development experience" loading="lazy" />
      <div className="case-copy" data-reveal>
        <p className="eyebrow">July 2024 • United Kingdom</p>
        <h2>
          Beyond <span>Rwanda.</span>
        </h2>
        <p>
          The academy organized international football development opportunities involving more than 30 students, including Arsenal-related professional training experiences.
        </p>
        <Link className="btn secondary" href="/news"><Play size={17} /> View Experience</Link>
      </div>
    </section>
  );
}

export function GasaboLeague() {
  return (
    <section className="league">
      <div data-reveal>
        <p className="eyebrow dark">Gasabo Private School League</p>
        <h2>
          Next Generation <span>Competition.</span>
        </h2>
        <p>
          The league creates structured competition for talent identification, teamwork, leadership, sportsmanship and international opportunity.
        </p>
      </div>
      <div className="league-stats">
        <div><strong>9</strong><span>Participating Schools</span></div>
        <div><strong>500+</strong><span>Students</span></div>
        <div><strong>3</strong><span>Football, Basketball, Swimming</span></div>
      </div>
    </section>
  );
}

export function TrainingCenters() {
  return (
    <section className="centers">
      <SplitHeading eyebrow="Training Centers" title="Kigali" accent="Performance Network" dark />
      <div className="center-list">
        {centers.map(([name, body], index) => (
          <article className={index > 2 ? "elite-center" : ""} key={name} data-reveal>
            <MapPin size={22} />
            <h3>{name}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PeopleCommunity() {
  return (
    <section className="people-community">
      <div className="people" data-reveal>
        <img src={images.leadership} alt="Inspire Stars Academy leadership and development meeting" loading="lazy" />
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

export function Sponsorship() {
  return (
    <section className="sponsor" id="partners">
      <div data-reveal>
        <p className="eyebrow">Sponsorship</p>
        <h2>
          Invest in the <span>Next Generation.</span>
        </h2>
        <p>Your support can turn potential into opportunity.</p>
        <div className="sponsor-actions">
          <Link className="btn primary" href="/contact">Become a Partner</Link>
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

export function PartnersNewsInstagram() {
  return (
    <section className="editorial" id="news">
      <SplitHeading eyebrow="Partners & Stories" title="Development" accent="Network" dark />
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
            <img src={image} alt={`${title} at Inspire Stars Academy`} loading="lazy" />
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
          {[images.football, images.trophy, images.award, images.certificate, images.hero, images.school].map((photo) => (
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

export function FinalCTA() {
  return (
    <section className="final-cta" id="contact">
      <p className="eyebrow">From Rwanda to the World.</p>
      <h2>
        Your Journey <span>Starts Here.</span>
      </h2>
      <div>
        <Link className="btn primary" href="/contact">Join the Academy</Link>
        <Link className="btn secondary" href="/partners">Partner With Us</Link>
        <a className="btn secondary" href={`tel:${site.phone.replaceAll(" ", "")}`}>Contact the Academy</a>
      </div>
    </section>
  );
}

export { SportsCarousel };
