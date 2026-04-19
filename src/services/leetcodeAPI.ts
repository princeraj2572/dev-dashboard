import { createApiClient, validateCredentials, callApi } from './apiClient'
import type { LeetCodeStats } from '@/types'

const LEETCODE_API_BASE = 'https://leetcode-api-fxckjtno.vercel.app'
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

export const fetchLeetCodeProfile = async (username: string): Promise<LeetCodeProfile | null> => {
  // Validate username
  const validation = validateCredentials(username)
  if (!validation.isValid) {
    console.error('LeetCode validation failed:', validation.error)
    return null
  }

  return callApi(
    () =>
      leetcodeClient
        .get(`${LEETCODE_API_BASE}/${username}`, {
          timeout: 15000,
        })
        .then((response) => {
          const data = response.data

          return {
            username: data.username || username,
            totalSolved: data.totalSolved || 0,
            easySolved: data.easySolved || 0,
            mediumSolved: data.mediumSolved || 0,
            hardSolved: data.hardSolved || 0,
            totalQuestions: data.totalQuestions || 0,
            acceptanceRate: parseFloat(data.acceptanceRate) || 0,
            ranking: data.ranking || 0,
          }
        }),
    'LeetCode Profile'
  )
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
