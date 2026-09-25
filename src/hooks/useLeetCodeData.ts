import { useQuery } from '@tanstack/react-query'
import { useDashboardStore } from '@/store/dashboardStore'
import {
  fetchLeetCodeProfile,
  calculateLeetCodeStats,
  calculateLeetCodeScore,
  LeetCodeUserNotFoundError,
} from '@/services/leetcodeAPI'
import type { LeetCodeStats } from '@/types'

interface UseLeetCodeDataReturn extends LeetCodeStats {
  score: number
  isLoading: boolean
  error: Error | null
  errorKind: 'not-found' | 'unavailable' | null
}

export const useLeetCodeData = (): UseLeetCodeDataReturn => {
  const { leetcodeUsername } = useDashboardStore()

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['leetcode', leetcodeUsername],
    queryFn: async () => {
      const result = await fetchLeetCodeProfile(leetcodeUsername)
      // The API layer returns null on failure; surface that as an error so the UI can say so.
      if (!result) throw new Error('LeetCode stats are unavailable')
      return result
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!leetcodeUsername,
    retry: (count, err) => !(err instanceof LeetCodeUserNotFoundError) && count < 1,
  })

  const stats = calculateLeetCodeStats(profile || null)
  const score = calculateLeetCodeScore(stats)

  return {
    ...stats,
    score,
    isLoading,
    error: error as Error | null,
    errorKind: !error ? null : error instanceof LeetCodeUserNotFoundError ? 'not-found' : 'unavailable',
  }
}
