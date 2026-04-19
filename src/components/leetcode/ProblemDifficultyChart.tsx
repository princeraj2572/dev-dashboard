import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import type { LeetCodeStats } from '@/types'

interface ProblemDifficultyChartProps {
  stats: LeetCodeStats
}

export const ProblemDifficultyChart = ({ stats }: ProblemDifficultyChartProps) => {
  const data = [
    { name: 'Easy', value: stats.easySolved, color: '#10b981' },
    { name: 'Medium', value: stats.mediumSolved, color: '#f59e0b' },
    { name: 'Hard', value: stats.hardSolved, color: '#ef4444' },
  ]

  const total = stats.totalSolved
  if (total === 0) {
    return (
      <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-8 text-center border border-dashed border-gray-300 dark:border-gray-600 h-80 flex items-center justify-center\">
        <p className="text-gray-600 dark:text-gray-400">No LeetCode problems solved yet. Time to start grinding! 💪</p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 h-80">
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white\">Problem Distribution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell key={`cell-${entry.name}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ProblemDifficultyChart
