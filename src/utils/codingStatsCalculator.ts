import type { CodingSession } from '@/types'

export interface CodingStats {
  totalHours: number
  totalSessions: number
  averageSessionMinutes: number
  todayMinutes: number
  currentStreak: number
  longestStreak: number
}

export const calculateCodingStats = (sessions: CodingSession[]): CodingStats => {
  if (sessions.length === 0) {
    return {
      totalHours: 0,
      totalSessions: 0,
      averageSessionMinutes: 0,
      todayMinutes: 0,
      currentStreak: 0,
      longestStreak: 0,
    }
  }

  const totalDuration = sessions.reduce((sum, s) => sum + s.duration, 0)
  const totalHours = totalDuration / 3600
  const averageSessionMinutes = (totalDuration / sessions.length) / 60

  // Today's sessions
  const today = new Date().toDateString()
  const todayMinutes = (sessions
    .filter((s) => new Date(s.end).toDateString() === today)
    .reduce((sum, s) => sum + s.duration, 0)) / 60

  // Calculate streaks
  const dates = sessions
    .map((s) => new Date(s.end))
    .reduce((acc, date) => {
      const dateStr = date.toDateString()
      if (!acc.includes(dateStr)) acc.push(dateStr)
      return acc
    }, [] as string[])
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

  let currentStreak = 0
  let longestStreak = 0
  let tempStreak = 1

  for (let i = 0; i < dates.length; i++) {
    const current = new Date(dates[i]).getTime()
    const next = i + 1 < dates.length ? new Date(dates[i + 1]).getTime() : null

    if (next && (current - next) / (1000 * 60 * 60 * 24) === 1) {
      tempStreak++
    } else {
      if (i === 0) currentStreak = tempStreak
      longestStreak = Math.max(longestStreak, tempStreak)
      tempStreak = 1
    }
  }

  return {
    totalHours,
    totalSessions: sessions.length,
    averageSessionMinutes,
    todayMinutes,
    currentStreak,
    longestStreak,
  }
}
