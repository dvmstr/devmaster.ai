import { LightSource } from "./LightSource";
import { MessageCircle } from "lucide-react";

export const CTAFinal = () => {
  return (
    <section id="cta-final" className="relative py-20 sm:py-32">
      <LightSource direction={180} color="cyan" intensity="high" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-10 md:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-medium text-white mb-3 sm:mb-4 px-2">
            Prêt à transformer votre business ?
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto px-2">
            Réservez votre audit gratuit de 48h et découvrez comment gagner 20h par semaine
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5 sm:mb-6">
            <a
              href="https://wa.me/33695541134"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass-filled group flex items-center gap-2 w-full sm:w-auto justify-center"
              aria-label="Contacter sur WhatsApp"
            >
              <MessageCircle size={16} aria-hidden="true" />
              <span className="text-sm sm:text-base">WhatsApp : +33 6 95 54 11 34</span>
            </a>
          </div>

          <p className="text-gray-400 text-[11px] sm:text-xs px-2">
            Aucune carte bancaire requise • Audit 100% gratuit • Résultats en 48h
          </p>
        </div>
      </div>
    </section>
  );
};
