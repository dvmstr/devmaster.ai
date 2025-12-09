import { TestimonialsColumn } from "./ui/testimonials-columns-1";
import { ArrowRight } from "lucide-react";
import { useTestimonials } from "@/hooks/useSupabaseData";
import { useMemo } from "react";

// Fallback testimonials au cas où Supabase ne répond pas
const fallbackTestimonials = [
  {
    text: "Grâce à l'automatisation de nos emails et du suivi des leads, nous avons multiplié par 3 notre taux de conversion tout en gagnant 15h par semaine.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces",
    name: "Sophie Martin",
    role: "Directrice Marketing",
  },
  {
    text: "Le chatbot IA a révolutionné notre service client. Disponible 24/7, il traite 80% des demandes automatiquement avec une satisfaction client qui n'a jamais été aussi haute.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces",
    name: "Thomas Dubois",
    role: "Responsable Service Client",
  },
  {
    text: "L'intégration n8n de nos outils a transformé notre productivité. Plus de saisie manuelle, plus d'erreurs. Tout est synchronisé en temps réel.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop&crop=faces",
    name: "Julie Rousseau",
    role: "Chef de Projet Digital",
  },
  {
    text: "Les workflows d'automatisation ont libéré mon équipe des tâches répétitives. Nous nous concentrons enfin sur la stratégie et la créativité.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=faces",
    name: "Marc Lefebvre",
    role: "CEO",
  },
  {
    text: "L'automatisation de notre CRM et des relances a transformé notre gestion commerciale. Zéro lead oublié, des suivis parfaitement orchestrés.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces",
    name: "Léa Bernard",
    role: "Directrice Commerciale",
  },
  {
    text: "Leur expertise en IA et automatisation est impressionnante. En 3 semaines, nos processus métier étaient totalement transformés avec un ROI immédiat.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
    name: "Alexandre Petit",
    role: "Directeur des Opérations",
  },
  {
    text: "Les agents IA personnalisés ont automatisé notre qualification de leads. Nous traitons 5 fois plus de prospects avec la même équipe.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=faces",
    name: "Claire Moreau",
    role: "Responsable Growth",
  },
  {
    text: "L'implémentation a été fluide et rapide. En quelques jours, nos équipes étaient autonomes sur les nouveaux workflows automatisés.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces",
    name: "Pierre Durand",
    role: "Directeur Technique",
  },
  {
    text: "L'automatisation intelligente de nos campagnes email a boosté notre engagement de 250%. Les résultats parlent d'eux-mêmes.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces",
    name: "Émilie Laurent",
    role: "Responsable Marketing Digital",
  },
];

// Mapping des images pour chaque personne (à garder cohérent)
const avatarMapping: Record<string, string> = {
  "Sophie Martin": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces",
  "Thomas Dubois": "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces",
  "Julie Rousseau": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop&crop=faces",
  "Marc Lefebvre": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=faces",
  "Léa Bernard": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces",
  "Alexandre Petit": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
  "Claire Moreau": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=faces",
  "Pierre Durand": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces",
  "Émilie Laurent": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces",
};

export const TestimonialsSupabase = () => {
  const { data: supabaseTestimonials, loading, error } = useTestimonials();

  const scrollToCTA = () => {
    const element = document.getElementById("cta-final");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Transformer les données Supabase au format attendu par le composant
  const testimonials = useMemo(() => {
    // Si les données ne sont pas encore chargées ou en erreur, utiliser le fallback
    if (loading || error || !supabaseTestimonials || supabaseTestimonials.length === 0) {
      return fallbackTestimonials;
    }

    return supabaseTestimonials.map(testimonial => ({
      text: testimonial.testimonial_text,
      image: avatarMapping[testimonial.name] || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
      name: testimonial.name,
      role: testimonial.role,
    }));
  }, [supabaseTestimonials, loading, error]);

  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);
  const thirdColumn = testimonials.slice(6, 9);

  return (
    <section id="testimonials" className="relative py-12 sm:py-16 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-center gap-4 sm:gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[600px] sm:max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>

        <div className="flex justify-center mt-10 sm:mt-16">
          <button
            onClick={scrollToCTA}
            className="btn-glass-filled group flex items-center gap-2 w-full sm:w-auto justify-center max-w-xs"
          >
            Rejoignez-les maintenant
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};
