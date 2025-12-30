import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

/**
 * Supported locales for the application
 */
export const SUPPORTED_LOCALES = ['en', 'fr', 'zh'] as const;
export type Locale = typeof SUPPORTED_LOCALES[number];

export const DEFAULT_LOCALE: Locale = 'en';

/**
 * Locale metadata for SEO and display
 */
export const LOCALE_CONFIG: Record<Locale, {
  name: string;
  nativeName: string;
  htmlLang: string;
  hreflang: string;
  flag: string;
  direction: 'ltr' | 'rtl';
}> = {
  en: {
    name: 'English',
    nativeName: 'English',
    htmlLang: 'en',
    hreflang: 'en',
    flag: '🇺🇸',
    direction: 'ltr',
  },
  fr: {
    name: 'French',
    nativeName: 'Français',
    htmlLang: 'fr',
    hreflang: 'fr',
    flag: '🇫🇷',
    direction: 'ltr',
  },
  zh: {
    name: 'Chinese',
    nativeName: '中文',
    htmlLang: 'zh-CN',
    hreflang: 'zh-CN',
    flag: '🇨🇳',
    direction: 'ltr',
  },
};

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  getLocalizedPath: (path: string, targetLocale?: Locale) => string;
  isDefaultLocale: boolean;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

/**
 * Check if a string is a valid locale
 */
export function isValidLocale(value: string | undefined): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}

/**
 * Get locale from URL path
 */
function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (isValidLocale(firstSegment)) {
    return firstSegment;
  }
  
  return DEFAULT_LOCALE;
}

/**
 * Get the base path without locale prefix
 */
function getPathWithoutLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (isValidLocale(firstSegment)) {
    return '/' + segments.slice(1).join('/');
  }
  
  return pathname;
}

interface LocaleProviderProps {
  children: ReactNode;
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ locale?: string }>();
  
  // Determine current locale from URL
  const urlLocale = params.locale;
  const currentLocale: Locale = isValidLocale(urlLocale) ? urlLocale : DEFAULT_LOCALE;
  
  const [locale, setLocaleState] = useState<Locale>(currentLocale);

  // Sync locale with URL changes
  useEffect(() => {
    const pathLocale = getLocaleFromPath(location.pathname);
    if (pathLocale !== locale) {
      setLocaleState(pathLocale);
    }
  }, [location.pathname]);

  // Update HTML lang attribute
  useEffect(() => {
    const config = LOCALE_CONFIG[locale];
    document.documentElement.lang = config.htmlLang;
    document.documentElement.dir = config.direction;
    
    // Store preference
    localStorage.setItem('preferred-locale', locale);
  }, [locale]);

  /**
   * Change locale and navigate to the new URL
   */
  const setLocale = useCallback((newLocale: Locale) => {
    if (newLocale === locale) return;
    
    const basePath = getPathWithoutLocale(location.pathname);
    const newPath = getLocalizedPath(basePath, newLocale);
    
    setLocaleState(newLocale);
    navigate(newPath);
  }, [locale, location.pathname, navigate]);

  /**
   * Get a localized path for navigation
   */
  const getLocalizedPath = useCallback((path: string, targetLocale: Locale = locale): string => {
    // Remove any existing locale prefix
    const cleanPath = getPathWithoutLocale(path);
    
    // Default locale doesn't need prefix
    if (targetLocale === DEFAULT_LOCALE) {
      return cleanPath || '/';
    }
    
    // Add locale prefix
    return `/${targetLocale}${cleanPath === '/' ? '' : cleanPath}`;
  }, [locale]);

  /**
   * Simple translation function - returns key for now
   * In production, this would fetch from a translation store
   */
  const t = useCallback((key: string): string => {
    // For now, just return the key
    // Content is fetched from Supabase with locale filter
    return key;
  }, []);

  const value: LocaleContextType = {
    locale,
    setLocale,
    t,
    getLocalizedPath,
    isDefaultLocale: locale === DEFAULT_LOCALE,
  };

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

/**
 * Hook to access locale context
 */
export function useLocale(): LocaleContextType {
  const context = useContext(LocaleContext);
  
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  
  return context;
}

/**
 * Hook to get just the current locale (for data fetching)
 */
export function useCurrentLocale(): Locale {
  const { locale } = useLocale();
  return locale;
}

