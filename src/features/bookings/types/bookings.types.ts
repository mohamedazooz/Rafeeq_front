export interface BookingItem {
  id: string;
  programTitleAr: string;
  programTitleEn: string;
  guideNameAr: string;
  guideNameEn: string;
  date: string;
  travelersCount: number;
  totalPriceHalalas: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  escrowStatus: "held" | "released" | "refunded";
}
