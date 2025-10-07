import { Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative mt-32">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <div className="text-3xl font-medium text-white">
              DevMaster
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              L'agence d'automatisation IA qui transforme votre business avec des solutions intelligentes et personnalisées.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="group relative p-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/50 transition-all duration-300"
              >
                <Linkedin size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                <div className="absolute inset-0 rounded-lg bg-white/20 opacity-0 group-hover:opacity-100 blur transition-opacity" />
              </a>
              <a
                href="#"
                className="group relative p-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/50 transition-all duration-300"
              >
                <Twitter size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                <div className="absolute inset-0 rounded-lg bg-white/20 opacity-0 group-hover:opacity-100 blur transition-opacity" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-normal mb-6 text-sm tracking-wider uppercase">Solutions</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-[1px] bg-white transition-all duration-300" />
                  Emails intelligents
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-[1px] bg-white transition-all duration-300" />
                  Leads & Prospection
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-[1px] bg-white transition-all duration-300" />
                  Chatbots IA
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-[1px] bg-white transition-all duration-300" />
                  Orchestration
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-normal mb-6 text-sm tracking-wider uppercase">Entreprise</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-[1px] bg-white transition-all duration-300" />
                  À propos
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-[1px] bg-white transition-all duration-300" />
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-[1px] bg-white transition-all duration-300" />
                  Carrières
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-[1px] bg-white transition-all duration-300" />
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-normal mb-6 text-sm tracking-wider uppercase">Contact</h3>
            <ul className="space-y-3">
              <li className="text-gray-400 text-sm">
                contact@devmaster.com
              </li>
              <li className="text-gray-400 text-sm">+33 1 23 45 67 89</li>
            </ul>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
            <p className="text-gray-500 text-sm">
              © 2025 DevMaster. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-white transition-colors">Mentions légales</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">Confidentialité</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">CGV</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
