import { useGithubData } from '@/hooks/useGithubData'
import { useLeetCodeData } from '@/hooks/useLeetCodeData'
import { useCodingTimer } from '@/hooks/useCodingTimer'
import { useGoals } from '@/hooks/useGoals'
import { useDashboardStore } from '@/store/dashboardStore'
import { calculateTotalScore } from '@/utils/scoreCalculator'
import { calculateStreaks } from '@/utils/streakCalculator'
import { Button } from '@/components/ui/button'
import MetricCard from '@/components/cards/MetricCard'
import CommitChart from '@/components/charts/CommitChart'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import ActivityFeed from '@/components/common/ActivityFeed'
import LeetCodeStatsCard from '@/components/leetcode/LeetCodeStatsCard'
import ProblemDifficultyChart from '@/components/leetcode/ProblemDifficultyChart'
import ScoreDisplay from '@/components/score/ScoreDisplay'
import StreakDisplay from '@/components/streak/StreakDisplay'
import Section from '@/components/common/Section'
import { Card } from '@/components/ui/card'
import Alert from '@/components/common/Alert'
import Badge from '@/components/common/Badge'
import ProgressBar from '@/components/common/ProgressBar'
import HeroSection from '@/components/common/HeroSection'

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
        <HeroSection
          title="Welcome to DevDash! 🚀"
          subtitle="Your Personal Developer Productivity Hub"
          description="Track your GitHub contributions, LeetCode progress, coding sessions, and personal goals all in one place."
          ctaText="Get Started"
          ctaAction={() => window.location.href = '/settings'}
          backgroundVariant="primary"
        />
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
      {/* Welcome Hero */}
      <HeroSection
        title={`Welcome back, Developer! 🎉`}
        subtitle="Here's your productivity summary"
        backgroundVariant="primary"
      />

      {/* Score Display - Prominent */}
      <ScoreDisplay score={combinedScore} />

      {/* Quick Stats Grid */}
      <div>
        <Section title="📊 Quick Stats" subtitle="Key metrics at a glance" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <MetricCard
            label="Commits This Week"
            value={githubStats?.totalCommitsThisWeek || 0}
            icon="📝"
            color="blue"
            trend={{ direction: 'up', percentage: 12 }}
          />
          <MetricCard
            label="Pull Requests"
            value={githubStats?.totalPRs || 0}
            icon="🔀"
            color="purple"
            trend={{ direction: 'up', percentage: 5 }}
          />
          <MetricCard
            label="Problems Solved"
            value={leetcodeStats.totalSolved || 0}
            icon="✅"
            color="green"
            trend={{ direction: 'up', percentage: 8 }}
          />
          <MetricCard
            label="Coding Hours"
            value={sessions.length > 0 ? sessions.reduce((sum, s) => sum + s.duration, 0) / 3600 : 0}
            icon="⏳"
            color="orange"
            trend={{ direction: 'up', percentage: 3 }}
          />
        </div>
      </div>

      {/* Streaks & Goals Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StreakDisplay streak={streakData} />

        {/* Goals Overview */}
        <Card>
          <Section
            title="🎯 Active Goals"
            subtitle={`${goals.length} total goals`}
          />

          {goals.length > 0 ? (
            <div className="space-y-4 mt-6">
              {goals.slice(0, 3).map((goal) => {
                const progress = getGoalProgress(goal.id)
                const isCompleted = progress >= 100
                return (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <span className="font-semibold text-sm text-gray-900 dark:text-white">
                          {goal.title}
                        </span>
                      </div>
                      <Badge variant={isCompleted ? 'success' : 'info'}>
                        {goal.current}/{goal.target}
                      </Badge>
                    </div>
                    <ProgressBar
                      value={goal.current}
                      max={goal.target}
                      variant={isCompleted ? 'success' : 'primary'}
                    />
                  </div>
                )
              })}

              <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.location.href = '/goals'}
                  className="w-full"
                >
                  View All Goals →
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 mt-6">
              <p className="text-gray-600 dark:text-gray-400 mb-4">No goals yet</p>
              <Button
                onClick={() => window.location.href = '/goals'}
                size="sm"
              >
                Create First Goal
              </Button>
            </div>
          )}
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-2xl font-bold mb-6 dark:text-white">📈 Commit Trends</h3>
          <CommitChart data={githubStats?.commitsPerDay || []} />
        </Card>

        <Card>
          <h3 className="text-2xl font-bold mb-6 dark:text-white">💻 Language Breakdown</h3>
          {githubStats?.languageBreakdown && githubStats.languageBreakdown.length > 0 ? (
            <div className="space-y-4">
              {githubStats.languageBreakdown.slice(0, 5).map((lang) => (
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
