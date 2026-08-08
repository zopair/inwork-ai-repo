import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = url && anonKey ? createClient(url, anonKey) : null;

export async function signInWithGoogle() {
  if (!supabase) throw new Error('Supabase environment variables are not configured.');
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: typeof window !== 'undefined' ? window.location.origin : undefined },
  });
}
