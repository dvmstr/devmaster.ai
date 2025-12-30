import { Timeline } from "@/components/ui/timeline";
import { Search, Lightbulb, Rocket } from "lucide-react";
import { useCurrentLocale } from "@/contexts";
import { useMemo } from "react";

// Localized content for process steps
const processContent = {
  en: {
    steps: [
      {
        title: "01",
        badge: "48h",
        heading: "Free Analysis",
        description: "Complete audit of your processes and identification of automation opportunities.",
        boxTitle: "What's included:",
        items: [
          "Detailed analysis of your current processes",
          "Identification of repetitive tasks",
          "Estimation of time saved through automation",
          "Personalized opportunities report",
        ],
      },
      {
        title: "02",
        badge: "7 days",
        heading: "Custom Plan",
        description: "Design of an automation strategy tailored to your needs and objectives.",
        boxTitle: "Our approach:",
        items: [
          "Custom technical architecture",
          "Priority-based deployment roadmap",
          "Detailed budget and projected ROI",
          "Validation with your team",
        ],
      },
      {
        title: "03",
        badge: "Continuous",
        heading: "Deployment & Optimization",
        description: "Rapid implementation and continuous improvement of your automations.",
        boxTitle: "Production launch:",
        items: [
          "Development and integration of automations",
          "Training for your teams",
          "Dedicated technical support",
          "Permanent monitoring and optimization",
        ],
      },
    ],
  },
  fr: {
    steps: [
      {
        title: "01",
        badge: "48h",
        heading: "Analyse gratuite",
        description: "Audit complet de vos processus et identification des opportunités d'automatisation.",
        boxTitle: "Ce qui est inclus :",
        items: [
          "Analyse détaillée de vos processus actuels",
          "Identification des tâches répétitives",
          "Estimation du temps gagné par automatisation",
          "Rapport d'opportunités personnalisé",
        ],
      },
      {
        title: "02",
        badge: "7 jours",
        heading: "Plan sur mesure",
        description: "Conception d'une stratégie d'automatisation adaptée à vos besoins et objectifs.",
        boxTitle: "Notre approche :",
        items: [
          "Architecture technique personnalisée",
          "Roadmap de déploiement par priorités",
          "Budget et ROI prévisionnel détaillé",
          "Validation avec votre équipe",
        ],
      },
      {
        title: "03",
        badge: "Continue",
        heading: "Déploiement & optimisation",
        description: "Mise en place rapide et amélioration continue de vos automatisations.",
        boxTitle: "Mise en production :",
        items: [
          "Développement et intégration des automatisations",
          "Formation de vos équipes",
          "Support technique dédié",
          "Monitoring et optimisation permanente",
        ],
      },
    ],
  },
  zh: {
    steps: [
      {
        title: "01",
        badge: "48小时",
        heading: "免费分析",
        description: "对您的流程进行全面审计，识别自动化机会。",
        boxTitle: "包含内容：",
        items: [
          "详细分析您当前的流程",
          "识别重复性任务",
          "估算通过自动化节省的时间",
          "个性化机会报告",
        ],
      },
      {
        title: "02",
        badge: "7天",
        heading: "定制方案",
        description: "设计适合您需求和目标的自动化策略。",
        boxTitle: "我们的方法：",
        items: [
          "定制技术架构",
          "基于优先级的部署路线图",
          "详细的预算和预计投资回报率",
          "与您的团队验证",
        ],
      },
      {
        title: "03",
        badge: "持续",
        heading: "部署与优化",
        description: "快速实施和持续改进您的自动化。",
        boxTitle: "生产上线：",
        items: [
          "自动化的开发和集成",
          "为您的团队培训",
          "专属技术支持",
          "永久监控和优化",
        ],
      },
    ],
  },
};

const icons = [Search, Lightbulb, Rocket];

export const Process = () => {
  const locale = useCurrentLocale();
  
  const content = useMemo(() => {
    return processContent[locale] || processContent.en;
  }, [locale]);

  const data = content.steps.map((step, index) => {
    const Icon = icons[index];
    
    return {
      title: step.title,
      content: (
        <div>
          <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-cyan-500/20 rounded-xl shrink-0">
              <Icon className="text-cyan-500" size={index === 0 ? 20 : 24} />
            </div>
            <div>
              <div className="inline-block px-2 sm:px-2.5 py-0.5 bg-cyan-500/20 rounded-full text-cyan-500 text-[10px] sm:text-xs font-light mb-1.5 sm:mb-2">
                {step.badge}
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-white mb-1.5 sm:mb-2">
                {step.heading}
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm md:text-base">
                {step.description}
              </p>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
            <h4 className="text-white font-normal mb-2 sm:mb-3 text-sm sm:text-base">{step.boxTitle}</h4>
            <div className="space-y-1.5 sm:space-y-2">
              {step.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex gap-2 items-start text-gray-300 text-xs sm:text-sm">
                  <span className="text-cyan-500 shrink-0">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    };
  });

  return (
    <section id="process" className="relative">
      <Timeline data={data} />
    </section>
  );
};
