/**
 * Types partagés pour les composants
 */

export interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface NavItem {
  name: string;
  id: string;
}

export interface Logo {
  name: string;
  id: number;
}

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}
