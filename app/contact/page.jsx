import { Instagram, Mail, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import { images, site } from "@/content/siteContent";
import { getCmsSettings } from "@/lib/cms";

export const metadata = {
  title: "Contact",
  description: "Contact Inspire Stars Academy Rwanda for academy registration, school partnerships, sponsorship and international opportunities.",
};

export default async function ContactPage() {
  const settings = await getCmsSettings();
  const publicSite = { ...site, ...settings.site };

  return (
    <main>
      <PageHero eyebrow="Contact" title="Your Journey" accent="Starts Here" body="For parents, athletes, schools, sponsors and international partners ready to speak with the academy." image={images.hero} imageAlt="Inspire Stars Academy international exposure background" />
      <section className="form-shell">
        <div data-reveal>
          <p className="eyebrow dark">{settings.contact.eyebrow}</p>
          <h2>{settings.contact.title}</h2>
          <p>{settings.contact.body}</p>
          <div className="contact-lines">
            <a href={`tel:${publicSite.phone.replaceAll(" ", "")}`}><Phone size={18} /> {publicSite.phone}</a>
            <a href={`mailto:${publicSite.email}`}><Mail size={18} /> {publicSite.email}</a>
            <a href={publicSite.instagram} target="_blank" rel="noreferrer"><Instagram size={18} /> @inspirestarsacademy</a>
          </div>
        </div>
        <ContactForm defaultIntent={settings.contact.requestOptions[0]} options={settings.contact.requestOptions} />
      </section>
    </main>
  );
}
