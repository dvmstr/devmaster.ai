import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { cache, CacheTTL } from '@/lib/cache';
import type { Database } from '@/types/database';
import type { Locale } from '@/contexts';

type Tables = Database['public']['Tables'];

/**
 * Hook pour récupérer les métadonnées de page (SEO) avec support i18n
 */
export function usePageMeta(slug: string = 'home', locale: Locale = 'en') {
  const [meta, setMeta] = useState<Tables['pages']['Row'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    const cacheKey = `page_meta_${slug}_${locale}`;

    async function fetchMeta() {
      try {
        setLoading(true);

        // Check cache
        const cachedMeta = cache.get<Tables['pages']['Row']>(cacheKey);
        if (cachedMeta) {
          if (!cancelled) {
            setMeta(cachedMeta);
            setLoading(false);
          }
          return;
        }

        const { data, error: fetchError } = await supabase
          .from('pages')
          .select('*')
          .eq('slug', slug)
          .eq('locale', locale)
          .eq('is_published', true)
          .single();

        if (fetchError) throw fetchError;
        if (cancelled) return;

        cache.set(cacheKey, data, CacheTTL.PAGE_META);
        setMeta(data);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err : new Error('Unknown error'));
        console.error(`Error fetching page meta for ${slug} (${locale}):`, err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchMeta();
    return () => { cancelled = true; };
  }, [slug, locale]);

  return { meta, loading, error };
}
