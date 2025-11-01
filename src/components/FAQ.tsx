import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Combien de temps avant de voir les premiers résultats ?",
      answer: "Votre audit personnalisé est livré sous 48h. Les premières automatisations sont déployées immédiatement après validation du plan. Vous constatez un impact mesurable dès la première semaine avec un gain de temps de 20h minimum sur vos tâches répétitives."
    },
    {
      question: "Quelles automatisations proposez-vous concrètement ?",
      answer: "Nous automatisons vos emails et réponses clients, la génération et qualification de leads, vos chatbots de support 24/7, la synchronisation CRM, la publication sur réseaux sociaux, le traitement de documents et factures, vos reportings en temps réel, et même votre processus de recrutement. Toutes nos solutions s'adaptent à vos outils actuels."
    },
    {
      question: "Comment garantissez-vous la sécurité de nos données ?",
      answer: "Nous utilisons uniquement des connexions OAuth sécurisées, sans jamais stocker vos mots de passe. Toutes les clés API sont chiffrées dans des coffres-forts certifiés. Vos données restent sur vos systèmes, nous n'en conservons aucune copie. Conformité RGPD garantie."
    },
    {
      question: "Travaillez-vous avec notre secteur d'activité ?",
      answer: "Nos solutions s'adaptent à tous les secteurs : e-commerce, services B2B, agences marketing, SaaS, cabinets de conseil, industrie, santé, etc. Chaque automatisation est personnalisée selon votre métier et vos processus spécifiques. Nous analysons vos besoins uniques lors de l'audit gratuit."
    },
    {
      question: "Quel est votre modèle de tarification ?",
      answer: "L'audit de 48h est entièrement gratuit et sans engagement. Ensuite, nous proposons un forfait mensuel adapté à votre volume d'automatisations, sans frais cachés. Vous pouvez annuler à tout moment. Garantie satisfait ou remboursé à 100% le premier mois."
    },
    {
      question: "Quel support nous apportez-vous après la mise en place ?",
      answer: "Support dédié en français par email, chat et visio. Temps de réponse garanti sous 4h en jours ouvrés. Formation complète de vos équipes incluse. Optimisation continue et ajustements réguliers pour faire évoluer vos automatisations avec votre croissance."
    },
    {
      question: "Que se passe-t-il si nous souhaitons arrêter la collaboration ?",
      answer: "Réversibilité totale garantie. Vous récupérez l'intégralité de vos workflows, configurations, documentations et accès. Aucune période d'engagement minimum. Vos automatisations continuent de fonctionner, vous gardez le contrôle absolu de votre infrastructure."
    },
    {
      question: "Devez-vous accéder à nos systèmes internes ?",
      answer: "Nous demandons uniquement les permissions minimales nécessaires via OAuth (comme Google ou Microsoft). Vous gardez le contrôle total et pouvez révoquer tous les accès instantanément depuis vos outils. Nous n'installons aucun logiciel sur vos serveurs."
    }
  ];

  return (
    <section id="faq" className="relative py-16 sm:py-24">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-3 sm:mb-4 px-2">
            Questions fréquentes
          </h2>
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
                className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between text-left"
              >
                <span className={`text-sm sm:text-base font-light pr-6 sm:pr-8 transition-colors duration-200 ${
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
                    <div className="px-4 sm:px-6 pb-3 sm:pb-4 pt-2">
                      <motion.p
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        className="text-xs sm:text-sm text-gray-400 leading-relaxed"
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
