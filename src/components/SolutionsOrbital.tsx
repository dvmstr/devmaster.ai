import { Mail, Users, MessageCircle, Database, Share2, FileText, BarChart3, Workflow, ArrowRight } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { LightSource } from "./LightSource";

export const SolutionsOrbital = () => {
  const scrollToCTA = () => {
    const element = document.getElementById("cta-final");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const solutionsData = [
    {
      id: 1,
      title: "Emails intelligents",
      date: "AUTOMATISEZ VOS RÉPONSES",
      content: "Réponses automatiques, qualification des candidats et suivi personnalisé pour maximiser vos recrutements.",
      category: "Communication",
      icon: Mail,
      relatedIds: [2, 4],
      status: "completed" as const,
      energy: 95,
    },
    {
      id: 2,
      title: "Sourcing candidats",
      date: "TROUVEZ LES MEILLEURS TALENTS",
      content: "Génération automatisée de candidats, enrichissement intelligent et scoring précis des profils.",
      category: "Sales",
      icon: Users,
      relatedIds: [1, 3, 4],
      status: "completed" as const,
      energy: 90,
    },
    {
      id: 3,
      title: "Chatbots IA",
      date: "QUALIFIEZ 24/7",
      content: "Pré-sélection 24/7, qualification automatique et réponses instantanées grâce à l'IA.",
      category: "Support",
      icon: MessageCircle,
      relatedIds: [2, 4],
      status: "completed" as const,
      energy: 85,
    },
    {
      id: 4,
      title: "ATS & Relances",
      date: "NE PERDEZ AUCUN CANDIDAT",
      content: "Synchronisation multi-plateforme, mise à jour automatique et relances intelligentes.",
      category: "Management",
      icon: Database,
      relatedIds: [1, 2, 3, 7],
      status: "in-progress" as const,
      energy: 80,
    },
    {
      id: 5,
      title: "Réseaux sociaux",
      date: "BOOSTEZ VOTRE MARQUE EMPLOYEUR",
      content: "Publication automatisée, analyse des performances et engagement optimisé sur tous vos canaux.",
      category: "Marketing",
      icon: Share2,
      relatedIds: [7, 8],
      status: "completed" as const,
      energy: 75,
    },
    {
      id: 6,
      title: "CV & Documents",
      date: "ANALYSEZ EN UN CLIN D'ŒIL",
      content: "Extraction automatique des données, traitement intelligent et classement sans intervention manuelle.",
      category: "Finance",
      icon: FileText,
      relatedIds: [4, 7],
      status: "completed" as const,
      energy: 70,
    },
    {
      id: 7,
      title: "Reporting RH",
      date: "PILOTEZ VOS KPI",
      content: "Tableaux de bord en temps réel, alertes personnalisées et insights actionnables pour piloter vos recrutements.",
      category: "Analytics",
      icon: BarChart3,
      relatedIds: [4, 5, 6, 8],
      status: "in-progress" as const,
      energy: 85,
    },
    {
      id: 8,
      title: "Workflows sur mesure",
      date: "AUTOMATISATION TOTALE",
      content: "Workflows complexes sur mesure, agents IA personnalisés et intégrations avancées entre tous vos outils RH.",
      category: "Integration",
      icon: Workflow,
      relatedIds: [1, 2, 3, 4, 5, 6, 7],
      status: "in-progress" as const,
      energy: 100,
    },
  ];

  return (
    <section id="solutions" className="relative min-h-screen flex items-center justify-center py-12 sm:py-16">
      <LightSource direction={0} color="cyan" intensity="medium" className="top-0 sm:hidden" />
      <LightSource direction={270} color="cyan" intensity="medium" className="hidden sm:block -left-32 sm:-left-64" />
      <LightSource direction={180} color="blue" intensity="medium" className="-bottom-20 sm:hidden" />
      <LightSource direction={90} color="blue" intensity="medium" className="hidden sm:block -right-32 sm:-right-64" />

      <div className="relative z-10 w-full">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-3 sm:mb-4 px-4">
            Nos Solutions
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-6">
            Découvrez notre écosystème d'automatisations intelligentes
          </p>
        </div>

        <RadialOrbitalTimeline timelineData={solutionsData} />

        <div className="flex justify-center mt-8 sm:mt-16 px-4 sm:px-6">
          <button
            onClick={scrollToCTA}
            className="btn-glass-filled group flex items-center gap-2 w-full sm:w-auto justify-center max-w-sm"
          >
            Obtenir mon audit personnalisé
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};
