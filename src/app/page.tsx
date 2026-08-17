import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { ProgramCard, type ProgramCardProps } from "@/components/domain/ProgramCard";
import styles from "./(public)/home.module.css";

interface Destination {
  readonly slug: string;
  readonly nameAr: string;
  readonly nameEn: string;
  readonly image: string;
  readonly badge: string;
  readonly large?: boolean;
}

/* ── Destination data backed by real images from صور rafeeq ── */
const DESTINATIONS: readonly Destination[] = [
  {
    slug: "alula",
    nameAr: "العلا",
    nameEn: "AlUla",
    image: "/media/destinations/alula/01-alula-banner-five.2e16d0ba.fill-1920x1080-a03aa27a.jpg",
    badge: "تراث عالمي",
    large: true,
  },
  {
    slug: "riyadh",
    nameAr: "الرياض",
    nameEn: "Riyadh",
    image: "/media/destinations/riyadh/01-riyadh-banner-new.2e16d0ba.fill-1920x1080-be8fd66c.jpg",
    badge: "العاصمة",
  },
  {
    slug: "jeddah",
    nameAr: "جدة",
    nameEn: "Jeddah",
    image: "/media/destinations/jeddah/01-jeddah-banner.2e16d0ba.fill-1920x1080-fc73dd1c.jpg",
    badge: "عروس البحر",
  },
  {
    slug: "the-red-sea",
    nameAr: "البحر الأحمر",
    nameEn: "The Red Sea",
    image: "/media/destinations/the-red-sea/01-the-red-sea-luxury.2e16d0ba.fill-1920x1080-7d4731d3.jpg",
    badge: "فاخر",
  },
  {
    slug: "aseer",
    nameAr: "عسير",
    nameEn: "Aseer",
    image: "/media/destinations/aseer/aseer-banner.jpg",
    badge: "طبيعة",
  },
  {
    slug: "al-ahsa",
    nameAr: "الأحساء",
    nameEn: "Al Ahsa",
    image: "/media/destinations/al-ahsa/al-ahsa-banner.jpg",
    badge: "واحة تاريخية",
  },
];

const FEATURED_PROGRAMS: readonly ProgramCardProps[] = [
  {
    id: "prog-alula-history",
    title: "جولة تاريخية شاملة في مدائن صالح والبلدة القديمة بالعلا",
    location: "العلا",
    duration: "يومان (8 ساعات)",
    groupSize: "حتى 6 أشخاص",
    rating: 4.9,
    reviewsCount: 42,
    priceSar: 850,
    image: "/media/destinations/alula/01-alula-banner-five.2e16d0ba.fill-1920x1080-a03aa27a.jpg",
    badge: "الأعلى تقييماً",
  },
  {
    id: "prog-riyadh-desert",
    title: "سفاري صحراء الرياض وجلسة كشتة تقليدية تحت النجوم",
    location: "الرياض",
    duration: "يوم واحد (6 ساعات)",
    groupSize: "حتى 10 أشخاص",
    rating: 4.8,
    reviewsCount: 38,
    priceSar: 450,
    image: "/media/destinations/riyadh/01-riyadh-banner-new.2e16d0ba.fill-1920x1080-be8fd66c.jpg",
    badge: "الأكثر حجزاً",
  },
  {
    id: "prog-jeddah-balad",
    title: "جولة حارتنا التاريخية في منطقة البلد وجدة القديمة",
    location: "جدة",
    duration: "4 ساعات",
    groupSize: "حتى 8 أشخاص",
    rating: 4.95,
    reviewsCount: 56,
    priceSar: 300,
    image: "/media/destinations/jeddah/01-jeddah-banner.2e16d0ba.fill-1920x1080-fc73dd1c.jpg",
    badge: "تجربة ثقافية",
  },
];

const STEPS = [
  { number: 1, icon: "🔍", title: "اكتشف", desc: "تصفح البرامج السياحية حسب الوجهة والنشاط والتاريخ" },
  { number: 2, icon: "📅", title: "احجز", desc: "اختر التاريخ والعدد وادفع بأمان عبر بوابة الدفع المحمية" },
  { number: 3, icon: "🤝", title: "استمتع", desc: "قابل مرشدك المحلي المعتمد واستمتع بتجربة سياحية فريدة" },
  { number: 4, icon: "⭐", title: "قيّم", desc: "شارك تجربتك وساعد المسافرين الآخرين في اختياراتهم" },
] as const;

