"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/language-provider";
import { useTheme } from "@/lib/theme-provider";
import { SunIcon, MoonIcon, GlobeIcon, UserIcon, BellIcon } from "@/components/icons";

interface DashboardNavbarProps {
  roleTitleAr: string;
  roleTitleEn: string;
  profileHref: string;
}

export function DashboardNavbar({ roleTitleAr, roleTitleEn, profileHref }: DashboardNavbarProps) {
  const { lang, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const isAr = lang === "ar";

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 28px",
        background: "var(--color-bg-card)",
        borderBottom: "1px solid var(--color-border)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Brand Logo & Role Title */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <Image src="/logo-emblem.png" alt="Rafeeq Emblem" width={34} height={34} style={{ objectFit: "contain" }} />
          <span style={{ fontSize: "19px", fontWeight: 900, color: "var(--color-gold-heading)" }}>
            {isAr ? "رفيق" : "Rafeeq"}
          </span>
        </Link>
        <span style={{ fontSize: "11px", background: "var(--color-bg-secondary)", padding: "4px 12px", borderRadius: "100px", color: "var(--color-text-secondary)", fontWeight: 700, border: "1px solid var(--color-border)" }}>
          {isAr ? roleTitleAr : roleTitleEn}
        </span>
      </div>

      {/* Control Actions: Theme, Language, Notification, Profile Button */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* Theme Toggle Icon */}
        <button
          type="button"
          onClick={toggleTheme}
          title={isAr ? "تغيير المظهر" : "Toggle Theme"}
          style={{
            padding: "7px 12px",
            borderRadius: "100px",
            border: "1px solid var(--color-border)",
            background: "var(--color-bg-secondary)",
            color: "var(--color-text-primary)",
            fontSize: "12px",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            transition: "all 0.2s ease",
          }}
        >
          {theme === "dark" ? <MoonIcon size={14} color="var(--color-gold-heading)" /> : <SunIcon size={14} color="var(--color-gold-heading)" />}
          <span>{theme === "dark" ? (isAr ? "داكن" : "Dark") : (isAr ? "فاتح" : "Light")}</span>
        </button>

        {/* Language Toggle Icon */}
        <button
          type="button"
          onClick={toggleLanguage}
          title={isAr ? "تغيير اللغة" : "Switch Language"}
          style={{
            padding: "7px 12px",
            borderRadius: "100px",
            border: "1px solid var(--color-border)",
            background: "var(--color-bg-secondary)",
            color: "var(--color-text-primary)",
            fontSize: "12px",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            transition: "all 0.2s ease",
          }}
        >
          <GlobeIcon size={14} color="var(--color-gold-heading)" />
          <span>{isAr ? "English" : "العربية"}</span>
        </button>

        {/* Profile Navigation Button */}
        <Link
          href={profileHref}
          title={isAr ? "الانتقال للملف الشخصي" : "Go to Profile"}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "7px 14px",
            borderRadius: "100px",
            background: "var(--gradient-gold)",
            color: "#0f172a",
            fontSize: "12px",
            fontWeight: 900,
            textDecoration: "none",
            boxShadow: "0 2px 8px rgba(200, 169, 110, 0.25)",
            transition: "all 0.2s ease",
          }}
        >
          <UserIcon size={14} color="#0f172a" />
          <span>{isAr ? "الملف الشخصي" : "Profile"}</span>
        </Link>
      </div>
    </header>
  );
}
