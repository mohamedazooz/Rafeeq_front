import Image from "next/image";
import Link from "next/link";
import styles from "./ProgramCard.module.css";
import { Button } from "@/components/ui/Button";

export interface ProgramCardProps {
  readonly id: string;
  readonly title: string;
  readonly location: string;
  readonly duration: string;
  readonly groupSize: string;
  readonly rating: number;
  readonly reviewsCount: number;
  readonly priceSar: number;
  readonly image: string;
  readonly badge?: string;
}

export function ProgramCard({
  id,
  title,
  location,
  duration,
  groupSize,
  rating,
  reviewsCount,
  priceSar,
  image,
  badge,
}: ProgramCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles["card__image-wrap"]}>
        <Image
          src={image}
          alt={title}
          fill
          className={styles.card__image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {badge && <span className={styles.card__badge}>{badge}</span>}
        <button
          className={styles["card__wishlist-btn"]}
          type="button"
          aria-label="إضافة للمفضلة"
        >
          ♡
        </button>
      </div>

      <div className={styles.card__content}>
        <div className={styles.card__meta}>
          <span className={styles.card__location}>📍 {location}</span>
          <span className={styles.card__rating}>
            ⭐ {rating.toFixed(1)} ({reviewsCount})
          </span>
        </div>

        <h3 className={styles.card__title}>
          <Link href={`/programs/${id}`} style={{ color: "inherit", textDecoration: "none" }}>
            {title}
          </Link>
        </h3>

        <div className={styles.card__info}>
          <span>⏱️ {duration}</span>
          <span>👥 {groupSize}</span>
        </div>

        <div className={styles.card__footer}>
          <div>
            <span className={styles["card__price-label"]}>ابتداءً من</span>
            <div>
              <span className={styles["card__price-value"]}>{priceSar}</span>
              <span className={styles["card__price-currency"]}>ر.س</span>
            </div>
          </div>

          <Link href={`/programs/${id}`}>
            <Button variant="outline" size="sm">
              التفاصيل
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
