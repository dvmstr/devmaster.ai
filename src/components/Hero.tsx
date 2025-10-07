import { LightSource } from "./LightSource";
import { ArrowRight, Sparkles } from "lucide-react";
import { LogoCarousel } from "./LogoCarousel";

export const Hero = () => {
  const scrollToCTA = () => {
    const element = document.getElementById("cta-final");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
    <section className="relative h-screen flex flex-col justify-between pt-20" aria-label="Hero section">
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex-1 flex flex-col justify-center">
        <div className="flex justify-center mb-6">
          <div className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full overflow-hidden" role="banner">
            <div className="absolute inset-0 rounded-full border animate-border-color-flow"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent animate-shimmer-slow"></div>
            <span className="relative z-10 text-xs text-gray-300 font-light">Automatisation IA de nouvelle génération</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium text-white mb-5 leading-tight">
          Transformez votre business avec l'IA
        </h1>

        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Vous n'utilisez pas l'Intelligence Artificielle ? Les process de votre entreprise sont certainement obsolètes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={scrollToCTA}
            className="btn-glass-filled group flex items-center gap-2"
            aria-label="Réserver mon audit gratuit d'automatisation IA"
          >
            Réserver mon audit gratuit
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-300" aria-hidden="true" />
          </button>
          <button
            onClick={() => document.getElementById("process")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-glass-outline"
            aria-label="Découvrir comment fonctionne notre processus d'automatisation"
          >
            Comment ça marche
          </button>
        </div>
      </div>

      <div className="relative z-10 pb-8">
        <div className="max-w-4xl mx-auto px-6">
          <LogoCarousel logos={logos} columnCount={4} />
        </div>
      </div>
    </section>
  );
};
