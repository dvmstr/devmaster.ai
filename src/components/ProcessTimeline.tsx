import React from "react";
import { Timeline } from "./ui/timeline";
import { Search, Lightbulb, Rocket } from "lucide-react";

export const ProcessTimeline = () => {
  const data = [
    {
      title: "01",
      content: (
        <div>
          <div className="flex items-start gap-4 mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-cyan-500/20 rounded-xl shrink-0">
              <Search className="text-cyan-500" size={24} />
            </div>
            <div>
              <div className="inline-block px-2.5 py-0.5 bg-cyan-500/20 rounded-full text-cyan-500 text-xs font-light mb-2">
                48h
              </div>
              <h3 className="text-xl md:text-2xl font-medium text-white mb-2">
                Analyse gratuite
              </h3>
              <p className="text-gray-300 text-sm md:text-base">
                Audit complet de vos processus et identification des opportunités d'automatisation.
              </p>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h4 className="text-white font-normal mb-3">Ce qui est inclus :</h4>
            <div className="space-y-2">
              <div className="flex gap-2 items-start text-gray-300 text-sm">
                <span className="text-cyan-500 shrink-0">✓</span>
                <span>Analyse détaillée de vos processus actuels</span>
              </div>
              <div className="flex gap-2 items-start text-gray-300 text-sm">
                <span className="text-cyan-500 shrink-0">✓</span>
                <span>Identification des tâches répétitives</span>
              </div>
              <div className="flex gap-2 items-start text-gray-300 text-sm">
                <span className="text-cyan-500 shrink-0">✓</span>
                <span>Estimation du temps gagné par automatisation</span>
              </div>
              <div className="flex gap-2 items-start text-gray-300 text-sm">
                <span className="text-cyan-500 shrink-0">✓</span>
                <span>Rapport d'opportunités personnalisé</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "02",
      content: (
        <div>
          <div className="flex items-start gap-4 mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-cyan-500/20 rounded-xl shrink-0">
              <Lightbulb className="text-cyan-500" size={24} />
            </div>
            <div>
              <div className="inline-block px-2.5 py-0.5 bg-cyan-500/20 rounded-full text-cyan-500 text-xs font-light mb-2">
                7 jours
              </div>
              <h3 className="text-xl md:text-2xl font-medium text-white mb-2">
                Plan sur mesure
              </h3>
              <p className="text-gray-300 text-sm md:text-base">
                Conception d'une stratégie d'automatisation adaptée à vos besoins et objectifs.
              </p>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h4 className="text-white font-normal mb-3">Notre approche :</h4>
            <div className="space-y-2">
              <div className="flex gap-2 items-start text-gray-300 text-sm">
                <span className="text-cyan-500 shrink-0">✓</span>
                <span>Architecture technique personnalisée</span>
              </div>
              <div className="flex gap-2 items-start text-gray-300 text-sm">
                <span className="text-cyan-500 shrink-0">✓</span>
                <span>Roadmap de déploiement par priorités</span>
              </div>
              <div className="flex gap-2 items-start text-gray-300 text-sm">
                <span className="text-cyan-500 shrink-0">✓</span>
                <span>Budget et ROI prévisionnel détaillé</span>
              </div>
              <div className="flex gap-2 items-start text-gray-300 text-sm">
                <span className="text-cyan-500 shrink-0">✓</span>
                <span>Validation avec votre équipe</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "03",
      content: (
        <div>
          <div className="flex items-start gap-4 mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-cyan-500/20 rounded-xl shrink-0">
              <Rocket className="text-cyan-500" size={24} />
            </div>
            <div>
              <div className="inline-block px-2.5 py-0.5 bg-cyan-500/20 rounded-full text-cyan-500 text-xs font-light mb-2">
                Continue
              </div>
              <h3 className="text-xl md:text-2xl font-medium text-white mb-2">
                Déploiement & optimisation
              </h3>
              <p className="text-gray-300 text-sm md:text-base">
                Mise en place rapide et amélioration continue de vos automatisations.
              </p>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h4 className="text-white font-normal mb-3">Mise en production :</h4>
            <div className="space-y-2">
              <div className="flex gap-2 items-start text-gray-300 text-sm">
                <span className="text-cyan-500 shrink-0">✓</span>
                <span>Développement et intégration des automatisations</span>
              </div>
              <div className="flex gap-2 items-start text-gray-300 text-sm">
                <span className="text-cyan-500 shrink-0">✓</span>
                <span>Formation de vos équipes</span>
              </div>
              <div className="flex gap-2 items-start text-gray-300 text-sm">
                <span className="text-cyan-500 shrink-0">✓</span>
                <span>Support technique dédié</span>
              </div>
              <div className="flex gap-2 items-start text-gray-300 text-sm">
                <span className="text-cyan-500 shrink-0">✓</span>
                <span>Monitoring et optimisation permanente</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="process" className="relative">
      <Timeline data={data} />
    </section>
  );
};
