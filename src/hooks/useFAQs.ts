import { useSupabaseData } from './useSupabaseData';
import { CacheTTL } from '@/lib/cache';
import { useCurrentLocale } from '@/contexts';

/**
 * Hook pour récupérer les FAQs avec support i18n
 */
export function useFAQs(category?: string) {
  const locale = useCurrentLocale();
  
  return useSupabaseData('faqs', {
    filter: { is_published: true, ...(category && { category }) },
    orderBy: { column: 'display_order', ascending: true },
    cacheKey: `faqs_${locale}_${category || 'all'}`,
    cacheTTL: CacheTTL.FAQS,
    locale,
  });
}
