import type { CodingSession } from '@/types'

export interface DayMinutes {
  key: string
  weekday: string
  date: Date
  minutes: number
}

const dayKey = (time: number | Date) => {
  const d = new Date(time)
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
}

/** Coding minutes for each of the last `n` days ending today, oldest first. A session counts on the day it ended. */
export const minutesPerDay = (sessions: CodingSession[], n = 7): DayMinutes[] => {
  const totals = new Map<string, number>()
  for (const s of sessions) {
    const key = dayKey(s.end)
    totals.set(key, (totals.get(key) ?? 0) + s.duration / 60)
  }

  const days: DayMinutes[] = []
  for (let i = n - 1; i >= 0; i--) {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    date.setDate(date.getDate() - i)
    const key = dayKey(date)
    days.push({
      key,
      weekday: date.toLocaleDateString(undefined, { weekday: 'short' }),
      date,
      minutes: totals.get(key) ?? 0,
    })
  }
  return days
}

/** "45m", "1h 05m". */
export const formatMinutes = (minutes: number): string => {
  const rounded = Math.round(minutes)
  if (rounded < 60) return `${rounded}m`
  const h = Math.floor(rounded / 60)
  const m = rounded % 60
  return m === 0 ? `${h}h` : `${h}h ${m.toString().padStart(2, '0')}m`
}
