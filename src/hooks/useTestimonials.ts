import { useSupabaseData } from './useSupabaseData';
import { CacheTTL } from '@/lib/cache';
import { useCurrentLocale } from '@/contexts';

/**
 * Hook pour récupérer les témoignages avec support i18n
 */
export function useTestimonials() {
  const locale = useCurrentLocale();
  
  return useSupabaseData('testimonials', {
    filter: { is_published: true },
    orderBy: { column: 'display_order', ascending: true },
    cacheKey: `testimonials_${locale}_published`,
    cacheTTL: CacheTTL.TESTIMONIALS,
    locale,
  });
}
