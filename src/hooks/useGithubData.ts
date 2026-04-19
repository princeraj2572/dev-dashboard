import { useQuery } from '@tanstack/react-query'
import { useDashboardStore } from '@/store/dashboardStore'
import { fetchUserEvents, fetchUserRepos, calculateGithubStats } from '@/services/githubAPI'
import { GithubStats } from '@/types'

export const useGithubData = () => {
  const { githubUsername } = useDashboardStore()
  const token = import.meta.env.VITE_GITHUB_TOKEN

  return useQuery<GithubStats>({
    queryKey: ['github', githubUsername],
    queryFn: async () => {
      const events = await fetchUserEvents(githubUsername, token)
      const repos = await fetchUserRepos(githubUsername, token)
      return calculateGithubStats(events, repos)
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!githubUsername && !!token,
    retry: 1,
  })
}
