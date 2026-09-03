import { Check, Instagram, MessageCircleMore, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import RegistrationForm from "@/components/RegistrationForm";
import { images, site } from "@/content/siteContent";
import { getCmsSettings } from "@/lib/cms";

export const metadata = {
  title: "Join the Academy",
  description: "Register a young athlete with Inspire Stars Academy Rwanda for structured sport development, education support and pathway opportunities.",
};

const registrationSignals = [
  "Professional coaching and structured development",
  "Multi-sport pathways for different age groups",
  "Parent and guardian follow-up after review",
  "School and elite pathway opportunities where applicable",
];

export default async function JoinPage() {
  const settings = await getCmsSettings();
  const publicSite = { ...site, ...settings.site };

  return (
    <main>
      <PageHero
        eyebrow="Join the Academy"
        title="Start The"
        accent="Journey"
        body="Register a young athlete for the Inspire Stars Academy pathway. Share the details clearly and the academy can guide the next step."
        image={images.school}
        imageAlt="Inspire Stars Academy student athlete session"
      />

      <section className="join-shell">
        <div className="join-copy" data-reveal>
          <p className="eyebrow dark">Registration</p>
          <h2>Built for parents, athletes and families.</h2>
          <p>
            This registration form gives the academy enough detail to assess age group fit, sport interest, development level and the right follow-up conversation.
          </p>

          <div className="join-signal-list">
            {registrationSignals.map((signal) => (
              <div key={signal}>
                <Check size={16} />
                <span>{signal}</span>
              </div>
            ))}
          </div>

          <div className="contact-lines">
            <a href={`tel:${publicSite.phone.replaceAll(" ", "")}`}><Phone size={18} /> {publicSite.phone}</a>
            <a href="https://wa.me/250789921727" target="_blank" rel="noreferrer"><MessageCircleMore size={18} /> WhatsApp the academy</a>
            <a href={publicSite.instagram} target="_blank" rel="noreferrer"><Instagram size={18} /> @inspirestarsacademy</a>
          </div>
        </div>

        <RegistrationForm />
      </section>
    </main>
  );
}
