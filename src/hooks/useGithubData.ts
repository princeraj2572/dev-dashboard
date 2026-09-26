import { useQuery } from '@tanstack/react-query'
import { useDashboardStore } from '@/store/dashboardStore'
import { fetchUserEvents, fetchUserRepos, fetchPushDetails, calculateGithubStats } from '@/services/githubAPI'
import { applyActivityHistory } from '@/utils/activityHistory'
import type { GithubStats } from '@/types'

export const useGithubData = () => {
  const { githubUsername } = useDashboardStore()
  const token = import.meta.env.VITE_GITHUB_TOKEN

  return useQuery<GithubStats>({
    queryKey: ['github', githubUsername],
    queryFn: async () => {
      const events = await fetchUserEvents(githubUsername, token)
      // The API layer returns null on failure (rate limit, offline, unknown user). Report that
      // instead of turning it into a week of zeros.
      if (!events) throw new Error('GitHub activity is unavailable')
      const repos = await fetchUserRepos(githubUsername, token)
      const pushDetails = await fetchPushDetails(events, token)
      return applyActivityHistory(githubUsername, calculateGithubStats(events, repos, pushDetails))
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!githubUsername, // token is optional; unauthenticated requests are rate limited
    retry: 1,
  })
}
