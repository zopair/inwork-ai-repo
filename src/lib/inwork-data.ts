import { supabase } from './supabase';
import { rankJobs, type CandidateProfile } from './matching';

export async function getCurrentProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  if (error) throw error;
  return data;
}

export async function saveProfile(profile: Record<string, unknown>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('يجب تسجيل الدخول أولاً');
  const { data, error } = await supabase.from('profiles').upsert({ id: user.id, ...profile }, { onConflict: 'id' }).select().single();
  if (error) throw error;
  return data;
}

export async function getRecommendedJobs(profile: CandidateProfile) {
  const { data, error } = await supabase.from('jobs').select('*').eq('active', true);
  if (error) throw error;
  return rankJobs(profile, data ?? []);
}

export async function toggleFavorite(jobId: number) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('يجب تسجيل الدخول أولاً');
  const { data: existing } = await supabase.from('favorites').select('job_id').eq('user_id', user.id).eq('job_id', jobId).maybeSingle();
  if (existing) {
    const { error } = await supabase.from('favorites').delete().eq('user_id', user.id).eq('job_id', jobId);
    if (error) throw error;
    return false;
  }
  const { error } = await supabase.from('favorites').insert({ user_id: user.id, job_id: jobId });
  if (error) throw error;
  return true;
}
