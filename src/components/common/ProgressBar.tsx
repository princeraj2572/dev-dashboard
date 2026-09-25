interface ProgressBarProps {
  value: number
  max?: number
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'success' | 'warning' | 'danger'
  className?: string
  animated?: boolean
}

export const ProgressBar = ({
  value,
  max = 100,
  showLabel = false,
  size = 'md',
  variant = 'primary',
  className = '',
  animated = true,
}: ProgressBarProps) => {
  const percentage = Math.min((value / max) * 100, 100)

  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }

  const variantStyles = {
    primary: 'bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-500 dark:to-indigo-400',
    success: 'bg-gradient-to-r from-green-500 to-green-600 dark:from-green-500 dark:to-green-400',
    warning: 'bg-gradient-to-r from-yellow-500 to-yellow-600 dark:from-yellow-500 dark:to-yellow-400',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 dark:from-red-500 dark:to-red-400',
  }

  return (
    <div className={className}>
      <div className={`w-full bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden ${sizeStyles[size]} shadow-sm`}>
        <div
          className={`${variantStyles[variant]} rounded-full transition-all duration-700 ease-out ${sizeStyles[size]} ${animated ? 'shadow-md' : ''}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
      {showLabel && (
        <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mt-2">
          {value} / {max}
        </p>
      )}
    </div>
  )
}

export default ProgressBar
