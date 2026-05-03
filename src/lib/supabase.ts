import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Client-side instance (may be empty during build)
export const supabase: SupabaseClient = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder');

export const getSupabaseAdmin = (): SupabaseClient => {
  const adminUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const adminKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createClient(adminUrl || 'https://placeholder.supabase.co', adminKey || 'placeholder');
};
