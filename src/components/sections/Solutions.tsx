import { ArrowRight } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { LightSource } from "@/components/common";
import { solutionsData } from "@/data";
import { scrollToCTA } from "@/lib/scroll";
import { useCurrentLocale } from "@/contexts";
import { useMemo } from "react";
import { useSectionContent } from "@/hooks";

// Fallback content
const solutionsFallback = {
  en: { cta: "Get my personalized audit" },
  fr: { cta: "Obtenir mon audit personnalisé" },
  zh: { cta: "获取我的个性化审计" },
};

interface SolutionsContent {
  cta: string;
}

export const Solutions = () => {
  const locale = useCurrentLocale();
  const fallback = useMemo(() => solutionsFallback[locale] || solutionsFallback.en, [locale]);
  const { content, sectionTitle, sectionSubtitle } = useSectionContent<SolutionsContent>('solutions', fallback);

  const localizedSolutions = useMemo(() => {
    return solutionsData[locale] || solutionsData.en;
  }, [locale]);

  return (
    <section id="solutions" className="relative min-h-screen flex items-center justify-center py-12 sm:py-16">
      <LightSource direction={0} color="cyan" intensity="medium" className="top-0 sm:hidden" />
      <LightSource direction={270} color="cyan" intensity="medium" className="hidden sm:block -left-32 sm:-left-64" />
      <LightSource direction={180} color="blue" intensity="medium" className="-bottom-20 sm:hidden" />
      <LightSource direction={90} color="blue" intensity="medium" className="hidden sm:block -right-32 sm:-right-64" />

      <div className="relative z-10 w-full">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-3 sm:mb-4 px-4">
            {sectionTitle || (locale === 'fr' ? 'Nos Solutions' : locale === 'zh' ? '我们的解决方案' : 'Our Solutions')}
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-6">
            {sectionSubtitle || (locale === 'fr' ? "Découvrez notre écosystème d'automatisations intelligentes" : locale === 'zh' ? '探索我们的智能自动化生态系统' : 'Discover our ecosystem of intelligent automations')}
          </p>
        </div>

        <RadialOrbitalTimeline timelineData={localizedSolutions} locale={locale} />

        <div className="flex justify-center mt-8 sm:mt-16 px-4 sm:px-6">
          <button
            onClick={scrollToCTA}
            className="btn-glass-filled group flex items-center gap-2 w-full sm:w-auto justify-center max-w-sm"
          >
            {content.cta}
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};
