import { type CodingSession } from '@/types'

export interface StreakData {
  currentStreak: number
  longestStreak: number
  lastActivityDate: string | null
  /** True when today already has a push or a finished session. */
  activeToday: boolean
}

const DAY_MS = 86400000

/** A local calendar day as "YYYY-MM-DD". */
export const toDayKey = (time: number | string | Date): string => {
  const d = new Date(time)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** Days since the epoch for a "YYYY-MM-DD" key. Built from UTC parts so DST cannot shift it. */
const dayNumber = (key: string): number => {
  const [y, m, d] = key.split('-').map(Number)
  return Date.UTC(y, m - 1, d) / DAY_MS
}

const keyToDate = (key: string): Date => {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/**
 * A day counts when there was any coding activity: a GitHub push (`activeDays`)
 * or a finished timer session. The streak is still alive if today has not
 * happened yet but yesterday did.
 */
export const calculateStreaks = (
  sessions: CodingSession[],
  activeDays: string[] = [],
  now: number = Date.now()
): StreakData => {
  const keys = new Set<string>(activeDays)
  for (const s of sessions) keys.add(toDayKey(s.end))

  if (keys.size === 0) {
    return { currentStreak: 0, longestStreak: 0, lastActivityDate: null, activeToday: false }
  }

  const sortedKeys = [...keys].sort().reverse() // ISO keys sort chronologically; newest first
  const days = sortedKeys.map(dayNumber)
  const today = dayNumber(toDayKey(now))
  const newest = days[0]

  let currentStreak = 0
  if (newest === today || newest === today - 1) {
    currentStreak = 1
    for (let i = 1; i < days.length && days[i] === days[i - 1] - 1; i++) currentStreak++
  }

  let longestStreak = 1
  let run = 1
  for (let i = 1; i < days.length; i++) {
    run = days[i] === days[i - 1] - 1 ? run + 1 : 1
    longestStreak = Math.max(longestStreak, run)
  }

  return {
    currentStreak,
    longestStreak,
    lastActivityDate: keyToDate(sortedKeys[0]).toDateString(),
    activeToday: newest === today,
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
