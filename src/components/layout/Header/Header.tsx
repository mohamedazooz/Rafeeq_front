"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { Button } from "@/components/ui/Button";

interface NavLink {
  readonly href: string;
  readonly label: string;
  readonly labelEn: string;
}

const NAV_LINKS: readonly NavLink[] = [
  { href: "/destinations", label: "الوجهات", labelEn: "Destinations" },
  { href: "/programs", label: "البرامج", labelEn: "Programs" },
  { href: "/about", label: "من نحن", labelEn: "About" },
  { href: "/contact", label: "تواصل", labelEn: "Contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const headerClass = [
    styles.header,
    isScrolled ? styles["header--scrolled"] : styles["header--transparent"],
  ].join(" ");

  const menuBtnClass = [
    styles.header__menu_btn,
    isMobileOpen ? styles["header__menu-btn--open"] : "",
  ].join(" ");

  return (
    <header className={headerClass}>
      <div className={styles.header__inner}>
        {/* Logo */}
        <Link href="/" className={styles.header__logo}>
          <span className={styles["header__logo-icon"]}>ر</span>
          <span className={styles["header__logo-text"]}>رفيق</span>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.header__nav}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.header__link}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className={styles.header__actions}>
          <button
            className={styles["header__lang-btn"]}
            type="button"
            aria-label="Switch language"
          >
            EN
          </button>
          <Button variant="outline" size="sm">
            دخول
          </Button>
          <Button variant="primary" size="sm">
            سجل الآن
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            className={menuBtnClass}
            type="button"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={isMobileOpen}
          >
            <span className={styles["header__menu-line"]} />
            <span className={styles["header__menu-line"]} />
            <span className={styles["header__menu-line"]} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={[
          styles["header__mobile-menu"],
          isMobileOpen ? styles["header__mobile-menu--open"] : "",
        ].join(" ")}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={styles["header__mobile-link"]}
            onClick={() => setIsMobileOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <div style={{ marginTop: "auto", display: "flex", gap: "var(--space-3)" }}>
          <Button variant="outline" fullWidth>
            دخول
          </Button>
          <Button variant="primary" fullWidth>
            سجل الآن
          </Button>
        </div>
      </div>
    </header>
  );
}
