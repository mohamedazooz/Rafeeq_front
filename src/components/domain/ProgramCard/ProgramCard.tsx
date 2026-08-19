"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./ProgramCard.module.css";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/language-provider";
import { formatPrice } from "@/lib/utils/currency";
import { MapPinIcon, StarIcon, ClockIcon, UsersIcon } from "@/components/icons";

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

  const displayTitle = (isAr ? title : titleEn) || title;
  const displayLocation = (isAr ? location : locationEn) || location;
  const displayDuration = (isAr ? duration : durationEn) || duration;
  const displayGroupSize = (isAr ? groupSize : groupSizeEn) || groupSize;
  const displayBadge = (isAr ? badge : badgeEn) || badge;

  const halalas =
    priceHalalas !== undefined
      ? typeof priceHalalas === "bigint"
        ? Number(priceHalalas)
        : priceHalalas
      : priceSar * 100;

  const formattedPrice = formatPrice(halalas, lang);

  return (
    <article className={styles.card}>
      <div className={styles.card__imageWrapper}>
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
          <StarIcon size={14} color="var(--color-gold-heading)" />
        </button>
      </div>

      <div className={styles.card__content}>
        <div className={styles.card__meta}>
          <span className={styles.card__location} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <MapPinIcon size={12} color="var(--color-saudi-green)" />
            <span>{displayLocation}</span>
          </span>
          <span className={styles.card__rating} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <StarIcon size={12} color="#F59E0B" />
            <span>{rating.toFixed(1)} ({reviewsCount})</span>
          </span>
        </div>

        <h3 className={styles.card__title}>
          <Link href={`/programs/${id}`} style={{ color: "inherit", textDecoration: "none" }}>
            {displayTitle}
          </Link>
        </h3>

        <div className={styles.card__info} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <ClockIcon size={13} color="var(--color-text-muted)" />
            <span>{displayDuration}</span>
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <UsersIcon size={13} color="var(--color-text-muted)" />
            <span>{displayGroupSize}</span>
          </span>
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
    </article>
  );
}
