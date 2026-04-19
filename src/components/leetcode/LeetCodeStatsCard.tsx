import type { LeetCodeStats } from '@/types'

interface LeetCodeStatsCardProps {
  stats: LeetCodeStats
  score: number
  isLoading: boolean
}

export const LeetCodeStatsCard = ({ stats, score, isLoading }: LeetCodeStatsCardProps) => {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 h-80 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-orange-50 dark:from-orange-900 to-yellow-50 dark:to-yellow-900 rounded-lg shadow p-8 border border-orange-200 dark:border-orange-700">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-orange-200">LeetCode Profile</h3>
          <p className="text-gray-600 dark:text-orange-300 text-sm mt-1">DSA & Algorithm Mastery</p>
        </div>

        {/* Score Display */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-orange-300 dark:border-orange-600">
          <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold mb-2">LeetCode Score</p>
          <div className="text-5xl font-bold text-orange-600 dark:text-orange-400">{score}</div>
        </div>

        {/* Problem Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-100 dark:bg-green-900 rounded-lg p-4 border border-green-300 dark:border-green-700">
            <p className="text-xs text-gray-700 dark:text-green-200 font-semibold mb-2">Easy</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.easySolved}</p>
          </div>
          <div className="bg-yellow-100 dark:bg-yellow-900 rounded-lg p-4 border border-yellow-300 dark:border-yellow-700">
            <p className="text-xs text-gray-700 dark:text-yellow-200 font-semibold mb-2">Medium</p>
            <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats.mediumSolved}</p>
          </div>
          <div className="bg-red-100 dark:bg-red-900 rounded-lg p-4 border border-red-300 dark:border-red-700">
            <p className="text-xs text-gray-700 dark:text-red-200 font-semibold mb-2">Hard</p>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">{stats.hardSolved}</p>
          </div>
        </div>

        {/* Metrics */}
        <div className="space-y-3">
          <div className="flex justify-between items-center border-b border-gray-300 dark:border-gray-600 pb-3">
            <span className="text-gray-700 dark:text-gray-300">Total Solved</span>
            <span className="font-bold text-lg text-gray-900 dark:text-white">{stats.totalSolved}</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-300 dark:border-gray-600 pb-3">
            <span className="text-gray-700 dark:text-gray-300">Acceptance Rate</span>
            <span className="font-bold text-lg text-gray-900 dark:text-white">{stats.acceptanceRate.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">Ranking</span>
            <span className="font-bold text-lg text-gray-900 dark:text-white">
              {stats.ranking > 0 ? `#${stats.ranking.toLocaleString()}` : 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeetCodeStatsCard
