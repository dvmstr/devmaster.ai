import { ArrowRight } from "lucide-react";
import { LogoCarousel } from "@/components/common";
import { scrollToCTA, scrollToSection } from "@/lib/scroll";
import { useCurrentLocale } from "@/contexts";
import { useMemo } from "react";
import { useSectionContent } from "@/hooks";

// Fallback content for Hero section
const heroFallback = {
  en: {
    badge: "Next-generation AI Automation",
    title: "Transform your business with AI",
    description: "Not using Artificial Intelligence? Your company's processes are probably obsolete.",
    cta_primary: "Book my audit",
    cta_secondary: "How it works",
  },
  fr: {
    badge: "Automatisation IA de nouvelle génération",
    title: "Transformez votre business avec l'IA",
    description: "Vous n'utilisez pas l'Intelligence Artificielle ? Les process de votre entreprise sont certainement obsolètes.",
    cta_primary: "Réserver mon audit",
    cta_secondary: "Comment ça marche",
  },
  zh: {
    badge: "新一代AI自动化",
    title: "用AI转型您的业务",
    description: "还没使用人工智能？您公司的流程可能已经过时。",
    cta_primary: "预约审计",
    cta_secondary: "了解更多",
  },
};

interface HeroContent {
  badge: string;
  title: string;
  description: string;
  cta_primary: string;
  cta_secondary: string;
}

export const Hero = () => {
  const locale = useCurrentLocale();
  const fallback = useMemo(() => heroFallback[locale] || heroFallback.en, [locale]);
  const { content } = useSectionContent<HeroContent>('hero', fallback);

  const logos = [
    { name: "Google", id: 1 },
    { name: "Salesforce", id: 2 },
    { name: "HubSpot", id: 3 },
    { name: "Slack", id: 4 },
    { name: "Microsoft", id: 5 },
    { name: "Notion", id: 6 },
    { name: "Airtable", id: 7 },
    { name: "OpenAI", id: 8 },
  ];

  return (
    <section className="relative min-h-screen h-screen flex flex-col justify-between pt-16 sm:pt-20" aria-label={locale === 'fr' ? "Section d'accueil" : locale === 'zh' ? '首页部分' : 'Hero section'}>
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex-1 flex flex-col justify-center">
        <div className="flex justify-center mb-6">
          <div className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full overflow-hidden" role="banner">
            <div className="absolute inset-0 rounded-full border animate-border-color-flow"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent animate-shimmer-slow"></div>
            <span className="relative z-10 text-xs text-gray-300 font-light">{content.badge}</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-medium text-white mb-4 sm:mb-5 leading-tight px-2">
          {content.title}
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-2">
          {content.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4">
          <button
            onClick={scrollToCTA}
            className="btn-glass-filled group flex items-center gap-2 w-full sm:w-auto justify-center"
            aria-label={content.cta_primary}
          >
            {content.cta_primary}
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-300" aria-hidden="true" />
          </button>
          <button
            onClick={() => scrollToSection("process")}
            className="btn-glass-outline w-full sm:w-auto justify-center"
            aria-label={content.cta_secondary}
          >
            {content.cta_secondary}
          </button>
        </div>
      </div>

      <div className="relative z-10 pb-6 sm:pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <LogoCarousel logos={logos} columnCount={4} />
        </div>
      </div>
    </section>
  );
};
