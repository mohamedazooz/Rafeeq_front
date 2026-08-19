"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Badge } from "@/design-system/primitives";
import { useToast } from "@/design-system/primitives/Toast";
import { BackButton } from "@/components/ui/BackButton";
import { useLanguage } from "@/lib/language-provider";
import { formatPrice } from "@/lib/utils/currency";
import { ALL_COUNTRY_CODES } from "@/lib/country-codes";
import {
  ShieldCheckIcon,
  CreditCardIcon,
  CalendarIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  GlobeIcon,
  UserIcon,
} from "@/components/icons";

interface CheckoutProgram {
  id: string;
  titleAr: string;
  titleEn: string;
  locationAr: string;
  locationEn: string;
  pricePerPersonSar: number;
  pricePerPersonHalalas: bigint;
  image: string;
  guideNameAr: string;
  guideNameEn: string;
  guideRating: number;
}

const MOCK_PROGRAMS_MAP: Record<string, CheckoutProgram> = {
  "prog-alula-1": {
    id: "prog-alula-1",
    titleAr: "جولة تاريخية شاملة في مدائن صالح والبلدة القديمة بالعلا",
    titleEn: "Hegra UNESCO Tombs & Desert Rock Formations in AlUla",
    locationAr: "العلا — المنطقة الشمالية الغربية",
    locationEn: "AlUla — Northwestern Province",
    pricePerPersonSar: 850,
    pricePerPersonHalalas: BigInt(85000),
    image: "/media/destinations/alula/01-alula-banner-five.2e16d0ba.fill-1920x1080-a03aa27a.jpg",
    guideNameAr: "عبد العزيز الشمري",
    guideNameEn: "Abdulaziz Al-Shammari",
    guideRating: 4.95,
  },
  "prog-riyadh-1": {
    id: "prog-riyadh-1",
    titleAr: "سفاري صحراء الرياض وجلسة كشتة نجدي أصيلة",
    titleEn: "Riyadh Desert Dune Safari & Authentic Najdi Campfire",
    locationAr: "الرياض — الدرعية",
    locationEn: "Riyadh — Diriyah",
    pricePerPersonSar: 450,
    pricePerPersonHalalas: BigInt(45000),
    image: "/media/destinations/riyadh/01-riyadh-banner-new.2e16d0ba.fill-1920x1080-be8fd66c.jpg",
    guideNameAr: "سعود الدوسري",
    guideNameEn: "Saud Al-Dosari",
    guideRating: 4.98,
  },
};

const DEFAULT_PROGRAM: CheckoutProgram = {
  id: "prog-alula-1",
  titleAr: "جولة تاريخية شاملة في مدائن صالح والبلدة القديمة بالعلا",
  titleEn: "Hegra UNESCO Tombs & Desert Rock Formations in AlUla",
  locationAr: "العلا — المنطقة الشمالية الغربية",
  locationEn: "AlUla — Northwestern Province",
  pricePerPersonSar: 850,
  pricePerPersonHalalas: BigInt(85000),
  image: "/media/destinations/alula/01-alula-banner-five.2e16d0ba.fill-1920x1080-a03aa27a.jpg",
  guideNameAr: "عبد العزيز الشمري",
  guideNameEn: "Abdulaziz Al-Shammari",
  guideRating: 4.95,
};

