import type { Locale } from '@/contexts';

interface Testimonial {
  text: string;
  name: string;
  role: string;
  company: string;
}

/**
 * Données témoignages par défaut (fallback si Supabase indisponible)
 * Multilingue: EN, FR, ZH — mêmes clients, citations traduites.
 */
export const fallbackTestimonials: Record<Locale, Testimonial[]> = {
  en: [
    {
      text: "We used to spend our evenings chasing abandoned carts by hand. They connected everything to our Shopify and Klaviyo in two weeks, and the follow-ups now run on their own — we've recovered nearly 18% of revenue on that channel.",
      name: "Camille Fontaine",
      role: "E-commerce Manager",
      company: "Maison Lhéris",
    },
    {
      text: "My real problem was missing requests over the weekend. Their chatbot handles most of the routine questions and only escalates the serious ones to me. My average response time went from a few hours to a few minutes.",
      name: "Karim Benali",
      role: "Founder",
      company: "Velobi",
    },
    {
      text: "Entering supplier invoices used to take me two full days a month. Now they're read, filed and reconciled automatically in our accounting tool. I was skeptical at first, but it genuinely holds up.",
      name: "Élodie Mercier",
      role: "Office Manager",
      company: "Perrin & Associés",
    },
    {
      text: "What I appreciated is that they didn't show up with some over-engineered machine. They targeted three specific tasks that were eating our time, and that was it. My team finally has room for the rest.",
      name: "Thomas Rieu",
      role: "Co-founder",
      company: "Atelier Norré",
    },
    {
      text: "Before, one lead in three slipped through because we followed up on instinct. Now every prospect has its own sequence in HubSpot and nothing gets lost. We closed two accounts we'd honestly have forgotten about.",
      name: "Sarah Lévy",
      role: "Head of Sales",
      company: "Klariss",
    },
    {
      text: "We'd been promised the moon elsewhere and ended up disappointed. They started with a clear, costed audit, then delivered in stages. Three months in, the ROI is real — and the numbers aren't inflated.",
      name: "Antoine Mercadier",
      role: "Operations Director",
      company: "Groupe Tessandier",
    },
    {
      text: "Our reps were spending way too long qualifying leads that weren't a fit. An AI agent now does the first pass and only sends them warm prospects, with the context attached. They handle nearly three times more meetings that actually matter.",
      name: "Inès Khelifi",
      role: "Growth Lead",
      company: "Brevio",
    },
    {
      text: "On the technical side, I was worried we'd inherit a black box. It's the opposite — everything is documented, the n8n workflows are clean, and my developers were able to take over without any trouble.",
      name: "Julien Roux",
      role: "CTO",
      company: "Finovo",
    },
    {
      text: "We were sending the same newsletter to our entire list. They segmented it and automated the journeys based on how subscribers actually behave. Open rates jumped, and best of all we're selling while we sleep.",
      name: "Margaux Lefèvre",
      role: "Marketing Manager",
      company: "Côté Jardin",
    },
  ],
  fr: [
    {
      text: "On passait nos soirées à relancer les paniers abandonnés à la main. Ils ont tout connecté à notre Shopify et à Klaviyo en deux semaines, et les relances partent désormais toutes seules — on a récupéré près de 18 % de chiffre sur ce canal.",
      name: "Camille Fontaine",
      role: "Responsable e-commerce",
      company: "Maison Lhéris",
    },
    {
      text: "Mon vrai problème, c'était de rater des demandes le week-end. Leur chatbot gère la plupart des questions courantes et ne me transfère que les sujets sérieux. Mon temps de réponse moyen est passé de plusieurs heures à quelques minutes.",
      name: "Karim Benali",
      role: "Fondateur",
      company: "Velobi",
    },
    {
      text: "La saisie des factures fournisseurs me prenait deux jours pleins par mois. Aujourd'hui elles sont lues, classées et rapprochées automatiquement dans notre logiciel de compta. J'étais sceptique au départ, mais ça tient vraiment la route.",
      name: "Élodie Mercier",
      role: "Office manager",
      company: "Cabinet Perrin & Associés",
    },
    {
      text: "Ce que j'ai apprécié, c'est qu'ils ne sont pas arrivés avec une usine à gaz. Ils ont ciblé trois tâches précises qui nous mangeaient du temps, et c'est tout. Mon équipe a enfin de la marge pour le reste.",
      name: "Thomas Rieu",
      role: "Cofondateur",
      company: "Atelier Norré",
    },
    {
      text: "Avant, un lead sur trois passait à la trappe parce qu'on relançait au feeling. Maintenant chaque prospect a sa propre séquence dans HubSpot et plus rien ne se perd. On a signé deux comptes qu'on aurait honnêtement oubliés.",
      name: "Sarah Lévy",
      role: "Directrice commerciale",
      company: "Klariss",
    },
    {
      text: "On nous avait promis monts et merveilles ailleurs, et on avait été déçus. Eux ont commencé par un audit clair et chiffré, puis livré par étapes. Trois mois après, le ROI est là — et les chiffres ne sont pas gonflés.",
      name: "Antoine Mercadier",
      role: "Directeur des opérations",
      company: "Groupe Tessandier",
    },
    {
      text: "Nos commerciaux perdaient un temps fou à qualifier des leads hors cible. Un agent IA fait désormais le premier tri et ne leur envoie que les prospects chauds, avec le contexte. Ils traitent presque trois fois plus de rendez-vous utiles.",
      name: "Inès Khelifi",
      role: "Responsable growth",
      company: "Brevio",
    },
    {
      text: "Côté technique, j'avais peur d'hériter d'une boîte noire. C'est l'inverse — tout est documenté, les workflows n8n sont propres, et mes développeurs ont pu reprendre la main sans difficulté.",
      name: "Julien Roux",
      role: "Directeur technique",
      company: "Finovo",
    },
    {
      text: "On envoyait la même newsletter à toute notre base. Ils l'ont segmentée et ont automatisé les scénarios selon le comportement réel des abonnés. Le taux d'ouverture a bondi, et surtout on vend même la nuit.",
      name: "Margaux Lefèvre",
      role: "Responsable marketing",
      company: "Côté Jardin",
    },
  ],
  zh: [
    {
      text: "以前我们晚上还在手动跟进弃购订单。他们两周内就把一切接入了我们的 Shopify 和 Klaviyo，现在跟进邮件全自动发送——这个渠道的营收找回了将近 18%。",
      name: "Camille Fontaine",
      role: "电商负责人",
      company: "黎黛美妆",
    },
    {
      text: "我真正的痛点是周末错过咨询。他们的聊天机器人能处理大部分常见问题，只把真正重要的转给我。我的平均响应时间从几个小时缩短到了几分钟。",
      name: "Karim Benali",
      role: "创始人",
      company: "Velobi",
    },
    {
      text: "录入供应商发票以前每月要花我整整两天。现在它们会被自动识别、归档并在记账软件里对账。说实话我一开始挺怀疑，但它确实靠得住。",
      name: "Élodie Mercier",
      role: "行政经理",
      company: "佩兰会计事务所",
    },
    {
      text: "我欣赏的是他们没有搞一套华而不实的系统，而是精准地自动化了三项最耗时的任务，仅此而已。我的团队终于腾出了精力去做别的。",
      name: "Thomas Rieu",
      role: "联合创始人",
      company: "诺尔工坊",
    },
    {
      text: "以前每三个潜在客户就有一个因为我们凭感觉跟进而流失。现在每个客户在 HubSpot 里都有专属的跟进序列，什么都不会漏。我们签下了两个本来肯定会被忘掉的客户。",
      name: "Sarah Lévy",
      role: "销售总监",
      company: "Klariss",
    },
    {
      text: "我们在别处被许诺过天花乱坠的效果，结果很失望。他们先做了一份清晰、量化的审计，再分阶段交付。三个月后，投资回报实实在在——数字没有注水。",
      name: "Antoine Mercadier",
      role: "运营总监",
      company: "泰桑迪耶集团",
    },
    {
      text: "我们的销售在筛选不对口的潜在客户上花了太多时间。现在一个 AI 智能体先做初筛，只把附带背景信息的高意向客户发给他们。有效会谈量几乎翻了三倍。",
      name: "Inès Khelifi",
      role: "增长负责人",
      company: "Brevio",
    },
    {
      text: "在技术层面，我担心会接手一个黑盒。结果恰恰相反——一切都有文档，n8n 工作流很整洁，我的开发同事毫无障碍地就接手了。",
      name: "Julien Roux",
      role: "技术总监",
      company: "Finovo",
    },
    {
      text: "我们以前给所有人发同一封邮件。他们把名单做了细分，并根据订阅者的真实行为自动化了营销流程。打开率明显提升，最重要的是我们连夜里都在成交。",
      name: "Margaux Lefèvre",
      role: "市场负责人",
      company: "花园侧",
    },
  ],
};
