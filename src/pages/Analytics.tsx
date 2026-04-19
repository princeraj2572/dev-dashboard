import { useGithubData } from '@/hooks/useGithubData'
import { useDashboardStore } from '@/store/dashboardStore'
import CommitChart from '@/components/charts/CommitChart'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import LoadingSpinner from '@/components/common/LoadingSpinner'

const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

export const Analytics = () => {
  const { githubUsername } = useDashboardStore()
  const { data: githubStats, isLoading, error } = useGithubData()

  if (!githubUsername) {
    return (
      <div className="p-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <p>Please set your GitHub username in Settings to view analytics.</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="p-8">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-700">Could not fetch analytics data.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Analytics</h1>
        <p className="text-gray-600">Deep dive into your GitHub statistics</p>
      </div>

      {/* Commit Trends */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Commit Trends</h2>
        <CommitChart data={githubStats?.commitsPerDay || []} />
      </div>

      {/* Language and Repos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Language Distribution - Pie Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">Languages Used</h2>
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
            <p className="text-gray-500">No language data available</p>
          )}
        </div>

        {/* Top Repositories */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">Top Repositories</h2>
          {githubStats?.topRepos && githubStats.topRepos.length > 0 ? (
            <div className="space-y-4">
              {githubStats.topRepos.map((repo) => (
                <div key={repo.name} className="border-b pb-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{repo.name}</span>
                    <span className="text-yellow-600 font-bold">★ {repo.stars}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No repository data available</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Analytics
