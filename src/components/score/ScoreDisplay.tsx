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
  const total = score.githubScore + score.leetcodeScore
  const githubShare = total > 0 ? (score.githubScore / total) * 100 : 0

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
            aria-label={`GitHub ${score.githubScore}, LeetCode ${score.leetcodeScore}`}
          >
            <div className="h-full bg-white" style={{ width: `${githubShare}%` }} />
            <div className="h-full bg-[#f0b04a]" style={{ width: `${total > 0 ? 100 - githubShare : 0}%` }} />
          </div>
          <dl className="mt-3 flex gap-8 text-sm">
            <div>
              <dt className="flex items-center gap-2 text-slab-ink/70">
                <span className="size-2 rounded-full bg-white" aria-hidden="true" />
                GitHub
              </dt>
              <dd className="font-display text-2xl font-bold tabular-nums">{score.githubScore}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 text-slab-ink/70">
                <span className="size-2 rounded-full bg-[#f0b04a]" aria-hidden="true" />
                LeetCode
              </dt>
              <dd className="font-display text-2xl font-bold tabular-nums">{score.leetcodeScore}</dd>
            </div>
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
            <dt className="text-slab-ink/70">Streak bonus</dt>
            <dd className="font-display text-xl font-bold tabular-nums">{score.breakdown.streakBonus}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

export default ScoreDisplay
