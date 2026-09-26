import type { GithubStats } from '@/types'
import { toDayKey } from '@/utils/streakCalculator'

/**
 * GitHub's events API only returns a short rolling window (about 90 events for a
 * busy account), and every new push pushes older days out of it. Streaks and the
 * weekly commit strip would therefore shrink the more you code. To avoid that,
 * each load is merged into a per-day history kept in this browser.
 *
 * For each day we keep the highest commit count ever seen, so a day that later
 * falls partly out of the window is never reduced.
 */
const STORAGE_KEY = 'github_activity_history_v1'
const KEEP_DAYS = 400

type History = Record<string, Record<string, number>> // username -> day -> commits

const readHistory = (): History => {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {}
  } catch {
    return {}
  }
}

const writeHistory = (history: History) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  } catch {
    // Storage full or unavailable: the app still works from the current window.
  }
}

/** Returns the stats with active days and the 7-day commit strip taken from the merged history. */
export const applyActivityHistory = (username: string, stats: GithubStats, now: number = Date.now()): GithubStats => {
  const history = readHistory()
  const merged: Record<string, number> = { ...(history[username] ?? {}) }

  for (const [day, count] of Object.entries(stats.dayCounts)) {
    merged[day] = Math.max(merged[day] ?? 0, count)
  }

  const oldest = toDayKey(now - KEEP_DAYS * 86400000)
  for (const day of Object.keys(merged)) {
    if (day < oldest) delete merged[day]
  }

  history[username] = merged
  writeHistory(history)

  // The last seven calendar days ending today, from the merged counts.
  const commitsPerDay: { day: string; count: number }[] = []
  let totalCommitsThisWeek = 0
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now)
    date.setHours(0, 0, 0, 0)
    date.setDate(date.getDate() - i)
    const count = merged[toDayKey(date)] ?? 0
    if (count > 0) {
      commitsPerDay.push({ day: date.toLocaleDateString(), count })
      totalCommitsThisWeek += count
    }
  }

  return { ...stats, dayCounts: merged, activeDays: Object.keys(merged), commitsPerDay, totalCommitsThisWeek }
}
