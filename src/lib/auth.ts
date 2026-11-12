import { supabase } from './supabase';

function requireSupabase() {
  if (!supabase) {
    throw new Error(
      'Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable authentication.',
    );
  }
  return supabase;
}

export async function signInWithGoogle() {
  const client = requireSupabase();
  return client.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo:
        typeof window !== 'undefined'
          ? new URL('/auth/callback', window.location.origin).toString()
          : undefined,
    },
  });
}

export async function signOut() {
  return requireSupabase().auth.signOut();
}

export async function getSession() {
  const { data, error } = await requireSupabase().auth.getSession();
  if (error) throw error;
  return data.session;
}
