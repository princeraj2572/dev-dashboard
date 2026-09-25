import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md'
  className?: string
}

export const Badge = ({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
}: BadgeProps) => {
  const variantStyles = {
    default: 'bg-gray-150 dark:bg-slate-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-slate-600',
    success: 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-600',
    warning: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-600',
    error: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-600',
    info: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-600',
  }

  const sizeStyles = {
    sm: 'px-3 py-1 text-xs font-semibold',
    md: 'px-4 py-1.5 text-sm font-semibold',
  }

  return (
    <span className={`rounded-full inline-block transition-colors duration-200 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  )
}

export default Badge
