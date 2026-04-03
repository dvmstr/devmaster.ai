import { useMemo } from 'react';
import { useSection } from './useSection';

/**
 * Hook to fetch section content from Supabase with typed fallback.
 * Parses the JSONB `content` field into the expected type T.
 */
export function useSectionContent<T>(
  sectionKey: string,
  fallback: T,
  pageSlug: string = 'home'
): {
  content: T;
  sectionTitle: string | null;
  sectionSubtitle: string | null;
  loading: boolean;
  error: Error | null;
} {
  const { section, loading, error } = useSection(sectionKey, pageSlug);

  const content = useMemo(() => {
    if (loading || error || !section?.content) {
      return fallback;
    }

    try {
      const parsed = typeof section.content === 'string'
        ? JSON.parse(section.content)
        : section.content;
      return { ...fallback, ...parsed } as T;
    } catch {
      return fallback;
    }
  }, [section, loading, error, fallback]);

  return {
    content,
    sectionTitle: section?.section_title ?? null,
    sectionSubtitle: section?.section_subtitle ?? null,
    loading,
    error,
  };
}
