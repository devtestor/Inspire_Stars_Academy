import AppShell from "@/components/AppShell";
import { site } from "@/content/siteContent";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Inspire Stars Academy Rwanda | Sports Academy Kigali",
    template: "%s | Inspire Stars Academy Rwanda",
  },
  description: "A premium youth sports academy in Kigali developing athletes through sport, education, discipline, competition and global opportunity.",
  keywords: [
    "Inspire Stars Academy Rwanda",
    "Sports Academy Kigali",
    "Football Academy Rwanda",
    "Basketball Academy Rwanda",
    "Youth Sports Rwanda",
    "Football Academy Kigali",
    "Basketball Academy Kigali",
    "Rwanda Sports Academy",
  ],
  openGraph: {
    title: "Inspire Stars Academy Rwanda",
    description: "From Rwanda to the World.",
    url: site.url,
    siteName: site.name,
    images: [{ url: "/assets/optimized/isar-global-exposure.webp", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: site.url,
  },
};

export default function RootLayout({ children }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    slogan: site.tagline,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kigali",
      addressCountry: "RW",
    },
    sameAs: [site.instagram, site.youtube],
  };

  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
