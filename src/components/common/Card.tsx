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
    default: 'bg-surface border border-line',
    elevated: 'bg-surface border border-line',
    outlined: 'bg-transparent border border-line',
    gradient: 'bg-slab text-slab-ink border border-transparent',
  }

  const interactive = hoverable && onClick
  const hoverClass = hoverable ? 'transition-colors hover:border-brand cursor-pointer' : ''

  return (
    <div
      className={`rounded-xl p-5 sm:p-6 ${variantStyles[variant]} ${hoverClass} ${className}`}
      onClick={onClick}
      role={role ?? (interactive ? 'button' : undefined)}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={interactive ? (e) => (e.key === 'Enter' || e.key === ' ') && onClick() : undefined}
    >
      {children}
    </div>
  )
}

export default Card
