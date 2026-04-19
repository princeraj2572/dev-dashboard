import { useGithubData } from '@/hooks/useGithubData'
import { useLeetCodeData } from '@/hooks/useLeetCodeData'
import { useCodingTimer } from '@/hooks/useCodingTimer'
import { useGoals } from '@/hooks/useGoals'
import { useDashboardStore } from '@/store/dashboardStore'
import { calculateTotalScore } from '@/utils/scoreCalculator'
import { calculateStreaks } from '@/utils/streakCalculator'
import StatsCard from '@/components/cards/StatsCard'
import CommitChart from '@/components/charts/CommitChart'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import ActivityFeed from '@/components/common/ActivityFeed'
import LeetCodeStatsCard from '@/components/leetcode/LeetCodeStatsCard'
import ProblemDifficultyChart from '@/components/leetcode/ProblemDifficultyChart'
import ScoreDisplay from '@/components/score/ScoreDisplay'
import StreakDisplay from '@/components/streak/StreakDisplay'
import Section from '@/components/common/Section'
import Card from '@/components/common/Card'
import Alert from '@/components/common/Alert'
import Button from '@/components/common/Button'
import ProgressBar from '@/components/common/ProgressBar'

export const Dashboard = () => {
  const { githubUsername, leetcodeUsername } = useDashboardStore()
  const { data: githubStats, isLoading: githubLoading, error: githubError } = useGithubData()
  const { score: leetcodeScore, ...leetcodeStats } = useLeetCodeData()
  const { sessions } = useCodingTimer()
  const { goals, getGoalProgress } = useGoals()

  // Calculate combined score
  const combinedScore = calculateTotalScore(githubStats || null, {
    ...leetcodeStats,
    score: leetcodeScore,
  } as any)

  // Calculate streaks from coding sessions
  const streakData = calculateStreaks(sessions)

  const hasNoProfiles = !githubUsername && !leetcodeUsername

  if (hasNoProfiles) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <Alert
          type="info"
          title="👋 Welcome to DevDash!"
        >
          <p className="mb-4">
            To get started, please enter your GitHub and LeetCode usernames in the Settings page to unlock your personalized dashboard.
          </p>
          <Button
            onClick={() => window.location.href = '/settings'}
            className="mt-4"
          >
            Go to Settings
          </Button>
        </Alert>
      </div>
    )
  }

  if (githubLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (githubError) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Alert type="error" title="⚠️ Error Loading Data">
          <p>
            Could not fetch GitHub data. Please check your token and username in
            {' '}
            <a href="/settings" className="underline font-semibold hover:text-red-600">Settings</a>
            .
          </p>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-8 px-4 py-8">
      {/* Header */}
      <Section
        title="Welcome, Developer! 🚀"
        subtitle="Track your productivity and coding progress in real-time"
      />

      {/* Score Display - Prominent */}
      <ScoreDisplay score={combinedScore} />

      {/* Streak & Goals Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StreakDisplay streak={streakData} />

        {/* Goals Overview */}
        <Card>
          <Section
            title="🎯 Goals Progress"
            subtitle="Stay on track with your development goals"
          />

          {goals.length > 0 ? (
            <div className="space-y-4 mt-6">
              {goals.slice(0, 3).map((goal) => {
                const progress = getGoalProgress(goal.id)
                const isCompleted = progress >= 100
                return (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-sm text-gray-900 dark:text-white">
                        {goal.title}
                      </span>
                      <span className={`text-xs font-bold ${isCompleted ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
                        {goal.current}/{goal.target}
                      </span>
                    </div>
                    <ProgressBar
                      value={goal.current}
                      max={goal.target}
                      variant={isCompleted ? 'success' : 'primary'}
                    />
                  </div>
                )
              })}

              <a
                href="/goals"
                className="inline-block mt-4 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm font-semibold"
              >
                View All Goals →
              </a>
            </div>
          ) : (
            <div className="text-center py-8 mt-6">
              <p className="text-gray-600 dark:text-gray-400 mb-4">No goals yet</p>
              <Button
                onClick={() => window.location.href = '/goals'}
                variant="primary"
                size="sm"
              >
                Create Your First Goal
              </Button>
            </div>
          )}
        </Card>
      </div>

      {/* Stats Row */}
      <div>
        <Section title="📊 Key Metrics" subtitle="Your productivity at a glance" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <StatsCard
            title="Commits This Week"
            value={githubStats?.totalCommitsThisWeek || 0}
            unit="commits"
            icon="📝"
            trend="up"
            change={5}
          />
          <StatsCard
            title="Pull Requests"
            value={githubStats?.totalPRs || 0}
            unit="PRs"
            icon="🔀"
            trend="neutral"
            change={0}
          />
          <StatsCard
            title="Problems Solved"
            value={leetcodeStats.totalSolved || 0}
            unit="problems"
            icon="✅"
            trend="up"
            change={2}
          />
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CommitChart data={githubStats?.commitsPerDay || []} />
        <Card>
          <h3 className="text-lg font-bold mb-6 dark:text-white">💻 Language Breakdown</h3>
          {githubStats?.languageBreakdown && githubStats.languageBreakdown.length > 0 ? (
            <div className="space-y-4">
              {githubStats.languageBreakdown.map((lang) => (
                <div key={lang.language}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium dark:text-white">{lang.language}</span>
                    <span className="text-gray-600 dark:text-gray-400">{lang.percentage.toFixed(1)}%</span>
                  </div>
                  <ProgressBar
                    value={lang.percentage}
                    max={100}
                    variant="primary"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">No language data available</p>
          )}
        </Card>
      </div>

      {/* LeetCode Section */}
      {leetcodeUsername && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LeetCodeStatsCard stats={leetcodeStats} score={leetcodeScore} isLoading={false} />
          <ProblemDifficultyChart stats={leetcodeStats} />
        </div>
      )}

      {/* Activity Feed */}
      <ActivityFeed />
    </div>
  )
}

export default Dashboard
