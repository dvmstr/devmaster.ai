import { LightSource } from "@/components/common";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Trash2, TrendingUp, Rocket, Users, Shield, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { scrollToCTA } from "@/lib/scroll";
import { useCurrentLocale } from "@/contexts";
import { useMemo } from "react";
import { useSectionContent } from "@/hooks";
import { iconMap } from "@/lib/iconMap";

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={cn("min-h-[12rem] sm:min-h-[14rem] list-none", area)}>
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-cyan-500/30 p-2 md:rounded-[1.5rem] md:p-3 bg-black/40 backdrop-blur-sm">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={2}
          variant="default"
        />
        <div className="relative flex h-full flex-col justify-between gap-4 sm:gap-6 overflow-hidden rounded-xl bg-black/60 backdrop-blur-md p-4 sm:p-6 md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg bg-cyan-500/10 border border-cyan-500/30 p-2.5">
              <div className="text-cyan-400">
                {icon}
              </div>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <h3 className="pt-0.5 text-lg sm:text-xl leading-tight font-normal font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-white">
                {title}
              </h3>
              <h2 className="font-sans text-xs sm:text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-gray-400">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

// Icon mapping for fallback (direct React elements)
const defaultIcons = [Trash2, Rocket, TrendingUp, Users, Shield];

// Fallback content (text only, icons resolved at render)
const benefitsFallback = {
  en: {
    sectionTitle: "Why Devmaster?",
    sectionSubtitle: "Concrete results that transform the way you work",
    cta: "Get started now",
    items: [
      { icon: "Trash2", title: "Eliminate unnecessary tasks", description: "Automate low-value processes and focus your teams on what really matters." },
      { icon: "Rocket", title: "Stay ahead of the curve", description: "Anticipate the AI revolution and equip yourself today with automations that will make a difference tomorrow." },
      { icon: "TrendingUp", title: "Boost your revenue", description: "Free your talent from repetitive tasks: more time to create value, less unnecessary overhead." },
      { icon: "Users", title: "Empower your employees", description: "Offer them more rewarding work: AI handles the routine, they focus on their true human potential." },
      { icon: "Shield", title: "Uncompromising security", description: "Your data is encrypted, hosted on secure servers and never shared. Each automation is designed to guarantee confidentiality and compliance." },
    ],
  },
  fr: {
    sectionTitle: "Pourquoi Devmaster ?",
    sectionSubtitle: "Des résultats concrets qui transforment votre façon de travailler",
    cta: "Commencer maintenant",
    items: [
      { icon: "Trash2", title: "Éliminez les tâches inutiles", description: "Automatisez les processus à faible valeur ajoutée et concentrez vos équipes sur ce qui compte vraiment." },
      { icon: "Rocket", title: "Prenez une longueur d'avance", description: "Anticipez la révolution IA et équipez-vous dès aujourd'hui d'automatisations qui feront la différence demain." },
      { icon: "TrendingUp", title: "Boostez votre chiffre d'affaires", description: "Libérez vos talents des tâches répétitives : plus de temps pour créer de la valeur, moins de charges inutiles." },
      { icon: "Users", title: "Valorisez vos collaborateurs", description: "Offrez-leur un travail plus gratifiant : l'IA gère la routine, ils se consacrent à leur vrai potentiel humain." },
      { icon: "Shield", title: "Sécurité sans compromis", description: "Vos données sont chiffrées, hébergées sur des serveurs sécurisés et jamais partagées. Chaque automatisation est conçue pour garantir confidentialité et conformité." },
    ],
  },
  zh: {
    sectionTitle: "为什么选择Devmaster？",
    sectionSubtitle: "具体成果，改变您的工作方式",
    cta: "立即开始",
    items: [
      { icon: "Trash2", title: "消除不必要的任务", description: "自动化低价值流程，让您的团队专注于真正重要的事情。" },
      { icon: "Rocket", title: "保持领先", description: "预见AI革命，今天就配备能在明天产生差异的自动化工具。" },
      { icon: "TrendingUp", title: "提升您的收入", description: "将您的人才从重复性任务中解放出来：更多时间创造价值，减少不必要的开销。" },
      { icon: "Users", title: "赋能您的员工", description: "为他们提供更有价值的工作：AI处理日常事务，他们专注于发挥真正的人类潜力。" },
      { icon: "Shield", title: "安全无妥协", description: "您的数据经过加密，托管在安全服务器上，从不共享。每个自动化都旨在确保机密性和合规性。" },
    ],
  },
};

interface BenefitsContent {
  sectionTitle?: string;
  sectionSubtitle?: string;
  cta: string;
  items: { icon: string; title: string; description: string }[];
}

export const Benefits = () => {
  const locale = useCurrentLocale();
  const fallback = useMemo(() => benefitsFallback[locale] || benefitsFallback.en, [locale]);
  const { content, sectionTitle, sectionSubtitle } = useSectionContent<BenefitsContent>('benefits', fallback);

  const benefits = useMemo(() => {
    return content.items.map((item, index) => {
      const IconComponent = iconMap[item.icon] || defaultIcons[index] || Shield;
      return {
        icon: <IconComponent className="h-4 w-4" />,
        title: item.title,
        description: item.description,
      };
    });
  }, [content.items]);

  const gridAreas = [
    "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
    "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
    "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]",
    "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
    "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]",
  ];

  return (
    <section id="benefits" className="relative py-16 sm:py-24">
      <LightSource direction={180} color="cyan" intensity="high" className="!-top-96" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-3 sm:mb-4 px-2">
            {sectionTitle || content.sectionTitle}
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-2">
            {sectionSubtitle || content.sectionSubtitle}
          </p>
        </div>

        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
          {benefits.map((benefit, index) => (
            <GridItem
              key={index}
              area={gridAreas[index]}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </ul>

        <div className="flex justify-center mt-8 sm:mt-12">
          <button
            onClick={scrollToCTA}
            className="btn-glass-filled group flex items-center gap-2 w-full sm:w-auto justify-center max-w-xs"
          >
            {content.cta}
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};
