import axios from 'axios'
import type { LeetCodeStats } from '@/types'

const LEETCODE_API_BASE = 'https://leetcode-api-fxckjtno.vercel.app'

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
  try {
    const response = await axios.get(`${LEETCODE_API_BASE}/${username}`)
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
  } catch (error) {
    console.error('Failed to fetch LeetCode profile:', error)
    return null
  }
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
