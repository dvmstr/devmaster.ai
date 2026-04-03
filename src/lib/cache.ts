/**
 * Cache système optimisé pour les données CMS
 * - Réduit les appels à Supabase
 * - Améliore les performances de chargement
 * - Rafraîchissement automatique après TTL
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class CacheManager {
  private cache = new Map<string, CacheEntry<any>>();
  
  /**
   * Récupère une entrée du cache si elle est valide
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) return null;
    
    const now = Date.now();
    const isExpired = now - entry.timestamp > entry.ttl;
    
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }
  
  /**
   * Stocke une entrée dans le cache avec TTL
   */
  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }
  
  /**
   * Invalide une ou plusieurs entrées du cache
   */
  invalidate(keyOrPattern: string | RegExp): void {
    if (typeof keyOrPattern === 'string') {
      this.cache.delete(keyOrPattern);
    } else {
      // Supprime toutes les clés qui matchent le pattern
      const keysToDelete: string[] = [];
      this.cache.forEach((_, key) => {
        if (keyOrPattern.test(key)) {
          keysToDelete.push(key);
        }
      });
      keysToDelete.forEach(key => this.cache.delete(key));
    }
  }
  
  /**
   * Vide complètement le cache
   */
  clear(): void {
    this.cache.clear();
  }
  
  /**
   * Récupère les statistiques du cache
   */
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

export const cache = new CacheManager();

/**
 * TTL par défaut pour chaque type de contenu
 */
export const CacheTTL = {
  PAGE_META: 30 * 60 * 1000,       // 30 minutes
  SECTIONS: 30 * 60 * 1000,        // 30 minutes
  TESTIMONIALS: 60 * 60 * 1000,    // 1 heure
  FAQS: 60 * 60 * 1000,            // 1 heure
  NAVIGATION: 60 * 60 * 1000,      // 1 heure
  STATIC_CONTENT: 120 * 60 * 1000, // 2 heures
} as const;
