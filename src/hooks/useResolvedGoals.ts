import { useCallback } from 'react'
import { useGoals } from '@/hooks/useGoals'
import { useGithubData } from '@/hooks/useGithubData'
import { useLeetCodeData } from '@/hooks/useLeetCodeData'
import { useCodingTimer } from '@/hooks/useCodingTimer'
import { useDashboardStore } from '@/store/dashboardStore'
import { liveProgress, type LiveData } from '@/utils/goalSources'
import type { Goal } from '@/types'

export interface ResolvedGoal extends Goal {
  /** Live value for automatic goals, the stored value for manual ones. */
  current: number
  isAuto: boolean
  /** An automatic goal whose data has not loaded, so `current` is only the last stored value. */
  waiting: boolean
}

/** Goals with automatic ones filled in from GitHub, LeetCode and the timer. */
export const useResolvedGoals = () => {
  const goalsApi = useGoals()
  const { githubUsername, leetcodeUsername } = useDashboardStore()
  const { data: github } = useGithubData()
  const leetcode = useLeetCodeData()
  const { sessions } = useCodingTimer()

  const leetcodeReady = !!leetcodeUsername && !leetcode.isLoading && !leetcode.error
  const live: LiveData = {
    leetcodeSolved: leetcodeReady ? leetcode.totalSolved : null,
    commitsThisWeek: githubUsername && github ? github.totalCommitsThisWeek : null,
    sessions,
  }

  const goals: ResolvedGoal[] = goalsApi.goals.map((goal) => {
    const isAuto = (goal.source ?? 'manual') !== 'manual'
    const value = liveProgress(goal, live)
    return { ...goal, current: value ?? goal.current, isAuto, waiting: isAuto && value === null }
  })

  const getCompletedGoals = useCallback(() => goals.filter((g) => g.current >= g.target), [goals])

  const getGoalProgress = useCallback(
    (id: string) => {
      const goal = goals.find((g) => g.id === id)
      return goal && goal.target > 0 ? Math.min((goal.current / goal.target) * 100, 100) : 0
    },
    [goals]
  )

  return {
    goals,
    live,
    addGoal: goalsApi.addGoal,
    deleteGoal: goalsApi.deleteGoal,
    updateProgress: goalsApi.updateProgress,
    getCompletedGoals,
    getGoalProgress,
  }
}
