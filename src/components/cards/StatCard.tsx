interface StatCardProps {
  title: string
  value: string | number
  unit?: string
  change?: number
  trend?: 'up' | 'down' | 'neutral'
  icon?: string
  className?: string
}

export const StatCard = ({
  title,
  value,
  unit,
  change,
  trend = 'neutral',
  icon,
  className = '',
}: StatCardProps) => {
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
    <div className={`bg-white dark:bg-slate-800 rounded-lg shadow p-6 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">{value}</span>
            {unit && <span className="text-gray-500 dark:text-gray-400 text-sm">{unit}</span>}
          </div>
          {change !== undefined && (
            <p className={`mt-2 text-sm font-medium ${trendColor[trend]}`}>
              <span>{trendIcon[trend]}</span>
              {' '}
              {Math.abs(change)}%
            </p>
          )}
        </div>
        {icon && <span className="text-3xl">{icon}</span>}
      </div>
    </div>
  )
}

export default StatCard
