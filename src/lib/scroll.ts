/**
 * Utilitaires de navigation par scroll
 */

/**
 * Scroll vers une section par son ID
 */
export const scrollToSection = (id: string): void => {
  if (id === "hero") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

/**
 * Scroll vers la section CTA
 */
export const scrollToCTA = (): void => {
  scrollToSection("cta-final");
};
