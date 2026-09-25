import type { StreakData } from '@/utils/streakCalculator'
import ProgressBar from '@/components/common/ProgressBar'
import { formatMinutes } from '@/utils/timeStats'

interface StreakDisplayProps {
  streak: StreakData
  /** Today's coding time against the daily target. */
  today?: { minutes: number; target: number }
}

export const StreakDisplay = ({ streak, today }: StreakDisplayProps) => {
  const filled = Math.min(streak.currentStreak, 7)
  const message =
    streak.currentStreak === 0
      ? 'Log a coding session today to start a streak.'
      : streak.currentStreak >= streak.longestStreak
        ? 'This is your longest streak yet.'
        : `${streak.longestStreak - streak.currentStreak} more ${
            streak.longestStreak - streak.currentStreak === 1 ? 'day' : 'days'
          } to beat your best.`

  return (
    <section aria-label="Coding streak" className="rounded-xl border border-line bg-surface p-5 sm:p-6">
      <h2 className="text-lg font-semibold">Streak</h2>

      <p className="mt-4 flex items-baseline gap-2">
        <span className="font-display text-7xl font-extrabold leading-none tracking-tight tabular-nums">
          {streak.currentStreak}
        </span>
        <span className="text-subtle">{streak.currentStreak === 1 ? 'day' : 'days'} in a row</span>
      </p>

      <div
        className="mt-5 grid grid-cols-7 gap-1.5"
        role="img"
        aria-label={`${filled} of the last 7 days logged`}
      >
        {Array.from({ length: 7 }, (_, i) => (
          <span
            key={i}
            className={`aspect-[3/2] rounded-md ${i < filled ? 'bg-brand' : 'bg-cell-0'}`}
          />
        ))}
      </div>

      <p className="mt-4 text-sm text-subtle">{message}</p>

      {today && (
        <div className="mt-5 border-t border-line pt-4">
          <div className="mb-2 flex items-baseline justify-between text-sm">
            <span className="text-subtle">Today</span>
            <span className="font-medium tabular-nums">
              {formatMinutes(today.minutes)} of {formatMinutes(today.target)}
            </span>
          </div>
          <ProgressBar value={Math.min(today.minutes, today.target)} max={today.target} label="Today's coding time" />
        </div>
      )}

      <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-4 text-sm">
        <div>
          <dt className="text-subtle">Best streak</dt>
          <dd className="font-display text-xl font-bold tabular-nums">{streak.longestStreak} days</dd>
        </div>
        <div>
          <dt className="text-subtle">Last session</dt>
          <dd className="font-display text-xl font-bold">
            {streak.lastActivityDate
              ? new Date(streak.lastActivityDate).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                })
              : 'None yet'}
          </dd>
        </div>
      </dl>
    </section>
  )
}

export default StreakDisplay
