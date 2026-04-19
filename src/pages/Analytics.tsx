import { useGithubData } from '@/hooks/useGithubData'
import { useLeetCodeData } from '@/hooks/useLeetCodeData'
import { useDashboardStore } from '@/store/dashboardStore'
import CommitChart from '@/components/charts/CommitChart'
import ProblemDifficultyChart from '@/components/leetcode/ProblemDifficultyChart'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import LoadingSpinner from '@/components/common/LoadingSpinner'

const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

export const Analytics = () => {
  const { githubUsername, leetcodeUsername } = useDashboardStore()
  const { data: githubStats, isLoading: githubLoading, error: githubError } = useGithubData()
  const { score: leetcodeScore, ...leetcodeStats } = useLeetCodeData()

  if (!githubUsername && !leetcodeUsername) {
    return (
      <div className="p-8">
        <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 rounded-lg p-6 text-center">
          <p className="dark:text-blue-200">Please set your GitHub or LeetCode username in Settings to view analytics.</p>
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

  if (githubError && githubUsername) {
    return (
      <div className="p-8">
        <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <p className="text-red-700 dark:text-red-200">Could not fetch GitHub analytics data.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2 dark:text-white">Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400">Deep dive into your algorithms & development statistics</p>
      </div>

      {/* GitHub Section */}
      {githubUsername && (
        <>
          {/* Commit Trends */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Commit Trends</h2>
            <CommitChart data={githubStats?.commitsPerDay || []} />
          </div>

          {/* Language and Repos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Language Distribution - Pie Chart */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6 dark:text-white">Languages Used</h2>
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
                <p className="text-gray-500 dark:text-gray-400">No language data available</p>
              )}
            </div>

            {/* Top Repositories */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6 dark:text-white">Top Repositories</h2>
              {githubStats?.topRepos && githubStats.topRepos.length > 0 ? (
                <div className="space-y-4">
                  {githubStats.topRepos.map((repo) => (
                    <div key={repo.name} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold dark:text-white">{repo.name}</span>
                        <span className="text-yellow-600 dark:text-yellow-400 font-bold">★ {repo.stars}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No repository data available</p>
              )}
            </div>
          </div>
        </>
      )}

      {/* LeetCode Section */}
      {leetcodeUsername && (
        <>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h2 className="text-3xl font-bold mb-6 dark:text-white">Algorithm Mastery</h2>
          </div>

          {/* Problem Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProblemDifficultyChart stats={leetcodeStats} />

            {/* LeetCode Metrics */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 space-y-6">
              <h2 className="text-2xl font-bold dark:text-white">LeetCode Metrics</h2>

              <div className="space-y-4">
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Total Solved</span>
                    <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{leetcodeStats.totalSolved}</span>
                  </div>
                </div>

                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Acceptance Rate</span>
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {leetcodeStats.acceptanceRate.toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Ranking</span>
                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {leetcodeStats.ranking > 0 ? `#${leetcodeStats.ranking.toLocaleString()}` : 'N/A'}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Problem Breakdown</span>
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-green-700 dark:text-green-400">Easy</span>
                      <span className="font-bold text-green-600 dark:text-green-400">{leetcodeStats.easySolved}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-yellow-700 dark:text-yellow-400">Medium</span>
                      <span className="font-bold text-yellow-600 dark:text-yellow-400">{leetcodeStats.mediumSolved}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-700 dark:text-red-400">Hard</span>
                      <span className="font-bold text-red-600 dark:text-red-400">{leetcodeStats.hardSolved}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Analytics
