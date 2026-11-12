import { supabase } from './supabase';
import { rankJobs, type CandidateProfile } from './matching';

function requireSupabase() {
  if (!supabase) {
    throw new Error(
      'Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable profile and job data.',
    );
  }
  return supabase;
}

export async function getCurrentProfile() {
  const client = requireSupabase();
  const { data: { user } } = await client.auth.getUser();
  if (!user) return null;
  const { data, error } = await client.from('profiles').select('*').eq('id', user.id).single();
  if (error) throw error;
  return data;
}

export async function saveProfile(profile: Record<string, unknown>) {
  const client = requireSupabase();
  const { data: { user } } = await client.auth.getUser();
  if (!user) throw new Error('يجب تسجيل الدخول أولاً');
  const { data, error } = await client.from('profiles').upsert({ id: user.id, ...profile }, { onConflict: 'id' }).select().single();
  if (error) throw error;
  return data;
}

export async function getRecommendedJobs(profile: CandidateProfile) {
  const { data, error } = await requireSupabase().from('jobs').select('*').eq('active', true);
  if (error) throw error;
  return rankJobs(profile, data ?? []);
}

export async function toggleFavorite(jobId: number) {
  const client = requireSupabase();
  const { data: { user } } = await client.auth.getUser();
  if (!user) throw new Error('يجب تسجيل الدخول أولاً');
  const { data: existing } = await client.from('favorites').select('job_id').eq('user_id', user.id).eq('job_id', jobId).maybeSingle();
  if (existing) {
    const { error } = await client.from('favorites').delete().eq('user_id', user.id).eq('job_id', jobId);
    if (error) throw error;
    return false;
  }
  const { error } = await client.from('favorites').insert({ user_id: user.id, job_id: jobId });
  if (error) throw error;
  return true;
}
