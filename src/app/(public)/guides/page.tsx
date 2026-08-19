"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";
import { useLanguage } from "@/lib/language-provider";

interface GuideCardData {
  id: string;
  nameAr: string;
  nameEn: string;
  licenseNo: string;
  cityAr: string;
  cityEn: string;
  rating: number;
  tripsCompleted: number;
  languagesAr: string[];
  languagesEn: string[];
  specialtiesAr: string[];
  specialtiesEn: string[];
  vehicleAr: string;
  vehicleEn: string;
  avatar: string;
  bioAr: string;
  bioEn: string;
}

const DEMO_GUIDES: GuideCardData[] = [
  {
    id: "g-101",
    nameAr: "عبد العزيز الشمري",
    nameEn: "Abdulaziz Al-Shammari",
    licenseNo: "TL-998201",
    cityAr: "العلا / الرياض",
    cityEn: "AlUla / Riyadh",
    rating: 4.95,
    tripsCompleted: 142,
    languagesAr: ["العربية", "الإنجليزية"],
    languagesEn: ["Arabic", "English"],
    specialtiesAr: ["تراث العلا والأنباط", "سفاري صحراوي", "التصوير الفوتوغرافي"],
    specialtiesEn: ["AlUla Heritage", "Desert Safari", "Photography"],
    vehicleAr: "سيارة دفع رباعي مجهزة 4x4",
    vehicleEn: "4x4 SUV Equipped Vehicle",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    bioAr: "مرشد سياحي مرخص خبير في تاريخ العلا والمدائن والبلدة القديمة لأكثر من 7 سنوات.",
    bioEn: "Licensed tour guide with over 7 years of expertise in AlUla, Hegra, and Old Town history.",
  },
  {
    id: "g-102",
    nameAr: "سارة الغامدي",
    nameEn: "Sara Al-Ghamdi",
    licenseNo: "TL-774102",
    cityAr: "جدة / البحر الأحمر",
    cityEn: "Jeddah / Red Sea",
    rating: 4.98,
    tripsCompleted: 189,
    languagesAr: ["العربية", "الإنجليزية", "الفرنسية"],
    languagesEn: ["Arabic", "English", "French"],
    specialtiesAr: ["سياحة بحرية وغوص", "جولات منطقة البلد التاريخية", "تذوق المأكولات"],
    specialtiesEn: ["Marine & Diving", "Historic Jeddah Tours", "Culinary Tasting"],
    vehicleAr: "قارب سياحي مجهز + سيارة فاخرة",
    vehicleEn: "Equipped Tour Boat + Luxury Car",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    bioAr: "غواصة ومرشدة معتمدة متخصصة في اكتشاف الشعاب المرجانية وأسواق جدة التاريخية.",
    bioEn: "Certified diver & guide specializing in Red Sea coral reefs and historic Al-Balad markets.",
  },
  {
    id: "g-103",
    nameAr: "فهد العتيبي",
    nameEn: "Fahad Al-Otaibi",
    licenseNo: "TL-551093",
    cityAr: "عسير / أبها",
    cityEn: "Asir / Abha",
    rating: 4.90,
    tripsCompleted: 96,
    languagesAr: ["العربية", "الإنجليزية"],
    languagesEn: ["Arabic", "English"],
    specialtiesAr: ["هايكنج وتسلق جبال", "قرى عسير التراثية", "التخييم الجبلي"],
    specialtiesEn: ["Hiking & Mountain Climbing", "Asir Villages", "Mountain Camping"],
    vehicleAr: "سيارة دفع رباعي للرحلات الجبلية 4x4",
    vehicleEn: "4x4 Mountain Safari Vehicle",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    bioAr: "مرشد جبال وطبيعة معتمد في مرتفعات أبها وجبال السودة والقرى الأثرية.",
    bioEn: "Certified mountain & nature guide in Abha, Soodah mountains, and heritage villages.",
  },
];