const STATS = [
  { number: "50+", label: "برنامج سياحي" },
  { number: "20+", label: "مرشد معتمد" },
  { number: "6", label: "وجهات سياحية" },
  { number: "100%", label: "دفع آمن بالضمان" },
] as const;

export default function HomePage() {
  return (
    <>
      <Header />

      {/* ═══ Hero Section ═══ */}
      <section className={styles.hero}>
        <div className={styles["hero__video-wrap"]}>
          <video
            className={styles.hero__video}
            autoPlay
            muted
            loop
            playsInline
            poster="/media/destinations/alula/01-alula-banner-five.2e16d0ba.fill-1920x1080-a03aa27a.jpg"
          >
            <source
              src="/media/destinations/riyadh/videos/01-riyadh-summer-f334bff8.mp4"
              type="video/mp4"
            />
          </video>
          <div className={styles.hero__overlay} />
        </div>

        <div className={styles.hero__content}>
          <div className={styles.hero__badge}>
            <span className={styles["hero__badge-dot"]} />
            منصة سياحية سعودية
          </div>

          <h1 className={styles.hero__title}>
            اكتشف{" "}
            <span className={styles["hero__title-highlight"]}>
              جمال السعودية
            </span>
            <br />
            مع مرشد محلي معتمد
          </h1>

          <p className={styles.hero__subtitle}>
            رفيق يربطك بأفضل المرشدين السياحيين المعتمدين لتعيش تجارب فريدة في
            أجمل الوجهات السعودية — من صخور العلا إلى شواطئ البحر الأحمر.
          </p>

          <div className={styles.hero__actions}>
            <Link href="/programs">
              <Button variant="primary" size="xl">
                استكشف البرامج
              </Button>
            </Link>
            <Link href="/become-guide">
              <Button variant="glass" size="xl">
                كن مرشداً
              </Button>
            </Link>
          </div>
        </div>

        <div className={styles["hero__scroll-indicator"]}>
          <span>اكتشف المزيد</span>
          <div className={styles["hero__scroll-line"]} />
        </div>
      </section>

      {/* ═══ Destinations Section ═══ */}
      <section className={styles.destinations}>
        <div className={styles["section-header"]}>
          <div className={styles["section-eyebrow"]}>الوجهات</div>
          <h2 className={styles["section-title"]}>
            وجهات{" "}
            <span className="text-gradient">لا تُنسى</span>
          </h2>
          <p className={styles["section-subtitle"]}>
            من الصحراء الذهبية إلى الجبال الخضراء — اكتشف أجمل الوجهات في
            المملكة العربية السعودية
          </p>
        </div>

        <div className={styles["dest-grid"]}>
          {DESTINATIONS.map((dest) => (
            <Link
              key={dest.slug}
              href={`/destinations/${dest.slug}`}
              className={`${styles["dest-card"]} ${
                dest.large ? styles["dest-card--large"] : ""
              }`}
            >
              <Image
                src={dest.image}
                alt={dest.nameAr}
                fill
                className={styles["dest-card__img"]}
                sizes={dest.large ? "66vw" : "33vw"}
                style={{ objectFit: "cover" }}
                priority={dest.large}
              />
              <div className={styles["dest-card__overlay"]}>
                <span className={styles["dest-card__name"]}>{dest.nameAr}</span>
                <span className={styles["dest-card__name-en"]}>
                  {dest.nameEn}
                </span>
              </div>
              <span className={styles["dest-card__badge"]}>{dest.badge}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ Featured Programs Section ═══ */}
      <section className={styles["programs-section"]}>
        <div className={styles["section-header"]}>
          <div className={styles["section-eyebrow"]}>التجارب المميزة</div>
          <h2 className={styles["section-title"]}>
            برامج سياحية <span className="text-gradient">مختارة</span>
          </h2>
          <p className={styles["section-subtitle"]}>
            استكشف تجارب استثنائية صممها وينفذها مرشدون سياحيون محليون معتمدون
          </p>
        </div>

        <div className={styles["programs-grid"]}>
          {FEATURED_PROGRAMS.map((program) => (
            <ProgramCard key={program.id} {...program} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "var(--space-12)" }}>
          <Link href="/programs">
            <Button variant="secondary" size="lg">
              عرض جميع البرامج →
            </Button>
          </Link>
        </div>
      </section>

      {/* ═══ How It Works ═══ */}
      <section className={styles["how-it-works"]}>
        <div className={styles["how-it-works__bg"]} />
        <div className={styles["section-header"]}>
          <div className={styles["section-eyebrow"]} style={{ color: "var(--color-gold-light)" }}>
            كيف تعمل المنصة
          </div>
          <h2 className={styles["section-title"]} style={{ color: "var(--color-warm-white)" }}>
            <span className="text-gradient">4 خطوات</span> بسيطة
          </h2>
          <p className={styles["section-subtitle"]} style={{ color: "rgba(255,255,255,0.5)" }}>
            من الاكتشاف إلى التجربة — رحلتك تبدأ هنا
          </p>
        </div>

        <div className={styles["steps-grid"]}>
          {STEPS.map((step) => (
            <div key={step.number} className={styles["step-card"]}>
              <div className={styles["step-card__number"]}>{step.number}</div>
              <div className={styles["step-card__icon"]}>{step.icon}</div>
              <h3 className={styles["step-card__title"]}>{step.title}</h3>
              <p className={styles["step-card__desc"]}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Stats ═══ */}
      <section className={styles.stats}>
        <div className={styles.stats__grid}>
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div className={styles.stat__number}>{stat.number}</div>
              <div className={styles.stat__label}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CTA Section ═══ */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.cta__card}>
            <h2 className={styles.cta__title}>
              هل أنت مرشد سياحي؟
            </h2>
            <p className={styles.cta__subtitle}>
              انضم لرفيق وحوّل خبرتك السياحية إلى مصدر دخل — منصة موثوقة
              ودفع آمن بالضمان
            </p>
            <div className={styles.cta__actions}>
              <Link href="/become-guide">
                <Button variant="primary" size="lg">
                  سجل كمرشد الآن
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" size="lg" style={{ color: "rgba(255,255,255,0.6)" }}>
                  تعرف على المزيد
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className={styles.footer}>
        <div className={styles.footer__inner}>
          <div className={styles.footer__grid}>
            <div className={styles.footer__brand}>
              <span className={styles.footer__logo}>رفيق Rafeeq</span>
              <p className={styles.footer__desc}>
                منصة رقمية وسيطة لقطاع السياحة في المملكة العربية السعودية — تربط
                المسافرين بالمرشدين السياحيين المعتمدين.
              </p>
            </div>

            <div>
              <h4 className={styles["footer__col-title"]}>الوجهات</h4>
              <div className={styles.footer__links}>
                <Link href="/destinations/riyadh" className={styles.footer__link}>الرياض</Link>
                <Link href="/destinations/alula" className={styles.footer__link}>العلا</Link>
                <Link href="/destinations/jeddah" className={styles.footer__link}>جدة</Link>
                <Link href="/destinations/the-red-sea" className={styles.footer__link}>البحر الأحمر</Link>
                <Link href="/destinations/aseer" className={styles.footer__link}>عسير</Link>
              </div>
            </div>

            <div>
              <h4 className={styles["footer__col-title"]}>المنصة</h4>
              <div className={styles.footer__links}>
                <Link href="/about" className={styles.footer__link}>من نحن</Link>
                <Link href="/programs" className={styles.footer__link}>البرامج</Link>
                <Link href="/become-guide" className={styles.footer__link}>كن مرشداً</Link>
                <Link href="/faq" className={styles.footer__link}>الأسئلة الشائعة</Link>
                <Link href="/contact" className={styles.footer__link}>تواصل معنا</Link>
              </div>
            </div>

            <div>
              <h4 className={styles["footer__col-title"]}>قانوني</h4>
              <div className={styles.footer__links}>
                <Link href="/terms" className={styles.footer__link}>الشروط والأحكام</Link>
                <Link href="/privacy" className={styles.footer__link}>سياسة الخصوصية</Link>
              </div>
            </div>
          </div>

          <div className={styles.footer__bottom}>
            <span className={styles.footer__copy}>
              © 2026 رفيق. جميع الحقوق محفوظة — منصة السياحة السعودية.
            </span>
            <div className={styles.footer__socials}>
              <a href="#" className={styles["footer__social-link"]} aria-label="X (Twitter)">𝕏</a>
              <a href="#" className={styles["footer__social-link"]} aria-label="Instagram">📷</a>
              <a href="#" className={styles["footer__social-link"]} aria-label="YouTube">▶</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
