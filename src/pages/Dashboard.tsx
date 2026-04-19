import { useGithubData } from '@/hooks/useGithubData'
import { useLeetCodeData } from '@/hooks/useLeetCodeData'
import { useDashboardStore } from '@/store/dashboardStore'
import { calculateTotalScore } from '@/utils/scoreCalculator'
import StatsCard from '@/components/cards/StatsCard'
import CommitChart from '@/components/charts/CommitChart'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import ActivityFeed from '@/components/common/ActivityFeed'
import LeetCodeStatsCard from '@/components/leetcode/LeetCodeStatsCard'
import ProblemDifficultyChart from '@/components/leetcode/ProblemDifficultyChart'
import ScoreDisplay from '@/components/score/ScoreDisplay'

export const Dashboard = () => {
  const { githubUsername, leetcodeUsername } = useDashboardStore()
  const { data: githubStats, isLoading: githubLoading, error: githubError } = useGithubData()
  const { score: leetcodeScore, ...leetcodeStats } = useLeetCodeData()

  // Calculate combined score
  const combinedScore = calculateTotalScore(githubStats || null, {
    ...leetcodeStats,
    score: leetcodeScore,
  } as any)

  const hasNoProfiles = !githubUsername && !leetcodeUsername

  if (hasNoProfiles) {
    return (
      <div className="p-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Hello! 👋</h2>
          <p className="text-gray-700 mb-4">
            To get started, please enter your GitHub and LeetCode usernames in the Settings page.
          </p>
          <a
            href="/settings"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Go to Settings
          </a>
        </div>
      </div>
    )
  }

  if (githubLoading) {
    return (
      <div className="p-8">
        <LoadingSpinner />
      </div>
    )
  }

  if (githubError) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Data</h2>
          <p className="text-red-700">
            Could not fetch GitHub data. Please check your token and username in Settings.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Welcome, Developer! 🚀</h1>
        <p className="text-gray-600">Track your productivity and coding progress</p>
      </div>

      {/* Score Display - Prominent */}
      <ScoreDisplay score={combinedScore} />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Commits This Week"
          value={githubStats?.totalCommitsThisWeek || 0}
          unit="commits"
          trend="up"
          trendValue={githubStats ? '+5' : '0'}
        />
        <StatsCard
          title="Pull Requests"
          value={githubStats?.totalPRs || 0}
          unit="PRs"
          trend="neutral"
        />
        <StatsCard
          title="Problems Solved"
          value={leetcodeStats.totalSolved || 0}
          unit="problems"
          trend="up"
          trendValue="+2"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CommitChart data={githubStats?.commitsPerDay || []} />
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold mb-4">Language Breakdown</h3>
          {githubStats?.languageBreakdown && githubStats.languageBreakdown.length > 0 ? (
            <div className="space-y-3">
              {githubStats.languageBreakdown.map((lang) => (
                <div key={lang.language}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{lang.language}</span>
                    <span className="text-gray-600">{lang.percentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-500 h-2 rounded-full"
                      style={{ width: `${lang.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No language data available</p>
          )}
        </div>
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
