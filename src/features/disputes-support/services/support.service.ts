import { ContactMessagePayload, FaqItem } from "../types/support.types";

export const DEFAULT_FAQS: FaqItem[] = [
  {
    id: "1",
    qAr: "كيف تضمن منصة رفيق حقي المالي عند الحجز؟",
    qEn: "How does Rafeeq guarantee my funds during booking?",
    aAr: "يتم حجز مبلغ الرحلة بالكامل في حساب ضمان مؤمّن ومحمي (Escrow)، ولا يتم تحويل المستحقات للمرشد السياحي إلا بعد اكتمال تنفيذ البرنامج وتأكيد رضاك التام.",
    aEn: "The full trip amount is held in a protected bank Escrow account and is only released to the local guide after the tour is successfully completed.",
  },
  {
    id: "2",
    qAr: "هل يحتاج العميل لإنشاء حساب لتصفح البرامج والوجهات؟",
    qEn: "Do travelers need an account to browse destinations and tours?",
    aAr: "لا، الاستكشاف والبحث وتصفح كافة التفاصيل والوجهات متاح مجاناً وبدون حساب. يلزم تسجيل الدخول فقط عند إتمام الحجز أو المراسلة.",
    aEn: "No, browsing programs, itineraries, and destinations is completely free without an account. Registration is only required when booking or messaging.",
  },
  {
    id: "3",
    qAr: "ما هي شروط الانضمام كمرشد سياحي في رفيق؟",
    qEn: "What are the requirements to join as a licensed tour guide?",
    aAr: "يجب أن تكون حاملاً لرخصة إرشاد سياحي رسمية وسارية من وزارة السياحة بالمملكة العربية السعودية، ولديك حساب بنكي سعودي (آيبان) نشط.",
    aEn: "You must hold an active tour guide license issued by the Saudi Ministry of Tourism and a verified Saudi bank account (IBAN).",
  },
  {
    id: "4",
    qAr: "ما هي طرق الدفع المتاحة على المنصة بالريال والهللات؟",
    qEn: "What payment methods are supported on Rafeeq?",
    aAr: "ندعم بوابة الدفع الإلكترونية المعتمدة بما يشمل بطاقات مدى السعودية، أبل باي، وبطاقات فيزا وماستركارد بجميع فئات الريال والهللات.",
    aEn: "We support Mada cards, Apple Pay, Visa, and Mastercard with exact SAR and Halala ledger calculation.",
  },
];

export class SupportService {
  static async submitContactMessage(payload: ContactMessagePayload): Promise<{ success: boolean; message: string }> {
    // Simulated API submission
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      success: true,
      message: "تم استلام رسالتك بنجاح وسيقوم فريق الدعم بالتواصل معك قريباً.",
    };
  }

  static getFaqs(): FaqItem[] {
    return DEFAULT_FAQS;
  }
}
