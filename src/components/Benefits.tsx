import { LightSource } from "./LightSource";
import { GlowingEffect } from "./ui/glowing-effect";
import { Box, Lock, Search, Settings, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Benefits = () => {
  const scrollToCTA = () => {
    const element = document.getElementById("cta-final");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="benefits" className="relative py-16 sm:py-24">
      <LightSource direction={180} color="cyan" intensity="high" className="!-top-96" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-3 sm:mb-4 px-2">
            Pourquoi DevMaster ?
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-2">
            Des résultats concrets qui transforment votre façon de travailler
          </p>
        </div>

        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
          <GridItem
            area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
            icon={<Box className="h-4 w-4" />}
            title="Gain de temps massif"
            description="Automatisez les tâches répétitives et concentrez-vous sur ce qui compte vraiment."
          />
          <GridItem
            area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
            icon={<Settings className="h-4 w-4" />}
            title="ROI immédiat"
            description="Rentabilisez votre investissement dès le premier mois avec des résultats mesurables."
          />
          <GridItem
            area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
            icon={<Lock className="h-4 w-4" />}
            title="Intégration rapide"
            description="Déployez vos automatisations en quelques jours, pas en plusieurs mois."
          />
          <GridItem
            area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
            icon={<Sparkles className="h-4 w-4" />}
            title="Pilotage data"
            description="Prenez des décisions éclairées grâce à des tableaux de bord en temps réel."
          />
          <GridItem
            area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
            icon={<Search className="h-4 w-4" />}
            title="Qualité constante"
            description="Éliminez les erreurs humaines et garantissez une qualité irréprochable."
          />
        </ul>

        <div className="flex justify-center mt-8 sm:mt-12">
          <button
            onClick={scrollToCTA}
            className="btn-glass-filled group flex items-center gap-2 w-full sm:w-auto justify-center max-w-xs"
          >
            Commencer maintenant
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

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
