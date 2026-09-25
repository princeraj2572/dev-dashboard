import type { CodingSession, Goal, GoalSource } from '@/types'

export interface SourceInfo {
  id: GoalSource
  label: string
  unit: string
  /** Shown under the goal so it is clear where the number comes from. */
  description: string
}

export const GOAL_SOURCES: SourceInfo[] = [
  { id: 'manual', label: 'Update it myself', unit: 'tasks', description: 'You change the number.' },
  {
    id: 'leetcode',
    label: 'LeetCode problems solved',
    unit: 'problems',
    description: 'Counts problems solved since you created the goal.',
  },
  {
    id: 'commits',
    label: 'GitHub commits this week',
    unit: 'commits',
    description: 'Commits in the last 7 days, from GitHub.',
  },
  {
    id: 'hours',
    label: 'Coding time from the timer',
    unit: 'hours',
    description: 'Timer sessions finished since you created the goal.',
  },
]

export const sourceInfo = (source: GoalSource | undefined) =>
  GOAL_SOURCES.find((s) => s.id === (source ?? 'manual')) ?? GOAL_SOURCES[0]

export interface LiveData {
  /** null while loading or when the account is missing or unreachable. */
  leetcodeSolved: number | null
  commitsThisWeek: number | null
  sessions: CodingSession[]
}

/** The current value of an automatic goal, or null when its data is not available yet. */
export const liveProgress = (goal: Goal, live: LiveData): number | null => {
  switch (goal.source ?? 'manual') {
    case 'manual':
      return goal.current
    case 'leetcode':
      return live.leetcodeSolved === null ? null : Math.max(0, live.leetcodeSolved - (goal.baseline ?? 0))
    case 'commits':
      return live.commitsThisWeek
    case 'hours': {
      const since = goal.createdAt ?? 0
      const seconds = live.sessions.filter((s) => s.end >= since).reduce((sum, s) => sum + s.duration, 0)
      return Math.round((seconds / 3600) * 10) / 10
    }
  }
}
