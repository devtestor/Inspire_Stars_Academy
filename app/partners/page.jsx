import PageHero from "@/components/PageHero";
import { PartnersNewsInstagram, Sponsorship } from "@/components/HomeSections";
import ContactForm from "@/components/ContactForm";
import { images } from "@/content/siteContent";

export const metadata = {
  title: "Partners",
  description: "Partner with Inspire Stars Academy Rwanda to support youth development, competition, inclusion and international opportunity.",
};

export default function PartnersPage() {
  return (
    <main>
      <PageHero eyebrow="Partners" title="Invest In" accent="Opportunity" body="ISAR works with schools, sponsors, sports organizations and international partners to build youth pathways." image={images.trophy} />
      <Sponsorship />
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
