"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Badge } from "@/design-system/primitives";
import { useToast } from "@/design-system/primitives/Toast";
import { useLanguage } from "@/lib/language-provider";
import {
  FileTextIcon,
  CheckCircleIcon,
  PlusIcon,
  TrashIcon,
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "@/components/icons";

interface ItineraryItem {
  id: string;
  time: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
}

export default function CreateProgramWizardPage() {
  const router = useRouter();
  const { lang, isAr } = useLanguage();
  const { success, warning } = useToast();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Info & Location
  const [titleAr, setTitleAr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [destination, setDestination] = useState("alula");
  const [category, setCategory] = useState("heritage");
  const [durationHours, setDurationHours] = useState("6");
  const [meetingPointAr, setMeetingPointAr] = useState("");
  const [meetingPointEn, setMeetingPointEn] = useState("");
  const [overviewAr, setOverviewAr] = useState("");
  const [overviewEn, setOverviewEn] = useState("");

  // Step 2: Itinerary & Inclusions
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([
    {
      id: "it-1",
      time: "09:00 AM",
      titleAr: "التجمع والانطلاق بمركبة الفان الفاخرة",
      titleEn: "Meeting & Luxury Van Departure",
      descriptionAr: "الاستقبال في نقطة التجمع وتقديم القهوة السعودية والتمور.",
      descriptionEn: "Welcome reception with authentic Saudi coffee and dates.",
    },
    {
      id: "it-2",
      time: "10:30 AM",
      titleAr: "جولة المعالم والمقابر التاريخية",
      titleEn: "UNESCO Tombs & Heritage Tour",
      descriptionAr: "استكشاف النقوش الأثرية والشرح التاريخي الميداني.",
      descriptionEn: "Guided walkthrough of ancient inscriptions and monuments.",
    },
  ]);

  const [inclusions, setInclusions] = useState<string[]>([
    isAr ? "مرشد سياحي سعودي مرخص من وزارة السياحة" : "Licensed Saudi Tour Guide",
    isAr ? "تنقلات مكيفة بمركبة حديثة" : "Air-conditioned transfers",
    isAr ? "وجبة غداء نجدية / شعبية فاخرة" : "Traditional lunch",
    isAr ? "رسوم دخول جميع المعالم والتصاريح" : "All entrance tickets & permits",
  ]);
  const [newInclusion, setNewInclusion] = useState("");

  const [exclusions, setExclusions] = useState<string[]>([
    isAr ? "المصروفات الشخصية الهدايا" : "Personal souvenirs",
    isAr ? "تذاكر الطيران للوجهة" : "Flights to destination",
  ]);
  const [newExclusion, setNewExclusion] = useState("");

  // Step 3: Media & Photos
  const [coverImageUrl, setCoverImageUrl] = useState("/media/destinations/alula/01-alula-banner-five.2e16d0ba.fill-1920x1080-a03aa27a.jpg");
  const [promoVideoUrl, setPromoVideoUrl] = useState("");

  // Step 4: Pricing & Capacity
  const [pricePerPersonSar, setPricePerPersonSar] = useState("850");
  const [childPriceSar, setChildPriceSar] = useState("450");
  const [minParticipants, setMinParticipants] = useState("2");
  const [maxParticipants, setMaxParticipants] = useState("12");
  const [cancellationPolicy, setCancellationPolicy] = useState("flexible_24h");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addItineraryStop = () => {
    const newStop: ItineraryItem = {
      id: `it-${Date.now()}`,
      time: "12:00 PM",
      titleAr: "محطة سياحية جديدة",
      titleEn: "New Tour Stop",
      descriptionAr: "وصف الأنشطة والمعالم السياحية في هذه المحطة.",
      descriptionEn: "Description of tour activities and site highlights.",
    };
    setItinerary([...itinerary, newStop]);
  };

  const removeItineraryStop = (id: string) => {
    setItinerary(itinerary.filter((item) => item.id !== id));
  };

  const addInclusionItem = () => {
    if (!newInclusion.trim()) return;
    setInclusions([...inclusions, newInclusion.trim()]);
    setNewInclusion("");
  };

  const addExclusionItem = () => {
    if (!newExclusion.trim()) return;
    setExclusions([...exclusions, newExclusion.trim()]);
    setNewExclusion("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleAr && !titleEn) {
      warning(isAr ? "يرجى كتابة عنوان البرنامج على الأقل." : "Please fill program title.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      success(isAr ? "تم إرسال البرنامج السياحي للمراجعة الميدانية والاعتماد من قبل إدارة المنصة!" : "Program submitted for MOT compliance review!");
      router.push("/guide/programs");
    }, 1200);
  };

  return (
    <div style={{ padding: "var(--space-6)", maxWidth: "1000px", marginInline: "auto" }}>
      {/* Back & Header */}
      <div style={{ marginBottom: "var(--space-6)" }}>
        <Link href="/guide/programs" style={{ fontSize: "var(--text-xs)", color: "var(--color-gold-heading)", textDecoration: "none", fontWeight: 700 }}>
          {isAr ? "← العودة لقائمة البرامج" : "← Back to My Programs"}
        </Link>
        <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 900, marginTop: "var(--space-2)" }}>
          {isAr ? "معالج إنشاء برنامج سياحي جديد" : "New Tour Program Creator Wizard"}
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-sm)", margin: 0 }}>
          {isAr
            ? "أدخل كافة تفاصيل المسار والأنشطة والأسعار لتوثيق برنامجك وتوافقه مع معايير وزارة السياحة MOT."
            : "Enter full itinerary, inclusions, photos, and pricing for MOT compliance review."}
        </p>
      </div>

      {/* Progress Stepper Bar */}
      <div
        className="glass"
        style={{
          padding: "var(--space-4)",
          borderRadius: "var(--radius-xl)",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "8px",
          marginBottom: "var(--space-8)",
          textAlign: "center",
          fontSize: "12px",
          fontWeight: 800,
        }}
      >
        <div style={{ color: currentStep >= 1 ? "var(--color-gold-heading)" : "var(--color-text-muted)" }}>
          1. {isAr ? "المعلومات والوجهة" : "Info & Region"}
        </div>
        <div style={{ color: currentStep >= 2 ? "var(--color-gold-heading)" : "var(--color-text-muted)" }}>
          2. {isAr ? "المسار والمشمولات" : "Itinerary & Services"}
        </div>
        <div style={{ color: currentStep >= 3 ? "var(--color-gold-heading)" : "var(--color-text-muted)" }}>
          3. {isAr ? "الصور والوسائط" : "Media & Gallery"}
        </div>
        <div style={{ color: currentStep >= 4 ? "var(--color-gold-heading)" : "var(--color-text-muted)" }}>
          4. {isAr ? "التسعير والسعة" : "Pricing & Policy"}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="glass" style={{ padding: "var(--space-8)", borderRadius: "var(--radius-2xl)", border: "1px solid var(--color-border)" }}>
        
        {/* STEP 1: Basic Info */}
        {currentStep === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 800, margin: 0 }}>
              {isAr ? "الخطوة الأولى: المعلومات الأساسية والوجهة" : "Step 1: Basic Tour Information"}
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                  {isAr ? "عنوان البرنامج (بالعربية) *" : "Tour Title (Arabic) *"}
                </label>
                <input
                  type="text"
                  value={titleAr}
                  onChange={(e) => setTitleAr(e.target.value)}
                  placeholder={isAr ? "مثال: جولة تاريخية شاملة في مدائن صالح والعلا" : "e.g. Historic Hegra Tour"}
                  required
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                  {isAr ? "عنوان البرنامج (بالإنجليزية)" : "Tour Title (English)"}
                </label>
                <input
                  type="text"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder="e.g. Complete Hegra UNESCO & Old Town Tour"
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", fontSize: "13px" }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                  {isAr ? "الوجهة السياحية *" : "Destination Region *"}
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", fontSize: "13px" }}
                >
                  <option value="alula">{isAr ? "العلا" : "AlUla"}</option>
                  <option value="riyadh">{isAr ? "الرياض والدرعية" : "Riyadh & Diriyah"}</option>
                  <option value="jeddah">{isAr ? "جدة والبلد" : "Jeddah & Al-Balad"}</option>
                  <option value="aseer">{isAr ? "أبها وعسير" : "Abha & Aseer"}</option>
                  <option value="al-ahsa">{isAr ? "الأحساء" : "Al-Ahsa"}</option>
                  <option value="the-red-sea">{isAr ? "البحر الأحمر" : "The Red Sea"}</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                  {isAr ? "فئة التجربة *" : "Tour Category *"}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", fontSize: "13px" }}
                >
                  <option value="heritage">{isAr ? "تراث وآثار تاريخية" : "Heritage & Monuments"}</option>
                  <option value="safari">{isAr ? "سفاري ومغامرات صحراوية" : "Desert Safari & Adventure"}</option>
                  <option value="coastal">{isAr ? "سواحل وغوص بحري" : "Coastal & Diving"}</option>
                  <option value="culinary">{isAr ? "طهي وتذوق شعبي" : "Culinary & Local Tasting"}</option>
                  <option value="nature">{isAr ? "طبيعة وهايكنج جبال" : "Nature & Hiking"}</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                  {isAr ? "مدة الرحلة (بالساعات) *" : "Duration (Hours) *"}
                </label>
                <input
                  type="number"
                  value={durationHours}
                  onChange={(e) => setDurationHours(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", fontSize: "13px" }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                {isAr ? "نقطة التجمع والاستقبال *" : "Meeting Location & Coordinates *"}
              </label>
              <input
                type="text"
                value={meetingPointAr}
                onChange={(e) => setMeetingPointAr(e.target.value)}
                placeholder={isAr ? "مثال: صالة الاستقبال بمطار العلا الدولي أو منتجع هابيتاس" : "e.g. AlUla Airport VIP Lounge or Hotel Lobby"}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", fontSize: "13px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                {isAr ? "وصف عام ومقدمة عن الجولة" : "Tour Overview & Highlights"}
              </label>
              <textarea
                rows={4}
                value={overviewAr}
                onChange={(e) => setOverviewAr(e.target.value)}
                placeholder={isAr ? "اكتب نبذة ملهمة توضح تفاصيل الجولة وما يكتشفه المسافر..." : "Describe the tour highlights..."}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", fontSize: "13px", resize: "none" }}
              />
            </div>
          </div>
        )}

        {/* STEP 2: Itinerary & Inclusions */}
        {currentStep === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 800, margin: 0 }}>
              {isAr ? "الخطوة الثانية: المسار التفصيلي والخدمات المشمولة" : "Step 2: Detailed Itinerary & Inclusions"}
            </h2>

            {/* Itinerary Timeline list */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <h3 style={{ fontSize: "14px", fontWeight: 800, margin: 0 }}>{isAr ? "محطات ومواعيد الجولة (Timeline Stops)" : "Tour Timeline Stops"}</h3>
                <Button variant="outline" size="sm" type="button" onClick={addItineraryStop}>
                  <PlusIcon size={14} />
                  <span>{isAr ? "إضافة محطة للمسار" : "Add Stop"}</span>
                </Button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {itinerary.map((stop, idx) => (
                  <div key={stop.id} style={{ background: "var(--color-bg-secondary)", padding: "14px", borderRadius: "12px", border: "1px solid var(--color-border)", display: "grid", gridTemplateColumns: "100px 1fr 40px", gap: "12px", alignItems: "center" }}>
                    <div>
                      <span style={{ fontSize: "11px", color: "var(--color-text-muted)", display: "block" }}>{isAr ? `المحطة ${idx + 1}` : `Stop ${idx + 1}`}</span>
                      <input
                        type="text"
                        value={stop.time}
                        onChange={(e) => {
                          const updated = [...itinerary];
                          updated[idx].time = e.target.value;
                          setItinerary(updated);
                        }}
                        style={{ width: "100%", padding: "6px", borderRadius: "6px", border: "1px solid var(--color-border)", fontSize: "12px", fontFamily: "monospace", fontWeight: 800 }}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        value={stop.titleAr}
                        onChange={(e) => {
                          const updated = [...itinerary];
                          updated[idx].titleAr = e.target.value;
                          setItinerary(updated);
                        }}
                        placeholder="عنوان المحطة"
                        style={{ width: "100%", padding: "6px 10px", borderRadius: "6px", border: "1px solid var(--color-border)", fontSize: "13px", fontWeight: 800, marginBottom: "4px" }}
                      />
                      <input
                        type="text"
                        value={stop.descriptionAr}
                        onChange={(e) => {
                          const updated = [...itinerary];
                          updated[idx].descriptionAr = e.target.value;
                          setItinerary(updated);
                        }}
                        placeholder="وصف الأنشطة المعالم في هذه المحطة..."
                        style={{ width: "100%", padding: "6px 10px", borderRadius: "6px", border: "1px solid var(--color-border)", fontSize: "12px" }}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItineraryStop(stop.id)}
                      style={{ background: "rgba(239,68,68,0.1)", border: "none", borderRadius: "6px", padding: "8px", cursor: "pointer" }}
                    >
                      <TrashIcon size={16} color="#EF4444" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {/* Inclusions */}
              <div style={{ background: "var(--color-bg-secondary)", padding: "16px", borderRadius: "12px", border: "1px solid var(--color-border)" }}>
                <h4 style={{ fontSize: "13px", fontWeight: 800, color: "#10B981", marginBottom: "10px" }}>
                  {isAr ? "الخدمات المشمولة في السعر:" : "Included Services:"}
                </h4>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px" }}>
                  {inclusions.map((inc, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--color-bg-card)", padding: "6px 10px", borderRadius: "6px", fontSize: "12px" }}>
                      <span>• {inc}</span>
                      <button type="button" onClick={() => setInclusions(inclusions.filter((_, idx) => idx !== i))} style={{ border: "none", background: "transparent", color: "#EF4444", cursor: "pointer" }}>✕</button>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: "6px" }}>
                  <input
                    type="text"
                    value={newInclusion}
                    onChange={(e) => setNewInclusion(e.target.value)}
                    placeholder={isAr ? "إضافة خدمة مشمولة..." : "Add inclusion..."}
                    style={{ flex: 1, padding: "6px 10px", borderRadius: "6px", border: "1px solid var(--color-border)", fontSize: "12px" }}
                  />
                  <Button variant="outline" size="sm" type="button" onClick={addInclusionItem}>+</Button>
                </div>
              </div>

              {/* Exclusions */}
              <div style={{ background: "var(--color-bg-secondary)", padding: "16px", borderRadius: "12px", border: "1px solid var(--color-border)" }}>
                <h4 style={{ fontSize: "13px", fontWeight: 800, color: "#EF4444", marginBottom: "10px" }}>
                  {isAr ? "غير مشمول في السعر:" : "Excluded Services:"}
                </h4>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px" }}>
                  {exclusions.map((exc, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--color-bg-card)", padding: "6px 10px", borderRadius: "6px", fontSize: "12px" }}>
                      <span>• {exc}</span>
                      <button type="button" onClick={() => setExclusions(exclusions.filter((_, idx) => idx !== i))} style={{ border: "none", background: "transparent", color: "#EF4444", cursor: "pointer" }}>✕</button>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: "6px" }}>
                  <input
                    type="text"
                    value={newExclusion}
                    onChange={(e) => setNewExclusion(e.target.value)}
                    placeholder={isAr ? "إضافة عنصر غير مشمول..." : "Add exclusion..."}
                    style={{ flex: 1, padding: "6px 10px", borderRadius: "6px", border: "1px solid var(--color-border)", fontSize: "12px" }}
                  />
                  <Button variant="outline" size="sm" type="button" onClick={addExclusionItem}>+</Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Media & Gallery */}
        {currentStep === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 800, margin: 0 }}>
              {isAr ? "الخطوة الثالثة: الألبوم والوسائط عالية الدقة" : "Step 3: High-Res Photos & Media Gallery"}
            </h2>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                {isAr ? "رابط الصورة الرئيسية (Cover Photo URL) *" : "Main Cover Photo URL *"}
              </label>
              <input
                type="text"
                value={coverImageUrl}
                onChange={(e) => setCoverImageUrl(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", fontSize: "13px" }}
              />
            </div>

            <div style={{ border: "2px dashed var(--color-gold-heading)", padding: "32px", borderRadius: "16px", textAlign: "center", background: "rgba(200, 169, 110, 0.05)" }}>
              <FileTextIcon size={40} color="var(--color-gold-heading)" style={{ margin: "0 auto 12px" }} />
              <span style={{ fontSize: "14px", fontWeight: 800, display: "block", color: "var(--color-gold-heading)" }}>
                {isAr ? "اسحب وأسقط ألبوم صور البرنامج هنا (يلزم 5 صور عالية النقاء)" : "Drag & Drop High-Res Tour Photos (Min 5 Photos)"}
              </span>
              <span style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>
                {isAr ? "يدعم صيغ JPG, PNG, WEBP بدقة لا تقل عن 1920x1080" : "Supports JPG, PNG, WEBP (Min 1920x1080)"}
              </span>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                {isAr ? "رابط فيديو ترويجي (YouTube / Vimeo / MP4)" : "Promo Video Link (Optional)"}
              </label>
              <input
                type="text"
                value={promoVideoUrl}
                onChange={(e) => setPromoVideoUrl(e.target.value)}
                placeholder="https://..."
                style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", fontSize: "13px" }}
              />
            </div>
          </div>
        )}

        {/* STEP 4: Pricing & Policies */}
        {currentStep === 4 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 800, margin: 0 }}>
              {isAr ? "الخطوة الرابعة: هيكل التسعير وسياسة الإلغاء" : "Step 4: Pricing Structure & Policies"}
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                  {isAr ? "سعر الفرد البالغ (بالريال السعودي SAR) *" : "Adult Price per Person (SAR) *"}
                </label>
                <input
                  type="number"
                  value={pricePerPersonSar}
                  onChange={(e) => setPricePerPersonSar(e.target.value)}
                  required
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", fontSize: "14px", fontWeight: 900, color: "var(--color-saudi-green)" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                  {isAr ? "سعر الطفل (تحت 12 سنة)" : "Child Price (Under 12)"}
                </label>
                <input
                  type="number"
                  value={childPriceSar}
                  onChange={(e) => setChildPriceSar(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", fontSize: "13px" }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                  {isAr ? "الحد الأدنى للمشاركين" : "Min Group Size"}
                </label>
                <input
                  type="number"
                  value={minParticipants}
                  onChange={(e) => setMinParticipants(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                  {isAr ? "الحد الأقصى للمشاركين (الطاقة الاستيعابية)" : "Max Group Capacity"}
                </label>
                <input
                  type="number"
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", fontSize: "13px" }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                {isAr ? "سياسة الإلغاء والاسترداد المعتمدة *" : "Cancellation Policy *"}
              </label>
              <select
                value={cancellationPolicy}
                onChange={(e) => setCancellationPolicy(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)", fontSize: "13px" }}
              >
                <option value="flexible_24h">{isAr ? "مرنة: إلغاء مجاني حتى 24 ساعة قبل الجولة" : "Flexible: Free cancellation up to 24h"}</option>
                <option value="moderate_48h">{isAr ? "معتدلة: إلغاء مجاني حتى 48 ساعة قبل الجولة" : "Moderate: Free cancellation up to 48h"}</option>
                <option value="strict_7d">{isAr ? "صارمة: استرداد 50% فقط عند الإلغاء قبل 7 أيام" : "Strict: 50% refund up to 7 days"}</option>
              </select>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "24px", paddingTop: "16px", borderTop: "1px solid var(--color-border)" }}>
          {currentStep > 1 ? (
            <Button variant="outline" type="button" onClick={() => setCurrentStep((currentStep - 1) as any)}>
              {isAr ? "← الخطوة السابقة" : "← Previous"}
            </Button>
          ) : <div />}

          {currentStep < 4 ? (
            <Button variant="primary" type="button" onClick={() => setCurrentStep((currentStep + 1) as any)}>
              {isAr ? "الخطوة التالية →" : "Next Step →"}
            </Button>
          ) : (
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              <ShieldCheckIcon size={18} />
              <span>{isSubmitting ? (isAr ? "جاري الإرسال..." : "Submitting...") : (isAr ? "إرسال البرنامج للمراجعة والاعتماد" : "Submit for Approval")}</span>
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
