import { LightSource } from "@/components/common";
import { MessageCircle } from "lucide-react";
import { useCurrentLocale } from "@/contexts";
import { useMemo } from "react";
import { useSectionContent } from "@/hooks";

// Fallback content
const ctaFallback = {
  en: {
    title: "Ready to transform your business?",
    subtitle: "Book your 48h audit and discover how to save 20 hours per week",
    whatsapp: "WhatsApp: +33 6 95 54 11 34",
    disclaimer: "No commitment • Personalized audit • Results in 48h",
  },
  fr: {
    title: "Prêt à transformer votre business ?",
    subtitle: "Réservez votre audit de 48h et découvrez comment gagner 20h par semaine",
    whatsapp: "WhatsApp : +33 6 95 54 11 34",
    disclaimer: "Sans engagement • Audit personnalisé • Résultats en 48h",
  },
  zh: {
    title: "准备好转型您的业务了吗？",
    subtitle: "预约您的48小时审计，了解如何每周节省20小时",
    whatsapp: "WhatsApp: +33 6 95 54 11 34",
    disclaimer: "无需承诺 • 个性化审计 • 48小时内出结果",
  },
};

interface CTAContent {
  title: string;
  subtitle: string;
  whatsapp: string;
  disclaimer: string;
}

export const CTA = () => {
  const locale = useCurrentLocale();
  const fallback = useMemo(() => ctaFallback[locale] || ctaFallback.en, [locale]);
  const { content } = useSectionContent<CTAContent>('cta', fallback);

  return (
    <section id="cta-final" className="relative py-20 sm:py-32">
      <LightSource direction={180} color="cyan" intensity="high" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-10 md:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-medium text-white mb-3 sm:mb-4 px-2">
            {content.title}
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto px-2">
            {content.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5 sm:mb-6">
            <a
              href="https://wa.me/33695541134"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass-filled group flex items-center gap-2 w-full sm:w-auto justify-center"
              aria-label={locale === 'fr' ? 'Contacter sur WhatsApp' : locale === 'zh' ? '通过WhatsApp联系' : 'Contact on WhatsApp'}
            >
              <MessageCircle size={16} aria-hidden="true" />
              <span className="text-sm sm:text-base">{content.whatsapp}</span>
            </a>
          </div>

          <p className="text-gray-400 text-[11px] sm:text-xs px-2">
            {content.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
};
