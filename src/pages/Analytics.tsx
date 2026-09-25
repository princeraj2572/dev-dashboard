import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { useGithubData } from '@/hooks/useGithubData'
import { useLeetCodeData } from '@/hooks/useLeetCodeData'
import { useDashboardStore } from '@/store/dashboardStore'
import CommitChart from '@/components/charts/CommitChart'
import LanguageBar from '@/components/charts/LanguageBar'
import MetricStrip from '@/components/cards/MetricStrip'
import ProblemDifficultyChart from '@/components/leetcode/ProblemDifficultyChart'
import PageHeader from '@/components/layout/PageHeader'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import Alert from '@/components/common/Alert'

const panel = 'rounded-xl border border-line bg-surface p-5 sm:p-6'

export const Analytics = () => {
  const { githubUsername, leetcodeUsername } = useDashboardStore()
  const { data: githubStats, isLoading: githubLoading, error: githubError } = useGithubData()
  const { score: leetcodeScore, isLoading: leetcodeLoading, error: leetcodeError, errorKind: leetcodeErrorKind, ...leetcodeStats } =
    useLeetCodeData()

  if (!githubUsername && !leetcodeUsername) {
    return (
      <>
        <PageHeader title="Analytics" />
        <Alert type="info" title="No usernames yet">
          Add your GitHub or LeetCode username in{' '}
          <Link to="/settings" className="font-semibold underline">
            Settings
          </Link>{' '}
          to see your analytics.
        </Alert>
      </>
    )
  }

  if (githubLoading) return <LoadingSpinner />

  return (
    <>
      <PageHeader title="Analytics" description="Commit activity, languages and problem solving over time." />

      <div className="space-y-10">
        {githubUsername && (
          <section aria-labelledby="github-heading" className="space-y-6">
            <h2 id="github-heading" className="text-xl font-semibold">
              GitHub
            </h2>

            {githubError && (
              <Alert type="error" title="GitHub stats did not load">
                Check the username in{' '}
                <Link to="/settings" className="font-semibold underline">
                  Settings
                </Link>
                , or try again later if you have hit GitHub&apos;s hourly limit.
              </Alert>
            )}

            <MetricStrip
              items={[
                { label: 'Commits this week', value: githubStats?.totalCommitsThisWeek ?? 0 },
                { label: 'Pull requests', value: githubStats?.totalPRs ?? 0 },
                { label: 'Languages', value: githubStats?.languageBreakdown?.length ?? 0 },
                { label: 'Top repositories', value: githubStats?.topRepos?.length ?? 0 },
              ]}
            />

            <div className={panel}>
              <h3 className="text-lg font-semibold">Commits per day</h3>
              <p className="mb-4 text-sm text-subtle">Last 7 days</p>
              <CommitChart data={githubStats?.commitsPerDay || []} />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className={panel}>
                <h3 className="text-lg font-semibold">Languages</h3>
                <p className="mb-5 text-sm text-subtle">Share of your public repositories</p>
                <LanguageBar languages={githubStats?.languageBreakdown || []} limit={6} />
              </div>

              <div className={panel}>
                <h3 className="text-lg font-semibold">Top repositories</h3>
                <p className="mb-2 text-sm text-subtle">Ranked by stars</p>
                {githubStats?.topRepos && githubStats.topRepos.length > 0 ? (
                  <ul className="divide-y divide-line">
                    {githubStats.topRepos.slice(0, 6).map((repo) => (
                      <li key={repo.name} className="flex items-center justify-between gap-4 py-3">
                        <span className="min-w-0 truncate font-medium">{repo.name}</span>
                        <span className="flex shrink-0 items-center gap-1 text-sm tabular-nums text-subtle">
                          <Star className="size-4" aria-hidden="true" />
                          {repo.stars}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="py-8 text-center text-sm text-subtle">No public repositories found.</p>
                )}
              </div>
            </div>
          </section>
        )}

        {leetcodeUsername && (
          <section aria-labelledby="leetcode-heading" className="space-y-6">
            <h2 id="leetcode-heading" className="text-xl font-semibold">
              LeetCode
            </h2>

            {leetcodeError ? (
              leetcodeErrorKind === 'not-found' ? (
                <Alert type="warning" title={`No LeetCode user named "${leetcodeUsername}"`}>
                  Your LeetCode username can differ from your GitHub one. Check it in{' '}
                  <Link to="/settings" className="font-semibold underline">
                    Settings
                  </Link>
                  .
                </Alert>
              ) : (
                <Alert type="warning" title="LeetCode stats are unavailable right now">
                  The service that supplies them did not respond. Reload later to try again.
                </Alert>
              )
            ) : (
              <>
                <MetricStrip
                  items={[
                    { label: 'Problems solved', value: leetcodeLoading ? '...' : leetcodeStats.totalSolved },
                    {
                      label: 'Acceptance rate',
                      value: leetcodeLoading ? '...' : `${leetcodeStats.acceptanceRate.toFixed(1)}%`,
                    },
                    {
                      label: 'Global ranking',
                      value:
                        leetcodeLoading || leetcodeStats.ranking <= 0
                          ? leetcodeLoading
                            ? '...'
                            : 'None'
                          : `#${leetcodeStats.ranking.toLocaleString()}`,
                    },
                    { label: 'Score', value: leetcodeLoading ? '...' : leetcodeScore },
                  ]}
                />

                <div className={panel}>
                  <h3 className="text-lg font-semibold">Difficulty</h3>
                  <p className="mb-5 text-sm text-subtle">Solved problems by level</p>
                  <ProblemDifficultyChart stats={leetcodeStats} />
                </div>
              </>
            )}
          </section>
        )}
      </div>
    </>
  )
}

export default Analytics
