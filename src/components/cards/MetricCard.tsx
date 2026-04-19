interface MetricCardProps {
  label: string
  value: string | number
  icon: string
  trend?: {
    direction: 'up' | 'down'
    percentage: number
  }
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'pink'
  className?: string
}

export const MetricCard = ({
  label,
  value,
  icon,
  trend,
  color = 'blue',
  className = '',
}: MetricCardProps) => {
  const colorStyles = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
    pink: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400',
  }

  return (
    <div className={`bg-white dark:bg-slate-800 rounded-lg p-6 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-3">
              <span className={trend.direction === 'up' ? 'text-green-600' : 'text-red-600'}>
                {trend.direction === 'up' ? '↑' : '↓'} {trend.percentage}%
              </span>
            </div>
          )}
        </div>
        <div className={`${colorStyles[color]} p-4 rounded-lg text-2xl`}>{icon}</div>
      </div>
    </div>
  )
}

export default MetricCard
