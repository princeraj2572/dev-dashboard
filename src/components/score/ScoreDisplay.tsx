import { getScoreRank } from '@/utils/scoreCalculator'
import type { CombinedScore } from '@/utils/scoreCalculator'
import type { DayActivity } from '@/utils/weekActivity'
import WeekStrip from '@/components/charts/WeekStrip'

interface ScoreDisplayProps {
  score: CombinedScore
  week?: DayActivity[]
}

/** The one loud element on the dashboard: total score, its split, and the last week of commits. */
export const ScoreDisplay = ({ score, week }: ScoreDisplayProps) => {
  const rankLabel = getScoreRank(score.totalScore)
  const parts = [
    { name: 'GitHub', value: score.githubScore, bar: 'bg-white' },
    { name: 'LeetCode', value: score.leetcodeScore, bar: 'bg-[#f0b04a]' },
    { name: 'Streak', value: score.streakScore, bar: 'bg-white/45' },
  ]
  const total = parts.reduce((sum, p) => sum + p.value, 0)

  return (
    <section
      aria-label="Total score"
      className="animate-rise grid gap-8 rounded-2xl bg-slab p-6 text-slab-ink sm:p-8 lg:grid-cols-[1fr_minmax(280px,360px)] lg:gap-12"
    >
      <div className="flex min-w-0 flex-col">
        <p className="flex items-center gap-2.5 text-sm text-slab-ink/70">
          Total score
          <span className="rounded-md bg-white/15 px-2 py-0.5 font-semibold text-slab-ink">{rankLabel}</span>
        </p>
        <p className="font-display mt-2 text-8xl font-extrabold leading-[0.85] tracking-tighter tabular-nums sm:text-9xl">
          {score.totalScore}
        </p>

        <div className="mt-8">
          <div
            className="flex h-2 overflow-hidden rounded-full bg-white/15"
            role="img"
            aria-label={parts.map((p) => `${p.name} ${p.value}`).join(', ')}
          >
            {total > 0 &&
              parts.map((p) => (
                <div key={p.name} className={`h-full ${p.bar}`} style={{ width: `${(p.value / total) * 100}%` }} />
              ))}
          </div>
          <dl className="mt-3 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {parts.map((p) => (
              <div key={p.name}>
                <dt className="flex items-center gap-2 text-slab-ink/70">
                  <span className={`size-2 rounded-full ${p.bar}`} aria-hidden="true" />
                  {p.name}
                </dt>
                <dd className="font-display text-2xl font-bold tabular-nums">{p.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="flex min-w-0 flex-col justify-between gap-6">
        {week && (
          <div>
            <p className="mb-3 text-sm text-slab-ink/70">Commits, last 7 days</p>
            <WeekStrip days={week} onDark />
          </div>
        )}
        <dl className="grid grid-cols-3 gap-4 border-t border-white/15 pt-5 text-sm">
          <div>
            <dt className="text-slab-ink/70">Commits</dt>
            <dd className="font-display text-xl font-bold tabular-nums">{score.breakdown.commits}</dd>
          </div>
          <div>
            <dt className="text-slab-ink/70">Solved</dt>
            <dd className="font-display text-xl font-bold tabular-nums">
              {score.breakdown.leetcodeProblems}
            </dd>
          </div>
          <div>
            <dt className="text-slab-ink/70">Pull requests</dt>
            <dd className="font-display text-xl font-bold tabular-nums">{score.breakdown.prs}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

export default ScoreDisplay
