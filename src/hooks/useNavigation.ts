import { useSupabaseData } from './useSupabaseData';
import { CacheTTL } from '@/lib/cache';
import { useCurrentLocale } from '@/contexts';

/**
 * Hook pour récupérer les éléments de navigation avec support i18n
 */
export function useNavigation() {
  const locale = useCurrentLocale();
  
  return useSupabaseData('navigation_items', {
    filter: { is_visible: true },
    orderBy: { column: 'display_order', ascending: true },
    cacheKey: `navigation_items_${locale}`,
    cacheTTL: CacheTTL.NAVIGATION,
    locale,
  });
}
