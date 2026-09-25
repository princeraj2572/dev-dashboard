const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 365 * 86400],
  ['month', 30 * 86400],
  ['week', 7 * 86400],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
]

const formatter = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' })

/** "3 hours ago", "yesterday", "last week". Falls back to "just now" under a minute. */
export const timeAgo = (date: string | number | Date, now = Date.now()): string => {
  const seconds = Math.round((new Date(date).getTime() - now) / 1000)
  const abs = Math.abs(seconds)
  for (const [unit, size] of UNITS) {
    if (abs >= size) return formatter.format(Math.round(seconds / size), unit)
  }
  return 'just now'
}
