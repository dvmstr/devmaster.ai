import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Globe } from 'lucide-react';
import { 
  useLocale, 
  SUPPORTED_LOCALES, 
  LOCALE_CONFIG, 
  type Locale 
} from '@/contexts';

interface LanguageSwitcherProps {
  variant?: 'dropdown' | 'inline' | 'minimal';
  showFlags?: boolean;
  showNativeNames?: boolean;
  className?: string;
}

/**
 * Language switcher component with multiple display variants
 * Supports dropdown, inline, and minimal display modes
 */
export const LanguageSwitcher = ({
  variant = 'dropdown',
  showFlags = true,
  showNativeNames = true,
  className = '',
}: LanguageSwitcherProps) => {
  const { locale, setLocale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentConfig = LOCALE_CONFIG[locale];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  // Inline variant - shows all languages as buttons
  if (variant === 'inline') {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        {SUPPORTED_LOCALES.map((loc) => {
          const config = LOCALE_CONFIG[loc];
          const isActive = loc === locale;
          
          return (
            <button
              key={loc}
              onClick={() => handleLocaleChange(loc)}
              className={`
                px-2 py-1 rounded-md text-sm font-medium transition-all duration-200
                ${isActive 
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' 
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
                }
              `}
              aria-label={locale === 'fr' ? `Passer en ${config.name}` : locale === 'zh' ? `切换到${config.name}` : `Switch to ${config.name}`}
              aria-current={isActive ? 'true' : undefined}
            >
              {showFlags && <span className="mr-1">{config.flag}</span>}
              <span>{loc.toUpperCase()}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Minimal variant - just shows current language code
  if (variant === 'minimal') {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 px-2 py-1 rounded-md text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <Globe size={14} />
          <span>{locale.toUpperCase()}</span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-1 py-1 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg shadow-xl z-50 min-w-[100px]"
              role="listbox"
            >
              {SUPPORTED_LOCALES.map((loc) => {
                const config = LOCALE_CONFIG[loc];
                const isActive = loc === locale;
                
                return (
                  <button
                    key={loc}
                    onClick={() => handleLocaleChange(loc)}
                    className={`
                      w-full px-3 py-1.5 text-left text-sm transition-colors
                      ${isActive 
                        ? 'text-cyan-400 bg-cyan-500/10' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }
                    `}
                    role="option"
                    aria-selected={isActive}
                  >
                    {showFlags && <span className="mr-2">{config.flag}</span>}
                    {loc.toUpperCase()}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Default dropdown variant
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={locale === 'fr' ? 'Sélectionner la langue' : locale === 'zh' ? '选择语言' : 'Select language'}
      >
        {showFlags && <span className="text-lg">{currentConfig.flag}</span>}
        <span className="text-sm text-gray-300">
          {showNativeNames ? currentConfig.nativeName : currentConfig.name}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} className="text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 py-2 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50 min-w-[180px]"
            role="listbox"
          >
            {SUPPORTED_LOCALES.map((loc) => {
              const config = LOCALE_CONFIG[loc];
              const isActive = loc === locale;
              
              return (
                <button
                  key={loc}
                  onClick={() => handleLocaleChange(loc)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all duration-200
                    ${isActive 
                      ? 'text-cyan-400 bg-cyan-500/10' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }
                  `}
                  role="option"
                  aria-selected={isActive}
                >
                  {showFlags && <span className="text-lg">{config.flag}</span>}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {showNativeNames ? config.nativeName : config.name}
                    </span>
                    {showNativeNames && (
                      <span className="text-xs text-gray-400">{config.name}</span>
                    )}
                  </div>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto w-2 h-2 rounded-full bg-cyan-400"
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

