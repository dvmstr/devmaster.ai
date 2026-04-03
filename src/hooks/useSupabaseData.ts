import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { cache, CacheTTL } from '@/lib/cache';
import type { Database } from '@/types/database';
import type { Locale } from '@/contexts';

type Tables = Database['public']['Tables'];

/**
 * Build a stable, deterministic cache key from options
 */
function buildCacheKey(table: string, locale: string, options?: { select?: string; filter?: Record<string, any>; orderBy?: { column: string; ascending?: boolean }; limit?: number }) {
  const parts = [table, locale];
  if (options?.select) parts.push(`s:${options.select}`);
  if (options?.filter) {
    const sortedFilter = Object.keys(options.filter).sort().map(k => `${k}=${options.filter![k]}`).join(',');
    parts.push(`f:${sortedFilter}`);
  }
  if (options?.orderBy) parts.push(`o:${options.orderBy.column}:${options.orderBy.ascending ?? true}`);
  if (options?.limit) parts.push(`l:${options.limit}`);
  return parts.join('_');
}

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
  const cacheTTL = options?.cacheTTL ?? CacheTTL.STATIC_CONTENT;
  const enabled = options?.enabled ?? true;

  const cacheKey = useMemo(
    () => options?.cacheKey || buildCacheKey(table as string, locale, options),
    [table, locale, options?.cacheKey, options?.select, options?.limit,
     // Stable serialization for filter and orderBy
     JSON.stringify(options?.filter), JSON.stringify(options?.orderBy)]
  );

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchData() {
      try {
        setLoading(true);

        // Check cache first
        const cachedData = cache.get<RowType[]>(cacheKey);
        if (cachedData) {
          if (!cancelled) {
            setData(cachedData);
            setLoading(false);
          }
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
        if (cancelled) return;

        // Store in cache
        cache.set(cacheKey, fetchedData, cacheTTL);

        setData(fetchedData as RowType[]);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err : new Error('Unknown error'));
        console.error(`Error fetching ${table}:`, err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, [table, cacheKey, cacheTTL, enabled, locale]);

  const refetch = useCallback(() => {
    cache.invalidate(cacheKey);
    setData(null);
    setError(null);
    setLoading(true);
  }, [cacheKey]);

  return { data, loading, error, refetch };
}
