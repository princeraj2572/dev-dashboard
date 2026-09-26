// GitHub
export interface GithubStats {
  totalCommitsThisWeek: number
  commitsPerDay: { day: string; count: number }[]
  totalPRs: number
  languageBreakdown: { language: string; percentage: number }[]
  topRepos: { name: string; stars: number; commits: number }[]
  recentActivity: ActivityItem[]
  /** Local days ('YYYY-MM-DD') with at least one push, from the events GitHub still returns. */
  activeDays: string[]
  /** True when some pushes could not be resolved to a commit count and were counted as one. */
  commitsApproximate: boolean
}

export interface ActivityItem {
  id: string
  kind: 'commit' | 'pull_request' | 'review' | 'create' | 'fork' | 'comment'
  title: string
  detail: string
  repo: string
  date: string
  url: string
}

// LeetCode
export interface LeetCodeStats {
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  acceptanceRate: number
  ranking: number
}

// Goals
export type GoalSource = 'manual' | 'leetcode' | 'commits' | 'hours'

export interface Goal {
  id: string
  title: string
  target: number
  current: number
  unit: string
  deadline: string
  /** Where progress comes from. Missing on older goals, which are manual. */
  source?: GoalSource
  /** For 'leetcode' goals: problems already solved when the goal was created. */
  baseline?: number
  /** Creation time in ms; 'hours' goals only count sessions after this. */
  createdAt?: number
}

// Coding Session
export interface CodingSession {
  id: string
  start: number
  end: number
  duration: number
}
