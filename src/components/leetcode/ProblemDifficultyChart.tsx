import type { LeetCodeStats } from '@/types'

interface ProblemDifficultyChartProps {
  stats: LeetCodeStats
}

/** Solved problems split by difficulty: one stacked bar and three counts. */
export const ProblemDifficultyChart = ({ stats }: ProblemDifficultyChartProps) => {
  const levels = [
    { name: 'Easy', value: stats.easySolved, color: 'var(--data-1)' },
    { name: 'Medium', value: stats.mediumSolved, color: 'var(--data-2)' },
    { name: 'Hard', value: stats.hardSolved, color: 'var(--danger)' },
  ]
  const total = levels.reduce((sum, l) => sum + l.value, 0)

  return (
    <div>
      <div
        className="flex h-3 gap-0.5 overflow-hidden rounded-full bg-sunken"
        role="img"
        aria-label={levels.map((l) => `${l.name} ${l.value}`).join(', ')}
      >
        {total > 0 &&
          levels
            .filter((l) => l.value > 0)
            .map((l) => (
              <div
                key={l.name}
                style={{ width: `${(l.value / total) * 100}%`, background: l.color }}
                className="h-full first:rounded-l-full last:rounded-r-full"
              />
            ))}
      </div>
      <dl className="mt-4 grid grid-cols-3 gap-4">
        {levels.map((l) => (
          <div key={l.name}>
            <dt className="flex items-center gap-2 text-sm text-subtle">
              <span className="size-2.5 rounded-sm" style={{ background: l.color }} aria-hidden="true" />
              {l.name}
            </dt>
            <dd className="font-display text-3xl font-bold tabular-nums">{l.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default ProblemDifficultyChart
