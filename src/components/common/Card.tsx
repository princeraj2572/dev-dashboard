import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hoverable?: boolean
  onClick?: () => void
  role?: string
  variant?: 'default' | 'elevated' | 'outlined' | 'gradient'
}

export const Card = ({
  children,
  className = '',
  hoverable = false,
  onClick,
  role,
  variant = 'default',
}: CardProps) => {
  const variantStyles = {
    default: 'bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700',
    elevated: 'bg-white dark:bg-slate-800 shadow-lg',
    outlined: 'bg-white dark:bg-slate-800 border-2 border-indigo-200 dark:border-indigo-700/40',
    gradient: 'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700',
  }

  const hoverClass = hoverable 
    ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer' 
    : ''

  const shadowClass = variant === 'elevated' ? 'shadow-lg' : 'shadow'

  return (
    <div
      className={`${variantStyles[variant]} rounded-xl ${shadowClass} p-6 ${hoverClass} ${className}`}
      onClick={onClick}
      role={role}
      tabIndex={hoverable && onClick ? 0 : undefined}
      onKeyPress={hoverable && onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {children}
    </div>
  )
}

export default Card
