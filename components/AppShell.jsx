"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RevealProvider from "@/components/RevealProvider";
import WhatsAppFloating from "@/components/WhatsAppFloating";

export default function AppShell({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <RevealProvider>
      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <WhatsAppFloating />}
      {children}
      {!isAdminRoute && <Footer />}
    </RevealProvider>
  );
}
