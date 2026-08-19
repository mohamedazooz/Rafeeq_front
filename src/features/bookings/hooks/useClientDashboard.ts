"use client";

import { useState, useEffect } from "react";
import { formatPrice } from "@/lib/utils/currency";

export function useClientDashboard(lang: "ar" | "en") {
  const [userName] = useState(lang === "ar" ? "محمد العتيبي" : "Mohammed Al-Otaibi");
  const [nextTrip] = useState({
    id: "book-101",
    titleAr: "جولة مدائن صالح والبلدة القديمة بالعلا",
    titleEn: "Hegra UNESCO Tombs & AlUla Old Town",
    guideNameAr: "عبد العزيز الشمري",
    guideNameEn: "Abdulaziz Al-Shammari",
    date: lang === "ar" ? "الخميس، 24 أكتوبر 2026" : "Thursday, Oct 24, 2026",
    travelersCount: 2,
    priceHalalas: 170000,
    escrowStatus: "held",
  });

  const formattedPrice = formatPrice(BigInt(nextTrip.priceHalalas), lang, true);

  return {
    userName,
    nextTrip,
    formattedPrice,
  };
}
