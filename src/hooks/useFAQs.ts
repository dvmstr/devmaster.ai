import { useSupabaseData } from './useSupabaseData';
import { CacheTTL } from '@/lib/cache';

/**
 * Hook pour récupérer les FAQs
 */
export function useFAQs(category?: string) {
  return useSupabaseData('faqs', {
    filter: { is_published: true, ...(category && { category }) },
    orderBy: { column: 'display_order', ascending: true },
    cacheKey: `faqs_${category || 'all'}`,
    cacheTTL: CacheTTL.FAQS,
  });
}
