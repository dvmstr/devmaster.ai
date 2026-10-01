// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Site vitrine statique : chaque page (EN à la racine, FR sous /fr/, ZH sous /zh/) est générée en HTML
// complet au build. Aucun appel à un service externe au chargement.
export default defineConfig({
  site: "https://devmaster.ai",
  build: { format: "directory" },
  // Politique de sécurité (CSP) par empreintes : Astro calcule les hashs de ses scripts et styles et
  // les déclare dans une balise <meta>. Aucun script ni style « inline » non déclaré ne peut s'exécuter.
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "base-uri 'self'",
        "form-action 'self'",
        "object-src 'none'",
      ],
    },
  },
  // Sur Mac/iPhone, la police système (San Francisco) est utilisée en priorité : c'est le rendu d'origine.
  // Inter ne sert qu'aux autres systèmes (Windows, Android, Linux), pour un rendu proche et homogène.
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Inter",
      cssVariable: "--font-inter",
      fallbacks: ["sans-serif"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/inter-latin-wght-normal.woff2"],
            weight: "100 900",
            style: "normal",
            unicodeRange: [
              "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD",
            ],
          },
          {
            src: ["./src/assets/fonts/inter-latin-ext-wght-normal.woff2"],
            weight: "100 900",
            style: "normal",
            unicodeRange: [
              "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF",
            ],
          },
        ],
      },
    },
  ],
  integrations: [
    sitemap({
      i18n: { defaultLocale: "en", locales: { en: "en", fr: "fr", zh: "zh-CN" } },
      // Les mentions légales ne sont pas indexées (balise noindex) : inutile de les proposer.
      filter: (page) => !page.includes("/legal"),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
