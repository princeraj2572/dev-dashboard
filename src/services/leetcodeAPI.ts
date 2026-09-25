import { createApiClient, validateCredentials, callApi } from './apiClient'
import { dedupedRequest } from './requestDedup'
import type { LeetCodeStats } from '@/types'

const LEETCODE_API_BASE = 'https://alfa-leetcode-api.onrender.com'
const leetcodeClient = createApiClient({
  maxRetries: 2,
  retryDelay: 2000,
  retryableStatuses: [408, 429, 503, 504],
})

export interface LeetCodeProblem {
  id: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  solved: boolean
}

export interface LeetCodeProfile {
  username: string
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  totalQuestions: number
  acceptanceRate: number
  ranking: number
}

export class LeetCodeUserNotFoundError extends Error {
  constructor(username: string) {
    super(`LeetCode user "${username}" was not found`)
    this.name = 'LeetCodeUserNotFoundError'
  }
}

interface SubmissionCount {
  difficulty: string
  submissions: number
}

const NOT_FOUND = { notFound: true } as const

/**
 * Reads a profile from the public alfa-leetcode-api. It reports unknown users
 * with HTTP 200 and an `errors` array, so that has to be checked explicitly.
 */
const requestProfile = async (username: string): Promise<LeetCodeProfile | typeof NOT_FOUND> => {
  const [solved, profile] = await Promise.all([
    leetcodeClient.get(`${LEETCODE_API_BASE}/${encodeURIComponent(username)}/solved`, { timeout: 45000 }),
    leetcodeClient.get(`${LEETCODE_API_BASE}/userProfile/${encodeURIComponent(username)}`, { timeout: 45000 }),
  ])

  if (solved.data?.errors || profile.data?.errors) return NOT_FOUND

  const accepted = (solved.data.acSubmissionNum as SubmissionCount[] | undefined)?.find(
    (s) => s.difficulty === 'All'
  )?.submissions
  const total = (solved.data.totalSubmissionNum as SubmissionCount[] | undefined)?.find(
    (s) => s.difficulty === 'All'
  )?.submissions

  return {
    username,
    totalSolved: solved.data.solvedProblem || 0,
    easySolved: solved.data.easySolved || 0,
    mediumSolved: solved.data.mediumSolved || 0,
    hardSolved: solved.data.hardSolved || 0,
    totalQuestions: profile.data.totalQuestions || 0,
    acceptanceRate: accepted && total ? (accepted / total) * 100 : 0,
    ranking: profile.data.ranking || 0,
  }
}

/**
 * Returns the profile, or null when the service could not be reached.
 * Throws LeetCodeUserNotFoundError when LeetCode has no such user.
 */
export const fetchLeetCodeProfile = async (username: string): Promise<LeetCodeProfile | null> => {
  const validation = validateCredentials(username)
  if (!validation.isValid) {
    console.error('LeetCode validation failed:', validation.error)
    return null
  }

  const result = await dedupedRequest(
    'GET',
    `${LEETCODE_API_BASE}/${username}`,
    () => callApi(() => requestProfile(username), 'LeetCode Profile'),
    { username }
  )

  if (result && 'notFound' in result) throw new LeetCodeUserNotFoundError(username)
  return result
}

export const calculateLeetCodeStats = (profile: LeetCodeProfile | null): LeetCodeStats => {
  if (!profile) {
    return {
      totalSolved: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      acceptanceRate: 0,
      ranking: 0,
    }
  }

  return {
    totalSolved: profile.totalSolved,
    easySolved: profile.easySolved,
    mediumSolved: profile.mediumSolved,
    hardSolved: profile.hardSolved,
    acceptanceRate: profile.acceptanceRate,
    ranking: profile.ranking,
  }
}

export const calculateLeetCodeScore = (stats: LeetCodeStats): number => {
  // Score formula: (easy * 1) + (medium * 3) + (hard * 5) + (acceptanceRate * 10)
  const problemScore = stats.easySolved * 1 + stats.mediumSolved * 3 + stats.hardSolved * 5
  const acceptanceBonus = Math.floor((stats.acceptanceRate / 100) * 10)
  return problemScore + acceptanceBonus
}
