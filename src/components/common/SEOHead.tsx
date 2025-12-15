import { useEffect } from 'react';
import { usePageMeta } from '@/hooks';

interface SEOHeadProps {
  pageSlug?: string;
}

/**
 * Composant SEO dynamique qui charge les meta tags depuis Supabase
 * Optimisé pour le référencement et le partage social
 */
export const SEOHead = ({ pageSlug = 'home' }: SEOHeadProps) => {
  const { meta, loading, error } = usePageMeta(pageSlug);

  useEffect(() => {
    if (loading || error || !meta) return;

    // Mettre à jour le titre
    document.title = meta.title;

    // Fonction helper pour mettre à jour ou créer une meta tag
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

    // Meta description
    setMetaTag('description', meta.meta_description);

    // Keywords
    if (meta.meta_keywords && meta.meta_keywords.length > 0) {
      setMetaTag('keywords', meta.meta_keywords.join(', '));
    }

    // Canonical URL
    if (meta.canonical_url) {
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = meta.canonical_url;
    }

    // Open Graph tags
    setMetaTag('og:title', meta.og_title, true);
    setMetaTag('og:description', meta.og_description, true);
    setMetaTag('og:image', meta.og_image, true);
    setMetaTag('og:url', meta.canonical_url, true);
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:site_name', 'DevMaster', true);

    // Twitter Card tags
    setMetaTag('twitter:card', meta.twitter_card || 'summary_large_image');
    setMetaTag('twitter:title', meta.og_title);
    setMetaTag('twitter:description', meta.og_description);
    setMetaTag('twitter:image', meta.og_image);

    // Structured Data (JSON-LD)
    if (meta.structured_data) {
      let scriptTag = document.querySelector('script[type="application/ld+json"]');
      
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      
      scriptTag.textContent = JSON.stringify(meta.structured_data);
    }

    // Robots meta tag pour indexation
    setMetaTag('robots', 'index, follow');
    setMetaTag('googlebot', 'index, follow');

    // Additional SEO tags
    setMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=5.0');
    setMetaTag('theme-color', '#000000');
    setMetaTag('color-scheme', 'dark');

  }, [meta, loading, error]);

  // Ne rien rendre - ce composant met à jour le <head>
  return null;
};
