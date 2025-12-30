import { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFAQs } from "@/hooks";
import { fallbackFAQs } from "@/data";
import { useCurrentLocale } from "@/contexts";

// Localized section titles
const sectionTitles = {
  en: "Frequently Asked Questions",
  fr: "Questions fréquentes",
  zh: "常见问题",
};

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const locale = useCurrentLocale();
  const { data: supabaseFAQs, loading, error } = useFAQs();

  const faqs = useMemo(() => {
    if (loading || error || !supabaseFAQs || supabaseFAQs.length === 0) {
      return fallbackFAQs[locale] || fallbackFAQs.en;
    }

    return supabaseFAQs.map(faq => ({
      question: faq.question,
      answer: faq.answer,
    }));
  }, [supabaseFAQs, loading, error, locale]);

  const title = sectionTitles[locale] || sectionTitles.en;

  return (
    <section id="faq" className="relative py-16 sm:py-24">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-3 sm:mb-4 px-2">
            {title}
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
