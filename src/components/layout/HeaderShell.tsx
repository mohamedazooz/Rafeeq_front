"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header/Header";

export function HeaderShell() {
  const pathname = usePathname();

  // Hide global navbar inside dashboards (client, guide, admin)
  const isDashboard =
    pathname.startsWith("/client") ||
    pathname.startsWith("/guide") ||
    pathname.startsWith("/admin");

  if (isDashboard) {
    return null;
  }

  return <Header />;
}
