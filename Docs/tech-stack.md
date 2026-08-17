# 📦 المكتبات والتقنيات — Tech Stack

---

## ⚙️ الإطار الأساسي

| التقنية | الغرض | الإصدار |
|---------|-------|---------|
| **Next.js** | Framework (App Router + SSR + ISR) | 16.3.x |
| **React** | UI Library | 19.x |
| **TypeScript** | Type Safety | 5.x |
| **Vanilla CSS** | Styling (CSS Variables + Modules) | — |

---

## 🎨 مكتبات التصميم والحركة

| المكتبة | الغرض | المصدر |
|---------|-------|--------|
| **motion** | Animations (import from `motion/react`) | [motion.dev](https://motion.dev) |
| **gsap** | Complex timeline animations | [greensock.com](https://greensock.com) |
| **@react-three/fiber** | 3D WebGL rendering | [R3F](https://docs.pmnd.rs/react-three-fiber) |
| **@react-three/drei** | 3D helpers and abstractions | [Drei](https://github.com/pmndrs/drei) |

### الإلهام من 21st.dev
- **Bento Grid** — تخطيط شبكي غير منتظم للكروت
- **Glassmorphism Cards** — كروت شفافة مع blur
- **Animated Counters** — عدادات متحركة للإحصائيات
- **Magnetic Buttons** — أزرار تنجذب للمؤشر
- **Text Reveal** — ظهور نصوص حرف حرف

### الإلهام من framer.com
- **Scroll-Triggered Sections** — أقسام تتحرك مع التمرير
- **Parallax Layers** — طبقات بسرعات مختلفة
- **Smooth Page Transitions** — انتقالات سلسة بين الصفحات
- **Hover Interactions** — تفاعلات hover متقدمة

---

## 🧩 مكتبات مساعدة

| المكتبة | الغرض |
|---------|-------|
| **lucide-react** | أيقونات SVG خفيفة وجميلة |
| **recharts** | Charts للداشبوردات (Bar, Line, Pie, Area) |
| **embla-carousel-react** | Carousel/Slider سلس وخفيف |
| **date-fns** | Date manipulation (تنسيق التواريخ) |
| **react-hot-toast** | Toast notifications |
| **zod** | Schema validation للفورمات |
| **nuqs** | URL state management (فلاتر البحث) |
| **next-intl** | Internationalization (عربي/إنجليزي + RTL) |

---

## 🔗 التكامل مع الباك إند

| النقطة | التفاصيل |
|--------|---------|
| **API Base** | NestJS REST API على `apps/api/` |
| **Authentication** | JWT (Access 15min + Refresh 30d) |
| **Token Storage** | httpOnly Secure Cookie (Web) |
| **Data Fetching** | Server Components + SWR/React Query (Client) |
| **Real-time** | WebSocket أو SSE للإشعارات والمراسلة |
| **Payments** | MyFatoorah redirect flow |
| **File Upload** | Signed URL pattern → S3-compatible storage |

---

## 📁 بنية المشروع

```
apps/web/                     ← Next.js 16 App
├── public/
│   ├── media/destinations/   ← صور وفيديوهات حقيقية
│   ├── media/brand/          ← لوجو وأيقونات
│   └── fonts/               ← خطوط محلية (fallback)
├── src/
│   ├── app/                 ← App Router (pages)
│   │   ├── (public)/        ← صفحات عامة
│   │   ├── (auth)/          ← صفحات مصادقة
│   │   ├── (client)/        ← داشبورد العميل
│   │   ├── (guide)/         ← داشبورد المرشد
│   │   └── (admin)/         ← لوحة الإدارة
│   ├── components/
│   │   ├── ui/              ← مكونات أساسية
│   │   ├── motion/          ← مكونات حركة
│   │   ├── three/           ← مكونات 3D
│   │   ├── layout/          ← Header, Footer, Sidebar
│   │   └── domain/          ← مكونات المجال
│   ├── hooks/               ← Custom Hooks
│   ├── lib/                 ← مكتبات مساعدة
│   ├── styles/              ← CSS Variables & Global
│   └── i18n/                ← ملفات الترجمة
├── next.config.ts
├── tsconfig.json
└── package.json
```
