import type { GithubStats, LeetCodeStats } from '@/types'

/**
 * Score rules. The aim is to reward showing up, not volume: commits stop
 * counting after a few a day, pull requests are capped, and every day of an
 * unbroken streak adds a bonus.
 */
export const SCORE_RULES = {
  commitPoints: 2,
  /** Commits beyond this many in one day earn nothing, so a single burst cannot swamp the week. */
  dailyCommitCap: 5,
  prPoints: 5,
  prCap: 6,
  streakPointsPerDay: 5,
  streakBonusCap: 50,
} as const

export interface CombinedScore {
  githubScore: number
  leetcodeScore: number
  streakScore: number
  totalScore: number
  breakdown: {
    commits: number
    prs: number
    leetcodeProblems: number
    acceptanceBonus: number
    streakBonus: number
  }
}

export const calculateGitHubScore = (stats: GithubStats | null): number => {
  if (!stats) return 0
  const { commitPoints, dailyCommitCap, prPoints, prCap } = SCORE_RULES
  const commitScore = stats.commitsPerDay.reduce(
    (sum, day) => sum + Math.min(day.count, dailyCommitCap) * commitPoints,
    0
  )
  return commitScore + Math.min(stats.totalPRs, prCap) * prPoints
}

export const calculateLeetCodeScore = (stats: LeetCodeStats | null): number => {
  if (!stats) return 0
  // Score: (easy * 1) + (medium * 3) + (hard * 5) + an acceptance bonus of up to 50
  const problemScore = stats.easySolved * 1 + stats.mediumSolved * 3 + stats.hardSolved * 5
  const acceptanceBonus = Math.floor((stats.acceptanceRate / 100) * 50)
  return problemScore + acceptanceBonus
}

export const calculateStreakScore = (streakDays: number): number =>
  Math.min(Math.max(streakDays, 0) * SCORE_RULES.streakPointsPerDay, SCORE_RULES.streakBonusCap)

export const calculateTotalScore = (
  githubStats: GithubStats | null,
  leetcodeStats: LeetCodeStats | null,
  streakDays = 0
): CombinedScore => {
  const githubScore = calculateGitHubScore(githubStats)
  const leetcodeScore = calculateLeetCodeScore(leetcodeStats)
  const streakScore = calculateStreakScore(streakDays)

  return {
    githubScore,
    leetcodeScore,
    streakScore,
    totalScore: githubScore + leetcodeScore + streakScore,
    breakdown: {
      commits: githubStats?.totalCommitsThisWeek || 0,
      prs: githubStats?.totalPRs || 0,
      leetcodeProblems: leetcodeStats?.totalSolved || 0,
      acceptanceBonus: Math.floor(((leetcodeStats?.acceptanceRate || 0) / 100) * 50),
      streakBonus: streakScore,
    },
  }
}

export const getScoreRank = (score: number): string => {
  if (score >= 800) return 'Legend'
  if (score >= 400) return 'Master'
  if (score >= 200) return 'Advanced'
  if (score >= 100) return 'Intermediate'
  if (score >= 40) return 'Beginner'
  return 'Getting started'
}

export const getScoreColor = (score: number): string => {
  if (score >= 800) return 'from-purple-500 to-pink-500'
  if (score >= 400) return 'from-blue-500 to-cyan-500'
  if (score >= 200) return 'from-green-500 to-emerald-500'
  if (score >= 100) return 'from-yellow-500 to-orange-500'
  if (score >= 40) return 'from-red-500 to-pink-500'
  return 'from-gray-500 to-slate-500'
}
