# Devmaster

Site vitrine de [devmaster.ai](https://devmaster.ai) - Agence d'automatisation IA.

## Stack Technique

- **Frontend** : React 18 + TypeScript + Vite
- **Styling** : Tailwind CSS + Framer Motion
- **Backend** : Supabase (CMS headless)
- **Fonts** : 1955 (custom)

## Installation

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build production
npm run build
```

## Structure du Projet

```
src/
├── components/
│   ├── common/          # Composants réutilisables (LightSource, LogoCarousel, SEOHead)
│   ├── layout/          # Layout (Navigation, Footer)
│   ├── pages/           # Pages complètes (LegalNotice)
│   ├── sections/        # Sections de la page (Hero, Benefits, Solutions, etc.)
│   └── ui/              # Composants UI primitifs (Button, Card, Badge, etc.)
│
├── data/
│   ├── fallback/        # Données de secours si Supabase indisponible
│   └── solutions.ts     # Données des solutions
│
├── hooks/               # Hooks React personnalisés
│   ├── useSupabaseData.ts
│   ├── useTestimonials.ts
│   ├── useFAQs.ts
│   ├── useNavigation.ts
│   ├── useSection.ts
│   └── usePageMeta.ts
│
├── lib/                 # Utilitaires
│   ├── cache.ts         # Système de cache
│   ├── scroll.ts        # Navigation par scroll
│   ├── supabase.ts      # Client Supabase
│   └── utils.ts         # Fonctions utilitaires (cn)
│
├── types/               # Types TypeScript
│   ├── database.ts      # Types Supabase
│   └── components.ts    # Types partagés
│
├── App.tsx              # Composant principal
├── main.tsx             # Point d'entrée
└── index.css            # Styles globaux + fonts
```

## Configuration Supabase

Voir [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) pour la configuration complète.

### Variables d'environnement

Créer un fichier `.env.local` :

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Composants Dynamiques (Supabase)

Ces composants chargent leur contenu depuis Supabase :

| Composant | Table Supabase | Description |
|-----------|----------------|-------------|
| Navigation | `navigation_items` | Menu de navigation |
| Testimonials | `testimonials` | Témoignages clients |
| FAQ | `faqs` | Questions fréquentes |
| SEOHead | `pages` | Meta tags SEO |

## Système de Cache

Le site utilise un cache intelligent pour optimiser les performances :

| Contenu | TTL | 
|---------|-----|
| Navigation | 30 min |
| Témoignages | 15 min |
| FAQs | 15 min |
| Meta SEO | 10 min |
| Sections | 5 min |

Pour voir les modifications immédiatement : `Cmd+Shift+R` (Mac) ou `Ctrl+Shift+R` (Windows)

## Scripts

```bash
npm run dev       # Serveur de développement
npm run build     # Build production
npm run preview   # Preview du build
npm run lint      # Linter ESLint
npm run typecheck # Vérification TypeScript
npm run seed      # Peupler la base Supabase
```

## Déploiement

Le dossier `dist/` généré par `npm run build` peut être déployé sur :
- Vercel
- Netlify  
- Cloudflare Pages

## Licence

Propriétaire - © 2025 Devmaster
