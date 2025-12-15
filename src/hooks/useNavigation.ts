import { useSupabaseData } from './useSupabaseData';
import { CacheTTL } from '@/lib/cache';

/**
 * Hook pour récupérer les éléments de navigation
 */
export function useNavigation() {
  return useSupabaseData('navigation_items', {
    filter: { is_visible: true },
    orderBy: { column: 'display_order', ascending: true },
    cacheKey: 'navigation_items',
    cacheTTL: CacheTTL.NAVIGATION,
  });
}
