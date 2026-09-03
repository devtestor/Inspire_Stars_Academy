"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, Instagram, Menu, X } from "lucide-react";
import { images, navItems, site } from "@/content/siteContent";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [siteSettings, setSiteSettings] = useState(site);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const close = () => setOpen(false);

  return (
    <header className={`navbar ${scrolled ? "is-scrolled" : ""} ${open ? "menu-open" : ""}`}>
      <Link className="brand-mark" href="/" onClick={close} aria-label={`${siteSettings.name} home`}>
        <img src={images.logo} alt="" />
        <span>Inspire Stars Academy</span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map(([label, href]) => (
          <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>
            {label}
          </Link>
        ))}
      </nav>
      <div className="nav-actions">
        <a className="icon-link" href={siteSettings.instagram} target="_blank" rel="noreferrer" aria-label="Open Instagram">
          <Instagram size={19} />
        </a>
        <Link className="nav-cta" href="/contact">
          {siteSettings.joinCtaLabel || "Join the Academy"}
        </Link>
        <button className="menu-button" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>
      <div className="mobile-menu" aria-hidden={!open}>
        <div className="mobile-menu-inner">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} onClick={close} aria-current={pathname === href ? "page" : undefined}>
              {label}
            </Link>
          ))}
          <a href={siteSettings.instagram} target="_blank" rel="noreferrer" onClick={close}>
            Instagram <ExternalLink size={18} />
          </a>
          <Link className="mobile-cta" href="/contact" onClick={close}>
            {siteSettings.joinCtaLabel || "Join the Academy"}
          </Link>
        </div>
      </div>
    </header>
  );
}
