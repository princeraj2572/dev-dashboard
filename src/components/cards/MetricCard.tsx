import type { ReactNode } from 'react'

interface MetricCardProps {
  label: string
  value: string | number
  icon?: ReactNode
  trend?: {
    direction: 'up' | 'down'
    percentage: number
  }
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'pink'
  className?: string
}

export const MetricCard = ({ label, value, icon, trend, className = '' }: MetricCardProps) => {
  return (
    <div className={`rounded-xl border border-line bg-surface p-5 ${className}`}>
      <div className="flex items-center justify-between gap-3 text-sm text-subtle">
        <p>{label}</p>
        {icon && <span aria-hidden="true">{icon}</span>}
      </div>
      <p className="font-display mt-2 text-4xl font-bold tabular-nums leading-none">{value}</p>
      {trend && (
        <p
          className={`mt-3 text-sm font-medium tabular-nums ${
            trend.direction === 'up' ? 'text-brand' : 'text-danger'
          }`}
        >
          {trend.direction === 'up' ? 'Up' : 'Down'} {trend.percentage}%
        </p>
      )}
    </div>
  )
}

export default MetricCard
