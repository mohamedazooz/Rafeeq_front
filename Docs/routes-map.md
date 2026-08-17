# 🗺️ خريطة المسارات الكاملة — Routes Map

---

## 🌐 المسارات العامة (Public Routes) — بدون تسجيل

| # | المسار | الصفحة | الوصف |
|---|--------|--------|-------|
| 1 | `/` | الصفحة الرئيسية | Hero Video + وجهات + كيف تعمل + إحصائيات + CTA |
| 2 | `/destinations` | جميع الوجهات | خريطة SVG تفاعلية + شبكة الوجهات |
| 3 | `/destinations/[slug]` | صفحة وجهة | فيديو + معرض صور + برامج الوجهة |
| 4 | `/programs` | استكشاف البرامج | بحث + فلاتر متقدمة + Grid |
| 5 | `/programs/[id]` | تفاصيل برنامج | Gallery + مسار + حجز + تقييمات |
| 6 | `/guides/[id]` | ملف المرشد | بروفايل + برامج + تقييمات |
| 7 | `/about` | من نحن | رؤية 2030 + قيم المنصة |
| 8 | `/contact` | تواصل معنا | فورم + بيانات التواصل |
| 9 | `/faq` | الأسئلة الشائعة | Accordion قابل للتوسيع |
| 10 | `/terms` | الشروط والأحكام | نص قانوني |
| 11 | `/privacy` | سياسة الخصوصية | نص قانوني |

---

## 🔐 مسارات المصادقة (Auth Routes)

| # | المسار | الصفحة | الوصف |
|---|--------|--------|-------|
| 1 | `/login` | تسجيل الدخول | OTP / Email / Google / Apple |
| 2 | `/register` | إنشاء حساب | Multi-step form |
| 3 | `/verify-otp` | تحقق OTP | 6-digit input مع countdown |
| 4 | `/forgot-password` | نسيت كلمة المرور | Email recovery |
| 5 | `/become-guide` | كن مرشداً | Wizard بـ 4 خطوات |

---

## 👤 داشبورد العميل (Client Dashboard)

| # | المسار | الصفحة | الوصف |
|---|--------|--------|-------|
| 1 | `/client/dashboard` | نظرة عامة | ملخص حجوزات + رسائل + مقترحات |
| 2 | `/client/bookings` | حجوزاتي | قائمة مع tabs (قادمة/سابقة/ملغية) |
| 3 | `/client/bookings/[id]` | تفاصيل حجز | Timeline حالات + actions |
| 4 | `/client/wishlist` | المفضلة | Grid برامج محفوظة |
| 5 | `/client/messages` | المراسلات | Split view threads + chat |
| 6 | `/client/messages/[threadId]` | محادثة | Chat window |
| 7 | `/client/payments` | سجل المدفوعات | جدول + تحميل PDF |
| 8 | `/client/profile` | الملف الشخصي | تعديل بيانات + أمان |

---

## 🧭 داشبورد المرشد (Guide Dashboard)

| # | المسار | الصفحة | الوصف |
|---|--------|--------|-------|
| 1 | `/guide/dashboard` | لوحة الأداء | KPIs + charts + counters |
| 2 | `/guide/programs` | برامجي | قائمة مع status badges |
| 3 | `/guide/programs/create` | إنشاء برنامج | Wizard multi-step + drag-drop images |
| 4 | `/guide/programs/[id]` | تعديل برنامج | نفس الـ Wizard مع بيانات موجودة |
| 5 | `/guide/bookings` | حجوزات العملاء | Kanban أو table view |
| 6 | `/guide/calendar` | تقويم التوافر | Interactive calendar + drag-select |
| 7 | `/guide/wallet` | المحفظة والأرباح | رصيد + معاملات + سحب |
| 8 | `/guide/profile` | الملف الاحترافي | Rich form + document upload |

---

## ⚙️ لوحة الإدارة (Admin Dashboard)

| # | المسار | الصفحة | الوصف |
|---|--------|--------|-------|
| 1 | `/admin/dashboard` | نظرة عامة | KPIs + real-time charts |
| 2 | `/admin/users` | إدارة المستخدمين | Advanced data table + actions |
| 3 | `/admin/guides-approval` | اعتماد المرشدين | Review cards + document preview |
| 4 | `/admin/programs-review` | مراجعة البرامج | Side-by-side preview + actions |
| 5 | `/admin/bookings` | جميع الحجوزات | Data table مع status pipeline |
| 6 | `/admin/disputes` | النزاعات | Ticket cards + conversation thread |
| 7 | `/admin/finance` | المالية والعمولات | Financial dashboard + approval queue |
| 8 | `/admin/content` | إدارة المحتوى | CMS-like interface |
| 9 | `/admin/reports` | التقارير | Chart builder + export |
| 10 | `/admin/settings` | الإعدادات | Settings groups + RBAC matrix |

---

## ملخص

| القسم | عدد المسارات |
|-------|-------------|
| عام (Public) | 11 |
| مصادقة (Auth) | 5 |
| داشبورد العميل | 8 |
| داشبورد المرشد | 8 |
| لوحة الإدارة | 10 |
| **الإجمالي** | **42 مسار** |