export default function CheckoutPage({
  params,
}: {
  readonly params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { success, error, warning } = useToast();
  const { lang, isAr, t } = useLanguage();

  const dateParam = searchParams?.get("date") || new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0];
  const participantsParam = Number(searchParams?.get("participants")) || 2;

  const [program] = useState<CheckoutProgram>(() => MOCK_PROGRAMS_MAP[id] || DEFAULT_PROGRAM);
  const [participants] = useState<number>(participantsParam);
  const [tripDate] = useState<string>(dateParam);

  // Traveler Details State
  const [travelerType, setTravelerType] = useState<"domestic" | "international">("domestic");
  const [fullName, setFullName] = useState(isAr ? "محمد بن عبد العزيز المنصور" : "Mohammed Al-Mansour");
  const [email, setEmail] = useState("traveler@example.com");
  const [phone, setPhone] = useState("+966 55 123 4567");
  const [nationality, setNationality] = useState("SA");
  const [countryOfResidence, setCountryOfResidence] = useState(isAr ? "المملكة العربية السعودية" : "Saudi Arabia");
  
  // Domestic fields
  const [nationalId, setNationalId] = useState("1098765432");

  // International fields
  const [passportNumber, setPassportNumber] = useState("N8942109");
  const [passportExpiry, setPassportExpiry] = useState("2030-12-31");
  const [saudiVisaType, setSaudiVisaType] = useState("evisa");
  const [visaNumber, setVisaNumber] = useState("V-2026-99014");
  const [arrivalAirport, setArrivalAirport] = useState("RUH - King Khalid Intl (Riyadh)");
  const [arrivalFlightNo, setArrivalFlightNo] = useState("SV 120");
  const [arrivalDateTime, setArrivalDateTime] = useState("");
  const [hotelInSaudi, setHotelInSaudi] = useState("Habitas AlUla Resort");

  // Dietary, Health & Logistics
  const [dietaryPreference, setDietaryPreference] = useState("halal_standard");
  const [mobilityLevel, setMobilityLevel] = useState("standard");
  const [emergencyName, setEmergencyName] = useState(isAr ? "خالد المنصور" : "Khaled Al-Mansour");
  const [emergencyRelation, setEmergencyRelation] = useState(isAr ? "أخ" : "Brother");
  const [emergencyPhone, setEmergencyPhone] = useState("+966 50 999 8888");
  const [insuranceProvider, setInsuranceProvider] = useState("Allianz Global Travel Care");
  const [insurancePolicyNumber, setInsurancePolicyNumber] = useState("POL-8849201");

  // Payment & Timer State
  const [paymentMethod, setPaymentMethod] = useState<"mada" | "apple_pay" | "visa">("mada");
  const [specialNotes, setSpecialNotes] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(900); // 15 Minutes

  useEffect(() => {
    if (timeLeftSeconds <= 0) {
      warning(t.checkout.softLockExpired);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeftSeconds, warning, t.checkout.softLockExpired]);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSecs = sec % 60;
    return `${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
  };

  // Pricing calculations (with Halalas precision)
  const basePriceHalalas = program.pricePerPersonHalalas * BigInt(participants);
  const vatHalalas = (basePriceHalalas * BigInt(15)) / BigInt(100);
  const serviceFeeHalalas = BigInt(2500); // 25 SAR
  const grandTotalHalalas = basePriceHalalas + vatHalalas + serviceFeeHalalas;

  const formattedBase = formatPrice(basePriceHalalas, lang, true);
  const formattedVat = formatPrice(vatHalalas, lang, true);
  const formattedServiceFee = formatPrice(serviceFeeHalalas, lang, true);
  const formattedGrandTotal = formatPrice(grandTotalHalalas, lang, true);

  const displayTitle = isAr ? program.titleAr : program.titleEn;
  const displayLocation = isAr ? program.locationAr : program.locationEn;
  const displayGuide = isAr ? program.guideNameAr : program.guideNameEn;

  const handleExecutePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (timeLeftSeconds <= 0) {
      error(t.checkout.softLockExpired);
      return;
    }

    setIsProcessing(true);

    try {
      setTimeout(() => {
        setIsProcessing(false);
        success(t.checkout.paymentSuccess);
        router.push("/client/bookings/RFQ-2026-9042");
      }, 1500);
    } catch {
      setIsProcessing(false);
      error(t.checkout.paymentError);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg-primary)", padding: "var(--space-8) var(--space-4)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Header with BackButton */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-6)", flexWrap: "wrap", gap: "12px" }}>
          <BackButton fallbackHref={`/programs/${id}`} labelAr="العودة لتفاصيل البرنامج" labelEn="Back to Program Details" />
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>{t.checkout.sslBadge}:</span>
            <Badge variant="success">🔒 SSL 256-bit</Badge>
          </div>
        </div>

        {/* Soft Lock Timer Banner */}
        <div
          style={{
            background: timeLeftSeconds > 180 ? "rgba(200, 169, 110, 0.12)" : "rgba(239, 68, 68, 0.12)",
            border: `1px solid ${timeLeftSeconds > 180 ? "var(--color-gold-royal)" : "var(--color-danger)"}`,
            borderRadius: "var(--radius-xl)",
            padding: "var(--space-4) var(--space-6)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "var(--space-8)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <CalendarIcon size={22} color="var(--color-gold-heading)" />
            <div>
              <h4 style={{ margin: 0, fontSize: "var(--text-sm)", fontWeight: 800 }}>
                {t.checkout.softLockTitle}
              </h4>
              <p style={{ margin: 0, fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>
                {t.checkout.softLockDesc}
              </p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "var(--color-bg-card)", padding: "6px 16px", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)" }}>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>{t.checkout.timeLeft}</span>
            <span style={{ fontSize: "var(--text-xl)", fontWeight: 900, fontFamily: "monospace", color: timeLeftSeconds > 180 ? "var(--color-gold-heading)" : "var(--color-danger)" }}>
              {formatTimer(timeLeftSeconds)}
            </span>
          </div>
        </div>

        {/* Main Form & Grid */}
        <form onSubmit={handleExecutePayment} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr)) 380px", gap: "var(--space-8)", alignItems: "start" }}>
          
          {/* Left Column: Traveler Details & Payment Selection */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
            
            {/* Tour & Guide Summary Card */}
            <div className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-2xl)", border: "1px solid var(--color-border)" }}>
              <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                <div style={{ position: "relative", width: "90px", height: "90px", borderRadius: "var(--radius-lg)", overflow: "hidden", flexShrink: 0 }}>
                  <Image src={program.image} alt={displayTitle} fill style={{ objectFit: "cover" }} />
                </div>
                <div>
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--color-gold-heading)", fontWeight: 700 }}>
                    {displayLocation}
                  </span>
                  <h3 style={{ fontSize: "var(--text-base)", fontWeight: 800, margin: "4px 0" }}>
                    {displayTitle}
                  </h3>
                  <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", margin: 0 }}>
                    {t.checkout.guideTitle} <strong style={{ color: "var(--color-text-primary)" }}>{displayGuide}</strong> (★ {program.guideRating})
                  </p>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "var(--space-4)", paddingTop: "var(--space-4)", borderTop: "1px solid var(--color-border)" }}>
                <div>
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", display: "block" }}>{t.checkout.tripDate}</span>
                  <strong style={{ fontSize: "var(--text-sm)" }}>{tripDate}</strong>
                </div>
                <div>
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", display: "block" }}>{t.checkout.participantsCount}</span>
                  <strong style={{ fontSize: "var(--text-sm)" }}>{participants} {t.common.participants}</strong>
                </div>
              </div>
            </div>

            {/* Traveler Identification & Documentation Card */}
            <div className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-2xl)", border: "1px solid var(--color-border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-4)", flexWrap: "wrap", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <UserIcon size={20} color="var(--color-gold-heading)" />
                  <h3 style={{ fontSize: "var(--text-base)", fontWeight: 800, margin: 0 }}>
                    {t.checkout.travelerInfo}
                  </h3>
                </div>

                {/* Domestic vs International Switcher */}
                <div style={{ display: "flex", background: "var(--color-bg-secondary)", padding: "3px", borderRadius: "var(--radius-full)", border: "1px solid var(--color-border)" }}>
                  <button
                    type="button"
                    onClick={() => { setTravelerType("domestic"); setNationality("SA"); }}
                    style={{
                      padding: "4px 12px",
                      borderRadius: "var(--radius-full)",
                      border: "none",
                      background: travelerType === "domestic" ? "var(--color-gold-royal)" : "transparent",
                      color: travelerType === "domestic" ? "var(--color-midnight-blue)" : "var(--color-text-secondary)",
                      fontSize: "11px",
                      fontWeight: 800,
                      cursor: "pointer",
                    }}
                  >
                    🇸🇦 {isAr ? "مواطن / مقيم" : "Domestic / Resident"}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setTravelerType("international"); if (nationality === "SA") setNationality("US"); }}
                    style={{
                      padding: "4px 12px",
                      borderRadius: "var(--radius-full)",
                      border: "none",
                      background: travelerType === "international" ? "var(--color-gold-royal)" : "transparent",
                      color: travelerType === "international" ? "var(--color-midnight-blue)" : "var(--color-text-secondary)",
                      fontSize: "11px",
                      fontWeight: 800,
                      cursor: "pointer",
                    }}
                  >
                    🌍 {isAr ? "سائح دولي" : "International Tourist"}
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                    {t.checkout.fullName} *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                      {t.checkout.email} *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                      {t.checkout.phone} *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px", direction: "ltr", textAlign: isAr ? "right" : "left" }}
                    />
                  </div>
                </div>

                {/* Nationality & Country of Residence */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                      {t.checkout.nationality} *
                    </label>
                    <select
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
                    >
                      {ALL_COUNTRY_CODES.map((c) => (
                        <option key={`${c.iso}-${c.code}`} value={c.iso}>
                          {c.flag} {isAr ? c.countryAr : c.countryEn} ({c.code})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                      {t.checkout.countryOfResidence} *
                    </label>
                    <input
                      type="text"
                      value={countryOfResidence}
                      onChange={(e) => setCountryOfResidence(e.target.value)}
                      required
                      style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
                    />
                  </div>
                </div>

                {/* Conditional Fields based on Domestic vs International */}
                {travelerType === "domestic" ? (
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                      {t.checkout.nationalId} *
                    </label>
                    <input
                      type="text"
                      value={nationalId}
                      onChange={(e) => setNationalId(e.target.value)}
                      required
                      placeholder="10XXXXXXXX"
                      style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px", fontFamily: "monospace" }}
                    />
                  </div>
                ) : (
                  <>
                    <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "12px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                          {t.checkout.passportNumber} *
                        </label>
                        <input
                          type="text"
                          value={passportNumber}
                          onChange={(e) => setPassportNumber(e.target.value)}
                          required
                          placeholder="e.g. N12345678"
                          style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px", fontFamily: "monospace" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                          {t.checkout.passportExpiry} *
                        </label>
                        <input
                          type="date"
                          value={passportExpiry}
                          onChange={(e) => setPassportExpiry(e.target.value)}
                          required
                          style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
                        />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                          {t.checkout.saudiVisaType} *
                        </label>
                        <select
                          value={saudiVisaType}
                          onChange={(e) => setSaudiVisaType(e.target.value)}
                          style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
                        >
                          <option value="evisa">{t.checkout.visaTypeEvisa}</option>
                          <option value="arrival">{t.checkout.visaTypeArrival}</option>
                          <option value="gcc">{t.checkout.visaTypeGcc}</option>
                          <option value="transit">{t.checkout.visaTypeTransit}</option>
                          <option value="umrah">{t.checkout.visaTypeUmrah}</option>
                          <option value="resident">{t.checkout.visaTypeResident}</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                          {t.checkout.visaOrBorderNumber}
                        </label>
                        <input
                          type="text"
                          value={visaNumber}
                          onChange={(e) => setVisaNumber(e.target.value)}
                          placeholder="Visa # or Border #"
                          style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
                        />
                      </div>
                    </div>

                    {/* Flight & Hotel in KSA */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                          {t.checkout.arrivalAirport}
                        </label>
                        <input
                          type="text"
                          value={arrivalAirport}
                          onChange={(e) => setArrivalAirport(e.target.value)}
                          placeholder="Airport / Port name"
                          style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                          {t.checkout.hotelInSaudi}
                        </label>
                        <input
                          type="text"
                          value={hotelInSaudi}
                          onChange={(e) => setHotelInSaudi(e.target.value)}
                          placeholder="Hotel / Resort name"
                          style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Dietary Preferences & Emergency Contact */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", paddingTop: "8px", borderTop: "1px solid var(--color-border)" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                      {t.checkout.dietaryPreference}
                    </label>
                    <select
                      value={dietaryPreference}
                      onChange={(e) => setDietaryPreference(e.target.value)}
                      style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px" }}
                    >
                      <option value="halal_standard">{t.checkout.dietHalalStandard}</option>
                      <option value="vegetarian">{t.checkout.dietVegetarian}</option>
                      <option value="vegan">{t.checkout.dietVegan}</option>
                      <option value="gluten_free">{t.checkout.dietGlutenFree}</option>
                      <option value="nut_allergy">{t.checkout.dietNutAllergy}</option>
                      <option value="other">{t.checkout.dietOther}</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                      {t.checkout.emergencyPhone}
                    </label>
                    <input
                      type="tel"
                      value={emergencyPhone}
                      onChange={(e) => setEmergencyPhone(e.target.value)}
                      placeholder="+966 5X XXX XXXX"
                      style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-primary)", fontSize: "13px", direction: "ltr", textAlign: isAr ? "right" : "left" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="glass" style={{ padding: "var(--space-6)", borderRadius: "var(--radius-2xl)", border: "1px solid var(--color-border)" }}>
              <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, marginBottom: "var(--space-4)" }}>
                {t.checkout.paymentMethod} 💳
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "var(--space-6)" }}>
                {/* Mada */}
                <label
                  onClick={() => setPaymentMethod("mada")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 18px",
                    borderRadius: "var(--radius-xl)",
                    border: `2px solid ${paymentMethod === "mada" ? "var(--color-saudi-green)" : "var(--color-border)"}`,
                    background: paymentMethod === "mada" ? "rgba(0, 108, 53, 0.08)" : "var(--color-bg-card)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <input type="radio" name="pay" checked={paymentMethod === "mada"} readOnly style={{ accentColor: "var(--color-saudi-green)" }} />
                    <span style={{ fontWeight: 800, fontSize: "var(--text-sm)" }}>{t.checkout.payMada}</span>
                  </div>
                  <Badge variant="outline">{t.checkout.payMadaBadge}</Badge>
                </label>

                {/* Apple Pay */}
                <label
                  onClick={() => setPaymentMethod("apple_pay")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 18px",
                    borderRadius: "var(--radius-xl)",
                    border: `2px solid ${paymentMethod === "apple_pay" ? "var(--color-gold-royal)" : "var(--color-border)"}`,
                    background: paymentMethod === "apple_pay" ? "rgba(200, 169, 110, 0.08)" : "var(--color-bg-card)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <input type="radio" name="pay" checked={paymentMethod === "apple_pay"} readOnly style={{ accentColor: "var(--color-gold-royal)" }} />
                    <span style={{ fontWeight: 800, fontSize: "var(--text-sm)" }}>{t.checkout.payApplePay}</span>
                  </div>
                  <span style={{ fontSize: "var(--text-xs)", fontWeight: 700 }}> Pay</span>
                </label>

                {/* Visa / Master */}
                <label
                  onClick={() => setPaymentMethod("visa")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 18px",
                    borderRadius: "var(--radius-xl)",
                    border: `2px solid ${paymentMethod === "visa" ? "var(--color-gold-royal)" : "var(--color-border)"}`,
                    background: paymentMethod === "visa" ? "rgba(200, 169, 110, 0.08)" : "var(--color-bg-card)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <input type="radio" name="pay" checked={paymentMethod === "visa"} readOnly style={{ accentColor: "var(--color-gold-royal)" }} />
                    <span style={{ fontWeight: 800, fontSize: "var(--text-sm)" }}>{t.checkout.payVisa}</span>
                  </div>
                  <CreditCardIcon size={18} />
                </label>
              </div>

              {/* Special Notes */}
              <div>
                <label style={{ display: "block", fontSize: "var(--text-xs)", fontWeight: 700, marginBottom: "6px" }}>
                  {t.checkout.specialNotes}
                </label>
                <textarea
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder={t.checkout.specialNotesPlaceholder}
                  rows={2}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--color-border)",
                    background: "var(--color-bg-secondary)",
                    color: "var(--color-text-primary)",
                    fontSize: "var(--text-xs)",
                    resize: "none",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Transparent Tax Invoice & Escrow Guarantee */}
          <div>
            <div
              className="glass"
              style={{
                position: "sticky",
                top: "calc(var(--header-height) + var(--space-4))",
                padding: "var(--space-6)",
                borderRadius: "var(--radius-2xl)",
                border: "1px solid var(--color-gold-royal)",
                boxShadow: "var(--shadow-gold)",
              }}
            >
              <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 900, marginBottom: "var(--space-4)", color: "var(--color-gold-heading)" }}>
                {t.checkout.invoiceSummary} 🧾
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "var(--text-sm)", marginBottom: "var(--space-6)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-secondary)" }}>
                  <span>{t.checkout.basePrice} ({participants} × {formatPrice(program.pricePerPersonHalalas, lang, true)}):</span>
                  <span>{formattedBase}</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-secondary)" }}>
                  <span>{t.checkout.vatAmount}:</span>
                  <span>{formattedVat}</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-secondary)" }}>
                  <span>{t.checkout.serviceFee}:</span>
                  <span>{formattedServiceFee}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    paddingTop: "14px",
                    marginTop: "6px",
                    borderTop: "1px solid var(--color-border)",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", display: "block" }}>
                      {t.checkout.totalAmount}:
                    </span>
                    <span style={{ fontSize: "var(--text-3xl)", fontWeight: 900, color: "var(--color-saudi-green)" }}>
                      {formattedGrandTotal}
                    </span>
                  </div>
                </div>
              </div>

              {/* Escrow Guarantee Box */}
              <div
                style={{
                  background: "rgba(16, 185, 129, 0.08)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  borderRadius: "var(--radius-lg)",
                  padding: "12px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  marginBottom: "var(--space-6)",
                }}
              >
                <ShieldCheckIcon size={24} color="#10B981" />
                <p style={{ margin: 0, fontSize: "11px", color: "var(--color-text-secondary)", lineHeight: 1.4 }}>
                  {t.checkout.escrowGuaranteeText}
                </p>
              </div>

              {/* Pay Button */}
              <Button
                variant="primary"
                fullWidth
                size="lg"
                type="submit"
                disabled={isProcessing || timeLeftSeconds <= 0}
              >
                {isProcessing ? t.checkout.processingPayment : `${t.checkout.payAndEscrowBtn} (${formattedGrandTotal})`}
              </Button>

              <div style={{ textAlign: "center", marginTop: "12px" }}>
                <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>
                  {t.checkout.termsAgreement}
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
