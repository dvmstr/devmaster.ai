/**
 * Types partagés pour les composants
 */

export interface Testimonial {
  text: string;
  name: string;
  role: string;
  company: string;
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
