import { CodingSession } from '@/types'

export interface StreakData {
  currentStreak: number
  longestStreak: number
  lastActivityDate: string | null
}

export const calculateStreaks = (sessions: CodingSession[]): StreakData => {
  if (sessions.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: null,
    }
  }

  // Get unique dates from sessions, sorted descending
  const uniqueDates = Array.from(
    new Set(sessions.map((s) => new Date(s.end).toDateString()))
  ).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

  const today = new Date().toDateString()
  const yesterday = new Date(Date.now() - 86400000).toDateString()

  // Check if streak is still active
  const lastActivityDate = uniqueDates[0]
  const isStreakActive = lastActivityDate === today || lastActivityDate === yesterday

  let currentStreak = 0
  let longestStreak = 0
  let tempStreak = 1

  if (isStreakActive) {
    // Calculate current streak
    for (let i = 0; i < uniqueDates.length; i++) {
      const current = new Date(uniqueDates[i]).getTime()
      const next = i + 1 < uniqueDates.length ? new Date(uniqueDates[i + 1]).getTime() : null

      if (next) {
        const dayDiff = (current - next) / (1000 * 60 * 60 * 24)
        if (dayDiff === 1) {
          tempStreak++
        } else {
          break
        }
      }
    }
    currentStreak = tempStreak
  }

  // Calculate longest streak (all-time)
  tempStreak = 1
  for (let i = 0; i < uniqueDates.length; i++) {
    const current = new Date(uniqueDates[i]).getTime()
    const next = i + 1 < uniqueDates.length ? new Date(uniqueDates[i + 1]).getTime() : null

    if (next) {
      const dayDiff = (current - next) / (1000 * 60 * 60 * 24)
      if (dayDiff === 1) {
        tempStreak++
      } else {
        longestStreak = Math.max(longestStreak, tempStreak)
        tempStreak = 1
      }
    } else {
      longestStreak = Math.max(longestStreak, tempStreak)
    }
  }

  return {
    currentStreak,
    longestStreak,
    lastActivityDate,
  }
}

export const getStreakBadge = (streak: number): { icon: string; label: string; color: string } => {
  if (streak >= 100) {
    return { icon: '🔥🔥🔥', label: 'Legendary', color: 'from-red-500 to-orange-500' }
  }
  if (streak >= 50) {
    return { icon: '🔥🔥', label: 'Epic', color: 'from-orange-500 to-yellow-500' }
  }
  if (streak >= 30) {
    return { icon: '🔥', label: 'Hot', color: 'from-yellow-500 to-orange-500' }
  }
  if (streak >= 7) {
    return { icon: '⚡', label: 'Active', color: 'from-blue-500 to-cyan-500' }
  }
  if (streak >= 1) {
    return { icon: '✨', label: 'Started', color: 'from-purple-500 to-pink-500' }
  }
  return { icon: '🌱', label: 'Ready', color: 'from-gray-500 to-slate-500' }
}
