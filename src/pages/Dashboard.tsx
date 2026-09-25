import { Link } from 'react-router-dom'
import { GitCommitHorizontal, GitPullRequest, CheckCheck, Clock } from 'lucide-react'
import { useGithubData } from '@/hooks/useGithubData'
import { useLeetCodeData } from '@/hooks/useLeetCodeData'
import { useCodingTimer } from '@/hooks/useCodingTimer'
import { useGoals } from '@/hooks/useGoals'
import { useDashboardStore } from '@/store/dashboardStore'
import { calculateTotalScore } from '@/utils/scoreCalculator'
import { calculateStreaks } from '@/utils/streakCalculator'
import { lastNDays } from '@/utils/weekActivity'
import MetricStrip from '@/components/cards/MetricStrip'
import LanguageBar from '@/components/charts/LanguageBar'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import LeetCodeStatsCard from '@/components/leetcode/LeetCodeStatsCard'
import ScoreDisplay from '@/components/score/ScoreDisplay'
import StreakDisplay from '@/components/streak/StreakDisplay'
import PageHeader from '@/components/layout/PageHeader'
import Alert from '@/components/common/Alert'
import ProgressBar from '@/components/common/ProgressBar'

const linkButton =
  'inline-flex h-11 items-center justify-center rounded-lg bg-brand px-4 text-sm font-semibold text-brand-ink transition-colors hover:brightness-110 sm:h-10'

const greeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export const Dashboard = () => {
  const { githubUsername, leetcodeUsername } = useDashboardStore()
  const { data: githubStats, isLoading: githubLoading, error: githubError } = useGithubData()
  const { score: leetcodeScore, isLoading: leetcodeLoading, error: leetcodeError, errorKind: leetcodeErrorKind, ...leetcodeStats } =
    useLeetCodeData()
  const { sessions } = useCodingTimer()
  const { goals, getGoalProgress } = useGoals()

  const combinedScore = calculateTotalScore(githubStats || null, leetcodeStats)
  const streakData = calculateStreaks(sessions)
  const week = lastNDays(githubStats?.commitsPerDay || [], 7)
  const codingHours = sessions.reduce((sum, s) => sum + s.duration, 0) / 3600

  if (!githubUsername && !leetcodeUsername) {
    return (
      <>
        <PageHeader title="Welcome to DevDash" description="Your GitHub, LeetCode, coding time and goals in one place." />
        <div className="max-w-xl rounded-xl border border-line bg-surface p-6">
          <h2 className="text-lg font-semibold">Add your usernames to get started</h2>
          <p className="mt-1.5 text-subtle">
            DevDash reads your public GitHub and LeetCode activity. No sign-in is needed, and nothing leaves
            your browser except those requests.
          </p>
          <Link to="/settings" className={`${linkButton} mt-5`}>
            Open settings
          </Link>
        </div>
      </>
    )
  }

  if (githubLoading) return <LoadingSpinner />

  const today = new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <>
      <PageHeader title={greeting()} description={today} />

      <div className="space-y-6">
        {githubError && (
          <Alert type="error" title="GitHub stats did not load">
            Check the username in <Link to="/settings" className="font-semibold underline">Settings</Link>. Without
            a token GitHub allows 60 requests an hour, so waiting a while or adding a token also helps.
          </Alert>
        )}

        <ScoreDisplay score={combinedScore} week={week} />

        <MetricStrip
          items={[
            {
              label: 'Commits this week',
              value: githubStats?.totalCommitsThisWeek ?? 0,
              icon: <GitCommitHorizontal className="size-4" />,
            },
            {
              label: 'Pull requests',
              value: githubStats?.totalPRs ?? 0,
              icon: <GitPullRequest className="size-4" />,
            },
            { label: 'Problems solved', value: leetcodeStats.totalSolved, icon: <CheckCheck className="size-4" /> },
            { label: 'Coding hours', value: codingHours.toFixed(1), icon: <Clock className="size-4" /> },
          ]}
        />

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <StreakDisplay streak={streakData} />
          </div>

          <section aria-label="Goals" className="rounded-xl border border-line bg-surface p-5 sm:p-6 lg:col-span-7">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">Goals</h2>
                <p className="text-sm text-subtle">
                  {goals.length === 0 ? 'Nothing set yet' : `${goals.length} in total`}
                </p>
              </div>
              <Link to="/goals" className="text-sm font-semibold text-brand hover:underline">
                {goals.length === 0 ? 'Create a goal' : 'View all'}
              </Link>
            </div>

            {goals.length > 0 ? (
              <ul className="mt-5 space-y-5">
                {goals.slice(0, 4).map((goal) => {
                  const progress = getGoalProgress(goal.id)
                  return (
                    <li key={goal.id}>
                      <div className="mb-2 flex items-baseline justify-between gap-3">
                        <span className="min-w-0 truncate font-medium">{goal.title}</span>
                        <span className="shrink-0 text-sm tabular-nums text-subtle">
                          {goal.current} of {goal.target} {goal.unit}
                        </span>
                      </div>
                      <ProgressBar value={progress} max={100} label={goal.title} />
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className="mt-6 max-w-sm text-subtle">
                Pick something measurable, like 20 problems this month, and track it here.
              </p>
            )}
          </section>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <section
            aria-label="Languages"
            className="rounded-xl border border-line bg-surface p-5 sm:p-6 lg:col-span-5"
          >
            <h2 className="text-lg font-semibold">Languages</h2>
            <p className="mb-5 text-sm text-subtle">Share of your public repositories</p>
            <LanguageBar languages={githubStats?.languageBreakdown || []} />
          </section>

          {leetcodeUsername && (
            <div className="lg:col-span-7">
              <LeetCodeStatsCard
                stats={leetcodeStats}
                score={leetcodeScore}
                isLoading={leetcodeLoading}
                error={leetcodeError ? leetcodeErrorKind : null}
                username={leetcodeUsername}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Dashboard
