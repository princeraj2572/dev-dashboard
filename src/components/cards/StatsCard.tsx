interface StatsCardProps {
  title: string
  value: number | string
  unit?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
}

export const StatsCard = ({
  title,
  value,
  unit,
  trend = 'neutral',
  trendValue,
}: StatsCardProps) => {
  const trendColor = {
    up: 'text-green-600 dark:text-green-400',
    down: 'text-red-600 dark:text-red-400',
    neutral: 'text-gray-600 dark:text-gray-400',
  }

  const trendIcon = {
    up: '↑',
    down: '↓',
    neutral: '→',
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 border-l-4 border-indigo-500 dark:border-indigo-400">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{title}</p>
          <div className="mt-2 flex items-baseline">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">{value}</span>
            {unit && <span className="ml-2 text-gray-600 dark:text-gray-400">{unit}</span>}
          </div>
        </div>
        {trend && trendValue && (
          <div className={`text-lg font-semibold ${trendColor[trend]}`}>
            {trendIcon[trend]} {trendValue}
          </div>
        )}
      </div>
    </div>
  )
}

export default StatsCard
