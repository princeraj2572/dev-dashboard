import { activityLevel, type DayActivity } from '@/utils/weekActivity'

interface WeekStripProps {
  days: DayActivity[]
  /** Use translucent-white cells for placement on the dark slab. */
  onDark?: boolean
  className?: string
}

const lightCells = ['bg-cell-0', 'bg-cell-1', 'bg-cell-2', 'bg-cell-3', 'bg-cell-4']
const darkCells = ['bg-white/10', 'bg-white/25', 'bg-white/45', 'bg-white/70', 'bg-white']

/** Seven contribution-style cells, one per day, oldest to newest. */
export const WeekStrip = ({ days, onDark = false, className = '' }: WeekStripProps) => {
  const cells = onDark ? darkCells : lightCells
  return (
    <ol className={`grid grid-cols-7 gap-1.5 sm:gap-2 ${className}`} aria-label="Commits in the last 7 days">
      {days.map((day) => (
        <li key={day.key} className="min-w-0">
          <div
            role="img"
            aria-label={`${day.weekday}: ${day.count} ${day.count === 1 ? 'commit' : 'commits'}`}
            title={`${day.weekday}: ${day.count}`}
            className={`grid aspect-square place-items-center rounded-md text-xs font-semibold tabular-nums ${
              cells[activityLevel(day.count)]
            } ${
              day.count > 0 && activityLevel(day.count) >= 3
                ? onDark
                  ? 'text-slab'
                  : 'text-white'
                : onDark
                  ? 'text-slab-ink/70'
                  : 'text-subtle'
            }`}
          >
            {day.count > 0 ? day.count : ''}
          </div>
          <p className={`mt-1.5 text-center text-xs ${onDark ? 'text-slab-ink/70' : 'text-subtle'}`}>
            {day.weekday}
          </p>
        </li>
      ))}
    </ol>
  )
}

export default WeekStrip
