"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header/Header";

export function HeaderShell() {
  const pathname = usePathname();

  // Hide global navbar inside dashboards & auth pages (client, guide, admin, login, register)
  const isExcluded =
    pathname.startsWith("/client") ||
    pathname.startsWith("/guide") ||
    pathname.startsWith("/admin") ||
    pathname === "/login" ||
    pathname === "/register";

  if (isExcluded) {
    return null;
  }

  return <Header />;
}
