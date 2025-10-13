import { LightSource } from "./LightSource";
import { MessageCircle } from "lucide-react";

export const CTAFinal = () => {
  return (
    <section id="cta-final" className="relative py-32">
      <LightSource direction={180} color="cyan" intensity="high" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-10 md:p-12 text-center">
          <h2 className="text-3xl md:text-5xl font-medium text-white mb-4">
            Prêt à transformer votre business ?
          </h2>

          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Réservez votre audit gratuit de 48h et découvrez comment gagner 20h par semaine
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <a
              href="https://wa.me/33695541134"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass-filled group flex items-center gap-2"
              aria-label="Contacter sur WhatsApp"
            >
              <MessageCircle size={16} aria-hidden="true" />
              WhatsApp : +33 6 95 54 11 34
            </a>
          </div>

          <p className="text-gray-400 text-xs">
            Aucune carte bancaire requise • Audit 100% gratuit • Résultats en 48h
          </p>
        </div>
      </div>
    </section>
  );
};
