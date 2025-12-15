import { useSupabaseData } from './useSupabaseData';
import { CacheTTL } from '@/lib/cache';

/**
 * Hook pour récupérer les témoignages
 */
export function useTestimonials() {
  return useSupabaseData('testimonials', {
    filter: { is_published: true },
    orderBy: { column: 'display_order', ascending: true },
    cacheKey: 'testimonials_published',
    cacheTTL: CacheTTL.TESTIMONIALS,
  });
}
