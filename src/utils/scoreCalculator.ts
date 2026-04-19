import type { GithubStats, LeetCodeStats } from '@/types'

export interface CombinedScore {
  githubScore: number
  leetcodeScore: number
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
  // Score: (commits * 2) + (PRs * 5)
  return stats.totalCommitsThisWeek * 2 + stats.totalPRs * 5
}

export const calculateLeetCodeScore = (stats: LeetCodeStats | null): number => {
  if (!stats) return 0
  // Score: (easy * 1) + (medium * 3) + (hard * 5) + (acceptance * bonus)
  const problemScore = stats.easySolved * 1 + stats.mediumSolved * 3 + stats.hardSolved * 5
  const acceptanceBonus = Math.floor((stats.acceptanceRate / 100) * 50)
  return problemScore + acceptanceBonus
}

export const calculateTotalScore = (
  githubStats: GithubStats | null,
  leetcodeStats: LeetCodeStats | null
): CombinedScore => {
  const githubScore = calculateGitHubScore(githubStats)
  const leetcodeScore = calculateLeetCodeScore(leetcodeStats)

  return {
    githubScore,
    leetcodeScore,
    totalScore: githubScore + leetcodeScore,
    breakdown: {
      commits: githubStats?.totalCommitsThisWeek || 0,
      prs: githubStats?.totalPRs || 0,
      leetcodeProblems: (leetcodeStats?.totalSolved || 0),
      acceptanceBonus: Math.floor(((leetcodeStats?.acceptanceRate || 0) / 100) * 50),
      streakBonus: 0, // Will be calculated in Phase 5
    },
  }
}

export const getScoreRank = (score: number): string => {
  if (score >= 1000) return '🏆 Legend'
  if (score >= 750) return '⭐ Master'
  if (score >= 500) return '💎 Advanced'
  if (score >= 250) return '🔥 Intermediate'
  if (score >= 100) return '📈 Beginner'
  return '🌱 Starting'
}

export const getScoreColor = (score: number): string => {
  if (score >= 1000) return 'from-purple-500 to-pink-500'
  if (score >= 750) return 'from-blue-500 to-cyan-500'
  if (score >= 500) return 'from-green-500 to-emerald-500'
  if (score >= 250) return 'from-yellow-500 to-orange-500'
  if (score >= 100) return 'from-red-500 to-pink-500'
  return 'from-gray-500 to-slate-500'
}
