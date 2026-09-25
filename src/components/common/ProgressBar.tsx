interface ProgressBarProps {
  value: number
  max?: number
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'success' | 'warning' | 'danger'
  className?: string
  animated?: boolean
  label?: string
}

export const ProgressBar = ({
  value,
  max = 100,
  showLabel = false,
  size = 'md',
  variant = 'primary',
  className = '',
  label,
}: ProgressBarProps) => {
  const percentage = max > 0 ? Math.min(Math.max((value / max) * 100, 0), 100) : 0

  const sizeStyles = { sm: 'h-1.5', md: 'h-2', lg: 'h-3' }
  const fillStyles = {
    primary: 'bg-brand',
    success: 'bg-brand',
    warning: 'bg-amber',
    danger: 'bg-danger',
  }

  return (
    <div className={className}>
      <div className={`w-full overflow-hidden rounded-full bg-sunken ${sizeStyles[size]}`}>
        <div
          className={`h-full rounded-full transition-[width] duration-500 ease-out ${fillStyles[variant]}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-label={label}
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
      {showLabel && (
        <p className="mt-1.5 text-xs tabular-nums text-subtle">
          {value} / {max}
        </p>
      )}
    </div>
  )
}

export default ProgressBar
