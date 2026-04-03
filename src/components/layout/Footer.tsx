import { Linkedin, Twitter } from "lucide-react";
import { useMemo } from "react";
import { LanguageSwitcher } from "@/components/common";
import { useCurrentLocale, useLocale } from "@/contexts";
import { useSectionContent } from "@/hooks";

// Fallback content for the footer
const footerFallback = {
  en: {
    tagline: "The AI automation agency that transforms your business with intelligent, personalized solutions.",
    navigation: "Navigation",
    navLinks: [
      { label: "Benefits", href: "#benefits" },
      { label: "Solutions", href: "#solutions" },
      { label: "Results", href: "#results" },
      { label: "Process", href: "#process" },
      { label: "FAQ", href: "#faq" },
    ],
    solutions: "Solutions",
    solutionsList: ["Smart Emails", "Leads & Prospecting", "AI Chatbots", "CRM & Follow-ups", "Social Media", "Documents & Invoices", "Reporting", "Recruitment"],
    contact: "Contact",
    requestAudit: "Request a free audit",
    copyright: "© 2025 Devmaster. All rights reserved.",
    legal: "Legal Notice",
  },
  fr: {
    tagline: "L'agence d'automatisation IA qui transforme votre business avec des solutions intelligentes et personnalisées.",
    navigation: "Navigation",
    navLinks: [
      { label: "Bénéfices", href: "#benefits" },
      { label: "Solutions", href: "#solutions" },
      { label: "Résultats", href: "#results" },
      { label: "Process", href: "#process" },
      { label: "FAQ", href: "#faq" },
    ],
    solutions: "Solutions",
    solutionsList: ["Emails intelligents", "Leads & Prospection", "Chatbots IA", "CRM & Relances", "Réseaux sociaux", "Documents & Factures", "Reporting", "Recrutement"],
    contact: "Contact",
    requestAudit: "Demander un audit gratuit",
    copyright: "© 2025 Devmaster. Tous droits réservés.",
    legal: "Mentions légales",
  },
  zh: {
    tagline: "人工智能自动化机构，通过智能、个性化的解决方案转型您的业务。",
    navigation: "导航",
    navLinks: [
      { label: "优势", href: "#benefits" },
      { label: "解决方案", href: "#solutions" },
      { label: "成果", href: "#results" },
      { label: "流程", href: "#process" },
      { label: "常见问题", href: "#faq" },
    ],
    solutions: "解决方案",
    solutionsList: ["智能邮件", "潜在客户与勘探", "AI聊天机器人", "CRM与跟进", "社交媒体", "文档与发票", "报告", "招聘"],
    contact: "联系我们",
    requestAudit: "申请免费审计",
    copyright: "© 2025 Devmaster. 版权所有。",
    legal: "法律声明",
  },
};

interface FooterContent {
  tagline: string;
  navigation: string;
  navLinks: { label: string; href: string }[];
  solutions: string;
  solutionsList: string[];
  contact: string;
  requestAudit: string;
  copyright: string;
  legal: string;
}

export const Footer = () => {
  const locale = useCurrentLocale();
  const { getLocalizedPath } = useLocale();
  const fallback = useMemo(() => footerFallback[locale] || footerFallback.en, [locale]);
  const { content } = useSectionContent<FooterContent>('footer', fallback);

  return (
    <footer className="relative mt-32">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <div className="text-3xl font-medium text-white">
              Devmaster
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              {content.tagline}
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/50 transition-all duration-300"
              >
                <Linkedin size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                <div className="absolute inset-0 rounded-lg bg-white/20 opacity-0 group-hover:opacity-100 blur transition-opacity" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/50 transition-all duration-300"
              >
                <Twitter size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                <div className="absolute inset-0 rounded-lg bg-white/20 opacity-0 group-hover:opacity-100 blur transition-opacity" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-normal mb-6 text-sm tracking-wider uppercase">{content.navigation}</h3>
            <ul className="space-y-3">
              {content.navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-[1px] bg-white transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-normal mb-6 text-sm tracking-wider uppercase">{content.solutions}</h3>
            <ul className="space-y-3">
              {content.solutionsList.map((solution) => (
                <li key={solution} className="text-gray-400 text-sm flex items-center gap-2">
                  <span className="w-2 h-[1px] bg-cyan-500" />
                  {solution}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-normal mb-6 text-sm tracking-wider uppercase">{content.contact}</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:dvmstr.ai@gmail.com" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  dvmstr.ai@gmail.com
                </a>
              </li>
              <li>
                <a href="#cta-final" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  {content.requestAudit}
                </a>
              </li>
            </ul>
            
            {/* Language Switcher in Footer */}
            <div className="mt-6">
              <LanguageSwitcher variant="inline" showFlags={true} />
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
            <p className="text-gray-400 text-sm">
              {content.copyright}
            </p>
            <div className="flex gap-6 text-sm">
              <a href={getLocalizedPath('/legal')} className="text-gray-400 hover:text-white transition-colors">
                {content.legal}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
