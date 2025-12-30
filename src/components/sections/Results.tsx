import { LightSource } from "@/components/common";
import { useEffect, useRef, useState, useMemo } from "react";
import { useCurrentLocale } from "@/contexts";

const CountUp = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, hasStarted]);

  return <div ref={ref}>{count}</div>;
};

// Localized content
const resultsContent = {
  en: {
    title: "Measurable results",
    subtitle: "Our clients see immediate impact on their performance",
    stats: [
      { value: 300, suffix: "%", label: "Productivity increase" },
      { value: 20, suffix: "h", label: "Saved per week" },
      { value: 100, suffix: "%", label: "Satisfaction guaranteed" },
      { value: 48, suffix: "h", label: "For your Audit & Quote" },
    ],
  },
  fr: {
    title: "Des résultats mesurables",
    subtitle: "Nos clients constatent un impact immédiat sur leur performance",
    stats: [
      { value: 300, suffix: "%", label: "Augmentation de productivité" },
      { value: 20, suffix: "h", label: "Économisées par semaine" },
      { value: 100, suffix: "%", label: "Satisfait ou remboursé" },
      { value: 48, suffix: "h", label: "Pour votre Audit & Devis" },
    ],
  },
  zh: {
    title: "可衡量的成果",
    subtitle: "我们的客户立即看到对其业绩的影响",
    stats: [
      { value: 300, suffix: "%", label: "生产力提升" },
      { value: 20, suffix: "h", label: "每周节省" },
      { value: 100, suffix: "%", label: "满意保证" },
      { value: 48, suffix: "h", label: "审计和报价" },
    ],
  },
};

export const Results = () => {
  const locale = useCurrentLocale();
  
  const content = useMemo(() => {
    return resultsContent[locale] || resultsContent.en;
  }, [locale]);

  return (
    <section id="results" className="relative py-12 sm:py-16 pb-24 sm:pb-32">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-3 sm:mb-4 px-2">
            {content.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-2">
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {content.stats.map((stat, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-5 text-center shadow-xl">
              <div className="text-2xl sm:text-3xl md:text-4xl font-medium text-white mb-1 sm:mb-2">
                <CountUp end={stat.value} />{stat.suffix}
              </div>
              <div className="text-[10px] sm:text-xs text-gray-400 leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <LightSource direction={180} color="cyan" intensity="high" className="-bottom-16" />
    </section>
  );
};
