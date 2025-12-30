import type { Locale } from '@/contexts';

interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

/**
 * Données témoignages par défaut (fallback si Supabase indisponible)
 * Multilingue: EN, FR, ZH
 */
export const fallbackTestimonials: Record<Locale, Testimonial[]> = {
  en: [
    {
      text: "Thanks to email automation and lead tracking, we tripled our conversion rate while saving 15 hours per week.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces",
      name: "Sophie Martin",
      role: "Marketing Director",
    },
    {
      text: "The AI chatbot revolutionized our customer service. Available 24/7, it handles 80% of requests automatically with customer satisfaction at an all-time high.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces",
      name: "Thomas Dubois",
      role: "Customer Service Manager",
    },
    {
      text: "The n8n integration of our tools transformed our productivity. No more manual entry, no more errors. Everything is synchronized in real-time.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop&crop=faces",
      name: "Julie Rousseau",
      role: "Digital Project Manager",
    },
    {
      text: "Automation workflows freed my team from repetitive tasks. We finally focus on strategy and creativity.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=faces",
      name: "Marc Lefebvre",
      role: "CEO",
    },
    {
      text: "CRM automation and follow-ups transformed our sales management. Zero forgotten leads, perfectly orchestrated follow-ups.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces",
      name: "Léa Bernard",
      role: "Sales Director",
    },
    {
      text: "Their expertise in AI and automation is impressive. In 3 weeks, our business processes were completely transformed with immediate ROI.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
      name: "Alexandre Petit",
      role: "Operations Director",
    },
    {
      text: "Custom AI agents automated our lead qualification. We handle 5 times more prospects with the same team.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=faces",
      name: "Claire Moreau",
      role: "Growth Manager",
    },
    {
      text: "Implementation was smooth and fast. Within days, our teams were autonomous on the new automated workflows.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces",
      name: "Pierre Durand",
      role: "Technical Director",
    },
    {
      text: "Intelligent automation of our email campaigns boosted our engagement by 250%. The results speak for themselves.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces",
      name: "Émilie Laurent",
      role: "Digital Marketing Manager",
    },
  ],
  fr: [
    {
      text: "Grâce à l'automatisation de nos emails et du suivi des leads, nous avons multiplié par 3 notre taux de conversion tout en gagnant 15h par semaine.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces",
      name: "Sophie Martin",
      role: "Directrice Marketing",
    },
    {
      text: "Le chatbot IA a révolutionné notre service client. Disponible 24/7, il traite 80% des demandes automatiquement avec une satisfaction client qui n'a jamais été aussi haute.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces",
      name: "Thomas Dubois",
      role: "Responsable Service Client",
    },
    {
      text: "L'intégration n8n de nos outils a transformé notre productivité. Plus de saisie manuelle, plus d'erreurs. Tout est synchronisé en temps réel.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop&crop=faces",
      name: "Julie Rousseau",
      role: "Chef de Projet Digital",
    },
    {
      text: "Les workflows d'automatisation ont libéré mon équipe des tâches répétitives. Nous nous concentrons enfin sur la stratégie et la créativité.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=faces",
      name: "Marc Lefebvre",
      role: "CEO",
    },
    {
      text: "L'automatisation de notre CRM et des relances a transformé notre gestion commerciale. Zéro lead oublié, des suivis parfaitement orchestrés.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces",
      name: "Léa Bernard",
      role: "Directrice Commerciale",
    },
    {
      text: "Leur expertise en IA et automatisation est impressionnante. En 3 semaines, nos processus métier étaient totalement transformés avec un ROI immédiat.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
      name: "Alexandre Petit",
      role: "Directeur des Opérations",
    },
    {
      text: "Les agents IA personnalisés ont automatisé notre qualification de leads. Nous traitons 5 fois plus de prospects avec la même équipe.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=faces",
      name: "Claire Moreau",
      role: "Responsable Growth",
    },
    {
      text: "L'implémentation a été fluide et rapide. En quelques jours, nos équipes étaient autonomes sur les nouveaux workflows automatisés.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces",
      name: "Pierre Durand",
      role: "Directeur Technique",
    },
    {
      text: "L'automatisation intelligente de nos campagnes email a boosté notre engagement de 250%. Les résultats parlent d'eux-mêmes.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces",
      name: "Émilie Laurent",
      role: "Responsable Marketing Digital",
    },
  ],
  zh: [
    {
      text: "通过邮件自动化和潜在客户跟踪，我们的转化率提高了3倍，同时每周节省15小时。",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces",
      name: "王芳",
      role: "市场总监",
    },
    {
      text: "AI聊天机器人彻底改变了我们的客户服务。全天候可用，自动处理80%的请求，客户满意度达到历史最高。",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces",
      name: "张伟",
      role: "客户服务经理",
    },
    {
      text: "n8n工具集成改变了我们的生产力。不再需要手动输入，不再有错误。一切实时同步。",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop&crop=faces",
      name: "李娜",
      role: "数字项目经理",
    },
    {
      text: "自动化工作流程解放了我的团队，使其摆脱了重复性任务。我们终于可以专注于战略和创意。",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=faces",
      name: "陈明",
      role: "首席执行官",
    },
    {
      text: "CRM自动化和跟进改变了我们的销售管理。零遗漏的潜在客户，完美编排的跟进。",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces",
      name: "刘丽",
      role: "销售总监",
    },
    {
      text: "他们在AI和自动化方面的专业知识令人印象深刻。在3周内，我们的业务流程完全转型，立即获得投资回报。",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
      name: "赵强",
      role: "运营总监",
    },
    {
      text: "定制AI代理自动化了我们的潜在客户资格认定。我们用同样的团队处理5倍的潜在客户。",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=faces",
      name: "吴雪",
      role: "增长经理",
    },
    {
      text: "实施过程顺利而快速。几天之内，我们的团队就能自主使用新的自动化工作流程。",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces",
      name: "周杰",
      role: "技术总监",
    },
    {
      text: "邮件营销活动的智能自动化使我们的参与度提高了250%。结果不言自明。",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces",
      name: "杨梅",
      role: "数字营销经理",
    },
  ],
};

/**
 * Mapping des avatars par nom (cohérence avec les données)
 */
export const avatarMapping: Record<string, string> = {
  "Sophie Martin": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces",
  "Thomas Dubois": "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces",
  "Julie Rousseau": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop&crop=faces",
  "Marc Lefebvre": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=faces",
  "Léa Bernard": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces",
  "Alexandre Petit": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
  "Claire Moreau": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=faces",
  "Pierre Durand": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces",
  "Émilie Laurent": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces",
};
