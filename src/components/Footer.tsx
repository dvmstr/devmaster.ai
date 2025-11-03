import { Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
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
              L'agence d'automatisation IA qui transforme votre business avec des solutions intelligentes et personnalisées.
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
            <h3 className="text-white font-normal mb-6 text-sm tracking-wider uppercase">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <a href="#benefits" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-[1px] bg-white transition-all duration-300" />
                  Bénéfices
                </a>
              </li>
              <li>
                <a href="#solutions" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-[1px] bg-white transition-all duration-300" />
                  Solutions
                </a>
              </li>
              <li>
                <a href="#results" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-[1px] bg-white transition-all duration-300" />
                  Résultats
                </a>
              </li>
              <li>
                <a href="#process" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-[1px] bg-white transition-all duration-300" />
                  Process
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-[1px] bg-white transition-all duration-300" />
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-normal mb-6 text-sm tracking-wider uppercase">Solutions</h3>
            <ul className="space-y-3">
              <li className="text-gray-400 text-sm flex items-center gap-2">
                <span className="w-2 h-[1px] bg-cyan-500" />
                Emails intelligents
              </li>
              <li className="text-gray-400 text-sm flex items-center gap-2">
                <span className="w-2 h-[1px] bg-cyan-500" />
                Leads & Prospection
              </li>
              <li className="text-gray-400 text-sm flex items-center gap-2">
                <span className="w-2 h-[1px] bg-cyan-500" />
                Chatbots IA
              </li>
              <li className="text-gray-400 text-sm flex items-center gap-2">
                <span className="w-2 h-[1px] bg-cyan-500" />
                CRM & Relances
              </li>
              <li className="text-gray-400 text-sm flex items-center gap-2">
                <span className="w-2 h-[1px] bg-cyan-500" />
                Réseaux sociaux
              </li>
              <li className="text-gray-400 text-sm flex items-center gap-2">
                <span className="w-2 h-[1px] bg-cyan-500" />
                Documents & Factures
              </li>
              <li className="text-gray-400 text-sm flex items-center gap-2">
                <span className="w-2 h-[1px] bg-cyan-500" />
                Reporting
              </li>
              <li className="text-gray-400 text-sm flex items-center gap-2">
                <span className="w-2 h-[1px] bg-cyan-500" />
                Recrutement
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-normal mb-6 text-sm tracking-wider uppercase">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:dvmstr.ai@gmail.com" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  dvmstr.ai@gmail.com
                </a>
              </li>
              <li>
                <a href="#cta-final" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  Demander un audit gratuit
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
            <p className="text-gray-500 text-sm">
              © 2025 Devmaster. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="/mentions-legales" className="text-gray-500 hover:text-white transition-colors">Mentions légales</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
