import { Mail, Users, MessageCircle, Database, Share2, FileText, BarChart3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface SolutionItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: LucideIcon;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

export const solutionsData: SolutionItem[] = [
  {
    id: 1,
    title: "Emails intelligents",
    date: "AUGMENTEZ VOS CONVERSIONS",
    content: "Réponses automatiques, qualification des leads et suivi personnalisé pour maximiser vos conversions.",
    category: "Communication",
    icon: Mail,
    relatedIds: [2, 4],
    status: "completed",
    energy: 95,
  },
  {
    id: 2,
    title: "Leads & Prospection",
    date: "GÉNÉREZ PLUS DE LEADS",
    content: "Génération automatisée, enrichissement intelligent et scoring précis de vos prospects.",
    category: "Sales",
    icon: Users,
    relatedIds: [1, 3, 4],
    status: "completed",
    energy: 90,
  },
  {
    id: 3,
    title: "Chatbots IA",
    date: "DISPONIBLE 24/7",
    content: "Support client 24/7, qualification automatique et réponses instantanées grâce à l'IA.",
    category: "Support",
    icon: MessageCircle,
    relatedIds: [2, 4],
    status: "completed",
    energy: 85,
  },
  {
    id: 4,
    title: "CRM & Relances",
    date: "AUTOMATISEZ VOS RELANCES",
    content: "Synchronisation multi-plateforme, mise à jour automatique et relances intelligentes.",
    category: "Management",
    icon: Database,
    relatedIds: [1, 2, 3, 7],
    status: "completed",
    energy: 80,
  },
  {
    id: 5,
    title: "Réseaux sociaux",
    date: "BOOSTEZ VOTRE VISIBILITÉ",
    content: "Publication automatisée, analyse des performances et engagement optimisé sur tous vos canaux.",
    category: "Marketing",
    icon: Share2,
    relatedIds: [7, 8],
    status: "completed",
    energy: 75,
  },
  {
    id: 6,
    title: "Documents & Factures",
    date: "GAGNEZ DU TEMPS",
    content: "Extraction automatique des données, traitement intelligent et classement sans intervention manuelle.",
    category: "Finance",
    icon: FileText,
    relatedIds: [4, 7],
    status: "completed",
    energy: 70,
  },
  {
    id: 7,
    title: "Reporting",
    date: "PILOTEZ EN TEMPS RÉEL",
    content: "Tableaux de bord en temps réel, alertes personnalisées et insights actionnables pour piloter votre activité.",
    category: "Analytics",
    icon: BarChart3,
    relatedIds: [4, 5, 6, 8],
    status: "completed",
    energy: 85,
  },
  {
    id: 8,
    title: "Recrutement",
    date: "TROUVEZ VOS TALENTS",
    content: "Sourcing automatisé, qualification intelligente des candidats et gestion optimisée de vos recrutements.",
    category: "HR",
    icon: Users,
    relatedIds: [1, 2, 3, 4, 5, 6, 7],
    status: "completed",
    energy: 100,
  },
];
