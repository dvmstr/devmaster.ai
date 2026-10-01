import type { Locale } from "./i18n";

/** Coordonnées et réglages du site (une seule source, utilisée par les pages, le JSON-LD et les mentions légales). */
export const SITE = {
  url: "https://devmaster.ai",
  name: "Devmaster",
  email: "dvmstr.ai@gmail.com",
  whatsappUrl: "https://wa.me/33745496552",
  /** Hébergeur à citer dans les mentions légales (à changer avec l'hébergement). */
  host: {
    name: "Netlify, Inc.",
    address: {
      en: "512 2nd Street, Floor 2, San Francisco, CA 94107, United States",
      fr: "512 2nd Street, Floor 2, San Francisco, CA 94107, États-Unis",
      zh: "512 2nd Street, Floor 2, San Francisco, CA 94107, 美国",
    } satisfies Record<Locale, string>,
  },
} as const;

/** Sections de la page d'accueil, dans l'ordre (ancres de navigation). */
export const SECTION_IDS = ["benefits", "solutions", "results", "testimonials", "process", "faq", "cta-final"] as const;
