"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer/Footer";

export function FooterShell() {
  const pathname = usePathname();

  // Hide footer inside admin, guide, client dashboards
  const isDashboard =
    pathname.startsWith("/client") ||
    pathname.startsWith("/guide") ||
    pathname.startsWith("/admin");

  if (isDashboard) {
    return null;
  }

  return <Footer />;
}