export default function GuidesDirectoryPage() {
  const { lang } = useLanguage();
  const [searchCity, setSearchCity] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const isAr = lang === "ar";

  const filteredGuides = DEMO_GUIDES.filter((guide) => {
    const city = isAr ? guide.cityAr : guide.cityEn;
    const name = isAr ? guide.nameAr : guide.nameEn;
    const matchesCity = searchCity === "all" || city.includes(searchCity);
    const matchesQuery =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.bioAr.includes(searchQuery) ||
      guide.bioEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesQuery;
  });

  return (
    <>
      {/* Hero */}
      <section style={{ background: "var(--color-bg-primary)", paddingBlock: "100px 40px", borderBottom: "1px solid var(--color-border)" }}>
        <div className="container">
          <div style={{ marginBottom: "16px" }}>
            <BackButton fallbackHref="/" labelAr="الرئيسية" labelEn="Home" lang={lang} />
          </div>
          <div style={{ maxWidth: "700px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)", padding: "6px 14px", borderRadius: "100px", color: "#10B981", fontSize: "12px", fontWeight: 800, marginBottom: "16px" }}>
              ✓ {isAr ? "مرشدون معتمدون من وزارة السياحة السعودية" : "Ministry of Tourism Certified Guides"}
            </div>
            <h1 style={{ fontSize: "var(--text-4xl)", fontWeight: 900, color: "var(--color-text-primary)", marginBottom: "16px" }}>
              {isAr ? "دليل المرشدين السياحيين المحليين" : "Saudi Local Guides Directory"}
            </h1>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-base)", lineHeight: "1.7" }}>
              {isAr
                ? "تواصل مباشرة مع نخبة المرشدين السياحيين المرخصين في المملكة العربية السعودية واكتشف تجاربهم الفريدة والبرامج المخصصة."
                : "Connect directly with certified local guides in Saudi Arabia and explore custom tour experiences."}
            </p>
          </div>
        </div>
      </section>

      {/* Directory & Filters */}
      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container">
          {/* Filters Bar */}
          <div style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)", padding: "16px", borderRadius: "20px", marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["all", isAr ? "العلا" : "AlUla", isAr ? "الرياض" : "Riyadh", isAr ? "جدة" : "Jeddah", isAr ? "عسير" : "Asir"].map((city) => (
                <button
                  key={city}
                  onClick={() => setSearchCity(city)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "12px",
                    border: "none",
                    background: searchCity === city ? "var(--gradient-gold)" : "var(--color-bg-secondary)",
                    color: searchCity === city ? "#0f172a" : "var(--color-text-secondary)",
                    fontWeight: 800,
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  {city === "all" ? (isAr ? "جميع المدن والوجهات" : "All Destinations") : city}
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder={isAr ? "ابحث باسم المرشد..." : "Search guide by name..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: "10px 18px",
                borderRadius: "12px",
                background: "var(--color-bg-secondary)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-primary)",
                fontSize: "13px",
                width: "280px",
                outline: "none",
              }}
            />
          </div>

          {/* Guide Cards Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "24px" }}>
            {filteredGuides.map((guide) => (
              <div
                key={guide.id}
                style={{
                  padding: "24px",
                  borderRadius: "24px",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-bg-card)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "16px",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                <div>
                  {/* Top Header */}
                  <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "16px" }}>
                    <div style={{ width: "70px", height: "70px", borderRadius: "50%", overflow: "hidden", border: "2px solid var(--color-gold-heading)", flexShrink: 0, position: "relative" }}>
                      <Image src={guide.avatar} alt={isAr ? guide.nameAr : guide.nameEn} fill style={{ objectFit: "cover" }} />
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <h3 style={{ fontSize: "17px", fontWeight: 800, color: "var(--color-text-primary)" }}>{isAr ? guide.nameAr : guide.nameEn}</h3>
                        <span style={{ color: "#10B981", fontSize: "14px" }} title={isAr ? "ترخيص معتمد" : "Verified License"}>✓</span>
                      </div>
                      <span style={{ fontSize: "11px", color: "var(--color-gold-heading)", fontFamily: "monospace", display: "block" }}>
                        {isAr ? "رخصة رقم:" : "License No:"} {guide.licenseNo}
                      </span>
                      <span style={{ fontSize: "12px", color: "var(--color-text-muted)", marginTop: "2px", display: "block" }}>
                        📍 {isAr ? guide.cityAr : guide.cityEn}
                      </span>
                    </div>
                  </div>

                  <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: "1.6", marginBottom: "14px" }}>
                    {isAr ? guide.bioAr : guide.bioEn}
                  </p>

                  {/* Specialties badges */}
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" }}>
                    {(isAr ? guide.specialtiesAr : guide.specialtiesEn).map((spec) => (
                      <span key={spec} style={{ fontSize: "11px", background: "rgba(200, 169, 110, 0.15)", color: "var(--color-gold-heading)", padding: "3px 10px", borderRadius: "100px", fontWeight: 700 }}>
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Meta stats */}
                  <div style={{ fontSize: "12px", color: "var(--color-text-secondary)", display: "flex", flexDirection: "column", gap: "4px", padding: "12px", background: "var(--color-accent-bg)", borderRadius: "12px", border: "1px solid var(--color-border)" }}>
                    <div>🗣️ {isAr ? "اللغات:" : "Languages:"} {(isAr ? guide.languagesAr : guide.languagesEn).join(" • ")}</div>
                    <div>🚘 {isAr ? "المركبة:" : "Vehicle:"} {isAr ? guide.vehicleAr : guide.vehicleEn}</div>
                    <div>⭐ {isAr ? "التقييم:" : "Rating:"} <strong style={{ color: "#D97706" }}>{guide.rating}</strong> ({guide.tripsCompleted} {isAr ? "رحلة مكتملة" : "trips"})</div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                  <Link href={`/guides/${guide.id}`} style={{ flex: 1 }}>
                    <Button variant="primary" fullWidth size="sm">
                      {isAr ? "الملف الشخصي والبرامج" : "Profile & Tours"}
                    </Button>
                  </Link>
                  <Link href={`/contact?guide=${encodeURIComponent(isAr ? guide.nameAr : guide.nameEn)}`}>
                    <Button variant="outline" size="sm">
                      {isAr ? "تواصل" : "Chat"}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Escrow Protection Banner */}
      <section style={{ background: "rgba(16, 185, 129, 0.08)", borderTop: "1px solid rgba(16, 185, 129, 0.2)", paddingBlock: "48px" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.2)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "24px", color: "#10B981", marginBottom: "16px" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <h2 style={{ fontSize: "24px", fontWeight: 900, color: "#10B981", marginBottom: "12px" }}>
            {isAr ? "جميع الحجوزات محمية بحساب الضمان المحمي" : "All Bookings Protected with Escrow Guarantee"}
          </h2>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "14px", lineHeight: "1.8" }}>
            {isAr
              ? "عند الحجز مع أي مرشد، تظل المبالغ محفوظة بأمان في حساب الضمان البنكي للمنصة، ولا يتم تحويل أي مستحقات للمرشد إلا بعد إتمام رحلتك وتأكيد رضاك التام عن التجربة."
              : "Booking funds stay safely held in our protected Escrow account and released to the guide only after trip completion."}
          </p>
        </div>
      </section>
    </>
  );
}
