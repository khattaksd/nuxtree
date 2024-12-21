import { createClient } from '@supabase/supabase-js';

if (!import.meta.env.SUPABASE_URL) {
  throw new Error('SUPABASE_URL is required');
}

if (!import.meta.env.SUPABASE_ANON_KEY) {
  throw new Error('SUPABASE_ANON_KEY is required');
}

export const supabaseUrl = import.meta.env.SUPABASE_URL;
export const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY;