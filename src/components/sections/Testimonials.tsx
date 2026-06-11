import { TestimonialsColumn } from "@/components/ui/testimonials-columns";
import { ArrowRight } from "lucide-react";
import { useTestimonials, useSectionContent } from "@/hooks";
import { useMemo } from "react";
import { fallbackTestimonials } from "@/data";
import { scrollToCTA } from "@/lib/scroll";
import { useCurrentLocale } from "@/contexts";

// Fallback CTA text
const ctaFallback = {
  en: { ctaText: "Join them now" },
  fr: { ctaText: "Rejoignez-les maintenant" },
  zh: { ctaText: "立即加入他们" },
};

interface TestimonialsContent {
  ctaText: string;
}

export const Testimonials = () => {
  const locale = useCurrentLocale();
  const { data: supabaseTestimonials, loading, error } = useTestimonials();
  const fallback = useMemo(() => ctaFallback[locale] || ctaFallback.en, [locale]);
  const { content: sectionContent } = useSectionContent<TestimonialsContent>('testimonials', fallback);

  const testimonials = useMemo(() => {
    if (loading || error || !supabaseTestimonials || supabaseTestimonials.length === 0) {
      return fallbackTestimonials[locale] || fallbackTestimonials.en;
    }

    return supabaseTestimonials.map(testimonial => ({
      text: testimonial.testimonial_text,
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company || "",
    }));
  }, [supabaseTestimonials, loading, error, locale]);

  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);
  const thirdColumn = testimonials.slice(6, 9);

  const ctaText = sectionContent.ctaText;

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
            {ctaText}
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};
