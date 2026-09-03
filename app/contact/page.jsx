import { Instagram, Mail, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import { images, site } from "@/content/siteContent";

export const metadata = {
  title: "Contact",
  description: "Contact Inspire Stars Academy Rwanda for academy registration, school partnerships, sponsorship and international opportunities.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHero eyebrow="Contact" title="Your Journey" accent="Starts Here" body="For parents, athletes, schools, sponsors and international partners ready to speak with the academy." image={images.hero} imageAlt="Inspire Stars Academy international exposure background" />
      <section className="form-shell">
        <div data-reveal>
          <p className="eyebrow dark">Contact the Academy</p>
          <h2>Tell us what you want to build.</h2>
          <p>Choose your request type and share the details. The academy team can follow up directly.</p>
          <div className="contact-lines">
            <a href={`tel:${site.phone.replaceAll(" ", "")}`}><Phone size={18} /> {site.phone}</a>
            <a href={`mailto:${site.email}`}><Mail size={18} /> {site.email}</a>
            <a href={site.instagram} target="_blank" rel="noreferrer"><Instagram size={18} /> @inspirestarsacademy</a>
          </div>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
