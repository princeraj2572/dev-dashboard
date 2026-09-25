import type { LeetCodeStats } from '@/types'
import ProblemDifficultyChart from './ProblemDifficultyChart'

interface LeetCodeStatsCardProps {
  stats: LeetCodeStats
  score: number
  isLoading: boolean
  error?: 'not-found' | 'unavailable' | null
  username?: string
}

export const LeetCodeStatsCard = ({ stats, score, isLoading, error = null, username }: LeetCodeStatsCardProps) => {
  return (
    <section aria-label="LeetCode" className="rounded-xl border border-line bg-surface p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">LeetCode</h2>
          <p className="text-sm text-subtle">Problems solved by difficulty</p>
        </div>
        {!error && !isLoading && (
          <p className="text-right">
            <span className="font-display block text-3xl font-bold leading-none tabular-nums text-amber">
              {score}
            </span>
            <span className="text-xs text-subtle">score</span>
          </p>
        )}
      </div>

      {isLoading ? (
        <div role="status" className="py-10 text-center text-sm text-subtle">
          Loading LeetCode stats
        </div>
      ) : error ? (
        <div role="alert" className="mt-5 rounded-lg bg-amber-soft p-4 text-sm">
          {error === 'not-found' ? (
            <>
              <p className="font-semibold">No LeetCode user named {username ? `"${username}"` : 'that'}</p>
              <p className="mt-0.5 text-subtle">
                Your LeetCode username can differ from your GitHub one. Check it in Settings.
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold">LeetCode stats are unavailable right now</p>
              <p className="mt-0.5 text-subtle">
                The service that supplies them did not respond. Your other stats are unaffected. It will retry
                when you reload.
              </p>
            </>
          )}
        </div>
      ) : (
        <>
          <div className="mt-5">
            <ProblemDifficultyChart stats={stats} />
          </div>
          <dl className="mt-5 grid grid-cols-3 gap-4 border-t border-line pt-4 text-sm">
            <div>
              <dt className="text-subtle">Total solved</dt>
              <dd className="font-display text-xl font-bold tabular-nums">{stats.totalSolved}</dd>
            </div>
            <div>
              <dt className="text-subtle">Acceptance</dt>
              <dd className="font-display text-xl font-bold tabular-nums">{stats.acceptanceRate.toFixed(1)}%</dd>
            </div>
            <div>
              <dt className="text-subtle">Ranking</dt>
              <dd className="font-display text-xl font-bold tabular-nums">
                {stats.ranking > 0 ? `#${stats.ranking.toLocaleString()}` : 'None'}
              </dd>
            </div>
          </dl>
        </>
      )}
    </section>
  )
}

export default LeetCodeStatsCard
