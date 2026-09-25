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
    blue: 'from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-900/10 text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30',
    green: 'from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-900/10 text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30',
    purple: 'from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-900/10 text-purple-700 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30',
    orange: 'from-orange-50 to-orange-100/50 dark:from-orange-900/20 dark:to-orange-900/10 text-orange-700 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30',
    pink: 'from-pink-50 to-pink-100/50 dark:from-pink-900/20 dark:to-pink-900/10 text-pink-700 dark:text-pink-400 bg-pink-100 dark:bg-pink-900/30',
  }

  return (
    <div className={`bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-slate-700 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{label}</p>
          <p className="text-4xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${colorStyles[color].split(' ').slice(0, 2).join(' ')}`}>
          {icon}
        </div>
      </div>
      
      {trend && (
        <div className="flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-slate-700">
          <span className={`text-sm font-semibold ${trend.direction === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {trend.direction === 'up' ? '↑' : '↓'} {trend.percentage}%
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">vs last period</span>
        </div>
      )}
    </div>
  )
}

export default MetricCard
