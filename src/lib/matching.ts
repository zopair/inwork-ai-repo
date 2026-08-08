export type CandidateProfile = {
  skills: string[];
  english: boolean;
  experience?: string;
  city?: string;
};

export type MatchableJob = {
  id: number | string;
  title: string;
  tags: string[];
  international?: boolean;
  mode?: string;
};

export function scoreJob(profile: CandidateProfile, job: MatchableJob) {
  if (job.international && !profile.english) return -1;
  const skills = new Set(profile.skills.map(s => s.toLowerCase()));
  const matched = job.tags.filter(t => skills.has(t.toLowerCase())).length;
  const skillScore = job.tags.length ? matched / job.tags.length : 0;
  const languageBonus = job.international && profile.english ? 0.15 : 0;
  return Math.min(1, skillScore * 0.75 + languageBonus + (matched > 0 ? 0.1 : 0));
}

export function rankJobs<T extends MatchableJob>(profile: CandidateProfile, jobs: T[]) {
  return jobs
    .map(job => ({ job, score: scoreJob(profile, job) }))
    .filter(x => x.score >= 0)
    .sort((a, b) => b.score - a.score);
}
