/**
 * Currency and Halalas calculation utilities for Rafeeq platform.
 * 1 SAR = 100 Halalas
 */

export function halalasToSar(halalas: number | bigint): number {
  return Number(halalas) / 100;
}

export function sarToHalalas(sar: number): bigint {
  return BigInt(Math.round(sar * 100));
}

export interface FormatPriceOptions {
  showHalalasBreakdown?: boolean;
  compact?: boolean;
}

export function formatPrice(
  halalasOrSar: number | bigint,
  lang: "ar" | "en" = "ar",
  isHalalas: boolean = true,
  options?: FormatPriceOptions
): string {
  const sarAmount = isHalalas ? Number(halalasOrSar) / 100 : Number(halalasOrSar);
  
  const formattedNumber = sarAmount.toLocaleString(lang === "ar" ? "ar-SA" : "en-US", {
    minimumFractionDigits: Number.isInteger(sarAmount) ? 0 : 2,
    maximumFractionDigits: 2,
  });

  const currencySymbol = lang === "ar" ? "ر.س" : "SAR";

  if (options?.showHalalasBreakdown) {
    const totalHalalas = isHalalas ? Number(halalasOrSar) : Math.round(Number(halalasOrSar) * 100);
    const halalasLabel = lang === "ar" ? "هللة" : "Halalas";
    return `${formattedNumber} ${currencySymbol} (${totalHalalas.toLocaleString(lang === "ar" ? "ar-SA" : "en-US")} ${halalasLabel})`;
  }

  return `${formattedNumber} ${currencySymbol}`;
}
