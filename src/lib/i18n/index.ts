import { arDictionary } from "./dictionaries/ar";
import { enDictionary } from "./dictionaries/en";
import { TranslationDictionary } from "./types";

export type Language = "ar" | "en";

export const dictionaries: Record<Language, TranslationDictionary> = {
  ar: arDictionary,
  en: enDictionary,
};

export function getDictionary(lang: Language): TranslationDictionary {
  return dictionaries[lang] || dictionaries.ar;
}

export * from "./types";
