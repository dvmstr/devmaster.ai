import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { cache, CacheTTL } from '@/lib/cache';
import type { Database } from '@/types/database';
import type { Locale } from '@/contexts';

type Tables = Database['public']['Tables'];

/**
 * Hook générique pour récupérer les données Supabase avec cache et support i18n
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
    locale?: Locale;
  }
) {
  type RowType = Tables[T]['Row'];
  
  const [data, setData] = useState<RowType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const locale = options?.locale || 'en';
  const cacheKey = options?.cacheKey || `${table}_${locale}_${JSON.stringify(options)}`;
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

        // Check cache first
        const cachedData = cache.get<RowType[]>(cacheKey);
        if (cachedData) {
          setData(cachedData);
          setLoading(false);
          return;
        }

        // Build query
        let query = supabase
          .from(table)
          .select(options?.select || '*');

        // Apply locale filter (all content tables have locale column)
        query = query.eq('locale', locale);

        // Apply additional filters
        if (options?.filter) {
          Object.entries(options.filter).forEach(([key, value]) => {
            query = query.eq(key, value);
          });
        }

        // Apply ordering
        if (options?.orderBy) {
          query = query.order(options.orderBy.column, {
            ascending: options.orderBy.ascending ?? true,
          });
        }

        // Apply limit
        if (options?.limit) {
          query = query.limit(options.limit);
        }

        const { data: fetchedData, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        // Store in cache
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
  }, [table, cacheKey, cacheTTL, enabled, locale]);

  const refetch = async () => {
    cache.invalidate(cacheKey);
    setLoading(true);
    setData(null);
  };

  return { data, loading, error, refetch };
}
