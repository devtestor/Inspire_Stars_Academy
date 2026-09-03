import PageHero from "@/components/PageHero";
import { PartnersNewsInstagram, Sponsorship } from "@/components/HomeSections";
import ContactForm from "@/components/ContactForm";
import SplitHeading from "@/components/SplitHeading";
import { partnerModes, images } from "@/content/siteContent";

export const revalidate = 60;

export const metadata = {
  title: "Partners",
  description: "Partner with Inspire Stars Academy Rwanda to support youth development, competition, inclusion and international opportunity.",
};

export default function PartnersPage() {
  return (
    <main>
      <PageHero eyebrow="Partners" title="Invest In" accent="Opportunity" body="ISAR works with schools, sponsors, sports organizations and international partners to build youth pathways." image={images.trophy} imageAlt="Team competition and recognition moment" />
      <Sponsorship />
      <section className="route-section route-section-tight">
        <div className="route-intro" data-reveal>
          <SplitHeading eyebrow="Partnership Models" title="How Support" accent="Connects" dark />
          <p>The partnership page needs clearer lanes. These are the main ways schools, sponsors and international organizations can plug into the academy ecosystem.</p>
        </div>
        <div className="route-grid">
          {partnerModes.map(([title, body]) => (
            <article key={title} data-reveal>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="form-shell">
        <div data-reveal>
          <p className="eyebrow dark">Partnership Intake</p>
          <h2>Start the conversation.</h2>
          <p>Use this form for sponsorship, school partnerships, international partnerships or partnership deck requests.</p>
        </div>
        <ContactForm defaultIntent="Partner With Us" />
      </section>
      <PartnersNewsInstagram />
    </main>
  );
}
