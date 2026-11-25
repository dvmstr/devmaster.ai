import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/**
 * Tout le texte du site, un fichier par langue (src/content/site/en.json, fr.json, zh.json).
 * Le schéma est vérifié au build : un champ oublié dans une langue fait échouer la publication.
 */
const icon = z.enum([
  "Trash2", "Rocket", "TrendingUp", "Users", "Shield", "Search", "Lightbulb", "Mail",
  "MessageCircle", "Database", "Share2", "FileText", "BarChart3", "Bot", "Zap", "Workflow",
]);
const text = z.string().min(1);

const site = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/site" }),
  schema: z.object({
    meta: z.object({ title: text, description: text, ogTitle: text, ogDescription: text, keywords: z.array(text) }),
    a11y: z.object({ skipToContent: text, heroLabel: text, languageMenu: text, whatsapp: text, home: text }),
    nav: z.object({ items: z.array(z.object({ label: text, target: text })), cta: text, clientArea: text }),
    hero: z.object({ badge: text, title: text, description: text, ctaPrimary: text, ctaSecondary: text, logos: z.array(text).min(4) }),
    benefits: z.object({
      items: z.array(z.object({ icon, title: text, description: text })).length(5),
    }),
    solutions: z.object({
      title: text, subtitle: text, cta: text, combineWith: text,
      items: z.array(z.object({
        id: z.number().int(), title: text, tagline: text, description: text, icon,
        relatedIds: z.array(z.number().int()), impactStat: text,
      })).min(3),
    }),
    demos: z.object({
      title: text, subtitle: text, badge: text, cta: text,
      message: text.refine((s) => s.includes("{name}"), "doit contenir {name}"), privateNote: text, clientArea: text,
    }),
    testimonials: z.object({
      cta: text,
      items: z.array(z.object({ text, name: text, role: text, company: z.string() })).min(3),
    }),
    process: z.object({
      title: text, subtitle: text,
      steps: z.array(z.object({
        number: text, badge: text, heading: text, description: text, boxTitle: text, items: z.array(text).min(1),
      })).length(3),
    }),
    faq: z.object({ title: text, items: z.array(z.object({ question: text, answer: text })).min(1) }),
    cta: z.object({ title: text, subtitle: text, whatsapp: text, email: text, points: z.array(text).min(1) }),
    footer: z.object({
      tagline: text, navigation: text, solutions: text, contact: text, requestAudit: text, clientArea: text,
      copyright: text.refine((s) => s.includes("{year}"), "doit contenir {year}"), legal: text,
    }),
    notFound: z.object({ title: text, description: text, back: text }),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/legal" }),
  schema: z.object({
    meta: z.object({ title: text, description: text }),
    backLink: text,
    pageTitle: text,
    sections: z.array(z.object({
      title: text,
      content: z.array(z.object({ label: z.string().optional(), text })).default([]),
      details: z.array(z.object({ label: z.string().optional(), text })).optional(),
      attribution: z.string().optional(),
      subsections: z.array(z.object({ title: text, content: z.array(z.object({ text })) })).optional(),
    })),
  }),
});

export const collections = { site, legal };
