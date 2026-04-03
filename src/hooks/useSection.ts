import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { cache, CacheTTL } from '@/lib/cache';
import type { Database } from '@/types/database';
import { useCurrentLocale, type Locale } from '@/contexts';

type Tables = Database['public']['Tables'];

/**
 * Hook pour récupérer une section spécifique par sa clé avec support i18n
 */
export function useSection(sectionKey: string, pageSlug: string = 'home') {
  const locale = useCurrentLocale();
  const [section, setSection] = useState<Tables['sections']['Row'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    const cacheKey = `section_${pageSlug}_${sectionKey}_${locale}`;

    async function fetchSection() {
      try {
        setLoading(true);

        // Check cache
        const cachedSection = cache.get<Tables['sections']['Row']>(cacheKey);
        if (cachedSection) {
          if (!cancelled) {
            setSection(cachedSection);
            setLoading(false);
          }
          return;
        }

        // Get page first
        const { data: page } = await supabase
          .from('pages')
          .select('id')
          .eq('slug', pageSlug)
          .eq('locale', locale)
          .eq('is_published', true)
          .single();

        if (!page) {
          throw new Error(`Page ${pageSlug} not found for locale ${locale}`);
        }

        // Get section
        const { data: sectionData, error: sectionError } = await supabase
          .from('sections')
          .select('*')
          .eq('page_id', page.id)
          .eq('section_key', sectionKey)
          .eq('locale', locale)
          .eq('is_visible', true)
          .single();

        if (sectionError) throw sectionError;
        if (cancelled) return;

        cache.set(cacheKey, sectionData, CacheTTL.SECTIONS);
        setSection(sectionData);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err : new Error('Unknown error'));
        console.error(`Error fetching section ${sectionKey}:`, err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchSection();
    return () => { cancelled = true; };
  }, [sectionKey, pageSlug, locale]);

  return { section, loading, error };
}

/**
 * Hook to get section with explicit locale (for SSR or specific needs)
 */
export function useSectionWithLocale(sectionKey: string, locale: Locale, pageSlug: string = 'home') {
  const [section, setSection] = useState<Tables['sections']['Row'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    const cacheKey = `section_${pageSlug}_${sectionKey}_${locale}`;

    async function fetchSection() {
      try {
        setLoading(true);

        const cachedSection = cache.get<Tables['sections']['Row']>(cacheKey);
        if (cachedSection) {
          if (!cancelled) {
            setSection(cachedSection);
            setLoading(false);
          }
          return;
        }

        const { data: page } = await supabase
          .from('pages')
          .select('id')
          .eq('slug', pageSlug)
          .eq('locale', locale)
          .eq('is_published', true)
          .single();

        if (!page) {
          throw new Error(`Page ${pageSlug} not found for locale ${locale}`);
        }

        const { data: sectionData, error: sectionError } = await supabase
          .from('sections')
          .select('*')
          .eq('page_id', page.id)
          .eq('section_key', sectionKey)
          .eq('locale', locale)
          .eq('is_visible', true)
          .single();

        if (sectionError) throw sectionError;
        if (cancelled) return;

        cache.set(cacheKey, sectionData, CacheTTL.SECTIONS);
        setSection(sectionData);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchSection();
    return () => { cancelled = true; };
  }, [sectionKey, pageSlug, locale]);

  return { section, loading, error };
}
