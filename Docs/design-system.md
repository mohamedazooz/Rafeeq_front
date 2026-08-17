# 🎨 نظام الهوية البصرية — Design System

## فلسفة التصميم
> **"Saudi Luxury Meets Digital Futurism"**
> تصميم يمزج بين الفخامة السعودية التقليدية والحداثة الرقمية المستقبلية

---

## باليت الألوان

### الألوان الرئيسية
| الاسم | القيمة | الاستخدام |
|-------|--------|-----------|
| **Gold Royal** | `#C8A96E` | العناصر المميزة، CTAs، الشعار |
| **Deep Emerald** | `#0A4D3C` | الخلفيات الداكنة، النصوص الرئيسية |
| **Saudi Green** | `#006C35` | عناصر التأكيد، الأزرار الثانوية |
| **Midnight Blue** | `#0D1B2A` | خلفيات Hero، الداشبوردات |

### الألوان الثانوية
| الاسم | القيمة | الاستخدام |
|-------|--------|-----------|
| **Desert Sand** | `#F5E6C8` | خلفيات ناعمة |
| **Warm White** | `#FEFCF7` | خلفيات النصوص |
| **Accent Coral** | `#E07A5F` | إشعارات، تنبيهات |

### التدرجات (Gradients)
- **Gold Gradient:** `linear-gradient(135deg, #C8A96E, #E0CFA3, #C8A96E)`
- **Hero Overlay:** `linear-gradient(180deg, rgba(13,27,42,0.1), rgba(13,27,42,0.95))`
- **Emerald Gradient:** `linear-gradient(135deg, #0A4D3C, #006C35)`

### Glassmorphism
```css
background: rgba(255, 255, 255, 0.08);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.15);
```

---

## الطباعة (Typography)

| العنصر | الخط العربي | الخط الإنجليزي |
|--------|------------|---------------|
| العناوين | IBM Plex Sans Arabic Bold | Outfit Bold |
| الفرعية | IBM Plex Sans Arabic Medium | Outfit Medium |
| النصوص | IBM Plex Sans Arabic Regular | Inter Regular |
| الأرقام | Tabular figures | JetBrains Mono |

---

## أنظمة الحركة (Motion System)

### Motion Presets (motion/react)
| الاسم | الإعدادات | الاستخدام |
|-------|----------|-----------|
| snappy | `stiffness: 400, damping: 30` | أزرار، toggles |
| smooth | `stiffness: 200, damping: 25` | modals، panels |
| gentle | `stiffness: 100, damping: 20` | أقسام الصفحات |
| cinematic | `stiffness: 50, damping: 15` | Hero sequences |

### أنواع الحركة
- **micro-animations** (0.15-0.3s): hover effects, button states
- **page-transitions** (0.4-0.6s): route changes, modal open/close
- **scroll-triggered** (0.5-1.2s): reveal on scroll, parallax
- **hero-cinematic** (2-4s): video crossfades, 3D camera moves

---

## المسافات والأبعاد

| المتغير | القيمة | الاستخدام |
|---------|--------|-----------|
| `--space-1` | 4px | فراغات صغيرة جداً |
| `--space-2` | 8px | فراغات بين العناصر الصغيرة |
| `--space-4` | 16px | فراغات قياسية |
| `--space-8` | 32px | فراغات بين الأقسام |
| `--space-16` | 64px | فراغات الأقسام الرئيسية |
| `--space-24` | 96px | فراغات بين sections كبيرة |

---

## الظلال (Shadows)
- `--shadow-sm`: ظل خفيف للكروت الصغيرة
- `--shadow-md`: ظل متوسط للكروت
- `--shadow-lg`: ظل كبير للعناصر البارزة
- `--shadow-gold`: ظل ذهبي للأزرار الرئيسية
- `--shadow-gold-lg`: ظل ذهبي كبير عند hover

---

## الزوايا (Border Radius)
- `--radius-sm`: 6px — inputs صغيرة
- `--radius-md`: 8px — أزرار وعناصر
- `--radius-lg`: 12px — كروت
- `--radius-xl`: 16px — كروت كبيرة
- `--radius-2xl`: 24px — sections
- `--radius-full`: 9999px — دوائر وbadges
