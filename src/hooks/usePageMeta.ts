import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { cache, CacheTTL } from '@/lib/cache';
import type { Database } from '@/types/database';

type Tables = Database['public']['Tables'];

/**
 * Hook pour récupérer les métadonnées de page (SEO)
 */
export function usePageMeta(slug: string = 'home') {
  const [meta, setMeta] = useState<Tables['pages']['Row'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const cacheKey = `page_meta_${slug}`;

  useEffect(() => {
    async function fetchMeta() {
      try {
        setLoading(true);

        // Vérifier le cache
        const cachedMeta = cache.get<Tables['pages']['Row']>(cacheKey);
        if (cachedMeta) {
          setMeta(cachedMeta);
          setLoading(false);
          return;
        }

        const { data, error: fetchError } = await supabase
          .from('pages')
          .select('*')
          .eq('slug', slug)
          .eq('is_published', true)
          .single();

        if (fetchError) throw fetchError;

        cache.set(cacheKey, data, CacheTTL.PAGE_META);
        setMeta(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        console.error(`Error fetching page meta for ${slug}:`, err);
      } finally {
        setLoading(false);
      }
    }

    fetchMeta();
  }, [slug, cacheKey]);

  return { meta, loading, error };
}
