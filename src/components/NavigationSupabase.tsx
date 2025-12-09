import { motion } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigation } from "@/hooks/useSupabaseData";

// Fallback navigation items
const fallbackNavItems = [
  { name: "Bénéfices", id: "benefits" },
  { name: "Solutions", id: "solutions" },
  { name: "Résultats", id: "results" },
  { name: "Process", id: "process" },
  { name: "FAQ", id: "faq" },
];

export const NavigationSupabase = () => {
  const [activeTab, setActiveTab] = useState("");
  const isScrollingRef = useRef(false);
  const { data: supabaseNavItems, loading, error } = useNavigation();

  // Utiliser les items de Supabase ou le fallback
  const navItems = useMemo(() => {
    if (loading || error || !supabaseNavItems || supabaseNavItems.length === 0) {
      return fallbackNavItems;
    }

    return supabaseNavItems.map(item => ({
      name: item.label,
      id: item.target_section,
    }));
  }, [supabaseNavItems, loading, error]);

  const scrollToSection = (id: string) => {
    isScrollingRef.current = true;

    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveTab("");
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setActiveTab(id);
      }
    }

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);
  };

  const allSections = [...navItems, { name: "CTA", id: "cta-final" }];

  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const scrollPosition = window.scrollY + 200;

      if (scrollPosition < 300) {
        setActiveTab("");
        return;
      }

      for (const item of allSections) {
        const element = document.getElementById(item.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveTab(item.id);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [allSections]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pt-3 sm:pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <button
          onClick={() => scrollToSection("hero")}
          className="text-sm sm:text-base font-medium text-white px-2 sm:px-4 py-1.5 hover:text-white/60 transition-colors"
        >
          Devmaster
        </button>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative cursor-pointer text-sm font-light px-5 py-1.5 rounded-full transition-colors text-gray-300 hover:text-white/60"
              >
                <span>{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 w-full bg-cyan-500/10 rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35,
                    }}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-cyan-500 rounded-t-full">
                      <div className="absolute w-12 h-6 bg-cyan-500/30 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-8 h-6 bg-cyan-500/30 rounded-full blur-md -top-1" />
                      <div className="absolute w-4 h-4 bg-cyan-500/30 rounded-full blur-sm top-0 left-2" />
                    </div>
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => scrollToSection("cta-final")}
          className="btn-glass-filled group flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
        >
          <span className="hidden sm:inline">Audit gratuit</span>
          <span className="sm:hidden">Audit</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform duration-300">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </nav>
  );
};
