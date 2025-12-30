import type { Locale } from '@/contexts';

interface NavItem {
  name: string;
  id: string;
}

/**
 * Navigation par défaut (fallback si Supabase indisponible)
 * Multilingue: EN, FR, ZH
 */
export const fallbackNavItems: Record<Locale, NavItem[]> = {
  en: [
    { name: "Benefits", id: "benefits" },
    { name: "Solutions", id: "solutions" },
    { name: "Results", id: "results" },
    { name: "Process", id: "process" },
    { name: "FAQ", id: "faq" },
  ],
  fr: [
    { name: "Bénéfices", id: "benefits" },
    { name: "Solutions", id: "solutions" },
    { name: "Résultats", id: "results" },
    { name: "Process", id: "process" },
    { name: "FAQ", id: "faq" },
  ],
  zh: [
    { name: "优势", id: "benefits" },
    { name: "解决方案", id: "solutions" },
    { name: "成果", id: "results" },
    { name: "流程", id: "process" },
    { name: "常见问题", id: "faq" },
  ],
};
