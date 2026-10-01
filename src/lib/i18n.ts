/** Langues du site. L'anglais est à la racine (/), le français sous /fr/, le chinois sous /zh/. */
export const LOCALES = ["en", "fr", "zh"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_META: Record<Locale, { htmlLang: string; ogLocale: string; code: string; name: string; flag: string }> = {
  en: { htmlLang: "en", ogLocale: "en_US", code: "EN", name: "English", flag: "🇺🇸" },
  fr: { htmlLang: "fr", ogLocale: "fr_FR", code: "FR", name: "Français", flag: "🇫🇷" },
  zh: { htmlLang: "zh-CN", ogLocale: "zh_CN", code: "ZH", name: "中文", flag: "🇨🇳" },
};

/** Chemin d'une page dans une langue : localePath("fr", "/legal/") → "/fr/legal/". */
export function localePath(locale: Locale, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return locale === DEFAULT_LOCALE ? clean : `/${locale}${clean === "/" ? "/" : clean}`;
}

/** Paramètres de getStaticPaths pour une route [...locale] (la langue par défaut n'a pas de préfixe). */
export function localeStaticPaths() {
  return LOCALES.map((locale) => ({ params: { locale: locale === DEFAULT_LOCALE ? undefined : locale }, props: { locale } }));
}
