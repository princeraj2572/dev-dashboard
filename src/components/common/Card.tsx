import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hoverable?: boolean
  onClick?: () => void
  role?: string
}

export const Card = ({
  children,
  className = '',
  hoverable = false,
  onClick,
  role,
}: CardProps) => {
  const hoverClass = hoverable ? 'hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer' : ''

  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-lg shadow p-6 ${hoverClass} ${className}`}
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
