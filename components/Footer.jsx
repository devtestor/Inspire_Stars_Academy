"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Instagram, Mail, Phone, Youtube } from "lucide-react";
import { images, navItems, site } from "@/content/siteContent";

export default function Footer() {
  const [siteSettings, setSiteSettings] = useState(site);

  useEffect(() => {
    let mounted = true;

    const loadSettings = async () => {
      try {
        const response = await fetch("/api/content", { cache: "force-cache" });
        const result = await response.json();
        if (mounted && result?.site) {
          setSiteSettings((current) => ({ ...current, ...result.site }));
        }
      } catch {
        // Keep static fallback values when the public API is unavailable.
      }
    };

    loadSettings();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <footer className="footer">
      <div>
        <img src={images.logo} alt="" />
        <h2>{siteSettings.name}</h2>
        <p>{siteSettings.tagline}</p>
      </div>
      <nav aria-label="Footer navigation">
        {navItems.slice(1).map(([label, href]) => (
          <Link href={href} key={href}>{label}</Link>
        ))}
      </nav>
      <address>
        <a href={`tel:${siteSettings.phone.replaceAll(" ", "")}`}><Phone size={16} /> {siteSettings.phone}</a>
        <a href={`mailto:${siteSettings.email}`}><Mail size={16} /> {siteSettings.email}</a>
        <a href={siteSettings.url}>{siteSettings.websiteLabel || "inspirestarsacademyrwanda.com"}</a>
        <a href={siteSettings.instagram} target="_blank" rel="noreferrer"><Instagram size={16} /> Instagram</a>
        <a href={siteSettings.youtube} target="_blank" rel="noreferrer"><Youtube size={16} /> YouTube</a>
      </address>
      <p className="copyright">© 2026 Inspire Stars Academy Rwanda</p>
    </footer>
  );
}
