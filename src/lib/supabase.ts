import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Client Supabase optimisé avec cache
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Pas de session pour site vitrine
  },
  global: {
    headers: {
      'x-application-name': 'devmaster-website',
    },
  },
  db: {
    schema: 'public',
  },
  // Réutilisation des connexions pour performance
  realtime: {
    params: {
      eventsPerSecond: 2,
    },
  },
});
