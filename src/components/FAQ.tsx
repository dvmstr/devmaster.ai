import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Combien de temps avant de voir les premiers résultats ?",
      answer: "Les premières automatisations sont déployées en 48h après l'audit. Vous constaterez un impact mesurable dès la première semaine avec un gain de temps immédiat sur vos tâches répétitives."
    },
    {
      question: "Quels outils utilisez-vous ?",
      answer: "Nous travaillons avec les leaders du marché : n8n, Make, Zapier pour l'orchestration, OpenAI et Anthropic pour l'IA, et nous nous intégrons à tous vos outils existants (CRM, email, messagerie, etc.)."
    },
    {
      question: "Comment gérez-vous nos identifiants et données sensibles ?",
      answer: "Nous utilisons OAuth et SSO pour éviter de stocker vos mots de passe. Toutes les clés API sont chiffrées dans un coffre-fort sécurisé. Vos données restent sur vos systèmes, nous n'en conservons aucune copie."
    },
    {
      question: "Travaillez-vous avec tous les secteurs d'activité ?",
      answer: "Oui, nos solutions s'adaptent à tout type d'entreprise : e-commerce, services B2B, agences, SaaS, cabinets de conseil, etc. Nous personnalisons chaque automatisation selon vos besoins spécifiques."
    },
    {
      question: "Quel est le modèle de tarification ?",
      answer: "Nous proposons un audit gratuit de 48h, puis un forfait mensuel adapté à votre volume d'automatisations. Pas de frais cachés, annulation possible à tout moment. ROI garanti dès le premier mois."
    },
    {
      question: "Quel niveau de support proposez-vous ?",
      answer: "Support dédié en français par email et visio. Temps de réponse < 4h en jour ouvré. Optimisation continue incluse pour faire évoluer vos automatisations avec votre business."
    },
    {
      question: "Que se passe-t-il si nous voulons arrêter ?",
      answer: "Réversibilité totale garantie. Vous récupérez tous vos workflows, configurations et données. Pas de période d'engagement minimum après le premier mois."
    },
    {
      question: "Avez-vous besoin d'accès à nos systèmes ?",
      answer: "Uniquement les permissions minimales nécessaires via OAuth. Vous gardez le contrôle total et pouvez révoquer les accès à tout moment depuis vos outils."
    }
  ];

  return (
    <section id="faq" className="relative py-24">
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-medium text-white mb-4">
            Questions fréquentes
          </h2>
          <p className="text-lg text-gray-400">
            Tout ce que vous devez savoir sur DevMaster
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden transition-all duration-200 ${
                openIndex === index ? 'shadow-xl' : 'hover:bg-white/10'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className={`text-base font-light pr-8 transition-colors duration-200 ${
                  openIndex === index ? 'text-white' : 'text-gray-300'
                }`}>
                  {faq.question}
                </span>
                <motion.div
                  animate={{
                    rotate: openIndex === index ? 180 : 0,
                    scale: openIndex === index ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown
                    className="text-white"
                    size={20}
                  />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                      transition: { duration: 0.2, ease: "easeOut" },
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      transition: { duration: 0.2, ease: "easeIn" },
                    }}
                  >
                    <div className="px-6 pb-4 pt-2">
                      <motion.p
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        className="text-sm text-gray-400 leading-relaxed"
                      >
                        {faq.answer}
                      </motion.p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
