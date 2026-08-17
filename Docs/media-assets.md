# 🎬 خطة استخدام الفيديوهات والصور — Media Assets Plan

---

## 📹 الفيديوهات المتاحة (5 فيديوهات)

| # | الملف | الوجهة | الحجم | الاستخدام في الموقع |
|---|-------|--------|-------|-------------------|
| 1 | `riyadh/videos/01-riyadh-summer-f334bff8.mp4` | الرياض | 13.2 MB | ✅ Hero الصفحة الرئيسية (الأساسي) + صفحة الرياض |
| 2 | `alula/videos/01-alula-vid-6d2154a9.mp4` | العلا | 14.8 MB | ✅ Hero Homepage Crossfade + صفحة العلا |
| 3 | `jeddah/videos/01-jeddah-summer-vid-551b49dc.mp4` | جدة | 14.4 MB | ✅ Homepage rotation + صفحة جدة |
| 4 | `aseer/videos/01-aseer-vid-new-2c15419d.mp4` | عسير | 14.4 MB | ✅ Homepage rotation + صفحة عسير |
| 5 | `the-red-sea/videos/01-red-sea-summer-21148704.mp4` | البحر الأحمر | 14.4 MB | ✅ Homepage rotation + صفحة البحر الأحمر |

### كيفية الاستخدام
1. **Hero Homepage:** فيديو الرياض كفيديو أساسي مع crossfade تلقائي إلى باقي الفيديوهات كل 8 ثوانِ
2. **صفحات الوجهات:** كل فيديو يظهر كـ Hero في صفحة الوجهة الخاصة به
3. **الأداء:** تحميل مؤجل (lazy) لغير الفيديو الأول + poster image كبديل

---

## 📸 الصور المتاحة (380+ صورة)

### ملخص حسب الوجهة
| الوجهة | عدد الصور | أبرز الأحجام | أبرز المحتويات |
|--------|----------|-------------|---------------|
| **الرياض** | 157 صورة | 1920x1080, 660x337, 390x390 | KAFD, Six Flags, المتاحف, المطاعم, الحدائق, الأسواق |
| **العلا** | 39 صورة | 1920x1080, 660x337, 375x667 | Hegra, Elephant Rock, Maraya, Stargazing, Wadi Fann |
| **جدة** | 27 صورة | 1920x1080, 660x337 | البلد, الكورنيش, المتاحف, الشواطئ, الأسواق |
| **عسير** | 104 صورة | 660x337, 390x390 | الجبال, المدرجات, القرى التراثية, الغابات |
| **الأحساء** | 31 صورة | 660x337 | الواحة, القصور, الأسواق |
| **البحر الأحمر** | 22 صورة | 1920x1080, 600x600 | المنتجعات الفاخرة, الجزر, الغطس |

---

## 🖼️ خطة استخدام الصور في كل صفحة

### الصفحة الرئيسية (Homepage)
| القسم | الصور المستخدمة |
|-------|---------------|
| Hero Video Poster | `alula/01-alula-banner-five (1920x1080)` |
| Destination: العلا | `alula/01-alula-banner-five (1920x1080)` |
| Destination: الرياض | `riyadh/01-riyadh-banner-new (1920x1080)` |
| Destination: جدة | `jeddah/01-jeddah-banner (1920x1080)` |
| Destination: البحر الأحمر | `the-red-sea/01-the-red-sea-luxury (1920x1080)` |
| Destination: عسير | `aseer/images/` — أبرز صور المدرجات |
| Destination: الأحساء | `al-ahsa/images/` — أبرز صور الواحة |

### صفحات الوجهات الفردية
| الوجهة | Hero Image | Gallery Images | الفيديو |
|--------|-----------|---------------|---------|
| العلا | `01-alula-banner-five` | 39 صورة | `01-alula-vid.mp4` |
| الرياض | `01-riyadh-banner-new` | 157 صورة | `01-riyadh-summer.mp4` |
| جدة | `01-jeddah-banner` | 27 صورة | `01-jeddah-summer-vid.mp4` |
| عسير | أبرز صورة من المجلد | 104 صورة | `01-aseer-vid-new.mp4` |
| الأحساء | أبرز صورة من المجلد | 31 صورة | — |
| البحر الأحمر | `01-the-red-sea-luxury` | 22 صورة | `01-red-sea-summer.mp4` |

### صفحة استكشاف البرامج
- صور البرامج من صور الوجهة المرتبطة (660x337 optimal)
- Placeholder cards مع shimmer loading

### صفحات الداشبوردات
- صور المرشدين: placeholders ثم صور حقيقية
- صور البرامج: من مجلدات الوجهات

---

## ⚡ تحسين الأداء

### استراتيجية تحميل الصور
1. **Banner Images (1920x1080):** `priority` loading للصور فوق الـ fold
2. **Card Images (660x337):** `lazy` loading مع `placeholder="blur"`
3. **Thumbnail (390x390):** Lazy load مع blur placeholder
4. **Videos:** Poster image أولاً، تحميل الفيديو عند الحاجة

### Next.js Image Optimization
- تحويل تلقائي إلى AVIF/WebP
- Responsive srcset: 640, 768, 1024, 1280, 1536, 1920
- CDN caching مع `Cache-Control` headers

---

## 📝 ملاحظات حقوق الملكية

> **جميع الصور والفيديوهات © [Visit Saudi](https://www.visitsaudi.com)**
> هذا الأرشيف للاستخدام الداخلي في مشروع رفيق فقط.
> لا يجوز النشر أو إعادة التوزيع بدون ترخيص مناسب من Visit Saudi.
