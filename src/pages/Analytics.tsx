import { useGithubData } from '@/hooks/useGithubData'
import { useLeetCodeData } from '@/hooks/useLeetCodeData'
import { useDashboardStore } from '@/store/dashboardStore'
import CommitChart from '@/components/charts/CommitChart'
import ProblemDifficultyChart from '@/components/leetcode/ProblemDifficultyChart'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import Section from '@/components/common/Section'
import Alert from '@/components/common/Alert'
import HeroSection from '@/components/common/HeroSection'
import MetricCard from '@/components/cards/MetricCard'
import GlassCard from '@/components/cards/GlassCard'

const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

export const Analytics = () => {
  const { githubUsername, leetcodeUsername } = useDashboardStore()
  const { data: githubStats, isLoading: githubLoading, error: githubError } = useGithubData()
  const { score: leetcodeScore, ...leetcodeStats } = useLeetCodeData()

  if (!githubUsername && !leetcodeUsername) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Alert
          type="info"
          title="👤 Missing Configuration"
        >
          Please set your GitHub or LeetCode username in Settings to view analytics.
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

  if (githubError && githubUsername) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Alert type="error" title="⚠️ Error Loading Data">
          Could not fetch GitHub analytics data. Please check your settings.
        </Alert>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-amber-50 to-white dark:from-slate-900 dark:via-amber-950 dark:to-slate-900">
      {/* Hero Header */}
      <HeroSection
        title="📊 Analytics & Insights"
        subtitle="Deep dive into your algorithms & development statistics"
        description="Track your progress across GitHub contributions and LeetCode problems."
        backgroundVariant="warning"
      />

      <div className="space-y-8 px-4 py-12 max-w-6xl mx-auto">
        {/* GitHub Section */}
        {githubUsername && (
          <>
            {/* GitHub Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <MetricCard
                label="Total Commits"
                value={githubStats?.commitsPerDay?.length || 0}
                icon="📝"
              />
              <MetricCard
                label="Top Languages"
                value={githubStats?.languageBreakdown?.length || 0}
                icon="📦"
              />
              <MetricCard
                label="Top Repos"
                value={githubStats?.topRepos?.length || 0}
                icon="⭐"
              />
            </div>

            {/* Commit Trends */}
            <GlassCard title="📈 Commit Trends">
              <CommitChart data={githubStats?.commitsPerDay || []} />
            </GlassCard>

            {/* Language and Repos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Language Distribution - Pie Chart */}
              <GlassCard title="💻 Languages Used">
                {githubStats?.languageBreakdown && githubStats.languageBreakdown.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={githubStats.languageBreakdown}
                        dataKey="percentage"
                        nameKey="language"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {githubStats.languageBreakdown.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${(value as number).toFixed(1)}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">No language data available</p>
                )}
              </GlassCard>

              {/* Top Repositories */}
              <GlassCard title="⭐ Top Repositories">
                {githubStats?.topRepos && githubStats.topRepos.length > 0 ? (
                  <div className="space-y-4">
                    {githubStats.topRepos.slice(0, 5).map((repo) => (
                    <div key={repo.name} className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-slate-700 last:border-0">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-white">{repo.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Repository</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-yellow-600 dark:text-yellow-400">★ {repo.stars}</p>
                      </div>
                    </div>
                  ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">No repository data available</p>
                )}
              </GlassCard>
            </div>
          </>
        )}

        {/* LeetCode Section */}
        {leetcodeUsername && (
          <>
            <Section
              title="🎯 Algorithm Mastery"
              subtitle="Track your LeetCode performance"
            />

            {/* LeetCode Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <MetricCard
                label="Total Solved"
                value={leetcodeStats?.totalSolved || 0}
                icon="✅"
                trend={{ direction: 'up', percentage: 5 }}
              />
              <MetricCard
                label="Easy Problems"
                value={leetcodeStats?.easySolved || 0}
                icon="🟢"
              />
              <MetricCard
                label="Score"
                value={leetcodeStats.totalSolved > 0 ? Math.round((leetcodeStats?.totalSolved || 0) / 4) : 0}
                icon="🏆"
                trend={{ direction: 'up', percentage: 10 }}
              />
            </div>

            {/* Problem Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProblemDifficultyChart stats={leetcodeStats} />

              {/* LeetCode Metrics */}
              <div className="space-y-4">
                <GlassCard title="Acceptance Rate">
                  <div className="text-center py-4">
                    <p className="text-5xl font-bold text-indigo-600 dark:text-indigo-400">
                      {leetcodeStats.acceptanceRate.toFixed(1)}%
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Success Rate</p>
                  </div>
                </GlassCard>
                <GlassCard title="Global Ranking">
                  <div className="text-center py-4">
                    <p className="text-5xl font-bold text-purple-600 dark:text-purple-400">
                      {leetcodeStats.ranking > 0 ? `#${leetcodeStats.ranking.toLocaleString()}` : 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Rank Worldwide</p>
                  </div>
                </GlassCard>
              </div>
            </div>

            {/* Problem Breakdown */}
            <GlassCard title="📋 Problem Breakdown">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">Easy</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">{leetcodeStats.easySolved}</p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300 mb-2">Medium</p>
                  <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{leetcodeStats.mediumSolved}</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                  <p className="text-sm font-medium text-red-700 dark:text-red-300 mb-2">Hard</p>
                  <p className="text-3xl font-bold text-red-600 dark:text-red-400">{leetcodeStats.hardSolved}</p>
                </div>
              </div>
            </GlassCard>
          </>
        )}
      </div>
    </div>
  )
}

export default Analytics
