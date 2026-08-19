"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./ProgramCard.module.css";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/language-provider";
import { formatPrice } from "@/lib/utils/currency";

export interface ProgramCardProps {
  readonly id: string;
  readonly title: string;
  readonly titleEn?: string;
  readonly location: string;
  readonly locationEn?: string;
  readonly duration: string;
  readonly durationEn?: string;
  readonly groupSize: string;
  readonly groupSizeEn?: string;
  readonly rating: number;
  readonly reviewsCount: number;
  readonly priceSar: number;
  readonly priceHalalas?: number | bigint;
  readonly image: string;
  readonly badge?: string;
  readonly badgeEn?: string;
}

export function ProgramCard({
  id,
  title,
  titleEn,
  location,
  locationEn,
  duration,
  durationEn,
  groupSize,
  groupSizeEn,
  rating,
  reviewsCount,
  priceSar,
  priceHalalas,
  image,
  badge,
  badgeEn,
}: ProgramCardProps) {
  const { lang, isAr, t } = useLanguage();

  const displayTitle = !isAr && titleEn ? titleEn : title;
  const displayLocation = !isAr && locationEn ? locationEn : location;
  const displayDuration = !isAr && durationEn ? durationEn : duration;
  const displayGroupSize = !isAr && groupSizeEn ? groupSizeEn : groupSize;
  const displayBadge = !isAr && badgeEn ? badgeEn : badge;

  const halalas = priceHalalas || BigInt(priceSar * 100);
  const formattedPrice = formatPrice(halalas, lang, true);

  return (
    <div className={styles.card}>
      <div className={styles["card__image-wrap"]}>
        <Image
          src={image}
          alt={displayTitle}
          fill
          className={styles.card__image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {displayBadge && <span className={styles.card__badge}>{displayBadge}</span>}
        <button
          className={styles["card__wishlist-btn"]}
          type="button"
          aria-label={isAr ? "إضافة للمفضلة" : "Add to wishlist"}
        >
          ♡
        </button>
      </div>

      <div className={styles.card__content}>
        <div className={styles.card__meta}>
          <span className={styles.card__location}>📍 {displayLocation}</span>
          <span className={styles.card__rating}>
            ⭐ {rating.toFixed(1)} ({reviewsCount})
          </span>
        </div>

        <h3 className={styles.card__title}>
          <Link href={`/programs/${id}`} style={{ color: "inherit", textDecoration: "none" }}>
            {displayTitle}
          </Link>
        </h3>

        <div className={styles.card__info}>
          <span>⏱️ {displayDuration}</span>
          <span>👥 {displayGroupSize}</span>
        </div>

        <div className={styles.card__footer}>
          <div>
            <span className={styles["card__price-label"]}>{t.common.startingFrom}</span>
            <div>
              <span className={styles["card__price-value"]}>{formattedPrice}</span>
            </div>
          </div>

          <Link href={`/programs/${id}`}>
            <Button variant="outline" size="sm">
              {t.common.details}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
