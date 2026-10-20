# Devmaster — site vitrine (devmaster.ai)

Site de l'agence d'automatisation IA **Devmaster**, en anglais (`/`), français (`/fr/`) et chinois (`/zh/`).

## En bref

| | |
|---|---|
| Outil | [Astro 7](https://astro.build) : chaque page est générée en HTML complet au moment de la publication |
| Styles | Tailwind CSS 4 (palette de Tailwind 3 conservée pour un rendu identique à l'ancien site) |
| Interactions | quelques scripts légers (menu, cercle des solutions, frise du process…), moins de 3 Ko au total ; aucun framework côté navigateur |
| Contenu | fichiers JSON par langue dans `src/content/` — plus de base de données |
| Hébergement | Netlify (statique) : chaque push sur `main` publie le site ; chaque pull request a son aperçu |
| Sécurité | politique de contenu (CSP) par empreintes générée par Astro + en-têtes dans `public/_headers` |

## Modifier un texte

Tout le texte est dans **`src/content/site/en.json`, `fr.json`, `zh.json`** (page d'accueil, une section par clé :
`hero`, `solutions` puis `benefits` (ensemble : section « Solutions »), `process`, `demos` puis `testimonials` (ensemble :
section « Résultats »), `faq`, `cta`, `footer`, dans l'ordre de la page) et
**`src/content/legal/<langue>.json`** (mentions légales). La structure est vérifiée à la publication : un champ
manquant ou mal formé dans une langue bloque le build avec un message clair, le site en ligne n'est jamais cassé.

- Ajouter un témoignage ou une question de FAQ : ajouter un élément à la liste correspondante, dans les trois langues.
- Icônes disponibles pour `benefits` et `solutions` : voir `src/lib/icons.ts`.
- Coordonnées (e-mail, WhatsApp, hébergeur cité dans les mentions légales) : `src/lib/site.ts`.

## Commandes

```bash
npm install
npm run dev      # http://localhost:4321, rechargement instantané
npm run check    # vérification des types + build complet (à lancer avant de publier)
npm run build    # site dans dist/
npm run preview  # sert dist/ en local
```

Node 22.12 ou plus récent (24 recommandé, voir `.nvmrc`).

## Organisation

```
src/
  content/            textes (JSON par langue) — schéma dans src/content.config.ts
  pages/[...locale]/  page d'accueil et mentions légales, générées pour en / fr / zh
  components/         navigation, pied de page, sections (src/components/sections/), icônes
  layouts/Base.astro  <head> : SEO, langues alternatives, données structurées, police
  lib/                langues (i18n.ts), coordonnées (site.ts), icônes, ressort d'animation (spring.ts)
  styles/global.css   thème Tailwind, boutons « verre »
public/               icônes, images de partage (og/), robots.txt, _headers, _redirects
scripts/              génération des icônes (make-icons.mjs) et des images de partage (og/)
```

## Choix techniques à connaître

- **Police** : sur Mac et iPhone, la police système (San Francisco), comme sur l'ancien site ; ailleurs, Inter
  (incluse dans le site, chargée seulement si nécessaire). La police « 1955 » de l'ancien dépôt était corrompue et ne
  s'est jamais affichée.
- **Aucun appel externe** au chargement : pas de Supabase, pas de Google Fonts, pas de traceur. Le site fonctionne
  aussi sans JavaScript (contenu complet, animations en moins).
- **SEO** : vraies pages par langue (`lang`, titre, description, `hreflang`, plan du site `sitemap-index.xml`,
  données structurées schema.org, image de partage par langue). Mentions légales en `noindex`.
- **CSP** : ne pas ajouter d'attribut `style="…"` ni de script en ligne dans les gabarits : ils seraient bloqués.
  Les styles vont dans les classes Tailwind ou les blocs `<style>` des composants (Astro les déclare).
- **Animations** : respectent le réglage « réduire les animations » du système.

## Images

- Icônes (favicon, apple-touch-icon, 192/512) : `node scripts/make-icons.mjs` à partir de
  `src/assets/brand/logo-source.png`.
- Images de partage `public/og/<langue>.png` (1200×630) : `scripts/og/make-og.mjs` (navigateur Playwright),
  à relancer si le titre ou l'accroche changent.
