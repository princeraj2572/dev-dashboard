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
    default: 'bg-sunken text-subtle',
    success: 'bg-brand-soft text-brand',
    info: 'bg-brand-soft text-brand',
    warning: 'bg-amber-soft text-amber',
    error: 'bg-danger-soft text-danger',
  }

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  }

  return (
    <span
      className={`inline-block rounded-md font-semibold tabular-nums ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  )
}

export default Badge
