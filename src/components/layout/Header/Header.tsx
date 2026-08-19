"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/lib/theme-provider";
import { useLanguage } from "@/lib/language-provider";
import { RafeeqLogo } from "@/components/brand";

export function Header() {
  const { theme, isAuto, toggleTheme } = useTheme();
  const { lang, isAr, t, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("rafeeq_access_token");
      setIsLoggedIn(Boolean(token));
    }
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

  const navLinks = [
    { href: "/programs", label: t.nav.programs },
    { href: "/guides", label: t.nav.guides },
    { href: "/become-guide", label: t.nav.becomeGuide },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header className={headerClass}>
      <div className={styles.header__inner}>
        {/* Logo */}
        <RafeeqLogo variant="horizontal" size={42} animated priority />

        {/* Desktop Nav */}
        <nav className={styles.header__nav}>
          {navLinks.map((link) => (
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
          {/* Auto Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            type="button"
            style={{
              padding: "6px 10px",
              borderRadius: "100px",
              border: "1px solid var(--color-border)",
              background: "var(--color-bg-secondary)",
              color: "var(--color-text-primary)",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
            title={isAuto ? (isAr ? "تلقائي حسب الوقت (كل 12 ساعة)" : "Auto (12h Day/Night Cycle)") : (isAr ? "وضع يدوي" : "Manual Mode")}
          >
            {theme === "dark" ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            )}
            {isAuto && (
              <span style={{ fontSize: "9px", background: "rgba(200,169,110,0.25)", color: "var(--color-gold-heading)", padding: "1px 5px", borderRadius: "100px", fontWeight: 800 }}>
                12h
              </span>
            )}
          </button>

          {/* Language Switcher Button */}
          <button
            className={styles["header__lang-btn"]}
            type="button"
            onClick={toggleLanguage}
            aria-label="Switch language"
            style={{
              cursor: "pointer",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              borderRadius: "100px",
              border: "1px solid var(--color-border)",
              background: "var(--color-bg-secondary)",
              color: "var(--color-text-primary)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            <span>{t.common.switchLang}</span>
          </button>

          {/* Persistent Auth State & User Profile Button */}
          {isLoggedIn ? (
            <Link href="/client/dashboard" style={{ textDecoration: "none" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "100px",
                background: "var(--gradient-gold)",
                color: "#0f172a",
                fontWeight: 800,
                fontSize: "13px",
                boxShadow: "0 4px 15px rgba(200, 169, 110, 0.3)",
                cursor: "pointer",
              }}>
                <div style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: "#0f172a",
                  color: "#FFDF9E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: 900
                }}>
                  👤
                </div>
                <span>{t.common.dashboard}</span>
              </div>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" size="sm">
                  {t.common.login}
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm">
                  {t.common.signUp}
                </Button>
              </Link>
            </>
          )}

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
        {navLinks.map((link) => (
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
          {isLoggedIn ? (
            <Link href="/client/dashboard" style={{ flexGrow: 1 }}>
              <Button variant="primary" fullWidth onClick={() => setIsMobileOpen(false)}>
                {t.common.dashboard}
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login" style={{ flexGrow: 1 }}>
                <Button variant="outline" fullWidth onClick={() => setIsMobileOpen(false)}>
                  {t.common.login}
                </Button>
              </Link>
              <Link href="/register" style={{ flexGrow: 1 }}>
                <Button variant="primary" fullWidth onClick={() => setIsMobileOpen(false)}>
                  {t.common.signUp}
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
