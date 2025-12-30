import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePageMeta } from '@/hooks';
import { 
  SUPPORTED_LOCALES, 
  LOCALE_CONFIG, 
  DEFAULT_LOCALE,
  type Locale 
} from '@/contexts';

interface SEOHeadProps {
  pageSlug?: string;
  locale?: Locale;
}

const BASE_URL = 'https://devmaster.ai';

/**
 * Get the canonical URL for a given locale and path
 */
function getCanonicalUrl(pathname: string, locale: Locale): string {
  // Remove any existing locale prefix
  const cleanPath = pathname.replace(/^\/(fr|zh|en)/, '') || '/';
  
  if (locale === DEFAULT_LOCALE) {
    return `${BASE_URL}${cleanPath}`;
  }
  
  return `${BASE_URL}/${locale}${cleanPath === '/' ? '' : cleanPath}`;
}

/**
 * SEO component with full i18n support including hreflang tags
 * Optimized for search engine indexing across multiple languages
 */
export const SEOHead = ({ pageSlug = 'home', locale = 'en' }: SEOHeadProps) => {
  const location = useLocation();
  const { meta, loading, error } = usePageMeta(pageSlug, locale);
  const localeConfig = LOCALE_CONFIG[locale];

  useEffect(() => {
    if (loading || error || !meta) return;

    // Update page title
    document.title = meta.title;

    // Helper function to update or create meta tags
    const setMetaTag = (name: string, content: string | null, property?: boolean) => {
      if (!content) return;

      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    // Helper to manage link elements
    const setLinkTag = (rel: string, href: string, attributes?: Record<string, string>) => {
      const selector = attributes 
        ? `link[rel="${rel}"][hreflang="${attributes.hreflang}"]`
        : `link[rel="${rel}"]:not([hreflang])`;
      
      let element = document.querySelector(selector) as HTMLLinkElement;

      if (!element) {
        element = document.createElement('link');
        element.rel = rel;
        if (attributes) {
          Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
          });
        }
        document.head.appendChild(element);
      }

      element.href = href;
    };

    // Update HTML lang attribute
    document.documentElement.lang = localeConfig.htmlLang;

    // Meta description
    setMetaTag('description', meta.meta_description);

    // Keywords
    if (meta.meta_keywords && meta.meta_keywords.length > 0) {
      setMetaTag('keywords', meta.meta_keywords.join(', '));
    }

    // Canonical URL for current locale
    const canonicalUrl = meta.canonical_url || getCanonicalUrl(location.pathname, locale);
    setLinkTag('canonical', canonicalUrl);

    // Open Graph tags with locale
    setMetaTag('og:title', meta.og_title, true);
    setMetaTag('og:description', meta.og_description, true);
    setMetaTag('og:image', meta.og_image, true);
    setMetaTag('og:url', canonicalUrl, true);
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:site_name', 'DevMaster', true);
    setMetaTag('og:locale', localeConfig.htmlLang.replace('-', '_'), true);

    // Add alternate og:locale for other languages
    SUPPORTED_LOCALES.filter(l => l !== locale).forEach(altLocale => {
      const altConfig = LOCALE_CONFIG[altLocale];
      setMetaTag(`og:locale:alternate`, altConfig.htmlLang.replace('-', '_'), true);
    });

    // Twitter Card tags
    setMetaTag('twitter:card', meta.twitter_card || 'summary_large_image');
    setMetaTag('twitter:title', meta.og_title);
    setMetaTag('twitter:description', meta.og_description);
    setMetaTag('twitter:image', meta.og_image);

    // Hreflang tags for language alternates (critical for SEO)
    SUPPORTED_LOCALES.forEach(hrefLocale => {
      const hrefConfig = LOCALE_CONFIG[hrefLocale];
      const hrefUrl = getCanonicalUrl(location.pathname, hrefLocale);
      setLinkTag('alternate', hrefUrl, { hreflang: hrefConfig.hreflang });
    });

    // x-default hreflang (points to default language)
    const defaultUrl = getCanonicalUrl(location.pathname, DEFAULT_LOCALE);
    setLinkTag('alternate', defaultUrl, { hreflang: 'x-default' });

    // Structured Data (JSON-LD)
    if (meta.structured_data) {
      // Remove existing JSON-LD scripts
      const existingScripts = document.querySelectorAll('script[type="application/ld+json"][data-seo-head]');
      existingScripts.forEach(script => script.remove());

      const scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      scriptTag.setAttribute('data-seo-head', 'true');
      scriptTag.textContent = JSON.stringify(meta.structured_data);
      document.head.appendChild(scriptTag);
    }

    // Robots meta tag
    setMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('googlebot', 'index, follow');

    // Additional SEO tags
    setMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=5.0');
    setMetaTag('theme-color', '#000000');
    setMetaTag('color-scheme', 'dark');

    // Content language header equivalent
    setMetaTag('content-language', localeConfig.htmlLang);

    // Cleanup function to remove hreflang tags when component unmounts
    return () => {
      const hreflangLinks = document.querySelectorAll('link[rel="alternate"][hreflang]');
      hreflangLinks.forEach(link => link.remove());
    };
  }, [meta, loading, error, locale, localeConfig, location.pathname]);

  // This component only updates the <head>, renders nothing
  return null;
};
