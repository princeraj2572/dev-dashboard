export interface DayActivity {
  key: string
  weekday: string
  date: Date
  count: number
}

/**
 * Builds the last `n` calendar days ending today, oldest first, filling days
 * without commits with zero. `commitsPerDay` keys come from toLocaleDateString().
 */
export const lastNDays = (
  commitsPerDay: { day: string; count: number }[],
  n = 7
): DayActivity[] => {
  const counts = new Map(commitsPerDay.map((d) => [d.day, d.count]))
  const days: DayActivity[] = []
  for (let i = n - 1; i >= 0; i--) {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    date.setDate(date.getDate() - i)
    const key = date.toLocaleDateString()
    days.push({
      key,
      weekday: date.toLocaleDateString(undefined, { weekday: 'short' }),
      date,
      count: counts.get(key) ?? 0,
    })
  }
  return days
}

/** Maps a commit count to one of five intensity levels (0-4). */
export const activityLevel = (count: number): 0 | 1 | 2 | 3 | 4 => {
  if (count <= 0) return 0
  if (count === 1) return 1
  if (count <= 3) return 2
  if (count <= 6) return 3
  return 4
}
