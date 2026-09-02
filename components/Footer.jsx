import Link from "next/link";
import { Instagram, Mail, Phone, Youtube } from "lucide-react";
import { images, navItems, site } from "@/content/siteContent";

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <img src={images.logo} alt="" />
        <h2>Inspire Stars Academy Rwanda</h2>
        <p>{site.tagline}</p>
      </div>
      <nav aria-label="Footer navigation">
        {navItems.slice(1).map(([label, href]) => (
          <Link href={href} key={href}>{label}</Link>
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
