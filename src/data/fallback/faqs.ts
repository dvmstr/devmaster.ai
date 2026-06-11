import type { Locale } from '@/contexts';

interface FAQ {
  question: string;
  answer: string;
}

/**
 * Données FAQs par défaut (fallback si Supabase indisponible)
 * Multilingue: EN, FR, ZH
 */
export const fallbackFAQs: Record<Locale, FAQ[]> = {
  en: [
    {
      question: "How long before seeing the first results?",
      answer: "Your personalized audit is delivered within 48 hours. The first automations are deployed immediately after plan validation. You'll see measurable impact within the first week with a minimum time savings of 20 hours on repetitive tasks."
    },
    {
      question: "What automations do you offer specifically?",
      answer: "We automate your emails and customer responses, lead generation and qualification, 24/7 support chatbots, CRM synchronization, social media posting, document and invoice processing, real-time reporting, and even your recruitment process. All our solutions adapt to your current tools."
    },
    {
      question: "How do you guarantee the security of our data?",
      answer: "We only use secure OAuth connections, never storing your passwords. All API keys are encrypted in certified vaults. Your data stays on your systems, we don't keep any copies. GDPR compliance guaranteed."
    },
    {
      question: "Do you work with our industry?",
      answer: "Our solutions adapt to all sectors: e-commerce, B2B services, marketing agencies, SaaS, consulting firms, industry, healthcare, etc. Each automation is customized according to your business and specific processes. We analyze your unique needs during the audit."
    },
    {
      question: "What is your pricing model?",
      answer: "The 48-hour audit comes with no commitment. Then, we offer a monthly package adapted to your automation volume, with no hidden fees. You can cancel at any time. 100% satisfaction guaranteed or money back for the first month."
    },
    {
      question: "What support do you provide after implementation?",
      answer: "Dedicated support via email, chat and video. Guaranteed response time within 4 hours on business days. Complete training for your teams included. Continuous optimization and regular adjustments to evolve your automations with your growth."
    },
    {
      question: "What happens if we want to end the collaboration?",
      answer: "Total reversibility guaranteed. You recover all your workflows, configurations, documentation and access. No minimum commitment period. Your automations continue to work, you keep absolute control of your infrastructure."
    },
    {
      question: "Do you need to access our internal systems?",
      answer: "We only request the minimum permissions necessary via OAuth (like Google or Microsoft). You keep total control and can revoke all access instantly from your tools. We don't install any software on your servers."
    }
  ],
  fr: [
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
      answer: "Nos solutions s'adaptent à tous les secteurs : e-commerce, services B2B, agences marketing, SaaS, cabinets de conseil, industrie, santé, etc. Chaque automatisation est personnalisée selon votre métier et vos processus spécifiques. Nous analysons vos besoins uniques lors de l'audit."
    },
    {
      question: "Quel est votre modèle de tarification ?",
      answer: "L'audit de 48h est sans engagement. Ensuite, nous proposons un forfait mensuel adapté à votre volume d'automatisations, sans frais cachés. Vous pouvez annuler à tout moment. Garantie satisfait ou remboursé à 100% le premier mois."
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
  ],
  zh: [
    {
      question: "多久能看到第一批成果？",
      answer: "您的个性化审计将在48小时内交付。首批自动化将在计划验证后立即部署。您将在第一周内看到可衡量的影响，在重复性任务上至少节省20小时。"
    },
    {
      question: "你们具体提供哪些自动化服务？",
      answer: "我们自动化您的邮件和客户响应、潜在客户生成和资格认定、24/7支持聊天机器人、CRM同步、社交媒体发布、文档和发票处理、实时报告，甚至您的招聘流程。我们所有的解决方案都适应您当前的工具。"
    },
    {
      question: "如何保证我们数据的安全？",
      answer: "我们仅使用安全的OAuth连接，从不存储您的密码。所有API密钥都在认证的保险库中加密。您的数据保留在您的系统中，我们不保留任何副本。保证符合GDPR。"
    },
    {
      question: "你们服务我们的行业吗？",
      answer: "我们的解决方案适用于所有行业：电子商务、B2B服务、营销机构、SaaS、咨询公司、工业、医疗保健等。每个自动化都根据您的业务和特定流程进行定制。我们在审计期间分析您的独特需求。"
    },
    {
      question: "你们的定价模式是什么？",
      answer: "48小时审计无需承诺。然后，我们提供适应您自动化量的月度套餐，无隐藏费用。您可以随时取消。第一个月100%满意保证或退款。"
    },
    {
      question: "实施后你们提供什么支持？",
      answer: "通过邮件、聊天和视频提供专属支持。工作日4小时内保证响应时间。包含对您团队的完整培训。持续优化和定期调整，使您的自动化随着您的增长而发展。"
    },
    {
      question: "如果我们想结束合作会怎样？",
      answer: "保证完全可逆性。您可以恢复所有工作流程、配置、文档和访问权限。没有最低承诺期。您的自动化继续工作，您保持对基础设施的绝对控制。"
    },
    {
      question: "你们需要访问我们的内部系统吗？",
      answer: "我们只通过OAuth（如Google或Microsoft）请求必要的最低权限。您保持完全控制，可以随时从您的工具中撤销所有访问权限。我们不在您的服务器上安装任何软件。"
    }
  ]
};
