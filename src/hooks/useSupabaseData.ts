import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { cache, CacheTTL } from '@/lib/cache';
import type { Database } from '@/lib/database.types';

type Tables = Database['public']['Tables'];

/**
 * Hook générique pour récupérer les données Supabase avec cache
 */
export function useSupabaseData<T extends keyof Tables>(
  table: T,
  options?: {
    select?: string;
    filter?: Record<string, any>;
    orderBy?: { column: string; ascending?: boolean };
    limit?: number;
    cacheKey?: string;
    cacheTTL?: number;
    enabled?: boolean;
  }
) {
  type RowType = Tables[T]['Row'];
  
  const [data, setData] = useState<RowType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const cacheKey = options?.cacheKey || `${table}_${JSON.stringify(options)}`;
  const cacheTTL = options?.cacheTTL ?? CacheTTL.STATIC_CONTENT;
  const enabled = options?.enabled ?? true;

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        setLoading(true);

        // Vérifier le cache d'abord
        const cachedData = cache.get<RowType[]>(cacheKey);
        if (cachedData) {
          setData(cachedData);
          setLoading(false);
          return;
        }

        // Construire la requête
        let query = supabase
          .from(table)
          .select(options?.select || '*');

        // Appliquer les filtres
        if (options?.filter) {
          Object.entries(options.filter).forEach(([key, value]) => {
            query = query.eq(key, value);
          });
        }

        // Appliquer le tri
        if (options?.orderBy) {
          query = query.order(options.orderBy.column, {
            ascending: options.orderBy.ascending ?? true,
          });
        }

        // Appliquer la limite
        if (options?.limit) {
          query = query.limit(options.limit);
        }

        const { data: fetchedData, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        // Stocker dans le cache
        cache.set(cacheKey, fetchedData, cacheTTL);
        
        setData(fetchedData as RowType[]);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        console.error(`Error fetching ${table}:`, err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [table, cacheKey, cacheTTL, enabled]);

  const refetch = async () => {
    cache.invalidate(cacheKey);
    setLoading(true);
    // Trigger useEffect to re-run
    setData(null);
  };

  return { data, loading, error, refetch };
}

/**
 * Hook spécifique pour les témoignages
 */
export function useTestimonials() {
  return useSupabaseData('testimonials', {
    filter: { is_published: true },
    orderBy: { column: 'display_order', ascending: true },
    cacheKey: 'testimonials_published',
    cacheTTL: CacheTTL.TESTIMONIALS,
  });
}

/**
 * Hook spécifique pour les FAQs
 */
export function useFAQs(category?: string) {
  return useSupabaseData('faqs', {
    filter: { is_published: true, ...(category && { category }) },
    orderBy: { column: 'display_order', ascending: true },
    cacheKey: `faqs_${category || 'all'}`,
    cacheTTL: CacheTTL.FAQS,
  });
}

/**
 * Hook spécifique pour la navigation
 */
export function useNavigation() {
  return useSupabaseData('navigation_items', {
    filter: { is_visible: true },
    orderBy: { column: 'display_order', ascending: true },
    cacheKey: 'navigation_items',
    cacheTTL: CacheTTL.NAVIGATION,
  });
}

/**
 * Hook pour récupérer une section spécifique par sa clé
 */
export function useSection(sectionKey: string, pageSlug: string = 'home') {
  const [section, setSection] = useState<Tables['sections']['Row'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const cacheKey = `section_${pageSlug}_${sectionKey}`;

  useEffect(() => {
    async function fetchSection() {
      try {
        setLoading(true);

        // Vérifier le cache
        const cachedSection = cache.get<Tables['sections']['Row']>(cacheKey);
        if (cachedSection) {
          setSection(cachedSection);
          setLoading(false);
          return;
        }

        // Récupérer la page d'abord
        const { data: page } = await supabase
          .from('pages')
          .select('id')
          .eq('slug', pageSlug)
          .eq('is_published', true)
          .single();

        if (!page) {
          throw new Error(`Page ${pageSlug} not found`);
        }

        // Récupérer la section
        const { data: sectionData, error: sectionError } = await supabase
          .from('sections')
          .select('*')
          .eq('page_id', page.id)
          .eq('section_key', sectionKey)
          .eq('is_visible', true)
          .single();

        if (sectionError) throw sectionError;

        cache.set(cacheKey, sectionData, CacheTTL.SECTIONS);
        setSection(sectionData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        console.error(`Error fetching section ${sectionKey}:`, err);
      } finally {
        setLoading(false);
      }
    }

    fetchSection();
  }, [sectionKey, pageSlug, cacheKey]);

  return { section, loading, error };
}

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
